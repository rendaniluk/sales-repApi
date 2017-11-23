/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","knockout","signals","promise"],function(a,g,c){(function(){function b(a){var b={};if(a=a.split("?")[1])a=a.split("\x26"),a.forEach(function(a){var c=a.split(/\=(.+)?/);a=c[0];a.length&&(c=c[1]&&decodeURIComponent(c[1]),b[a]=c)});return b}function d(b,c){var d=document.createElement("a");d.href=U.href;void 0!==b.search&&(d.search=b.search);void 0!==b.pathname&&(d.pathname=b.pathname);var e=d.search,f="",g;g=e.indexOf("oj_Router");if(-1!==g){var h=e.indexOf("\x26",g);-1===h&&(h=
e.length);g=e.substring(0,g);e=e.substr(h)}else g=e+(-1===e.indexOf("?")?"?":"\x26"),e="";if(c&&0<Object.getOwnPropertyNames(c).length){var h=JSON.stringify(c),f=encodeURIComponent(h),h=a.A$.AWa(h),k=!1,s="oj_Router\x3d";h.length<=f.length&&(k=!0);s=k?s+("1"+h):s+("0"+f);if(1024<s.length)throw Error("Size of bookmarkable data is too big.");f=s}else g=g.substring(0,g.length-1);d.search=g+f+e;return d.href.replace(/\?$/,"")}function e(b,c){var d;c&&b.xw&&(a.C.Xt(c),b.xw.every(function(a){return a.Tn===
c?(d=a,!1):!0}));return d}function f(a){return a.It?f(a.It)+"."+a.Dg:a.Dg}function h(a){var b;if(a){if(b=h(a.It))b=(a=a.li())?b+(a+"/"):void 0}else b="/";return b}function k(a,b){var c;a.xj.every(function(a){return a.Jt&&a.Jt!==b?!0:(c=a,!1)});return c}function l(b){b=b.filter(function(a){return a.value!==a.wd.li()});a.D.option("level")===a.D.Yx&&(a.D.info("Potential changes are: "),b.forEach(function(b){a.D.info("   { router: %s, value: %s }",f(b.wd),b.value)}));return b}function m(a){var b=this[a.wd.Dg];
void 0!==b&&(a.wd.Kn=b)}function p(){return V[0]&&V[0].cancel}function t(b){var c=b.charAt(0);b=b.slice(1);if("0"===c)b=decodeURIComponent(b);else if("1"===c)b=a.A$.dXa(b);else throw Error("Error retrieving bookmarkable data. Format is invalid");b=JSON.parse(b);if(a.D.option("level")===a.D.Yx){var d;a.D.info("Bookmarkable data: ");for(d in b)a.D.info("   { router: %s, value: %s }",d,b[d])}return b}function r(a,b,c){var d;a.xj.every(function(a){return a.Jt&&a.Jt!==c||!a.iq(b)?!0:(d=a,!1)});return d}
function n(a){var b=[];a.IH()&&(b.push({wd:a,f4a:a.li()}),a.xj.forEach(function(a){b=b.concat(n(a))}));return b}function q(a){if(!a)return{title:"",AF:""};var b=q(k(a,a.li()));if(""===b.title&&(a=a.IH())){var c=a.gE;void 0!==c?("function"===typeof c&&(c=c()),b.title=String(c)):(c=a.L2,void 0!==c&&(c=String(c),""!==b.AF&&(c+=" | "+b.AF),b.AF=c))}return b}function s(a){var b=a[a.length-1],c;b?(c=b.wd,b=b.value):(c=Z,(b=Z.In)&&a.push({value:b,wd:c}));for(;c=k(c,b);)(b=c.In)&&a.push({value:b,wd:c});var d=
[];n(Z).forEach(function(b,c){var e=a[c];e&&b.wd===e.wd||d.unshift(b)});return a=d.concat(a)}function u(a,b){var c=[],d=[],e=a,f=b.split("/"),g,h,k;for(f.splice(0,1);e;)d.unshift(e),e=e.It;for(;g=f.shift();){e=d.shift();if(!e){if(e=r(h,g,k),!e){O=b;break}}else if(!e.iq(g))throw Error('Invalid path "'+b+'". State id "'+g+'" does not exist on router "'+e.Dg+'".');c.push({wd:e,value:g});h=e;k=g}return c}function v(b,c,d){(b=b())||a.D.info("%s is false for state: %s",c,d);return b}function w(a,b,c,d){"function"===
typeof a&&(b=b?b.then(function(b){b&&(b=v(a,c,d));return b}):new Promise(function(b){b(v(a,c,d))}));return b}function x(a,b){var c=a.IH(),d;if(c){for(d=0;d<a.xj.length;d++)b=x(a.xj[d],b);d=c.Gx&&c.Gx.canExit?c.Gx.canExit:c.qH;b=w(d,b,"canExit",c.Tn)}return b}function y(b){if(p())return Promise.resolve(!1);a.D.info("Start _canExit.");b?(b=x(b,null),b=null===b?Promise.resolve(!0):b.then(function(a){return a&&!p()})):b=Promise.resolve(!0);return b}function z(b,c){if(p())return Promise.resolve();a.D.info("Start _canEnter.");
var d=null;b.forEach(function(a){(a=a.wd.iq(a.value))&&(d=w(a.pH,d,"canEnter",a.Tn))});return d=null===d?Promise.resolve({a6:b,origin:c}):d.then(function(a){var d;a&&!p()&&(d={a6:b,origin:c});return d})}function A(b,c){var d=b.wd.iq(b.wd.li()),e=b.value?b.wd.iq(b.value):void 0;return Promise.resolve().then(function(){a.D.option("level")===a.D.Yx&&a.D.info("Updating state of %s to %s.",f(b.wd),b.value)}).then(d?d.VH:void 0).then(function(){var a=b.wd,d,e,f;if("popState"===c){e=a.wD.length;for(d=e-
1;0<=d;d--)if(a.wD[d]===b.value){f=!0;a.wD.splice(d,e-d);break}1===e-d&&(a.uJ="back")}f||(delete a.uJ,a.wD.push(a.li()));a.li(b.value)}).then(e?e.SH:void 0)}function D(b){if(!b)return Promise.resolve(Q);var c=Promise.resolve().then(function(){a.D.info("Entering _updateAll.");a.hc.VS=!0});b.a6.forEach(function(a){c=c.then(function(){if(!p())return A(a,b.origin)})});return c.then(function(){var c=0<b.a6.length&&!p();a.hc.VS=!1;a.D.info("_updateAll returns %s.",String(c));return{hasChanged:c}},function(b){a.hc.VS=
!1;return Promise.reject(b)})}function F(a){var b;try{b=N.parse(),b=l(b)}catch(c){return Promise.reject(c)}return z(b,a).then(D)}function E(b,c){a.D.option("level")===a.D.Yx&&a.D.info("\x3e\x3e %s: origin\x3d%s router\x3d%s %s %s",b,c.origin,c.wd?f(c.wd):"null",c.path?"path\x3d"+c.path:"",c.w6?"deferredHandling\x3dtrue":"")}function I(a){E("Executing",a);if(!a.w6){if("sync"===a.origin)return F();if("popState"===a.origin)return y(a.wd).then(function(b){return b?F(a.origin):Promise.resolve(Q)})}return a.wd.HKa(a)}
function G(){var b=V[0];E("Resolving",b);b.cancel?(E("Cancelled",b),b=Promise.resolve(Q)):b=I(b);return b.then(function(b){var c=V.shift();E("Done with",c);if(!0===b.hasChanged){var c=q(Z),d;""!==c.title?d=c.title:K&&0<K.length?(d=K,""!==c.AF&&(d+=" | "+c.AF)):d=c.AF;d!==window.document.title&&(window.document.title=d)}a.hc.kE.dispatch(b);return b},function(b){V=[];a.D.error("Error when executing transition: %o",b||"Unknown");a.hc.kE.dispatch(Q);return Promise.reject(b)})}function H(a){E("Queuing  ",
a);a=V.push(a);1===a?aa=G():(a=V[a-2],a.w6||(E("Cancelling",a),a.cancel=!0),aa=aa.then(G));return aa}function C(){var b,c,d=Z.li(),e=null;a.D.info("Handling popState event with URL: %s",U.href);if(d)for(b=0;b<Z.xj.length;b++)if(c=Z.xj[b],d===c.Jt){e=c;break}H({wd:e,origin:"popState"})}function B(){M||(N||(N=new a.hc.A9),N.Tl(P),K=window.document.title,window.addEventListener("popstate",C,!1),a.D.info("Initializing rootInstance."),a.D.info("Base URL is %s",P),a.D.info("Current URL is %s",U.href),M=
!0)}var P="/",K,N,Q={hasChanged:!1},M=!1,O,V=[],aa,U=window.location,Z;a.hc=function(a,b,c){var d=this;this.Dg=a;this.Jt=c||(b?b.li():void 0);this.It=b;this.xj=[];this.Kn=void 0;this.li=g.observable();this.mUa=g.pureComputed({read:function(){return this.li()},write:function(a){this.go(a).then(null,function(a){throw a;})},owner:d});this.xw=null;this.In=void 0;this.IH=g.pureComputed(function(){return g.ignoreDependencies(d.iq,d,[d.li()])});this.BGa=g.pureComputed(function(){var a,b=g.ignoreDependencies(d.iq,
d,[d.li()]);b&&(a=b.value);return a});this.uJ=void 0;this.wD=[];this.qPa=Object.create(null,{name:{value:g.pureComputed(function(){var a,b;b=this.li()||this.In||this.xw[0];if(b=this.iq(b))a=b.value,a&&"string"===typeof a||(a=b.Tn);return a},d),enumerable:!0},params:{value:Object.create(null,{ojRouter:{value:new function(){Object.defineProperties(this,{parentRouter:{value:d,enumerable:!0},direction:{get:function(){return d.uJ},enumerable:!0}})},enumerable:!0}}),enumerable:!0},lifecycleListener:{value:Object.create(null,
{attached:{value:function(a){var b=g.unwrap(a.valueAccessor()).params.ojRouter.parentRouter.IH();b&&(b.Gx=a.viewModel)},writable:!0,enumerable:!0}}),enumerable:!0}});Object.defineProperties(this,{parent:{value:this.It,enumerable:!0}})};o_("Router",a.hc,a);Object.defineProperties(a.hc.prototype,{name:{get:function(){return this.Dg},enumerable:!0},states:{get:function(){return this.xw},enumerable:!0},stateId:{get:function(){return this.mUa},enumerable:!0},currentState:{get:function(){return this.IH},
enumerable:!0},currentValue:{get:function(){return this.BGa},enumerable:!0},defaultStateId:{get:function(){return this.In},set:function(a){this.In=a},enumerable:!0},moduleConfig:{get:function(){return this.qPa},enumerable:!0}});Z=new a.hc("root",void 0,void 0);a.hc.prototype.isa=function(a){var b;a&&"string"===typeof a&&(a=a.trim(),0<a.length&&this.xj.every(function(c){return c.Dg===a?(b=c,!1):!0}));return b};a.f.j("Router.prototype.getChildRouter",{isa:a.hc.prototype.isa});a.hc.prototype.xra=function(b,
c){var d,e;a.C.Xt(b);c=c||this.li();b=encodeURIComponent(b.trim());for(d=0;d<this.xj.length;d++){e=this.xj[d];if(e.Dg===b)throw Error('Invalid router name "'+b+'", it already exists.');if(e.Jt===c)throw Error('Cannot create more than one child router for parent state id "'+e.Jt+'".');}d=new a.hc(b,this,c);this.xj.push(d);return d};a.f.j("Router.prototype.createChildRouter",{xra:a.hc.prototype.xra});a.hc.prototype.iq=function(a){return e(this,a)};a.hc.prototype.ora=function(b){this.li(void 0);delete this.In;
this.uJ=void 0;this.wD=[];"function"===typeof b?(this.xw=null,this.iq=b):(this.xw=[],delete this.iq,Object.keys(b).forEach(function(c){var d=b[c];this.xw.push(new a.DB(c,d,this));"boolean"===typeof d.isDefault&&d.isDefault&&(this.In=c)},this));return this};a.f.j("Router.prototype.configure",{ora:a.hc.prototype.ora});a.hc.prototype.bta=function(a){return this.iq(a)};a.f.j("Router.prototype.getState",{bta:a.hc.prototype.bta});a.hc.prototype.go=function(a,b){B();b=b||[];return H({wd:this,path:a,origin:"go",
Ota:b.historyUpdate})};a.f.j("Router.prototype.go",{go:a.hc.prototype.go});a.hc.prototype.HKa=function(b){var c,d=!0,e=b.path,g=!1,k=!1;switch(b.Ota){case "skip":k=!0;break;case "replace":g=!0}if(e)if("string"===typeof e)d=!1;else return Promise.reject(Error("Invalid object type for state id."));if(d&&(e=this.In,!e))return a.D.option("level")===a.D.Yx&&a.D.info("Undefined state id with no default id on router %s",f(this)),Promise.resolve(Q);if("/"===e.charAt(0))b=e;else{b=h(this.It);if(!b)return Promise.reject(Error('Invalid path "'+
e+'". The parent router does not have a current state.'));b+=e}a.D.info("Destination path: %s",b);try{c=u(this,b),c=s(c)}catch(m){return Promise.reject(m)}var q=l(c);return g||0<q.length?(a.D.info("Deferred mode or new state is different."),y(this).then(function(b){return b?z(q).then(D).then(function(b){if(b.hasChanged)if(k)a.D.info("Skip history update.");else{var d=N.ara(c);a.D.info("%s URL to %s",g?"Replacing":"Pushing",d);window.history[g?"replaceState":"pushState"](null,"",d)}return b}):Promise.resolve(Q)})):
Promise.resolve(Q)};a.hc.prototype.Awa=function(a){this.Kn=a;a={};for(var b=this;b;)void 0!==b.Kn&&(a[b.Dg]=b.Kn),b=b.It;for(var b=this,c,e,f;b;){for(e=0;e<b.xj.length;e++)if(f=b.xj[e],b.li()&&b.li()===f.Jt){void 0!==f.Kn&&(a[f.Dg]=f.Kn);c=f;break}b=c;c=void 0}window.history.replaceState(null,"",d({},a))};a.f.j("Router.prototype.store",{Awa:a.hc.prototype.Awa});a.hc.prototype.Wva=function(){return this.Kn};a.f.j("Router.prototype.retrieve",{Wva:a.hc.prototype.Wva});a.hc.prototype.qA=function(){for(var b,
c;0<this.xj.length;)this.xj[0].qA();if(this.It){b=this.It.xj;for(c=0;c<b.length;c++)if(b[c].Dg===this.Dg){b.splice(c,1);break}delete this.Jt}else P="/",N=null,this.Dg="root",window.document.title=K,window.removeEventListener("popstate",C),a.hc.kE.removeAll(),M=!1;delete this.uJ;this.wD=[];this.xw=null;delete this.In;delete this.Kn};a.f.j("Router.prototype.dispose",{qA:a.hc.prototype.qA});a.hc.kE=new c.Signal;a.hc.VS=!1;Object.defineProperties(a.hc,{rootInstance:{value:Z,enumerable:!0},transitionedToState:{value:a.hc.kE,
enumerable:!0}});a.hc.Hd={};o_("Router.defaults",a.hc.Hd,a);Object.defineProperties(a.hc.Hd,{urlAdapter:{get:function(){N||(N=new a.hc.A9);return N},set:function(a){if(M)throw Error("Incorrect operation. Cannot change URL adapter after calling sync() or go().");N=a},enumerable:!0,nV:!1},baseUrl:{get:function(){return P},set:function(a){if(M)throw Error("Incorrect operation. Cannot change base URL after calling sync() or go().");P=a?a.match(/[^?#]+/)[0]:"/"},enumerable:!0,nV:!1},rootInstanceName:{get:function(){return Z.Dg},
set:function(b){if(M)throw Error("Incorrect operation. Cannot change the name of the root instance after calling sync() or go().");a.C.Xt(b);Z.Dg=encodeURIComponent(b.trim())},enumerable:!0,nV:!1}});a.hc.Hu=function(){var b={wd:Z,origin:"sync"};B();a.D.info("Entering sync with URL: %s",U.href);return O?(b.path=O,b.w6=!0,b.Ota="replace",O=void 0,H(b)):a.hc.VS?(a.D.info("Sync called while updating, waiting for updates to end."),new Promise(function(b){a.hc.kE.addOnce(function(c){a.D.info("Sync updates done.");
b(c)})})):H(b)};o_("Router.sync",a.hc.Hu,a);a.hc.A9=function(){var b="";this.Tl=function(a){var c=document.createElement("a");c.href=a;a=c.pathname;a=a.replace(/^([^\/])/,"/$1");"/"!==a.slice(-1)&&(a+="/");b=a};this.parse=function(){var c=Z,d=U.pathname.replace(b,""),e=d.split("/"),f=[],g;for(a.D.info("Parsing: %s",d);c&&(g=e.shift());)f.push({value:g,wd:c}),c=k(c,g);f=s(f);(c=U.search.split("oj_Router\x3d")[1])&&(c=c.split("\x26")[0])&&f.forEach(m,t(c));return f};this.ara=function(a){for(var c,e=
!1,f="",g={};c=a.pop();)c.value&&(e||c.value!==c.wd.In)&&(f=""===f?c.value:c.value+"/"+f,e=!0),void 0!==c.wd.Kn&&(g[c.wd.Dg]=c.wd.Kn);return d({pathname:b+f},g)}};o_("Router.urlPathAdapter",a.hc.A9,a);a.hc.B1a=function(){this.Tl=function(){};this.parse=function(){var c=U.search,d=b(c),e=Z,f=[];for(a.D.info("Parsing: %s",c);e;)(c=d[e.Dg]||e.In)&&f.push({value:c,wd:e}),e=k(e,c);f=s(f);(d=d.oj_Router)&&f.forEach(m,t(d));return f};this.ara=function(a){for(var b,c=!1,e="",f={};b=a.pop();)b.value&&(c||
b.value!==b.wd.In)&&(e="\x26"+b.wd.Dg+"\x3d"+b.value+e,c=!0),void 0!==b.wd.Kn&&(f[b.wd.Dg]=b.wd.Kn);e&&(e="?"+e.substr(1));return d({search:e},f)}};o_("Router.urlParamAdapter",a.hc.B1a,a);return Z})();(function(){a.DB=function(b,c,e){c=c||{};a.C.Xt(b);this.Tn=encodeURIComponent(b.trim());(this.pH=c.canEnter)&&a.C.uE(this.pH);(this.SH=c.enter)&&a.C.uE(this.SH);(this.qH=c.canExit)&&a.C.uE(this.qH);(this.VH=c.exit)&&a.C.uE(this.VH);this.Pf=c.value;this.L2=c.label;this.gE=c.title;this.iS=e;this.Gx=void 0;
Object.defineProperties(this,{id:{value:this.Tn,enumerable:!0},value:{get:function(){return this.Pf},set:function(a){this.Pf=a},enumerable:!0},label:{get:function(){return this.L2},set:function(a){this.L2=a},enumerable:!0},title:{get:function(){return this.gE},set:function(a){this.gE=a},enumerable:!0},canEnter:{get:function(){return this.pH},set:function(a){this.pH=a},enumerable:!0},enter:{get:function(){return this.SH},set:function(a){this.SH=a},enumerable:!0},canExit:{get:function(){return this.qH},
set:function(a){this.qH=a},enumerable:!0},exit:{get:function(){return this.VH},set:function(a){this.VH=a},enumerable:!0}})};o_("RouterState",a.DB,a);a.DB.prototype.go=function(){return this.iS?this.iS.go(this.Tn):(a.hc.kE.dispatch({hasChanged:!1}),Promise.reject(Error("Router is not defined for this RouterState object.")))};a.f.j("RouterState.prototype.go",{go:a.DB.prototype.go});a.DB.prototype.$ta=function(){if(!this.iS)throw Error("Router is not defined for this RouterState object.");return this.iS.li()===
this.Tn};a.f.j("RouterState.prototype.isCurrent",{$ta:a.DB.prototype.$ta})})();(function(){function b(a,b){if(null===a)return"";var c,d,e={},f={},g="",h=2,s=3,u=2,v="",w=0,x=0,y,z,A,D=a.length;for(A=0;A<D;A++)if(y=a[A],Object.prototype.hasOwnProperty.call(e,y)||(e[y]=s++,f[y]=!0),z=g+y,Object.prototype.hasOwnProperty.call(e,z))g=z;else{if(Object.prototype.hasOwnProperty.call(f,g)){if(256>g.charCodeAt(0)){for(c=u;c--;)w<<=1,5==x?(x=0,v+=b(w),w=0):x++;d=g.charCodeAt(0);c=8}else{d=1;for(c=u;c--;)w=w<<
1|d,5==x?(x=0,v+=b(w),w=0):x++,d=0;d=g.charCodeAt(0);c=16}for(;c--;)w=w<<1|d&1,5==x?(x=0,v+=b(w),w=0):x++,d>>=1;h--;0==h&&(h=Math.pow(2,u),u++);delete f[g]}else for(d=e[g],c=u;c--;)w=w<<1|d&1,5==x?(x=0,v+=b(w),w=0):x++,d>>=1;h--;0==h&&(h=Math.pow(2,u),u++);e[z]=s++;g=String(y)}if(""!==g){if(Object.prototype.hasOwnProperty.call(f,g)){if(256>g.charCodeAt(0)){for(c=u;c--;)w<<=1,5==x?(x=0,v+=b(w),w=0):x++;d=g.charCodeAt(0);c=8}else{d=1;for(c=u;c--;)w=w<<1|d,5==x?(x=0,v+=b(w),w=0):x++,d=0;d=g.charCodeAt(0);
c=16}for(;c--;)w=w<<1|d&1,5==x?(x=0,v+=b(w),w=0):x++,d>>=1;h--;0==h&&(h=Math.pow(2,u),u++);delete f[g]}else for(d=e[g],c=u;c--;)w=w<<1|d&1,5==x?(x=0,v+=b(w),w=0):x++,d>>=1;h--;0==h&&u++}d=2;for(c=u;c--;)w=w<<1|d&1,5==x?(x=0,v+=b(w),w=0):x++,d>>=1;for(;;)if(w<<=1,5==x){v+=b(w);break}else x++;return v}function c(a,b){for(var d=[],f=4,g=4,h=3,n="",q="",s,u,v,w,x,y={val:b(0),position:32,index:1},q=0;3>q;q+=1)d[q]=q;n=0;v=Math.pow(2,2);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&(y.position=
32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;switch(n){case 0:n=0;v=Math.pow(2,8);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;x=e(n);break;case 1:n=0;v=Math.pow(2,16);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;x=e(n);break;case 2:return""}for(s=q=d[3]=x;;){if(y.index>a)return"";n=0;v=Math.pow(2,h);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&
(y.position=32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;switch(x=n){case 0:n=0;v=Math.pow(2,8);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;d[g++]=e(n);x=g-1;f--;break;case 1:n=0;v=Math.pow(2,16);for(w=1;w!=v;)u=y.val&y.position,y.position>>=1,0==y.position&&(y.position=32,y.val=b(y.index++)),n|=(0<u?1:0)*w,w<<=1;d[g++]=e(n);x=g-1;f--;break;case 2:return q}0==f&&(f=Math.pow(2,h),h++);if(d[x])n=d[x];else if(x===g)n=s+s[0];else return null;
q+=n;d[g++]=s+n[0];f--;s=n;0==f&&(f=Math.pow(2,h),h++)}}a.A$={AWa:function(a){return null===a?"":b(a,function(a){return f.charAt(a)})},dXa:function(a){return null===a?"":""===a?null:c(a.length,function(b){var c=f;b=a.charAt(b);var d;g||(g={});if(!g[c])for(g[c]={},d=0;d<c.length;d++)g[c][c[d]]=d;return g[c][b]})}};var e=String.fromCharCode,f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",g})()});