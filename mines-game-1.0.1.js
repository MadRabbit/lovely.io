/**
 * lovely.io 'mines-game' module v1.0.1
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Lovely("mines-game-1.0.1",["dom-1.0.0","lang-1.0.0","timer-1.0.1","hiscore-1.0.1"],function(a){var b={},c,Class,d,e,Game,f,g,h,i,j,k,l,b,m;k=this.Lovely.module("core"),l=this.Lovely.module("dom-1.0.0"),m=this.Lovely.module("lang-1.0.0"),j=this.Lovely.module("timer-1.0.1"),f=this.Lovely.module("hiscore-1.0.1"),Class=k.Class,g=k.List,d=l.Element,c=new Class(d,{opened:!1,rigged:!1,marked:!1,pos_x:0,pos_y:0,mines:0,constructor:function c(a,b){this.$super("div",{"class":"cell"}),this.pos_x=a,this.pos_y=b,this.on("mousedown",function(a){a.which===1?this.open():this.mark();return!1});return this.on("contextmenu","stopEvent")},reset:function(){this.opened=!1,this.rigged=!1,this.marked=!1,this.mines=0;return this.clear().setClass("cell")},open:function(){if(!this.opened&&!this.marked){this.opened=!0;if(this.rigged){this.addClass("failed");return this.emit("fail")}this.addClass("opened");return this.emit("open")}},mark:function(){if(!this.opened){this.toggleClass("marked"),this.marked=this.hasClass("marked");return this.emit("mark")}},addMine:function(){this.mines+=1,this.html(this.mines);return this.addClass("with-"+this.mines+"-mines")}}),e=new Class(d,{size_x:0,size_y:0,density:0,opened_cells:0,marked_cells:0,rigged_cells:0,total_cells:0,populated:!1,constructor:function e(a,b){this.$super("div",{"class":"field"}),a=a.split("x"),this.size_x=a[0].toInt(),this.size_y=a[1].toInt(),this.total_cells=this.size_x*this.size_y,this.rigged_cells=(this.total_cells/b).floor(),this.build();return this.on({mark:this.mark,open:this.open})},build:function(){var a,b,e,f,h;this.cells=new g;for(e=0,f=this.size_y-1;0<=f?e<=f:e>=f;0<=f?e++:e--){a=(new d("div")).insertTo(this);for(b=0,h=this.size_x-1;0<=h?b<=h:b>=h;0<=h?b++:b--)this.cells.push((new c(b,e)).insertTo(a))}},reset:function(){this.opened_cells=0,this.marked_cells=0,this.populated=!1;return this.cells.forEach("reset")},mark:function(a){this.marked_cells+=a.target.marked?1:-1,this.check()},open:function(a){var b;b=a.target,this.populated||this.populate(b),b.mines===0&&this.neighbors(b).forEach("open"),this.opened_cells+=1,this.check()},blow:function(){this.cells.forEach(function(a){if(!a.opened){if(a.marked&&!a.rigged)return a.addClass("wrong");if(a.rigged&&!a.marked)return a.addClass("rigged")}})},check:function(){this.marked_cells===this.rigged_cells&&this.opened_cells+this.marked_cells===this.total_cells&&this.emit("done")},populate:function(a){var b,c;c=this.neighbors(a),b=this.cells.filter(function(b){return b!==a&&c.indexOf(b)===-1}),b.shuffle().slice(0,this.rigged_cells).forEach(function(a){a.rigged=!0;return this.neighbors(a).forEach("addMine")},this);return this.populated=!0},neighbors:function(a){var b,c,d,e;c=new g;for(b=0;b<=8;b++)d=a.pos_x+b%3-1,e=a.pos_y+(b/3).floor()-1,d>-1&&e>-1&&d<this.size_x&&e<this.size_y&&(d!==a.pos_x||e!==a.pos_y)&&c.push(this.cells[e*this.size_x+d]);return c}}),h=new Class(d,{constructor:function h(){this.$super("div",{"class":"smile"}),this.removeClass=this.removeClass.bind(this);return this.on("click","emit","reset")},reset:function(){return this.setClass("smile")},blink:function(){this.addClass("blink");return this.removeClass.delay(400,"blink")},fail:function(){return this.addClass("fail")},done:function(){return this.addClass("done")}}),i=new Class(d,{constructor:function i(){return this.$super("div",{"class":"stats"})},update:function(a,b){return this.$super(a+"/"+b)}}),Game=new Class(d,{include:k.Options,extend:{Options:{size:"10x10",density:6}},constructor:function Game(a){this.$super("div",{"class":"mines-game"}),this.setOptions(a),this.append(this.timer=new j,this.stats=new i,this.smile=new h,this.field=new e(this.options.size,this.options.density),new d("h2",{html:"Hiscores"}),this.score=new f({key:"mines-game",reverse:!0})),this.on({fail:this.fail,mark:this.mark,open:this.open,done:this.done,reset:this.reset});return this.reset()},reset:function(){this.field.reset(),this.smile.reset(),this.timer.reset(),this.mark();return this},fail:function(){this.timer.stop(),this.smile.fail(),this.field.blow()},done:function(){this.timer.stop(),this.smile.done(),this.score.add(this.timer.text())},mark:function(){this.stats.update(this.field.marked_cells,this.field.rigged_cells)},open:function(){this.smile.blink()}}),Game.version="1.0.1",b=Game,function(a){var b=a.createElement("style"),c=a.createTextNode('div.mines-game,div.mines-game div{margin:0;padding:0;top:auto;left:auto;right:auto;bottom:auto;text-align:left;float:none;position:static;border:none;background:none;font-weight:normal;text-decoration:none;font-style:none;cursor:default}div.mines-game{text-align:center;position:relative;display:inline-block}div.mines-game div.timer{position:absolute;left:0px;top:8px}div.mines-game div.stats{position:absolute;right:0px;top:8px}div.mines-game div.smile{display:inline-block;width:32px;height:32px;background:url("http://cdn.lovely.io/mines-game/1.0.1/smiles.png") no-repeat -64px 0;cursor:pointer}div.mines-game div.smile.fail{background-position:-32px 0px}div.mines-game div.smile.blink{background-position:0px 0px}div.mines-game div.smile.done{background-position:-96px 0px}div.mines-game div.field{margin-top:1em}div.mines-game div.field div.cell{width:32px;height:32px;line-height:32px;text-align:center;display:inline-block;background:url("http://cdn.lovely.io/mines-game/1.0.1/cells-32.png") no-repeat -32px 0;vertical-align:top;font-weight:bold;font-family:Verdana;font-size:22px;text-indent:-9999em}div.mines-game div.field div.cell.opened{text-indent:0;background-position:0px 0px}div.mines-game div.field div.cell.failed{background-position:-64px 0px}div.mines-game div.field div.cell.marked{background-position:-96px 0px}div.mines-game div.field div.cell.wrong{background-position:-128px 0px}div.mines-game div.field div.cell.rigged{background-position:-160px 0px}div.mines-game div.field div.cell.with-1-mines{color:#00f}div.mines-game div.field div.cell.with-2-mines{color:#00a000}div.mines-game div.field div.cell.with-3-mines{color:#f00}div.mines-game div.field div.cell.with-4-mines{color:#00007f}div.mines-game div.field div.cell.with-5-mines{color:#a00}div.mines-game div.field div.cell.with-6-mines{color:#840}div.mines-game div.field div.cell.with-7-mines{color:#480}div.mines-game div.field div.cell.with-8-mines{color:#048}div.mines-game h2,div.mines-game ol.hiscore{text-align:left}');b.type="text/css",a.getElementsByTagName("head")[0].appendChild(b),b.styleSheet?b.styleSheet.cssText=c.nodeValue:b.appendChild(c)}(this.document);return b})