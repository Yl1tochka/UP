// Стоимость по умолчанию для разных параметров
const basePrices = {
  style: {
    'Современный стиль': 10000,
    'Кухни Лофт': 12000,
    'Классический стиль': 15000,
    'Другое': 8000,
  },
  form: {
    'Прямая кухня': 5000,
    'Угловая кухня': 7000,
    'П-образная кухня': 9000,
    'Параллельная кухня': 8000,
    'Кухня с островом': 12000,
    'Другие формы': 6000,
  },
  area: {
    'До 5 м²': 3000,
    'До 8 м²': 5000,
    'До 15 м²': 8000,
    'Другое': 10000,
  }
};

let selectedStyle = '';
let selectedForm = '';
let selectedArea = '';

// Выбор стиля
document.querySelectorAll('.image-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.image-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    selectedStyle = item.querySelector('p').textContent;
  });
});

// Выбор формы
document.querySelectorAll('.form-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.form-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    selectedForm = item.querySelector('p').textContent;
  });
});

// Выбор площади
document.querySelectorAll('.area-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.area-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedArea = btn.textContent;
  });
});

// Обработка клика на "Рассчитать"
document.querySelector('.calculate-btn').addEventListener('click', () => {
  const phone = document.querySelector('.phone-input').value.trim();

  if (!phone) {
    alert('Введите номер телефона');
    return;
  }

  if (!selectedStyle || !selectedForm || !selectedArea) {
    alert('Выберите все параметры перед расчетом');
    return;
  }

  // Расчет общей стоимости
  const totalCost = (
    basePrices.style[selectedStyle] +
    basePrices.form[selectedForm] +
    basePrices.area[selectedArea]
  );

  // Отображение результата в модальном окне
  const resultModal = document.getElementById('result-modal');
  const totalCostElement = document.getElementById('total-cost');

  totalCostElement.textContent = `${totalCost.toLocaleString()} ₽`;
  resultModal.classList.remove('hidden');

  // Закрытие модального окна
  document.querySelector('.close-btn').addEventListener('click', () => {
    resultModal.classList.add('hidden');
  });
});

// Функция для управления активным состоянием кнопок
function setActiveButton(containerClass, activeClass = 'active') {
  const items = document.querySelectorAll(containerClass);

  items.forEach(item => {
    item.addEventListener('click', () => {
      // Удаляем active у всех элементов в контейнере
      items.forEach(i => i.classList.remove(activeClass));
      // Добавляем active текущему элементу
      item.classList.add(activeClass);
    });
  });
}

// Применяем к нужным группам кнопок
setActiveButton('.image-item');
setActiveButton('.form-item');
setActiveButton('.area-btn');