(function () {
  const scenarios = [
    {
      phrase: 'Здравствуйте, это служба безопасности банка. Срочно назовите код из SMS, иначе карта будет заблокирована.',
      answer: 'Не сообщать код, завершить разговор и самому позвонить в банк по номеру с карты или из приложения.',
      wrongAnswers: [
        'Назвать код, чтобы сотрудник отменил блокировку.',
        'Отправить код в чат, но не говорить номер карты.',
        'Попросить сотрудника подождать и продиктовать код позже.'
      ],
      explanation: 'Коды из SMS нельзя диктовать никому. Настоящий банк не просит назвать код подтверждения по телефону.'
    },
    {
      phrase: 'Ваш аккаунт будет удалён через 30 минут. Перейдите по ссылке и подтвердите пароль.',
      answer: 'Не открывать ссылку из сообщения, зайти в сервис вручную и проверить уведомления в официальном приложении.',
      wrongAnswers: [
        'Перейти по ссылке и быстро ввести пароль, пока аккаунт не удалили.',
        'Открыть ссылку, но ввести только логин без пароля.',
        'Переслать ссылку другу, чтобы он проверил её со своего телефона.'
      ],
      explanation: 'Мошенники давят срочностью и ведут на поддельные сайты. Безопаснее открыть сервис самостоятельно.'
    },
    {
      phrase: 'Поздравляем, вы выиграли приз. Для получения укажите номер карты, срок действия и CVV.',
      answer: 'Не вводить данные карты и проверить информацию только на официальном сайте организации.',
      wrongAnswers: [
        'Указать данные карты, ведь без них приз не смогут отправить.',
        'Отправить только CVV, а номер карты написать позже.',
        'Спросить, можно ли получить приз быстрее за небольшую комиссию.'
      ],
      explanation: 'CVV, срок действия карты и коды подтверждения нужны мошенникам для списания денег.'
    },
    {
      phrase: 'Это твой родственник, у меня беда. Переведи деньги прямо сейчас, позже всё объясню.',
      answer: 'Сначала связаться с родственником по старому номеру или через другого близкого человека.',
      wrongAnswers: [
        'Перевести небольшую сумму, чтобы быстро помочь.',
        'Спросить номер карты и отправить деньги без звонка.',
        'Попросить написать голосовое, но всё равно подготовить перевод.'
      ],
      explanation: 'В таких сообщениях часто используют страх и спешку. Личность отправителя нужно проверить другим каналом.'
    },
    {
      phrase: 'Чтобы защитить ваш телефон, установите приложение удалённого доступа и скажите мне код подключения.',
      answer: 'Не устанавливать приложение по просьбе незнакомца и прекратить разговор.',
      wrongAnswers: [
        'Установить приложение, но не открывать банковские приложения.',
        'Назвать код подключения только на пару минут.',
        'Включить демонстрацию экрана, чтобы сотрудник всё проверил.'
      ],
      explanation: 'Удалённый доступ позволяет управлять устройством, читать сообщения и подтверждать операции.'
    },
    {
      phrase: 'Мы нашли подозрительный вход. Отправьте фото паспорта, чтобы подтвердить личность.',
      answer: 'Не отправлять документы в чат и обратиться в поддержку через официальный сайт или приложение.',
      wrongAnswers: [
        'Отправить фото паспорта, закрыв пальцем часть номера.',
        'Скинуть паспорт и попросить удалить фото после проверки.',
        'Отправить только селфи с паспортом, без других документов.'
      ],
      explanation: 'Скан паспорта могут использовать для оформления займов, сим-карт и других действий от вашего имени.'
    },
    {
      phrase: 'С вашей карты пытаются списать деньги. Срочно переведите остаток на безопасный счёт.',
      answer: 'Не переводить деньги и самостоятельно позвонить в банк по официальному номеру.',
      wrongAnswers: [
        'Перевести деньги на указанный безопасный счёт.',
        'Уточнить фамилию сотрудника и после этого сделать перевод.',
        'Перевести только часть денег, чтобы проверить, работает ли защита.'
      ],
      explanation: 'Безопасных счетов, на которые просит перевести деньги незнакомец, не существует. Это типичный сценарий кражи.'
    },
    {
      phrase: 'Вам начислена компенсация. Оплатите комиссию 299 рублей, чтобы получить выплату.',
      answer: 'Не оплачивать комиссию и проверить информацию о выплате на официальном сайте организации.',
      wrongAnswers: [
        'Оплатить комиссию, если сумма компенсации намного больше.',
        'Попросить прислать чек и после этого оплатить комиссию.',
        'Оплатить с карты, на которой мало денег.'
      ],
      explanation: 'Настоящие выплаты не требуют предварительной комиссии через случайную ссылку или неизвестные реквизиты.'
    },
    {
      phrase: 'Ваш профиль нарушил правила. Скачайте файл с доказательствами, иначе будет блокировка.',
      answer: 'Не скачивать файл и проверить статус профиля через официальный раздел поддержки.',
      wrongAnswers: [
        'Скачать файл, но не открывать его сразу.',
        'Открыть файл на телефоне, потому что там меньше вирусов.',
        'Попросить отправить файл другим форматом и скачать его.'
      ],
      explanation: 'Файлы от неизвестных отправителей могут содержать вредоносные программы или вести на фишинговые страницы.'
    },
    {
      phrase: 'Я покупаю ваш товар. Сейчас пришлю ссылку на безопасную оплату, там нужно ввести карту.',
      answer: 'Не вводить карту по ссылке покупателя и принимать оплату только через официальный интерфейс площадки.',
      wrongAnswers: [
        'Открыть ссылку и ввести карту для получения денег.',
        'Ввести карту без CVV, чтобы покупатель смог оплатить.',
        'Попросить покупателя прислать другую ссылку, если первая выглядит странно.'
      ],
      explanation: 'Для получения денег обычно не нужно вводить CVV и коды. Ссылки от покупателя часто ведут на поддельные страницы доставки или оплаты.'
    },
    {
      phrase: 'Это техподдержка мессенджера. Продиктуйте код входа, чтобы мы отменили взлом.',
      answer: 'Не сообщать код входа и включить двухфакторную защиту в настройках мессенджера.',
      wrongAnswers: [
        'Продиктовать код, если собеседник назвал имя аккаунта.',
        'Отправить код и сразу сменить пароль после проверки.',
        'Попросить сотрудника сначала написать с официального аккаунта.'
      ],
      explanation: 'Код входа даёт доступ к аккаунту. Поддержка не просит такие коды в личной переписке.'
    },
    {
      phrase: 'Ваш друг отметил вас на фото. Войдите по ссылке, чтобы посмотреть публикацию.',
      answer: 'Не входить по ссылке из сообщения и проверить уведомления внутри социальной сети.',
      wrongAnswers: [
        'Ввести логин и пароль, если на странице есть знакомый логотип.',
        'Открыть ссылку и войти через сохранённый пароль браузера.',
        'Попросить друга прислать ссылку ещё раз и перейти по новой.'
      ],
      explanation: 'Фишинговые страницы копируют дизайн соцсетей. Надёжнее открыть приложение или сайт вручную.'
    },
    {
      phrase: 'Мы из отдела кадров. Заполните анкету и приложите фото банковской карты с двух сторон.',
      answer: 'Не отправлять фото карты и уточнить вакансию через официальный контакт компании.',
      wrongAnswers: [
        'Отправить фото карты, закрыв CVV маленьким стикером.',
        'Сначала заполнить анкету, а карту отправить после ответа.',
        'Попросить обещание о конфиденциальности и отправить фото.'
      ],
      explanation: 'Фото карты с двух сторон даёт мошенникам данные для платежей. Работодателю такие фотографии не нужны.'
    },
    {
      phrase: 'Ваш телефон заражён. Перейдите по ссылке и установите антивирус прямо сейчас.',
      answer: 'Не устанавливать приложение по ссылке и проверить устройство через официальный магазин приложений или встроенную защиту.',
      wrongAnswers: [
        'Установить приложение, если оно называется антивирусом.',
        'Скачать файл и удалить его, если появится ошибка.',
        'Перейти по ссылке, но не давать приложению доступ к контактам.'
      ],
      explanation: 'Под видом антивируса часто распространяют вредоносные приложения, которые крадут данные или получают доступ к устройству.'
    },
    {
      phrase: 'Для доставки посылки оплатите таможенный сбор по ссылке в течение часа.',
      answer: 'Не платить по ссылке и проверить трек-номер на официальном сайте службы доставки.',
      wrongAnswers: [
        'Оплатить сбор, чтобы посылку не вернули отправителю.',
        'Ввести карту, но не сохранять её на сайте.',
        'Написать в чат доставки и оплатить, если оператор ответит.'
      ],
      explanation: 'Мошенники используют ожидание посылок и срочные платежи. Проверять оплату нужно только через официальный сайт или приложение.'
    },
    {
      phrase: 'Ваш ребёнок попал в неприятность. Не звоните ему, переведите деньги на этот номер.',
      answer: 'Не переводить деньги и сразу связаться с ребёнком или школой по известным номерам.',
      wrongAnswers: [
        'Перевести деньги, а потом позвонить ребёнку.',
        'Попросить фото документов и после этого перевести.',
        'Отправить половину суммы, чтобы выиграть время.'
      ],
      explanation: 'Запрет звонить и требование срочного перевода — сильный признак мошенничества. Нужно проверять ситуацию напрямую.'
    },
    {
      phrase: 'Вы нарушили закон о персональных данных. Чтобы избежать штрафа, оплатите квитанцию сегодня.',
      answer: 'Не оплачивать неизвестную квитанцию и проверить информацию через официальный портал или ведомство.',
      wrongAnswers: [
        'Оплатить штраф, пока сумма не увеличилась.',
        'Попросить прислать реквизиты и оплатить через банк.',
        'Отправить паспортные данные, чтобы уточнить нарушение.'
      ],
      explanation: 'Госорганы не требуют срочно платить штрафы через случайные сообщения. Любые начисления нужно проверять в официальных сервисах.'
    },
    {
      phrase: 'Ваш номер телефона будет отключён. Назовите код из SMS для продления договора.',
      answer: 'Не называть код и обратиться к оператору через официальный сайт, приложение или номер поддержки.',
      wrongAnswers: [
        'Назвать код, если SMS пришло от оператора.',
        'Отправить код и попросить прислать новый договор.',
        'Спросить номер заявки и после этого назвать код.'
      ],
      explanation: 'Код из SMS может подтверждать вход, перевод номера или оплату. Его нельзя передавать посторонним.'
    },
    {
      phrase: 'Ваше объявление заблокировано. Для восстановления войдите через форму проверки продавца.',
      answer: 'Не входить через присланную форму и открыть личный кабинет площадки самостоятельно.',
      wrongAnswers: [
        'Войти через форму, чтобы быстрее вернуть объявление.',
        'Ввести пароль и сразу поменять его после восстановления.',
        'Попросить отправить форму на почту и войти оттуда.'
      ],
      explanation: 'Формы восстановления по ссылке могут украсть логин и пароль. Проверка должна идти через настоящий сайт или приложение.'
    },
    {
      phrase: 'Вам пришёл перевод. Чтобы зачислить деньги, подтвердите операцию кодом из банка.',
      answer: 'Не подтверждать кодом неизвестную операцию и проверить историю операций в приложении банка.',
      wrongAnswers: [
        'Ввести код, ведь деньги должны прийти на карту.',
        'Попросить отправителя назвать сумму и после этого подтвердить.',
        'Подтвердить кодом, если перевод от знакомого имени.'
      ],
      explanation: 'Код из банка чаще подтверждает списание или вход, а не получение денег. Получение перевода не требует передачи кода другому человеку.'
    }
  ];

  const phraseElement = document.getElementById('scamPhrase');
  const answerOptions = document.getElementById('answerOptions');
  const answerForm = document.getElementById('answerForm');
  const feedbackElement = document.getElementById('trainerFeedback');
  const nextButton = document.getElementById('nextPhraseButton');
  const restartButton = document.getElementById('restartTrainerButton');
  
  // Элементы для отображения прогресса
  const counterElement = document.getElementById('scamCounter');
  const scoreElement = document.getElementById('scamScore');
  const progressBar = document.getElementById('scamProgressBar');

  if (!phraseElement || !answerOptions || !answerForm || !feedbackElement || !nextButton) {
    return;
  }

  const STORAGE_KEY = 'scam-chat-state';
  const TOTAL_CARDS = scenarios.length;

  let queue = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;
  let currentScenario = null;
  let selectedAnswer = '';

  function shuffle(items) {
    return items
      .map((item) => ({ item: item, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.item);
  }

  // Сохранить состояние в localStorage
  function saveState() {
    const serializedQueue = queue.map(scenario => ({
      phrase: scenario.phrase,
      answer: scenario.answer,
      wrongAnswers: scenario.wrongAnswers,
      explanation: scenario.explanation
    }));
    
    const state = {
      queue: serializedQueue,
      currentIndex: currentIndex,
      correctCount: correctCount,
      answered: answered,
      selectedAnswer: selectedAnswer
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Загрузить состояние из localStorage
  function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.queue && Array.isArray(state.queue) && state.queue.length === TOTAL_CARDS) {
          queue = state.queue.map(item => ({
            phrase: item.phrase,
            answer: item.answer,
            wrongAnswers: item.wrongAnswers,
            explanation: item.explanation
          }));
          currentIndex = Number.isInteger(state.currentIndex) ? Math.min(Math.max(state.currentIndex, 0), TOTAL_CARDS) : 0;
          correctCount = Number.isInteger(state.correctCount) ? Math.min(Math.max(state.correctCount, 0), TOTAL_CARDS) : 0;
          answered = Boolean(state.answered);
          selectedAnswer = typeof state.selectedAnswer === 'string' ? state.selectedAnswer : '';
          return true;
        }
      } catch (e) {
        console.warn('Ошибка загрузки состояния тренажёра ответов:', e);
      }
    }
    return false;
  }

  // Очистить состояние в localStorage
  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function resetChoices() {
    answerOptions.querySelectorAll('.answer-option').forEach((button) => {
      button.disabled = false;
      button.classList.remove('answer-option-selected');
    });
  }

  function renderOptions(scenario) {
    const wrongAnswers = shuffle(scenario.wrongAnswers)
      .filter((answer) => answer !== scenario.answer)
      .slice(0, 3);
    const options = shuffle([scenario.answer].concat(wrongAnswers));

    answerOptions.innerHTML = '';

    options.forEach((optionText) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'answer-option';
      optionButton.textContent = optionText;
      optionButton.addEventListener('click', () => {
        if (answered) {
          return;
        }

        selectedAnswer = optionText;
        answerOptions.querySelectorAll('.answer-option').forEach((button) => {
          button.classList.remove('answer-option-selected');
        });
        optionButton.classList.add('answer-option-selected');
      });
      answerOptions.appendChild(optionButton);
    });
  }

  function updateProgress() {
    if (counterElement) {
      counterElement.textContent = (currentIndex + 1) + ' из ' + TOTAL_CARDS;
    }
    if (progressBar) {
      const percent = Math.round((currentIndex / TOTAL_CARDS) * 100);
      progressBar.style.width = percent + '%';
    }
  }

  function updateScore() {
    if (scoreElement) {
      scoreElement.textContent = 'Верных ответов: ' + correctCount;
    }
  }

  function showFeedback(isCorrect) {
    if (isCorrect) {
      feedbackElement.className = 'trainer-feedback trainer-feedback-success';
      feedbackElement.textContent = 'Верно. ' + currentScenario.explanation;
    } else {
      feedbackElement.className = 'trainer-feedback trainer-feedback-error';
      feedbackElement.textContent = 'Это небезопасно. Правильнее: ' + currentScenario.answer + ' ' + currentScenario.explanation;
    }

    answerOptions.querySelectorAll('.answer-option').forEach((button) => {
      button.disabled = true;
      if (button.textContent === selectedAnswer) {
        button.classList.add('answer-option-selected');
      }
    });

    if (progressBar) {
      progressBar.style.width = Math.round(((currentIndex + 1) / TOTAL_CARDS) * 100) + '%';
    }
    updateScore();
    nextButton.disabled = false;
  }

  function renderCurrentCard() {
    if (currentIndex < TOTAL_CARDS && queue[currentIndex]) {
      currentScenario = queue[currentIndex];
      phraseElement.textContent = currentScenario.phrase;
      renderOptions(currentScenario);
      updateProgress();
      updateScore();
      feedbackElement.className = 'trainer-feedback';
      feedbackElement.textContent = '';
      nextButton.textContent = currentIndex === TOTAL_CARDS - 1 ? 'Завершить' : 'Следующая карточка';
      if (answered && selectedAnswer) {
        showFeedback(selectedAnswer === currentScenario.answer);
      } else {
        answered = false;
        selectedAnswer = '';
        nextButton.disabled = true;
        resetChoices();
      }
    } else if (currentIndex >= TOTAL_CARDS) {
      // Все карточки пройдены
      phraseElement.textContent = 'Поздравляем! Вы прошли все сценарии. Тренировка завершена.';
      answerOptions.innerHTML = '';
      feedbackElement.className = 'trainer-feedback trainer-feedback-success';
      feedbackElement.textContent = 'Тренировка завершена. Ваш результат: ' + correctCount + ' из ' + TOTAL_CARDS + '. Нажмите "Начать заново", чтобы пройти тренировку ещё раз.';
      nextButton.textContent = 'Завершено';
      nextButton.disabled = true;
      updateScore();
      if (counterElement) {
        counterElement.textContent = TOTAL_CARDS + ' из ' + TOTAL_CARDS;
      }
      if (progressBar) {
        progressBar.style.width = '100%';
      }
    }
  }

  function checkAnswer(event) {
    event.preventDefault();

    if (!currentScenario || answered) {
      if (currentIndex >= TOTAL_CARDS) {
        feedbackElement.className = 'trainer-feedback trainer-feedback-success';
        feedbackElement.textContent = 'Вы уже прошли все сценарии! Нажмите "Начать заново", чтобы повторить.';
      } else if (answered) {
        feedbackElement.className = 'trainer-feedback trainer-feedback-warning';
        feedbackElement.textContent = 'Вы уже ответили на эту карточку. Нажмите "Следующая карточка".';
      }
      return;
    }

    if (!selectedAnswer) {
      feedbackElement.className = 'trainer-feedback trainer-feedback-warning';
      feedbackElement.textContent = 'Сначала выберите вариант ответа.';
      return;
    }

    const isCorrect = (selectedAnswer === currentScenario.answer);
    answered = true;

    if (isCorrect) {
      correctCount += 1;
    }

    showFeedback(isCorrect);
    saveState();
  }

  function nextCard() {
    if (currentIndex < TOTAL_CARDS - 1 && answered) {
      currentIndex++;
      answered = false;
      selectedAnswer = '';
      renderCurrentCard();
      saveState();
    } else if (currentIndex === TOTAL_CARDS - 1 && answered) {
      // Переход к финальному состоянию
      currentIndex++;
      answered = false;
      selectedAnswer = '';
      renderCurrentCard();
      saveState();
    } else if (!answered && currentIndex < TOTAL_CARDS) {
      feedbackElement.className = 'trainer-feedback trainer-feedback-warning';
      feedbackElement.textContent = 'Сначала ответьте на текущую карточку.';
    } else if (currentIndex >= TOTAL_CARDS) {
      feedbackElement.className = 'trainer-feedback trainer-feedback-success';
      feedbackElement.textContent = 'Вы уже прошли все сценарии! Нажмите "Начать заново".';
    }
  }

  // Функция для полного сброса тренажёра
  function restartTrainer() {
    queue = shuffle(scenarios.slice());
    currentIndex = 0;
    correctCount = 0;
    answered = false;
    currentScenario = null;
    selectedAnswer = '';
    clearState();
    renderCurrentCard();
  }

  answerForm.addEventListener('submit', checkAnswer);
  nextButton.addEventListener('click', nextCard);

  if (restartButton) {
    restartButton.addEventListener('click', restartTrainer);
  }

  // При загрузке страницы пробуем восстановить состояние
  if (!loadState()) {
    // Если сохранённого состояния нет, начинаем новую игру
    queue = shuffle(scenarios.slice());
    currentIndex = 0;
  }
  
  renderCurrentCard();
}());
