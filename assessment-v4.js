(function () {
  "use strict";

  var hero = document.querySelector(".v4-hero");
  var quizEntry = document.getElementById("quiz-entry");
  var quizRoot = document.querySelector("[data-v4-quiz-root]");
  var entryCard = document.querySelector("[data-v4-quiz-entry]");
  var startButton = document.querySelector("[data-v4-quiz-start]");
  var quizPanel = document.querySelector("[data-v4-quiz-panel]");
  var quizScreen = document.querySelector("[data-v4-quiz-screen]");
  var progress = document.querySelector("[data-v4-quiz-progress]");
  var progressBar = document.querySelector("[data-v4-quiz-progress-bar]");
  var progressLabel = document.querySelector("[data-v4-quiz-progress-label]");
  var persistentCta = document.querySelector("[data-v4-persistent-cta]");

  if (!hero || !quizEntry || !quizRoot || !entryCard || !startButton || !quizPanel || !quizScreen || !progress || !progressBar || !progressLabel || !persistentCta) {
    return;
  }

  // V4 quiz is a 5-question guided self-observation (not a diagnostic scale).
  // Kept the five discriminating signals; dropped old "timing" and "coping" (echo-flavour only).
  // Signal per question: Q1 first-notice (family fallback) · Q2 recurrence · Q3 left-right habit ·
  // Q4 self-articulation · Q5 goal (primary family).
  var questions = [
    {
      id: 1,
      context: "先不用想自己有沒有什麼體態問題。",
      question: "最近，你比較容易先注意到哪一種感覺？",
      answers: [
        "肩頸、腰背或某個地方常常緊",
        "有些動作做得到，但就是沒以前那麼順",
        "左右兩邊的感覺好像不太一樣",
        "說不上來，只覺得身體有點卡卡的"
      ],
      bottom: "沒有標準答案，選最像你的就好。"
    },
    {
      id: 2,
      question: "那這種感覺，通常比較像哪一種？",
      answers: [
        "放鬆一下會好，但過一陣子又來",
        "有時幾天沒事，之後又會出現",
        "只有做某些動作時比較明顯",
        "我其實從來沒注意它會不會重複"
      ]
    },
    {
      id: 3,
      question: "你有沒有這種習慣：<br>站著時總會不自覺換到同一隻腳，<br>或一邊比較容易累？",
      answers: [
        "有，很明顯",
        "好像有，但我從沒認真注意是哪邊",
        "偶爾會",
        "完全沒注意過這件事"
      ]
    },
    {
      id: 4,
      context: "換個角度想一下。",
      question: "如果現在問你：<br>自己哪邊肩膀比較高、<br>重心比較常放哪邊，<br>你說得出來嗎？",
      answers: [
        "大概知道",
        "有一點感覺，但不太確定",
        "好像知道，可是真的要說又說不上來",
        "老實說，我完全不知道"
      ]
    },
    {
      id: 5,
      context: "最後一題——如果真的可以看得更清楚，",
      question: "你現在最想搞清楚哪一件事？",
      answers: [
        "為什麼同一個地方總是容易緊",
        "為什麼有些動作慢慢變得比較卡",
        "我的左右兩邊是不是其實用得不一樣",
        "我現在到底最值得先注意哪裡"
      ]
    }
  ];

  var resultFamilies = {
    A: {
      headline: "某些地方總是比較早出來幫忙",
      explanation: "你比較容易先感覺到某個地方緊、卡或累；如果它總在類似情況下反覆出現，可能是身體習慣讓同一個地方多做一些。",
      keyLine: "別只看「哪裡最緊」，更值得確認的是：<br><span>為什麼每次都是它先累。</span>"
    },
    B: {
      headline: "身體兩邊的分工可能不太一樣",
      explanation: "有些左右差異來自長期的小習慣：站著靠一側、某一邊先累，或動作時總是一邊先出力。",
      keyLine: "不只是哪邊比較累，更值得確認的是：<br><span>身體是否一直把同樣的工作交給同一邊。</span>"
    },
    C: {
      headline: "感覺得到身體變了，<br>但原因不容易自己說清楚",
      explanation: "你感覺得到動作沒有以前自然，或偶爾卡卡的，但很難指出究竟是哪個環節變了。",
      keyLine: "先不用再猜一個問題，真正要知道的是：<br><span>哪一個環節開始變得不一樣。</span>"
    }
  };

  var unknownObservations = [
    {
      title: "肩膀與左右位置",
      question: "真的有一邊比較高，還是只是某一邊<span class=\"v4-nowrap\">比較容易累？</span>"
    },
    {
      title: "重心與身體軸線",
      question: "站著的時候，重量是不是長期比較偏向<span class=\"v4-nowrap\">同一側？</span>"
    },
    {
      title: "頭部、骨盆與整體位置",
      question: "有些很小的位置差異，是不是正在影響整體怎麼出力？"
    }
  ];

  var faqs = [
    {
      question: "我完全沒有瑜伽基礎，也可以做嗎？",
      answer: "可以。這次不是要你完成瑜伽動作，也不是考柔軟度，而是先看看你平常的站姿與身體使用上的差異。"
    },
    {
      question: "AI 體態檢測是醫療診斷嗎？",
      answer: "不是。它協助把姿勢中的左右、位置與軸線差異呈現出來，再由老師結合現場觀察與你的身體感受一起解讀。如果有疼痛、受傷或醫療方面的問題，仍建議由合格醫療專業人員評估。"
    },
    {
      question: "現場會一直推銷課程嗎？",
      answer: "這 20 分鐘會先完成檢測與老師解讀。鑫彥一向不強迫報名課程，是否再進一步了解其他課程，可以依你自己的需要決定。"
    },
    {
      question: "第一次去需要準備什麼？",
      answer: "穿方便活動的衣服就可以，不需要自備瑜伽用品。整個過程約 20 分鐘，地點在高雄左營、近巨蛋捷運站。"
    }
  ];

  function buildFaqItem(faq, faqIndex) {
    var questionId = "v4-faq-q" + (faqIndex + 1);
    var answerId = "v4-faq-a" + (faqIndex + 1);

    return '<div class="v4-faq__item">' +
      '<h3 class="v4-faq__heading">' +
      '<button class="v4-faq__question" type="button" id="' + questionId + '" data-v4-faq-question aria-expanded="false" aria-controls="' + answerId + '">' +
      "<span>" + faq.question + "</span>" +
      '<span class="v4-faq__marker" aria-hidden="true"></span>' +
      "</button>" +
      "</h3>" +
      '<div class="v4-faq__answer" id="' + answerId + '" role="region" aria-labelledby="' + questionId + '" hidden>' +
      "<p>" + faq.answer + "</p>" +
      "</div>" +
      "</div>";
  }

  // Echo phrases keyed by the new question ids: 2 recurrence · 3 left-right habit · 4 self-articulation.
  var echoPhrases = {
    2: [
      "放鬆一下會好，但過一陣子又回來",
      "有時幾天沒事，之後還是會再出現",
      "在某些動作裡才特別明顯",
      "還沒有特別留意它會不會重複"
    ],
    3: [
      "某一側比較明顯、比較容易累",
      "好像有一邊比較累，但還沒認真分辨",
      "偶爾會不自覺換到同一側",
      "還沒特別注意過左右這件事"
    ],
    4: [
      "大概知道左右和重心的狀況",
      "有一點感覺，但還不太確定",
      "好像知道，真的要說卻說不上來",
      "還不清楚左右或重心通常放在哪裡"
    ]
  };

  var storageKey = "assessmentV4Gate2Answers";
  var legacyResultViewKey = "assessmentV4Gate3AView";
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var state = {
    active: false,
    locked: false,
    review: false,
    answers: {}
  };
  // Local-only review fixture. Never persisted, never used by the visitor flow.
  // Yields family B (Q5 index 2). Q1 first-notice=0, Q2 recurrence=0, Q3 left-right=0, Q4 articulation=3.
  var reviewFixture = { 1: 0, 2: 0, 3: 0, 4: 3, 5: 2 };

  // V4 LINE destination. Same OA and oaMessage mechanism as site.js, with a V4-only prefill string.
  var V4_LINE_OA_ID = "@561wigip";
  var V4_LINE_MESSAGE = "我想了解 AI 體態檢測 NT$199（V4）";
  var v4LineUrl = "https://line.me/R/oaMessage/" + encodeURIComponent(V4_LINE_OA_ID) + "/?" + encodeURIComponent(V4_LINE_MESSAGE);

  // Once-per-page-lifecycle flags. In-memory only; a refresh is a new lifecycle.
  var firedEvents = {};
  var heroThreshold = 0;
  var frameRequested = false;
  var insightTimer = 0;

  function updateThreshold() {
    heroThreshold = hero.offsetTop + (hero.offsetHeight * 0.3);
  }

  function isQuizEntryVisible() {
    var rect = quizEntry.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function setPersistentCtaVisibility(shouldShow) {
    persistentCta.classList.toggle("is-visible", shouldShow);
    persistentCta.setAttribute("aria-hidden", shouldShow ? "false" : "true");

    if (shouldShow) {
      persistentCta.removeAttribute("tabindex");
    } else {
      persistentCta.setAttribute("tabindex", "-1");
    }
  }

  function updatePersistentCta() {
    frameRequested = false;
    setPersistentCtaVisibility(!state.review && !state.active && window.scrollY >= heroThreshold && !isQuizEntryVisible());
  }

  function requestPersistentCtaUpdate() {
    if (frameRequested) {
      return;
    }

    frameRequested = true;
    window.requestAnimationFrame(updatePersistentCta);
  }

  function saveAnswers() {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(state.answers));
    } catch (error) {
      // The in-memory state remains the source of truth if storage is unavailable.
    }
  }

  function loadAnswers() {
    try {
      var storedAnswers = JSON.parse(window.sessionStorage.getItem(storageKey) || "{}");
      return storedAnswers && typeof storedAnswers === "object" ? storedAnswers : {};
    } catch (error) {
      return {};
    }
  }

  function getAnswerIndex(questionId) {
    var answer = state.answers[questionId];
    return answer && Number.isInteger(answer.answerIndex) ? answer.answerIndex : -1;
  }

  function hasResultAnswers() {
    return questions.every(function (question) {
      return getAnswerIndex(question.id) >= 0;
    });
  }

  function clearLegacyResultView() {
    try {
      window.sessionStorage.removeItem(legacyResultViewKey);
    } catch (error) {
      // UI routing never depends on storage, even when storage is unavailable.
    }
  }

  function setProgress(step) {
    var safeStep = Math.max(0, Math.min(5, step));
    progress.setAttribute("aria-valuenow", String(safeStep));
    progressBar.style.width = ((safeStep / 5) * 100) + "%";

    if (safeStep <= 1) {
      progressLabel.textContent = "慢慢看，選最像你的就好";
    } else if (safeStep <= 3) {
      progressLabel.textContent = "你正在整理平常容易忽略的感覺";
    } else {
      progressLabel.textContent = "快整理完了";
    }
  }

  function focusScreenHeading() {
    var heading = quizScreen.querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
  }

  function stabilizeQuizViewport() {
    quizEntry.scrollIntoView({
      behavior: "auto",
      block: "start"
    });
  }

  function renderQuestion(questionIndex) {
    var question = questions[questionIndex];
    state.locked = false;
    setProgress(question.id);

    var context = question.context ? '<p class="v4-question__context">' + question.context + "</p>" : "";
    var bottom = question.bottom ? '<p class="v4-question__bottom">' + question.bottom + "</p>" : "";
    var answers = question.answers.map(function (answer, answerIndex) {
      return '<button class="v4-answer" type="button" data-v4-answer="' + answerIndex + '" aria-pressed="false">' + answer + "</button>";
    }).join("");

    quizScreen.innerHTML = '<div class="v4-question" data-v4-question="' + question.id + '">' +
      context +
      '<h2 id="v4-question-' + question.id + '">' + question.question + "</h2>" +
      '<div class="v4-answer-list" role="group" aria-labelledby="v4-question-' + question.id + '">' + answers + "</div>" +
      bottom +
      "</div>";

    quizScreen.querySelectorAll("[data-v4-answer]").forEach(function (button) {
      button.addEventListener("click", function () {
        selectAnswer(questionIndex, Number(button.getAttribute("data-v4-answer")), button);
      });
    });

    stabilizeQuizViewport();
    focusScreenHeading();
  }

  function selectAnswer(questionIndex, answerIndex, selectedButton) {
    if (state.locked) {
      return;
    }

    state.locked = true;
    var question = questions[questionIndex];
    var buttons = quizScreen.querySelectorAll("[data-v4-answer]");

    buttons.forEach(function (button) {
      button.disabled = true;
      button.setAttribute("aria-pressed", button === selectedButton ? "true" : "false");
    });
    selectedButton.classList.add("is-selected");

    state.answers[question.id] = {
      answerIndex: answerIndex,
      answer: question.answers[answerIndex]
    };
    saveAnswers();
    if (question.id === 2 || question.id === 5) {
      setProgress(question.id);
    } else {
      setProgress(question.id + 1);
    }

    window.setTimeout(function () {
      if (question.id === 2) {
        showInsightOne();
      } else if (question.id === 5) {
        showResultTransition();
      } else {
        renderQuestion(questionIndex + 1);
      }
    }, reducedMotion.matches ? 80 : 240);
  }

  function showInsightOne() {
    setProgress(2);
    quizScreen.innerHTML = '<div class="v4-insight" data-v4-insight="1">' +
      '<p class="v4-insight__marker">先停一下</p>' +
      '<h2>有個地方一直讓你感覺到，<br>不一定代表答案就在那裡。</h2>' +
      '<p class="v4-insight__support">有時候，它只是每次都比較早出來幫忙。</p>' +
      "</div>";
    stabilizeQuizViewport();
    focusScreenHeading();
    observeSectionView(quizScreen.querySelector(".v4-insight"), "assessment_v4_micro_insight_view", { section_name: "micro_insight" });

    window.clearTimeout(insightTimer);
    insightTimer = window.setTimeout(function () {
      renderQuestion(2);
    }, reducedMotion.matches ? 1800 : 2100);
  }

  function showResultTransition() {
    setProgress(5);
    // All five answered. Completion of the quiz only — not a lead, not a conversion.
    trackV4EventOnce("assessment_v4_quiz_complete");
    quizScreen.innerHTML = '<div class="v4-result-transition" data-v4-result-transition>' +
      '<p class="v4-insight__marker">回答完成</p>' +
      '<h2>好，從你剛才的回答裡，<br>已經可以看到幾個線索。</h2>' +
      '<ul class="v4-result-transition__signals">' +
      "<li>你最先注意到的感覺</li>" +
      "<li>它是不是常常又回來</li>" +
      "<li>左右有沒有不太一樣</li>" +
      "<li>有哪些地方你自己也不太確定</li>" +
      "</ul>" +
      '<button class="v4-primary-action" type="button" data-v4-result-enter>看看我的整理 <span aria-hidden="true">→</span></button>' +
      "</div>";
    quizScreen.querySelector("[data-v4-result-enter]").addEventListener("click", enterPersonalizedResult);
    stabilizeQuizViewport();
    focusScreenHeading();
  }

  function determinePrimaryFamily() {
    // Goal (Q5) is the primary classifier; first-notice (Q1) is the fallback. Same index map.
    var goalFamily = ["A", "C", "B", "C"];
    var noticeFamily = ["A", "C", "B", "C"];
    var q5Index = getAnswerIndex(5);
    var q1Index = getAnswerIndex(1);

    if (q5Index >= 0 && goalFamily[q5Index]) {
      return goalFamily[q5Index];
    }

    if (q1Index >= 0 && noticeFamily[q1Index]) {
      return noticeFamily[q1Index];
    }

    return "C";
  }

  function buildAnswerEcho() {
    // Recognition before interpretation: echo three non-classifier observations
    // (recurrence, left-right habit, self-articulation), never the goal/first-notice classifiers.
    var q2Index = getAnswerIndex(2);
    var q3Index = getAnswerIndex(3);
    var q4Index = getAnswerIndex(4);

    return [
      { label: "這種感覺比較像", value: echoPhrases[2][q2Index] },
      { label: "站或走的時候", value: echoPhrases[3][q3Index] },
      { label: "對左右與重心", value: echoPhrases[4][q4Index] }
    ];
  }

  function getSecondarySignal() {
    var q3Index = getAnswerIndex(3);
    var q4Index = getAnswerIndex(4);
    var q2Index = getAnswerIndex(2);

    if (q3Index === 0) {
      return { headline: "你已經注意到左右差異", text: "站著或走動時，某一側比較容易先有感覺。" };
    }

    if (q4Index === 3) {
      return { headline: "左右怎麼分工，還不太確定", text: "你目前還不容易說清楚，重心通常放在哪一邊。" };
    }

    if (q4Index === 2) {
      return { headline: "有感覺，但還說不清楚", text: "左右或重心可能不太一樣，只是還不容易具體指出。" };
    }

    if (q4Index === 1) {
      return { headline: "已經有一點感覺", text: "你對左右兩邊怎麼分工，仍然沒有很確定。" };
    }

    if (q2Index === 3) {
      return { headline: "你比較注意當下", text: "但還不太會留意，它是不是總用同樣方式出現。" };
    }

    if (q3Index === 1) {
      return { headline: "某一側好像比較明顯", text: "你已經有點感覺，只是還沒有認真分辨是哪一邊。" };
    }

    if (q3Index === 2) {
      return { headline: "偶爾會換到同一側", text: "這個習慣目前不算明顯，但已經值得稍微留意。" };
    }

    return { headline: "重心習慣還沒被注意到", text: "你目前還沒有特別留意，站立時是否固定偏向一邊。" };
  }

  function returnToQuizEntry() {
    state.active = false;
    state.locked = false;
    document.body.classList.remove("is-v4-quiz-active");
    quizEntry.classList.remove("is-v4-quiz-active");
    quizRoot.classList.remove("is-result-mode");
    quizPanel.classList.remove("is-result-mode", "is-visible");
    quizScreen.classList.remove("is-transitioning-out");
    entryCard.classList.remove("is-leaving");
    entryCard.hidden = false;
    quizPanel.hidden = true;
    setPersistentCtaVisibility(false);
    quizEntry.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });
  }

  function renderPersonalizedResult() {
    if (!hasResultAnswers()) {
      returnToQuizEntry();
      return;
    }

    var familyKey = determinePrimaryFamily();
    var family = resultFamilies[familyKey];
    var echoSignals = buildAnswerEcho();
    var secondarySignal = getSecondarySignal();
    var echo = echoSignals.map(function (signal) {
      return '<div class="v4-result-echo__item">' +
        '<span class="v4-echo-label">' + signal.label + "</span>" +
        '<strong class="v4-echo-highlight">' + signal.value + "</strong>" +
        "</div>";
    }).join("");
    var unknowns = unknownObservations.map(function (item, itemIndex) {
      return '<li class="v4-unknown">' +
        '<p class="v4-unknown__number" aria-hidden="true">0' + (itemIndex + 1) + "</p>" +
        '<div class="v4-unknown__body">' +
        "<h3>" + item.title + "</h3>" +
        "<p>" + item.question + "</p>" +
        "</div>" +
        "</li>";
    }).join("");

    quizRoot.classList.add("is-result-mode");
    quizPanel.classList.add("is-result-mode");
    quizScreen.classList.remove("is-transitioning-out");
    quizScreen.innerHTML = '<div class="v4-personalized-result" data-v4-personalized-result data-v4-result-family="' + familyKey + '">' +
      '<div class="v4-result-reveal">' +
      '<section class="v4-result-echo" aria-labelledby="v4-result-echo-title">' +
      '<p class="v4-result-label">從你剛才的回答裡</p>' +
      '<h2 id="v4-result-echo-title">你剛才說的是——</h2>' +
      '<div class="v4-result-echo__sentences">' + echo + "</div>" +
      "</section>" +
      '<section class="v4-primary-result" aria-labelledby="v4-primary-result-title">' +
      '<p class="v4-result-label">你目前比較像：</p>' +
      '<h2 id="v4-primary-result-title">' + family.headline + "</h2>" +
      '<p class="v4-primary-result__explanation">' + family.explanation + "</p>" +
      '<p class="v4-primary-result__key-line">' + family.keyLine + "</p>" +
      "</section>" +
      '<aside class="v4-secondary-signal" aria-labelledby="v4-secondary-signal-title">' +
      '<h3 id="v4-secondary-signal-title">另外一個小線索</h3>' +
      '<h4>' + secondarySignal.headline + "</h4>" +
      "<p>" + secondarySignal.text + "</p>" +
      "</aside>" +
      "</div>" +
      '<section class="v4-unknown-gap" data-v4-unknown-gap aria-labelledby="v4-unknown-gap-title">' +
      '<p class="v4-result-label v4-result-label--quiet">還沒被看到的部分</p>' +
      '<h2 id="v4-unknown-gap-title">但剛才這 1 分鐘，<br>還有一些事情看不出來。</h2>' +
      '<p class="v4-unknown-gap__support">剛才整理的，是你感覺得到的部分。<br>但有些身體差異，不是靠感覺就能說清楚。</p>' +
      '<ol class="v4-unknown-list">' + unknowns + "</ol>" +
      '<div class="v4-unknown-gap__bridge">' +
      "<p>剛才的回答，能幫你找到方向。</p>" +
      '<p class="v4-unknown-gap__bridge-line">這些，不是靠感覺回答的——<span>要真的看看你的身體。</span></p>' +
      "</div>" +
      "</section>" +
      '<section class="v4-evidence" data-v4-evidence aria-labelledby="v4-evidence-title">' +
      '<div class="v4-evidence__copy">' +
      '<p class="v4-result-label v4-result-label--quiet">那要怎麼看？</p>' +
      '<h2 id="v4-evidence-title">剛才的回答，是幫你找到方向。<br>現場檢測，是確認<span class="v4-nowrap">「你本人」。</span></h2>' +
      '<p class="v4-evidence__support">AI 會協助把姿勢中的左右差異、位置與身體軸線呈現出來。</p>' +
      '<p class="v4-evidence__support">不是替你下結論，而是讓原本只靠感覺的事情，多一個可以一起看的依據。</p>' +
      "</div>" +
      '<figure class="v4-evidence__visual">' +
      '<img src="assets/assessment-sample.jpg" alt="AI 體態檢測正面姿勢分析的畫面範例，身上有標記點、參考格線與左右水平參考線" width="1333" height="1500" loading="lazy" decoding="async">' +
      '<figcaption>AI 體態檢測的實際畫面範例。標記點、格線與參考線會把左右與軸線的差異直接呈現出來。</figcaption>' +
      "</figure>" +
      "</section>" +
      '<section class="v4-human" data-v4-human aria-labelledby="v4-human-title">' +
      '<div class="v4-human__copy">' +
      '<p class="v4-human__transition">看得到差異之後，下一步不是自己猜。</p>' +
      '<h2 id="v4-human-title">數據看得到差異，<br>老師幫你看懂它代表什麼。</h2>' +
      '<p class="v4-human__support">AI 協助把姿勢中的差異呈現出來。老師再結合你的動作、平常的身體感受與現場觀察，一起整理出現在最值得先注意的方向。</p>' +
      '<p class="v4-human__closing">不是多看一個數字，而是知道現在最值得先注意哪裡。</p>' +
      "</div>" +
      '<figure class="v4-human__visual">' +
      '<img src="assets/assessment-consult-wide.jpg" alt="老師在鑫彥瑜珈櫃檯拿著平板，與學員一起看 AI 體態檢測的結果畫面" width="1706" height="960" loading="lazy" decoding="async">' +
      "</figure>" +
      "</section>" +
      '<section class="v4-offer" data-v4-offer aria-labelledby="v4-offer-title">' +
      '<p class="v4-offer__transition">如果你想把剛才的「可能」，看得更清楚。</p>' +
      '<p class="v4-offer__lead">不用再靠自己猜，用 20 分鐘實際<span class="v4-nowrap">看看你的身體。</span></p>' +
      '<h2 id="v4-offer-title"><span class="v4-nowrap">20 分鐘</span> <span class="v4-nowrap">AI 體態檢測</span></h2>' +
      '<p class="v4-offer__subtitle"><span class="v4-nowrap">AI 體態檢測</span>＋<span class="v4-nowrap">老師一對一解讀</span></p>' +
      '<ul class="v4-offer__includes">' +
      "<li>AI 協助把姿勢中的左右、位置與軸線差異呈現出來</li>" +
      "<li>老師一對一陪你看懂檢測結果</li>" +
      "<li>一起整理出現在最值得先注意的方向</li>" +
      "</ul>" +
      '<p class="v4-offer__price">' +
      '<span class="v4-offer__price-main"><span class="v4-offer__price-label">首次</span><span class="v4-offer__price-value v4-nowrap">NT$199</span><del class="v4-offer__price-was v4-nowrap">NT$699</del></span>' +
      '<span class="v4-offer__price-scope">完整 20 分鐘體驗</span>' +
      "</p>" +
      '<a class="v4-primary-action" href="' + v4LineUrl + '" target="_blank" rel="noopener" data-v4-line-cta="offer">我想看清楚自己的結果 <span aria-hidden="true">→</span></a>' +
      '<p class="v4-offer__meta">約 20 分鐘｜高雄左營・近巨蛋捷運</p>' +
      "</section>" +
      '<section class="v4-trust" data-v4-trust aria-labelledby="v4-trust-title">' +
      '<h2 id="v4-trust-title" class="v4-trust__title">做過檢測的人，怎麼說</h2>' +
      '<ul class="v4-trust__signals">' +
      "<li><b>4.9★</b><span>Google 平均評分・88 則評價</span></li>" +
      "<li><b>老師本人</b><span>現場解讀檢測結果</span></li>" +
      "</ul>" +
      '<blockquote class="v4-trust__quote">' +
      "<p>今天體驗 AI 檢測與調整，身體狀況沒有想像中的好，經過老師的調整，覺得肩頸放鬆了，腰部感覺比較鬆了，很棒的<span class=\"v4-nowrap\">一次體驗。</span></p>" +
      "<cite>黃之柔 · Google 評論</cite>" +
      "</blockquote>" +
      "</section>" +
      '<section class="v4-faq" data-v4-faq aria-labelledby="v4-faq-title">' +
      '<h2 id="v4-faq-title" class="v4-faq__title">還有什麼想先知道的</h2>' +
      '<div class="v4-faq__list">' + faqs.map(buildFaqItem).join("") + "</div>" +
      "</section>" +
      '<section class="v4-final-cta" data-v4-final-cta aria-labelledby="v4-final-cta-title">' +
      '<h2 id="v4-final-cta-title">如果你想把自己的狀況，<br>看得更清楚。</h2>' +
      '<p class="v4-final-cta__service"><span class="v4-nowrap">20 分鐘 AI 體態檢測</span>＋<span class="v4-nowrap">老師一對一解讀</span></p>' +
      '<p class="v4-final-cta__price"><span>首次</span><span class="v4-final-cta__price-value v4-nowrap">NT$199</span></p>' +
      '<a class="v4-primary-action" href="' + v4LineUrl + '" target="_blank" rel="noopener" data-v4-line-cta="final">我想看清楚自己的結果 <span aria-hidden="true">→</span></a>' +
      '<p class="v4-final-cta__meta">高雄左營・近巨蛋捷運</p>' +
      "</section>" +
      "</div>";
    quizScreen.querySelectorAll("[data-v4-line-cta]").forEach(function (link) {
      link.addEventListener("click", function () {
        var ctaLocation = link.getAttribute("data-v4-line-cta");

        // Click only. This never means added friend, message sent, enquiry, booking or purchase.
        trackV4Event("assessment_v4_line_click", {
          cta_location: ctaLocation,
          result_family: familyKey
        });
        trackV4MetaEvent("V4LineClick", { cta_location: ctaLocation });
        trackV4MetaLead();
      });
    });

    // Anchored on the Answer Echo, the first beat of the result. The outer result container spans
    // every downstream section, so observing it would measure "page height", not "user saw the result".
    observeSectionView(quizScreen.querySelector(".v4-result-echo"), "assessment_v4_result_view", {
      section_name: "personalized_result",
      result_family: familyKey
    });
    observeSectionView(quizScreen.querySelector("[data-v4-unknown-gap]"), "assessment_v4_unknown_gap_view", { section_name: "unknown_gap" });
    observeSectionView(quizScreen.querySelector("[data-v4-evidence]"), "assessment_v4_ai_evidence_view", { section_name: "ai_evidence" });
    observeSectionView(quizScreen.querySelector("[data-v4-offer]"), "assessment_v4_offer_view", { section_name: "offer" });
    observeSectionView(quizScreen.querySelector("[data-v4-faq]"), "assessment_v4_faq_view", { section_name: "faq" });
    observeSectionView(quizScreen.querySelector("[data-v4-final-cta]"), "assessment_v4_final_cta_view", { section_name: "final_cta" });

    quizScreen.querySelectorAll("[data-v4-faq-question]").forEach(function (button) {
      button.addEventListener("click", function () {
        var isExpanded = button.getAttribute("aria-expanded") === "true";
        var answer = document.getElementById(button.getAttribute("aria-controls"));

        button.setAttribute("aria-expanded", isExpanded ? "false" : "true");

        if (answer) {
          answer.hidden = isExpanded;
        }
      });
    });

    stabilizeQuizViewport();
    focusScreenHeading();
  }

  function enterPersonalizedResult() {
    if (!hasResultAnswers()) {
      returnToQuizEntry();
      return;
    }

    quizScreen.classList.add("is-transitioning-out");
    window.setTimeout(renderPersonalizedResult, reducedMotion.matches ? 0 : 300);
  }

  function revealQuiz() {
    entryCard.hidden = true;
    quizPanel.hidden = false;
    quizRoot.classList.remove("is-result-mode");
    quizPanel.classList.remove("is-result-mode");
    quizScreen.classList.remove("is-transitioning-out");
    renderQuestion(0);
    window.requestAnimationFrame(function () {
      quizPanel.classList.add("is-visible");
    });
  }

  function startQuiz(entryPoint) {
    if (state.active) {
      quizEntry.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });
      return;
    }

    trackV4EventOnce("assessment_v4_quiz_start", { entry_point: entryPoint || "quiz_entry" });
    state.active = true;
    state.answers = {};
    saveAnswers();
    clearLegacyResultView();
    document.body.classList.add("is-v4-quiz-active");
    quizEntry.classList.add("is-v4-quiz-active");
    entryCard.classList.add("is-leaving");
    setPersistentCtaVisibility(false);

    quizEntry.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start"
    });

    window.setTimeout(revealQuiz, reducedMotion.matches ? 0 : 300);
  }

  function initializeLandingState() {
    state.active = false;
    state.locked = false;
    state.answers = {};
    clearLegacyResultView();
    document.body.classList.remove("is-v4-quiz-active");
    quizEntry.classList.remove("is-v4-quiz-active");
    quizRoot.classList.remove("is-result-mode");
    quizPanel.classList.remove("is-result-mode", "is-visible");
    quizScreen.classList.remove("is-transitioning-out");
    entryCard.classList.remove("is-leaving");
    entryCard.hidden = false;
    quizPanel.hidden = true;
    setPersistentCtaVisibility(false);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }

  function isLocalReviewEnvironment() {
    var host = window.location.hostname;
    return window.location.protocol === "file:" ||
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "::1" ||
      host === "[::1]" ||
      host === "";
  }

  // V4 tracking is suppressed on local machines and in review mode so manual QA never
  // reaches production analytics. This guard covers V4 events only; site.js PageView is untouched.
  function isV4TrackingEnabled() {
    return !state.review && !isLocalReviewEnvironment();
  }

  function trackV4Event(eventName, params) {
    if (!isV4TrackingEnabled() || typeof window.gtag !== "function") {
      return;
    }

    var payload = {
      page_path: window.location.pathname,
      source: "assessment_v4"
    };

    if (params) {
      Object.keys(params).forEach(function (key) {
        payload[key] = params[key];
      });
    }

    try {
      window.gtag("event", eventName, payload);
    } catch (error) {
      // Tracking must never break the page.
    }
  }

  function trackV4MetaEvent(eventName, params) {
    if (!isV4TrackingEnabled() || typeof window.fbq !== "function") {
      return;
    }

    try {
      // trackCustom: V4LineClick is observation only, never a standard Lead event.
      window.fbq("trackCustom", eventName, params || {});
    } catch (error) {
      // Tracking must never break the page.
    }
  }

  function trackV4MetaLead() {
    if (!isV4TrackingEnabled() || typeof window.fbq !== "function") {
      return;
    }

    try {
      // Standard Meta Lead — click only. Same meaning as everywhere else on the site: the
      // visitor clicked the LINE CTA, not that they added the OA, sent a message, enquired,
      // booked or bought. Params match site.js's a.js-line default Lead (same values V1/V3
      // already send) so V1/V3/V4 stay comparable for Meta ad optimization.
      window.fbq("track", "Lead", {
        content_name: "LINE AI posture assessment reservation",
        content_category: "AI posture assessment",
        value: 199,
        currency: "TWD"
      });
    } catch (error) {
      // Tracking must never break the page.
    }
  }

  function trackV4EventOnce(eventName, params) {
    if (firedEvents[eventName]) {
      return;
    }

    firedEvents[eventName] = true;
    trackV4Event(eventName, params);
  }

  function observeSectionView(element, eventName, params) {
    if (!element || typeof window.IntersectionObserver !== "function") {
      return;
    }

    // Sections taller than the viewport can never reach 50% visibility, so the threshold is
    // recomputed as "about 40% of a viewport is showing". The rule stays "the user actually
    // scrolled here" instead of "the DOM exists".
    var height = element.getBoundingClientRect().height;
    var threshold = 0.5;

    if (height > (window.innerHeight * 0.8)) {
      threshold = Math.min(0.5, (window.innerHeight * 0.4) / height);
    }

    var observer = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        trackV4EventOnce(eventName, params);
        observer.unobserve(entry.target);
      });
    }, { threshold: threshold });

    observer.observe(element);
  }

  function isReviewRequested() {
    // Both conditions are required: a public domain must never enter review mode.
    return isLocalReviewEnvironment() && window.location.hash.toLowerCase() === "#review";
  }

  function enterReviewMode() {
    state.review = true;
    state.active = false;
    state.locked = false;
    state.answers = {};

    questions.forEach(function (question) {
      var answerIndex = reviewFixture[question.id];
      state.answers[question.id] = {
        answerIndex: answerIndex,
        answer: question.answers[answerIndex]
      };
    });

    entryCard.hidden = true;
    quizPanel.hidden = false;
    quizPanel.classList.add("is-visible");
    setPersistentCtaVisibility(false);
    renderPersonalizedResult();
  }

  startButton.addEventListener("click", function () {
    startQuiz("quiz_entry");
  });
  persistentCta.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz("persistent_cta");
  });

  window.addEventListener("scroll", requestPersistentCtaUpdate, { passive: true });
  window.addEventListener("resize", function () {
    updateThreshold();
    requestPersistentCtaUpdate();
  });
  window.addEventListener("pageshow", function () {
    if (state.review) {
      return;
    }

    window.scrollTo(0, 0);
  });

  updateThreshold();
  initializeLandingState();

  if (isReviewRequested()) {
    enterReviewMode();
  }

  observeSectionView(entryCard, "assessment_v4_quiz_entry_view", { section_name: "quiz_entry" });
  updatePersistentCta();
}());
