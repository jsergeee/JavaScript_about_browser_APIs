const apiKey = "6wsV_z7JZwhQqRGpKlqJbfH-JcF3hbYWVE1C-7nl4DI";
const photoElement = document.getElementById("photo");
const photographerElement = document.getElementById("photographer");
const likeButton = document.getElementById("likeButton");
const likeCountElement = document.getElementById("likeCount");
const historyElement = document.getElementById("history");

let likeCount = localStorage.getItem("likeCount")
  ? parseInt(localStorage.getItem("likeCount"))
  : 0;
let photoHistory = JSON.parse(localStorage.getItem("photoHistory")) || [];

function updateLikeCount() {
  likeCountElement.textContent = likeCount;
  localStorage.setItem("likeCount", likeCount);
}

function addToHistory(photoUrl) {
  photoHistory.push(photoUrl);
  localStorage.setItem("photoHistory", JSON.stringify(photoHistory));
  renderHistory();
}

function renderHistory() {
  historyElement.innerHTML = "";
  photoHistory.forEach((url) => {
    const li = document.createElement("li");
    li.textContent = url;
    historyElement.appendChild(li);
  });
}

likeButton.addEventListener("click", () => {
  likeCount++;
  updateLikeCount();
});

async function fetchRandomPhoto() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${apiKey}`
  );
  const data = await response.json();

  photoElement.src = data.urls.regular;
  photographerElement.textContent = `Фото от: ${data.user.name}`;

  addToHistory(data.urls.regular);
}

document.addEventListener("DOMContentLoaded", () => {
  updateLikeCount();
  fetchRandomPhoto();
  renderHistory();
});
