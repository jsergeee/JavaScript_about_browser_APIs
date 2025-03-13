// Пример данных в формате JSON
const classesData = [
  {
    title: "Йога",
    time: "10:00",
    maxParticipants: 15,
    currentParticipants: 10,
  },
  {
    title: "Пилатес",
    time: "11:30",
    maxParticipants: 12,
    currentParticipants: 12,
  },
  {
    title: "Аэробика",
    time: "13:00",
    maxParticipants: 20,
    currentParticipants: 5,
  },
];

// Функция для отображения занятий
function displayClasses() {
  const scheduleDiv = $("#schedule");
  scheduleDiv.empty(); // Очищаем область для новых данных

  classesData.forEach((classItem, index) => {
    const isFull = classItem.currentParticipants >= classItem.maxParticipants;
    const buttonText = isFull ? "Записаться (полный)" : "Записаться";
    const buttonClass = isFull ? "btn-secondary" : "btn-primary";

    const classHtml = `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${classItem.title}</h5>
                    <p class="card-text">Время: ${classItem.time}</p>
                    <p class="card-text">Максимум участников: ${
                      classItem.maxParticipants
                    }</p>
                    <p class="card-text">Записанные участники: ${
                      classItem.currentParticipants
                    }</p>
                    <button class="btn ${buttonClass}" ${
      isFull ? "disabled" : ""
    } onclick="register(${index})">${buttonText}</button>
                    <button class="btn btn-danger ml-2" onclick="cancel(${index})" ${
      classItem.currentParticipants === 0 ? "disabled" : ""
    }>Отменить запись</button>
                </div>
            </div>
        `;
    scheduleDiv.append(classHtml);
  });
}

// Функция для записи на занятие
function register(index) {
  if (
    classesData[index].currentParticipants < classesData[index].maxParticipants
  ) {
    classesData[index].currentParticipants++;
    displayClasses(); // Обновляем отображение
  }
}

// Функция для отмены записи
function cancel(index) {
  if (classesData[index].currentParticipants > 0) {
    classesData[index].currentParticipants--;
    displayClasses(); // Обновляем отображение
  }
}

// Инициализация страницы
$(document).ready(function () {
  displayClasses();
});
