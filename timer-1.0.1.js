/**
 * lovely.io 'timer' module v1.0.1
 *
 * Copyright (C) 2011 Nikolay Nemshilov
 */
Lovely("timer-1.0.1",["dom-1.0.0"],function(a){var b=this,c={},d,Class,e,f,Timer,g,h,c;h=this.Lovely.module("core"),d=this.Lovely.module("dom-1.0.0"),g=h.bind,f=h.Hash,Class=h.Class,e=d.Element,Timer=new Class(e,{include:h.Options,extend:{Options:{hours:!1,milli:!1,period:1e3}},constructor:function Timer(a){this.setOptions(a),a=f.reject(a,function(a){return a in Timer.Options}),this.$super("div",a),this.addClass("timer").reset(),b.setInterval(g(this.update,this),this.options.period);return this},reset:function(){this.time=new Date,this.active=!1;return this.removeClass("active").update(!0)},start:function(){this.active=!0,this.time=new Date;return this.addClass("active")},stop:function(){this.active=!1;return this.update(!0).removeClass("active")},update:function(a){var b,c,d,e,f;if(!this.active&&!a)return this;f=new Date-this.time,e=Math.floor(f/1e3),d=Math.floor(e/60),b=Math.floor(d/60),e=e%60,d=d%60,f=f%1e3,e<10&&(e="0"+e),d<10&&(d="0"+d),b<10&&(b="0"+b),f<100&&(f="0"+f),f.length<3&&(f="0"+f),c=""+d+":"+e,this.options.hours&&(c=""+b+":"+c),this.options.milli&&(c=""+c+"."+f),this._.innerHTML=c;return this}}),Timer.version="1.0.1",c=Timer;return c})