/**
 * lovely.io 'ui' module v1.2.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("ui-1.2.0",["dom-1.2.0","fx-1.0.3"],function(undefined){var exports={},A,Button,Class,Document,Element,Event,Icon,Input,Locker,Menu,Modal,Spinner,Unit,Window,build_spinner_divs,core,dom,dom_window,ext,fx,hide_all_modals,merge_options,move_spinner,resize_timeout,_fn,_i,_len,_ref;core=this.Lovely.module("core"),dom=this.Lovely.module("dom-1.2.0"),fx=this.Lovely.module("fx-1.0.3"),A=core.A,ext=core.ext,Class=core.Class,Event=dom.Event,Element=dom.Element,Document=dom.Document,Window=dom.Window,Input=dom.Input,merge_options=function(options,defaults){var key,value;options||(options={});for(key in defaults)value=defaults[key],options[key]||(options[key]=value);return options["class"]&&(options["class"]+=" "),options["class"]+=defaults["class"],options},Event.Keys={BACKSPACE:8,TAB:9,ENTER:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46},_ref=[Element,Document,Window],_fn=function(Unit){var original_method;return original_method=Unit.prototype.on,Unit.prototype.on=function(name){var args,code,ctrl,key,meta,method,orig,shift;args=A(arguments),name=args[0];if(typeof name==="string"){key=name.split(/[\+\-\_ ]+/),key=(key[key.length-1]||"").toUpperCase();if(key in Event.Keys||/^[A-Z0-9]$/.test(key))meta=/(^|\+|\-| )(meta|alt)(\+|\-| )/i.test(name),ctrl=/(^|\+|\-| )(ctl|ctrl)(\+|\-| )/i.test(name),shift=/(^|\+|\-| )(shift)(\+|\-| )/i.test(name),code=Event.Keys[key]||key.charCodeAt(0),orig=args.slice(1),method=orig.shift(),typeof method==="string"&&(method=this[method]||function(){}),args=["keydown",function(event){if(event.keyCode===code&&(!meta||event.metaKey||event.altKey)&&(!ctrl||event.ctrlKey)&&(!shift||event.shiftKey))return method.apply(this,[event].concat(orig))}]}return original_method.apply(this,args)}};for(_i=0,_len=_ref.length;_i<_len;_i++)Unit=_ref[_i],_fn(Unit);return Button=new Class(Input,{constructor:function Button(html,options){return options=merge_options(options,{type:"button",html:html,"class":"lui-button"}),this.$super("button",options),this.on("mousedown",function(event){return event.preventDefault()})}}),Icon=new Class(Element,{constructor:function Icon(options){return this.$super("i",merge_options(options,{"class":"lui-icon"})),this.on("mousedown",function(event){return event.preventDefault()})}}),Spinner=new Class(Element,{extend:{DEFAULT_SIZE:4},constructor:function Spinner(options){return options=merge_options(options,{"class":"lui-spinner"}),options.html=build_spinner_divs(options.size),delete options.size,this.$super("div",options),move_spinner(this)}}),build_spinner_divs=function(size){var html,i;size||(size=Spinner.DEFAULT_SIZE),i=1,html="";while(i<size)html+="<div></div>",i+=1;return html+'<div class="lui-spinner-current"></div>'},move_spinner=function(spinner){return window.setInterval(function(){var dot;return dot=spinner.first(".lui-spinner-current"),(dot.nextSibling()||spinner.first()).radioClass("lui-spinner-current")},300),spinner},Locker=new Class(Element,{constructor:function Locker(options){var spinner_size;return options=merge_options(options,{"class":"lui-locker"}),spinner_size=options.size||5,delete options.size,this.$super("div",options),this.insert('<div class="lui-aligner"></div>'),this.insert(this.spinner=new Spinner({size:spinner_size,"class":"lui-inner"}))}}),Modal=new Class(Element,{extend:{current:null,offsetX:40,offsetY:40},constructor:function Modal(options){var html;return options=merge_options(options,{"class":"lui-modal lui-locker"}),html=options.html||"",options.html='<div class="lui-aligner"></div><div class="lui-inner"></div>',options.nolock===!0&&(options["class"]+=" lui-modal-nolock"),delete options.nolock,this.$super("div",options),this._inner=this.dialog=this.first(".lui-inner"),this._inner.insert(html),this},html:function(){return this._inner.html.apply(this._inner,arguments),this},text:function(){return this._inner.text.apply(this._inner,arguments),this},insert:function(){return this._inner.insert.apply(this._inner,arguments),this},update:function(){return this._inner.update.apply(this._inner,arguments),this},clear:function(){return this._inner.clear(),this},show:function(){return hide_all_modals(),this.insertTo(document.body),this.$super.apply(this,arguments),this.limit_size(dom_window.size()),Modal.current=this.constructor.current=this.emit("show")},hide:function(){return Modal.current=this.constructor.current=null,this.emit("hide").remove()},limit_size:function(size){return this.dialog._.style.maxWidth=size.x-(this.constructor.offsetX||Modal.offsetX)+"px",this.dialog._.style.maxHeight=size.y-(this.constructor.offsetX||Modal.offsetY)+"px",this}}),hide_all_modals=function(){return dom("div.lui-modal").forEach("remove")},dom(document).on("esc",hide_all_modals),dom(document).on("click",function(event){if(Modal.current&&(Modal.current===event.target||!event.find(".lui-modal")))return Modal.current.hide()}),resize_timeout=new Date,dom_window=dom(window).on("resize",function(){if(Modal.current!==null&&new Date-resize_timeout>1)return resize_timeout=new Date,Modal.current.limit_size(this.size())}),Menu=new Class(Element,{constructor:function Menu(options){return this.$super("nav",options),this.addClass("lui-menu"),this.on("click",function(event){var link;if((link=event.find("a"))&&link.parent()===this)return this.emit("pick",{link:link})}),this.on("mouseover",function(event){var link;if((link=event.find("a"))&&link.parent()===this)return this.emit("select",{link:link})}),this.on("pick","hide")},showAt:function(element){if(typeof element==="string"||element.nodeType===1)element=dom(element);return element instanceof dom.NodeList&&(element=element[0]),element&&(this.position({x:element.position().x,y:element.position().y+element.size().y}),this.insertTo(element,"after").show()),this},show:function(){return Modal.current=this.constructor.current=this.$super().emit("show")},hide:function(){return Modal.current=this.constructor.current=null,this.$super().emit("hide").remove()},selectNext:function(step){var index,links;step==null&&(step=1),links=this.children("a"),index=links.indexOf(this.currentLink)+step,index>links.length-1&&(index=links.length-1),index<0&&(index=0);if(this.currentLink=links[index])this.currentLink.radioClass("lui-menu-selected"),this.emit("select",{link:this.currentLink});return this},selectPrevious:function(){return this.selectNext(-1)},pickCurrent:function(){return this.currentLink&&this.emit("pick",{link:this.currentLink}),this}}),dom(document).on("click",function(event){if(!event.find(".lui-menu"))return dom(".lui-menu").forEach(function(menu){if(menu.style("position")==="absolute")return menu.hide()})}),dom(document).on("keydown",function(event){if(Modal.current!==null)switch(event.keyCode){case 40:return event.preventDefault(),Modal.current.selectNext();case 38:return event.preventDefault(),Modal.current.selectPrevious();case 13:return event.preventDefault(),Modal.current.pickCurrent();case 27:return Modal.current.hide()}}),ext(exports,{version:"1.2.0",Button:Button,Icon:Icon,Spinner:Spinner,Locker:Locker,Modal:Modal,Menu:Menu}),exports}),function(){var style=document.createElement("style"),rules=document.createTextNode('.lui-button,.lui-icon{position:relative;display:inline-block;font-family:Arial,Helvetica;font-size:90%;font-style:normal;color:rgba(0,0,0,0.8);border:1px solid #ccc;border-radius:0.25em;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;background-color:rgba(0,0,0,0.08);background-image:-webkit-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-moz-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-ms-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-o-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%)}.lui-button:hover,.lui-icon:hover{text-decoration:none;box-shadow:0 0 2px rgba(0,0,0,0.25);background-image:-webkit-linear-gradient(rgba(255,255,255,0.9) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.07) 100%);background-image:-moz-linear-gradient(rgba(255,255,255,0.9) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.07) 100%);background-image:-ms-linear-gradient(rgba(255,255,255,0.9) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.07) 100%);background-image:-o-linear-gradient(rgba(255,255,255,0.9) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.07) 100%);background-image:linear-gradient(rgba(255,255,255,0.9) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.07) 100%)}.lui-button:active,.lui-icon:active{top:1px;text-decoration:none;box-shadow:0 1px 1px rgba(0,0,0,0.1) inset;background-image:-webkit-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-moz-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-ms-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:-o-linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%);background-image:linear-gradient(rgba(255,255,255,0.7) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.05) 100%)}.lui-button:focus,.lui-icon:focus{outline:0;background-color:rgba(0,0,0,0.15);border-color:#aaa;box-shadow:0 0 2px rgba(0,0,0,0.2)}.lui-button:disabled,.lui-icon:disabled,.lui-button.lui-disabled,.lui-icon.lui-disabled{cursor:default;border-color:#ddd;box-shadow:none;top:auto;border-color:#ddd;color:rgba(0,0,0,0.5);background-color:rgba(0,0,0,0.12);background-image:-webkit-linear-gradient(rgba(255,255,255,0.6) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.04) 100%);background-image:-moz-linear-gradient(rgba(255,255,255,0.6) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.04) 100%);background-image:-ms-linear-gradient(rgba(255,255,255,0.6) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.04) 100%);background-image:-o-linear-gradient(rgba(255,255,255,0.6) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.04) 100%);background-image:linear-gradient(rgba(255,255,255,0.6) 25%,rgba(255,255,255,0) 75%,rgba(0,0,0,0.04) 100%)}.lui-button{padding:0.25em 1em}.lui-button:before{font-size:125%;width:1.4em}.lui-icon{padding:0;display:inline-block;width:1.5em;height:1.5em;line-height:1.5em;outline:none;font-size:1em}.lui-icon:before{position:absolute;width:100%;text-align:center;font-size:1.2em;height:100%;top:0;left:0}.lui-button-add,.lui-button-edit,.lui-button-delete,.lui-button-reply,.lui-button-play,.lui-button-like,.lui-button-star,.lui-button-back,.lui-button-forward,.lui-button-ok,.lui-button-help,.lui-button-cancel{padding-left:2.5em;padding-right:0.8em}.lui-button-add:before,.lui-button-edit:before,.lui-button-delete:before,.lui-button-reply:before,.lui-button-play:before,.lui-button-like:before,.lui-button-star:before,.lui-button-back:before,.lui-button-forward:before,.lui-button-ok:before,.lui-button-help:before,.lui-button-cancel:before{border-right:inherit;background-color:rgba(0,0,0,0.1);position:absolute;top:0;left:0;height:100%;text-align:center;line-height:1.3em}.lui-button-add:before,.lui-icon-add:before{content:"✚"}.lui-button-edit:before,.lui-icon-edit:before{content:"✎"}.lui-button-delete:before,.lui-icon-delete:before{content:"✖"}.lui-button-reply:before,.lui-icon-reply:before{content:"➥"}.lui-button-play:before,.lui-icon-play:before{content:"►"}.lui-button-like:before,.lui-icon-like:before{content:"❤"}.lui-button-ok:before,.lui-icon-ok:before{content:"✔"}.lui-button-cancel:before,.lui-icon-cancel:before{content:"✘"}.lui-button-help:before,.lui-icon-help:before{content:"?";font-weight:bold}.lui-button-star:before,.lui-icon-star:before{content:"★"}.lui-button-back:before,.lui-icon-back:before{content:"➜";-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);-transform:rotate(180deg)}.lui-button-forward:before,.lui-icon-forward:before{content:"➜"}.lui-button-next:before,.lui-icon-next:before{content:"›";font-size:1.8em;line-height:0.7em}.lui-button-next2:before,.lui-icon-next2:before{content:"»";font-size:1.8em;line-height:0.7em}.lui-button-previous:before,.lui-icon-previous:before{content:"‹";font-size:1.8em;line-height:0.7em}.lui-button-previous2:before,.lui-icon-previous2:before{content:"«";font-size:1.8em;line-height:0.7em}.lui-spinner{position:relative;display:inline-block;height:1em;margin:0;padding:0.25em;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.1);border-radius:0.2em}.lui-spinner div{display:inline-block;width:0.5em;height:100%;border:none;background:rgba(0,0,0,0.2);margin:0;padding:0;margin-right:0.2em;vertical-align:center;border-radius:0.1em;-webkit-transition:all 0.8s;-moz-transition:all 0.8s;-ms-transition:all 0.8s;-o-transition:all 0.8s;transition:all 0.8s}.lui-spinner div:last-child{margin-right:0}.lui-spinner div.lui-spinner-current{background:rgba(0,0,0,0.7)}.lui-locker{position:absolute;left:0;top:0;width:100%;height:100%;margin:0;padding:0;border:none;background:rgba(200,200,200,0.5);float:none;z-index:99999;text-align:center}.lui-locker>.lui-aligner{display:inline-block;width:1px;height:100%;margin:0;padding:0;float:none;background:none;border:none;vertical-align:middle}.lui-locker>.lui-inner{vertical-align:middle;display:inline-block;position:relative}.lui-locker>.lui-spinner{border:none;background:none;max-width:90%;height:auto;width:auto}.lui-locker>.lui-spinner div{height:1.25em;width:1.25em;border-radius:0.25em}.lui-modal{position:fixed;left:0;top:0;z-index:9999999;background:rgba(100,100,100,0.5);white-space:nowrap}.lui-modal .lui-inner{overflow:auto;white-space:normal}.lui-modal.lui-modal-nolock{left:-999999em}.lui-modal.lui-modal-nolock>.lui-inner{left:999999em}nav.lui-menu{display:none;position:absolute;z-index:99999999;margin:0;padding:0.5em 0;background:#fff;border:1px solid rgba(0,0,0,0.25);border-radius:0.25em;box-shadow:0.25em 0.25em 0.5em rgba(0,0,0,0.2);vertical-align:top}nav.lui-menu a{display:block;margin:0;padding:0.5em 1em;text-decoration:none;color:inherit;background:rgba(0,0,0,0);position:relative}nav.lui-menu a:hover,nav.lui-menu a.lui-menu-selected{text-decoration:none;background:rgba(0,0,0,0.15)}nav.lui-menu a .lui-icon,nav.lui-menu a .lui-icon:hover,nav.lui-menu a .lui-icon:active{border:none;background:none;box-shadow:none;top:auto;height:1em;vertical-align:top;margin-left:-0.4em;margin-right:0.25em;margin-top:-0.2em;color:inherit}nav.lui-menu hr{border:none;border-top:1px solid rgba(0,0,0,0.25)}');style.type="text/css",document.getElementsByTagName("head")[0].appendChild(style),style.styleSheet?style.styleSheet.cssText=rules.nodeValue:style.appendChild(rules)}()