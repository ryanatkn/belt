import{t as F,b as d,d as B,e as X}from"../chunks/B2Hw9ztH.js";import{_ as Ee,E as sa,aD as na,aE as oa,af as ia,a as la,aF as va,aG as da,a0 as ca,n as oe,X as Ce,Y as Le,Z as _a,ag as ua,C as fa,p as ue,t as L,o as fe,q as n,r,v as g,m as N,ad as M,J as o,ae as V}from"../chunks/6wudGlqZ.js";import{f as ga,w as pa,s as O}from"../chunks/CdTWKb3A.js";import{p as ma,i as S,s as Ae,a as Ge}from"../chunks/BdMtOV4k.js";import{c as Te,i as he,j as Ne,s as R,k as we,a as Pe,l as ke,b as ae,m as Me,f as ha,p as Re,S as ce,n as wa,o as ka,q as xa,r as ya,d as ba,L as qa,e as ja,g as me}from"../chunks/C5x5XSbs.js";import{s as D}from"../chunks/CRabrc7I.js";import{b as Fa}from"../chunks/FYlQauyN.js";const za=()=>performance.now(),J={tick:l=>requestAnimationFrame(l),now:()=>za(),tasks:new Set};function Be(){const l=J.now();J.tasks.forEach(e=>{e.c(l)||(J.tasks.delete(e),e.f())}),J.tasks.size!==0&&J.tick(Be)}function Sa(l){let e;return J.tasks.size===0&&J.tick(Be),{promise:new Promise(t=>{J.tasks.add(e={c:l,f:t})}),abort(){J.tasks.delete(e)}}}function _e(l,e){pa(()=>{l.dispatchEvent(new CustomEvent(e))})}function Ea(l){if(l==="float")return"cssFloat";if(l==="offset")return"cssOffset";if(l.startsWith("--"))return l;const e=l.split("-");return e.length===1?e[0]:e[0]+e.slice(1).map(t=>t[0].toUpperCase()+t.slice(1)).join("")}function We(l){const e={},t=l.split(";");for(const v of t){const[u,a]=v.split(":");if(!u||a===void 0)break;const y=Ea(u.trim());e[y]=a.trim()}return e}const Ca=l=>l;function La(l,e,t,v){var u=(l&va)!==0,a="both",y,z=e.inert,T=e.style.overflow,c,_;function q(){var C=_a,h=Ee;Ce(null),Le(null);try{return y??(y=t()(e,(v==null?void 0:v())??{},{direction:a}))}finally{Ce(C),Le(h)}}var E={is_global:u,in(){e.inert=z,_e(e,"introstart"),c=xe(e,q(),_,1,()=>{_e(e,"introend"),c==null||c.abort(),c=y=void 0,e.style.overflow=T})},out(C){e.inert=!0,_e(e,"outrostart"),_=xe(e,q(),c,0,()=>{_e(e,"outroend"),C==null||C()})},stop:()=>{c==null||c.abort(),_==null||_.abort()}},k=Ee;if((k.transitions??(k.transitions=[])).push(E),ga){var j=u;if(!j){for(var x=k.parent;x&&(x.f&sa)!==0;)for(;(x=x.parent)&&(x.f&na)===0;);j=!x||(x.f&oa)!==0}j&&ia(()=>{la(()=>E.in())})}}function xe(l,e,t,v,u){var a=v===1;if(da(e)){var y,z=!1;return ca(()=>{if(!z){var C=e({direction:a?"in":"out"});y=xe(l,C,t,v,u)}}),{abort:()=>{z=!0,y==null||y.abort()},deactivate:()=>y.deactivate(),reset:()=>y.reset(),t:()=>y.t()}}if(t==null||t.deactivate(),!(e!=null&&e.duration))return u(),{abort:oe,deactivate:oe,reset:oe,t:()=>v};const{delay:T=0,css:c,tick:_,easing:q=Ca}=e;var E=[];if(a&&t===void 0&&(_&&_(0,1),c)){var k=We(c(0,1));E.push(k,k)}var j=()=>1-v,x=l.animate(E,{duration:T});return x.onfinish=()=>{var C=(t==null?void 0:t.t())??1-v;t==null||t.abort();var h=v-C,P=e.duration*Math.abs(h),A=[];if(P>0){var te=!1;if(c)for(var Z=Math.ceil(P/16.666666666666668),Y=0;Y<=Z;Y+=1){var I=C+h*q(Y/Z),G=We(c(I,1-I));A.push(G),te||(te=G.overflow==="hidden")}te&&(l.style.overflow="hidden"),j=()=>{var K=x.currentTime;return C+h*q(K/P)},_&&Sa(()=>{if(x.playState!=="running")return!1;var K=j();return _(K,1-K),!0})}x=l.animate(A,{duration:P,fill:"forwards"}),x.onfinish=()=>{j=()=>v,_==null||_(v,1-v),u()}},{abort:()=>{x&&(x.cancel(),x.effect=null,x.onfinish=oe)},deactivate:()=>{u=oe},reset:()=>{v===0&&(_==null||_(1,0))},t:()=>j()}}function Ta(l,e,t,v,u){var a=()=>{v(t[l])};t.addEventListener(e,a),u?ua(()=>{t[l]=u()}):a(),(t===document.body||t===window||t===document)&&fa(()=>{t.removeEventListener(e,a)})}function Na(l){const e=l-1;return e*e*e+1}function Pa(l,{delay:e=0,duration:t=400,easing:v=Na,axis:u="y"}={}){const a=getComputedStyle(l),y=+a.opacity,z=u==="y"?"height":"width",T=parseFloat(a[z]),c=u==="y"?["top","bottom"]:["left","right"],_=c.map(h=>`${h[0].toUpperCase()}${h.slice(1)}`),q=parseFloat(a[`padding${_[0]}`]),E=parseFloat(a[`padding${_[1]}`]),k=parseFloat(a[`margin${_[0]}`]),j=parseFloat(a[`margin${_[1]}`]),x=parseFloat(a[`border${_[0]}Width`]),C=parseFloat(a[`border${_[1]}Width`]);return{delay:e,duration:t,easing:v,css:h=>`overflow: hidden;opacity: ${Math.min(h*20,1)*y};${z}: ${h*T}px;padding-${c[0]}: ${h*q}px;padding-${c[1]}: ${h*E}px;margin-${c[0]}: ${h*k}px;margin-${c[1]}: ${h*j}px;border-${c[0]}-width: ${h*x}px;border-${c[1]}-width: ${h*C}px;min-${z}: 0`}}var Wa=F("<div><!></div>"),Oa=F("<details><summary><!></summary> <!></details>");function Aa(l,e){ue(e,!0);let t=ma(e,"open",15);var v=Oa();let u;var a=n(v);let y;var z=n(a);D(z,()=>e.summary),r(a);var T=g(a,2);{var c=q=>{var E=B(),k=N(E);D(k,()=>e.children),d(q,E)},_=(q,E)=>{{var k=j=>{var x=Wa(),C=n(x);D(C,()=>e.children),r(x),La(3,x,()=>Pa),d(j,x)};S(q,j=>{t()&&j(k)},E)}};S(T,q=>{e.eager?q(c):q(_,!1)})}r(v),L(()=>{u=Te(v,u,{...e.attrs}),y=Te(a,y,{...e.summary_attrs})}),Ta("open","toggle",v,t,t),d(l,v),fe()}var Ga=F('<div class="repo_name svelte-w7xguq"> <!></div>'),Ma=F('<div class="description svelte-w7xguq"> </div>'),Ra=F('<div class="motto svelte-w7xguq"> </div>'),Ba=F('<blockquote class="npm_url svelte-w7xguq"> </blockquote>'),Da=F('<span class="title svelte-w7xguq">homepage</span> <div class="content svelte-w7xguq"><a><img> </a></div>',1),Ia=F('<span class="title svelte-w7xguq">repo</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="repo"> </a></div>',1),Ka=F('<span class="title svelte-w7xguq">npm</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="npm"> </a></div>',1),Ua=F('<span class="title svelte-w7xguq">version</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="version"> </a></div>',1),Ha=F('<span class="title svelte-w7xguq">license</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="license"> </a></div>',1),Ja=F('<span class="title svelte-w7xguq">data</span> <div class="content svelte-w7xguq"><a class="chip svelte-w7xguq" title="data">package.json</a> <a class="chip svelte-w7xguq" title="data">src.json</a></div>',1),Ya=F('<div class="logo svelte-w7xguq"><img></div>'),Va=F("<li> </li>"),Xa=F('<ul class="declarations unstyled svelte-w7xguq"></ul>'),Za=F('<li><div class="module_content svelte-w7xguq"><a class="chip"> </a> <!></div></li>'),Qa=F('<section class="svelte-w7xguq"><menu class="unstyled"></menu></section>'),$a=F("<pre><code> </code></pre>"),et=F('<div class="package_detail svelte-w7xguq"><div class="info svelte-w7xguq"><div class="flex flex_1"><div><header class="svelte-w7xguq"><!></header> <!> <!> <!> <!> <section class="properties svelte-w7xguq"><!> <!> <!> <!> <!> <!></section></div></div> <!></div> <!> <section class="svelte-w7xguq"><!></section></div>');function at(l,e){ue(e,!0);const[t,v]=Ae(),u=()=>Ge(Re,"$page",t),a=M(()=>e.pkg.package_json),y=M(()=>e.pkg.src_json),z=M(()=>o(y).modules),T=M(()=>o(a).repository?he(Ne(Ne(typeof o(a).repository=="string"?o(a).repository:o(a).repository.url,".git"),"/"),"git+"):null),c=M(()=>o(a).license&&o(T)?o(T)+"/blob/main/LICENSE":null),_=(s,i)=>s+"/blob/main/src/lib/"+(i.endsWith(".js")?i.slice(0,-3)+".ts":i),q=M(()=>o(a).exports&&Object.keys(o(a).exports)),E=M(()=>o(a).exports?Object.keys(o(a).exports).map(s=>{const i=he(s,"./");return i==="."?"index.js":i}):null);var k=et(),j=n(k),x=n(j),C=n(x),h=n(C),P=n(h);{var A=s=>{var i=B(),p=N(i);D(p,()=>e.repo_name,()=>e.pkg.repo_name),d(s,i)},te=s=>{var i=Ga(),p=n(i,!0),w=g(p);{var b=m=>{var f=X();L(()=>O(f,` ${o(a).glyph??""}`)),d(m,f)};S(w,m=>{o(a).glyph&&m(b)})}r(i),L(()=>O(p,e.pkg.repo_name)),d(s,i)};S(P,s=>{e.repo_name?s(A):s(te,!1)})}r(h);var Z=g(h,2);D(Z,()=>e.children??oe,()=>e.pkg);var Y=g(Z,2);{var I=s=>{var i=B(),p=N(i);{var w=m=>{var f=B(),W=N(f);D(W,()=>e.description,()=>o(a).description),d(m,f)},b=m=>{var f=Ma(),W=n(f,!0);r(f),L(()=>O(W,o(a).description)),d(m,f)};S(p,m=>{e.description?m(w):m(b,!1)})}d(s,i)};S(Y,s=>{o(a).description&&s(I)})}var G=g(Y,2);{var K=s=>{var i=B(),p=N(i);{var w=m=>{var f=B(),W=N(f);D(W,()=>e.motto,()=>o(a).motto),d(m,f)},b=m=>{var f=Ra(),W=n(f,!0);r(f),L(()=>O(W,o(a).motto)),d(m,f)};S(p,m=>{e.motto?m(w):m(b,!1)})}d(s,i)};S(G,s=>{o(a).motto&&s(K)})}var re=g(G,2);{var ie=s=>{var i=B(),p=N(i);{var w=m=>{var f=B(),W=N(f);D(W,()=>e.npm_url,()=>e.pkg.npm_url),d(m,f)},b=m=>{var f=Ba(),W=n(f);r(f),L(()=>O(W,`npm i -D ${o(a).name??""}`)),d(m,f)};S(p,m=>{e.npm_url?m(w):m(b,!1)})}d(s,i)};S(re,s=>{e.pkg.npm_url&&s(ie)})}var H=g(re,2),Q=n(H);{var ge=s=>{var i=B(),p=N(i);{var w=m=>{var f=B(),W=N(f);D(W,()=>e.homepage_url,()=>e.pkg.homepage_url),d(m,f)},b=m=>{var f=Da(),W=g(N(f),2),$=n(W);let le;var ee=n($);Pe(ee,"",{},{width:"16px",height:"16px","margin-right":"var(--space_xs)"});var ve=g(ee);r($),r(W),L((se,pe)=>{le=ae($,1,"chip svelte-w7xguq",null,le,se),R($,"href",e.pkg.homepage_url),R(ee,"src",e.pkg.logo_url),R(ee,"alt",e.pkg.logo_alt),O(ve,` ${pe??""}`)},[()=>({selected:e.pkg.homepage_url===u().url.href}),()=>ha(e.pkg.homepage_url)]),d(m,f)};S(p,m=>{e.homepage_url?m(w):m(b,!1)})}d(s,i)};S(Q,s=>{e.pkg.homepage_url&&s(ge)})}var ye=g(Q,2);{var De=s=>{var i=Ia(),p=g(N(i),2),w=n(p),b=n(w);r(w),r(p),L(()=>{R(w,"href",e.pkg.repo_url),O(b,`${e.pkg.owner_name??""}/${e.pkg.repo_name??""}`)}),d(s,i)};S(ye,s=>{e.pkg.repo_url&&s(De)})}var be=g(ye,2);{var Ie=s=>{var i=Ka(),p=g(N(i),2),w=n(p),b=n(w,!0);r(w),r(p),L(()=>{R(w,"href",e.pkg.npm_url),O(b,o(a).name)}),d(s,i)};S(be,s=>{e.pkg.npm_url&&s(Ie)})}var qe=g(be,2);{var Ke=s=>{var i=Ua(),p=g(N(i),2),w=n(p),b=n(w,!0);r(w),r(p),L(()=>{R(w,"href",e.pkg.changelog_url),O(b,o(a).version)}),d(s,i)};S(qe,s=>{e.pkg.changelog_url&&s(Ke)})}var je=g(qe,2);{var Ue=s=>{var i=Ha(),p=g(N(i),2),w=n(p),b=n(w,!0);r(w),r(p),L(()=>{R(w,"href",o(c)),O(b,o(a).license)}),d(s,i)};S(je,s=>{o(c)&&s(Ue)})}var He=g(je,2);{var Je=s=>{var i=Ja(),p=g(N(i),2),w=n(p),b=g(w,2);r(p),L((m,f)=>{R(w,"href",`${m??""}.well-known/package.json`),R(b,"href",`${f??""}.well-known/src.json`)},[()=>we(e.pkg.homepage_url,"/"),()=>we(e.pkg.homepage_url,"/")]),d(s,i)};S(He,s=>{e.pkg.homepage_url&&s(Je)})}r(H),r(C),r(x);var Ye=g(x,2);{var Ve=s=>{var i=Ya(),p=n(i);Pe(p,"",{},{width:"var(--size, var(--icon_size_xl2))",height:"var(--size, var(--icon_size_xl2))"}),r(i),L(()=>{R(p,"src",e.pkg.logo_url),R(p,"alt",e.pkg.logo_alt)}),d(s,i)};S(Ye,s=>{e.pkg.logo_url&&s(Ve)})}r(j);var Fe=g(j,2);{var Xe=s=>{var i=Qa(),p=n(i);ke(p,22,()=>o(E),w=>w,(w,b,m)=>{var f=Za();const W=M(()=>_(e.pkg.repo_url,b)),$=M(()=>{var U;return(U=o(q))==null?void 0:U[o(m)]}),le=M(()=>{var U;return o($)?(U=o(z))==null?void 0:U[o($)]:void 0});let ee;var ve=n(f),se=n(ve),pe=n(se,!0);r(se);var Qe=g(se,2);{var $e=U=>{var ne=Xa();ke(ne,21,()=>o(le).declarations,Me,(ea,Se)=>{let aa=()=>o(Se).name,ta=()=>o(Se).kind;var de=Va(),ra=n(de,!0);r(de),L(()=>{ae(de,1,`declaration chip ${ta()??""}_declaration`,"svelte-w7xguq"),O(ra,aa())}),d(ea,de)}),r(ne),d(U,ne)};S(Qe,U=>{var ne;(ne=o(le))!=null&&ne.declarations.length&&U($e)})}r(ve),r(f),L(U=>{ee=ae(f,1,"module svelte-w7xguq",null,ee,U),R(se,"href",o(W)),O(pe,b)},[()=>({ts:b.endsWith(".js"),svelte:b.endsWith(".svelte"),css:b.endsWith(".css"),json:b.endsWith(".json")})]),d(w,f)}),r(p),r(i),d(s,i)};S(Fe,s=>{o(E)&&e.pkg.repo_url&&s(Xe)})}var ze=g(Fe,2),Ze=n(ze);Aa(Ze,{summary:i=>{V();var p=X("raw package metadata");d(i,p)},children:(i,p)=>{var w=$a(),b=n(w),m=n(b,!0);r(b),r(w),L(f=>O(m,f),[()=>JSON.stringify(e.pkg,null,"	")]),d(i,w)},$$slots:{summary:!0,default:!0}}),r(ze),r(k),d(l,k),fe(),v()}var tt=F('<ul><li><a rel="me" href="https://www.ryanatkn.com/">ryanatkn.com</a> - my homepage<!></li> <li>GitHub as <a rel="me" href="https://github.com/ryanatkn">@ryanatkn</a> and Bluesky as <a href="https://bsky.app/profile/ryanatkn.com">@ryanatkn.com</a></li> <li>Mastodon as <a rel="me" href="https://fosstodon.org/@ryanatkn">@ryanatkn@fosstodon.org</a> and <a rel="me" href="https://fosstodon.org/@webdevladder">@webdevladder@fosstodon.org</a></li> <li><a rel="me" href="https://www.webdevladder.net/">webdevladder.net</a> - realworld webdev with TypeScript and Svelte, <a href="https://www.webdevladder.net/blog">blog</a> and YouTube channels <a rel="me" href="https://youtube.com/@webdevladder">@webdevladder</a> and <a rel="me" href="https://youtube.com/@webdevladder_vods">@webdevladder_vods</a><!></li> <li>@webdevladder on <a rel="me" href="https://www.reddit.com/user/webdevladder/">Reddit</a> and <a href="https://news.ycombinator.com/user?id=webdevladder">Hacker News</a></li></ul>');function rt(l,e){var t=tt(),v=n(t),u=n(v);let a;var y=g(u,2);{var z=k=>{var j=X(", you are here");d(k,j)};S(y,k=>{e.selected==="ryanatkn.com"&&k(z)})}r(v);var T=g(v,6),c=n(T);let _;var q=g(c,7);{var E=k=>{var j=X(", you are here");d(k,j)};S(q,k=>{e.selected==="webdevladder.net"&&k(E)})}r(T),V(2),r(t),L((k,j)=>{a=ae(u,1,"",null,a,k),_=ae(c,1,"",null,_,j)},[()=>({selected:e.selected==="ryanatkn.com"}),()=>({selected:e.selected==="webdevladder.net"})]),d(l,t)}var st=F('<a class="project_link svelte-1bpnvy9" title="Gro - task runner and toolkit extending SvelteKit" href="https://gro.ryanatkn.com/"><!><span class="name svelte-1bpnvy9">Gro</span></a> <a class="project_link svelte-1bpnvy9" title="Moss - CSS framework" href="https://moss.ryanatkn.com/"><!><span class="name svelte-1bpnvy9">Moss</span></a> <a class="project_link svelte-1bpnvy9" title="Fuz - Svelte UI library" href="https://www.fuz.dev/"><!><span class="name svelte-1bpnvy9">Fuz</span></a> <a class="project_link svelte-1bpnvy9" title="fuz_template - a static web app and Node library template with TypeScript, Svelte, SvelteKit, Vite, esbuild, Fuz, and Gro" href="https://template.fuz.dev/"><!><span class="name svelte-1bpnvy9">fuz_template</span></a>',1);function nt(l){const e="var(--icon_size_lg)";var t=st(),v=N(t),u=n(v);ce(u,{data:wa,size:e}),V(),r(v);var a=g(v,2),y=n(a);ce(y,{data:ka,size:e}),V(),r(a);var z=g(a,2),T=n(z);ce(T,{data:xa,size:e}),V(),r(z);var c=g(z,2),_=n(c);ce(_,{data:ya,size:e}),V(),r(c),d(l,t)}var ot=F('<h2 class="mt_0 mb_lg">Links</h2>'),it=F('<section class="panel p_lg"><!> <!> <div class="box row"><!></div></section>');function lt(l,e){var t=it(),v=n(t);{var u=c=>{var _=B(),q=N(_);D(q,()=>e.children),d(c,_)},a=c=>{var _=ot();d(c,_)};S(v,c=>{e.children?c(u):c(a,!1)})}var y=g(v,2);rt(y,{});var z=g(y,2),T=n(z);nt(T),r(z),r(t),d(l,t)}const vt=l=>l.split("/").filter(e=>e&&e!=="."&&e!==".."),dt=l=>{const e=[],t=vt(l);t.length&&e.push({type:"separator",path:"/"});let v="";for(let u=0;u<t.length;u++){const a=t[u];v+="/"+a,e.push({type:"piece",name:a,path:v}),u!==t.length-1&&e.push({type:"separator",path:v})}return e};var ct=F("<a> </a>"),_t=F('<span class="separator svelte-c9k2g"><!></span>'),ut=F('<div class="breadcrumb svelte-c9k2g"><a><!></a><!></div>');function Oe(l,e){ue(e,!0);const[t,v]=Ae(),u=()=>Ge(Re,"$page",t),a=M(()=>e.base_path??Fa),y=M(()=>e.path??he(u().url.pathname,o(a))),z=M(()=>e.selected_path===null?null:e.selected_path??o(y)),T=M(()=>dt(o(y))),c=M(()=>we(o(a),"/"));var _=ut(),q=n(_);let E;var k=n(q);{var j=h=>{var P=B(),A=N(P);D(A,()=>e.children),d(h,P)},x=h=>{var P=X("•");d(h,P)};S(k,h=>{e.children?h(j):h(x,!1)})}r(q);var C=g(q);ke(C,17,()=>o(T),Me,(h,P)=>{var A=B(),te=N(A);{var Z=I=>{var G=ct();let K;var re=n(G,!0);r(G),L(ie=>{R(G,"href",o(a)+o(P).path),K=ae(G,1,"svelte-c9k2g",null,K,ie),O(re,o(P).name)},[()=>({selected:o(P).path===o(z)})]),d(I,G)},Y=I=>{var G=_t(),K=n(G);{var re=H=>{var Q=B(),ge=N(Q);D(ge,()=>e.separator),d(H,Q)},ie=H=>{var Q=X("/");d(H,Q)};S(K,H=>{e.separator?H(re):H(ie,!1)})}r(G),d(I,G)};S(te,I=>{o(P).type==="piece"?I(Z):I(Y,!1)})}d(h,A)}),r(_),L(h=>{R(q,"href",o(c)),E=ae(q,1,"svelte-c9k2g",null,E,h)},[()=>({selected:o(c)===o(a)+o(z)})]),d(l,_),fe(),v()}var ft=F('<main class="width_md svelte-aa2n4y"><section><header class="box"><h1 class="mt_xl5"> </h1></header> <!></section> <section class="box w_100 mb_lg"><div class="panel p_md width_md"><!></div></section> <!> <section class="box"><!></section> <section class="box mb_lg"><!></section></main>');function yt(l,e){ue(e,!0);const t=ba(me,ja);var v=ft(),u=n(v),a=n(u),y=n(a),z=n(y,!0);r(y),r(a);var T=g(a,2);Oe(T,{children:(h,P)=>{V();var A=X();L(()=>O(A,me.glyph)),d(h,A)},$$slots:{default:!0}}),r(u);var c=g(u,2),_=n(c),q=n(_);at(q,{pkg:t}),r(_),r(c);var E=g(c,2);lt(E,{});var k=g(E,2),j=n(k);qa(j,{pkg:t}),r(k);var x=g(k,2),C=n(x);Oe(C,{children:(h,P)=>{V();var A=X();L(()=>O(A,me.glyph)),d(h,A)},$$slots:{default:!0}}),r(x),r(v),L(()=>O(z,t.repo_name)),d(l,v),fe()}export{yt as component};
