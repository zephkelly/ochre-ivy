import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css     */import{d as Y,f as A,a as ne}from"./helperFunctions.js";const I=document.querySelector(".navbar"),r=document.querySelector(".nav-menu"),le=document.querySelector(".nav-text"),f=document.querySelector(".nav-text-spacer");let de=!1;const z=document.querySelector(".nav-menu-btn"),F=document.querySelector(".nav-btn-bg"),$e=document.querySelector(".navbar .nav-list"),H=document.getElementById("notification");let ue=!1;window.addEventListener("load",()=>{f&&(de=!0),Ae(),I.style.transition="all 0.3s ease-in-out",screen.width<=982&&(r.style.display="none"),H&&(ue=!0,H.style.left="2rem",Y(4500).then(()=>{H.style.opacity="0",Y(300).then(()=>{H.remove()})}))});window.addEventListener("resize",()=>{E==!0&&(E=!1,J()),screen.width<=982?r.style.display="none":r.style.display=""});let E=!1;z.addEventListener("click",()=>{E=!E,J()});document.addEventListener("click",e=>{Te(e)});document.addEventListener("scroll",e=>{Te(e)});function Te(e=null){E&&(e!=null?e.target!=r&&e.target!=z&&e.target!=F&&e.target!=$e&&(E=!1,J()):(E=!1,J()))}function J(){E?(r.style.display="block",r.style.boxShadow="0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)",r.style.opacity="1",F.style.backgroundColor="white",F.style.boxShadow="rgba(0, 0, 0, 0.2) 0rem -1.2rem 3rem 0rem"):(r.style.opacity="0",r.style.boxShadow="",F.style.backgroundColor="transparent",F.style.boxShadow="",Y(150).then(()=>{r.style.display="",r.style.opacity=""}))}let V=!1,Le=0;function Ae(){Y(100).then(()=>Le=document.documentElement.scrollTop).then(()=>{if(Le>20){if(V)return;e("0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.05)","3.8rem","1.4rem","1.8rem",!0),ue&&(H.style.top="5.5rem")}else{if(!V)return;e("","","","",!1),ue&&(H.style.top="")}function e(t,n,i,l,ie){if(I.style.boxShadow=t,I.style.height=n,le.style.fontSize=i,z.style.fontSize=l,V=ie,V){if(I.style.backgroundColor="white",le.style.marginBottom="0",z.style.top="0.5rem",r.style.top="4.2rem",r.style.borderRadius="0 0 0.5rem 0.5rem",!de)return;f.style.opacity="0",f.style.bottom="-0.5rem",f.style.left="0.5rem",f.style.height="0"}else{if(I.style.backgroundColor="#f8c6b7",le.style.marginBottom="",z.style.top="",r.style.top="7rem",r.style.borderRadius="",!de)return;f.style.opacity="",f.style.bottom="",f.style.left="",f.style.height=""}}})}const W=document.querySelectorAll("#recipes-box .recipe-post");window.addEventListener("scroll",()=>{Ae()});window.addEventListener("load",()=>{xe()});window.addEventListener("resize",()=>{xe()});const D={width:200};function xe(){if(window.innerWidth<630){if(D.width===630)return;D.width=630;for(let e=3;e<W.length;e++)W[e].classList.add("hidden")}else if(window.innerWidth<980){if(D.width===980)return;D.width=980;for(let e=4;e<W.length;e++)W[e].classList.add("hidden")}else{if(D.width===1e3)return;D.width=1e3;for(let e=0;e<W.length;e++)W[e].classList.remove("hidden")}}const re=document.querySelector(".blog-desc");if(re!=null){const e=re.innerHTML;re.innerHTML=A(e,150)}const O=document.querySelectorAll(".recipe-desc");if(O!=null)for(let e=0;e<O.length;e++){const t=O[e].innerHTML;O[e].innerHTML=A(t,250)}const G=document.querySelectorAll(".blog-date");if(G!=null)for(let e=0;e<G.length;e++){const t=G[e].innerHTML;G[e].innerHTML=ne(t,!0)}let fe=null;const v=document.querySelector(".search-input");let Se="",s="";const U=document.querySelector(".filter-button.all"),ge=document.querySelector(".filter-button.recipes"),me=document.querySelector(".filter-button.newest"),we=document.querySelector(".filter-button.oldest"),ye=document.querySelector(".filter-button.az"),Ee=[U,ge,me,we,ye],R=document.querySelector(".blogs-home-nav"),u=document.querySelector(".blog-nav-title"),K=document.querySelector(".blog-nav-home"),Q=document.querySelector(".blog-nav-all"),d=document.querySelector(".blogs-header-bgBox"),X=document.querySelector(".faux-page-home"),Z=document.querySelector(".faux-page-all"),c=document.querySelectorAll(".featured-blog"),C=document.querySelectorAll(".featured-blog-link"),pe=document.querySelector("#blogs-all .section-container"),he=document.querySelector("#blogs-more .more-button"),Be=document.querySelector("#footer-main .container");let _=document.querySelectorAll(".recent-blog-title"),h=document.querySelectorAll(".blog-description"),L=document.querySelectorAll(".blog-description.all"),B=document.querySelectorAll(".blog-description.recipe"),S=document.querySelectorAll(".blog-subtitle"),$=document.querySelectorAll(".blog-subtitle.all"),se=document.querySelectorAll(".blog-date");window.addEventListener("load",async()=>{fe=new URLSearchParams(window.location.search);const e=window.location.pathname;e.includes("/blog")&&!e.includes("/blog/")&&Ie()});let x=c.length-1,a=0,be="home";function Ie(){ze(),Fe(),Pe(),He(),ve(),te("#blogs-recipes .recipe-blog",3,4),te("#blogs-recent .recent-blog",4,5)}async function Fe(){const e=fe.get("section"),t=fe.get("filter");if(e==="all"){if(s=v.value,s.length>0&&(await T("&search="+s),P()),t!==null||t!==void 0||t!=="none"||t!=="")switch(P(),t){case"all":q(U);break;case"recipe":q(ge);break;case"newest":q(me);break;case"oldest":q(we);break;case"alphabetical":q(ye);break}await T(""),We()}else ke();await Ne(),N()}function ze(){Ee.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("active")||(new URLSearchParams(window.location.search).delete("page"),q(e))})}),window.addEventListener("resize",async()=>{He(),Pe(),te("#blogs-recipes .recipe-blog",3,4),te("#blogs-recent .recent-blog",4,5),N()}),K.addEventListener("click",()=>{K.classList.contains("active")||(ke(),N())}),Q.addEventListener("click",()=>{Q.classList.contains("active")||(q(U),We(),N())}),C.forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("active"))return;const t=Array.from(C).indexOf(e);t>c.length-1||(x=a,a=t,C[x].classList.remove("active"),c[x].style.opacity="0",c[a].style.display="flex",C[a].classList.add("active"),setTimeout(()=>{c[x].style.display="none"},500),setTimeout(()=>{c[a].style.opacity="1"},5),clearInterval(ee),ee=setInterval(ve,1e4))})}),v.addEventListener("focus",()=>{s=v.value,s!==Se&&(P(),T("&search="+s))}),v.addEventListener("keydown",e=>{if(s=v.value,e.key==="Enter"){if(s===Se)return;P(),T("&search="+s)}}),v.addEventListener("input",()=>{if(s=v.value,s==""){T(""),q(U);return}P(),T("&search="+s)}),he.addEventListener("click",()=>{const e=new URLSearchParams(window.location.search),t=e.get("section");let n=e.get("page");n||(n="1");const i=e.get("filter");let l="section="+t+"&filter="+i;n&&T(l,parseInt(n)+1)})}function N(){Ge(),De(),Ye(),Me(),Je(),Oe()}function Pe(){window.innerWidth<460||window.innerWidth<630?(u.style.paddingLeft="0rem",R.style.paddingLeft="0rem"):be==="home"?(u.style.paddingLeft="1.75rem",R.style.paddingLeft="0rem"):(u.style.paddingLeft="0rem",R.style.paddingLeft="0rem")}function Ne(){for(let e=0;e<se.length;e++){const t=se[e].getAttribute("data-date"),n=ne(t,!0);se[e].innerText=n}for(let e=0;e<h.length;e++){const t=h[e].getAttribute("data-description"),n=A(t,ce());h[e].innerText=n}for(let e=0;e<B.length;e++){const t=B[e].getAttribute("data-description"),n=A(t,ce());B[e].innerText=n}for(let e=0;e<L.length;e++){const t=L[e].getAttribute("data-description");L[e].innerText=A(t,ce())}for(let e=0;e<S.length;e++){const t=S[e].getAttribute("data-subtitle"),n=A(t,Ue());S[e].innerText=n}}function ce(){return window.innerWidth<630?180:400}function Ue(){return window.innerWidth<630?64:100}function ke(){const e=new URLSearchParams(window.location.search);e.delete("section"),e.delete("filter"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),ee=setInterval(ve,6500),be="home",t(),v.value="",s="",pe.innerHTML="",P(),K.classList.add("active"),Q.classList.remove("active"),d.style.transform="rotate(-8deg)",d.style.position="absolute",d.style.top="",d.style.height="",d.style.borderRadius="",Be.style.borderTop="none",u.style.marginLeft="",Z.classList.remove("active"),setTimeout(()=>{Z.style.display="none",X.style.display="block",setTimeout(()=>{X.classList.add("active")},5)},150);function t(){window.innerWidth<630?(u.style.paddingLeft="0rem",R.style.paddingLeft=""):u.style.paddingLeft="1.75rem"}}function We(){const e=new URLSearchParams(window.location.search);e.set("section","all"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),be="all",ee=null,t(),K.classList.remove("active"),Q.classList.add("active"),d.style.transform="rotate(0deg)",d.style.position="fixed",d.style.top="0rem",d.style.height="120vh",d.style.borderRadius="0rem",Be.style.borderTop="2px solid var(--dark)",u.style.paddingLeft="0rem",X.classList.remove("active"),setTimeout(()=>{X.style.display="none",Z.style.display="block",setTimeout(()=>{Z.classList.add("active")},5)},150);function t(){window.innerWidth<630?(R.style.paddingLeft="",u.style.marginLeft="0rem"):u.style.marginLeft="-0.2rem"}}let ee=null;function ve(){x=a,C[x].classList.remove("active"),c[x].style.opacity="0",setTimeout(()=>{c[x].style.display="none"},500),a=(a+1)%c.length,setTimeout(()=>{c[a].style.opacity="1"},5),c[a].style.display="flex",C[a].classList.add("active")}function q(e){P(),e.classList.add("active");const t=new URLSearchParams(window.location.search);function n(){return e===U?"none":e===ge?"recipe":e===me?"newest":e===we?"oldest":e===ye?"alphabetical":(console.log("Cant find filter"),"none")}const i=n();t.set("filter",i),window.history.replaceState({},"",`${window.location.pathname}?${t}`),T("&filter="+i)}function P(){Ee.forEach(e=>{e.classList.remove("active")})}function qe(){pe.innerHTML=""}function je(e){e.length%10===0&&e.length>0?he.style.display="flex":he.style.display="none"}function Ve(e){for(let n=0;n<e.length;n++)pe.innerHTML+=`
    <div class="all-blog">
      <div class="cover-img">
        <img src="${e[n].cover}" alt="${e[n].title}" class="recipe-image">
      </div>
      <div class="content">
        <div class="wrapper">
          <h3 class="blog-title">${e[n].title}</h3>
          <h6 class="blog-subtitle all" data-subtitle="${e[n].subtitle}"></h6>
          <p class="blog-date all" data-date="${e[n].createdDate}"></p>
        </div>
        <div class="wrapper">
          <p class="blog-description all" data-description="${e[n].description}"></p>
          <a href="/blog/${e[n].uri}" class="blog-link-all accent-button button-outlined-accent">Read</a>
        </div>
      </div>
    </div>
  `;document.querySelectorAll(".blog-date.all").forEach(n=>{const i=n.getAttribute("data-date");n.innerHTML=ne(i,!0)}),Me(),De()}const M={width:200};function te(e,t,n){if(window.innerWidth<630){if(M.width===630)return;M.width=630;const i=ae(e);for(let l=t;l<i.length;l++)i[l].classList.add("hidden")}else if(window.innerWidth<980){if(M.width===980)return;M.width=980;const i=ae(e);for(let l=n;l<i.length;l++)i[l].classList.add("hidden")}else{if(M.width===1e3)return;M.width=1e3;const i=ae(e);for(let l=0;l<i.length;l++)i[l].classList.remove("hidden")}}const g={width:200};function Oe(){if(window.innerWidth<400){if(g.width===400)return;g.width=400,e(),o(_,50)}else if(window.innerWidth<530){if(g.width===530)return;g.width=530,e(),o(_,80)}else if(window.innerWidth<800){if(g.width===800)return;g.width=800,e(),o(_,120)}else{if(g.width===1e3)return;g.width=1e3,e(),o(_,200)}function e(){_=document.querySelectorAll(".blog-title.recent")}}const m={width:200};function Ge(){if(window.innerWidth<400){if(m.width===400)return;m.width=400,e(),o(S,64,"data-subtitle")}else if(window.innerWidth<530){if(m.width===530)return;m.width=530,e(),o(S,80,"data-subtitle")}else if(window.innerWidth<800){if(m.width===800)return;m.width=800,e(),o(S,150,"data-subtitle")}else{if(m.width===1e3)return;m.width=1e3,e(),o(S,200,"data-subtitle")}function e(){S=document.querySelectorAll(".blog-subtitle")}}const w={width:200};function De(){if(window.innerWidth<400){if(w.width===400)return;w.width=400,e(),o($,64,"data-subtitle")}else if(window.innerWidth<530){if(w.width===530)return;w.width=530,e(),o($,80,"data-subtitle")}else if(window.innerWidth<800){if(w.width===800)return;w.width=800,e(),o($,200,"data-subtitle")}else{if(w.width===1e3)return;w.width=1e3,e(),o($,250,"data-subtitle")}function e(){$=document.querySelectorAll(".blog-subtitle.all")}}const y={width:200};function Ye(){if(window.innerWidth<400){if(y.width===400)return;y.width=400,e(),o(h,80)}else if(window.innerWidth<530){if(y.width===530)return;y.width=530,e(),o(h,200)}else if(window.innerWidth<800){if(y.width===800)return;y.width=800,e(),o(h,380)}else{if(y.width===1e3)return;y.width=1e3,e(),o(h,400)}function e(){h=document.querySelectorAll(".blog-description")}}const p={width:200};function Me(){if(window.innerWidth<400){if(p.width===400)return;p.width=400,e(),o(L,80)}else if(window.innerWidth<530){if(p.width===530)return;p.width=530,e(),o(L,150)}else if(window.innerWidth<800){if(p.width===800)return;p.width=800,e(),o(L,300)}else{if(p.width===1e3)return;p.width=1e3,e(),o(L,400)}function e(){L=document.querySelectorAll(".blog-description.all")}}const b={width:400};function Je(){if(window.innerWidth<400){if(b.width===400)return;b.width=400,e(),o(B,150)}else if(window.innerWidth<530){if(b.width===530)return;b.width=530,e(),o(B,150)}else if(window.innerWidth<800){if(b.width===800)return;b.width=800,e(),o(B,200)}else{if(b.width===1e3)return;b.width=1e3,e(),o(B,400)}function e(){h=document.querySelectorAll(".blog-description.recipe")}}async function T(e,t=1){(t==null||t==null)&&(t=1);const n=await fetch("/api/blog?display=true"+e+"&page="+t,{method:"GET",headers:{"Content-Type":"application/json"}});if(await n.status!==200){console.log("Error: "+n.status),qe();return}const i=await n.json();t==1&&qe(),je(i),Ve(i),N()}function He(){window.innerWidth<980?c.forEach(e=>{const t=e.querySelector(".content"),n=t.outerHTML;e.removeChild(t),e.innerHTML+=n}):c.forEach(e=>{const t=e.querySelector(".cover-img"),n=t.outerHTML;e.removeChild(t),e.innerHTML+=n})}function o(e,t,n="data-description"){e.forEach(i=>{const l=i.getAttribute(n);i.innerHTML=A(l,t)})}function ae(e){return document.querySelectorAll(e)}window.addEventListener("load",()=>{var t;const e=window.location.pathname;if(e.includes("/blog/")){const n=(t=e.split("/blog/")[1])==null?void 0:t.split("/")[0];n!="new"&&n!="edit"&&(console.log(n),Ke())}});function Ke(){const e=document.querySelectorAll(".image-tool__caption"),t=document.querySelectorAll(".ce-paragraph"),n=document.querySelectorAll(".ce-header"),i=document.querySelectorAll(".cdx-quote__text"),l=document.querySelectorAll(".cdx-quote__caption"),ie=document.querySelectorAll(".cdx-list__item");k(e),k(t),k(n),k(i),k(l),k(ie);function k(_e){_e.forEach(oe=>{oe.textContent!=null&&(oe.innerHTML=A(oe.textContent))})}const j=document.getElementById("post-date"),Re=j==null?void 0:j.innerText,Ce=ne(Re);j.innerText=Ce}
