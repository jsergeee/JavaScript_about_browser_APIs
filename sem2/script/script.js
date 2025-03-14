const images = [];
let currentIndex = 0;

const sliderImage = document.getElementById("slider-image");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const indicatorsContainer = document.querySelector(".indicators");

// Функция для получения случайных изображений
async function fetchRandomImage() {
  const apiKey = "6wsV_z7JZwhQqRGpKlqJbfH-JcF3hbYWVE1C-7nl4DI";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const data = await response.json();
    images.push(data.urls.regular);
    updateSlider();
  } catch (error) {
    console.error("Ошибка при получении изображения:", error);
  }
}

// Функция для обновления слайдера
function updateSlider() {
  sliderImage.src = images[currentIndex];
  updateIndicators();
}

// Функция для обновления индикаторов
function updateIndicators() {
  indicatorsContainer.innerHTML = ""; // Очищаем индикаторы
  images.forEach((_, index) => {
    const indicator = document.createElement("span");
    indicator.classList.add("indicator");
    indicator.setAttribute("data-index", index);
    indicator.classList.toggle("active", index === currentIndex);

    indicator.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });

    indicatorsContainer.appendChild(indicator);
  });
}

// Обработчики событий для кнопок
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  if (currentIndex === 0) {
    fetchRandomImage(); // Загружаем новое изображение, если мы вернулись к первому
  } else {
    updateSlider();
  }
});

// Инициализация слайдера с первым изображением
fetchRandomImage();
