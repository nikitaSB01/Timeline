const validateCoordinates = require("./validateCoordinates");

// Получение ссылки на элементы
const postInput = document.getElementById("postInput");
const coordinateModal = document.getElementById("coordinateModal");
const okButton = document.getElementById("okButton");
const cancelButton = document.getElementById("cancelButton");
const coordinatesInput = document.getElementById("coordinatesInput");

// Функция для запроса координат
function requestCoordinates() {
  const postText = postInput.value.trim();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        addPostWithCoordinates(postText, latitude, longitude);
        postInput.value = "";
      },
      () => {
        coordinateModal.style.display = "flex";
      }
    );
  } else {
    alert("Geolocation не поддерживается вашим браузером");
  }
}

// Функция для добавления поста с текстом
function addPostWithCoordinates(text, latitude, longitude) {
  const post = document.createElement("div");
  post.classList.add("post");

  const now = new Date();
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  post.innerHTML = `
      <div class="post__header">
        <span class="post__date">${formattedDate}</span>
      </div>
      <p class="p post__text">${text}</p>
      <p class="p post__geo">[${latitude}, ${longitude}]</p>
    `;

  document.querySelector(".container__posts").prepend(post);
}

// Обработка нажатия Enter в поле ввода
postInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && postInput.value.trim() !== "") {
    requestCoordinates();
  }
});

// Обработка кнопки ОК в модальном окне
okButton.addEventListener("click", () => {
  const coords = coordinatesInput.value.trim();
  try {
    const { latitude, longitude } = validateCoordinates(coords);
    addPostWithCoordinates(postInput.value, latitude, longitude);
    coordinateModal.style.display = "none";
    postInput.value = "";
  } catch (error) {
    alert(error.message);
  }
});

// Обработка кнопки Отмена в модальном окне
cancelButton.addEventListener("click", () => {
  coordinateModal.style.display = "none";
});

//! ......... ЛОГИКА ДЛЯ ЗАПИСИ ВИДЕО .......

const modalVideo = document.getElementById("videoRecordingModal");
const videoRecordButton = document.getElementById("videoRecordButton");
const stopVideoRecordingButton = document.getElementById(
  "stopVideoRecordingButton"
);
const videoElement = modalVideo.querySelector("video");

let mediaRecorder;
let videoChunks = [];
let stream;

// Функция для добавления видео в пост
function addPostWithVideo(videoBlob, latitude, longitude) {
  const videoUrl = URL.createObjectURL(videoBlob);
  const post = document.createElement("div");
  post.classList.add("post");
  post.classList.add("post__video");

  const now = new Date();
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  post.innerHTML = `
        <div class="post__header">
          <span class="post__date">${formattedDate}</span>
        </div>
        <video controls class="videoPlayer" src="${videoUrl}">
        </video>
        <p class="p post__geo">[${latitude}, ${longitude}]</p>
      `;

  document.querySelector(".container__posts").prepend(post);
}

// Начало записи видео
videoRecordButton.addEventListener("click", async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true, // Включаем запись звука
  });
  mediaRecorder = new MediaRecorder(stream);
  videoChunks = [];

  // Отобразить видео в реальном времени в модальном окне без звука
  videoElement.srcObject = stream;
  videoElement.muted = true; // Отключаем звук для отображения в реальном времени
  videoElement.play();

  modalVideo.style.display = "flex"; // Показать модальное окно записи видео

  mediaRecorder.addEventListener("dataavailable", (event) => {
    videoChunks.push(event.data);
  });

  mediaRecorder.start();

  stopVideoRecordingButton.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    mediaRecorder.onstop = async () => {
      const videoBlob = new Blob(videoChunks, { type: "video/mp4" });

      // Запрашиваем координаты и добавляем пост
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          addPostWithVideo(videoBlob, latitude, longitude);
          modalVideo.style.display = "none";
        },
        () => {
          addPostWithVideo(videoBlob, "Неизвестная", "локация");
          modalVideo.style.display = "none";
        }
      );

      // Остановить поток камеры и очистить источник видео
      stream.getTracks().forEach((track) => track.stop());
      videoElement.srcObject = null;
    };
  });
});

//! ......... ЛОГИКА ДЛЯ ЗАПИСИ АУДИО .......

const modalAudio = document.getElementById("audioRecordingModal");
const audioRecordButton = document.getElementById("audioRecordButton");
const stopAudioRecordingButton = document.getElementById(
  "stopAudioRecordingButton"
);
const recordingIndicator = modalAudio.querySelector(".recording-indicator");

let audioChunks = [];
let audioStream;

// Функция для добавления аудио в пост
function addPostWithAudio(audioBlob, latitude, longitude) {
  const audioUrl = URL.createObjectURL(audioBlob);
  const post = document.createElement("div");
  post.classList.add("post");

  const now = new Date();
  const formattedDate = now.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  post.innerHTML = `
        <div class="post__header">
          <span class="post__date">${formattedDate}</span>
        </div>
        <audio controls src="${audioUrl}"></audio>
        <p class="p post__geo">[${latitude}, ${longitude}]</p>
      `;

  document.querySelector(".container__posts").prepend(post);
}

// Начало записи аудио
audioRecordButton.addEventListener("click", async () => {
  audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(audioStream);
  audioChunks = [];

  // Показать индикатор записи
  recordingIndicator.style.display = "block";

  modalAudio.style.display = "flex"; // Показать модальное окно записи аудио

  mediaRecorder.addEventListener("dataavailable", (event) => {
    audioChunks.push(event.data);
  });

  mediaRecorder.start();

  stopAudioRecordingButton.addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

      // Запрашиваем координаты и добавляем пост
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          addPostWithAudio(audioBlob, latitude, longitude);
          modalAudio.style.display = "none";
          recordingIndicator.style.display = "none"; // Скрыть индикатор после остановки записи
        },
        () => {
          addPostWithAudio(audioBlob, "Неизвестная", "локация");
          modalAudio.style.display = "none";
          recordingIndicator.style.display = "none"; // Скрыть индикатор после остановки записи
        }
      );

      // Остановить поток микрофона и скрыть индикатор записи
      audioStream.getTracks().forEach((track) => track.stop());
    };
  });
});
