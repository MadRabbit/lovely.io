/**
 * lovely.io 'dialog' module v1.2.1
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("dialog-1.2.1",["dom","ui-2.0.1","ajax-1.1.1"],function(a){var b={},c,d,Class,Dialog,e,f,g,h,i,b,j,k=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};return i=this.Lovely.module("core"),c=this.Lovely.module("dom"),h=this.Lovely.module("ui-2.0.1"),d=this.Lovely.module("ajax-1.1.1"),j=i.ext,Class=i.Class,e=c.Element,f=c.Input,g=h.Modal,Dialog=new Class(g,{include:i.Options,extend:{Options:{nolock:!1,showHelp:!1,showHeader:!0,showButtons:!0,onlyOk:!1,title:null,html:null,icon:null,url:null,ajax:null}},constructor:function l(a){var b,c=this;this.setOptions(a||(a={}));for(b in Dialog.Options)b!=="nolock"&&delete a[b];return this.$super(a).addClass("lui-dialog"),this.append('<header>\n  <h3>&nbsp;</h3>\n\n  <button class="lui-dialog-cancel lui-button"><i class="lui-icon-remove"></i></button>\n  <button class="lui-dialog-help   lui-button"><i class="lui-icon-help"></i></button>\n</header>\n<section>\n\n</section>\n<footer>\n  <button class="lui-dialog-help   lui-button lui-icon-help">Help</button>\n  <button class="lui-dialog-ok     lui-button lui-icon-ok">Ok</button>\n  <button class="lui-dialog-cancel lui-button lui-icon-remove">Cancel</button>\n</footer>'),this.header=this.dialog.first("header"),this.body=this._inner=this.dialog.first("section"),this.footer=this.dialog.first("footer"),this.options.showHelp||this.addClass("lui-dialog-nohelp"),this.options.showHeader||this.addClass("lui-dialog-noheader"),this.options.showButtons||this.addClass("lui-dialog-nofooter"),this.options.onlyOk&&this.addClass("lui-dialog-only-ok"),this.options.icon&&this.body.insert(this._icon=new h.Icon(this.options.icon)),this.options.title&&this.title(this.options.title),this.options.html&&this.html(this.options.html),this.options.url&&this.load(this.options.url,this.options.ajax),this.header.first(".lui-dialog-help").on("click",function(){return c.emit("help")}),this.header.first(".lui-dialog-cancel").on("click",function(){return c.emit("cancel")}),this.footer.first(".lui-dialog-ok").on("click",function(){return c.emit("ok")}),this.footer.first(".lui-dialog-help").on("click",function(){return c.emit("help")}),this.footer.first(".lui-dialog-cancel").on("click",function(){return c.emit("cancel")}),this.on("cancel","hide")},title:function(a){return a!=null?this.header.first("h3").html(a):this.header.first("h3").html()},load:function(a,b){var c=this;return this.append(this.locker||(this.locker=new h.Locker)),b||(b={}),b.method||(b.method="get"),this.ajax=(new d(a,b)).on("complete",function(){return c.update(c.ajax.responseText),c.emit("load")}).send(),this},update:function(){return g.prototype.update.apply(this,arguments),this._icon&&this.body.insert(this._icon,"top"),this},html:function(){return g.prototype.update.apply(this,arguments),this._icon&&this.body.insert(this._icon,"top"),this}}),Dialog.prototype.limit_size=function(a){return this.body._.style.maxHeight=a.y-this.header._.offsetHeight-this.footer._.offsetHeight-40+"px",this.body._.style.maxWidth=a.x-40+"px",this},Dialog.Info=new Class(Dialog,{constructor:function(b){return b||(b={}),b.title||(b.title="Info"),b.icon||(b.icon="info-sign"),k.call(b,"onlyOk")<0&&(b.onlyOk=!0),this.$super(b),this.addClass("lui-dialog-info"),this.on("ok","hide")}}),Dialog.Alert=new Class(Dialog,{constructor:function Alert(b){return b||(b={}),b.title||(b.title="Alert"),b.icon||(b.icon="warning-sign"),k.call(b,"onlyOk")<0&&(b.onlyOk=!0),this.$super(b),this.addClass("lui-dialog-alert"),this.on("ok","hide")}}),Dialog.Prompt=new Class(Dialog,{constructor:function Prompt(b){var c,d=this;return b||(b={}),b.title||(b.title="Prompt"),b.icon||(b.icon="edit"),c=b.type||"text",delete b.type,this.$super(b),this.addClass("lui-dialog-prompt"),this.input=(new f({type:c})).insertTo(this),c!=="textarea"&&this.input.on("enter",function(){return d.emit("ok")}),this.on("ok","hide"),this.on("show",function(){return d.input.focus()})},emit:function(a,b){return a==="ok"&&(b||(b={}),b.value=this.input.value()),this.$super(a,b)}}),Dialog.Confirm=new Class(Dialog,{constructor:function Confirm(b){return b||(b={}),b.title||(b.title="Confirm"),b.icon||(b.icon="question-sign"),this.$super(b),this.addClass("lui-dialog-confirm"),this.on("ok","hide")}}),c(document).on("enter",function(a){var b;b=g.current;if(b!==null&&b instanceof Dialog&&!(a.target instanceof f))return b.emit("ok")}),b=j(Dialog,{version:"1.2.1"}),b}),function(){var a=document.createElement("style"),b=document.createTextNode('div.lui-dialog>.lui-inner{border:1px solid rgba(0,0,0,0.5);border-radius:0.25em;background:#fff;box-shadow:0 0 1em rgba(0,0,0,0.5);text-align:left;overflow:inherit}div.lui-dialog>.lui-inner>header,div.lui-dialog>.lui-inner>section,div.lui-dialog>.lui-inner>footer{padding:0.5em}div.lui-dialog>.lui-inner>header{background-color:rgba(0,0,0,0.2);background-image:-webkit-linear-gradient(rgba(0,0,0,0.15) 30%,rgba(255,255,255,0) 100%)}div.lui-dialog>.lui-inner>header h3{font-family:inherit;font-size:inherit;margin:0;padding:0;color:rgba(0,0,0,0.5)}div.lui-dialog>.lui-inner>header .lui-button{float:right;margin-top:-1.5em;color:rgba(0,0,0,0.5);padding:0.2em 0.25em}div.lui-dialog>.lui-inner>header .lui-icon-help:before{content:\'?\';line-height:1em;font-weight:bold}div.lui-dialog>.lui-inner>section{position:relative;min-height:4em;min-width:20em;overflow:auto}div.lui-dialog>.lui-inner>footer{text-align:right}div.lui-dialog>.lui-inner>footer .lui-dialog-help{float:left}div.lui-dialog>.lui-inner>footer .lui-icon-help:before{content:\'?\';font-weight:bold}div.lui-dialog.lui-dialog-nohelp>.lui-inner>header .lui-dialog-help,div.lui-dialog.lui-dialog-nohelp>.lui-inner>footer .lui-dialog-help{display:none}div.lui-dialog.lui-dialog-noheader>.lui-inner>header{display:none}div.lui-dialog.lui-dialog-nofooter>.lui-inner>footer{display:none}div.lui-dialog.lui-dialog-only-ok>.lui-inner>footer{text-align:center}div.lui-dialog.lui-dialog-only-ok>.lui-inner>footer .lui-dialog-help,div.lui-dialog.lui-dialog-only-ok>.lui-inner>footer .lui-dialog-cancel{display:none}div.lui-dialog.lui-dialog>.lui-inner>section>i[class^="lui-icon"]{font-size:400%;display:inline-block;vertical-align:middle;text-align:center;margin-right:0.2em;line-height:0.9em}div.lui-dialog.lui-dialog-info>.lui-inner>section>i[class^="lui-icon"]{color:rgba(0,0,200,0.8)}div.lui-dialog.lui-dialog-alert>.lui-inner>section>i[class^="lui-icon"]{color:rgba(150,0,0,0.8)}div.lui-dialog.lui-dialog-confirm>.lui-inner>section>i[class^="lui-icon"]{color:rgba(0,0,200,0.8)}div.lui-dialog.lui-dialog-prompt>.lui-inner>section{white-space:nowrap}div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type="text"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type="password"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type="search"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section textarea{vertical-align:middle;font-size:inherit;border:1px solid rgba(0,0,0,0.5);border-radius:0.25em;width:15em;padding:0.25em;margin:0}div.lui-dialog.lui-dialog-prompt>.lui-inner>section textarea{vertical-align:top;width:20em;height:8em}');a.type="text/css",document.getElementsByTagName("head")[0].appendChild(a),a.styleSheet?a.styleSheet.cssText=b.nodeValue:a.appendChild(b)}()