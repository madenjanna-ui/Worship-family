const firstScene = document.querySelector(".scene-one");
const secondScene = document.querySelector(".scene-two");
const intro = document.getElementById("intro");
const continueBtn = document.getElementById("continueBtn");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const FIRST_SCENE_TIME = 2800;
const SECOND_SCENE_TIME = 2400;

let musicStarted = false;

async function startMusic() {
  if (musicStarted) return;

  try {
    bgMusic.volume = 0.22;
    await bgMusic.play();
    musicStarted = true;
    musicToggle.classList.add("playing");
    musicIcon.textContent = "♫";
  } catch {
    // Mobile Safari may require a direct user gesture.
  }
}

function stopMusic() {
  bgMusic.pause();
  musicToggle.classList.remove("playing");
  musicIcon.textContent = "♪";
}

musicToggle.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try {
      bgMusic.volume = 0.22;
      await bgMusic.play();
      musicStarted = true;
      musicToggle.classList.add("playing");
      musicIcon.textContent = "♫";
    } catch {}
  } else {
    stopMusic();
  }
});

window.addEventListener("load", () => {
  // Desktop browsers may allow autoplay. If not, the first tap will start it.
  startMusic();

  setTimeout(() => {
    firstScene.classList.remove("active");
    secondScene.classList.add("active");

    setTimeout(() => {
      intro.classList.add("visible");
    }, SECOND_SCENE_TIME);
  }, FIRST_SCENE_TIME);
});

// First user interaction starts the music on iPhone/iPad.
document.addEventListener("pointerdown", () => {
  startMusic();
}, { once: true });

continueBtn.addEventListener("click", () => {
  // Следующим этапом здесь откроем содержание
  // в том же интерактивном буклете.
});
