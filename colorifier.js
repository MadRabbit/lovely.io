/**
 * lovely.io 'colorifier' module v1.4.0
 *
 * Copyright (C) 2013 Nikolay Nemshilov
 */
Lovely("colorifier-1.4.0",["dom-1.4.3"],function(){[][0];var e,Class,Colorifier,t,r,i,o,n,s,a,l,n={};return r=Lovely.module("core"),e=Lovely.module("dom-1.4.3"),s=r.ext,Class=r.Class,t=e.Element,o=function(e){return e.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1")},Colorifier=new Class(t,{include:r.Options,extend:{Options:{tag:"pre",attr:"data-lang",theme:"light",gutter:!0,trim:!0},initialize:function(){e(""+Colorifier.Options.tag+"["+Colorifier.Options.attr+"]").forEach(function(e){var t,r;return(r=e.attr(Colorifier.Options.attr))?(t=Colorifier[r]||Colorifier.unsupported,t=e.colorifier||(e.colorifier=new t(e,r))):undefined})}},comments:"",strings:"',\"",keywords:"",objects:"",booleans:"",regexps:[/([^\*\\\/;])(\/[^\*\/][^\n]*?[^\*\n\\](?!\\\/)\/[a-z]*)/g],styles2copy:"font-family,font-size,font-weight,line-height,,margin-top,margin-left,margin-right,margin-bottom",constructor:function Colorifier(e,r){var i,o,n,s;return e?(this.setOptions(e.data("colorifier")),this.$super("div",{"class":"colorifier"}),s=e.html(),s=s.replace(/</g,"&lt;"),s=s.replace(/>/g,"&gt;"),this.options.trim&&(s=s.replace(/(^\s*\n)|(\s+$)/g,"")),this.ref=e.html(this.paint(s)),this.style(e.style(this.styles2copy)),this.insertTo(e.hide(),"before"),this.options.gutter&&(n=function(){var e,t,r,n;for(r=s.split("\n"),n=[],i=e=0,t=r.length;t>e;i=++e)o=r[i],n.push(i);return n}(),this.insert(new t("div",{"class":"gutter",html:n.join("<br/>")}))),this.insert(new t("div",{"class":"code"}).html(e.html())),this.addClass(this.options.theme).data({lang:r})):this},paint:function(e,t){return e=this._strings(e),e=this._regexps(e),e=this._comments(e),e=this._numbers(e),e=this._keywords(e),e=this._methods(e),t&&(e=t.call(this,e)),this._rollback(e)},_comments:function(e){var t,r,i,n,s,a,l;if(!this.comments)return e;for(i=[],l=this.comments.split(","),s=0,a=l.length;a>s;s++)n=l[s],t=n.split(" "),r=t[1]?RegExp("(.?)("+o(t[0])+"[\\s\\S]*?"+o(t[1])+")(.*)","mg"):RegExp("(.?)("+o(t[0])+".*?)(\n|$)","g"),i.push([r,"comment","$1 $3"]);return this._prepare(e,i)},_strings:function(e){var t,r,i,n,s,a,l,c,d;if(!this.strings)return e;for(i=[],d=this.strings.split(","),s=0,l=d.length;l>s;s++)for(n=d[s],r=[RegExp("([^\\\\])(("+o(n)+")(\\3))","mg"),RegExp("([^\\\\])(("+o(n)+")(.|\n)*?[^\\\\](\\3))","mg")],a=0,c=r.length;c>a;a++)t=r[a],i.push([t,"string","$1 "]);return this._prepare(e,i)},_regexps:function(e){var t,r,i,o,n;if(!this.regexps)return e;for(r=[],n=this.regexps,i=0,o=n.length;o>i;i++)t=n[i],r.push([t,"regexp","$1 "]);return this._prepare(e,r)},_numbers:function(e){return this._prepare(e,[[/([^'"\d\w\.])([\d]+)(?!['"\d\w\.])/g,"integer","$1 "],[/([^'"\d\w\.])(\d*\.\d+)(?!['"\d\w\.])/g,"float","$1 "]])},_keywords:function(e){var t,r,i,o,n,s;for(i=[],s=["keyword","object","boolean"],o=0,n=s.length;n>o;o++)t=s[o],(r=this[t+"s"].replace(/,/g,"|"))&&(r=RegExp("([^a-zA-Z0-9_]|^)("+r+")(?![a-zA-Z0-9_])","g"),i.push([r,t,"$1 "]));return this._prepare(e,i)},_methods:function(e){return this._prepare(e,[[/([^a-zA-Z0-9_]|^)([A-Z][a-zA-Z_0-9]+)(?![a-zA-Z0-9_])/g,"unit","$1 "],[/(\.)([a-z_$][a-z0-9_]*)(?![a-z0-9_\(])/gi,"attribute","$1 "],[/(\.)([a-z_$][a-z0-9_]*)(\()/gi,"method","$1 $3"]])},_prepare:function(e,t){var r,i,o,n,s,a,l;for(this.___||(this.___=[]),n=this.___,s=0,a=t.length;a>s;s++)l=t[s],o=l[0],r=l[1],i=l[2],e=e.replace(o,function(e,t,o,s,a){return n.push('<span class="'+r+'">'+o+"</span>"),i.replace(" ","___dummy_"+n.length+"___").replace("$1",t).replace("$3",s).replace("$4",a)});return e},_rollback:function(e){var t,r,i;for(t=r=i=this.___.length-1;0>=i?0>=r:r>=0;t=0>=i?++r:--r)e=e.replace("___dummy_"+(t+1)+"___",this.___[t]);return e}}),Colorifier.js=Colorifier.javascript=new Class(Colorifier,{comments:"/* */,//",keywords:"function,return,for,if,else,while,do,throw,try,catch,instanceof,break,continue",objects:"var,new,this,self",booleans:"true,false,null,undefined,typeof",paint:function(e){return this.$super(e,function(e){return e.replace(/(^|[^a-z0-9_])([a-z0-9_]+)(\s*:)/gi,function(e,t,r,i){return""+t+'<span class="attribute">'+r+"</span>"+i})})}}),Colorifier.css=Colorifier.sass=Colorifier.scss=new Class(Colorifier,{comments:"/* */,//",booleans:"collapse,solid,dotted,dashed,none,auto,url,any,block,normal,italic,bold,unerline,inherit,inline,inline-block,inset,outset,hidden,visible,no-repeat,center,left,top,bottom,right,rgb,rgba,both,absolute,relative,fixed,static",paint:function(e){return e=this._comments(e),e=this._strings(e),e=this._properties(e),e=this._numbers(e),e=this._colors(e),e=this._keywords(e),e=this._selectors(e),this._rollback(e)},_properties:function(e){return this._prepare(e,[[/([^a-z\-])([a-z\-]+?)(\s*:)/gi,"attribute","$1 $3"]])},_selectors:function(e){return this._prepare(e,[[/(^|[^a-z_\-0-9\.&\:#])([a-z]+?)(?![a-z_\-0-9=\^|])/gi,"keyword","$1 "],[/(^|.)(#[a-z\-0-9\_]+)/gi,"property","$1 "],[/(^|.)(\.[a-z\-0-9\_]+)/gi,"property","$1 "],[/([^\s])(:[a-z\-]+?)(?![a-z_\-0-9])/gi,"boolean","$1 "]])},_numbers:function(e){return this._prepare(e,[[/([^'"\d\w\.])(\-?[0-9]*\.?[0-9]+[a-z%]*)(?!['"\d\w\.])/g,"integer","$1 "]])},_colors:function(e){return this._prepare(e,[[/(.)(#(([abcdef0-9]{6})|([abcdef0-9]{3})))/gi,"unit","$1 "]])}}),Colorifier.html=Colorifier.xml=new Class(Colorifier,{comments:"&lt;!-- --&gt;",paint:function(e,t){return e=this._comments(e),e=this._embedded(e),e=this._strings(e),e=this._tags(e),t&&(e=t.call(this,e)),this._rollback(e)},_embedded:function(e){var t;return this.___||(this.___=[]),t=this.___,e=e.replace(/(&lt;script.*?&gt;)([\s\S]*?)(&lt;\/script&gt;)/gi,function(e,r,i,o){return t.push(a.paint(i)),""+r+"___dummy_"+t.length+"___"+o}),e=e.replace(/(&lt;style.*?&gt;)([\s\S]+?)(&lt;\/style&gt;)/gi,function(e,r,o,n){return t.push(i.paint(o)),""+r+"___dummy_"+t.length+"___"+n})},_tags:function(e){return this._prepare(e,[[/(&lt;[\/]*)([a-z]+)/gi,"keyword","$1 "],[/(\s+)([a-z_\-]+)(=)/gi,"float","$1 $3"]])}}),a=new Colorifier.js,i=new Colorifier.css,Colorifier.coffee=Colorifier.coffeescript=new Class(Colorifier,{comments:"#",keywords:"function,return,for,if,else,while,do,throw,try,catch,instanceof,class,extends,in,of,where,super,is,isnt,until,unless,then,or,and,switch,when,break,continue",objects:"new,this,self",booleans:"true,false,null,undefined,typeof",paint:function(e){return this.$super(e,function(e){return e=e.replace(/(^|.)(@[a-z0-9_]*)/gi,function(e,t,r){return""+t+'<span class="property">'+r+"</span>"}),e.replace(/(^|[^a-z0-9_])([a-z0-9_]+)(\s*:)/gi,function(e,t,r,i){return""+t+'<span class="attribute">'+r+"</span>"+i})})}}),Colorifier.coffee.prototype.strings="\"\"\",\",''','",Colorifier.ruby=Colorifier.rails=new Class(Colorifier,{comments:"=begin =end,#",keywords:"class,module,def,do,end,if,unless,else,elsif,when,case,for,in,and,or,then,ensure,while,begin,rescue,raise,return,try,catch,until,yield,super,break,alias,not,next",booleans:"true,false,nil",objects:"public,protected,private,__FILE__,__LINE__,self,include,extend",rails:"render,redirect_to,respond_to,before_filter,after_filter,around_filter,has_one,has_many,belongs_to,has_and_belongs_to_many,scope,validates_acceptance_of,validates_inclusion_of,validates_associated,validates_length_of,validates_confirmation_of,validates_numericality_of,validates_each,validates_presence_of,validates_exclusion_of,validates_size_of,validates_format_of,validates_uniqueness_of,attr_accessible,before_save,before_create,before_update,before_destroy,before_validation,after_save,after_create,after_update,after_destroy,after_validation,url_for,link_to,form_for,div_for,content_tag_for,content_tag,simple_format",paint:function(e){return this.$super(e,function(e){return e=this._symbols(e),e=this._variables(e),e=this._rails(e)})},_symbols:function(e){return this._prepare(e,[[/([^'"\d\w\.])(:[\a-z_]+)(?!['"\d\w\._])/gi,"boolean","$1 "],[/([^'"\d\w\.])([\a-z_]+:)(?!['"\d\w\._])/gi,"boolean","$1 "]])},_variables:function(e){return this._prepare(e,[[/([^'"\d\w])(@[\a-z_]+)(?!['"\d\w_])/gi,"property","$1 "]])},_rails:function(e){var t,r,i,n,s;for(t=[],s=this.rails.split(","),i=0,n=s.length;n>i;i++)r=s[i],t.push([RegExp("([^'\"\\d\\w])("+o(r)+")(?!['\"\\d\\w_])","g"),"regexp","$1 "]);return this._prepare(e,t)}}),Colorifier.erb=new Class(Colorifier.html,{paint:function(e){return this.$super(e,function(e){return this._ruby(e)})},_ruby:function(e){var t;return this.___||(this.___=[]),t=this.___,e.replace(/(&lt;%)([\s\S]*?)(%&gt;)/gi,function(e,r,i,o){return t.push(l.paint(i)),""+r+"___dummy_"+t.length+"___"+o})}}),l=new Colorifier.ruby,Colorifier.bash=Colorifier.console=Colorifier.terminal=Colorifier.inherit({keywords:"echo,if,endif",paint:function(e,t){return e=this._keywords(e),t&&(e=t.call(this,e)),this._rollback(e)}}),Colorifier.unsupported=new Class(Colorifier,{paint:function(e){return e}}),e(Colorifier.initialize),n=s(Colorifier,{version:"1.4.0"})}),function(){var e=document.createElement("style"),t=document.createTextNode("div.colorifier,div.colorifier *{display:inline;margin:0;padding:0;border:none;background:none;float:none;font:inherit;position:static;top:auto;left:auto;right:auto;bottom:auto}div.colorifier{display:block;position:relative;border:1px solid #808080;border-radius:0.25em;white-space:nowrap;overflow:auto}div.colorifier .gutter,div.colorifier .code{display:inline-block;vertical-align:top;padding:0.25em 0.5em}div.colorifier .gutter{border-right:2px solid #808080;text-align:right;border-top-left-radius:0.25em;border-bottom-left-radius:0.25em}div.colorifier .code{max-width:90%;white-space:pre;word-wrap:normal}div.colorifier.light{color:rgba(0,0,0,0.8);background:rgba(255,255,255,0.5);border-color:rgba(0,0,0,0.1)}div.colorifier.light .gutter{border-color:rgba(80,0,0,0.5);background:rgba(0,0,0,0.05)}div.colorifier.light span.comment,div.colorifier.light span.comment span.string{color:rgba(0,0,0,0.4)}div.colorifier.light span.string{color:#080}div.colorifier.light span.regexp{color:#880}div.colorifier.light span.integer{color:#00f}div.colorifier.light span.float{color:#b02a2a}div.colorifier.light span.keyword{font-weight:bold;color:#808}div.colorifier.light span.object{color:#ee82ee;font-weight:bold}div.colorifier.light span.boolean{color:#b02a2a}div.colorifier.light span.unit{color:#088}div.colorifier.light span.attribute{color:#880}div.colorifier.light span.method{color:#008}div.colorifier.light span.property{color:#048}div.colorifier.dark{color:rgba(255,255,255,0.7);background:rgba(0,0,0,0.6);border-color:rgba(255,255,255,0.1)}div.colorifier.dark .gutter{border-color:rgba(80,0,0,0.4);background:rgba(0,0,0,0.4)}div.colorifier.dark span.comment{color:rgba(255,255,255,0.4)}div.colorifier.dark span.string{color:#4b4}div.colorifier.dark span.regexp{color:#bb4}div.colorifier.dark span.integer{color:#00e}div.colorifier.dark span.float{color:#b02a2a}div.colorifier.dark span.keyword{font-weight:normal;color:#b4b}div.colorifier.dark span.object{color:#808;font-weight:normal}div.colorifier.dark span.boolean{color:#b02a2a}div.colorifier.dark span.unit{color:#4bb}div.colorifier.dark span.attribute{color:#bb4}div.colorifier.dark span.method{color:#44b}div.colorifier.dark span.property{color:#48b}".replace(/url\("\//g,'url("'+Lovely.hostUrl));e.type="text/css",document.getElementsByTagName("head")[0].appendChild(e),e.styleSheet?e.styleSheet.cssText=t.nodeValue:e.appendChild(t)}();