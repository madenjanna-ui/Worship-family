const firstScene = document.querySelector(".scene-one");
const secondScene = document.querySelector(".scene-two");
const intro = document.getElementById("intro");
const continueBtn = document.getElementById("continueBtn");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

const cover = document.getElementById("cover");
const booklet = document.getElementById("booklet");
const headerHome = document.getElementById("headerHome");

const panels = [...document.querySelectorAll(".panel")];
const menuButtons = [...document.querySelectorAll(".menu-card")];

const codeInput = document.getElementById("codeInput");
const openCodeBtn = document.getElementById("openCodeBtn");
const codeMessage = document.getElementById("codeMessage");
const topicResult = document.getElementById("topicResult");

const leaderProgress = document.getElementById("leaderProgress");
const leaderContent = document.getElementById("leaderContent");
const leaderPrev = document.getElementById("leaderPrev");
const leaderNext = document.getElementById("leaderNext");

const FIRST_SCENE_TIME = 2800;
const SECOND_SCENE_TIME = 2400;

let musicStarted = false;

/* =========================================
   МАТЕРИАЛЫ ИССЛЕДОВАНИЯ
   ========================================= */

const researchSets = {
  "01": {
    years: ["2020"],
    topics: [
      ["Как «праведный может упасть» (Пр 24:16)", "w20.12 15"],
      ["Когда новое соглашение было утверждено и когда оно было введено в действие", "w20.07 31"],
      ["Нашествие саранчи (Ил 1, 2)", "w20.04 2—7"],
      ["Освящение Божьего имени", "w23.08 18—19; w20.06 3"],
      ["Плод Божьего духа (Гл 5:22, 23)", "w20.06 17"],
      ["Рыбаки и охотники (Иер 16:16, 18)", "w20.04 5—6"],
      ["Цари северный и южный (Дан 11, 12)", "w20.05 2—5, 12—16"]
    ]
  },

  "02": {
    years: ["2021"],
    topics: [
      ["Высказывание Павла: «соблюдая закон, я умер для закона» (Гл 2:19)", "w21.06 31"],
      ["«Сотрясение» народов приводит к появлению «сокровищ» (Аг 2:7)", "w21.09 14—16; w21.12 15"],
      ["Царь Ахав не раскаялся (1Цр 21:19—29; 2Лт 19:1, 2)", "w21.10 3"]
    ]
  },

  "03": {
    years: ["2022"],
    topics: [
      ["Воскресение, чтобы получить жизнь, чтобы предстать перед судом (Ин 5:29)", "w22.09 14, 17—18, 26"],
      ["Воскресение «многих из мертвых» (Дан 12:2)", "w22.09 21—22"],
      ["Двурогий зверь, который «посылает огонь с неба на землю» (Отк 13:13)", "w22.05 10"],
      ["К чему приводит брак после развода без библейского основания", "w22.04 30—31"],
      ["Павел о себе как о «родившемся раньше срока» (1Кр 15:8)", "w22.09 27"],
      ["«Те, кто помогают многим стать праведными» (Дан 12:3)", "w22.09 22"]
    ]
  },

  "04": {
    years: ["2023", "2026"],
    topics: [
      ["Выход из Великого Вавилона подготовлен (Иса 57:14)", "w23.05 16—17"],
      ["Провозглашение «мира и безопасности» (1Фс 5:3) может произойти либо до, либо после уничтожения ложной религии", "w26.02 30—31"]
    ]
  },

  "05": {
    years: ["2024"],
    topics: [
      ["Воскресение жителей Содома и Гоморры", "w24.05 2—3, 5—6"],
      ["Воскресение кого-то из погибших в потопе, среди семи ханаанских народов и 185 000 ассирийских воинов", "w24.05 3"],
      ["Воскресение неправедных (Де 24:15)", "w24.05 2—7, 10—11"],
      ["Воскресение Соломона", "w24.05 4; w24.12 31"],
      ["Высота притвора в храме Соломона", "w24.10 31; w24.12 31"],
      ["Держать на замечании — личное решение (2Фс 3:14)", "w24.08 7"],
      ["Динарий, выплаченный работникам, которые работали всего один час (Мф 20:1—16)", "w24.09 24"],
      ["Исключение из собрания стали называть удалением из собрания (1Кр 5:13)", "w24.08 27"],
      ["Один будет взят, а другой оставлен (Мф 24:40, 41)", "w24.09 24"],
      ["Положение людей во время великого бедствия", "w24.05 8—13"],
      ["Помощь тем, кто удален из собрания", "w24.08 27"],
      ["Предвидение Иеговы", "w24.02 30"],
      ["Применение 2 Иоанна 9—11", "w24.08 31"],
      ["Христианин может стать духовно незрелым", "w24.04 6—7"]
    ]
  },

  "06": {
    years: ["2025"],
    topics: [
      ["Когда дело проповеди «радостной вести о Царстве» прекратится (Мф 24:14)", "w25.08 31"],
      ["«Мысль», которую Бог вложит в сердце правителей (Отк 17:16, 17)", "w25.11 31"],
      ["«Путь мужчины к девушке» (Пр 30:18, 19)", "w25.09 31"],
      ["Связь между подобной сильному граду вестью (Отк 16:21) и проповедью радостной вести о Царстве (Мф 24:14)", "w25.08 31"],
      ["Сексуальные отношения в браке", "w25.01 13"]
    ]
  }
};

/*
  Двузначные коды 01—06 открывают соответствующий блок.
  Код ведущего 99 открывает все блоки один за другим.
  Имена участников намеренно НЕ привязаны к кодам на общей странице.
*/
const participantCodes = {
  "47": "01", // Жанна
  "12": "02", // Иван
  "83": "03", // Светлана
  "26": "04", // Ирина
  "61": "05", // Матвей
  "35": "06", // Ева
  "740": "ALL" // Денис — все блоки
};

const leaderCode = "099";
const leaderSets = Object.values(researchSets);
let leaderIndex = 0;

/* =========================================
   МУЗЫКА
   ========================================= */

async function startMusic() {
  if (musicStarted) return;

  try {
    bgMusic.volume = 0.15;
    await bgMusic.play();
    musicStarted = true;
    musicToggle.classList.add("playing");
    musicIcon.textContent = "♫";
  } catch {
    // На iPhone автозапуск может быть запрещён до первого касания.
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


/* =========================================
   ПЕСНЯ
   ========================================= */

const songAudio = document.getElementById("songAudio");
const songPlayBtn = document.getElementById("songPlayBtn");
const songProgress = document.getElementById("songProgress");
const songCurrent = document.getElementById("songCurrent");
const songDuration = document.getElementById("songDuration");
const lyricsToggle = document.getElementById("lyricsToggle");
const lyricsBox = document.getElementById("lyricsBox");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

songPlayBtn.addEventListener("click", async () => {
  // При запуске песни для пения останавливаем фоновую музыку,
  // чтобы две дорожки не звучали одновременно.
  const bgAudio =
    document.getElementById("backgroundMusic") ||
    document.getElementById("bgMusic") ||
    document.querySelector('audio[data-background-music]') ||
    document.querySelector('audio[src*="Peaceful"]');

  if (songAudio.paused) {
    try {
      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        bgAudio.dataset.pausedForSong = "true";
      }
      await songAudio.play();
    } catch {}
  } else {
    songAudio.pause();
  }
});

songAudio.addEventListener("play", () => {
  songPlayBtn.textContent = "Ⅱ";
});

songAudio.addEventListener("pause", () => {
  songPlayBtn.textContent = "▶";
});

songAudio.addEventListener("ended", () => {
  const bgAudio =
    document.getElementById("backgroundMusic") ||
    document.getElementById("bgMusic") ||
    document.querySelector('audio[data-background-music]') ||
    document.querySelector('audio[src*="Peaceful"]');

  if (bgAudio && bgAudio.dataset.pausedForSong === "true") {
    delete bgAudio.dataset.pausedForSong;
    bgAudio.play().catch(() => {});
  }
});

songAudio.addEventListener("loadedmetadata", () => {
  songDuration.textContent = formatTime(songAudio.duration);
});

songAudio.addEventListener("timeupdate", () => {
  songCurrent.textContent = formatTime(songAudio.currentTime);
  if (songAudio.duration) {
    songProgress.value = (songAudio.currentTime / songAudio.duration) * 100;
  }
});

songProgress.addEventListener("input", () => {
  if (songAudio.duration) {
    songAudio.currentTime = (Number(songProgress.value) / 100) * songAudio.duration;
  }
});

lyricsToggle.addEventListener("click", () => {
  lyricsBox.hidden = !lyricsBox.hidden;
  lyricsToggle.textContent = lyricsBox.hidden
    ? "📜 Показать слова"
    : "📕 Скрыть слова";
});

/* =========================================
   ПЕРЕХОД: ОБЛОЖКА → БУКЛЕТ
   ========================================= */

window.addEventListener("load", () => {
  startMusic();

  setTimeout(() => {
    firstScene.classList.remove("active");
    secondScene.classList.add("active");

    setTimeout(() => {
      intro.classList.add("visible");
    }, SECOND_SCENE_TIME);
  }, FIRST_SCENE_TIME);
});

document.addEventListener("pointerdown", () => {
  startMusic();
}, { once: true });

continueBtn.addEventListener("click", () => {
  openBooklet("menuPanel");
});

function openBooklet(panelId = "menuPanel") {
  cover.hidden = true;
  booklet.hidden = false;
  showPanel(panelId);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showCover() {
  booklet.hidden = true;
  cover.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

headerHome.addEventListener("click", showCover);

/* =========================================
   НАВИГАЦИЯ БУКЛЕТА
   ========================================= */

function showPanel(panelId) {
  panels.forEach(panel => {
    panel.classList.toggle("active", panel.id === panelId);
  });

  if (panelId === "myTopicPanel") {
    setTimeout(() => codeInput.focus(), 50);
  }

  if (panelId === "leaderPanel") {
    renderLeader();
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

menuButtons.forEach(button => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const panel = button.dataset.panel;

    if (action === "home") {
      showCover();
      return;
    }

    if (panel) showPanel(panel);
  });
});

document.querySelectorAll('[data-action="menu"]').forEach(button => {
  button.addEventListener("click", () => showPanel("menuPanel"));
});

/* =========================================
   ПЕРСОНАЛЬНАЯ ТЕМА ПО КОДУ
   ========================================= */

function renderTopics(set, isLeader = false) {
  const years = set.years.length > 1 ? set.years.join(" + ") : set.years[0];

  const topicsHtml = set.topics.map(([title, ref], index) => `
    <article class="topic-item">
      <div class="topic-number">${index + 1}</div>
      <div class="topic-body">
        <div class="topic-name">${title}</div>
        <div class="topic-ref">${ref}</div>
      </div>
    </article>
  `).join("");

  return `
    <div class="topic-heading">
      <div class="topic-badge">💎</div>
      <div>
        <h3>${isLeader ? "Исследование" : "Твоё исследование"}</h3>
        <div class="year-note">Уточнение в понимании за ${years} год</div>
      </div>
    </div>

    <p class="topic-intro">
      ${isLeader
        ? "Материалы этого блока."
        : "Ниже полностью приведены все темы, которые входят в твоё задание. Можно исследовать все темы или выбрать избирательно — одну или несколько, которые особенно заинтересовали или впечатлили."}
    </p>

    <div class="topics-list">${topicsHtml}</div>

    <div class="topic-guidance">
      <strong>Подготовь свой рассказ</strong>
      <p>Вопросы приблизительные — они просто помогут задать правильный вектор:</p>
      <ul class="question-list">
        <li>Что я узнал?</li>
        <li>Что меня особенно впечатлило?</li>
        <li>Что это показывает об Иегове?</li>
        <li>Как я могу применить это в жизни?</li>
      </ul>
    </div>
  `;
}


function renderAllTopics() {
  return `
    <div class="topic-heading">
      <div class="topic-badge">💎</div>
      <div>
        <h3>Все материалы</h3>
        <div class="year-note">2020 → 2021 → 2022 → 2023 + 2026 → 2024 → 2025</div>
      </div>
    </div>
    <p class="topic-intro">
      Здесь собраны все темы из библиотеки. Можно исследовать все темы
      или выбирать избирательно — то, что особенно заинтересовало или впечатлило.
    </p>
    ${leaderSets.map((set, i) => `
      <div class="all-year-block">
        <div class="all-year-title">${set.years.join(" + ")}</div>
        ${set.topics.map(([title, ref], index) => `
          <article class="topic-item">
            <div class="topic-number">${index + 1}</div>
            <div class="topic-body">
              <div class="topic-name">${title}</div>
              <div class="topic-ref">${ref}</div>
            </div>
          </article>
        `).join("")}
      </div>
    `).join("")}
    <div class="topic-guidance">
      <strong>Подготовь свой рассказ</strong>
      <p>Вопросы приблизительные — они просто помогут задать правильный вектор:</p>
      <ul class="question-list">
        <li>Что я узнал?</li>
        <li>Что меня особенно впечатлило?</li>
        <li>Что это показывает об Иегове?</li>
        <li>Как я могу применить это в жизни?</li>
      </ul>
    </div>
  `;
}

function openCode() {
  const code = codeInput.value.trim();

  codeMessage.textContent = "";
  topicResult.hidden = true;
  topicResult.innerHTML = "";

if (!/^\d{2,3}$/.test(code)) {
  codeMessage.textContent = "Введите код.";
  return;
}

  if (code === leaderCode) {
    leaderIndex = 0;
    showPanel("leaderPanel");
    return;
  }

  const assigned = participantCodes[code];

  if (!assigned) {
    codeMessage.textContent = "Такого кода нет. Проверьте код и попробуйте ещё раз.";
    return;
  }

  if (assigned === "ALL") {
    topicResult.innerHTML = renderAllTopics();
  } else {
    const set = researchSets[assigned];
    topicResult.innerHTML = renderTopics(set);
  }

  topicResult.hidden = false;
}

openCodeBtn.addEventListener("click", openCode);

codeInput.addEventListener("input", () => {
  codeInput.value = codeInput.value.replace(/\D/g, "").slice(0, 3);
  codeMessage.textContent = "";
});

codeInput.addEventListener("keydown", event => {
  if (event.key === "Enter") openCode();
});

/* =========================================
   РЕЖИМ ВЕДУЩЕГО — 99
   ========================================= */

function renderLeader() {
  const set = leaderSets[leaderIndex];

  leaderProgress.textContent =
    `Блок ${leaderIndex + 1} из ${leaderSets.length} · ${set.years.join(" + ")}`;

  leaderContent.innerHTML = renderTopics(set, true);

  leaderPrev.disabled = leaderIndex === 0;
  leaderNext.disabled = leaderIndex === leaderSets.length - 1;
}

leaderPrev.addEventListener("click", () => {
  if (leaderIndex > 0) {
    leaderIndex--;
    renderLeader();
  }
});

leaderNext.addEventListener("click", () => {
  if (leaderIndex < leaderSets.length - 1) {
    leaderIndex++;
    renderLeader();
  }
});


