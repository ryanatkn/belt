import{l as se,m as xe,e as re,a as w,n as me,h as K,t as ve}from"./disclose-version.CxFIN6Yi.js";import{Z as q,b as Re,h as H,d as Ee,A as Ae,a3 as he,D as Te,F as oe,k as Z,G as F,g as T,aE as O,B as ke,e as ye,C as Le,x as le,aF as Ge,a2 as Ne,aG as ze,m as Me,l as Se,a5 as Ie,a0 as Oe,X as Pe,aH as X,aI as Q,aJ as ge,aK as De,aL as Be,i as Ze,z as de,aM as Fe,aN as Je,t as G,p as be,a as He,c as R,f as U,s as L,r as E,w as M,T as S,n as J}from"./runtime.ChUF1c7h.js";import{i as Ke,c as ce,d as Ue,n as Ye,b as We,s as qe}from"./render.DMKiWBLy.js";import{i as P,p as Xe}from"./props.GESoSZPA.js";import{h as Qe,s as I}from"./snippet.VpSrbXBZ.js";function $e(n,e){if(e){const t=document.body;n.autofocus=!0,q(()=>{document.activeElement===t&&n.focus()})}}function gn(n,e){return e}function en(n,e,t,i){for(var s=[],u=e.length,o=0;o<u;o++)Ge(e[o].e,s,!0);var l=u>0&&s.length===0&&t!==null;if(l){var g=t.parentNode;Ne(g),g.append(t),i.clear(),V(n,e[0].prev,e[u-1].next)}ze(s,()=>{for(var k=0;k<u;k++){var _=e[k];l||(i.delete(_.k),V(n,_.prev,_.next)),Me(_.e,!l)}})}function nn(n,e,t,i,s,u=null){var o=n,l={flags:e,items:new Map,first:null},g=(e&ge)!==0;if(g){var k=n;o=H?Z(Se(k)):k.appendChild(Ie())}H&&Ee();var _=null,v=!1;Re(()=>{var a=t(),r=Ae(a)?a:a==null?[]:he(a),m=r.length;if(v&&m===0)return;v=m===0;let b=!1;if(H){var h=o.data===Te;h!==(m===0)&&(o=oe(),Z(o),F(!1),b=!0)}if(H){for(var d=null,p,y=0;y<m;y++){if(T.nodeType===8&&T.data===Oe){o=T,b=!0,F(!1);break}var c=r[y],f=i(c,y);p=je(T,l,d,null,c,f,y,s,e),l.items.set(f,p),d=p}m>0&&Z(oe())}if(!H){var C=Pe;tn(r,l,o,s,e,(C.f&O)!==0,i)}u!==null&&(m===0?_?ke(_):_=ye(()=>u(o)):_!==null&&Le(_,()=>{_=null})),b&&F(!0),t()}),H&&(o=T)}function tn(n,e,t,i,s,u,o){var ee,ne,te,ae;var l=(s&De)!==0,g=(s&(X|Q))!==0,k=n.length,_=e.items,v=e.first,a=v,r,m=null,b,h=[],d=[],p,y,c,f;if(l)for(f=0;f<k;f+=1)p=n[f],y=o(p,f),c=_.get(y),c!==void 0&&((ee=c.a)==null||ee.measure(),(b??(b=new Set)).add(c));for(f=0;f<k;f+=1){if(p=n[f],y=o(p,f),c=_.get(y),c===void 0){var C=a?a.e.nodes_start:t;m=je(C,e,m,m===null?e.first:m.next,p,y,f,i,s),_.set(y,m),h=[],d=[],a=m.next;continue}if(g&&an(c,p,f,s),c.e.f&O&&(ke(c.e),l&&((ne=c.a)==null||ne.unfix(),(b??(b=new Set)).delete(c))),c!==a){if(r!==void 0&&r.has(c)){if(h.length<d.length){var x=d[0],j;m=x.prev;var $=h[0],D=h[h.length-1];for(j=0;j<h.length;j+=1)fe(h[j],x,t);for(j=0;j<d.length;j+=1)r.delete(d[j]);V(e,$.prev,D.next),V(e,m,$),V(e,D,x),a=x,m=D,f-=1,h=[],d=[]}else r.delete(c),fe(c,a,t),V(e,c.prev,c.next),V(e,c,m===null?e.first:m.next),V(e,m,c),m=c;continue}for(h=[],d=[];a!==null&&a.k!==y;)(u||!(a.e.f&O))&&(r??(r=new Set)).add(a),d.push(a),a=a.next;if(a===null)continue;c=a}h.push(c),m=c,a=c.next}if(a!==null||r!==void 0){for(var A=r===void 0?[]:he(r);a!==null;)(u||!(a.e.f&O))&&A.push(a),a=a.next;var B=A.length;if(B>0){var Ce=s&ge&&k===0?t:null;if(l){for(f=0;f<B;f+=1)(te=A[f].a)==null||te.measure();for(f=0;f<B;f+=1)(ae=A[f].a)==null||ae.fix()}en(e,A,Ce,_)}}l&&q(()=>{var ie;if(b!==void 0)for(c of b)(ie=c.a)==null||ie.apply()}),le.first=e.first&&e.first.e,le.last=m&&m.e}function an(n,e,t,i){i&X&&se(n.v,e),i&Q?se(n.i,t):n.i=t}function je(n,e,t,i,s,u,o,l,g){var k=(g&X)!==0,_=(g&Be)===0,v=k?_?xe(s):re(s):s,a=g&Q?re(o):o,r={i:a,v,k:u,a:null,e:null,prev:t,next:i};try{return r.e=ye(()=>l(n,v,a),H),r.e.prev=t&&t.e,r.e.next=i&&i.e,t===null?e.first=r:(t.next=r,t.e.next=r.e),i!==null&&(i.prev=r,i.e.prev=r.e),r}finally{}}function fe(n,e,t){for(var i=n.next?n.next.e.nodes_start:t,s=e?e.e.nodes_start:t,u=n.e.nodes_start;u!==i;){var o=Ze(u);s.before(u),u=o}}function V(n,e,t){e===null?n.first=t:(e.next=t,e.e.next=t&&t.e),t!==null&&(t.prev=e,t.e.prev=e&&e.e)}function Y(n,e,t,i){var s=n.__attributes??(n.__attributes={});H&&(s[e]=n.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&n.nodeName==="LINK")||s[e]!==(s[e]=t)&&(e==="style"&&"__styles"in n&&(n.__styles={}),e==="loading"&&(n[Je]=t),t==null?n.removeAttribute(e):typeof t!="string"&&Ve(n).includes(e)?n[e]=t:n.setAttribute(e,t))}function ue(n,e,t,i,s=!1,u=!1,o=!1){var l=e||{},g=n.tagName==="OPTION";for(var k in e)k in t||(t[k]=null);i!==void 0&&(t.class=t.class?t.class+" "+i:i);var _=Ve(n),v=n.__attributes??(n.__attributes={}),a=[];for(const d in t){let p=t[d];if(g&&d==="value"&&p==null){n.value=n.__value="",l[d]=p;continue}var r=l[d];if(p!==r){l[d]=p;var m=d[0]+d[1];if(m!=="$$"){if(m==="on"){const y={},c="$$"+d;let f=d.slice(2);var b=We(f);if(Ke(f)&&(f=f.slice(0,-7),y.capture=!0),!b&&r){if(p!=null)continue;n.removeEventListener(f,l[c],y),l[c]=null}if(p!=null)if(b)n[`__${f}`]=p,Ue([f]);else{let C=function(x){l[d].call(this,x)};e?l[c]=ce(f,n,C,y):a.push([d,p,()=>l[c]=ce(f,n,C,y)])}}else if(d==="style"&&p!=null)n.style.cssText=p+"";else if(d==="autofocus")$e(n,!!p);else if(d==="__value"||d==="value"&&p!=null)n.value=n[d]=n.__value=p;else{var h=d;s||(h=Ye(h)),p==null&&!u?(v[d]=null,n.removeAttribute(d)):_.includes(h)&&(u||typeof p!="string")?n[h]=p:typeof p!="function"&&(H&&(h==="src"||h==="href"||h==="srcset")||Y(n,h,p))}d==="style"&&"__styles"in n&&(n.__styles={})}}}return e||q(()=>{if(n.isConnected)for(const[d,p,y]of a)l[d]===p&&y()}),l}var _e=new Map;function Ve(n){var e=_e.get(n.nodeName);if(e)return e;_e.set(n.nodeName,e=[]);for(var t,i=de(n),s=Element.prototype;s!==i;){t=Fe(i);for(var u in t)t[u].set&&e.push(u);i=de(i)}return e}function bn(n,e){var t=n.__className,i=sn(e);H&&n.className===i?n.__className=i:(t!==i||H&&n.className!==i)&&(e==null?n.removeAttribute("class"):n.className=i,n.__className=i)}function sn(n){return n??""}function rn(n,e,t){if(t){if(n.classList.contains(e))return;n.classList.add(e)}else{if(!n.classList.contains(e))return;n.classList.remove(e)}}function pe(n,e,t,i){var s=n.__styles??(n.__styles={});s[e]!==t&&(s[e]=t,t==null?n.style.removeProperty(e):n.style.setProperty(e,t,""))}const N=(n,e)=>!e||!n.startsWith(e)?n:n.substring(e.length),W=(n,e)=>!e||!n.endsWith(e)?n:n.substring(0,n.length-e.length),we=(n,e)=>n.endsWith(e)?n:n+e,Hn=(n,e)=>{const{name:t}=n,s=(r=>r?W(N(W(r,".git"),"git+"),"/"):null)(n.repository?typeof n.repository=="string"?n.repository:n.repository.url:null);if(!s)throw new Error("failed to parse package_meta - `repo_url` is required in package_json");const u=n.homepage??null,o=!n.private&&!!n.exports&&n.version!=="0.0.1",l=o?"https://www.npmjs.com/package/"+n.name:null,g=o&&s?s+"/blob/main/CHANGELOG.md":null,k=on(t),_=s?N(s,"https://github.com/").split("/")[0]:null,v=u?we(u,"/")+(n.logo?N(n.logo,"/"):"favicon.png"):null,a=n.logo_alt??`logo for ${k}`;return{package_json:n,src_json:e,name:t,repo_name:k,repo_url:s,owner_name:_,homepage_url:u,logo_url:v,logo_alt:a,npm_url:l,changelog_url:g,published:o}},on=n=>n[0]==="@"?n.split("/")[1]:n,ln=n=>W(N(N(n,"https://"),"www."),"/");var dn=me("<path></path>"),cn=me("<svg><!><!></svg>");function fn(n,e){He(e,!0);const t=S(()=>e.fill??e.data.fill??"var(--text_color, #000)"),i=S(()=>e.width??e.size),s=S(()=>e.height??e.size),u=S(()=>{var _,v,a,r;return(_=e.data.attrs)!=null&&_.style&&((v=e.attrs)!=null&&v.style)?we(e.data.attrs.style,";")+" "+e.attrs.style:((a=e.data.attrs)==null?void 0:a.style)??((r=e.attrs)==null?void 0:r.style)});var o=cn();let l;var g=R(o);P(g,()=>e.data.raw,_=>{var v=K(),a=U(v);Qe(a,()=>e.data.raw,!0,!1),w(_,v)});var k=L(g);P(k,()=>e.data.paths,_=>{var v=K(),a=U(v);nn(a,16,()=>e.data.paths,r=>r,(r,m)=>{var b=dn();let h;G(()=>h=ue(b,h,{fill:M(t),...m},"svelte-16ciom8",!0)),w(r,b)}),w(_,v)}),E(o),G(()=>{l=ue(o,l,{viewBox:e.data.viewBox??"0 0 100 100",...e.data.attrs,...e.attrs,"aria-label":e.label??e.data.label,style:M(u),class:e.classes},"svelte-16ciom8",!0),rn(o,"inline",e.inline),pe(o,"width",M(i)),pe(o,"height",M(s))}),w(n,o),be()}const jn={label:"three sleepy z's",fill:"#e55d95",paths:[{d:"m 75.29285,61.962268 1.752156,1.914421 14.843359,1.811307 L 74.065203,86.193332 99.966781,85.408255 98.719988,83.648246 85.143565,82.136577 98.430963,62.887945"},{d:"m 47.636533,44.203704 2.295155,2.48945 25.618425,0.406407 L 45.93783,91.082857 89.425317,93.78003 87.862334,91.36274 61.57861,83.03068 86.244719,42.177019"},{d:"M 0.62464489,0.27405496 3.9721704,4.0993769 50.515703,10.089712 0.04581262,99.957542 68.009395,98.901532 65.391343,95.487941 24.119119,88.067804 66.301842,2.2896897"}]},Vn={label:"a pixelated green oak acorn with a glint of sun",paths:[{fill:"#6f974c",d:"m 24.035592,57.306905 v -14.5 h 16.329497 v 14.25 z"},{fill:"#5e853f",d:"M 43.75,93.75 H 37.5 V 87.5 H 31.25 V 81.25 H 25 V 75 H 18.75 V 62.5 H 12.5 V 50 H 6.25 V 43.75 H 4 v -21 L 22.75,16.5 h 40.5 l 0.5,61.5 -5,-0.75 -0.25,16.5 h -2.25 l -4,2.25 -2.24617,4 H 43.75 Z M 37.5,50 H 31.25 V 43.75 H 25 v 12.5 h 12.5 z"},{fill:"#6f492b",d:"m 50,93.75 h 6.25 V 75 H 62.5 V 50 H 56.25 V 37.5 H 50 V 31.25 H 43.75 V 25 H 31.25 V 18.75 H 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 v -25 H 6.25 V 12.5 h 12.5 V 6.25 H 37.5 V 0 h 25 v 6.25 h 18.75 v 6.25 h 12.5 v 6.25 H 100 v 25 H 93.75 V 50 H 87.5 V 62.5 H 81.25 V 75 H 75 v 6.25 H 68.75 V 87.5 H 62.5 v 6.25 H 56.25 V 100 H 50 Z"},{fill:"#3b730f",d:"m 50,93.75 h 6.25 V 75 H 62.5 V 50 H 56.25 V 37.5 H 50 V 31.25 H 43.75 V 25 H 31.25 V 18.75 H 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 V 25 H 12.5 V 18.75 H 25 V 12.5 H 43.75 V 6.25 h 12.5 V 12.5 H 75 v 6.25 H 87.5 V 25 H 100 V 43.75 H 93.75 V 50 H 87.5 V 62.5 H 81.25 V 75 H 75 v 6.25 H 68.75 V 87.5 H 62.5 v 6.25 H 56.25 V 100 H 50 Z"},{fill:"#473323",d:"M 87.5,37.5 H 81.25 V 31.25 H 68.75 V 25 H 62.5 V 18.75 H 43.75 25 V 25 H 12.5 v 6.25 H 6.25 v 12.5 H 0 V 25 H 12.5 V 18.75 H 25 V 12.5 H 43.75 V 6.25 h 12.5 V 12.5 H 75 v 6.25 H 87.5 V 25 H 100 V 43.75 H 93.75 V 50 H 87.5 Z"},{fill:"#2e6006",d:"M 87.5,37.5 H 81.25 V 31.25 H 68.75 V 25 H 62.5 v -6.25 h -25 V 12.5 H 50 V 6.25 h 6.25 v 6.25 h 12.5 v 6.25 h 12.5 V 25 h 12.5 v 6.25 H 100 v 12.5 H 93.75 V 50 H 87.5 Z"},{fill:"#34251a",d:"M 93.75,31.25 H 87.5 V 25 h 6.25 v 6.25 H 100 v 12.5 H 93.75 Z M 75,18.75 h 6.25 V 25 H 75 Z M 37.5,12.5 H 50 V 6.25 h 6.25 v 6.25 h 12.5 v 6.25 H 53.125 37.5 Z"}]},z={label:"a friendly brown spider facing you",fill:"#84522a",paths:[{d:"M 26.253917,88.532336 29.904106,71.394855 40.667193,53.342811 40.258534,49.99234 38.417407,49.000991 22.876908,50.369035 9.4865496,53.880193 2.3019024,57.978424 0.42708056,57.27994 7.2642726,51.086985 20.811326,45.373351 37.960128,42.356792 39.354818,40.107008 38.229925,38.149883 26.030989,27.105568 14.46539,21.861786 8.0479986,18.615387 l -0.41428,-1.710463 8.2789464,1.499862 13.012873,5.003724 13.447448,10.696856 1.680801,-0.729547 0.222439,-1.343157 -3.983998,-12.128053 -5.730215,-9.573597 -0.823624,-5.1744052 1.16944,-1.165102 2.604334,6.3355162 6.612025,7.08777 4.874534,11.55989 2.800804,0.515574 4.48815,-1.359246 1.521623,-8.687062 5.685014,-8.620764 2.75965,-6.8316782 1.094578,1.128569 -1.293029,5.4222362 -4.084776,11.06803 -0.484994,8.377408 0.194311,1.192896 1.42954,1.700726 11.563936,-10.644623 9.878262,-8.331535 8.732915,-3.390708 -0.387305,1.402757 -5.294686,3.023816 -10.445054,10.705792 -9.561599,13.627899 -0.438945,1.602755 1.001398,1.666754 17.376932,3.986302 9.537375,6.940531 4.325785,4.636405 0.211208,1.557106 -6.15842,-4.279925 -10.413771,-5.155697 -15.838715,-1.696223 -0.83461,1.144484 0.774499,2.593247 9.737644,16.194355 3.925704,17.214082 0.07146,10.277289 -1.706242,1.13628 -2.009721,-9.21637 -5.894265,-16.88027 -12.292087,-17.295813 -4.177778,-0.585888 -7.294671,2.935716 -11.138052,16.645915 -6.462422,17.752509 -1.634756,7.206641 -2.070766,-1.52923 z"}]},wn={label:"a fuzzy tuft of green moss",fill:"#3db33d",paths:z.paths,attrs:{style:"transform: scaleX(-1) rotate(180deg)"}},Cn={label:"a green sauropod wearing a brown belt",paths:[{fill:"#5e853f",d:"M 18.067186,15.969407 C 21.788999,13.893836 17.949371,0.38957847 10.927436,0.04361599 4.8719565,-0.25473037 1.7349173,7.4851976 0.94704854,15.249287 c -0.92008807,9.06705 -1.79155525,17.669932 0.59969726,28.291532 2.4805689,12.269719 7.0800447,23.952702 13.1393162,34.8823 6.000724,10.5946 6.775015,20.816886 4.701503,21.478748 -0.03241,0.01035 -0.07998,0.06265 0.04147,0.06596 1.294211,0.03532 10.640814,0.04592 10.677563,-0.05295 0.485896,-1.307172 -3.047914,-6.728008 -1.423246,-8.607633 1.949043,-2.254904 17.430713,0.186565 21.929,0.285178 9.05576,0.198523 17.000796,-1.770745 18.230176,-0.990103 1.997906,1.268647 0.07692,8.622864 -1.734662,9.31776 -0.123669,0.04744 -0.0605,0.05786 8.7e-5,0.05776 1.355848,-0.0022 8.671284,0.02064 9.113066,-0.03424 1.109966,-0.137881 1.121155,-9.535235 1.329075,-10.418319 C 77.607043,89.2834 96.053852,85.109995 99.112049,70.368973 103.63141,48.584901 86.877032,39.05263 85.950278,39.29966 83.317032,40.001563 101.56057,48.396651 91.102193,67.902384 88.018737,73.653284 77.350057,79.523245 75.685258,79.119008 73.64059,78.622534 65.09671,63.091297 52.400901,65.836332 43.234666,67.818217 41.919113,72.011159 30.91062,71.457371 23.396234,71.079356 15.879493,62.020499 10.825044,44.977744 8.7853926,38.10038 7.9304392,31.282385 7.7195376,25.924892 7.3556266,16.68053 7.7329856,12.199716 7.7329856,12.199716 c 0,0 7.0326794,5.610875 10.3342004,3.769691 z"},{fill:"#6f492b",d:"m 51.811124,91.579144 c -0.338516,0.300927 1.649325,0.223227 1.91566,0.125562 10.084215,-3.697658 13.756737,-6.313605 15.083689,-19.379753 0.213532,-2.102603 -6.814409,-6.279564 -6.854038,-5.131405 -0.399472,11.573929 -1.610604,16.392773 -10.086139,24.32687"},{fill:"#34251a",d:"m 57.712693,87.945562 c 0,0 1.995464,1.865412 2.68268,1.964956 0.765874,0.110938 4.011805,-1.572536 4.056136,-2.519526 0.05138,-1.097583 -3.559853,-3.060285 -3.559853,-3.060285"},{fill:"#34251a",d:"m 61.598583,82.940048 c 0,0 3.423751,3.095396 4.286346,2.851789 0.676123,-0.190945 2.567214,-3.369081 2.28239,-4.177499 -0.333199,-0.945723 -5.337842,-1.790867 -5.337842,-1.790867"},{fill:"#34251a",d:"m 63.187415,78.383306 c 0,0 4.923745,1.759016 5.668289,1.154079 0.551751,-0.448294 1.380932,-3.505132 1.032166,-4.129317 -0.767431,-1.37347 -5.791186,-3.388548 -5.791186,-3.388548"}]};z.paths;z.paths;z.paths;z.paths;const xn={label:"a friendly orange pixelated spider facing you",fill:"#f4672f",paths:[{d:"m 25,81.200002 h 6.2 v -12.5 h 6.3 v -18.7 h -6.3 v 6.2 H 12.5 v 6.3 H 0 v -6.3 h 6.2 v -6.2 H 25 v -6.3 h 12.5 v -6.2 h -6.3 v -6.3 H 18.7 v -6.2 H 6.2 v -6.3 H 25 v 6.3 h 12.5 v -6.3 H 31.2 V 6.2 h 6.3 v 6.300002 h 6.2 V 31.200001 H 56.2 V 12.500002 h 6.3 V 6.2 h 6.2 v 12.500001 h -6.2 v 18.800001 h 6.2 v -12.5 h 12.5 v -12.5 h 12.5 v 6.2 h -6.2 v 12.5 H 75 v 12.5 h 6.2 v 6.3 h 12.5 v 6.2 h 6.299997 v 6.3 H 87.5 v -6.3 H 75 v -6.2 h -6.3 v 12.5 H 75 v 12.5 h 6.2 V 99.99999 H 75 V 81.200002 h -6.3 v -12.5 h -6.2 v -12.5 H 43.7 v 18.8 h -6.2 v 12.5 H 31.2 V 99.99999 H 25 Z"}]},un={label:"the GitHub logo, an octocat silhouette",paths:[{d:"M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z","fill-rule":"evenodd","clip-rule":"evenodd",transform:"scale(64)"}],viewBox:"0 0 1024 1024"};var _n=ve('<div class="root_url svelte-cs8o0f"><a> </a></div>'),pn=ve('<footer class="box"><!> <div class="logo box panel p_lg shadow_inset_xs svelte-cs8o0f"><!> <a rel="me" title="source code on GitHub" class="svelte-cs8o0f"><!></a> <!></div> <!></footer>');function Rn(n,e){He(e,!0);const t=Xe(e,"root_url",3,null);var i=pn(),s=R(i);I(s,()=>e.children??J);var u=L(s,2),o=R(u);I(o,()=>e.logo_header??J);var l=L(o,2),g=R(l);P(g,()=>e.logo,v=>{var a=K(),r=U(a);I(r,()=>e.logo),w(v,a)},v=>{fn(v,{data:un,size:"var(--icon_size_lg)"})}),E(l);var k=L(l,2);I(k,()=>e.logo_footer??J),E(u);var _=L(u,2);P(_,t,v=>{var a=_n(),r=R(a),m=R(r,!0);G(()=>qe(m,ln(t()))),E(r),E(a),G(()=>Y(r,"href",t())),w(v,a)}),E(i),G(()=>Y(l,"href",e.pkg.repo_url)),w(n,i),be()}const En={name:"@ryanatkn/belt",version:"0.27.6",description:"utility belt for JS",glyph:"🦕",logo:"logo.svg",logo_alt:"a green sauropod wearing a brown utility belt",motto:"ancient not extinct",public:!0,license:"MIT",homepage:"https://belt.ryanatkn.com/",author:{name:"Ryan Atkinson",email:"mail@ryanatkn.com",url:"https://www.ryanatkn.com/"},repository:{type:"git",url:"git+https://github.com/ryanatkn/belt.git"},bugs:"https://github.com/ryanatkn/belt/issues",funding:"https://www.ryanatkn.com/funding",scripts:{start:"gro dev",dev:"gro dev",build:"gro build",check:"gro check",test:"gro test",preview:"vite preview",deploy:"gro deploy",benchmark:"gro run src/benchmarks/slugify_benchmark.ts"},type:"module",engines:{node:">=20.17"},keywords:["js","typescript","utilities","web"],peerDependencies:{"@types/node":"^22.7.4","esm-env":"^1.1.4"},peerDependenciesMeta:{"@types/node":{optional:!0},"esm-env":{optional:!0}},devDependencies:{"@changesets/changelog-git":"^0.2.0","@ryanatkn/eslint-config":"^0.5.6","@ryanatkn/fuz":"^0.130.3","@ryanatkn/gro":"^0.146.2","@ryanatkn/moss":"^0.20.2","@sveltejs/adapter-static":"^3.0.6","@sveltejs/kit":"^2.8.0","@sveltejs/package":"^2.3.7","@sveltejs/vite-plugin-svelte":"^4.0.0","@types/node":"^22.9.0",eslint:"^9.14.0","eslint-plugin-svelte":"^2.46.0",prettier:"^3.3.3","prettier-plugin-svelte":"^3.2.7",svelte:"^5.1.12","svelte-check":"^4.0.6",tinybench:"^3.0.3",tslib:"^2.8.1",typescript:"^5.6.3","typescript-eslint":"^8.13.0",uvu:"^0.5.6"},prettier:{plugins:["prettier-plugin-svelte"],useTabs:!0,printWidth:100,singleQuote:!0,bracketSpacing:!1,overrides:[{files:"package.json",options:{useTabs:!1}}]},sideEffects:["**/*.css"],files:["dist","src/lib/**/*.ts","!src/lib/**/*.test.*","!dist/**/*.test.*"],exports:{"./package.json":"./package.json","./array.js":{types:"./dist/array.d.ts",default:"./dist/array.js"},"./async.js":{types:"./dist/async.d.ts",default:"./dist/async.js"},"./colors.js":{types:"./dist/colors.d.ts",default:"./dist/colors.js"},"./counter.js":{types:"./dist/counter.d.ts",default:"./dist/counter.js"},"./dom.js":{types:"./dist/dom.d.ts",default:"./dist/dom.js"},"./error.js":{types:"./dist/error.d.ts",default:"./dist/error.js"},"./fetch.js":{types:"./dist/fetch.d.ts",default:"./dist/fetch.js"},"./function.js":{types:"./dist/function.d.ts",default:"./dist/function.js"},"./id.js":{types:"./dist/id.d.ts",default:"./dist/id.js"},"./iterator.js":{types:"./dist/iterator.d.ts",default:"./dist/iterator.js"},"./json.js":{types:"./dist/json.d.ts",default:"./dist/json.js"},"./log.js":{types:"./dist/log.d.ts",default:"./dist/log.js"},"./map.js":{types:"./dist/map.d.ts",default:"./dist/map.js"},"./maths.js":{types:"./dist/maths.d.ts",default:"./dist/maths.js"},"./object.js":{types:"./dist/object.d.ts",default:"./dist/object.js"},"./path.js":{types:"./dist/path.d.ts",default:"./dist/path.js"},"./print.js":{types:"./dist/print.d.ts",default:"./dist/print.js"},"./process.js":{types:"./dist/process.d.ts",default:"./dist/process.js"},"./random_alea.js":{types:"./dist/random_alea.d.ts",default:"./dist/random_alea.js"},"./random.js":{types:"./dist/random.d.ts",default:"./dist/random.js"},"./regexp.js":{types:"./dist/regexp.d.ts",default:"./dist/regexp.js"},"./result.js":{types:"./dist/result.d.ts",default:"./dist/result.js"},"./string.js":{types:"./dist/string.d.ts",default:"./dist/string.js"},"./throttle.js":{types:"./dist/throttle.d.ts",default:"./dist/throttle.js"},"./timings.js":{types:"./dist/timings.d.ts",default:"./dist/timings.js"},"./types.js":{types:"./dist/types.d.ts",default:"./dist/types.js"},"./url.js":{types:"./dist/url.d.ts",default:"./dist/url.js"}}},An={name:"@ryanatkn/belt",version:"0.27.6",modules:{"./package.json":{path:"package.json",declarations:[]},"./array.js":{path:"array.ts",declarations:[{name:"EMPTY_ARRAY",kind:"variable"},{name:"to_array",kind:"function"},{name:"remove_unordered",kind:"function"},{name:"to_next",kind:"function"}]},"./async.js":{path:"async.ts",declarations:[{name:"Async_Status",kind:"type"},{name:"wait",kind:"function"},{name:"is_promise",kind:"function"},{name:"Deferred",kind:"type"},{name:"create_deferred",kind:"function"}]},"./colors.js":{path:"colors.ts",declarations:[{name:"Hsl",kind:"type"},{name:"Hue",kind:"type"},{name:"Saturation",kind:"type"},{name:"Lightness",kind:"type"},{name:"Rgb",kind:"type"},{name:"Red",kind:"type"},{name:"Green",kind:"type"},{name:"Blue",kind:"type"},{name:"rgb_to_hex",kind:"function"},{name:"hex_to_rgb",kind:"function"},{name:"hex_string_to_rgb",kind:"function"},{name:"rgb_to_hex_string",kind:"function"},{name:"to_hex_component",kind:"function"},{name:"rgb_to_hsl",kind:"function"},{name:"hsl_to_rgb",kind:"function"},{name:"hue_to_rgb_component",kind:"function"},{name:"hsl_to_hex",kind:"function"},{name:"hsl_to_hex_string",kind:"function"},{name:"hsl_to_string",kind:"function"},{name:"hex_string_to_hsl",kind:"function"},{name:"parse_hsl_string",kind:"function"}]},"./counter.js":{path:"counter.ts",declarations:[{name:"Counter",kind:"type"},{name:"Create_Counter",kind:"type"},{name:"create_counter",kind:"function"}]},"./dom.js":{path:"dom.ts",declarations:[{name:"is_editable",kind:"function"},{name:"inside_editable",kind:"function"},{name:"swallow",kind:"function"},{name:"handle_target_value",kind:"function"},{name:"is_iframed",kind:"function"}]},"./error.js":{path:"error.ts",declarations:[{name:"Unreachable_Error",kind:"class"},{name:"unreachable",kind:"function"}]},"./fetch.js":{path:"fetch.ts",declarations:[{name:"Fetch_Value_Options",kind:"type"},{name:"fetch_value",kind:"function"},{name:"Fetch_Value_Cache_Key",kind:"variable"},{name:"Fetch_Value_Cache_Item",kind:"variable"},{name:"Fetch_Value_Cache",kind:"variable"},{name:"to_fetch_value_cache_key",kind:"function"},{name:"serialize_cache",kind:"function"},{name:"deserialize_cache",kind:"function"}]},"./function.js":{path:"function.ts",declarations:[{name:"noop",kind:"function"},{name:"noop_async",kind:"function"},{name:"resolved",kind:"variable"},{name:"identity",kind:"function"},{name:"Lazy",kind:"type"},{name:"lazy",kind:"function"}]},"./id.js":{path:"id.ts",declarations:[{name:"Uuid",kind:"type"},{name:"is_uuid",kind:"function"},{name:"UUID_MATCHER",kind:"variable"},{name:"Client_Id_Creator",kind:"type"},{name:"create_client_id_creator",kind:"function"}]},"./iterator.js":{path:"iterator.ts",declarations:[{name:"count_iterator",kind:"function"}]},"./json.js":{path:"json.ts",declarations:[{name:"Json",kind:"type"},{name:"Json_Primitive",kind:"type"},{name:"Json_Object",kind:"type"},{name:"Json_Array",kind:"type"},{name:"Json_Type",kind:"type"},{name:"to_json_type",kind:"function"},{name:"canonicalize",kind:"function"},{name:"embed_json",kind:"function"}]},"./log.js":{path:"log.ts",declarations:[{name:"Log_Level",kind:"type"},{name:"to_log_level_value",kind:"function"},{name:"configure_log_level",kind:"function"},{name:"configure_log_colors",kind:"function"},{name:"Log",kind:"type"},{name:"Logger_State",kind:"type"},{name:"Logger_Prefixes_And_Suffixes_Getter",kind:"type"},{name:"Base_Logger",kind:"class"},{name:"Logger",kind:"class"},{name:"System_Logger",kind:"class"}]},"./map.js":{path:"map.ts",declarations:[{name:"sort_map",kind:"function"},{name:"compare_simple_map_entries",kind:"function"}]},"./maths.js":{path:"maths.ts",declarations:[{name:"clamp",kind:"function"},{name:"lerp",kind:"function"},{name:"round",kind:"function"},{name:"GR",kind:"variable"},{name:"GR_i",kind:"variable"},{name:"GR_2",kind:"variable"},{name:"GR_2i",kind:"variable"},{name:"GR_3",kind:"variable"},{name:"GR_3i",kind:"variable"},{name:"GR_4",kind:"variable"},{name:"GR_4i",kind:"variable"},{name:"GR_5",kind:"variable"},{name:"GR_5i",kind:"variable"},{name:"GR_6",kind:"variable"},{name:"GR_6i",kind:"variable"},{name:"GR_7",kind:"variable"},{name:"GR_7i",kind:"variable"},{name:"GR_8",kind:"variable"},{name:"GR_8i",kind:"variable"},{name:"GR_9",kind:"variable"},{name:"GR_9i",kind:"variable"}]},"./object.js":{path:"object.ts",declarations:[{name:"is_plain_object",kind:"function"},{name:"map_record",kind:"function"},{name:"omit",kind:"function"},{name:"pick_by",kind:"function"},{name:"omit_undefined",kind:"function"},{name:"reorder",kind:"function"},{name:"EMPTY_OBJECT",kind:"variable"},{name:"traverse",kind:"function"}]},"./path.js":{path:"path.ts",declarations:[{name:"parse_path_parts",kind:"function"},{name:"parse_path_segments",kind:"function"},{name:"parse_path_pieces",kind:"function"},{name:"Path_Piece",kind:"type"},{name:"slugify",kind:"function"}]},"./print.js":{path:"print.ts",declarations:[{name:"st",kind:"function"},{name:"enable_colors",kind:"function"},{name:"disable_colors",kind:"function"},{name:"print_key_value",kind:"function"},{name:"print_ms",kind:"function"},{name:"print_number_with_separators",kind:"function"},{name:"print_string",kind:"function"},{name:"print_number",kind:"function"},{name:"print_boolean",kind:"function"},{name:"print_value",kind:"function"},{name:"print_error",kind:"function"},{name:"print_timing",kind:"function"},{name:"print_timings",kind:"function"},{name:"print_log_label",kind:"function"}]},"./process.js":{path:"process.ts",declarations:[{name:"Spawned_Process",kind:"type"},{name:"Spawned",kind:"type"},{name:"Spawn_Result",kind:"type"},{name:"spawn",kind:"function"},{name:"Spawned_Out",kind:"type"},{name:"spawn_out",kind:"function"},{name:"spawn_process",kind:"function"},{name:"print_child_process",kind:"function"},{name:"global_spawn",kind:"variable"},{name:"register_global_spawn",kind:"function"},{name:"despawn",kind:"function"},{name:"despawn_all",kind:"function"},{name:"attach_process_error_handlers",kind:"function"},{name:"print_spawn_result",kind:"function"},{name:"Restartable_Process",kind:"type"},{name:"spawn_restartable_process",kind:"function"}]},"./random_alea.js":{path:"random_alea.ts",declarations:[{name:"Alea",kind:"type"},{name:"create_random_alea",kind:"function"},{name:"masher",kind:"function"}]},"./random.js":{path:"random.ts",declarations:[{name:"random_float",kind:"function"},{name:"random_int",kind:"function"},{name:"random_boolean",kind:"function"},{name:"random_item",kind:"function"},{name:"shuffle",kind:"function"}]},"./regexp.js":{path:"regexp.ts",declarations:[{name:"escape_regexp",kind:"function"}]},"./result.js":{path:"result.ts",declarations:[{name:"Result",kind:"type"},{name:"OK",kind:"variable"},{name:"NOT_OK",kind:"variable"},{name:"unwrap",kind:"function"},{name:"Result_Error",kind:"class"},{name:"unwrap_error",kind:"function"}]},"./string.js":{path:"string.ts",declarations:[{name:"truncate",kind:"function"},{name:"strip_start",kind:"function"},{name:"strip_end",kind:"function"},{name:"strip_after",kind:"function"},{name:"strip_before",kind:"function"},{name:"ensure_start",kind:"function"},{name:"ensure_end",kind:"function"},{name:"deindent",kind:"function"},{name:"plural",kind:"function"},{name:"count_graphemes",kind:"function"},{name:"strip_ansi",kind:"function"}]},"./throttle.js":{path:"throttle.ts",declarations:[{name:"Throttle_Options",kind:"type"},{name:"throttle",kind:"function"}]},"./timings.js":{path:"timings.ts",declarations:[{name:"Stopwatch",kind:"type"},{name:"create_stopwatch",kind:"function"},{name:"Timings_Key",kind:"type"},{name:"Timings",kind:"class"}]},"./types.js":{path:"types.ts",declarations:[{name:"Omit_Strict",kind:"type"},{name:"Pick_Union",kind:"type"},{name:"Keyof_Union",kind:"type"},{name:"Partial_Except",kind:"type"},{name:"Partial_Only",kind:"type"},{name:"Partial_Values",kind:"type"},{name:"Assignable",kind:"type"},{name:"Defined",kind:"type"},{name:"Not_Null",kind:"type"},{name:"Array_Element",kind:"type"},{name:"Flavored",kind:"type"},{name:"Flavor",kind:"type"},{name:"Branded",kind:"type"},{name:"Brand",kind:"type"}]},"./url.js":{path:"url.ts",declarations:[{name:"format_url",kind:"function"}]}}};export{Rn as L,fn as S,pe as a,ue as b,An as c,En as d,Cn as e,ln as f,nn as g,we as h,gn as i,bn as j,N as k,W as l,wn as m,z as n,Vn as o,Hn as p,xn as q,Y as s,rn as t,jn as z};