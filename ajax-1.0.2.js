/**
 * lovely.io 'ajax' module v1.0.2
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Lovely("ajax-1.0.2",["dom-1.0.2"],function(a){var b=this,c={},d,Ajax,e,f,g,h,i,Class,j,k,l,m,n,o,p,q,r,c,s,t,u;return d=this.Lovely.module("dom-1.0.2"),q=this.Lovely.module("core"),s=q.ext,p=q.bind,m=q.Hash,Class=q.Class,t=q.isArray,u=q.isObject,r=d(b.document),k=d.Form,j=d.Element,n=b.JSON,Ajax=new Class({include:[q.Options,q.Events],extend:{Options:{method:"post",encoding:"utf-8",evalResponse:!1,evalJS:!0,evalJSON:!0,urlEncoded:!0,spinner:null,params:null,jsonp:!1,headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript,text/html,application/xml,text/xml,*/*"}},load:function(a,b){return b||(b={}),"method"in b||(b.method="get"),(new Ajax(a,b)).send()}},_:null,url:null,status:null,responseText:null,responseXML:null,responseJSON:null,headerJSON:null,constructor:function Ajax(a,b){var c,d,e;this.url=a,this.options=s({},Ajax.Options),this.options=s(this.options,b),this.on({success:"evalScripts",create:"showSpinner",complete:"hideSpinner",cancel:"hideSpinner"}),e=this.options;for(c in e)d=e[c],(c==="success"||c==="failure"||c==="complete"||c==="create"||c==="request"||c==="progress"||c==="cancel")&&this.on(c,d);return this},header:function(a,b){if(arguments.length===1)try{return this._.getResponseHeader(a)}catch(c){return}else this.options.headers[a]=b;return this},successful:function(){return this.status>=200&&this.status<400},send:function(){var a,b,c,d,e,h,j;d=this.options,a=this.options.headers,e=f(Ajax.Options.params,d.params),b=this.options.method.toLowerCase(),h=this.url;if(b==="put"||b==="delete")e._method=b,b="post";b==="post"&&d.urlEncoded&&!a["Content-type"]&&(a["Content-type"]="application/x-www-form-urlencoded;charset="+d.encoding),e=m.toQueryString(e),b==="get"&&(e&&(h=h+(h.indexOf("?")===-1?"?":"&"),h+=e),e=null),j=this._=this.options.jsonp?new o(this):new XMLHttpRequest,this.emit("create"),j.open(b,h,!0),j.onreadystatechange=i(this),"upload"in j&&(j.upload.onprogress=j.upload.onload=p(function(a){if(a.lengthComputable)return this.emit("progress",{loaded:a.loaded,total:a.total})},this));for(c in a)j.setRequestHeader(c,a[c]);return j.send(g(e,d)),this.emit("request"),j instanceof o&&j.onreadystatechange(),this},cancel:function(){return!this._||this.__canceled?this:(this._.abort(),this._.onreadystatechange=function(){},this._.canceled=!0,this.emit("cancel"))},emit:function(a,b){return b=s({ajax:this},b),this.$super(a,b),r.emit("ajax:"+a,b),this},evalScripts:function(){var a,b;a=this.header("Content-type")||"",b=this.options,b.evalResponse||b.evalJS&&/(ecma|java)script/i.test(a)?d.eval(this.responseText):b.evalJSON&&/json/i.test(a)&&(this.responseJSON=n.parse(this.responseText));if(b=this.header("X-JSON"))this.headerJSON=n.parse(b)},showSpinner:function(){return h(this,"show")},hideSpinner:function(){return h(this,"hide")}}),e=0,h=function(a,b){var c,f;return f=a.options.spinner,f=f&&d(f)[0],c=Ajax.Options.spinner,c=c&&d(c)[0],f&&(f===c?(e+=b==="show"?1:-1,(b==="show"||e<1)&&f[b]()):f[b]()),a},f=function(){var a,b,c,d,e;a={};for(d=0,e=arguments.length;d<e;d++){c=arguments[d],typeof c==="string"?c=m.fromQueryString(c):c instanceof k&&(c=c.values());for(b in c)a[b]=c[b]}return a},g=function(a,c){var d,e,f,g;if((e=c.params)instanceof k&&e.first('input[type="file"]')){d=new b.FormData(e._),a=m.fromQueryString(a);for(f in a)g=a[f],e.input(f)||d.append(f,g);a=d}return a},i=function(a){var b;return b=a._,function(){if(b.readyState!==4||b.canceled)return;try{a.status=b.status}catch(c){a.status=0}return a.responseText=b.responseText,a.responseXML=b.responseXML,a.emit("complete"),a.emit(a.successful()?"success":"failure")}},o=new Class({constructor:function o(a){return this.ajax=a,this.name="__lovely_jsonp"+(new Date).getTime(),this.param=a.options.jsonp,typeof this.jsonp=="string"&&(this.param="callback"),this.param+="="+this.name,this.script=new j("script",{charset:a.options.encoding,async:!0})},open:function(a,b,c){return this.url=b,this.method=a},send:function(a){var c;return b[this.name]=p(this.finish,this),c=this.url+(this.url.indexOf("?")===-1?"?":"&")+this.param+"&"+a,this.script.attr("src",c).insertTo(d("head")[0])},finish:function(a){return this.status=200,this.readyState=4,this.ajax.responseJSON=a,this.onreadystatechange()},abort:function(){return b[this.name]=function(){}},setRequestHeader:function(){},onreadystatechange:function(){}}),m.include({toQueryString:function(){var a;return a=[],this.forEach(function(b,c){var d,e,f,g,h;if(t(c))b.substr(b.length-2)!=="[]"&&(b+="[]");else if(u(c)){for(d in c)a.push(""+encodeURIComponent(b+"["+d+"]")+"="+encodeURIComponent(c[d]));c=[]}else c=[c];h=[];for(f=0,g=c.length;f<g;f++)e=c[f],h.push(a.push(""+encodeURIComponent(b)+"="+encodeURIComponent(e)));return h}),a.join("&")}}),m.fromQueryString=function(a){var b,c,d,e,f,g,h,i,j;b={},i=(a||"").split("&");for(g=0,h=i.length;g<h;g++)e=i[g],e.indexOf("=")!==-1&&(j=e.split("="),c=j[0],f=j[1],c.substr(c.length-2)==="[]"?(c=c.substr(0,c.length-2),b[c]||(b[c]=[]),b[c].push(f)):(d=c.match(/^(.+?)\[([^\]]+)\]$/))?(c=d[1],b[c]||(b[c]={}),b[c][d[2]]=f):b[c]=f);return b},k.include({remote:!1,send:function(a){return a||(a={}),a.method=a.method||this._.method||"post",a.spinner=a.spinner||this.first(".spinner"),a.params=this,this.ajax=new Ajax(this._.action||b.document.location.href,a),this.ajax.on("complete",p(this.enable,this)),this.ajax.on("cancel",p(this.enable,this)),this.ajax.send(),setTimeout(p(this.disable,this),1),this},cancelAjax:function(){return this.ajax instanceof Ajax&&this.ajax.cancel(),this},remotize:function(a){return this.remote||(this.on("submit",l,a),this.remote=!0),this},unremotize:function(){return this.remote&&(this.no("submit",l),this.remote=!1),this},serialize:function(){return m.toQueryString(this.values())}}),l=function(a,b){return a.stop(),this.send(b)},j.include({load:function(a,b){return this.ajax=new Ajax(a,m.merge({method:"get"},b)),this.ajax.on("success",p(function(a){return this.update(a.responseText)},this)),this.ajax.send(),this}}),c=s(Ajax,{version:"1.0.2"}),c})