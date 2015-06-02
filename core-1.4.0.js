/**
 * lovely.io 'core' module v1.4.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
(function(e){var t=this,n,r,i,s,o,u,a,f,l,c,Class,Events,h,p,Hash,d,List,v,Lovely,m,Options,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D={}.hasOwnProperty;Lovely=function(){var e,t,r,i,s,o,u,a,f,l,c,h,p,d,v,m;e=n(arguments),i=A(e[0])?e.shift():null,l=L(e[0])?e.shift():{},a=N(e[0])?e.shift():[],t=C(e[0])?e.shift():function(){},"hostUrl"in l||(l.hostUrl=Lovely.hostUrl||x()),"baseUrl"in l||(l.baseUrl=Lovely.baseUrl||l.hostUrl),"waitSeconds"in l||(l.waitSeconds=Lovely.waitSeconds),l.hostUrl[l.hostUrl.length-1]==="/"||(l.hostUrl+="/"),l.baseUrl[l.baseUrl.length-1]==="/"||(l.baseUrl+="/");for(o=p=0,v=a.length;p<v;o=++p)f=a[o],f in Lovely.bundle&&(a[o]=""+f+"-"+Lovely.bundle[f]);r=O(a,t,i);if(!r()){M.push(r),s=document.getElementsByTagName("head")[0];for(o=d=0,m=a.length;d<m;o=++d)u=a[o],h=(u[0]==="."?l.baseUrl:l.hostUrl)+u+".js",u=a[o]=a[o].replace(/^[\.\/]+/,""),!T(u)&&!T(u,Lovely.loading)&&u.indexOf("~")===-1&&(c=document.createElement("script"),c.src=h.replace(/([^:])\/\//g,"$1/"),c.async=!0,c.type="text/javascript",c.onload=b,s.appendChild(c),Lovely.loading[u]=c)}},M=[],b=function(){return t.setTimeout(function(){var e,t,n,r,i;e=[];for(t=r=0,i=M.length;r<i;t=++r)n=M[t],n()||e.push(n);e.length!==M.length&&(M=e,b())},0)},O=function(e,n,r){return function(){var i,s,o,u,a;s=[];for(u=0,a=e.length;u<a;u++){i=e[u];if(!(i=T(i)))return!1;s.push(i)}return(o=n.apply(t,s))&&r&&(Lovely.modules[r]=o,delete Lovely.loading[r],b()),!0}},T=function(e,t){var n,r,i,s,o;t=t||Lovely.modules,e=e.replace(/~/g,""),s=(e.match(/\-\d+\.\d+\.\d+.*$/)||[""])[0],i=e.substr(0,e.length-s.length),s=s.substr(1);if(!(e=t[e])){o=[];for(n in t)(r=n.match(/^(.+?)-(\d+\.\d+\.\d+.*?)$/))&&r[1]===i&&o.push(n);e=t[o.sort()[o.length-1]]}return e},x=function(){var e,n,r,i,s,o;if(t.document){i=document.getElementsByTagName("script"),n=/^(.*?\/?)core(-.+)?\.js/;for(s=0,o=i.length;s<o;s++){r=i[s];if(e=(r.getAttribute("src")||"").match(n))return e[1]}}return Lovely.hostUrl},m=Object.prototype.toString,f=Array.prototype.slice,h=Function.prototype.bind||function(){var e,t,r;return e=n(arguments),t=e.shift(),r=this,function(){return r.apply(t,e.concat(n(arguments)))}},g=String.prototype.trim||function(){var e,t,n;n=this.replace(/^\s\s*/,""),e=n.length,t=/\s/;while(t.test(n.charAt(--e)));return n.slice(0,e+1)},n=function(e){return f.call(e,0)},d=function(e){return new List(e)},p=function(e){return new Hash(e)},S=function(e,t){t==null&&(t={});var n;for(n in t){if(!D.call(t,n))continue;e[n]=t[n]}return e},y=function(){var e;return e=n(arguments),h.apply(e.shift(),e)},_=function(e){return g.call(e)},A=function(e){return typeof e==="string"},k=function(e){return typeof e==="number"&&!isNaN(e)},C=function(e){return typeof e==="function"&&m.call(e)!=="[object RegExp]"},N=function(e){return m.call(e)==="[object Array]"||e instanceof List},L=function(e){return m.call(e)==="[object Object]"},w=function(e){return N(e)?e:[e]},Class=function(t,n){var r,i,s,o;C(t)||(n=t,t=Class),n||(n={}),D.call(n,"constructor")?r=n.constructor:r=function(){return this.$super===e?this:this.$super.apply(this,arguments)},i=function(){},i.prototype=t.prototype,r.prototype=new i;if(t!==Class){for(s in t){if(!D.call(t,s))continue;o=t[s],r[s]=o}r.prototype.$super=function(){return this.$super=t.prototype.$super,t.apply(this,arguments)},C(t.prototype.whenInherited)&&t.prototype.whenInherited.call(t,r)}return r.__super__=t,r.prototype.constructor=r,(r.include=Class.include).apply(r,w(n.include||[])),(r.extend=Class.extend).apply(r,w(n.extend||[])),r.inherit=Class.inherit,delete n.extend,delete n.include,delete n.constructor,r.include(n)},S(Class,{include:function(){var e,t,n,r,i,s,o;for(s=0,o=arguments.length;s<o;s++){n=arguments[s],n||(n={});for(e in n){if(!(i=this.prototype[e]||!1)){r=this.__super__;while(r){if(e in r.prototype){C(r.prototype[e])&&(i=r.prototype[e]);break}r=r.__super__}}t=n[e],this.prototype[e]=function(e,t){return t?function(){return this.$super=t,e.apply(this,arguments)}:e}(t,i)}}return this},extend:function(){var e,t,n;for(t=0,n=arguments.length;t<n;t++)e=arguments[t],S(this,e);return this},inherit:function(e){return new Class(this,e)}}),List=new Class(Array,{constructor:function List(t){return t!==e&&c.apply(this,[0,0].concat(t)),this},slice:function(){return new this.constructor(f.apply(this,arguments))},concat:function(e){return new this.constructor(n(this).concat(n(e)))},forEach:function(){return v(s,this,arguments),this},map:function(){return new List(v(o,this,arguments))},filter:function(){return new this.constructor(v(i,this,arguments))},reject:function(){return new this.constructor(v(a,this,arguments))},some:function(){return v(l,this,arguments)},every:function(){return v(r,this,arguments)},toArray:function(){return n(this)},toString:function(){return"#<List ["+n(this)+"]>"}}),u=Array.prototype,f=u.slice,c=u.splice,s=u.forEach,o=u.map,i=u.filter,a=function(e,t){return i.call(this,function(){return!e.apply(t,arguments)})},l=u.some,r=u.every,v=function(e,t,r){var i,s;return typeof r[0]=="string"&&(s=n(r),i=s.shift(),t.length!==0&&typeof t[0][i]=="function"?r=[function(e){return e[i].apply(e,s)}]:r=[function(e){return e[i]}]),e.apply(t,r)},Hash=new Class({_:null,constructor:function Hash(e){return this._=e||{},this}}),Hash.include=function(e){var t,r;Class.include.apply(Hash,arguments),r=[];for(t in e)r.push(function(e){return Hash[e]=function(){var t,r;return t=n(arguments),r=new Hash(t.shift()),t=r[e].apply(r,t),t instanceof Hash&&(t=t._),t}}(t));return r},Hash.include({keys:function(){var e,t,n;t=this._,n=[];for(e in t){if(!D.call(t,e))continue;n.push(e)}return n},values:function(){var e,t,n,r;n=this._,r=[];for(e in n){if(!D.call(n,e))continue;t=n[e],r.push(t)}return r},empty:function(){var e,t;t=this._;for(e in t){if(!D.call(t,e))continue;return!1}return!0},clone:function(){return this.merge()},forEach:function(e,t){var n,r,i;r=this._;for(n in r){if(!D.call(r,n))continue;i=r[n],e.call(t,n,i,r)}return this},map:function(e,t){var n,r,i,s;r=this._,i=[];for(n in r){if(!D.call(r,n))continue;s=r[n],i.push(e.call(t,n,s,r))}return i},filter:function(e,t){var n,r,i,s;i=this._,n={};for(r in i){if(!D.call(i,r))continue;s=i[r],e.call(t,r,s,i)&&(n[r]=i[r])}return new Hash(n)},reject:function(e,t){var n,r,i,s;i=this._,n={};for(r in i){if(!D.call(i,r))continue;s=i[r],e.call(t,r,s,i)||(n[r]=i[r])}return new Hash(n)},merge:function(){var e,t,r,i,s;e=n(arguments),t={},e.unshift(this._);while(e.length>0){i=e.shift(),i instanceof Hash&&(i=i._);for(r in i){if(!D.call(i,r))continue;s=i[r],t[r]=!L(s)||s instanceof Class?i[r]:Hash.merge(r in t?t[r]:{},s)}}return new Hash(t)},toObject:function(){return this._}}),Events={_listeners:null,on:function(){var e,t,n,r,i,s,o,u,a;e=f.call(arguments,2),i=arguments[0],n=arguments[1],t=!1,typeof n==="string"&&(n=this[n],t=!0),s=this._listeners===null?this._listeners=[]:this._listeners;if(typeof i==="string"){a=i.split(",");for(o=0,u=a.length;o<u;o++)r=a[o],s.push({e:r,c:n,a:e,n:t})}else if(typeof i==="object")for(r in i)this.on(r,i[r]);return this},no:function(){var t,n,r,i,s,o,u,a,l;t=f.call(arguments,2),i=arguments[0],n=arguments[1],typeof n==="string"&&(n=this[n]),o=this._listeners===null?this._listeners=[]:this._listeners;switch(typeof i){case"string":l=i.split(",");for(u=0,a=l.length;u<a;u++){r=l[u],s=0;while(s<o.length)o[s].e===r&&(o[s].c===n||n===e)&&o.splice(s--,1),s++}break;case"function":s=0;while(s<o.length)o[s].c===i&&o.splice(s--,1),s++;break;case"object":for(r in i)this.no(r,i[r])}return this},ones:function(){var t,n,r,i,s,o,u,a,l,c,h,p,d,v;u=0,t=f.call(arguments,2),s=arguments[0],n=arguments[1],typeof n==="string"&&(n=this[n]),o=this._listeners===null?this._listeners=[]:this._listeners;switch(typeof s){case"string":v=s.split(",");for(a=0,h=v.length;a<h;a++){i=v[a];for(l=0,p=o.length;l<p;l++)r=o[l],u|=r.e===i&&(r.c===n||n===e)}break;case"function":for(c=0,d=o.length;c<d;c++)r=o[c],u|=r.c===s;break;case"object":for(i in s)u|=this.ones(i,s[i])}return u===1},emit:function(){var e,t,r,i,s,o;e=n(arguments),r=e.shift(),o=this._listeners||[];for(i=0,s=o.length;i<s;i++)t=o[i],t.e===r&&t.c.apply(this,t.a.concat(e));return this}},Options={options:{},setOptions:function(e){var t,n;n=this.constructor,t={};while(n){if("Options"in n){t=n.Options;break}n=n.__super__}return this.options=Hash.merge(t,e),this}},E=S(Lovely,{version:"1.4.0",modules:{},loading:{},baseUrl:"",hostUrl:"",module:T,bundle:{},A:n,L:d,H:p,ext:S,bind:y,trim:_,isString:A,isNumber:k,isFunction:C,isArray:N,isObject:L,Class:Class,List:List,Hash:Hash,Events:Events,Options:Options}),Lovely.modules["core-"+Lovely.version]=Lovely,t.Lovely=Lovely}).apply(this)