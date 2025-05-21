(() => {
  const form = document.getElementById("cleaning-form");
  const resultEl = document.getElementById("result");

  // Базовые цены за м² в рублях в зависимости от типа уборки
  const baseRates = {
    regular: 100,
    general: 180,
    afterRepair: 250,
    office: 150,
  };

  // Дополнительные услуги и их фиксированная цена (руб)
  const extraServicesPrices = {
    windows: 1500,
    balcony: 1200,
    fridge: 800,
    oven: 700,
    carpet: 2000,
  };

  // Коэффициенты срочности (увеличение стоимости)
  const urgencyMultiplier = {
    standard: 1,
    express: 1.3,
    sameDay: 1.5,
  };

  // Валидация и расчет стоимости
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultEl.textContent = "";
    const area = parseFloat(form.area.value);
    const cleaningType = form["cleaning-type"].value;
    const urgency = form.urgency.value;
    const services = [
      ...form.querySelectorAll('input[name="services"]:checked'),
    ].map((s) => s.value);

    // Валидация площади
    if (isNaN(area) || area < 10 || area > 1000) {
      resultEl.textContent =
        "Пожалуйста, введите корректную площадь от 10 до 1000 м².";
      resultEl.focus();
      return;
    }
    // Валидация типа уборки
    if (!cleaningType || !baseRates.hasOwnProperty(cleaningType)) {
      resultEl.textContent = "Пожалуйста, выберите тип клининга.";
      resultEl.focus();
      return;
    }
    // Валидация срочности
    if (!urgency || !urgencyMultiplier.hasOwnProperty(urgency)) {
      resultEl.textContent = "Пожалуйста, выберите срочность выполнения.";
      resultEl.focus();
      return;
    }

    // Расчет базовой стоимости
    let cost = baseRates[cleaningType] * area;

    // Добавляем стоимость дополнительных услуг
    let extrasCost = 0;
    for (const svc of services) {
      if (extraServicesPrices[svc]) extrasCost += extraServicesPrices[svc];
    }
    cost += extrasCost;

    // Учитываем срочность
    cost *= urgencyMultiplier[urgency];

    // Округляем до рублей
    cost = Math.round(cost);

    // Формируем детализированное сообщение результата
    const baseCostStr =
      (baseRates[cleaningType] * area).toLocaleString("ru-RU") + " ₽";
    const extrasCostStr =
      extrasCost > 0
        ? extrasCost.toLocaleString("ru-RU") + " ₽"
        : "отсутствуют";
    const multiplierStr = urgencyMultiplier[urgency];
    const urgencyStr = {
      standard: "Стандартный срок",
      express: "Экспресс (+30%)",
      sameDay: "В тот же день (+50%)",
    }[urgency];

    resultEl.innerHTML = `
        Итоговая стоимость: <strong>${cost.toLocaleString(
          "ru-RU"
        )} ₽</strong><br/>
        <small>Базовая стоимость (${cleaningType
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}): ${baseCostStr}</small><br/>
        <small>Дополнительные услуги: ${extrasCostStr}</small><br/>
        <small>Срочность: ${urgencyStr} (×${multiplierStr})</small>
      `;
    resultEl.focus();
  });
})();
