import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css     */import{d as X,f as h,a as oe}from"./helperFunctions.js";const F=document.querySelector(".navbar"),r=document.querySelector(".nav-menu"),se=document.querySelector(".nav-text"),d=document.querySelector(".nav-text-spacer");let J=!1;const N=document.querySelector(".nav-menu-btn"),z=document.querySelector(".nav-btn-bg"),_e=document.querySelector(".navbar .nav-list"),R=document.getElementById("notification");let ue=!1;window.addEventListener("load",()=>{d&&(J=!0),Te(),F.style.transition="backgroundColor 0.3 ease-in-out, height 0.3s ease-in-out",screen.width<=982&&(r.style.display="none"),R&&(ue=!0,R.style.left="2rem",X(4500).then(()=>{R.style.opacity="0",X(300).then(()=>{R.remove()})}))});window.addEventListener("resize",()=>{P==!0&&(P=!1,Z()),screen.width<=982?r.style.display="none":r.style.display=""});let P=!1;N.addEventListener("click",()=>{P=!P,Z()});document.addEventListener("click",e=>{qe(e)});document.addEventListener("scroll",e=>{qe(e)});function qe(e=null){P&&(e!=null?e.target!=r&&e.target!=N&&e.target!=z&&e.target!=_e&&(P=!1,Z()):(P=!1,Z()))}function Z(){P?(r.style.display="block",r.style.boxShadow="0rem 2rem 2rem 0rem rgba(0, 0, 0, 0.15)",r.style.opacity="1",z.style.backgroundColor="white",z.style.boxShadow="rgba(0, 0, 0, 0.2) 0rem -1.2rem 3rem 0rem"):(r.style.opacity="0",r.style.boxShadow="",z.style.backgroundColor="transparent",z.style.boxShadow="",X(150).then(()=>{r.style.display="",r.style.opacity=""}))}let O=!1,Le=0;function Te(){X(100).then(()=>Le=document.documentElement.scrollTop).then(()=>{if(Le>20){if(O)return;J=d.style.display!=="none",e("0rem 0rem 2rem 0rem rgba(0, 0, 0, 0.05)","-1.8rem","1.4rem","1.8rem",!0),ue&&(R.style.top="5.5rem")}else{if(!O)return;e("","","","",!1),ue&&(R.style.top="")}function e(t,i,l,n,w){if(F.style.boxShadow=t,F.style.top=i,se.style.fontSize=l,N.style.width=n,O=w,O){if(F.style.backgroundColor="white",se.style.marginBottom="0",N.style.top="0.5rem",r.style.top="4.2rem",r.style.borderRadius="0 0 0.5rem 0.5rem",!J)return;d.style.opacity="0",d.style.bottom="-0.5rem",d.style.left="0.5rem",d.style.height="0"}else{if(F.style.backgroundColor="#f8c6b7",se.style.marginBottom="",N.style.top="",r.style.top="7rem",r.style.borderRadius="",!J)return;d.style.opacity="",d.style.bottom="",d.style.left="",d.style.height=""}}})}const D=document.querySelectorAll("#recipes-box .recipe-post");window.addEventListener("scroll",()=>{Te()});window.addEventListener("load",()=>{xe()});window.addEventListener("resize",()=>{xe()});const M={width:200};function xe(){if(window.innerWidth<630){if(M.width===630)return;M.width=630;for(let e=3;e<D.length;e++)D[e].classList.add("hidden")}else if(window.innerWidth<980){if(M.width===980)return;M.width=980;for(let e=4;e<D.length;e++)D[e].classList.add("hidden")}else{if(M.width===1e3)return;M.width=1e3;for(let e=0;e<D.length;e++)D[e].classList.remove("hidden")}}const ae=document.querySelector(".blog-desc");if(ae!=null){const e=ae.innerHTML;ae.innerHTML=h(e,150)}const G=document.querySelectorAll(".recipe-desc");if(G!=null)for(let e=0;e<G.length;e++){const t=G[e].innerHTML;G[e].innerHTML=h(t,250)}const Y=document.querySelectorAll(".blog-date");if(Y!=null)for(let e=0;e<Y.length;e++){const t=Y[e].innerHTML;Y[e].innerHTML=oe(t,!0)}let fe=null;const q=document.querySelector(".search-input");let Se="",s="";const U=document.querySelector(".filter-button.all"),ge=document.querySelector(".filter-button.recipes"),we=document.querySelector(".filter-button.newest"),me=document.querySelector(".filter-button.oldest"),ye=document.querySelector(".filter-button.az"),Ee=[U,ge,we,me,ye],_=document.querySelector(".blogs-home-nav"),g=document.querySelector(".blog-nav-title"),ee=document.querySelector(".blog-nav-home"),te=document.querySelector(".blog-nav-all"),u=document.querySelector(".blogs-header-bgBox"),ne=document.querySelector(".faux-page-home"),ie=document.querySelector(".faux-page-all"),a=document.querySelectorAll(".featured-blog"),$=document.querySelectorAll(".featured-blog-link"),be=document.querySelector("#blogs-all .section-container"),he=document.querySelector("#blogs-more .more-button"),Be=document.querySelector("#footer-main .container");let C=null,f=null,m=null,E=null,y=null,I=null,K=null;window.addEventListener("load",async()=>{fe=new URLSearchParams(window.location.search);const e=window.location.pathname;e.includes("/blog")&&!e.includes("/blog/")&&(await $e(),C=document.querySelectorAll(".recent-blog-title"),f=document.querySelectorAll(".blog-description"),m=document.querySelectorAll(".blog-description.all"),E=document.querySelectorAll(".blog-description.recipe"),y=document.querySelectorAll(".blog-subtitle"),I=document.querySelectorAll(".blog-subtitle.all"),K=document.querySelectorAll(".blog-date"),await Ne(),Q())});let B=a.length-1,c=0,pe="home";function $e(){ze(),Fe(),Pe(),He(),ve(),le("#blogs-recipes .recipe-blog",3,4),le("#blogs-recent .recent-blog",4,5)}async function Fe(){const e=fe.get("section"),t=fe.get("filter");if(e==="all"){if(s=q.value,s.length>0&&(await x("&search="+s),k()),t!==null||t!==void 0||t!=="none"||t!=="")switch(k(),t){case"all":T(U);break;case"recipe":T(ge);break;case"newest":T(we);break;case"oldest":T(me);break;case"alphabetical":T(ye);break}await x(""),await We()}else await ke()}function ze(){Ee.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("active")||(new URLSearchParams(window.location.search).delete("page"),T(e))})}),window.addEventListener("resize",async()=>{He(),Pe(),le("#blogs-recipes .recipe-blog",3,4),le("#blogs-recent .recent-blog",4,5),Q()}),ee.addEventListener("click",()=>{ee.classList.contains("active")||(ke(),Q())}),te.addEventListener("click",()=>{te.classList.contains("active")||(T(U),We(),Q())}),$.forEach(e=>{e.addEventListener("click",()=>{if(e.classList.contains("active"))return;const t=Array.from($).indexOf(e);t>a.length-1||(B=c,c=t,$[B].classList.remove("active"),a[B].style.opacity="0",a[c].style.display="flex",$[c].classList.add("active"),setTimeout(()=>{a[B].style.display="none"},500),setTimeout(()=>{a[c].style.opacity="1"},5),clearInterval(j),j=setInterval(ve,1e4))})}),q.addEventListener("focus",()=>{s=q.value,s!==Se&&(k(),x("&search="+s))}),q.addEventListener("keydown",e=>{if(s=q.value,e.key==="Enter"){if(s===Se)return;k(),x("&search="+s)}}),q.addEventListener("input",()=>{if(s=q.value,s==""){x(""),T(U);return}k(),x("&search="+s)}),he.addEventListener("click",()=>{const e=new URLSearchParams(window.location.search),t=e.get("section");let i=e.get("page");i||(i="1");const l=e.get("filter");let n="section="+t+"&filter="+l;i&&x(n,parseInt(i)+1)})}function Q(){Oe(),De(),Ge(),Me(),Ye(),Ve()}function Pe(){window.innerWidth<460||window.innerWidth<630?(g.style.paddingLeft="0rem",_.style.paddingLeft="0rem"):pe==="home"?(g.style.paddingLeft="1.75rem",_.style.paddingLeft="0rem"):(g.style.paddingLeft="0rem",_.style.paddingLeft="0rem")}async function Ne(){for(let e=0;e<K.length;e++){const t=await K[e].getAttribute("data-date");let i=null;try{i=oe(t,!0)}catch(l){console.log(l)}K[e].innerText=i}for(let e=0;e<f.length;e++){const t=await f[e].getAttribute("data-description"),i=h(t,ce());f[e].innerText=i}for(let e=0;e<E.length;e++){const t=await E[e].getAttribute("data-description"),i=h(t,ce());E[e].innerText=i}for(let e=0;e<m.length;e++){const t=await m[e].getAttribute("data-description");m[e].innerText=h(t,ce())}for(let e=0;e<y.length;e++){const t=await y[e].getAttribute("data-subtitle"),i=h(t,Ue());y[e].innerText=i}}function ce(){return window.innerWidth<630?180:400}function Ue(){return window.innerWidth<630?64:100}function ke(){const e=new URLSearchParams(window.location.search);e.delete("section"),e.delete("filter"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),clearInterval(j),j=setInterval(ve,6500),pe="home",t(),q.value="",s="",be.innerHTML="",k(),ee.classList.add("active"),te.classList.remove("active"),u.style.transform="rotate(-8deg)",u.style.position="absolute",u.style.top="",u.style.height="",u.style.borderRadius="",Be.style.borderTop="none",g.style.marginLeft="",ie.classList.remove("active"),setTimeout(()=>{ie.style.display="none",ne.style.display="block",setTimeout(()=>{ne.classList.add("active")},5)},150);function t(){window.innerWidth<630?(g.style.paddingLeft="0rem",_.style.paddingLeft=""):g.style.paddingLeft="1.75rem"}}function We(){const e=new URLSearchParams(window.location.search);e.set("section","all"),e.delete("page"),window.history.replaceState({},"",`${window.location.pathname}?${e}`),pe="all",t(),clearInterval(j),ee.classList.remove("active"),te.classList.add("active"),u.style.transform="rotate(0deg)",u.style.position="fixed",u.style.top="0rem",u.style.height="120vh",u.style.borderRadius="0rem",Be.style.borderTop="2px solid var(--dark)",g.style.paddingLeft="0rem",ne.classList.remove("active"),setTimeout(()=>{ne.style.display="none",ie.style.display="block",setTimeout(()=>{ie.classList.add("active")},5)},150);function t(){window.innerWidth<630?(_.style.paddingLeft="",g.style.marginLeft="0rem"):g.style.marginLeft="-0.2rem"}}let j=null;function ve(){B=c,$[B].classList.remove("active"),a[B].style.opacity="0",setTimeout(()=>{a[B].style.display="none"},500),c=(c+1)%a.length,setTimeout(()=>{a[c].style.opacity="1"},5),a[c].style.display="flex",$[c].classList.add("active")}function T(e){k(),e.classList.add("active");const t=new URLSearchParams(window.location.search);function i(){return e===U?"none":e===ge?"recipe":e===we?"newest":e===me?"oldest":e===ye?"alphabetical":(console.log("Cant find filter"),"none")}const l=i();t.set("filter",l),window.history.replaceState({},"",`${window.location.pathname}?${t}`),x("&filter="+l)}function k(){Ee.forEach(e=>{e.classList.remove("active")})}function Ae(){be.innerHTML=""}function je(e){e.length%10===0&&e.length>0?he.style.display="flex":he.style.display="none"}const H={width:200};function le(e,t,i){if(window.innerWidth<630){if(H.width===630)return;H.width=630;const l=de(e);for(let n=t;n<l.length;n++)l[n].classList.add("hidden")}else if(window.innerWidth<980){if(H.width===980)return;H.width=980;const l=de(e);for(let n=i;n<l.length;n++)l[n].classList.add("hidden")}else{if(H.width===1e3)return;H.width=1e3;const l=de(e);for(let n=0;n<l.length;n++)l[n].classList.remove("hidden")}}const b={width:200};function Ve(){if(window.innerWidth<400){if(b.width===400)return;b.width=400,e(),o(C,50)}else if(window.innerWidth<530){if(b.width===530)return;b.width=530,e(),o(C,80)}else if(window.innerWidth<800){if(b.width===800)return;b.width=800,e(),o(C,120)}else{if(b.width===1e3)return;b.width=1e3,e(),o(C,200)}function e(){C=document.querySelectorAll(".blog-title.recent")}}const p={width:200};function Oe(){if(window.innerWidth<400){if(p.width===400)return;p.width=400,e(),o(y,64,"data-subtitle")}else if(window.innerWidth<530){if(p.width===530)return;p.width=530,e(),o(y,80,"data-subtitle")}else if(window.innerWidth<800){if(p.width===800)return;p.width=800,e(),o(y,150,"data-subtitle")}else{if(p.width===1e3)return;p.width=1e3,e(),o(y,200,"data-subtitle")}function e(){y=document.querySelectorAll(".blog-subtitle")}}const v={width:200};function De(){if(window.innerWidth<400){if(v.width===400)return;v.width=400,e(),o(I,64,"data-subtitle")}else if(window.innerWidth<530){if(v.width===530)return;v.width=530,e(),o(I,80,"data-subtitle")}else if(window.innerWidth<800){if(v.width===800)return;v.width=800,e(),o(I,200,"data-subtitle")}else{if(v.width===1e3)return;v.width=1e3,e(),o(I,250,"data-subtitle")}function e(){I=document.querySelectorAll(".blog-subtitle.all")}}const L={width:200};function Ge(){if(window.innerWidth<400){if(L.width===400)return;L.width=400,e(),o(f,80)}else if(window.innerWidth<530){if(L.width===530)return;L.width=530,e(),o(f,200)}else if(window.innerWidth<800){if(L.width===800)return;L.width=800,e(),o(f,380)}else{if(L.width===1e3)return;L.width=1e3,e(),o(f,400)}function e(){f=document.querySelectorAll(".blog-description")}}const S={width:200};function Me(){if(window.innerWidth<400){if(S.width===400)return;S.width=400,e(),o(m,80)}else if(window.innerWidth<530){if(S.width===530)return;S.width=530,e(),o(m,150)}else if(window.innerWidth<800){if(S.width===800)return;S.width=800,e(),o(m,300)}else{if(S.width===1e3)return;S.width=1e3,e(),o(m,400)}function e(){m=document.querySelectorAll(".blog-description.all")}}const A={width:400};function Ye(){if(window.innerWidth<400){if(A.width===400)return;A.width=400,e(),o(E,150)}else if(window.innerWidth<530){if(A.width===530)return;A.width=530,e(),o(E,150)}else if(window.innerWidth<800){if(A.width===800)return;A.width=800,e(),o(E,200)}else{if(A.width===1e3)return;A.width=1e3,e(),o(E,400)}function e(){f=document.querySelectorAll(".blog-description.recipe")}}async function x(e,t=1){(t==null||t==null)&&(t=1);const i=await fetch("/api/blog?display=true"+e+"&page="+t,{method:"GET",headers:{"Content-Type":"application/json"}});if(await i.status!==200){console.log("Error: "+i.status),Ae();return}const l=await i.json();t==1&&Ae(),je(l),Je(l)}function Je(e){for(let n=0;n<e.length;n++)be.innerHTML+=`
    <div class="all-blog">
      <div class="cover-img">
        <img src="/thumbnails/${e[n].cover}" alt="${e[n].title}" class="recipe-image">
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
  `;document.querySelectorAll(".blog-date.all").forEach(n=>{const w=n.getAttribute("data-date");n.innerHTML=oe(w,!0)}),document.querySelectorAll(".blog-description.all").forEach(n=>{const w=n.getAttribute("data-description");n.innerHTML=h(w,200)}),document.querySelectorAll(".blog-subtitle.all").forEach(n=>{const w=n.getAttribute("data-subtitle");n.innerHTML=h(w,100)}),Me(),De()}function He(){window.innerWidth<980?a.forEach(e=>{const t=e.querySelector(".content"),i=t.outerHTML;e.removeChild(t),e.innerHTML+=i}):a.forEach(e=>{const t=e.querySelector(".cover-img"),i=t.outerHTML;e.removeChild(t),e.innerHTML+=i})}function o(e,t,i="data-description"){e.forEach(l=>{const n=l.getAttribute(i);l.innerHTML=h(n,t)})}function de(e){return document.querySelectorAll(e)}window.addEventListener("load",()=>{var t;const e=window.location.pathname;if(e.includes("/blog/")){const i=(t=e.split("/blog/")[1])==null?void 0:t.split("/")[0];i!="new"&&i!="edit"&&(console.log(i),Ke())}});function Ke(){const e=document.querySelectorAll(".image-tool__caption"),t=document.querySelectorAll(".ce-paragraph"),i=document.querySelectorAll(".ce-header"),l=document.querySelectorAll(".cdx-quote__text"),n=document.querySelectorAll(".cdx-quote__caption"),w=document.querySelectorAll(".cdx-list__item");W(e),W(t),W(i),W(l),W(n),W(w);function W(Re){Re.forEach(re=>{re.textContent!=null&&(re.innerHTML=h(re.textContent))})}const V=document.getElementById("post-date"),Ce=V==null?void 0:V.innerText,Ie=oe(Ce);V.innerText=Ie}
