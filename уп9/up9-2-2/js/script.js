
  // Базовые тарифы за квадратный метр для каждого типа уборки (в ₽)
  const baseRates = {
    standard: 150,
    deep: 250,
    postconstruction: 350,
    office: 200
  };

  // Коэффициенты для срочности
  const urgencyMultiplier = {
    standard: 1,
    express: 1.2
  };

  // Функция форматирования числа в денежный формат ₽ с пробелами
  function formatRUB(amount) {
    return amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });
  }

  // Основная функция расчета стоимости
  function calculateCleaningCost(area, cleaningType, urgency) {
    const rate = baseRates[cleaningType];
    const multiplier = urgencyMultiplier[urgency];
    if (!rate || !multiplier || area <= 0) return null;

    // Расчет стоимости
    const cost = area * rate * multiplier;
    return cost;
  }

  // Обработка формы
  document.getElementById('cleaningForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const areaInput = parseFloat(this.area.value);
    const cleaningType = this.cleaningType.value;
    const urgency = this.urgency.value;

    // Валидация
    if (isNaN(areaInput) || areaInput <= 0) {
      showResult('Пожалуйста, введите корректную площадь.');
      return;
    }
    if (!cleaningType) {
      showResult('Пожалуйста, выберите тип клининга.');
      return;
    }
    if (!urgency) {
      showResult('Пожалуйста, выберите срочность выполнения.');
      return;
    }

    const totalCost = calculateCleaningCost(areaInput, cleaningType, urgency);
    if (totalCost === null) {
      showResult('Ошибка при расчете стоимости.');
      return;
    }

    showResult(`Стоимость клининга Loan: <strong>${formatRUB(totalCost)}</strong>`);
  });

  // Вывод результата
  function showResult(message) {
    const resultEl = document.getElementById('result');
    resultEl.innerHTML = message;
  }
