/**
 * lovely.io 'cookie' module v1.0.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("cookie-1.0.0",[],function(a){var b=this,c={},Class,Cookie,d,e,c,f;return d=this.Lovely.module("core"),f=d.ext,Class=d.Class,e=b.document,Cookie=new Class({extend:{set:function(a,b,c){return(new Cookie(a,c)).set(b)},get:function(a,b){return(new Cookie(a)).get()},remove:function(a,b){return(new Cookie(a,b)).remove()},enabled:function(){return Cookie.Options.document.cookie="__t=1",Cookie.Options.document.cookie.indexOf("__t=1")!==-1},Options:{document:e,secure:!1,domain:null,path:null,ttl:null}},constructor:function g(a,b){return this.options=f(f({},Cookie.Options),b),this.name=a,this},set:function(a){var b;return typeof a==="object"&&(a=JSON.stringify(a)),a=escape(a),this.options.domain&&(a+="; domain="+this.options.domain),this.options.path&&(a+="; path="+this.options.path),this.options.secure&&(a+="; secure"),this.options.ttl&&(b=new Date,b.setTime(b.getTime()+this.options.ttl*24*60*60*1e3),a+="; expires="+b.toGMTString()),this.options.document.cookie=""+escape(this.name)+"="+a,this},get:function(){var b,c;c=escape(this.name),c="(?:^|;)\\s*"+c.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1")+"=([^;]*)",b=this.options.document.cookie.match(c);if(b){b=unescape(b[1]);try{b=JSON.parse(b)}catch(d){}}return b||a},remove:function(){return this.get()!==a&&(this.options.ttl=-1,this.set("")),this}}),Cookie.version="1.0.0",c=Cookie,c})