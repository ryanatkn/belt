import{a7 as c,b as E,a8 as w,h as i,w as b,g as m,z as p,s as v,f as r,j as _,a9 as N,_ as T,aa as x,ab as A,d as C}from"./6wudGlqZ.js";let n;function D(){n=void 0}function F(a){let t=null,e=i;var f;if(i){for(t=r,n===void 0&&(n=_(document.head));n!==null&&(n.nodeType!==8||n.data!==b);)n=m(n);n===null?p(!1):n=v(m(n))}i||(f=document.head.appendChild(c()));try{E(()=>a(f),w)}finally{e&&(p(!0),n=r,v(t))}}function y(a){var t=document.createElement("template");return t.innerHTML=a,t.content}function s(a,t){var e=T;e.nodes_start===null&&(e.nodes_start=a,e.nodes_end=t)}function I(a,t){var e=(t&x)!==0,f=(t&A)!==0,d,u=!a.startsWith("<!>");return()=>{if(i)return s(r,null),r;d===void 0&&(d=y(u?a:"<!>"+a),e||(d=_(d)));var o=f||N?document.importNode(d,!0):d.cloneNode(!0);if(e){var h=_(o),l=o.lastChild;s(h,l)}else s(o,o);return o}}function L(a,t,e="svg"){var f=!a.startsWith("<!>"),d=`<${e}>${f?a:"<!>"+a}</${e}>`,u;return()=>{if(i)return s(r,null),r;if(!u){var o=y(d),h=_(o);u=_(h)}var l=u.cloneNode(!0);return s(l,l),l}}function O(a=""){if(!i){var t=c(a+"");return s(t,t),t}var e=r;return e.nodeType!==3&&(e.before(e=c()),v(e)),s(e,e),e}function P(){if(i)return s(r,null),r;var a=document.createDocumentFragment(),t=document.createComment(""),e=c();return a.append(t,e),s(t,e),a}function S(a,t){if(i){T.nodes_end=r,C();return}a!==null&&a.before(t)}const M="5";var g;typeof window<"u"&&((g=window.__svelte??(window.__svelte={})).v??(g.v=new Set)).add(M);export{s as a,S as b,y as c,P as d,O as e,F as h,L as n,D as r,I as t};
