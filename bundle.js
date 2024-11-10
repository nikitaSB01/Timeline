/*! For license information please see bundle.js.LICENSE.txt */
!function(){var e={25:function(e,t,n){const o=n(944),i=document.getElementById("postInput"),a=document.getElementById("coordinateModal"),s=document.getElementById("okButton"),d=document.getElementById("cancelButton"),c=document.getElementById("coordinatesInput");function r(e,t,n){const o=document.createElement("div");o.classList.add("post");const i=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});o.innerHTML=`\n      <div class="post__header">\n        <span class="post__date">${i}</span>\n      </div>\n      <p class="p post__text">${e}</p>\n      <p class="p post__geo">[${t}, ${n}]</p>\n    `,document.querySelector(".container__posts").prepend(o)}i.addEventListener("keypress",(e=>{"Enter"===e.key&&""!==i.value.trim()&&function(){const e=i.value.trim();navigator.geolocation?navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;r(e,n,o),i.value=""}),(()=>{a.style.display="flex"})):alert("Geolocation не поддерживается вашим браузером")}()})),s.addEventListener("click",(()=>{const e=c.value.trim();try{const{latitude:t,longitude:n}=o(e);r(i.value,t,n),a.style.display="none",i.value=""}catch(e){alert(e.message)}})),d.addEventListener("click",(()=>{a.style.display="none"}));const l=document.getElementById("videoRecordingModal"),u=document.getElementById("videoRecordButton"),p=document.getElementById("stopVideoRecordingButton"),g=l.querySelector("video");let y,m,v=[];function _(e,t,n){const o=URL.createObjectURL(e),i=document.createElement("div");i.classList.add("post"),i.classList.add("post__video");const a=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});i.innerHTML=`\n        <div class="post__header">\n          <span class="post__date">${a}</span>\n        </div>\n        <video controls class="videoPlayer" src="${o}">\n        </video>\n        <p class="p post__geo">[${t}, ${n}]</p>\n      `,document.querySelector(".container__posts").prepend(i)}u.addEventListener("click",(async()=>{m=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),y=new MediaRecorder(m),v=[],g.srcObject=m,g.muted=!0,g.play(),l.style.display="flex",y.addEventListener("dataavailable",(e=>{v.push(e.data)})),y.start(),p.addEventListener("click",(()=>{y&&"recording"===y.state&&y.stop(),y.onstop=async()=>{const e=new Blob(v,{type:"video/mp4"});navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;_(e,n,o),l.style.display="none"}),(()=>{_(e,"Неизвестная","локация"),l.style.display="none"})),m.getTracks().forEach((e=>e.stop())),g.srcObject=null}}))}));const E=document.getElementById("audioRecordingModal"),f=document.getElementById("audioRecordButton"),L=document.getElementById("stopAudioRecordingButton"),B=E.querySelector(".recording-indicator");let h,R=[];function I(e,t,n){const o=URL.createObjectURL(e),i=document.createElement("div");i.classList.add("post");const a=(new Date).toLocaleString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});i.innerHTML=`\n        <div class="post__header">\n          <span class="post__date">${a}</span>\n        </div>\n        <audio controls src="${o}"></audio>\n        <p class="p post__geo">[${t}, ${n}]</p>\n      `,document.querySelector(".container__posts").prepend(i)}f.addEventListener("click",(async()=>{h=await navigator.mediaDevices.getUserMedia({audio:!0}),y=new MediaRecorder(h),R=[],B.style.display="block",E.style.display="flex",y.addEventListener("dataavailable",(e=>{R.push(e.data)})),y.start(),L.addEventListener("click",(()=>{y&&"recording"===y.state&&y.stop(),y.onstop=async()=>{const e=new Blob(R,{type:"audio/mp3"});navigator.geolocation.getCurrentPosition((t=>{const{latitude:n,longitude:o}=t.coords;I(e,n,o),E.style.display="none",B.style.display="none"}),(()=>{I(e,"Неизвестная","локация"),E.style.display="none",B.style.display="none"})),h.getTracks().forEach((e=>e.stop()))}}))}))},944:function(e){e.exports=function(e){const t=e.replace(/[\[\]\s]/g,""),[n,o]=t.split(",");if(!n||isNaN(n)||!o||isNaN(o))throw new Error("Некорректный формат координат");return{latitude:parseFloat(n),longitude:parseFloat(o)}}}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";n(25)}()}();
//# sourceMappingURL=bundle.js.map