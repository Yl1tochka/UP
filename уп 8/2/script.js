const root = document.querySelector(":root");
const button = document.querySelector("#themeToggle");

button.addEventListener('click', () => {
  event.preventDefault();
  root.classList.toggle('dark');
  if (themeToggle.textContent === "Перейти на темную сторону") {
    themeToggle.textContent = "Перейти на светлое пиво"
  }else{
    themeToggle.textContent = "Перейти на темную сторону"
  }
});


