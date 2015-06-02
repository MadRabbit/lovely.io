/**
 * lovely.io 'colorifier' module v1.2.0
 *
 * Copyright (C) 2012 Nikolay Nemshilov
 */
Lovely("colorifier-1.2.0",["dom-1.2.0"],function(a){var b={},c,Class,Colorifier,d,e,f,g,b,h,i,j;return e=this.Lovely.module("core"),c=this.Lovely.module("dom-1.2.0"),h=e.ext,Class=e.Class,d=c.Element,g=function(a){return a.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g,"\\$1")},Colorifier=new Class(d,{extend:{Options:{tag:"pre",attr:"data-lang",theme:"light",gutter:!0},initialize:function(){c(""+Colorifier.Options.tag+"["+Colorifier.Options.attr+"]").forEach(function(a){var b,c;if(c=a.attr(Colorifier.Options.attr))return b=Colorifier[c]||Colorifier.unsupported,b=a.colorifier||(a.colorifier=new b(a)),b.addClass(Colorifier.Options.theme)})}},comments:"",strings:"',\"",keywords:"",objects:"",booleans:"",regexps:[/([^\*\\\/;])(\/[^\*\/][^\n]*?[^\*\n\\](?!\\\/)\/)/],styles2copy:"font-family,font-size,font-weight,margin-top,margin-left,margin-right,margin-bottom",constructor:function k(a){var b,c,e,f;return a?(this.$super("div",{"class":"colorifier"}),f=a.html(),f=f.replace(/</g,"&lt;"),f=f.replace(/>/g,"&gt;"),f=f.replace(/(^\s+)|(\s+$)/g,""),this.ref=a.html(this.paint(f)),this.style(a.style(this.styles2copy)),this.insertTo(a.hide(),"before"),Colorifier.Options.gutter&&(e=function(){var a,d,e;d=f.split("\n"),e=[];for(b=0,a=d.length;b<a;b++)c=d[b],e.push(b);return e}(),this.insert(new d("div",{"class":"gutter",html:e.join("<br/>")}))),this.insert((new d("div",{"class":"code"})).html(a.html())),this.addClass(Colorifier.Options.theme)):this},paint:function(a,b){return a=this._comments(a),a=this._strings(a),a=this._regexps(a),a=this._numbers(a),a=this._keywords(a),a=this._methods(a),b&&(a=b.call(this,a)),this._rollback(a)},_comments:function(a,b){var c,d,e,f,h,i,j;e=[],j=this.comments.split(",");for(h=0,i=j.length;h<i;h++)f=j[h],c=f.split(" "),c[1]?d=new RegExp("(.?)("+g(c[0])+"[\\s\\S]*?"+g(c[1])+")(.*)","mg"):d=new RegExp("(.?)("+g(c[0])+".*?)(\n)","g"),e.push([d,"comment","$1 $3"]);return this._prepare(a,e)},_strings:function(a,b){var c,d,e,f,h,i,j,k,l;e=[],l=this.strings.split(",");for(h=0,j=l.length;h<j;h++){f=l[h],d=[new RegExp("([^\\\\])(("+g(f)+")(\\3))","mg"),new RegExp("([^\\\\])(("+g(f)+").*?[^\\\\](\\3))","mg")];for(i=0,k=d.length;i<k;i++)c=d[i],e.push([c,"string","$1 "])}return this._prepare(a,e)},_regexps:function(a,b){var c,d,e,f,g;d=[],g=this.regexps;for(e=0,f=g.length;e<f;e++)c=g[e],d.push([c,"regexp","$1 "]);return this._prepare(a,d)},_numbers:function(a){return this._prepare(a,[[/([^'"\d\w\.])([\d]+)(?!['"\d\w\.])/g,"integer","$1 "],[/([^'"\d\w\.])(\d*\.\d+)(?!['"\d\w\.])/g,"float","$1 "]])},_keywords:function(a){var b,c,d,e,f,g;d=[],g=["keyword","object","boolean"];for(e=0,f=g.length;e<f;e++)b=g[e],c=this[b+"s"].replace(/,/g,"|"),c&&(c=new RegExp("([^a-zA-Z0-9_]|^)("+c+")(?![a-zA-Z0-9_])","g"),d.push([c,b,"$1 "]));return this._prepare(a,d)},_methods:function(a){return this._prepare(a,[[/([^a-zA-Z0-9_]|^)([A-Z][a-zA-Z_0-9]+)(?![a-zA-Z0-9_])/g,"unit","$1 "],[/(\.)([a-z_$][a-z0-9_]*)(?![a-z0-9_\(])/ig,"attribute","$1 "],[/(\.)([a-z_$][a-z0-9_]*)(\()/i,"method","$1 $3"]])},_prepare:function(a,b){var c,d,e,f,g,h,i;this.___||(this.___=[]),f=this.___;for(g=0,h=b.length;g<h;g++)i=b[g],e=i[0],c=i[1],d=i[2],a=a.replace(e,function(a,b,e,g,h,i){return f.push('<span class="'+c+'">'+e+"</span>"),d.replace(" ","___dummy_"+f.length+"___").replace("$1",b).replace("$3",g).replace("$4",h)});return a},_rollback:function(a){var b,c;for(b=c=this.___.length-1;c<=0?b<=0:b>=0;c<=0?b++:b--)a=a.replace("___dummy_"+(b+1)+"___",this.___[b]);return a}}),Colorifier.js=Colorifier.javascript=new Class(Colorifier,{comments:"/* */,//",keywords:"function,return,for,if,else,while,do,throw,try,catch,instanceof",objects:"var,new,this,self",booleans:"true,false,null,undefined",paint:function(a){return this.$super(a,function(a){return a.replace(/(^|[^a-z0-9_])([a-z0-9_]+)(\s*:)/ig,function(a,b,c,d){return""+b+'<span class="attribute">'+c+"</span>"+d})})}}),Colorifier.css=Colorifier.sass=Colorifier.scss=new Class(Colorifier,{comments:"/* */",booleans:"collapse,solid,dotted,dashed,none,auto,url,any,block,normal,italic,bold,unerline,inherit,inline,inline-block,inset,outset,hidden,visible,no-repeat,center,left,top,bottom,right,rgb,rgba",paint:function(a){return a=this._comments(a),a=this._strings(a),a=this._properties(a),a=this._numbers(a),a=this._colors(a),a=this._keywords(a),a=this._selectors(a),this._rollback(a)},_properties:function(a){return this._prepare(a,[[/([^a-z\-])([a-z\-]+?)(\s*:)/g,"attribute","$1 $3"]])},_selectors:function(a){return this._prepare(a,[[/([^a-z_\-0-9\.])([a-z]+?)(?![a-z_\-0-9\.=\^|])/ig,"keyword","$1 "],[/(^|.)(#[a-z\-0-9\_]+)/ig,"unit","$1 "],[/(^|.)(\.[a-z\-0-9\_]+)/ig,"method","$1 "]])},_numbers:function(a){return this._prepare(a,[[/([^'"\d\w\.])(\-?[0-9]*\.?[0-9]+[a-z]*)(?!['"\d\w\.])/g,"integer","$1 "]])},_colors:function(a){return this._prepare(a,[[/(.)(#(([abcdef0-9]{6})|([abcdef0-9]{3})))/g,"regexp","$1 "]])}}),Colorifier.html=Colorifier.xml=new Class(Colorifier,{comments:"&lt;!-- --&gt;",paint:function(a,b){return a=this._comments(a),a=this._embedded(a),a=this._strings(a),a=this._tags(a),b&&(a=b.call(this,a)),this._rollback(a)},_embedded:function(a){var b;return this.___||(this.___=[]),b=this.___,a=a.replace(/(&lt;script.*?&gt;)([\s\S]*?)(&lt;\/script&gt;)/ig,function(a,c,d,e){return b.push(i.paint(d)),""+c+"___dummy_"+b.length+"___"+e}),a=a.replace(/(&lt;style.*?&gt;)([\s\S]+?)(&lt;\/style&gt;)/ig,function(a,c,d,e){return b.push(f.paint(d)),""+c+"___dummy_"+b.length+"___"+e}),a},_tags:function(a){return this._prepare(a,[[/(&lt;[\/]*)([a-z]+)/ig,"keyword","$1 "],[/(\s+)([a-z]+)(=)/ig,"float","$1 $3"]])}}),i=new Colorifier.js,f=new Colorifier.css,Colorifier.coffee=Colorifier.coffeescript=new Class(Colorifier,{comments:"#",keywords:"function,return,for,if,else,while,do,throw,try,catch,instanceof,class,extends,in,of,where,super",objects:"new,this,self",booleans:"true,false,null,undefined",paint:function(a){return this.$super(a,function(a){return a=a.replace(/(^|.)(@[a-z0-9_]+)/ig,function(a,b,c){return""+b+'<span class="property">'+c+"</span>"}),a.replace(/(^|[^a-z0-9_])([a-z0-9_]+)(\s*:)/ig,function(a,b,c,d){return""+b+'<span class="attribute">'+c+"</span>"+d})})}}),Colorifier.ruby=Colorifier.rails=new Class(Colorifier,{comments:"=begin =end,#",keywords:"class,module,def,do,end,if,unless,else,elsif,when,case,for,in,and,or,then,ensure,while,begin,rescue,raise,return,try,catch,until,yield,super,break,alias,not,next",booleans:"true,false,nil",objects:"public,protected,private,__FILE__,__LINE__,self,include,extend",rails:"render,redirect_to,respond_to,before_filter,after_filter,around_filter,has_one,has_many,belongs_to,has_and_belongs_to_many,scope,validates_acceptance_of,validates_inclusion_of,validates_associated,validates_length_of,validates_confirmation_of,validates_numericality_of,validates_each,validates_presence_of,validates_exclusion_of,validates_size_of,validates_format_of,validates_uniqueness_of,attr_accessible,before_save,before_create,before_update,before_destroy,before_validation,after_save,after_create,after_update,after_destroy,after_validation,url_for,link_to,form_for,div_for,content_tag_for,content_tag,simple_format",paint:function(a){return this.$super(a,function(a){return a=this._symbols(a),a=this._variables(a),a=this._rails(a)})},_symbols:function(a){return this._prepare(a,[[/([^'"\d\w\.])(:[\a-z_]+)(?!['"\d\w\._])/ig,"boolean","$1 "],[/([^'"\d\w\.])([\a-z_]+:)(?!['"\d\w\._])/ig,"boolean","$1 "]])},_variables:function(a){return this._prepare(a,[[/([^'"\d\w])(@[\a-z_]+)(?!['"\d\w_])/ig,"property","$1 "]])},_rails:function(a){var b,c,d,e,f;b=[],f=this.rails.split(",");for(d=0,e=f.length;d<e;d++)c=f[d],b.push([new RegExp("([^'\"\\d\\w])("+g(c)+")(?!['\"\\d\\w_])","g"),"regexp","$1 "]);return this._prepare(a,b)}}),Colorifier.erb=new Class(Colorifier.html,{paint:function(a){return this.$super(a,function(a){return console.log(a),this._ruby(a)})},_ruby:function(a){var b;return this.___||(this.___=[]),b=this.___,a.replace(/(&lt;%)([\s\S]*?)(%&gt;)/ig,function(a,c,d,e){return b.push(j.paint(d)),""+c+"___dummy_"+b.length+"___"+e})}}),j=new Colorifier.ruby,Colorifier.unsupported=new Class(Colorifier,{paint:function(a){return a}}),c(Colorifier.initialize),b=h(Colorifier,{version:"1.2.0"}),function(a){var b=a.createElement("style"),c=a.createTextNode("div.colorifier,div.colorifier *{display:inline;margin:0;padding:0;border:none;background:none;float:none;font:inherit;position:static;top:auto;left:auto;right:auto;bottom:auto}div.colorifier{display:block;position:relative;border:1px solid #808080;border-radius:0.25em;white-space:nowrap;overflow:auto}div.colorifier .gutter,div.colorifier .code{display:inline-block;vertical-align:top;padding:0.25em 0.5em}div.colorifier .gutter{border-right:2px solid #808080;text-align:right;border-top-left-radius:0.25em;border-bottom-left-radius:0.25em}div.colorifier .code{max-width:90%;white-space:pre;word-wrap:normal}div.colorifier.light{color:rgba(0,0,0,0.80);background:rgba(255,255,255,0.50);border-color:rgba(0,0,0,0.10)}div.colorifier.light .gutter{border-color:rgba(80,0,0,0.50);background:rgba(0,0,0,0.05)}div.colorifier.light span.comment{color:rgba(0,0,0,0.40)}div.colorifier.light span.string{color:#080}div.colorifier.light span.regexp{color:#880}div.colorifier.light span.integer{color:#00f}div.colorifier.light span.float{color:#b02a2a}div.colorifier.light span.keyword{font-weight:bold;color:#808}div.colorifier.light span.object{color:#ee82ee;font-weight:bold}div.colorifier.light span.boolean{color:#b02a2a}div.colorifier.light span.unit{color:#088}div.colorifier.light span.attribute{color:#880}div.colorifier.light span.method{color:#008}div.colorifier.light span.property{color:#048}div.colorifier.dark{color:rgba(255,255,255,0.70);background:rgba(0,0,0,0.60);border-color:rgba(255,255,255,0.10)}div.colorifier.dark .gutter{border-color:rgba(80,0,0,0.40);background:rgba(0,0,0,0.40)}div.colorifier.dark span.comment{color:rgba(255,255,255,0.40)}div.colorifier.dark span.string{color:#4b4}div.colorifier.dark span.regexp{color:#bb4}div.colorifier.dark span.integer{color:#00e}div.colorifier.dark span.float{color:#b02a2a}div.colorifier.dark span.keyword{font-weight:normal;color:#b4b}div.colorifier.dark span.object{color:#808;font-weight:normal}div.colorifier.dark span.boolean{color:#b02a2a}div.colorifier.dark span.unit{color:#4bb}div.colorifier.dark span.attribute{color:#bb4}div.colorifier.dark span.method{color:#44b}div.colorifier.dark span.property{color:#48b}");b.type="text/css",a.getElementsByTagName("head")[0].appendChild(b),b.styleSheet?b.styleSheet.cssText=c.nodeValue:b.appendChild(c)}(this.document),b})