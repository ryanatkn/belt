import{s as Ne}from"./FYlQauyN.js";import{n as ke,b as A,d as Q,t as ge}from"./B2Hw9ztH.js";import{a0 as be,b as Ie,h as j,d as Oe,J as T,ao as ze,x as Pe,y as de,s as Y,z as I,f as M,a2 as Be,A as ye,e as He,B as De,ap as q,a5 as je,_ as fe,aq as ue,F as Ue,ar as ce,as as te,at as Ze,a4 as xe,au as Fe,k as Je,av as ae,aw as Ye,g as qe,$ as Ke,j as We,a7 as Xe,ax as Ve,ay as Qe,az as $e,aA as en,aB as nn,aC as tn,p as we,ad as B,t as U,o as Ce,q as E,v as N,r as R,m as $,n as K}from"./6wudGlqZ.js";import{b as an,c as sn,d as rn,n as on,e as ln,s as dn}from"./CdTWKb3A.js";import{p as ee,i as Z}from"./BdMtOV4k.js";import{h as fn,s as D}from"./CRabrc7I.js";function un(e,n){if(n){const t=document.body;e.autofocus=!0,be(()=>{document.activeElement===t&&e.focus()})}}function zn(e,n){return n}function cn(e,n,t,a){for(var i=[],s=n.length,l=0;l<s;l++)Ze(n[l].e,i,!0);var f=s>0&&i.length===0&&t!==null;if(f){var h=t.parentNode;xe(h),h.append(t),a.clear(),C(e,n[0].prev,n[s-1].next)}Fe(i,()=>{for(var u=0;u<s;u++){var m=n[u];f||(a.delete(m.k),C(e,m.prev,m.next)),Je(m.e,!f)}})}function pn(e,n,t,a,i,s=null){var l=e,f={flags:n,items:new Map,first:null},h=(n&Ve)!==0;if(h){var u=e;l=j?Y(We(u)):u.appendChild(Xe())}j&&Oe();var m=null,b=!1,d=ze(()=>{var v=t();return Ke(v)?v:v==null?[]:je(v)});Ie(()=>{var v=T(d),r=v.length;if(b&&r===0)return;b=r===0;let k=!1;if(j){var g=l.data===Pe;g!==(r===0)&&(l=de(),Y(l),I(!1),k=!0)}if(j){for(var _=null,H,c=0;c<r;c++){if(M.nodeType===8&&M.data===Be){l=M,k=!0,I(!1);break}var o=v[c],p=a(o,c);H=Ae(M,f,_,null,o,p,c,i,n,t),f.items.set(p,H),_=H}r>0&&Y(de())}j||mn(v,f,l,i,n,a,t),s!==null&&(r===0?m?ye(m):m=He(()=>s(l)):m!==null&&De(m,()=>{m=null})),k&&I(!0),T(d)}),j&&(l=M)}function mn(e,n,t,a,i,s,l){var ie,se,re,oe;var f=(i&Qe)!==0,h=(i&(ae|te))!==0,u=e.length,m=n.items,b=n.first,d=b,v,r=null,k,g=[],_=[],H,c,o,p;if(f)for(p=0;p<u;p+=1)H=e[p],c=s(H,p),o=m.get(c),o!==void 0&&((ie=o.a)==null||ie.measure(),(k??(k=new Set)).add(o));for(p=0;p<u;p+=1){if(H=e[p],c=s(H,p),o=m.get(c),o===void 0){var w=d?d.e.nodes_start:t;r=Ae(w,n,r,r===null?n.first:r.next,H,c,p,a,i,l),m.set(c,r),g=[],_=[],d=r.next;continue}if(h&&_n(o,H,p,i),(o.e.f&q)!==0&&(ye(o.e),f&&((se=o.a)==null||se.unfix(),(k??(k=new Set)).delete(o))),o!==d){if(v!==void 0&&v.has(o)){if(g.length<_.length){var y=_[0],V;r=y.prev;var P=g[0],F=g[g.length-1];for(V=0;V<g.length;V+=1)pe(g[V],y,t);for(V=0;V<_.length;V+=1)v.delete(_[V]);C(n,P.prev,F.next),C(n,r,P),C(n,F,y),d=y,r=F,p-=1,g=[],_=[]}else v.delete(o),pe(o,d,t),C(n,o.prev,o.next),C(n,o,r===null?n.first:r.next),C(n,r,o),r=o;continue}for(g=[],_=[];d!==null&&d.k!==c;)(d.e.f&q)===0&&(v??(v=new Set)).add(d),_.push(d),d=d.next;if(d===null)continue;o=d}g.push(o),r=o,d=o.next}if(d!==null||v!==void 0){for(var L=v===void 0?[]:je(v);d!==null;)(d.e.f&q)===0&&L.push(d),d=d.next;var J=L.length;if(J>0){var Ge=(i&Ve)!==0&&u===0?t:null;if(f){for(p=0;p<J;p+=1)(re=L[p].a)==null||re.measure();for(p=0;p<J;p+=1)(oe=L[p].a)==null||oe.fix()}cn(n,L,Ge,m)}}f&&be(()=>{var le;if(k!==void 0)for(o of k)(le=o.a)==null||le.apply()}),fe.first=n.first&&n.first.e,fe.last=r&&r.e}function _n(e,n,t,a){(a&ae)!==0&&ue(e.v,n),(a&te)!==0?ue(e.i,t):e.i=t}function Ae(e,n,t,a,i,s,l,f,h,u){var m=(h&ae)!==0,b=(h&Ye)===0,d=m?b?Ue(i):ce(i):i,v=(h&te)===0?l:ce(l),r={i:v,v:d,k:s,a:null,e:null,prev:t,next:a};try{return r.e=He(()=>f(e,d,v,u),j),r.e.prev=t&&t.e,r.e.next=a&&a.e,t===null?n.first=r:(t.next=r,t.e.next=r.e),a!==null&&(a.prev=r,a.e.prev=r.e),r}finally{}}function pe(e,n,t){for(var a=e.next?e.next.e.nodes_start:t,i=n?n.e.nodes_start:t,s=e.e.nodes_start;s!==a;){var l=qe(s);i.before(s),s=l}}function C(e,n,t){n===null?e.first=t:(n.next=t,n.e.next=t&&t.e),t!==null&&(t.prev=n,t.e.prev=n&&n.e)}function Ee(e){var n,t,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(n=0;n<i;n++)e[n]&&(t=Ee(e[n]))&&(a&&(a+=" "),a+=t)}else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function vn(){for(var e,n,t=0,a="",i=arguments.length;t<i;t++)(e=arguments[t])&&(n=Ee(e))&&(a&&(a+=" "),a+=n);return a}function hn(e){return typeof e=="object"?vn(e):e??""}const me=[...` 	
\r\f \v\uFEFF`];function kn(e,n,t){var a=e==null?"":""+e;if(n&&(a=a?a+" "+n:n),t){for(var i in t)if(t[i])a=a?a+" "+i:i;else if(a.length)for(var s=i.length,l=0;(l=a.indexOf(i,l))>=0;){var f=l+s;(l===0||me.includes(a[l-1]))&&(f===a.length||me.includes(a[f]))?a=(l===0?"":a.substring(0,l))+a.substring(f+1):l=f}}return a===""?null:a}function _e(e,n=!1){var t=n?" !important;":";",a="";for(var i in e){var s=e[i];s!=null&&s!==""&&(a+=" "+i+": "+s+t)}return a}function W(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function gn(e,n){if(n){var t="",a,i;if(Array.isArray(n)?(a=n[0],i=n[1]):a=n,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var s=!1,l=0,f=!1,h=[];a&&h.push(...Object.keys(a).map(W)),i&&h.push(...Object.keys(i).map(W));var u=0,m=-1;const k=e.length;for(var b=0;b<k;b++){var d=e[b];if(f?d==="/"&&e[b-1]==="*"&&(f=!1):s?s===d&&(s=!1):d==="/"&&e[b+1]==="*"?f=!0:d==='"'||d==="'"?s=d:d==="("?l++:d===")"&&l--,!f&&s===!1&&l===0){if(d===":"&&m===-1)m=b;else if(d===";"||b===k-1){if(m!==-1){var v=W(e.substring(u,m).trim());if(!h.includes(v)){d!==";"&&b++;var r=e.substring(u,b).trim();t+=" "+r+";"}}u=b+1,m=-1}}}}return a&&(t+=_e(a)),i&&(t+=_e(i,!0)),t=t.trim(),t===""?null:t}return e==null?null:String(e)}function bn(e,n,t,a,i,s){var l=e.__className;if(j||l!==t||l===void 0){var f=kn(t,a,s);(!j||f!==e.getAttribute("class"))&&(f==null?e.removeAttribute("class"):n?e.className=f:e.setAttribute("class",f)),e.__className=t}else if(s&&i!==s)for(var h in s){var u=!!s[h];(i==null||u!==!!i[h])&&e.classList.toggle(h,u)}return s}function X(e,n={},t,a){for(var i in t){var s=t[i];n[i]!==s&&(t[i]==null?e.style.removeProperty(i):e.style.setProperty(i,s,a))}}function yn(e,n,t,a){var i=e.__style;if(j||i!==n){var s=gn(n,a);(!j||s!==e.getAttribute("style"))&&(s==null?e.removeAttribute("style"):e.style.cssText=s),e.__style=n}else a&&(Array.isArray(a)?(X(e,t==null?void 0:t[0],a[0]),X(e,t==null?void 0:t[1],a[1],"important")):X(e,t,a));return a}const G=Symbol("class"),S=Symbol("style"),Re=Symbol("is custom element"),Se=Symbol("is html");function Hn(e,n){n?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function x(e,n,t,a){var i=Te(e);j&&(i[n]=e.getAttribute(n),n==="src"||n==="srcset"||n==="href"&&e.nodeName==="LINK")||i[n]!==(i[n]=t)&&(n==="loading"&&(e[tn]=t),t==null?e.removeAttribute(n):typeof t!="string"&&Le(e).includes(n)?e[n]=t:e.setAttribute(n,t))}function ve(e,n,t,a,i=!1){var s=Te(e),l=s[Re],f=!s[Se];let h=j&&l;h&&I(!1);var u=n||{},m=e.tagName==="OPTION";for(var b in n)b in t||(t[b]=null);t.class?t.class=hn(t.class):(a||t[G])&&(t.class=null),t[S]&&(t.style??(t.style=null));var d=Le(e);for(const c in t){let o=t[c];if(m&&c==="value"&&o==null){e.value=e.__value="",u[c]=o;continue}if(c==="class"){var v=e.namespaceURI==="http://www.w3.org/1999/xhtml";bn(e,v,o,a,n==null?void 0:n[G],t[G]),u[c]=o,u[G]=t[G];continue}if(c==="style"){yn(e,o,n==null?void 0:n[S],t[S]),u[c]=o,u[S]=t[S];continue}var r=u[c];if(o!==r){u[c]=o;var k=c[0]+c[1];if(k!=="$$")if(k==="on"){const p={},w="$$"+c;let y=c.slice(2);var g=ln(y);if(an(y)&&(y=y.slice(0,-7),p.capture=!0),!g&&r){if(o!=null)continue;e.removeEventListener(y,u[w],p),u[w]=null}if(o!=null)if(g)e[`__${y}`]=o,rn([y]);else{let V=function(P){u[c].call(this,P)};u[w]=sn(y,e,V,p)}else g&&(e[`__${y}`]=void 0)}else if(c==="style")x(e,c,o);else if(c==="autofocus")un(e,!!o);else if(!l&&(c==="__value"||c==="value"&&o!=null))e.value=e.__value=o;else if(c==="selected"&&m)Hn(e,o);else{var _=c;f||(_=on(_));var H=_==="defaultValue"||_==="defaultChecked";if(o==null&&!l&&!H)if(s[c]=null,_==="value"||_==="checked"){let p=e;const w=n===void 0;if(_==="value"){let y=p.defaultValue;p.removeAttribute(_),p.defaultValue=y,p.value=p.__value=w?y:null}else{let y=p.defaultChecked;p.removeAttribute(_),p.defaultChecked=y,p.checked=w?y:!1}}else e.removeAttribute(c);else H||d.includes(_)&&(l||typeof o!="string")?e[_]=o:typeof o!="function"&&x(e,_,o)}}}return h&&I(!0),u}function Te(e){return e.__attributes??(e.__attributes={[Re]:e.nodeName.includes("-"),[Se]:e.namespaceURI===$e})}var he=new Map;function Le(e){var n=he.get(e.nodeName);if(n)return n;he.set(e.nodeName,n=[]);for(var t,a=e,i=Element.prototype;i!==a;){t=nn(a);for(var s in t)t[s].set&&n.push(s);a=en(a)}return n}const O=(e,n)=>!n||!e.startsWith(n)?e:e.substring(n.length),ne=(e,n)=>!n||!e.endsWith(n)?e:e.substring(0,e.length-n.length),Me=(e,n)=>e.endsWith(n)?e:e+n,Pn=(e,n)=>{const{name:t}=e,i=(v=>v?ne(O(ne(v,".git"),"git+"),"/"):null)(e.repository?typeof e.repository=="string"?e.repository:e.repository.url:null);if(!i)throw new Error("failed to parse package_meta - `repo_url` is required in package_json");const s=e.homepage??null,l=!e.private&&!!e.exports&&e.version!=="0.0.1",f=l?"https://www.npmjs.com/package/"+e.name:null,h=l&&i?i+"/blob/main/CHANGELOG.md":null,u=jn(t),m=i?O(i,"https://github.com/").split("/")[0]:null,b=s?Me(s,"/")+(e.logo?O(e.logo,"/"):"favicon.png"):null,d=e.logo_alt??`logo for ${u}`;return{package_json:e,src_json:n,name:t,repo_name:u,repo_url:i,owner_name:m,homepage_url:s,logo_url:b,logo_alt:d,npm_url:f,changelog_url:h,published:l}},jn=e=>e[0]==="@"?e.split("/")[1]:e,Vn=()=>{const e=Ne;return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},updated:e.updated}},Bn={subscribe(e){return Vn().page.subscribe(e)}},wn=e=>ne(O(O(e,"https://"),"www."),"/");var Cn=ke("<path></path>"),An=ke("<svg><!><!></svg>");function En(e,n){we(n,!0);const t=ee(n,"size",3,"var(--size, auto)"),a=ee(n,"shrink",3,!0),i=B(()=>n.fill??n.data.fill??"var(--text_color, #000)"),s=B(()=>n.width??t()),l=B(()=>n.height??t()),f=B(()=>{var r,k,g,_;return(r=n.data.attrs)!=null&&r.style&&((k=n.attrs)!=null&&k.style)?Me(n.data.attrs.style,";")+" "+n.attrs.style:((g=n.data.attrs)==null?void 0:g.style)??((_=n.attrs)==null?void 0:_.style)});var h=An();let u;var m=E(h);{var b=r=>{var k=Q(),g=$(k);fn(g,()=>n.data.raw,!0,!1),A(r,k)};Z(m,r=>{n.data.raw&&r(b)})}var d=N(m);{var v=r=>{var k=Q(),g=$(k);pn(g,16,()=>n.data.paths,_=>_,(_,H)=>{var c=Cn();let o;U(()=>o=ve(c,o,{fill:T(i),...H})),A(_,c)}),A(r,k)};Z(d,r=>{n.data.paths&&r(v)})}R(h),U(()=>u=ve(h,u,{viewBox:n.data.viewBox??"0 0 100 100",...n.data.attrs,...n.attrs,"aria-label":n.label??n.data.label,style:T(f),[S]:{width:T(s),height:T(l),display:n.inline?"inline-block":void 0,position:n.inline?"relative":void 0,top:n.inline?"0.1em":void 0,"flex-shrink":a()?1:0}})),A(e,h),Ce()}const Dn={label:"a pixelated green oak acorn with a glint of sun",paths:[{fill:"#6f974c",d:"m 24.035592,57.306905 v -14.5 h 16.329497 v 14.25 z"},{fill:"#5e853f",d:"M 43.75,93.75 H 37.5 V 87.5 H 31.25 V 81.25 H 25 V 75 H 18.75 V 62.5 H 12.5 V 50 H 6.25 V 43.75 H 4 v -21 L 22.75,16.5 h 40.5 l 0.5,61.5 -5,-0.75 -0.25,16.5 h -2.25 l -4,2.25 -2.24617,4 H 43.75 Z M 37.5,50 H 31.25 V 43.75 H 25 v 12.5 h 12.5 z"},{fill:"#6f492b",d:"m 50,93.75 h 6.25 V 75 H 62.5 V 50 H 56.25 V 37.5 H 50 V 31.25 H 43.75 V 25 H 31.25 V 18.75 H 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 v -25 H 6.25 V 12.5 h 12.5 V 6.25 H 37.5 V 0 h 25 v 6.25 h 18.75 v 6.25 h 12.5 v 6.25 H 100 v 25 H 93.75 V 50 H 87.5 V 62.5 H 81.25 V 75 H 75 v 6.25 H 68.75 V 87.5 H 62.5 v 6.25 H 56.25 V 100 H 50 Z"},{fill:"#3b730f",d:"m 50,93.75 h 6.25 V 75 H 62.5 V 50 H 56.25 V 37.5 H 50 V 31.25 H 43.75 V 25 H 31.25 V 18.75 H 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 V 25 H 12.5 V 18.75 H 25 V 12.5 H 43.75 V 6.25 h 12.5 V 12.5 H 75 v 6.25 H 87.5 V 25 H 100 V 43.75 H 93.75 V 50 H 87.5 V 62.5 H 81.25 V 75 H 75 v 6.25 H 68.75 V 87.5 H 62.5 v 6.25 H 56.25 V 100 H 50 Z"},{fill:"#473323",d:"M 87.5,37.5 H 81.25 V 31.25 H 68.75 V 25 H 62.5 V 18.75 H 43.75 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 V 25 H 12.5 V 18.75 H 25 V 12.5 H 43.75 V 6.25 h 12.5 V 12.5 H 75 v 6.25 H 87.5 V 25 H 100 V 43.75 H 93.75 V 50 H 87.5 Z"},{fill:"#2e6006",d:"M 87.5,37.5 H 81.25 V 31.25 H 68.75 V 25 H 62.5 v -6.25 h -25 V 12.5 H 50 V 6.25 h 6.25 v 6.25 h 12.5 v 6.25 h 12.5 V 25 h 12.5 v 6.25 H 100 v 12.5 H 93.75 V 50 H 87.5 Z"},{fill:"#34251a",d:"M 93.75,31.25 H 87.5 V 25 h 6.25 v 6.25 H 100 v 12.5 H 93.75 Z M 75,18.75 h 6.25 V 25 H 75 Z M 37.5,12.5 H 50 V 6.25 h 6.25 v 6.25 h 12.5 v 6.25 H 53.125 37.5 Z"}]},z={label:"a friendly brown spider facing you",fill:"#84522a",paths:[{d:"M 26.253917,88.532336 29.904106,71.394855 40.667193,53.342811 40.258534,49.99234 38.417407,49.000991 22.876908,50.369035 9.4865496,53.880193 2.3019024,57.978424 0.42708056,57.27994 7.2642726,51.086985 20.811326,45.373351 37.960128,42.356792 39.354818,40.107008 38.229925,38.149883 26.030989,27.105568 14.46539,21.861786 8.0479986,18.615387 l -0.41428,-1.710463 8.2789464,1.499862 13.012873,5.003724 13.447448,10.696856 1.680801,-0.729547 0.222439,-1.343157 -3.983998,-12.128053 -5.730215,-9.573597 -0.823624,-5.1744052 1.16944,-1.165102 2.604334,6.3355162 6.612025,7.08777 4.874534,11.55989 2.800804,0.515574 4.48815,-1.359246 1.521623,-8.687062 5.685014,-8.620764 2.75965,-6.8316782 1.094578,1.128569 -1.293029,5.4222362 -4.084776,11.06803 -0.484994,8.377408 0.194311,1.192896 1.42954,1.700726 11.563936,-10.644623 9.878262,-8.331535 8.732915,-3.390708 -0.387305,1.402757 -5.294686,3.023816 -10.445054,10.705792 -9.561599,13.627899 -0.438945,1.602755 1.001398,1.666754 17.376932,3.986302 9.537375,6.940531 4.325785,4.636405 0.211208,1.557106 -6.15842,-4.279925 -10.413771,-5.155697 -15.838715,-1.696223 -0.83461,1.144484 0.774499,2.593247 9.737644,16.194355 3.925704,17.214082 0.07146,10.277289 -1.706242,1.13628 -2.009721,-9.21637 -5.894265,-16.88027 -12.292087,-17.295813 -4.177778,-0.585888 -7.294671,2.935716 -11.138052,16.645915 -6.462422,17.752509 -1.634756,7.206641 -2.070766,-1.52923 z"}]},Un={label:"a fuzzy tuft of green moss",fill:"#3db33d",paths:z.paths,attrs:{style:"transform: scaleX(-1) rotate(180deg)"}},Zn={label:"a green sauropod wearing a brown belt",paths:[{fill:"#5e853f",d:"M 18.067186,15.969407 C 21.788999,13.893836 17.949371,0.38957847 10.927436,0.04361599 4.8719565,-0.25473037 1.7349173,7.4851976 0.94704854,15.249287 c -0.92008807,9.06705 -1.79155525,17.669932 0.59969726,28.291532 2.4805689,12.269719 7.0800447,23.952702 13.1393162,34.8823 6.000724,10.5946 6.775015,20.816886 4.701503,21.478748 -0.03241,0.01035 -0.07998,0.06265 0.04147,0.06596 1.294211,0.03532 10.640814,0.04592 10.677563,-0.05295 0.485896,-1.307172 -3.047914,-6.728008 -1.423246,-8.607633 1.949043,-2.254904 17.430713,0.186565 21.929,0.285178 9.05576,0.198523 17.000796,-1.770745 18.230176,-0.990103 1.997906,1.268647 0.07692,8.622864 -1.734662,9.31776 -0.123669,0.04744 -0.0605,0.05786 8.7e-5,0.05776 1.355848,-0.0022 8.671284,0.02064 9.113066,-0.03424 1.109966,-0.137881 1.121155,-9.535235 1.329075,-10.418319 C 77.607043,89.2834 96.053852,85.109995 99.112049,70.368973 103.63141,48.584901 86.877032,39.05263 85.950278,39.29966 83.317032,40.001563 101.56057,48.396651 91.102193,67.902384 88.018737,73.653284 77.350057,79.523245 75.685258,79.119008 73.64059,78.622534 65.09671,63.091297 52.400901,65.836332 43.234666,67.818217 41.919113,72.011159 30.91062,71.457371 23.396234,71.079356 15.879493,62.020499 10.825044,44.977744 8.7853926,38.10038 7.9304392,31.282385 7.7195376,25.924892 7.3556266,16.68053 7.7329856,12.199716 7.7329856,12.199716 c 0,0 7.0326794,5.610875 10.3342004,3.769691 z"},{fill:"#6f492b",d:"m 51.811124,91.579144 c -0.338516,0.300927 1.649325,0.223227 1.91566,0.125562 10.084215,-3.697658 13.756737,-6.313605 15.083689,-19.379753 0.213532,-2.102603 -6.814409,-6.279564 -6.854038,-5.131405 -0.399472,11.573929 -1.610604,16.392773 -10.086139,24.32687"},{fill:"#34251a",d:"m 57.712693,87.945562 c 0,0 1.995464,1.865412 2.68268,1.964956 0.765874,0.110938 4.011805,-1.572536 4.056136,-2.519526 0.05138,-1.097583 -3.559853,-3.060285 -3.559853,-3.060285"},{fill:"#34251a",d:"m 61.598583,82.940048 c 0,0 3.423751,3.095396 4.286346,2.851789 0.676123,-0.190945 2.567214,-3.369081 2.28239,-4.177499 -0.333199,-0.945723 -5.337842,-1.790867 -5.337842,-1.790867"},{fill:"#34251a",d:"m 63.187415,78.383306 c 0,0 4.923745,1.759016 5.668289,1.154079 0.551751,-0.448294 1.380932,-3.505132 1.032166,-4.129317 -0.767431,-1.37347 -5.791186,-3.388548 -5.791186,-3.388548"}]};z.paths;z.paths;z.paths;z.paths;const xn={label:"a friendly orange pixelated spider facing you",fill:"#f4672f",paths:[{d:"m 25,81.200002 h 6.2 v -12.5 h 6.3 v -18.7 h -6.3 v 6.2 H 12.5 v 6.3 H 0 v -6.3 h 6.2 v -6.2 H 25 v -6.3 h 12.5 v -6.2 h -6.3 v -6.3 H 18.7 v -6.2 H 6.2 v -6.3 H 25 v 6.3 h 12.5 v -6.3 H 31.2 V 6.2 h 6.3 v 6.300002 h 6.2 V 31.200001 H 56.2 V 12.500002 h 6.3 V 6.2 h 6.2 v 12.500001 h -6.2 v 18.800001 h 6.2 v -12.5 h 12.5 v -12.5 h 12.5 v 6.2 h -6.2 v 12.5 H 75 v 12.5 h 6.2 v 6.3 h 12.5 v 6.2 h 6.299997 v 6.3 H 87.5 v -6.3 H 75 v -6.2 h -6.3 v 12.5 H 75 v 12.5 h 6.2 V 99.99999 H 75 V 81.200002 h -6.3 v -12.5 h -6.2 v -12.5 H 43.7 v 18.8 h -6.2 v 12.5 H 31.2 V 99.99999 H 25 Z"}]},Rn={label:"the GitHub logo, an octocat silhouette",paths:[{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z","fill-rule":"evenodd","clip-rule":"evenodd",transform:"scale(64)"}],viewBox:"0 0 1024 1024"};var Sn=ge('<div class="root_url svelte-cs8o0f"><a> </a></div>'),Tn=ge('<footer class="box"><!> <div class="logo box panel p_lg shadow_inset_xs svelte-cs8o0f"><!> <a rel="me" title="source code on GitHub" class="svelte-cs8o0f"><!></a> <!></div> <!></footer>');function Fn(e,n){we(n,!0);const t=ee(n,"root_url",3,null);var a=Tn(),i=E(a);D(i,()=>n.children??K);var s=N(i,2),l=E(s);D(l,()=>n.logo_header??K);var f=N(l,2),h=E(f);{var u=r=>{var k=Q(),g=$(k);D(g,()=>n.logo),A(r,k)},m=r=>{En(r,{data:Rn,size:"var(--icon_size_lg)"})};Z(h,r=>{n.logo?r(u):r(m,!1)})}R(f);var b=N(f,2);D(b,()=>n.logo_footer??K),R(s);var d=N(s,2);{var v=r=>{var k=Sn(),g=E(k),_=E(g,!0);R(g),R(k),U(H=>{x(g,"href",t()),dn(_,H)},[()=>wn(t())]),A(r,k)};Z(d,r=>{t()&&r(v)})}R(a),U(()=>x(f,"href",n.pkg.repo_url)),A(e,a),Ce()}const Jn={name:"@ryanatkn/belt",version:"0.30.1",description:"utility belt for JS",glyph:"🦕",logo:"logo.svg",logo_alt:"a green sauropod wearing a brown utility belt",motto:"ancient not extinct",public:!0,license:"MIT",homepage:"https://belt.ryanatkn.com/",author:{name:"Ryan Atkinson",email:"mail@ryanatkn.com",url:"https://www.ryanatkn.com/"},repository:{type:"git",url:"git+https://github.com/ryanatkn/belt.git"},bugs:"https://github.com/ryanatkn/belt/issues",funding:"https://www.ryanatkn.com/funding",scripts:{start:"gro dev",dev:"gro dev",build:"gro build",check:"gro check",test:"gro test",preview:"vite preview",deploy:"gro deploy",benchmark:"gro run src/benchmarks/slugify_benchmark.ts"},type:"module",engines:{node:">=22.11"},keywords:["js","typescript","utilities","web"],peerDependencies:{"@types/node":"^22.7.4","esm-env":"^1.2.2"},peerDependenciesMeta:{"@types/node":{optional:!0},"esm-env":{optional:!0}},devDependencies:{"@changesets/changelog-git":"^0.2.1","@ryanatkn/eslint-config":"^0.8.0","@ryanatkn/fuz":"^0.135.0","@ryanatkn/gro":"^0.149.0","@ryanatkn/moss":"^0.24.2","@sveltejs/adapter-static":"^3.0.8","@sveltejs/kit":"^2.20.4","@sveltejs/package":"^2.3.10","@sveltejs/vite-plugin-svelte":"^5.0.3","@types/node":"^22.14.0",eslint:"^9.24.0","eslint-plugin-svelte":"^3.5.1",prettier:"^3.5.3","prettier-plugin-svelte":"^3.3.3",svelte:"^5.25.6","svelte-check":"^4.1.5",tinybench:"^4.0.1",tslib:"^2.8.1",typescript:"^5.8.2","typescript-eslint":"^8.29.0",uvu:"^0.5.6"},prettier:{plugins:["prettier-plugin-svelte"],useTabs:!0,printWidth:100,singleQuote:!0,bracketSpacing:!1,overrides:[{files:"package.json",options:{useTabs:!1}}]},sideEffects:["**/*.css"],files:["dist","src/lib/**/*.ts","!src/lib/**/*.test.*","!dist/**/*.test.*"],exports:{"./package.json":"./package.json","./array.js":{types:"./dist/array.d.ts",default:"./dist/array.js"},"./async.js":{types:"./dist/async.d.ts",default:"./dist/async.js"},"./colors.js":{types:"./dist/colors.d.ts",default:"./dist/colors.js"},"./counter.js":{types:"./dist/counter.d.ts",default:"./dist/counter.js"},"./dom.js":{types:"./dist/dom.d.ts",default:"./dist/dom.js"},"./error.js":{types:"./dist/error.d.ts",default:"./dist/error.js"},"./fetch.js":{types:"./dist/fetch.d.ts",default:"./dist/fetch.js"},"./function.js":{types:"./dist/function.d.ts",default:"./dist/function.js"},"./id.js":{types:"./dist/id.d.ts",default:"./dist/id.js"},"./iterator.js":{types:"./dist/iterator.d.ts",default:"./dist/iterator.js"},"./json.js":{types:"./dist/json.d.ts",default:"./dist/json.js"},"./log.js":{types:"./dist/log.d.ts",default:"./dist/log.js"},"./map.js":{types:"./dist/map.d.ts",default:"./dist/map.js"},"./maths.js":{types:"./dist/maths.d.ts",default:"./dist/maths.js"},"./object.js":{types:"./dist/object.d.ts",default:"./dist/object.js"},"./path.js":{types:"./dist/path.d.ts",default:"./dist/path.js"},"./print.js":{types:"./dist/print.d.ts",default:"./dist/print.js"},"./process.js":{types:"./dist/process.d.ts",default:"./dist/process.js"},"./random_alea.js":{types:"./dist/random_alea.d.ts",default:"./dist/random_alea.js"},"./random.js":{types:"./dist/random.d.ts",default:"./dist/random.js"},"./regexp.js":{types:"./dist/regexp.d.ts",default:"./dist/regexp.js"},"./result.js":{types:"./dist/result.d.ts",default:"./dist/result.js"},"./string.js":{types:"./dist/string.d.ts",default:"./dist/string.js"},"./throttle.js":{types:"./dist/throttle.d.ts",default:"./dist/throttle.js"},"./timings.js":{types:"./dist/timings.d.ts",default:"./dist/timings.js"},"./types.js":{types:"./dist/types.d.ts",default:"./dist/types.js"},"./url.js":{types:"./dist/url.d.ts",default:"./dist/url.js"}}},Yn={name:"@ryanatkn/belt",version:"0.30.1",modules:{"./package.json":{path:"package.json",declarations:[]},"./array.js":{path:"array.ts",declarations:[{name:"EMPTY_ARRAY",kind:"variable"},{name:"to_array",kind:"function"},{name:"remove_unordered",kind:"function"},{name:"to_next",kind:"function"}]},"./async.js":{path:"async.ts",declarations:[{name:"Async_Status",kind:"type"},{name:"wait",kind:"function"},{name:"is_promise",kind:"function"},{name:"Deferred",kind:"type"},{name:"create_deferred",kind:"function"}]},"./colors.js":{path:"colors.ts",declarations:[{name:"Hsl",kind:"type"},{name:"Hue",kind:"type"},{name:"Saturation",kind:"type"},{name:"Lightness",kind:"type"},{name:"Rgb",kind:"type"},{name:"Red",kind:"type"},{name:"Green",kind:"type"},{name:"Blue",kind:"type"},{name:"rgb_to_hex",kind:"function"},{name:"hex_to_rgb",kind:"function"},{name:"hex_string_to_rgb",kind:"function"},{name:"rgb_to_hex_string",kind:"function"},{name:"to_hex_component",kind:"function"},{name:"rgb_to_hsl",kind:"function"},{name:"hsl_to_rgb",kind:"function"},{name:"hue_to_rgb_component",kind:"function"},{name:"hsl_to_hex",kind:"function"},{name:"hsl_to_hex_string",kind:"function"},{name:"hsl_to_string",kind:"function"},{name:"hex_string_to_hsl",kind:"function"},{name:"parse_hsl_string",kind:"function"}]},"./counter.js":{path:"counter.ts",declarations:[{name:"Counter",kind:"type"},{name:"Create_Counter",kind:"type"},{name:"create_counter",kind:"function"}]},"./dom.js":{path:"dom.ts",declarations:[{name:"is_editable",kind:"function"},{name:"inside_editable",kind:"function"},{name:"is_interactive",kind:"function"},{name:"swallow",kind:"function"},{name:"handle_target_value",kind:"function"},{name:"is_iframed",kind:"function"}]},"./error.js":{path:"error.ts",declarations:[{name:"Unreachable_Error",kind:"class"},{name:"unreachable",kind:"function"}]},"./fetch.js":{path:"fetch.ts",declarations:[{name:"Fetch_Value_Options",kind:"type"},{name:"fetch_value",kind:"function"},{name:"Fetch_Value_Cache_Key",kind:"variable"},{name:"Fetch_Value_Cache_Item",kind:"variable"},{name:"Fetch_Value_Cache",kind:"variable"},{name:"to_fetch_value_cache_key",kind:"function"},{name:"serialize_cache",kind:"function"},{name:"deserialize_cache",kind:"function"}]},"./function.js":{path:"function.ts",declarations:[{name:"noop",kind:"function"},{name:"noop_async",kind:"function"},{name:"resolved",kind:"variable"},{name:"identity",kind:"function"},{name:"Thunk",kind:"type"},{name:"unthunk",kind:"function"}]},"./id.js":{path:"id.ts",declarations:[{name:"Uuid",kind:"type"},{name:"is_uuid",kind:"function"},{name:"UUID_MATCHER",kind:"variable"},{name:"Client_Id_Creator",kind:"type"},{name:"create_client_id_creator",kind:"function"}]},"./iterator.js":{path:"iterator.ts",declarations:[{name:"count_iterator",kind:"function"}]},"./json.js":{path:"json.ts",declarations:[{name:"Json",kind:"type"},{name:"Json_Primitive",kind:"type"},{name:"Json_Object",kind:"type"},{name:"Json_Array",kind:"type"},{name:"Json_Type",kind:"type"},{name:"to_json_type",kind:"function"},{name:"canonicalize",kind:"function"},{name:"embed_json",kind:"function"}]},"./log.js":{path:"log.ts",declarations:[{name:"Log_Level",kind:"type"},{name:"to_log_level_value",kind:"function"},{name:"configure_log_level",kind:"function"},{name:"configure_log_colors",kind:"function"},{name:"Log",kind:"type"},{name:"Logger_State",kind:"type"},{name:"Logger_Prefixes_And_Suffixes_Getter",kind:"type"},{name:"Base_Logger",kind:"class"},{name:"Logger",kind:"class"},{name:"System_Logger",kind:"class"}]},"./map.js":{path:"map.ts",declarations:[{name:"sort_map",kind:"function"},{name:"compare_simple_map_entries",kind:"function"}]},"./maths.js":{path:"maths.ts",declarations:[{name:"clamp",kind:"function"},{name:"lerp",kind:"function"},{name:"round",kind:"function"},{name:"GR",kind:"variable"},{name:"GR_i",kind:"variable"},{name:"GR_2",kind:"variable"},{name:"GR_2i",kind:"variable"},{name:"GR_3",kind:"variable"},{name:"GR_3i",kind:"variable"},{name:"GR_4",kind:"variable"},{name:"GR_4i",kind:"variable"},{name:"GR_5",kind:"variable"},{name:"GR_5i",kind:"variable"},{name:"GR_6",kind:"variable"},{name:"GR_6i",kind:"variable"},{name:"GR_7",kind:"variable"},{name:"GR_7i",kind:"variable"},{name:"GR_8",kind:"variable"},{name:"GR_8i",kind:"variable"},{name:"GR_9",kind:"variable"},{name:"GR_9i",kind:"variable"}]},"./object.js":{path:"object.ts",declarations:[{name:"is_plain_object",kind:"function"},{name:"map_record",kind:"function"},{name:"omit",kind:"function"},{name:"pick_by",kind:"function"},{name:"omit_undefined",kind:"function"},{name:"reorder",kind:"function"},{name:"EMPTY_OBJECT",kind:"variable"},{name:"traverse",kind:"function"}]},"./path.js":{path:"path.ts",declarations:[{name:"parse_path_parts",kind:"function"},{name:"parse_path_segments",kind:"function"},{name:"parse_path_pieces",kind:"function"},{name:"Path_Piece",kind:"type"},{name:"slugify",kind:"function"}]},"./print.js":{path:"print.ts",declarations:[{name:"st",kind:"function"},{name:"set_colors",kind:"function"},{name:"print_key_value",kind:"function"},{name:"print_ms",kind:"function"},{name:"print_number_with_separators",kind:"function"},{name:"print_string",kind:"function"},{name:"print_number",kind:"function"},{name:"print_boolean",kind:"function"},{name:"print_value",kind:"function"},{name:"print_error",kind:"function"},{name:"print_timing",kind:"function"},{name:"print_timings",kind:"function"},{name:"print_log_label",kind:"function"}]},"./process.js":{path:"process.ts",declarations:[{name:"Spawned_Process",kind:"type"},{name:"Spawned",kind:"type"},{name:"Spawn_Result",kind:"type"},{name:"spawn",kind:"function"},{name:"Spawned_Out",kind:"type"},{name:"spawn_out",kind:"function"},{name:"spawn_process",kind:"function"},{name:"print_child_process",kind:"function"},{name:"global_spawn",kind:"variable"},{name:"register_global_spawn",kind:"function"},{name:"despawn",kind:"function"},{name:"despawn_all",kind:"function"},{name:"attach_process_error_handlers",kind:"function"},{name:"print_spawn_result",kind:"function"},{name:"Restartable_Process",kind:"type"},{name:"spawn_restartable_process",kind:"function"}]},"./random_alea.js":{path:"random_alea.ts",declarations:[{name:"Alea",kind:"type"},{name:"create_random_alea",kind:"function"},{name:"masher",kind:"function"}]},"./random.js":{path:"random.ts",declarations:[{name:"random_float",kind:"function"},{name:"random_int",kind:"function"},{name:"random_boolean",kind:"function"},{name:"random_item",kind:"function"},{name:"shuffle",kind:"function"}]},"./regexp.js":{path:"regexp.ts",declarations:[{name:"escape_regexp",kind:"function"}]},"./result.js":{path:"result.ts",declarations:[{name:"Result",kind:"type"},{name:"OK",kind:"variable"},{name:"NOT_OK",kind:"variable"},{name:"unwrap",kind:"function"},{name:"Result_Error",kind:"class"},{name:"unwrap_error",kind:"function"}]},"./string.js":{path:"string.ts",declarations:[{name:"truncate",kind:"function"},{name:"strip_start",kind:"function"},{name:"strip_end",kind:"function"},{name:"strip_after",kind:"function"},{name:"strip_before",kind:"function"},{name:"ensure_start",kind:"function"},{name:"ensure_end",kind:"function"},{name:"deindent",kind:"function"},{name:"plural",kind:"function"},{name:"count_graphemes",kind:"function"},{name:"strip_ansi",kind:"function"}]},"./throttle.js":{path:"throttle.ts",declarations:[{name:"Throttle_Options",kind:"type"},{name:"throttle",kind:"function"}]},"./timings.js":{path:"timings.ts",declarations:[{name:"Stopwatch",kind:"type"},{name:"create_stopwatch",kind:"function"},{name:"Timings_Key",kind:"type"},{name:"Timings",kind:"class"}]},"./types.js":{path:"types.ts",declarations:[{name:"Class_Constructor",kind:"type"},{name:"Omit_Strict",kind:"type"},{name:"Pick_Union",kind:"type"},{name:"Keyof_Union",kind:"type"},{name:"Partial_Except",kind:"type"},{name:"Partial_Only",kind:"type"},{name:"Partial_Values",kind:"type"},{name:"Assignable",kind:"type"},{name:"Defined",kind:"type"},{name:"Not_Null",kind:"type"},{name:"Array_Element",kind:"type"},{name:"Flavored",kind:"type"},{name:"Flavor",kind:"type"},{name:"Branded",kind:"type"},{name:"Brand",kind:"type"}]},"./url.js":{path:"url.ts",declarations:[{name:"format_url",kind:"function"}]}}};export{G as C,Fn as L,En as S,yn as a,bn as b,ve as c,Pn as d,Yn as e,wn as f,Jn as g,Zn as h,O as i,ne as j,Me as k,pn as l,zn as m,Dn as n,Un as o,Bn as p,z as q,xn as r,x as s};
