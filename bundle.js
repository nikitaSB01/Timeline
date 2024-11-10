/*! For license information please see bundle.js.LICENSE.txt */
!function(){var e={25:function(e,t,n){const o=n(944),i=document.getElementById("postInput"),a=document.getElementById("coordinateModal"),d=document.getElementById("okButton"),s=document.getElementById("cancelButton"),c=document.getElementById("coordinatesInput");let r=!1,l=!1;function u(e,t,n){const o=document.createElement("div");o.classList.add("post");const i=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});o.innerHTML=`\n      <div class="post__header">\n        <span class="post__date">${i}</span>\n      </div>\n      <p class="p post__text">${e}</p>\n      <p class="p post__geo">[${t}, ${n}]</p>\n    `,document.querySelector(".container__posts").prepend(o)}i.addEventListener("keypress",(e=>{"Enter"===e.key&&""!==i.value.trim()&&function(){const e=i.value.trim();navigator.geolocation?navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;u(e,n,o),i.value=""}),(()=>{a.style.display="flex"})):alert("Geolocation не поддерживается вашим браузером")}()})),d.addEventListener("click",(()=>{const e=c.value.trim();try{const{latitude:t,longitude:n}=o(e);u(i.value,t,n),a.style.display="none",i.value=""}catch(e){alert(e.message)}})),s.addEventListener("click",(()=>{a.style.display="none"}));const p=document.getElementById("videoRecordingModal"),y=document.getElementById("videoRecordButton"),g=document.getElementById("stopVideoRecordingButton"),m=p.querySelector("video");let v,E,_=[];function f(e,t,n){const o=URL.createObjectURL(e),i=document.createElement("div");i.classList.add("post"),i.classList.add("post__video");const a=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});i.innerHTML=`\n        <div class="post__header">\n          <span class="post__date">${a}</span>\n        </div>\n        <video controls class="videoPlayer" src="${o}">\n        </video>\n        <p class="p post__geo">[${t}, ${n}]</p>\n      `,document.querySelector(".container__posts").prepend(i)}y.addEventListener("click",(async()=>{function e(){v&&"recording"===v.state&&v.stop(),l=!1,v.onstop=async()=>{const e=new Blob(_,{type:"video/mp4"});navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;f(e,n,o),p.style.display="none"}),(()=>{f(e,"Неизвестная","локация"),p.style.display="none"})),E.getTracks().forEach((e=>e.stop())),m.srcObject=null}}E=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),v=new MediaRecorder(E),_=[],l=!0,m.srcObject=E,m.muted=!0,m.play(),p.style.display="flex",g.focus(),v.addEventListener("dataavailable",(e=>{_.push(e.data)})),v.start(),document.addEventListener("keydown",(t=>{"Enter"===t.key&&l&&e()})),g.addEventListener("click",e)}));const L=document.getElementById("audioRecordingModal"),B=document.getElementById("audioRecordButton"),h=document.getElementById("stopAudioRecordingButton"),k=L.querySelector(".recording-indicator");let R,w=[];function I(e,t,n){const o=URL.createObjectURL(e),i=document.createElement("div");i.classList.add("post");const a=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});i.innerHTML=`\n        <div class="post__header">\n          <span class="post__date">${a}</span>\n        </div>\n        <audio controls src="${o}"></audio>\n        <p class="p post__geo">[${t}, ${n}]</p>\n      `,document.querySelector(".container__posts").prepend(i)}B.addEventListener("click",(async()=>{function e(){v&&"recording"===v.state&&v.stop(),r=!1,v.onstop=async()=>{const e=new Blob(w,{type:"audio/mp3"});navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;I(e,n,o),L.style.display="none",k.style.display="none"}),(()=>{I(e,"Неизвестная","локация"),L.style.display="none",k.style.display="none"})),R.getTracks().forEach((e=>e.stop()))}}R=await navigator.mediaDevices.getUserMedia({audio:!0}),v=new MediaRecorder(R),w=[],r=!0,k.style.display="block",L.style.display="flex",h.focus(),v.addEventListener("dataavailable",(e=>{w.push(e.data)})),v.start(),document.addEventListener("keydown",(t=>{"Enter"===t.key&&r&&e()})),h.addEventListener("click",e)}))},944:function(e){e.exports=function(e){const t=e.replace(/[\[\]\s]/g,""),[n,o]=t.split(",");if(!n||isNaN(n)||!o||isNaN(o))throw new Error("Некорректный формат координат");return{latitude:parseFloat(n),longitude:parseFloat(o)}}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(25)}()}();
//# sourceMappingURL=bundle.js.map