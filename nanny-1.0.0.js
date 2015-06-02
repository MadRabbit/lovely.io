/**
 * lovely.io 'nanny' module v1.0.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("nanny-1.0.0",["dom-1.2.0","ui-1.1.2"],function(a){var b,Class,c,d,e,f,g,h;return g=this.Lovely.module("core"),b=this.Lovely.module("dom-1.2.0"),f=this.Lovely.module("ui-1.1.2"),h=g.ext,Class=g.Class,c=b.Element,e=b.NodeList,d=new Class(c,{include:g.Options,extend:{Options:{scope:document.documentElement,timeout:4e3,position:"top",loop:!0,html:"",fxName:"fade",fxDuration:"normal"}},constructor:function d(b){var d=this;return this.setOptions(b),this.$super("div",{"class":"nanny"}),this.append(this.icon=new c("div",{"class":"nanny-icon"}),this.body=new c("div",{"class":"nanny-body"})),this.icon.on("click",function(){return d.stop()}),this},start:function(){return this._stopped=!1,this._block=null,this.emit("start").showNext()},stop:function(){return this._stopped=!0,this.emit("stop").hide()},show:function(a,b){var c=this;return this.$super(a||this.options.fxName,b||{duration:this.options.fxDuration,finish:function(){return c.emit("show")}}),this.options.fxName?this:this.emit("show")},hide:function(a,b){var c=this;return this.$super(a||this.options.fxName,b||{duration:this.options.fxDuration,finish:function(){return c.emit("hide")}}),this.options.fxName?this:this.emit("hide")},showNext:function(){var a,b,c=this;return(a=this.nextBlock())?(b=a.data("nanny")||{},b.html||(b.html=this.options.html),b.position||(b.position=this.options.position),b.timeout||(b.timeout=this.options.timeout),this.removeClass("nanny-top").removeClass("nanny-left").removeClass("nanny-right").removeClass("nanny-bottom"),this.addClass("nanny-"+b.position).body.html(b.html),this.style({visibility:"hidden"}).insertTo(document.body),this.moveNextTo(a).style({display:"none",visibility:"visible"}),window.setTimeout(function(){if(!c._stopped)return c.showNext()},b.timeout),this.show()):this.hide()},moveNextTo:function(a){var c,d,e,f,g;return e=a.position(),f=a.size(),c=this.size(),g=b(window).size(),d=8,e=function(){switch((a.data("nanny")||{}).position||this.options.position){case"top":return{x:e.x+(f.x-c.x)/2,y:e.y-c.y-d};case"left":return{x:e.x-c.x-d,y:e.y+(f.y-c.y)/2};case"right":return{x:e.x+f.x+d,y:e.y+(f.y-c.y)/2};default:return{x:e.x+(f.x-c.x)/2,y:e.y+f.y+d}}}.call(this),e.x<d&&(e.x=d),e.y<d&&(e.y=d),g.x<e.x+c.x+d&&(e.x=g.x-c.x-d),g.y<e.y+c.y+d&&(e.y=g.y-c.y-d),this.position(e)},nextBlock:function(){var a;a=b(this.options.scope).find("*[data-nanny], *[data-nanny-html], *[data-nanny-position]");if(this.options.loop||!this._block||this._block!==a[a.length-1])return this._block=a[a.indexOf(this._block)+1]||a[0]}}),h(d,{version:"1.0.0"})}),function(){var a=document.createElement("style"),b=document.createTextNode("div.nanny,div.nanny> *{margin:0;padding:0;float:none;background:none;border:none;text-align:left;display:block;position:static;top:auto;left:auto;right:auto;bottom:auto;width:auto;height:auto;line-height:1.2em;font-size:1em}div.nanny{position:absolute;z-index:999999999;background-color:#ffffc8;border:1px solid rgba(255,220,200,0.8);border-radius:0.5em;box-shadow:1px 1px 10px rgba(0,0,0,0.5)}div.nanny:before{content:' ';display:block;position:absolute;border-color:inherit;background:inherit;width:16px;height:16px;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}div.nanny.nanny-top:before{bottom:-8px;left:45%;border-left-width:1px;border-bottom-width:1px;box-shadow:4px 4px 7px rgba(0,0,0,0.2)}div.nanny.nanny-left:before{top:45%;right:-8px;border-top-width:1px;border-left-width:1px;box-shadow:5px -4px 7px rgba(0,0,0,0.2)}div.nanny.nanny-right:before{top:45%;left:-8px;border-right-width:1px;border-bottom-width:1px;box-shadow:-3px 3px 5px rgba(0,0,0,0.15)}div.nanny.nanny-bottom:before{top:-8px;left:45%;border-top-width:1px;border-right-width:1px;box-shadow:-3px -3px 5px rgba(0,0,0,0.15)}div.nanny>div.nanny-icon{position:absolute;right:0.25em;top:0.1em;color:rgba(200,0,0,0.7);cursor:pointer}div.nanny>div.nanny-icon:before{content:'✖';display:block;width:100%;text-align:center;font-weight:bold}div.nanny>div.nanny-icon:hover:before{text-shadow:0px 0px 2px rgba(0,0,0,0.2)}div.nanny>div.nanny-body{margin:1em}");a.type="text/css",document.getElementsByTagName("head")[0].appendChild(a),a.styleSheet?a.styleSheet.cssText=b.nodeValue:a.appendChild(b)}()