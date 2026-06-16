(function () {
  const cards = [
    {
      statement: 'Сотрудник банка может попросить код из SMS, если нужно срочно защитить карту.',
      isTruth: false,
      explanation: 'Код из SMS нельзя сообщать никому. Настоящий банк не просит коды подтверждения по телефону или в чате.'
    },
    {
      statement: 'Двухфакторная аутентификация помогает защитить аккаунт, даже если пароль уже узнали.',
      isTruth: true,
      explanation: 'Второй фактор добавляет дополнительный барьер: одного пароля злоумышленнику становится недостаточно.'
    },
    {
      statement: 'Если ссылка пришла от друга, она всегда безопасна.',
      isTruth: false,
      explanation: 'Аккаунт друга могли взломать. Ссылки из переписки всё равно нужно проверять.'
    },
    {
      statement: 'Один пароль для всех сайтов повышает риск взлома сразу нескольких аккаунтов.',
      isTruth: true,
      explanation: 'Если один сайт утечёт, этот же пароль попробуют на почте, соцсетях и других сервисах.'
    },
    {
      statement: 'Длинный пароль бесполезен, если ввести его на поддельном сайте.',
      isTruth: true,
      explanation: 'Фишинговый сайт крадёт пароль напрямую. Поэтому важно проверять адрес страницы перед входом.'
    },
    {
      statement: 'Значок HTTPS гарантирует, что сайт настоящий.',
      isTruth: false,
      explanation: 'HTTPS шифрует соединение, но не доказывает, что сайт принадлежит нужной компании. Фишинговые сайты тоже могут иметь HTTPS.'
    },
    {
      statement: 'Менеджер паролей помогает использовать разные сложные пароли для разных сервисов.',
      isTruth: true,
      explanation: 'Менеджер паролей хранит уникальные пароли и снижает соблазн повторять один пароль везде.'
    },
    {
      statement: 'Почту и телефон для восстановления аккаунта нужно иногда проверять.',
      isTruth: true,
      explanation: 'Если там появился чужой контакт, злоумышленник может восстановить доступ к аккаунту.'
    },
    {
      statement: 'Антивирус по ссылке из случайного сообщения может сам оказаться вредоносной программой.',
      isTruth: true,
      explanation: 'Под видом защиты могут прислать приложение, которое получает доступ к устройству и данным.'
    },
    {
      statement: 'Режим инкогнито защищает от фишинговых сайтов.',
      isTruth: false,
      explanation: 'Инкогнито не проверяет честность сайта. Он только меньше сохраняет историю и локальные данные.'
    },
    {
      statement: 'QR-код может вести на поддельную страницу так же, как обычная ссылка.',
      isTruth: true,
      explanation: 'QR-код скрывает адрес до сканирования, поэтому его тоже нужно проверять перед вводом данных.'
    },
    {
      statement: 'CVV можно назвать, если вам переводят деньги.',
      isTruth: false,
      explanation: 'CVV нужен для списания денег, а не для получения перевода. Его нельзя передавать.'
    },
    {
      statement: 'Поддержка сервиса не должна просить код входа в личной переписке.',
      isTruth: true,
      explanation: 'Код входа открывает доступ к аккаунту. Поддержка не подтверждает личность таким способом.'
    },
    {
      statement: 'Если на странице есть настоящий логотип компании, значит странице можно доверять.',
      isTruth: false,
      explanation: 'Логотип легко скопировать. Нужно проверять домен, источник ссылки и смысл запроса.'
    },
    {
      statement: 'После взлома полезно завершить все активные сессии.',
      isTruth: true,
      explanation: 'Так можно выбросить злоумышленника с чужого устройства после смены пароля.'
    },
    {
      statement: 'Короткий пароль с символами всегда надёжнее длинной парольной фразы.',
      isTruth: false,
      explanation: 'Длина очень важна. Длинная уникальная фраза часто надёжнее короткого сложного набора символов.'
    },
    {
      statement: 'Разрешения сторонних приложений стоит проверять и удалять лишние.',
      isTruth: true,
      explanation: 'Старые приложения и боты могут сохранять доступ к данным аккаунта.'
    },
    {
      statement: 'Код из банка всегда подтверждает получение денег.',
      isTruth: false,
      explanation: 'Код может подтверждать списание, вход или изменение настроек. Нельзя подтверждать операцию, которую вы не начинали.'
    },
    {
      statement: 'В адресе сайта важен настоящий домен, а не только знакомые слова в начале ссылки.',
      isTruth: true,
      explanation: 'В ссылке вроде service.ru.example.com настоящим доменом будет example.com, а не service.ru.'
    },
    {
      statement: 'Если удалить подозрительное сообщение, риск взлома аккаунта полностью исчезает.',
      isTruth: false,
      explanation: 'Удаление сообщения не меняет пароль, сессии и настройки восстановления. Нужно проверить аккаунт и закрыть доступ.'
    }
  ];

  const counterElement = document.getElementById('mythCounter');
  const scoreElement = document.getElementById('mythScore');
  const progressBar = document.getElementById('mythProgressBar');
  const statementElement = document.getElementById('mythStatement');
  const choiceRow = document.getElementById('mythChoiceRow');
  const feedbackElement = document.getElementById('mythFeedback');
  const nextButton = document.getElementById('nextMythButton');
  const restartButton = document.getElementById('restartMythButton');

  if (!counterElement || !scoreElement || !progressBar || !statementElement || !choiceRow || !feedbackElement || !nextButton || !restartButton) {
    return;
  }

  const STORAGE_KEY = 'truth-or-myth-state';

  let queue = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;
  let currentCard = null;
  let previousStatement = '';

  function shuffle(items) {
    return items
      .map((item) => ({ item: item, order: Math.random() }))
      .sort((a, b) => a.order - b.order)
      .map((entry) => entry.item);
  }

  // Сохранить состояние в localStorage
  function saveState() {
    const state = {
      queue: queue,
      currentIndex: currentIndex,
      correctCount: correctCount
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Загрузить состояние из localStorage
  function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.queue && Array.isArray(state.queue) && state.queue.length > 0) {
          queue = state.queue;
          currentIndex = state.currentIndex;
          correctCount = state.correctCount;
          return true;
        }
      } catch (e) {
        console.warn('Ошибка загрузки состояния игры "Правда или миф":', e);
      }
    }
    return false;
  }

  // Очистить состояние в localStorage
  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function resetChoices() {
    choiceRow.querySelectorAll('button').forEach((button) => {
      button.disabled = false;
      button.classList.remove('myth-choice-correct', 'myth-choice-wrong');
    });
  }

  function buildQueue() {
    const nextQueue = shuffle(cards.slice());

    if (nextQueue.length > 1 && previousStatement && nextQueue[0].statement === previousStatement) {
      const swapIndex = nextQueue.findIndex((card) => card.statement !== previousStatement);
      if (swapIndex > 0) {
        const firstCard = nextQueue[0];
        nextQueue[0] = nextQueue[swapIndex];
        nextQueue[swapIndex] = firstCard;
      }
    }

    return nextQueue;
  }

  function renderCard() {
    currentCard = queue[currentIndex];
    previousStatement = currentCard.statement;
    answered = false;
    statementElement.textContent = currentCard.statement;
    counterElement.textContent = (currentIndex + 1) + ' из ' + queue.length;
    scoreElement.textContent = 'Верных ответов: ' + correctCount;
    progressBar.style.width = Math.round((currentIndex / queue.length) * 100) + '%';
    feedbackElement.className = 'myth-feedback';
    feedbackElement.textContent = '';
    nextButton.textContent = currentIndex === queue.length - 1 ? 'Завершить' : 'Следующая карточка';
    nextButton.disabled = true;
    resetChoices();
  }

  function startQuiz() {
    queue = buildQueue();
    currentIndex = 0;
    correctCount = 0;
    clearState(); // Очищаем сохранённое состояние при новом старте
    renderCard();
  }

  function showFeedback(isCorrect, selectedChoice) {
    const correctChoice = currentCard.isTruth ? 'Правда' : 'Миф';

    feedbackElement.className = isCorrect ? 'myth-feedback myth-feedback-success' : 'myth-feedback myth-feedback-error';
    feedbackElement.textContent = (isCorrect ? 'Верно. ' : 'Неверно. Правильный ответ: ' + correctChoice + '. ') + currentCard.explanation;

    choiceRow.querySelectorAll('button').forEach((button) => {
      const buttonIsTruth = button.dataset.choice === 'truth';
      button.disabled = true;

      if (buttonIsTruth === currentCard.isTruth) {
        button.classList.add('myth-choice-correct');
      } else if (button.dataset.choice === selectedChoice) {
        button.classList.add('myth-choice-wrong');
      }
    });

    nextButton.disabled = false;
    progressBar.style.width = Math.round(((currentIndex + 1) / queue.length) * 100) + '%';
    scoreElement.textContent = 'Верных ответов: ' + correctCount;
    saveState();
  }

  choiceRow.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-choice]');
    if (!button || answered || !currentCard) {
      return;
    }

    answered = true;
    const selectedChoice = button.dataset.choice;
    const selectedTruth = selectedChoice === 'truth';
    const isCorrect = selectedTruth === currentCard.isTruth;

    if (isCorrect) {
      correctCount += 1;
    }

    showFeedback(isCorrect, selectedChoice);
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < queue.length - 1) {
      currentIndex += 1;
      renderCard();
      saveState();
      return;
    }

    feedbackElement.className = 'myth-feedback myth-feedback-success';
    feedbackElement.textContent = 'Тренировка завершена. Ваш результат: ' + correctCount + ' из ' + queue.length + '.';
    nextButton.textContent = 'Завершено';
    nextButton.disabled = true;
    saveState();
  });

  restartButton.addEventListener('click', startQuiz);

  // При загрузке страницы пробуем восстановить состояние
  if (!loadState()) {
    // Если сохранённого состояния нет, начинаем новую игру
    startQuiz();
  } else {
    // Если состояние загружено, отображаем текущий вопрос
    renderCard();
  }
}());
