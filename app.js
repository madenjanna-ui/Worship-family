const firstScene = document.querySelector(".scene-one");
const secondScene = document.querySelector(".scene-two");
const intro = document.getElementById("intro");
const continueBtn = document.getElementById("continueBtn");

/*
  Последовательность:
  1. При входе показывается пейзаж без людей.
  2. Через несколько секунд появляется иллюстрация с людьми.
  3. Затем поверх неё появляется тема и кнопка.
*/

const FIRST_SCENE_TIME = 2800;
const SECOND_SCENE_TIME = 2400;

window.addEventListener("load", () => {
  setTimeout(() => {
    firstScene.classList.remove("active");
    secondScene.classList.add("active");

    setTimeout(() => {
      intro.classList.add("visible");
    }, SECOND_SCENE_TIME);
  }, FIRST_SCENE_TIME);
});

continueBtn.addEventListener("click", () => {
  // Пока только переход-заготовка.
  // Следующим этапом здесь откроем страницу содержания
  // в том же интерактивном буклете.
  alert("Содержание добавим следующим этапом.");
});
