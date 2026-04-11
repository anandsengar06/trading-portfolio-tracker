(function(){
  function patch(){
    var grids=document.querySelectorAll('[style*="grid-template-columns"]');
    if(!grids.length)return;
    grids.forEach(function(grid){
      var cells=[];
      for(var i=0;i<grid.children.length;i++){
        var c=grid.children[i];
        if(c.children.length===2&&c.style.borderRadius){
          var dayText=c.children[0].textContent.trim();
          var pnlText=c.children[1].textContent.trim();
          if(/^\d+$/.test(dayText)){
            var num=parseFloat(pnlText.replace(/[^0-9.\-+]/g,''))||0;
            var hasTrades=(pnlText.indexOf('0.00')===-1||num!==0);
            cells.push({el:c,pnl:num,pnlEl:c.children[1],dayEl:c.children[0],hasTrades:hasTrades});
          }
        }
      }
      if(!cells.length)return;
      var maxAbs=Math.max.apply(null,cells.filter(function(x){return x.hasTrades}).map(function(x){return Math.abs(x.pnl)}).concat([1]));
      cells.forEach(function(x){
        if(!x.hasTrades){
          x.pnlEl.style.display='none';
          x.el.style.background='transparent';
          x.el.style.border='1px solid rgba(100,100,100,0.05)';
          x.dayEl.style.opacity='0.45';
          x.dayEl.style.color='#8a8a8a';
        }else{
          x.pnlEl.style.display='';
          var ratio=Math.min(Math.abs(x.pnl)/maxAbs,1);
          var intense=(0.08+ratio*0.42).toFixed(2);
          var borderI=Math.min(parseFloat(intense)+0.15,0.6).toFixed(2);
          var fontSize=Math.round(10+ratio*5);
          if(x.pnl>0){
            x.el.style.background='rgba(22,163,74,'+intense+')';
            x.el.style.border='1px solid rgba(22,163,74,'+borderI+')';
          }else if(x.pnl<0){
            x.el.style.background='rgba(220,38,38,'+intense+')';
            x.el.style.border='1px solid rgba(220,38,38,'+borderI+')';
          }
          x.pnlEl.style.fontSize=fontSize+'px';
          x.pnlEl.style.fontWeight='700';
          x.dayEl.style.opacity='1';
        }
      });
    });
  }
  new MutationObserver(function(){patch()}).observe(document.body,{childList:true,subtree:true});
  setInterval(patch,2000);
  setTimeout(patch,1500);
})();
