const validateCoordinates = require("./validateCoordinates");

// Получение ссылки на элементы
const postInput = document.getElementById("postInput");
const coordinateModal = document.getElementById("coordinateModal");
const okButton = document.getElementById("okButton");
const cancelButton = document.getElementById("cancelButton");
const coordinatesInput = document.getElementById("coordinatesInput");

// Функция для запроса координат
function requestCoordinates() {
  const postText = postInput.value.trim(); // Сохраняем текст перед очисткой поля
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        addPostWithCoordinates(postText, latitude, longitude);
        postInput.value = ""; // Очистка поля ввода после добавления поста
      },
      () => {
        // Показать модальное окно при ошибке
        coordinateModal.style.display = "flex";
      }
    );
  } else {
    alert("Geolocation не поддерживается вашим браузером");
  }
}

// Функция для добавления поста
// Функция для добавления поста
function addPostWithCoordinates(text, latitude, longitude) {
  const post = document.createElement("div");
  post.classList.add("post");

  // Получение текущей даты и времени
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
    postInput.value = ""; // Очистка поля ввода после добавления поста
  } catch (error) {
    alert(error.message);
  }
});

// Обработка кнопки Отмена в модальном окне
cancelButton.addEventListener("click", () => {
  coordinateModal.style.display = "none";
});

//? ......... ДОБОВЛЯЕМ ЛОГИКУ АУДИО/ВИДЕО .......
