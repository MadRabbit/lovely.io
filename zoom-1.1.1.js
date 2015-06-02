/**
 * lovely.io 'zoom' module v1.1.1
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("zoom-1.1.1",["ui-2.1.1"],function(){var e={},t,Class,n,r,i,s,o,u,Zoom,a,f,e,l;return a=this.Lovely.module("core"),u=this.Lovely.module("ui-2.1.1"),t=Lovely.module("dom"),l=a.ext,Class=a.Class,o=a.Options,n=t.Element,i=u.Locker,s=u.Modal,r=u.Icon,Zoom=new Class(s,{include:o,extend:{Options:{nolock:!1,fxDuration:"normal"},current:null},constructor:function Zoom(e){var t=this;return this.$super(e).addClass("lui-zoom"),this.locker=new i,this.icon=new r("remove"),this.image=new n("img"),this.dialog.append(this.image,this.icon),this.icon.on("click",function(){return t.hide()}),n.prototype.insert.call(this,this.locker)},show:function(e){var t=this;return this.setOptions(e.data("zoom")).addClass("lui-modal-nolock").addClass("lui-zoom-loading"),this.dialog.style("display: none"),this.$super(),(this.thumb=e.first("img"))&&this.locker.show().position(this.thumb.position()).size(this.thumb.size()),this.image=this.image.clone().insertTo(this.image,"instead").attr("src",null),this.image.on("load",function(){return t.loaded()}).attr("src",e.attr("href")),this},loaded:function(){return this.removeClass("lui-zoom-loading").emit("load"),this.dialog.style("display: inline-block; opacity: 0"),this[this.options.nolock===!0?"addClass":"removeClass"]("lui-modal-nolock"),this.thumb&&this.options.fxDuration?this.zoom():(this.dialog.style({opacity:1}),this.emit("zoom")),this.locker.hide()},zoom:function(){var e,t,n,r,i,s=this;return r=this.thumb.position(),i=this.thumb.size(),t=this.dialog.size(),e=this.dialog.position(),this.dialog.addClass("lui-zoom-resizing").size(i).position(r),n=this.dialog.style("top,left"),n={x:parseInt(n.left),y:parseInt(n.top)},this.dialog.style({opacity:1}).animate({top:n.y+(e.y-r.y)+"px",left:n.x+(e.x-r.x)+"px",width:t.x+"px",height:t.y+"px"},{duration:this.options.fxDuration,finish:function(){return s.dialog.removeClass("lui-zoom-resizing").style({top:"",left:"",width:"",height:""}),s.emit("zoom")}})}}),Zoom.prototype.limit_size=function(e){return this.image._.style.maxWidth=this.dialog._.style.maxWidth=e.x-20+"px",this.image._.style.maxHeight=this.dialog._.style.maxHeight=e.y-5+"px",this},f=null,t(document).on({click:function(e){var t;if(t=e.find("a[data-zoom]"))return e.stop(),f||(f=new Zoom),f.show(t)}}),e=l(Zoom,{version:"1.1.1"}),e}),function(){var e=document.createElement("style"),t=document.createTextNode("div.lui-zoom.lui-zoom-loading{position:absolute}div.lui-zoom>div.lui-locker{z-index:1;overflow:hidden;display:none}div.lui-zoom>div.lui-locker div.lui-spinner-circular{width:3em;height:3em}div.lui-zoom>div.lui-inner{z-index:2;overflow:inherit}div.lui-zoom>div.lui-inner>i{display:inline-block;position:absolute;top:-0.9em;right:-0.9em;font-weight:normal;width:1.5em;height:1.5em;line-height:1.57em;border:2px solid rgba(0,0,0,0.2);border-radius:1em;color:rgba(0,0,0,0.2);background-color:rgba(255,255,255,0.5);cursor:pointer}div.lui-zoom>div.lui-inner>i:hover{border-color:rgba(0,0,0,0.5);color:rgba(0,0,0,0.5);background-color:rgba(255,255,255,0.8)}div.lui-zoom>div.lui-inner>img{margin:0;padding:0;display:block;box-shadow:0 0.2em 0.75em rgba(0,0,0,0.5);border-radius:0.3em}div.lui-zoom>div.lui-inner.lui-zoom-resizing{position:absolute}div.lui-zoom>div.lui-inner.lui-zoom-resizing>img{width:100%;height:100%}");e.type="text/css",document.getElementsByTagName("head")[0].appendChild(e),e.styleSheet?e.styleSheet.cssText=t.nodeValue:e.appendChild(t)}()