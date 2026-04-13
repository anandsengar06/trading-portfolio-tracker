//+------------------------------------------------------------------+
//|  ExnessSyncBot.mq5 — TradeTracker Bot Control EA for MT5        |
//|  v3.0 — Full Trading Terminal: buy/sell/close from app           |
//|                                                                  |
//|  SETUP:                                                          |
//|  1. In the TradeTracker app → Bot Control Center → Add Bot       |
//|  2. Click the bot → Source Code tab → Upload this file           |
//|  3. Download the modified version (credentials auto-injected)    |
//|  4. Tools → Options → Expert Advisors → Allow WebRequest        |
//|     Add: https://firestore.googleapis.com                        |
//|  5. Attach to any chart — leave running                          |
//+------------------------------------------------------------------+
#property copyright "TradeTracker"
#property version   "3.0"

// ===== CREDENTIALS — auto-injected by app, or paste manually =====
input string UserID    = "PASTE_YOUR_USER_ID_HERE";
input string SyncToken = "PASTE_YOUR_SYNC_TOKEN_HERE";
input string BotID     = "PASTE_YOUR_SYNC_TOKEN_HERE";
// =================================================================

// ===== DEFAULT BOT PARAMETERS (overridden by app commands) =======
input double LotSize     = 0.01;
input int    TakeProfit  = 50;   // pips
input int    StopLoss    = 30;   // pips
input double MaxDrawdown = 5.0;  // % of account
input int    MaxTrades   = 3;    // max concurrent open trades
input bool   PaperMode   = true; // true = simulate only, false = live
// =================================================================

string PROJECT_ID = "trading-portfolio-tracke-fe53a";
string API_KEY    = "AIzaSyB-Eptx_RSKdnRHoORppt9pM-uEiSSXHZM";
string BASE_URL;
string DOCS_PATH;

// Runtime state
bool   g_tradingEnabled = false;
bool   g_isPaper        = true;
double g_lotSize        = 0;
int    g_tpPips         = 0;
int    g_slPips         = 0;
double g_maxDrawdown    = 0;
int    g_maxTrades      = 0;

// Sync tracker
ulong  g_synced_deals[];
int    g_synced_count = 0;

//+------------------------------------------------------------------+
void InitParams() {
   g_isPaper     = PaperMode;
   g_lotSize     = LotSize;
   g_tpPips      = TakeProfit;
   g_slPips      = StopLoss;
   g_maxDrawdown = MaxDrawdown;
   g_maxTrades   = MaxTrades;
}

bool IsDealSynced(ulong deal) {
   for(int i = 0; i < g_synced_count; i++)
      if(g_synced_deals[i] == deal) return true;
   return false;
}

void MarkSynced(ulong deal) {
   ArrayResize(g_synced_deals, g_synced_count + 1);
   g_synced_deals[g_synced_count++] = deal;
}

//+------------------------------------------------------------------+
// HTTP helpers
//+------------------------------------------------------------------+
bool HttpPost(string url, string body) {
   char post[], result[];
   string result_headers, req_headers = "Content-Type: application/json\r\n";
   StringToCharArray(body, post, 0, StringLen(body));
   ArrayResize(post, StringLen(body));
   int code = WebRequest("POST", url, req_headers, 5000, post, result, result_headers);
   return (code == 200 || code == 201);
}

bool HttpPatch(string url, string body) {
   char post[], result[];
   string result_headers, req_headers = "Content-Type: application/json\r\n";
   StringToCharArray(body, post, 0, StringLen(body));
   ArrayResize(post, StringLen(body));
   int code = WebRequest("PATCH", url, req_headers, 5000, post, result, result_headers);
   return (code == 200 || code == 201);
}

string HttpGet(string url) {
   char post[], result[];
   string result_headers, req_headers = "Accept: application/json\r\n";
   ArrayResize(post, 0);
   WebRequest("GET", url, req_headers, 5000, post, result, result_headers);
   return CharArrayToString(result);
}

void HttpDelete(string url) {
   char post[], result[];
   string result_headers, req_headers = "Content-Type: application/json\r\n";
   ArrayResize(post, 0);
   WebRequest("DELETE", url, req_headers, 5000, post, result, result_headers);
}

//+------------------------------------------------------------------+
// Open a position from app command
//+------------------------------------------------------------------+
bool OpenPosition(string symbol, ENUM_ORDER_TYPE orderType, double lots, int tpPips, int slPips, string comment = "") {
   if(g_isPaper) {
      PrintFormat("[PAPER] %s %s lots=%.2f tp=%d sl=%d", EnumToString(orderType), symbol, lots, tpPips, slPips);
      return true;
   }
   if(!SymbolSelect(symbol, true)) {
      PrintFormat("[ERROR] Symbol not found: %s", symbol);
      return false;
   }
   double point  = SymbolInfoDouble(symbol, SYMBOL_POINT);
   int    digits = (int)SymbolInfoInteger(symbol, SYMBOL_DIGITS);
   double ask    = SymbolInfoDouble(symbol, SYMBOL_ASK);
   double bid    = SymbolInfoDouble(symbol, SYMBOL_BID);
   double pipVal = (digits == 3 || digits == 5) ? point * 10 : point;

   MqlTradeRequest req = {};
   MqlTradeResult  res = {};
   req.action    = TRADE_ACTION_DEAL;
   req.symbol    = symbol;
   req.volume    = lots;
   req.type      = orderType;
   req.deviation = 20;
   req.magic     = 202400;
   req.comment   = (comment != "") ? comment : "TradeTracker-" + BotID;

   if(orderType == ORDER_TYPE_BUY) {
      req.price = ask;
      if(slPips > 0) req.sl = NormalizeDouble(ask - slPips * pipVal, digits);
      if(tpPips > 0) req.tp = NormalizeDouble(ask + tpPips * pipVal, digits);
   } else {
      req.price = bid;
      if(slPips > 0) req.sl = NormalizeDouble(bid + slPips * pipVal, digits);
      if(tpPips > 0) req.tp = NormalizeDouble(bid - tpPips * pipVal, digits);
   }

   bool ok = OrderSend(req, res);
   PrintFormat("[TRADE] %s %s lots=%.2f price=%.5f retcode=%d", EnumToString(orderType), symbol, lots, req.price, res.retcode);
   return ok && res.retcode == TRADE_RETCODE_DONE;
}

//+------------------------------------------------------------------+
// Close a specific position by ticket
//+------------------------------------------------------------------+
bool ClosePosition(ulong ticket) {
   if(g_isPaper) { PrintFormat("[PAPER] Close ticket=%I64u", ticket); return true; }
   if(!PositionSelectByTicket(ticket)) { PrintFormat("[ERROR] Position not found: %I64u", ticket); return false; }

   MqlTradeRequest req = {};
   MqlTradeResult  res = {};
   req.action   = TRADE_ACTION_DEAL;
   req.position = ticket;
   req.symbol   = PositionGetString(POSITION_SYMBOL);
   req.volume   = PositionGetDouble(POSITION_VOLUME);
   req.type     = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) ? ORDER_TYPE_SELL : ORDER_TYPE_BUY;
   req.price    = (req.type == ORDER_TYPE_SELL)
                  ? SymbolInfoDouble(req.symbol, SYMBOL_BID)
                  : SymbolInfoDouble(req.symbol, SYMBOL_ASK);
   req.deviation = 20;
   bool ok = OrderSend(req, res);
   PrintFormat("[CLOSE] ticket=%I64u retcode=%d", ticket, res.retcode);
   return ok;
}

//+------------------------------------------------------------------+
// Close all positions (optionally by symbol)
//+------------------------------------------------------------------+
void CloseAllPositions(string filterSymbol = "") {
   if(g_isPaper) { Print("[PAPER] Close all"); return; }
   for(int i = PositionsTotal()-1; i >= 0; i--) {
      ulong ticket = PositionGetTicket(i);
      if(ticket == 0) continue;
      if(filterSymbol != "" && PositionGetString(POSITION_SYMBOL) != filterSymbol) continue;
      ClosePosition(ticket);
   }
}

//+------------------------------------------------------------------+
// POLL BOT COMMANDS from Firestore
//+------------------------------------------------------------------+
void PollCommands() {
   string url  = BASE_URL + "/users/" + UserID + "/bot_commands?key=" + API_KEY;
   string resp = HttpGet(url);
   if(StringLen(resp) < 10) return;

   int pos = 0;
   while(true) {
      int botIdPos = StringFind(resp, "\"botId\"", pos);
      if(botIdPos < 0) break;

      // Extract botId
      int valStart = StringFind(resp, "\"stringValue\":\"", botIdPos) + 15;
      int valEnd   = StringFind(resp, "\"", valStart);
      if(valStart < 15 || valEnd < 0) { pos = botIdPos + 1; continue; }
      string foundBotId = StringSubstr(resp, valStart, valEnd - valStart);
      if(foundBotId != BotID) { pos = botIdPos + 1; continue; }

      // Extract doc name (for deletion)
      int namePos   = StringFind(resp, "\"name\":\"", 0);
      int nameStart = namePos + 8;
      int nameEnd   = StringFind(resp, "\"", nameStart);
      string docName = (namePos >= 0 && nameEnd > nameStart) ? StringSubstr(resp, nameStart, nameEnd - nameStart) : "";

      // Extract action
      int actionPos   = StringFind(resp, "\"action\"", botIdPos);
      int actValStart = StringFind(resp, "\"stringValue\":\"", actionPos) + 15;
      int actValEnd   = StringFind(resp, "\"", actValStart);
      string action   = (actionPos >= 0) ? StringSubstr(resp, actValStart, actValEnd - actValStart) : "";

      PrintFormat("[CMD] action='%s' botId=%s", action, BotID);

      // ── Core control ──
      if(action == "start")  { g_tradingEnabled = true;  Print("[BOT] Started"); }
      if(action == "stop")   { g_tradingEnabled = false; Print("[BOT] Stopped"); CloseAllPositions(); }
      if(action == "pause")  { g_tradingEnabled = false; Print("[BOT] Paused"); }

      // ── Mode toggle ──
      if(action == "setMode") {
         int modePos = StringFind(resp, "\"mode\"", botIdPos);
         if(modePos >= 0) {
            int mValStart = StringFind(resp, "\"stringValue\":\"", modePos) + 15;
            int mValEnd   = StringFind(resp, "\"", mValStart);
            string mode   = StringSubstr(resp, mValStart, mValEnd - mValStart);
            g_isPaper = (mode == "paper");
            PrintFormat("[BOT] Mode: %s", mode);
         }
      }

      // ── Param update ──
      if(action == "updateParams") ParseAndUpdateParams(resp, botIdPos);

      // ── BUY order from app ──
      if(action == "buy") {
         string sym  = ExtractStringParam(resp, "symbol", botIdPos);
         double lots = ExtractDoubleParam(resp, "lots",   botIdPos);
         int    tp   = (int)ExtractDoubleParam(resp, "tp", botIdPos);
         int    sl   = (int)ExtractDoubleParam(resp, "sl", botIdPos);
         if(sym == "")   sym  = g_lotSize > 0 ? "EURUSD" : "EURUSD";
         if(lots <= 0)   lots = g_lotSize;
         if(tp == 0)     tp   = g_tpPips;
         if(sl == 0)     sl   = g_slPips;
         if(PositionsTotal() < g_maxTrades || g_maxTrades == 0)
            OpenPosition(sym, ORDER_TYPE_BUY, lots, tp, sl);
         else Print("[BOT] Max trades reached, buy skipped");
      }

      // ── SELL order from app ──
      if(action == "sell") {
         string sym  = ExtractStringParam(resp, "symbol", botIdPos);
         double lots = ExtractDoubleParam(resp, "lots",   botIdPos);
         int    tp   = (int)ExtractDoubleParam(resp, "tp", botIdPos);
         int    sl   = (int)ExtractDoubleParam(resp, "sl", botIdPos);
         if(sym == "")   sym  = "EURUSD";
         if(lots <= 0)   lots = g_lotSize;
         if(tp == 0)     tp   = g_tpPips;
         if(sl == 0)     sl   = g_slPips;
         if(PositionsTotal() < g_maxTrades || g_maxTrades == 0)
            OpenPosition(sym, ORDER_TYPE_SELL, lots, tp, sl);
         else Print("[BOT] Max trades reached, sell skipped");
      }

      // ── CLOSE specific position ──
      if(action == "close") {
         double ticketD = ExtractDoubleParam(resp, "ticket", botIdPos);
         if(ticketD > 0) ClosePosition((ulong)ticketD);
      }

      // ── CLOSE all positions (optionally by symbol) ──
      if(action == "closeAll") {
         string sym = ExtractStringParam(resp, "symbol", botIdPos);
         CloseAllPositions(sym);
      }

      // Delete processed command
      if(StringLen(docName) > 0)
         HttpDelete("https://firestore.googleapis.com/v1/" + docName + "?key=" + API_KEY);

      pos = botIdPos + 1;
   }
}

//+------------------------------------------------------------------+
// Extract helpers
//+------------------------------------------------------------------+
string ExtractStringParam(string resp, string key, int startPos) {
   int kPos = StringFind(resp, "\"" + key + "\"", startPos);
   if(kPos < 0) return "";
   int vStart = StringFind(resp, "\"stringValue\":\"", kPos) + 15;
   int vEnd   = StringFind(resp, "\"", vStart);
   if(vStart < 15 || vEnd < 0) return "";
   return StringSubstr(resp, vStart, vEnd - vStart);
}

double ExtractDoubleParam(string resp, string key, int startPos) {
   int kPos = StringFind(resp, "\"" + key + "\"", startPos);
   if(kPos < 0) return 0;
   int dvPos = StringFind(resp, "\"doubleValue\":", kPos);
   int ivPos = StringFind(resp, "\"integerValue\":", kPos);
   int svPos = StringFind(resp, "\"stringValue\":\"", kPos);
   int vPos = -1, vEnd = -1;
   // Pick closest match
   if(dvPos >= 0 && (ivPos < 0 || dvPos < ivPos) && (svPos < 0 || dvPos < svPos)) {
      vPos = dvPos + 14; vEnd = StringFind(resp, ",", vPos);
      if(vEnd < 0) vEnd = StringFind(resp, "}", vPos);
   } else if(ivPos >= 0 && (svPos < 0 || ivPos < svPos)) {
      vPos = ivPos + 15;
      if(StringSubstr(resp, vPos, 1) == "\"") vPos++;
      vEnd = StringFind(resp, "\"", vPos);
      if(vEnd < 0) vEnd = StringFind(resp, ",", vPos);
   } else if(svPos >= 0) {
      vPos = svPos + 15;
      vEnd = StringFind(resp, "\"", vPos);
   }
   if(vPos < 0 || vEnd < 0) return 0;
   return StringToDouble(StringSubstr(resp, vPos, vEnd - vPos));
}

void ParseAndUpdateParams(string resp, int startPos) {
   g_lotSize     = ExtractDoubleParam(resp, "lotSize",     startPos); if(g_lotSize == 0) g_lotSize = LotSize;
   double tp     = ExtractDoubleParam(resp, "tpPips",      startPos); if(tp > 0) g_tpPips = (int)tp;
   double sl     = ExtractDoubleParam(resp, "slPips",      startPos); if(sl > 0) g_slPips = (int)sl;
   double md     = ExtractDoubleParam(resp, "maxDrawdown", startPos); if(md > 0) g_maxDrawdown = md;
   double mt     = ExtractDoubleParam(resp, "maxTrades",   startPos); if(mt > 0) g_maxTrades = (int)mt;
   PrintFormat("[PARAMS] lot=%.3f tp=%d sl=%d dd=%.1f maxT=%d", g_lotSize, g_tpPips, g_slPips, g_maxDrawdown, g_maxTrades);
}

//+------------------------------------------------------------------+
// WRITE STATUS + LIVE POSITIONS to Firestore
//+------------------------------------------------------------------+
void WriteStatus() {
   // ── Account stats ──
   double balance     = AccountInfoDouble(ACCOUNT_BALANCE);
   double equity      = AccountInfoDouble(ACCOUNT_EQUITY);
   double margin      = AccountInfoDouble(ACCOUNT_MARGIN);
   double freeMargin  = AccountInfoDouble(ACCOUNT_MARGIN_FREE);
   double marginLevel = (margin > 0) ? (equity / margin * 100.0) : 0;
   int    openTrades  = PositionsTotal();
   string status      = g_tradingEnabled ? "running" : "stopped";
   string mode        = g_isPaper ? "paper" : "live";

   // ── Build open positions JSON array ──
   string posArr = "[";
   for(int i = 0; i < PositionsTotal(); i++) {
      ulong ticket = PositionGetTicket(i);
      if(ticket == 0) continue;
      string sym     = PositionGetString(POSITION_SYMBOL);
      string posType = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY) ? "buy" : "sell";
      double vol     = PositionGetDouble(POSITION_VOLUME);
      double oprice  = PositionGetDouble(POSITION_PRICE_OPEN);
      double cprice  = PositionGetDouble(POSITION_PRICE_CURRENT);
      double pnl     = PositionGetDouble(POSITION_PROFIT);
      double swap    = PositionGetDouble(POSITION_SWAP);
      double sl      = PositionGetDouble(POSITION_SL);
      double tp      = PositionGetDouble(POSITION_TP);
      datetime otime = (datetime)PositionGetInteger(POSITION_TIME);

      if(i > 0) posArr += ",";
      posArr += "{";
      posArr += "\"ticket\":" + (string)ticket + ",";
      posArr += "\"symbol\":\"" + sym + "\",";
      posArr += "\"type\":\"" + posType + "\",";
      posArr += "\"volume\":" + DoubleToString(vol, 2) + ",";
      posArr += "\"openPrice\":" + DoubleToString(oprice, 5) + ",";
      posArr += "\"currentPrice\":" + DoubleToString(cprice, 5) + ",";
      posArr += "\"profit\":" + DoubleToString(pnl, 2) + ",";
      posArr += "\"swap\":" + DoubleToString(swap, 2) + ",";
      posArr += "\"sl\":" + DoubleToString(sl, 5) + ",";
      posArr += "\"tp\":" + DoubleToString(tp, 5) + ",";
      posArr += "\"openTime\":\"" + TimeToString(otime, TIME_DATE|TIME_MINUTES) + "\"";
      posArr += "}";
   }
   posArr += "]";

   // ── PATCH bot_status document ──
   string url  = BASE_URL + "/users/" + UserID + "/bot_status/" + BotID + "?key=" + API_KEY;
   string body = "{\"fields\":{"
      + "\"status\":{\"stringValue\":\"" + status + "\"},"
      + "\"mode\":{\"stringValue\":\"" + mode + "\"},"
      + "\"openTrades\":{\"integerValue\":\"" + (string)openTrades + "\"},"
      + "\"balance\":{\"doubleValue\":" + DoubleToString(balance, 2) + "},"
      + "\"equity\":{\"doubleValue\":" + DoubleToString(equity, 2) + "},"
      + "\"margin\":{\"doubleValue\":" + DoubleToString(margin, 2) + "},"
      + "\"freeMargin\":{\"doubleValue\":" + DoubleToString(freeMargin, 2) + "},"
      + "\"marginLevel\":{\"doubleValue\":" + DoubleToString(marginLevel, 2) + "},"
      + "\"lotSize\":{\"doubleValue\":" + DoubleToString(g_lotSize, 4) + "},"
      + "\"positions\":{\"stringValue\":" + "\"" + EscapeJson(posArr) + "\"},"
      + "\"updatedAt\":{\"stringValue\":\"" + TimeToString(TimeCurrent(), TIME_DATE|TIME_MINUTES) + "\"}"
      + "}}";
   HttpPatch(url, body);
}

// Escape JSON string for embedding in another JSON string
string EscapeJson(string s) {
   string out = "";
   for(int i = 0; i < StringLen(s); i++) {
      ushort c = StringGetCharacter(s, i);
      if(c == '"')  out += "\\\"";
      else if(c == '\\') out += "\\\\";
      else          out += ShortToString(c);
   }
   return out;
}

//+------------------------------------------------------------------+
// SYNC CLOSED TRADES to ea_pending
//+------------------------------------------------------------------+
void SyncClosedTrades() {
   HistorySelect(0, TimeCurrent());
   int total = HistoryDealsTotal();
   for(int i = 0; i < total; i++) {
      ulong ticket = HistoryDealGetTicket(i);
      if(ticket == 0 || IsDealSynced(ticket)) continue;
      long entry = HistoryDealGetInteger(ticket, DEAL_ENTRY);
      if(entry != DEAL_ENTRY_OUT) continue;
      long dtype = HistoryDealGetInteger(ticket, DEAL_TYPE);
      if(dtype != DEAL_TYPE_BUY && dtype != DEAL_TYPE_SELL) continue;

      string symbol     = HistoryDealGetString(ticket, DEAL_SYMBOL);
      double volume     = HistoryDealGetDouble(ticket, DEAL_VOLUME);
      double price      = HistoryDealGetDouble(ticket, DEAL_PRICE);
      double profit     = HistoryDealGetDouble(ticket, DEAL_PROFIT);
      double commission = HistoryDealGetDouble(ticket, DEAL_COMMISSION);
      double swap       = HistoryDealGetDouble(ticket, DEAL_SWAP);
      datetime ctime    = (datetime)HistoryDealGetInteger(ticket, DEAL_TIME);
      string closeStr   = TimeToString(ctime, TIME_DATE|TIME_MINUTES);

      ulong posId = HistoryDealGetInteger(ticket, DEAL_POSITION_ID);
      double openPrice = 0; string openStr = closeStr;
      for(int j = 0; j < total; j++) {
         ulong t2 = HistoryDealGetTicket(j);
         if(t2 == 0) continue;
         if((ulong)HistoryDealGetInteger(t2, DEAL_POSITION_ID) != posId) continue;
         if(HistoryDealGetInteger(t2, DEAL_ENTRY) != DEAL_ENTRY_IN) continue;
         openPrice = HistoryDealGetDouble(t2, DEAL_PRICE);
         openStr   = TimeToString((datetime)HistoryDealGetInteger(t2, DEAL_TIME), TIME_DATE|TIME_MINUTES);
         break;
      }

      string tradeType = (dtype == DEAL_TYPE_BUY) ? "buy" : "sell";
      string url  = BASE_URL + "/users/" + UserID + "/ea_pending?key=" + API_KEY;
      string body = "{\"fields\":{"
         + "\"ticket\":{\"integerValue\":\"" + (string)ticket + "\"},"
         + "\"symbol\":{\"stringValue\":\"" + symbol + "\"},"
         + "\"type\":{\"stringValue\":\"" + tradeType + "\"},"
         + "\"volume\":{\"doubleValue\":" + DoubleToString(volume,2) + "},"
         + "\"openTime\":{\"stringValue\":\"" + openStr + "\"},"
         + "\"openPrice\":{\"doubleValue\":" + DoubleToString(openPrice,5) + "},"
         + "\"closeTime\":{\"stringValue\":\"" + closeStr + "\"},"
         + "\"closePrice\":{\"doubleValue\":" + DoubleToString(price,5) + "},"
         + "\"profit\":{\"doubleValue\":" + DoubleToString(profit,2) + "},"
         + "\"commission\":{\"doubleValue\":" + DoubleToString(commission,2) + "},"
         + "\"swap\":{\"doubleValue\":" + DoubleToString(swap,2) + "},"
         + "\"syncToken\":{\"stringValue\":\"" + SyncToken + "\"},"
         + "\"botID\":{\"stringValue\":\"" + BotID + "\"},"
         + "\"paperMode\":{\"booleanValue\":" + (g_isPaper ? "true" : "false") + "}"
         + "}}";
      if(HttpPost(url, body)) MarkSynced(ticket);
   }
}

//+------------------------------------------------------------------+
int OnInit() {
   BASE_URL  = "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/(default)/documents";
   DOCS_PATH = "projects/" + PROJECT_ID + "/databases/(default)/documents";
   InitParams();
   if(UserID == "PASTE_YOUR_USER_ID_HERE") {
      Alert("ExnessSyncBot: Set UserID and SyncToken from Bot Control Center in the app.");
      return INIT_FAILED;
   }
   PrintFormat("[BOT] v3.0 started | BotID=%s | Paper=%s", BotID, g_isPaper ? "YES" : "NO");
   PollCommands();
   SyncClosedTrades();
   WriteStatus();
   EventSetTimer(10); // poll every 10 seconds for snappier response
   return INIT_SUCCEEDED;
}

void OnTimer() {
   PollCommands();
   SyncClosedTrades();
   WriteStatus();
}

void OnTrade() {
   SyncClosedTrades();
   WriteStatus(); // instant position update on any trade event
}

void OnDeinit(const int reason) {
   EventKillTimer();
   Print("[BOT] ExnessSyncBot v3.0 stopped.");
}
//+------------------------------------------------------------------+
