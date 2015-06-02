/**
 * lovely.io 'fx' module v1.0.1
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Lovely("fx-1.0.1",["dom-1.0.1"],function(a){var b=this,c={},d,e,f,g,h,i,Class,j,Fx,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,c,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X;D=this.Lovely.module("core"),d=this.Lovely.module("dom-1.0.1"),G=D.ext,z=D.bind,Class=D.Class,x=D.List,v=D.Hash,I=D.isObject,j=d.Element,h=d.Browser,u=b.document.documentElement,w="filter"in u.style&&!("opacity"in u.style),Fx=new Class({include:[D.Options,D.Events],extend:{Options:{duration:"normal",transition:"default",queue:!0,engine:"css",fps:60},Durations:{"short":200,normal:400,"long":800}},constructor:function Fx(a,b){var c;this.setOptions(b);for(c in this.options)(c==="start"||c==="finish"||c==="cancel"||c==="stop")&&this.on(c,this.options[c]);this.element=d(a),typeof a==="string"&&(this.element=this.element[0]),n(this);return this},start:function(){if(k(this,arguments))return this;m(this),this.prepare.apply(this,arguments),s(this);return this.emit("start")},finish:function(){t(this),o(this),this.emit("finish"),p(this);return this},cancel:function(){t(this),o(this);return this.emit("cancel").emit("stop")},emit:function(a){D.Events.emit.apply(this,arguments),this.element.emit("fx:"+a,{fx:this});return this}}),r=new x,q=new x,n=function(a){var b;b=d.uid((a.element||{})._||{}),a._ch=r[b]=r[b]||new x;return a._cr=q[b]=q[b]||new x},k=function(a,b){var c,d;c=a._ch,d=a.options.queue;if(!c||a._$ch)return a._$ch=!1;d&&c.push([b,a]);return d&&c[0][1]!==a},m=function(a){if(a._cr)return a._cr.push(a)},o=function(a){var b;b=a._cr;if(b)return b.splice(b.indexOf(a),1)},p=function(a){var b,c;b=a._ch,c=b.shift(),(c=b[0])?(c[1]._$ch=!0,c[1].start.apply(c[1],c[0])):a.emit("stop")},l=function(a){var b;b=d.uid(a._),q[b]&&q[b].forEach("cancel"),Fx_scheduled_fx[b]&&Fx_scheduled_fx[b].splice(0)},s=function(a,b){var c,d,e,f,h;b=a.options,c=Fx.Durations[b.duration]||b.duration,f=Math.ceil(c/1e3*b.fps),h=g(b.transition,f),d=Math.round(1e3/b.fps),e=0;return a._timer=setInterval(function(){if(e===f)return a.finish();a.render(h[e]);return e++},d)},t=function(a){if(a._timer)return clearInterval(a._timer)},f={"default":"(.25,.1,.25,1)",linear:"(0,0,1,1)","ease-in":"(.42,0,1,1)","ease-out":"(0,0,.58,1)","ease-in-out":"(.42,0,.58,1)","ease-out-in":"(0,.42,1,.58)"},e={},g=function(a,b){var c,d,g,h,i,j,k,l,m,n,o,p,q,r;a=f[a]||a,a=a.match(/([\d\.]+)[\s,]+([\d\.]+)[\s,]+([\d\.]+)[\s,]+([\d\.]+)/),a=[0,a[1]-0,a[2]-0,a[3]-0,a[4]-0],o=a.join(",")+","+b;if(!(o in e)){i=3*a[1],g=3*(a[3]-a[1])-i,c=1-i-g,j=3*a[2],h=3*(a[4]-a[2])-j,d=1-j-h,k=function(a){return a*(i+a*(g+a*c))},m=function(a){return a*(j+a*(h+a*d))},l=function(a){return i+a*(2*g+a*3*c)+.001},n=function(a){var b,c,d,e;d=a,b=0,c=5;while(b<5){e=k(d)-a;if(Math.abs(e)<.001)break;d=d-e/l(d),b++}return d},e[o]=p=[],r=0,q=1/b;while(r<1.0001)p.push(m(n(r))),r+=q}return e[o]},Fx.Attr=new Class(Fx,{prepare:function(a){var b,c;this.before={},this.after=a,b=this.element._;for(c in a)this.before[c]=b[c]},render:function(a){var b,c,d,e;d=this.element._,c=this.before,b=this.after;for(e in c)d[e]=c[e]+(b[e]-c[e])*a}}),Fx.Scroll=new Class(Fx.Attr,{constructor:function(a,b){var c;this.$super(a,b),this.element instanceof d.Window&&(c=this.element._.document,this.element=c.body||c.documentElement);return this},prepare:function(a){var b;b={},"x"in a&&(b.scrollLeft=a.x),"y"in a&&(b.scrollTop=a.y);return this.$super(b)}}),Fx.Style=new Class(Fx,{prepare:function(a){var b,c,d;this.options.engine==="css"&&N!==null?(this.render=function(){},O.call(this,a)):(d=S(a),c=C(this.element,d),b=F(this.element,a,d),B(this.element,c,b),this.before=R(c),this.after=R(b))},render:function(a){var b,c,d,e=this.element._.style,f=Math.round,g,h,i;for(g in this.after){b=this.before[g],c=this.after[g];for(h=0,i=c.length;h<i;h++)d=b[h]+(c[h]-b[h])*a,c.r&&(d=Math.round(d)),c.t[h*2+1]=d;e[g]=c.t.join("")}}}),N=null,X=["WebkitT","OT","MozT","MsT","t"];for(V=0,W=X.length;V<W;V++){K=X[V];if(""+K+"ransition"in u.style){N=K;break}}Q=N+"ransition",P=Q+"Property",L=Q+"Duration",M=Q+"TimingFunction",O=function(a){var b,c,d,e,f;e=this.options,b=this.element,c=b._.style,d=b.style(""+P+" "+L+" "+M),f=function(){var a,b;b=[];for(a in d)b.push(c[a]=d[a]);return b},this.on({finish:f,cancel:function(){c[P]="none";return setTimeout(f,1)}}),c[P]="all",c[M]=e.transition,c[L]=(Fx.Durations[e.duration]||e.duration)+"ms";return setTimeout(function(){return b.style(a)},0)},Fx.Options.engine=N===null||h==="Opera"?"javascript":"css",E=["Top","Left","Right","Bottom"],y=function(a,b,c){var d,e,f;for(e=0,f=c.length;e<f;e++)d=c[e],a.push(b+d)},S=function(a){var b,c,d,e,f,g,h,i,j;d=[];for(c in a)if(c.substr(0,6)==="border"){j=["Style","Color","Width"];for(f=0,h=j.length;f<h;f++){e=j[f];for(g=0,i=E.length;g<i;g++)b=E[g],d.push("border"+b+e)}}else c==="margin"||c==="padding"?y(d,c,E):c.substr(0,10)==="background"?y(d,"background",["Color","Position","PositionX","PositionY"]):c==="opacity"&&w?d.push("filter"):d.push(c);return d},J=function(a){return a==="transparent"||a==="rgba(0, 0, 0, 0)"},A=function(b,c,d){var e,f,g,h,i,j,k,l;l=[];for(j=0,k=E.length;j<k;j++)h=E[j],f="border"+h+"Style",g="border"+h+"Width",e="border"+h+"Color",l.push(f in c&&c[f]!==d[f]?(i=b._.style,c[f]==="none"?i[g]="0px":a,i[f]=d[f],J(c[e])?i[e]=b.style("Color"):a):void 0);return l},R=function(a){var b,c,d,e,f,g,h,i,j,k,l;f={},e=/[\d\.\-]+/g;for(d in a){h=[],l=a[d].match(e);for(i=0,j=l.length;i<j;i++)b=l[i],h.push(parseFloat(b));h.t=a[d].split(e),h.r=h.t[0]==="rgb(",h.t.length===1&&h.t.unshift("");for(c=0,k=h.length;c<k;c++)g=h[c],h.t.splice(c*2+1,0,g);f[d]=h}return f},B=function(b,c,d){var e,f;for(e in d)(e==="width"||e==="height")&&c[e]==="auto"&&(e[0]=e[0].toUpperCase(),c[e]=b._["offset"+e]+"px");w&&d.filter&&!c.filter&&(c.filter="alpha(opacity=100)"),A(b,c,d),f=[];for(e in d){if(d[e]!==c[e]&&/color/i.test(e)){J(d[e])||(d[e]=U(d[e])),J(c[e])||(c[e]=U(c[e]));if(!d[e]||!c[e])d[e]=c[e]=""}/\d/.test(d[e])&&!/\d/.test(c[e])&&(c[e]=d[e].replace(/[\d\.\-]+/g,"0")),f.push(d[e]===c[e]||!/\d/.test(c[e])||!/\d/.test(d[e])?(delete d[e],delete c[e]):a)}return f},C=function(b,c){var d,e,f,g,h;e={};for(g=0,h=c.length;g<h;g++)d=c[g],f=b.style(d),f!==a&&(e[d]=""+f),d==="opacity"&&(e[d]=e[d].replace(",","."));return e},F=function(a,b,c){var d,e;e=a.clone(),e.style("position:absolute;z-index:-1;visibility:hidden"),e.size({x:a.size().x}),e.style(b),a.parent()&&a.insert(e,"before"),d=C(e,c),e.remove();return d},Fx.Highlight=new Class(Fx.Style,{extend:{Options:v.merge(Fx.Options,{color:"#FF8",transition:"ease-out"})},prepare:function(a,b){var c,d,e,f;c=this.element,d=c._.style,f="backgroundColor",e=b||c.style(f),J(e)&&(this.on("finish",function(){return d[f]="transparent"}),e=(new x([c])).concat(c.parents()).map("style",f).reject(function(a){return!a||J(a)}),e=e[0]||"#FFF"),d[f]=a||this.options.color;return this.$super({backgroundColor:e})}}),Fx.Twin=new Class(Fx.Style,{finish:function(){this.direction==="out"&&j.prototype.hide.call(this.element);return this.$super()},setDirection:function(a){if(!a||a==="toggle")a=this.element.visible()?"out":"in";this.direction=a}}),Fx.Fade=new Class(Fx.Twin,{prepare:function(a){this.setDirection(a),this.direction==="in"&&j.prototype.show.call(this.element.style({opacity:0}));return this.$super({opacity:this.direction==="in"?1:0})}}),Fx.Slide=new Class(Fx.Twin,{extend:{Options:v.merge(Fx.Options,{direction:"top"})},prepare:function(a){var b,c,d,e;this.setDirection(a),b=j.prototype.show.call(this.element),c=b._.style,d=b.style("overflow width height marginTop marginLeft"),e=function(){return G(c,d)},this.on("finish cancel",e),c.overflow="hidden",F=H(c,b.size(),this.options.direction,this.direction);return this.$super(F)}}),H=function(a,b,c,d){var e,f,g,h,i,j;g={},e=parseFloat(a.marginLeft)||0,f=parseFloat(a.marginTop)||0,i=c==="right",h=c==="bottom",j=c==="top"||h,d==="out"?(g[j?"height":"width"]="0px",i?g.marginLeft=e+b.x+"px":h&&(g.marginTop=f+b.y(NaN))):(j?(g.height=b.y+"px",a.height="0px"):(g.width=b.x+"px",a.width="0px"),i?(g.marginLeft=e+"px",a.marginLeft=e+b.x+"px"):h&&(g.marginTop=f+"px",a.marginTop=f+b.y+"px"));return g},j.include({animate:function(a,b){(new Fx.Style(this,b)).start(a);return this},stopFx:function(){l(this);return this},fade:function(a,b){(new Fx.Fade(this,b)).start(a);return this},slide:function(a,b){(new Fx.Slide(this,b)).start(a);return this},highlight:function(a,b,c){(new Fx.Highlight(this,c)).start(a,b);return this},scroll:function(a,b){I(b)?(new Fx.Scroll(this,b)).start(a):this.$super(a,b);return this}}),U=function(a,b){var c,d;d=/#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/i.exec(T(a)||""),d&&(d=function(){var a,b,e,f;e=d.slice(1),f=[];for(a=0,b=e.length;a<b;a++)c=e[a],f.push(parseInt(c,16));return f}(),d=b?d:"rgb("+d+")");return d},T=function(a){var b,c,d,e,f;c=/^#(\w)(\w)(\w)$/.exec(a);if(c)c="#"+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];else if(c=/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(a)){d=c.slice(1),c="#";for(e=0,f=d.length;e<f;e++)b=d[e],b=(b-0).toString(16),c+=b.length===1?"0"+b:b}else c=i[a]||a;return c},i={maroon:"#800000",red:"#ff0000",orange:"#ffA500",yellow:"#ffff00",olive:"#808000",purple:"#800080",fuchsia:"#ff00ff",white:"#ffffff",lime:"#00ff00",green:"#008000",navy:"#000080",blue:"#0000ff",aqua:"#00ffff",teal:"#008080",black:"#000000",silver:"#c0c0c0",gray:"#808080",brown:"#a52a2a"},c=G(Fx,{version:"1.0.1"});return c})