function r(l){return new Promise(i=>setTimeout(i,l))}function a(l,i=0){if(l==null||l=="")return"";let e=l.replace(/<br>/g," ");return e=e.replace(/(\r\n|\n|\r)/gm,""),e=e.replace(/<script>.*<\/script>/g,""),e=e.replace(/&lt;.*?&gt;/g,""),e=e.replace(/&lt;script.*?;.*?&lt;\/script&gt;/g,""),e=e.replace(/&lt;script.*?&lt;\/script&gt;/g,""),e=e.replace(/&lt;script.*?&gt;/g,""),e=e.replace(/&nbsp;/g,""),i==0||e.length>i&&(e=e.slice(0,i),e.charAt(e.length-1)!=" "&&(e=e.slice(0,e.lastIndexOf(" "))),e=e+"..."),e}function n(l,i=!1){let e=new Date(l);isNaN(e.getTime())&&(console.log("Date is invalid, input date: "+l),e=new Date),e.toLocaleDateString("en-GB"),isNaN(e.getTime())&&(console.log("Date is invalid when converting to local string, input date: "+l),e.toLocaleDateString("en-GB"));let t=e.toDateString();return isNaN(e.getTime())&&(t=""),i?(t=t.slice(4),t=t.slice(0,6)+","+t.slice(6)):(t=t.slice(0,3)+t.slice(3),t=t.slice(0,11)+","+t.slice(11)),t}export{n as a,r as d,a as f};