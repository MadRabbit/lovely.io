/**
 * lovely.io 'dialog' module v1.1.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("dialog-1.1.0",["dom-1.2.0","ui-1.1.2","ajax-1.1.1"],function(a){var b={},c,d,Class,Dialog,e,f,g,h,i,b,j;return i=this.Lovely.module("core"),c=this.Lovely.module("dom-1.2.0"),h=this.Lovely.module("ui-1.1.2"),d=this.Lovely.module("ajax-1.1.1"),j=i.ext,Class=i.Class,e=c.Element,f=c.Input,g=h.Modal,Dialog=new Class(g,{include:i.Options,extend:{Options:{nolock:!1,showHelp:!1,showHeader:!0,showButtons:!0,title:null,html:null,url:null,ajax:null}},constructor:function Dialog(a){var b,c=this;this.setOptions(a||(a={}));for(b in this.options)delete a[b];return this.$super(a).addClass("lui-dialog"),this.append('<header>\n  <h3>&nbsp;</h3>\n\n  <button class="lui-icon lui-icon-delete"></button>\n  <button class="lui-icon lui-icon-help"></button>\n</header>\n<section>\n\n</section>\n<footer>\n  <button class="lui-button lui-button-help">Help</button>\n  <button class="lui-button lui-button-ok">Ok</button>\n  <button class="lui-button lui-button-cancel">Cancel</button>\n</footer>'),this.header=this.dialog.first("header"),this.body=this._inner=this.dialog.first("section"),this.footer=this.dialog.first("footer"),this.options.showHelp||this.addClass("lui-dialog-nohelp"),this.options.showHeader||this.addClass("lui-dialog-noheader"),this.options.showButtons||this.addClass("lui-dialog-nofooter"),this.options.title&&this.title(this.options.title),this.options.html&&this.html(this.options.html),this.options.url&&this.load(this.options.url,this.options.ajax),this.header.first(".lui-icon-help").on("click",function(){return c.emit("help")}),this.header.first(".lui-icon-delete").on("click",function(){return c.emit("cancel")}),this.footer.first(".lui-button-help").on("click",function(){return c.emit("help")}),this.footer.first(".lui-button-ok").on("click",function(){return c.emit("ok")}),this.footer.first(".lui-button-cancel").on("click",function(){return c.emit("cancel")}),this.on("cancel","hide")},title:function(a){return a!=null?this.header.first("h3").html(a):this.header.first("h3").html()},load:function(a,b){var c=this;return this.append(this.locker||(this.locker=new h.Locker)),b||(b={}),b.method||(b.method="get"),this.ajax=(new d(a,b)).on("complete",function(){return c.update(c.ajax.responseText),c.emit("load")}).send(),this}}),Dialog.prototype.limit_size=function(a){return this.body._.style.maxHeight=a.y-this.header._.offsetHeight-this.footer._.offsetHeight-40+"px",this.body._.style.maxWidth=a.x-40+"px",this},Dialog.Alert=new Class(Dialog,{constructor:function Alert(b){return b||(b={}),b.title||(b.title="Alert"),this.$super(b),this.addClass("lui-dialog-with-icon"),this.addClass("lui-dialog-alert"),this.on("ok","hide")}}),Dialog.Prompt=new Class(Dialog,{constructor:function Prompt(b){var c,d=this;return b||(b={}),b.title||(b.title="Prompt"),c=b.type||"text",delete b.type,this.$super(b),this.addClass("lui-dialog-with-icon"),this.addClass("lui-dialog-prompt"),this.input=new f({type:c}),this.append(this.input),c!=="textarea"&&this.input.on("enter",function(){return d.emit("ok")}),this.on("ok","hide"),this.on("show",function(){return d.input.focus()})},emit:function(a,b){return a==="ok"&&(b||(b={}),b.value=this.input.value()),this.$super(a,b)}}),Dialog.Confirm=new Class(Dialog,{constructor:function Confirm(b){return b||(b={}),b.title||(b.title="Confirm"),this.$super(b),this.addClass("lui-dialog-with-icon"),this.addClass("lui-dialog-confirm"),this.on("ok","hide")}}),c(document).on("enter",function(a){var b;b=g.current;if(b!==null&&b instanceof Dialog&&!(a.target instanceof f))return b.emit("ok")}),b=j(Dialog,{version:"1.1.0"}),b}),function(){var a=document.createElement("style"),b=document.createTextNode("div.lui-dialog>.lui-inner{border:1px solid rgba(0,0,0,0.50);border-radius:0.25em;background:#fff;box-shadow:0 0 1em rgba(0,0,0,0.50);text-align:left;overflow:inherit}div.lui-dialog>.lui-inner>header,div.lui-dialog>.lui-inner>section,div.lui-dialog>.lui-inner>footer{padding:0.5em}div.lui-dialog>.lui-inner>header{background-color:rgba(0,0,0,0.20);background-image:-webkit-linear-gradient(rgba(0,0,0,0.15) 30%,rgba(255,255,255,0.00) 100%)}div.lui-dialog>.lui-inner>header h3{font-family:inherit;font-size:inherit;margin:0;padding:0;color:rgba(0,0,0,0.50)}div.lui-dialog>.lui-inner>header .lui-icon{float:right;margin-top:-1.3em;color:rgba(0,0,0,0.50)}div.lui-dialog>.lui-inner>section{position:relative;min-height:4em;min-width:20em;overflow:auto}div.lui-dialog>.lui-inner>footer{text-align:right}div.lui-dialog>.lui-inner>footer .lui-button-help{float:left}div.lui-dialog.lui-dialog-nohelp>.lui-inner>header .lui-icon-help,div.lui-dialog.lui-dialog-nohelp>.lui-inner>footer .lui-button-help{display:none}div.lui-dialog.lui-dialog-noheader>.lui-inner>header{display:none}div.lui-dialog.lui-dialog-nofooter>.lui-inner>footer{display:none}div.lui-dialog.lui-dialog-with-icon>.lui-inner{white-space:nowrap}div.lui-dialog.lui-dialog-with-icon>.lui-inner>section:before{content:'➥';color:rgba(0,0,0,0.70);font-size:300%;font-weight:bold;font-family:Georgia;display:inline-block;vertical-align:middle;width:1.2em;height:1.2em;line-height:1.2em;text-align:center;border:0.075em solid rgba(0,0,0,0.70);border-radius:0.7em;background:rgba(0,0,0,0.10);margin-right:0.2em}div.lui-dialog.lui-dialog-alert>.lui-inner>section:before{content:'!';color:rgba(200,0,0,0.80);border-color:rgba(200,0,0,0.80);background:rgba(200,0,0,0.10)}div.lui-dialog.lui-dialog-alert>.lui-inner>footer{text-align:center}div.lui-dialog.lui-dialog-alert>.lui-inner>footer .lui-button-help,div.lui-dialog.lui-dialog-alert>.lui-inner>footer .lui-button-cancel{display:none}div.lui-dialog.lui-dialog-confirm>.lui-inner>section:before{content:'?';color:rgba(0,0,200,0.80);border-color:rgba(0,0,200,0.80);background:rgba(0,0,200,0.10)}div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type=\"text\"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type=\"password\"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section input[type=\"search\"],div.lui-dialog.lui-dialog-prompt>.lui-inner>section textarea{vertical-align:middle;font-size:inherit;border:1px solid rgba(0,0,0,0.50);border-radius:0.25em;width:15em;padding:0.25em;margin:0}div.lui-dialog.lui-dialog-prompt>.lui-inner>section textarea{vertical-align:top;width:20em;height:8em}");a.type="text/css",document.getElementsByTagName("head")[0].appendChild(a),a.styleSheet?a.styleSheet.cssText=b.nodeValue:a.appendChild(b)}()