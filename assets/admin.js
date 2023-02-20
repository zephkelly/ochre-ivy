import"./assets/modulepreload-polyfill-ec808ebb.js";import{a as p,f as b}from"./helperFunctions.js";const d=document.querySelector(".filter-button.all"),m=document.querySelector(".filter-button.recipes"),v=document.querySelector(".filter-button.newest"),w=document.querySelector(".filter-button.oldest"),y=document.querySelector(".filter-button.az"),S=[d,m,v,w,y],r=document.querySelector(".search-input"),u=document.querySelector("#blogs-more .more-button"),T=document.querySelector("#blogs-all .section-container");let g="",o="";window.addEventListener("load",()=>{const e=window.location.pathname;e.includes("/dashboard")&&!e.includes("/dashboard/")&&(L(),q())});function L(){S.forEach(e=>{e.addEventListener("click",()=>{e.classList.contains("active")||(new URLSearchParams(window.location.search).delete("page"),f(e))})}),r.addEventListener("focus",()=>{o=r.value,o!==g&&(c(),a("&search="+o))}),r.addEventListener("keydown",e=>{if(o=r.value,e.key==="Enter"){if(o===g)return;c(),a("&search="+o)}}),r.addEventListener("input",()=>{if(o=r.value,o==""){a(""),f(d);return}c(),a("&search="+o)}),u.addEventListener("click",()=>{const e=new URLSearchParams(window.location.search),t=e.get("section");let l=e.get("page");l||(l="1");const n=e.get("filter");let s="section="+t+"&filter="+n;l&&a(s,parseInt(l)+1)})}function q(){const e=document.querySelectorAll(".blog-date");for(let n=0;n<e.length;n++){const s=e[n].innerText,i=p(s,!0);e[n].innerText=i.toString()}const t=document.querySelectorAll(".all-blog-description");for(let n=0;n<t.length;n++){const s=t[n].innerText,i=b(s,155);t[n].innerText=i}const l=document.querySelectorAll(".blog-tags");for(let n=0;n<l.length;n++){const i=l[n].innerText.replace(/,/g,", ");l[n].innerText="tags: "+i}}function f(e){c(),e.classList.add("active");const t=new URLSearchParams(window.location.search);function l(){return e===d?"none":e===m?"recipe":e===v?"newest":e===w?"oldest":e===y?"alphabetical":(console.log("Cant find filter"),"none")}const n=l();t.set("filter",n),window.history.replaceState({},"",`${window.location.pathname}?${t}`),a("&filter="+n)}function c(){S.forEach(e=>{e.classList.remove("active")})}function E(e){e.length%10===0&&e.length>0?u.style.display="flex":u.style.display="none"}function h(){T.innerHTML=""}function $(e){for(let t=0;t<e.length;t++)T.innerHTML+=`
    <div class="all-blog dashboard">  
      <div class="cover-img">
        <img src="/thumbnails/${e[t].cover}" alt="${e[t].title}" class="recipe-image">
      </div>
      <div class="content">
        <div class="wrapper">
          <h3 class="blog-title">${e[t].title}</h3>
          <h6 class="blog-subtitle">${e[t].subtitle}</h6>  
          <p class="blog-tags">${e[t].tags}</p>
          <p class="blog-date">${p(e[t].createdDate,!0)}</p>
        </div>
        <div class="wrapper">
          <p class="all-blog-description">${b(e[t].description,255)}</p>
          <div class="group">
            <a href="/blog/${e[t].uri}" class="blog-link-all-dash accent-button">View</a>
            <a href="/dashboard/blog/edit/${e[t].uri}" class="blog-link-all-dash accent-button">Edit</a>
            <a class="blog-link-all-dash accent-button delete-button" uri="${e[t].uri}">Delete</a>
          </div>
        </div>
      </div>
    </div>`}async function a(e,t=1){(t==null||t==null)&&(t=1);const l=await fetch("/api/blog?display=true"+e+"&page="+t,{method:"GET",headers:{"Content-Type":"application/json"}});if(await l.status!==200){console.log("Error: "+l.status),h();return}const n=await l.json();t==1&&h(),E(n),$(n)}