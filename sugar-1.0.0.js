/**
 * lovely.io 'sugar' module v1.0.0
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Lovely("sugar-1.0.0",["dom-1.0.0"],function(a){var b=this,c={},d,e,f,g,h,i,j,k,l,m,n,o,p=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1};f=this.Lovely.module("core"),h=this.Lovely.module("dom-1.0.0"),d=f.A,i=f.ext,g=b.document,e="$super constructor document window _listeners on no ones delegate undelegate delegates".split(" ");for(l in h.Element.prototype){if(p.call(e,l)>=0)continue;h.Search.prototype[l]&&!String.prototype[l]&&function(a){return String.prototype[a]=function(){var b;b=h(""+this);return b[a].apply(b,arguments)}}(l)}o={on:"delegate",no:"undelegate",ones:"delegates"},n=function(a,b){return String.prototype[a]=function(){var a;a=h(g),a[b].apply(a,[""+this].concat(d(arguments)));return this}};for(k in o)m=o[k],n(k,m);j=function(a,b){var c,e,f,g,i;i=b.split(" "),e=function(b){k="on"+(b[0].toUpperCase()+b.substr(1));return a.prototype[k]=h.Search.prototype[k]=String.prototype[k]=function(){return this.on.apply(this,[b].concat(d(arguments)))}};for(f=0,g=i.length;f<g;f++)c=i[f],e(c)},j(h.Element,"click rightclick contextmenu mousedown mouseup mouseover mouseout mousemove keypress keydown keyup"),j(h.Input,"submit reset focus blur disable enable change"),j(h.Form,"submit reset focus blur disable enable change"),c.version="1.0.0";return c})