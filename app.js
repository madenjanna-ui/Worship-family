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
    "years": [
      "2020"
    ],
    "topics": [
      [
        "В каком смысле «праведный может упасть» (Пр 24:16)",
        "Вопросы читателей w20.12 с. 15"
      ],
      [
        "Освящение имени Иеговы",
        "Вопросы читателей w23.08 с. 18—19; «Пусть святится твое имя» w20.06 с. 3"
      ],
      [
        "Плод духа Бога",
        "Вопросы читателей w20.06 с. 17"
      ],
      [
        "Саранча (Ил 1; 2)",
        "Нападение с севера w20.04 с. 2—7"
      ],
      [
        "Северный и южный цари",
        "«Северный царь» во время конца w20.05 с. 2—5, абз. 2—10; «Северный царь». Кто он сегодня? w20.05 с. 12—16"
      ],
      [
        "Утверждение и введение в действие нового соглашения",
        "Вопросы читателей w20.07 с. 31, абз. 4—7"
      ],
      [
        "«Рыбаки» и «охотники» (Иер 16:16, 18)",
        "Нападение с севера w20.04 с. 5, абз. 13"
      ]
    ]
  },
  "02": {
    "years": [
      "2021"
    ],
    "topics": [
      [
        "Как Ахав (царь Израиля) «смирил себя» (1Цр 21:29)",
        "Что такое подлинное раскаяние? w21.10 с. 3, абз. 4—7"
      ],
      [
        "Сотрясать народы (Аг 2:7)",
        "«Я сотрясу все народы» w21.09 с. 14—19; Помните ли вы? w21.12 с. 15"
      ],
      [
        "«Я умер для закона» (Гл 2:19)",
        "Вопросы читателей w21.06 с. 31"
      ]
    ]
  },
  "03": {
    "years": [
      "2022"
    ],
    "topics": [
      [
        "Брак после развода без библейского основания",
        "Вопросы читателей w22.04 с. 30—31"
      ],
      [
        "Воскрешены, чтобы предстать перед судом (Ин 5:29)",
        "Вопросы читателей w22.09 с. 26, абз. 3; Записано ли ваше имя в «книге жизни»? w22.09 с. 17—18"
      ],
      [
        "Павел — «родившийся раньше срока» (1Кр 15:8)",
        "Вопросы читателей w22.09 с. 27"
      ],
      [
        "Помочь «многим стать праведными» (Дан 12:3)",
        "Как многие станут праведными? w22.09 с. 22"
      ],
      [
        "«Многие из мёртвых» (Дан 12:2)",
        "Как многие станут праведными? w22.09 с. 21—22, абз. 6—8"
      ],
      [
        "«Огонь с неба» (Отк 13:13)",
        "Враги Бога на страницах книги Откровение w22.05 с. 10, абз. 9"
      ]
    ]
  },
  "04": {
    "years": [
      "2023",
      "2026"
    ],
    "topics": [
      [
        "Ношение бороды",
        "Обращение Руководящего совета № 8 (2023 год) 702023024-1.v"
      ],
      [
        "Подготовка пути из Великого Вавилона (Ис 57:14)",
        "Не сходите со «Святого пути» w23.05 с. 16—17"
      ],
      [
        "Долина, полная сухих костей (Иез 37)",
        "Уточнения в понимании книги Иезекииля rr с. 239; Вопросы читателей w16.03 с. 29, абз. 4—с. 31, абз. 1"
      ],
      [
        "Использование собственной крови",
        "Обращение Руководящего совета № 2 (2026 год) 1112024049-1.v"
      ],
      [
        "Когда будут провозглашены «мир и безопасность» (1Фс 5:3)",
        "Вопросы читателей w26.02 с. 30—31"
      ],
      [
        "«Два соглашения» (Гл 4:24)",
        ""
      ]
    ]
  },
  "05": {
    "years": [
      "2024"
    ],
    "topics": [
      [
        "Воскресение жителей Содома и Гоморры",
        "Доверяйте милосердному «Судье всей земли»! w24.05 с. 2—6, абз. 3—15"
      ],
      [
        "Воскресение неправедных (Де 24:15)",
        "Доверяйте милосердному «Судье всей земли»! w24.05 с. 2—7; Как Иегова будет судить людей во время великого бедствия? w24.05 с. 10—11, абз. 8—10"
      ],
      [
        "Воскресение царя Соломона",
        "Доверяйте милосердному «Судье всей земли»! w24.05 с. 4, абз. 9; Помните ли вы? w24.12 с. 31"
      ],
      [
        "Высота притвора в храме Соломона",
        "Вопросы читателей w24.10 с. 31; Помните ли вы? w24.12 с. 31"
      ],
      [
        "Держать христианина на замечании (2Фс 3:14)",
        "Вопросы читателей w24.08 с. 7"
      ],
      [
        "Как Иегова будет судить людей во время великого бедствия",
        "Как Иегова будет судить людей во время великого бедствия? w24.05 с. 8—13"
      ],
      [
        "Несовершеннолетний, который совершил серьёзный грех",
        "Как проявлять к согрешившим любовь и милосердие w24.08 с. 24, абз. 18; Обращение Руководящего совета № 2 (2024 год) 1112024005-1.v"
      ],
      [
        "Одежда, подходящая для духовных мероприятий",
        "Обращение Руководящего совета № 2 (2024 год) 1112024005-1.v"
      ],
      [
        "Оставаться духовно зрелыми",
        "«Будем стремиться к духовной зрелости» w24.04 с. 6—7, абз. 15—17"
      ],
      [
        "Помазанные христиане",
        "Прислушиваетесь ли вы к предостережениям? w24.09 с. 24"
      ],
      [
        "Помощь тем, кто совершил серьёзный грех",
        "Как проявлять к согрешившим любовь и милосердие w24.08 с. 21—25; Обращение Руководящего совета № 2 (2024 год) 1112024005-1.v"
      ],
      [
        "Приветствие удалённых из собрания (2Ин 9—11)",
        "Как старейшины помогают тем, кто был удалён из собрания w24.08 с. 30—31; Обращение Руководящего совета № 2 (2024 год) 1112024005-1.v"
      ],
      [
        "Способность Иеговы предвидеть и предопределять",
        "Вопросы читателей w24.02 с. 30"
      ],
      [
        "Те, кто трудился в винограднике один час (Мф 20:1—16)",
        "Прислушиваетесь ли вы к предостережениям? w24.09 с. 24, абз. 17"
      ],
      [
        "Удаление из собрания",
        "Как старейшины помогают тем, кто был удалён из собрания w24.08 с. 26—31; Обращение Руководящего совета № 2 (2024 год) 1112024005-1.v"
      ]
    ]
  },
  "06": {
    "years": [
      "2025"
    ],
    "topics": [
      [
        "Весть, подобная граду (Отк 16:21)",
        "Вопросы читателей w25.08 с. 31, абз. 3—5"
      ],
      [
        "Дополнительное образование",
        "Дополнительное образование. Принимайте мудрые решения w26.05 с. 15, абз. 4; Обращение Руководящего совета № 5 (2025 год) 1112024036-1.v"
      ],
      [
        "Как Иегова защитит во время Армагеддона (Пс 91)",
        "Иегова защищает тех, кто ему доверяет w26.09 с. 2—7; Марк Сандерсон. Иегова надёжно защитит свой народ в Армагеддоне! Ежегодное собрание 2025 года jwb-134-8.v"
      ],
      [
        "Произнесение тостов",
        "Обращение Руководящего совета № 4 (2025 год) 1112024035-1.v; Как проходят свадьбы Свидетелей Иеговы? ijwfq статья 62"
      ],
      [
        "Проповедь до тех пор, пока не придёт конец (Мф 24:14)",
        "Вопросы читателей w25.08 с. 31"
      ],
      [
        "Секс в браке",
        "Мужья, оказывайте честь своим жёнам w25.01 с. 13, абз. 17"
      ],
      [
        "Символы и традиции",
        "Обращение Руководящего совета № 4 (2025 год) 1112024035-1.v"
      ],
      [
        "«Мысль» (Отк 17:17)",
        "Вопросы читателей w25.11 с. 31"
      ],
      [
        "«Путь мужчины» (Пр 30:18, 19)",
        "Вопросы читателей w25.09 с. 31"
      ]
    ]
  }
};;

/*
  Двузначные коды 01—06 открывают соответствующий блок.
  Код ведущего 99 открывает все блоки один за другим.
  Имена участников намеренно НЕ привязаны к кодам на общей странице.
*/
const participantCodes = {
  "47": "01",
  "12": "02",
  "83": "03",
  "26": "04",
  "61": "05",
  "35": "06",
  "740": "ALL"
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
  const years = set.years.length > 1
    ? `${set.years.slice(0, -1).join(", ")} и ${set.years[set.years.length - 1]} годы`
    : `${set.years[0]} год`;

  const topicsHtml = set.topics.map(([title, ref], index) => `
    <article class="topic-item">
      <div class="topic-number">${index + 1}</div>
      <div class="topic-body">
        <div class="topic-name">${title}</div>
        ${ref ? `<div class="topic-ref">${ref}</div>` : ""}
      </div>
    </article>
  `).join("");

  return `
    <div class="topic-heading">
      <div class="topic-badge">💎</div>
      <div>
        <h3>${isLeader ? "Исследование" : "Твоё исследование"}</h3>
        <div class="year-note">Уточнение в понимании за ${years}</div>
      </div>
    </div>

    <div class="time-limit">⏱️ Рассказ — не более 10 минут.</div>

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
        <div class="year-note">2020 → 2021 → 2022 → 2023 и 2026 → 2024 → 2025</div>
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
              ${ref ? `<div class="topic-ref">${ref}</div>` : ""}
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


