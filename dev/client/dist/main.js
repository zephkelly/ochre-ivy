import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css     */import{d as J,f as u,a as ie}from"./helperFunctions.js";const F=document.querySelector(".navbar"),r=document.querySelector(".nav-menu"),le=document.querySelector(".nav-text"),g=document.querySelector(".nav-text-spacer");let de=!1;const N=document.querySelector(".nav-menu-btn"),z=document.querySelector(".nav-btn-bg"),$e=document.querySelector(".navbar .nav-list"),R=document.getElementById("notification");let ue=!1;window.addEventListener("load",()=>{g&&(de=!0),Te(),F.style.transition="all 0.3s ease-in-out",screen.width<=982&&(r.style.display="none"),R&&(ue=!0,R.style.left="2rem",J(4500).then(()=>{R.style.opacity="0",J(300).then(()=>{R.remove()})}))});window.addEventListener("resize",()=>{B==!0&&(B=!1,K()),screen.width<=982?r.style.display="none":r.style.display=""});let B=!1;N.addEventListener("click",()=>{B=!B,K()});document.addEventListener("click",e=>{qe(e)});document.addEventListener("scroll",e=>{qe(e)});function qe(e=null){B&&(e!=null?e.target!=r&&e.target!=N&&e.target!=z&&e.target!=$e&&(B=!1,K()):(B=!1,K()))}function K(){B?(r.style.display="block",r.style.boxShadow="0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)",r.style.opacity="1",z.style.backgroundColor="white",z.style.boxShadow="rgba(0, 0, 0, 0.2) 0rem -1.2rem 3rem 0rem"):(r.style.opacity="0",r.style.boxShadow="",z.style.backgroundColor="transparent",z.style.boxShadow="",J(150).then(()=>{r.style.display="",r.style.opacity=""}))}let V=!1,Le=0;function Te(){J(100).then(()=>Le=document.documentElement.scrollTop).then(()=>{if(Le>20){if(V)return;e("0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.05)","3.8rem","1.4rem","1.8rem",!0),ue&&(R.style.top="5.5rem")}else{if(!V)return;e("","","","",!1),ue&&(R.style.top="")}function e(t,i,o,n,h){if(F.style.boxShadow=t,F.style.height=i,le.style.fontSize=o,N.style.fontSize=n,V=h,V){if(F.style.backgroundColor="white",le.style.marginBottom="0",N.style.top="0.5rem",r.style.top="4.2rem",r.style.borderRadius="0 0 0.5rem 0.5rem",!de)return;g.style.opacity="0",g.style.bottom="-0.5rem",g.style.left="0.5rem",g.style.height="0"}else{if(F.style.backgroundColor="#f8c6b7",le.style.marginBottom="",N.style.top="",r.style.top="7rem",r.style.borderRadius="",!de)return;g.style.opacity="",g.style.bottom="",g.style.left="",g.style.height=""}}})}const D=document.querySelectorAll("#recipes-box .recipe-post");window.addEventListener("scroll",()=>{Te()});window.addEventListener("load",()=>{xe()});window.addEventListener("resize",()=>{xe()});const M={width:200};function xe(){if(window.innerWidth<630){if(M.width===630)return;M.width=630;for(let e=3;e<D.length;e++)D[e].classList.add("hidden")}else if(window.innerWidth<980){if(M.width===980)return;M.width=980;for(let e=4;e<D.length;e++)D[e].classList.add("hidden")}else{if(M.width===1e3)return;M.width=1e3;for(let e=0;e<D.length;e++)D[e].classList.remove("hidden")}}const re=document.querySelector(".blog-desc");if(re!=null){const e=re.innerHTML;re.innerHTML=u(e,150)}const O=document.querySelectorAll(".recipe-desc");if(O!=null)for(let e=0;e<O.length;e++){const t=O[e].innerHTML;O[e].innerHTML=u(t,250)}const G=document.querySelectorAll(".blog-date");if(G!=null)for(let e=0;e<G.length;e++){const t=G[e].innerHTML;G[e].innerHTML=ie(t,!0)}let fe=null;const S=document.querySelector(".search-input");let Se="",s="";const U=document.querySelector(".filter-button.all"),ge=document.querySelector(".filter-button.recipes"),me=document.querySelector(".filter-button.newest"),we=document.querySelector(".filter-button.oldest"),ye=document.querySelector(".filter-button.az"),Ee=[U,ge,me,we,ye],C=document.querySelector(".blogs-home-nav"),f=document.querySelector(".blog-nav-title"),Q=document.querySelector(".blog-nav-home"),X=document.querySelector(".blog-nav-all"),d=document.querySelector(".blogs-header-bgBox"),Z=document.querySelector(".faux-page-home"),ee=document.querySelector(".faux-page-all"),c=document.querySelectorAll(".featured-blog"),_=document.querySelectorAll(".featured-blog-link"),be=document.querySelector("#blogs-all .section-container"),he=document.querySelector("#blogs-more .more-button"),Be=document.querySelector("#footer-main .container");let $=document.querySelectorAll(".recent-blog-title"),m=document.querySelectorAll(".blog-description"),A=document.querySelectorAll(".blog-description.all"),P=document.querySelectorAll(".blog-description.recipe"),q=document.querySelectorAll(".blog-subtitle"),I=document.querySelectorAll(".blog-subtitle.all"),se=document.querySelectorAll(".blog-date");window.addEventListener("load",async()=>{fe=new URLSearchParams(window.location.search);const e=window.location.pathname;e.includes("/blog")&&!e.includes("/blog/")&&Ie()});let E=c.length-1,a=0,pe="home";function Ie(){ze(),Fe(),Pe(),He(),ve(),ne("#blogs-recipes .recipe-blog",3,4),ne("#blogs-recent .recent-blog",4,5)}async function Fe(){const e=fe.get("section"),t=fe.get("filter");if(e==="all"){if(s=S.value,s.length>0&&(await x("&search="+s),k()),t!==null||t!==void 0||t!=="none"||t!=="")switch(k(),t){case"all":T(U);break;case"recipe":T(ge);break;case"newest":T(me);break;case"oldest":T(we);break;case"alphabetical":T(ye);break}await x(""),We()}else ke();Ne(),Y()}function ze(){Ee.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("active")||(new URLSearchParams(window.location.search).delete("page"),T(e))})}),window.addEventListener("resize",async()=>{He(),Pe(),ne("#blogs-recipes .recipe-blog",3,4),ne("#blogs-recent .recent-blog",4,5),Y()}),Q.addEventListener("click",()=>{Q.classList.contains("active")||(ke(),Y())}),X.addEventListener("click",()=>{X.classList.contains("active")||(T(U),We(),Y())}),_.forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("active"))return;const t=Array.from(_).indexOf(e);t>c.length-1||(E=a,a=t,_[E].classList.remove("active"),c[E].style.opacity="0",c[a].style.display="flex",_[a].classList.add("active"),setTimeout(()=>{c[E].style.display="none"},500),setTimeout(()=>{c[a].style.opacity="1"},5),clearInterval(te),te=setInterval(ve,1e4))})}),S.addEventListener("focus",()=>{s=S.value,s!==Se&&(k(),x("&search="+s))}),S.addEventListener("keydown",e=>{if(s=S.value,e.key==="Enter"){if(s===Se)return;k(),x("&search="+s)}}),S.addEventListener("input",()=>{if(s=S.value,s==""){x(""),T(U);return}k(),x("&search="+s)}),he.addEventListener("click",()=>{const e=new URLSearchParams(window.location.search),t=e.get("section");let i=e.get("page");i||(i="1");const o=e.get("filter");let n="section="+t+"&filter="+o;i&&x(n,parseInt(i)+1)})}function Y(){Oe(),De(),Ge(),Me(),Ye(),Ve()}function Pe(){window.innerWidth<460||window.innerWidth<630?(f.style.paddingLeft="0rem",C.style.paddingLeft="0rem"):pe==="home"?(f.style.paddingLeft="1.75rem",C.style.paddingLeft="0rem"):(f.style.paddingLeft="0rem",C.style.paddingLeft="0rem")}function Ne(){for(let e=0;e<se.length;e++){const t=se[e].getAttribute("data-date"),i=ie(t,!0);se[e].innerText=i}for(let e=0;e<m.length;e++){const t=m[e].getAttribute("data-description"),i=u(t,ce());m[e].innerText=i}for(let e=0;e<P.length;e++){const t=P[e].getAttribute("data-description"),i=u(t,ce());P[e].innerText=i}for(let e=0;e<A.length;e++){const t=A[e].getAttribute("data-description");A[e].innerText=u(t,ce())}for(let e=0;e<q.length;e++){const t=q[e].getAttribute("data-subtitle"),i=u(t,Ue());q[e].innerText=i}}function ce(){return window.innerWidth<630?180:400}function Ue(){return window.innerWidth<630?64:100}function ke(){const e=new URLSearchParams(window.location.search);e.delete("section"),e.delete("filter"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),te=setInterval(ve,6500),pe="home",t(),S.value="",s="",be.innerHTML="",k(),Q.classList.add("active"),X.classList.remove("active"),d.style.transform="rotate(-8deg)",d.style.position="absolute",d.style.top="",d.style.height="",d.style.borderRadius="",Be.style.borderTop="none",f.style.marginLeft="",ee.classList.remove("active"),setTimeout(()=>{ee.style.display="none",Z.style.display="block",setTimeout(()=>{Z.classList.add("active")},5)},150);function t(){window.innerWidth<630?(f.style.paddingLeft="0rem",C.style.paddingLeft=""):f.style.paddingLeft="1.75rem"}}function We(){const e=new URLSearchParams(window.location.search);e.set("section","all"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),pe="all",te=null,t(),Q.classList.remove("active"),X.classList.add("active"),d.style.transform="rotate(0deg)",d.style.position="fixed",d.style.top="0rem",d.style.height="120vh",d.style.borderRadius="0rem",Be.style.borderTop="2px solid var(--dark)",f.style.paddingLeft="0rem",Z.classList.remove("active"),setTimeout(()=>{Z.style.display="none",ee.style.display="block",setTimeout(()=>{ee.classList.add("active")},5)},150);function t(){window.innerWidth<630?(C.style.paddingLeft="",f.style.marginLeft="0rem"):f.style.marginLeft="-0.2rem"}}let te=null;function ve(){E=a,_[E].classList.remove("active"),c[E].style.opacity="0",setTimeout(()=>{c[E].style.display="none"},500),a=(a+1)%c.length,setTimeout(()=>{c[a].style.opacity="1"},5),c[a].style.display="flex",_[a].classList.add("active")}function T(e){k(),e.classList.add("active");const t=new URLSearchParams(window.location.search);function i(){return e===U?"none":e===ge?"recipe":e===me?"newest":e===we?"oldest":e===ye?"alphabetical":(console.log("Cant find filter"),"none")}const o=i();t.set("filter",o),window.history.replaceState({},"",`${window.location.pathname}?${t}`),x("&filter="+o)}function k(){Ee.forEach(e=>{e.classList.remove("active")})}function Ae(){be.innerHTML=""}function je(e){e.length%10===0&&e.length>0?he.style.display="flex":he.style.display="none"}const H={width:200};function ne(e,t,i){if(window.innerWidth<630){if(H.width===630)return;H.width=630;const o=ae(e);for(let n=t;n<o.length;n++)o[n].classList.add("hidden")}else if(window.innerWidth<980){if(H.width===980)return;H.width=980;const o=ae(e);for(let n=i;n<o.length;n++)o[n].classList.add("hidden")}else{if(H.width===1e3)return;H.width=1e3;const o=ae(e);for(let n=0;n<o.length;n++)o[n].classList.remove("hidden")}}const w={width:200};function Ve(){if(window.innerWidth<400){if(w.width===400)return;w.width=400,e(),l($,50)}else if(window.innerWidth<530){if(w.width===530)return;w.width=530,e(),l($,80)}else if(window.innerWidth<800){if(w.width===800)return;w.width=800,e(),l($,120)}else{if(w.width===1e3)return;w.width=1e3,e(),l($,200)}function e(){$=document.querySelectorAll(".blog-title.recent")}}const y={width:200};function Oe(){if(window.innerWidth<400){if(y.width===400)return;y.width=400,e(),l(q,64,"data-subtitle")}else if(window.innerWidth<530){if(y.width===530)return;y.width=530,e(),l(q,80,"data-subtitle")}else if(window.innerWidth<800){if(y.width===800)return;y.width=800,e(),l(q,150,"data-subtitle")}else{if(y.width===1e3)return;y.width=1e3,e(),l(q,200,"data-subtitle")}function e(){q=document.querySelectorAll(".blog-subtitle")}}const b={width:200};function De(){if(window.innerWidth<400){if(b.width===400)return;b.width=400,e(),l(I,64,"data-subtitle")}else if(window.innerWidth<530){if(b.width===530)return;b.width=530,e(),l(I,80,"data-subtitle")}else if(window.innerWidth<800){if(b.width===800)return;b.width=800,e(),l(I,200,"data-subtitle")}else{if(b.width===1e3)return;b.width=1e3,e(),l(I,250,"data-subtitle")}function e(){I=document.querySelectorAll(".blog-subtitle.all")}}const p={width:200};function Ge(){if(window.innerWidth<400){if(p.width===400)return;p.width=400,e(),l(m,80)}else if(window.innerWidth<530){if(p.width===530)return;p.width=530,e(),l(m,200)}else if(window.innerWidth<800){if(p.width===800)return;p.width=800,e(),l(m,380)}else{if(p.width===1e3)return;p.width=1e3,e(),l(m,400)}function e(){m=document.querySelectorAll(".blog-description")}}const v={width:200};function Me(){if(window.innerWidth<400){if(v.width===400)return;v.width=400,e(),l(A,80)}else if(window.innerWidth<530){if(v.width===530)return;v.width=530,e(),l(A,150)}else if(window.innerWidth<800){if(v.width===800)return;v.width=800,e(),l(A,300)}else{if(v.width===1e3)return;v.width=1e3,e(),l(A,400)}function e(){A=document.querySelectorAll(".blog-description.all")}}const L={width:400};function Ye(){if(window.innerWidth<400){if(L.width===400)return;L.width=400,e(),l(P,150)}else if(window.innerWidth<530){if(L.width===530)return;L.width=530,e(),l(P,150)}else if(window.innerWidth<800){if(L.width===800)return;L.width=800,e(),l(P,200)}else{if(L.width===1e3)return;L.width=1e3,e(),l(P,400)}function e(){m=document.querySelectorAll(".blog-description.recipe")}}async function x(e,t=1){(t==null||t==null)&&(t=1);const i=await fetch("/api/blog?display=true"+e+"&page="+t,{method:"GET",headers:{"Content-Type":"application/json"}});if(await i.status!==200){console.log("Error: "+i.status),Ae();return}const o=await i.json();t==1&&Ae(),je(o),Je(o)}function Je(e){for(let n=0;n<e.length;n++)be.innerHTML+=`
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
  `;document.querySelectorAll(".blog-date.all").forEach(n=>{const h=n.getAttribute("data-date");n.innerHTML=ie(h,!0)}),document.querySelectorAll(".blog-description.all").forEach(n=>{const h=n.getAttribute("data-description");n.innerHTML=u(h,200)}),document.querySelectorAll(".blog-subtitle.all").forEach(n=>{const h=n.getAttribute("data-subtitle");n.innerHTML=u(h,100)}),Me(),De()}function He(){window.innerWidth<980?c.forEach(e=>{const t=e.querySelector(".content"),i=t.outerHTML;e.removeChild(t),e.innerHTML+=i}):c.forEach(e=>{const t=e.querySelector(".cover-img"),i=t.outerHTML;e.removeChild(t),e.innerHTML+=i})}function l(e,t,i="data-description"){e.forEach(o=>{const n=o.getAttribute(i);o.innerHTML=u(n,t)})}function ae(e){return document.querySelectorAll(e)}window.addEventListener("load",()=>{var t;const e=window.location.pathname;if(e.includes("/blog/")){const i=(t=e.split("/blog/")[1])==null?void 0:t.split("/")[0];i!="new"&&i!="edit"&&(console.log(i),Ke())}});function Ke(){const e=document.querySelectorAll(".image-tool__caption"),t=document.querySelectorAll(".ce-paragraph"),i=document.querySelectorAll(".ce-header"),o=document.querySelectorAll(".cdx-quote__text"),n=document.querySelectorAll(".cdx-quote__caption"),h=document.querySelectorAll(".cdx-list__item");W(e),W(t),W(i),W(o),W(n),W(h);function W(_e){_e.forEach(oe=>{oe.textContent!=null&&(oe.innerHTML=u(oe.textContent))})}const j=document.getElementById("post-date"),Re=j==null?void 0:j.innerText,Ce=ie(Re);j.innerText=Ce}