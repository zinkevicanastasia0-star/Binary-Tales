(function () {
  const linkExamples = [
    {
      url: 'https://vk.com/settings',
      isDangerous: false,
      explanation: 'Это короткий основной домен vk.com и понятный раздел настроек. Всё равно вводить пароль стоит только после ручной проверки адресной строки.',
      signs: ['основной домен сервиса', 'нет лишних слов перед доменом', 'используется HTTPS']
    },
    {
      url: 'https://vk-login-security.ru/restore',
      isDangerous: true,
      explanation: 'Домен не vk.com, а vk-login-security.ru. В названии есть знакомые слова, но это отдельный сайт, который может подделывать вход.',
      signs: ['чужой домен', 'слова login и security создают ложное доверие', 'похоже на фишинг']
    },
    {
      url: 'https://gosuslugi.ru/payments',
      isDangerous: false,
      explanation: 'Адрес использует основной домен gosuslugi.ru. Перед оплатой всё равно лучше открыть сайт вручную, а не из сообщения.',
      signs: ['основной домен', 'понятный путь страницы', 'нет подозрительных добавок']
    },
    {
      url: 'https://gosuslugi-payments.ru/fine',
      isDangerous: true,
      explanation: 'Это не gosuslugi.ru. Слова payments и fine добавлены в домен, чтобы ссылка выглядела официально.',
      signs: ['подмена домена', 'давление темой штрафа', 'официальное слово внутри чужого адреса']
    },
    {
      url: 'https://telegram.org/apps',
      isDangerous: false,
      explanation: 'Это официальный короткий домен telegram.org и обычный раздел приложений.',
      signs: ['основной домен', 'нет лишних дефисов', 'адрес выглядит коротко и понятно']
    },
    {
      url: 'https://teIegram.org/login',
      isDangerous: true,
      explanation: 'В адресе может быть подмена буквы: вместо маленькой l используется похожая заглавная I. Такие ссылки легко не заметить глазами.',
      signs: ['похожие символы', 'подмена названия сервиса', 'страница просит вход']
    },
    {
      url: 'https://mail.yandex.ru',
      isDangerous: false,
      explanation: 'Это поддомен mail внутри основного домена yandex.ru. Такой формат для разделов сервиса нормален.',
      signs: ['поддомен принадлежит основному домену', 'нет лишних слов после yandex.ru', 'адрес короткий']
    },
    {
      url: 'https://yandex.ru.account-check.example.com',
      isDangerous: true,
      explanation: 'Главный домен здесь example.com, а yandex.ru находится только в начале как поддомен. Это частый способ маскировки.',
      signs: ['настоящий домен стоит в конце', 'название сервиса спрятано в поддомене', 'account-check давит на безопасность']
    },
    {
      url: 'https://sberbank.ru/ru/person',
      isDangerous: false,
      explanation: 'Адрес использует основной домен sberbank.ru. Для банковских операций всё равно лучше набирать адрес вручную.',
      signs: ['основной домен банка', 'обычный путь страницы', 'нет подозрительных символов']
    },
    {
      url: 'https://sberbank.ru.secure-login.example.net',
      isDangerous: true,
      explanation: 'Главный домен здесь example.net, а sberbank.ru — только часть поддомена. Так можно подделать знакомый адрес.',
      signs: ['настоящий домен не sberbank.ru', 'слова secure-login маскируют риск', 'адрес слишком длинный']
    },
    {
      url: 'https://ok.ru/profile',
      isDangerous: false,
      explanation: 'Это короткий основной домен ok.ru и обычный раздел профиля.',
      signs: ['основной домен', 'короткий адрес', 'нет лишних доменных зон']
    },
    {
      url: 'https://ok-ru-support.com/unlock',
      isDangerous: true,
      explanation: 'Это не ok.ru, а отдельный домен ok-ru-support.com. Его могут использовать для кражи пароля при "разблокировке".',
      signs: ['чужой домен', 'слово support внутри адреса', 'обещание разблокировки']
    },
    {
      url: 'https://www.ozon.ru/my/orderlist',
      isDangerous: false,
      explanation: 'Адрес находится на основном домене ozon.ru. Раздел заказов лучше открывать из приложения или вручную.',
      signs: ['основной домен', 'www перед доменом допустим', 'понятный путь заказов']
    },
    {
      url: 'https://ozon-delivery-pay.ru/order/4812',
      isDangerous: true,
      explanation: 'Это отдельный домен, похожий на доставку Ozon. Такие ссылки часто просят оплатить "доставку" или "сбор".',
      signs: ['не ozon.ru', 'слова delivery и pay', 'похожая тема оплаты']
    },
    {
      url: 'https://www.avito.ru/profile',
      isDangerous: false,
      explanation: 'Адрес использует основной домен avito.ru. Вводить данные карты для получения денег по чужой ссылке всё равно нельзя.',
      signs: ['основной домен', 'обычный раздел профиля', 'нет маскировки через дефисы']
    },
    {
      url: 'https://avito.safe-deal.example.org/card',
      isDangerous: true,
      explanation: 'Главный домен здесь example.org. Слово avito стоит только в поддомене, а safe-deal создаёт ложное доверие.',
      signs: ['главный домен чужой', 'упоминание безопасной сделки', 'страница связана с картой']
    },
    {
      url: 'https://account.microsoft.com/security',
      isDangerous: false,
      explanation: 'Это поддомен account внутри microsoft.com и раздел security. Такой адрес выглядит нормальным.',
      signs: ['главный домен microsoft.com', 'понятный раздел безопасности', 'нет лишней доменной зоны']
    },
    {
      url: 'https://microsoft.com.security-check.example.com',
      isDangerous: true,
      explanation: 'Главный домен — example.com. microsoft.com здесь только часть длинного поддомена.',
      signs: ['настоящий домен в конце', 'security-check маскирует фишинг', 'слишком длинный адрес']
    },
    {
      url: 'https://www.youtube.com/account',
      isDangerous: false,
      explanation: 'Адрес находится на основном домене youtube.com. Проверяйте, что после youtube.com нет другой доменной зоны.',
      signs: ['основной домен', 'www допустим', 'нет подозрительных добавок']
    },
    {
      url: 'https://youtube.com-login.video.example.ru',
      isDangerous: true,
      explanation: 'Главный домен здесь example.ru, а youtube.com-login — часть поддомена. Это не YouTube.',
      signs: ['чужой главный домен', 'дефис после названия сервиса', 'страница имитирует вход']
    }
  ];

  const counterElement = document.getElementById('linkQuestionCounter');
  const scoreElement = document.getElementById('linkCheckerScore');
  const progressBar = document.getElementById('linkProgressBar');
  const linkText = document.getElementById('linkText');
  const choiceRow = document.getElementById('linkChoiceRow');
  const feedbackElement = document.getElementById('linkFeedback');
  const nextButton = document.getElementById('nextLinkButton');
  const restartButton = document.getElementById('restartLinksButton');

  if (!counterElement || !scoreElement || !progressBar || !linkText || !choiceRow || !feedbackElement || !nextButton || !restartButton) {
    return;
  }

  const STORAGE_KEY = 'link-checker-state';

  let queue = [];
  let currentIndex = 0;
  let correctCount = 0;
  let answered = false;
  let currentLink = null;

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
        console.warn('Ошибка загрузки состояния тренажёра ссылок:', e);
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
      button.classList.remove('link-choice-correct', 'link-choice-wrong');
    });
  }

  function renderLink() {
    currentLink = queue[currentIndex];
    answered = false;
    linkText.textContent = currentLink.url;
    counterElement.textContent = (currentIndex + 1) + ' из ' + queue.length;
    scoreElement.textContent = 'Верных ответов: ' + correctCount;
    progressBar.style.width = Math.round((currentIndex / queue.length) * 100) + '%';
    feedbackElement.className = 'link-feedback';
    feedbackElement.textContent = '';
    nextButton.textContent = currentIndex === queue.length - 1 ? 'Завершить' : 'Следующая ссылка';
    nextButton.disabled = true;
    resetChoices();
  }

  function startQuiz() {
    queue = shuffle(linkExamples.slice());
    currentIndex = 0;
    correctCount = 0;
    clearState(); // Очищаем сохранённое состояние при новом старте
    renderLink();
  }

  function showFeedback(isCorrect, selectedChoice) {
    const correctChoice = currentLink.isDangerous ? 'Подозрительная' : 'Безопасная';
    const signText = currentLink.signs.join('; ');

    feedbackElement.className = isCorrect ? 'link-feedback link-feedback-success' : 'link-feedback link-feedback-error';
    feedbackElement.textContent = (isCorrect ? 'Верно. ' : 'Неверно. Правильный ответ: ' + correctChoice + '. ') + currentLink.explanation + ' Признаки: ' + signText + '.';

    choiceRow.querySelectorAll('button').forEach((button) => {
      const buttonIsDanger = button.dataset.choice === 'danger';
      button.disabled = true;

      if (buttonIsDanger === currentLink.isDangerous) {
        button.classList.add('link-choice-correct');
      } else if (button.dataset.choice === selectedChoice) {
        button.classList.add('link-choice-wrong');
      }
    });

    nextButton.disabled = false;
    progressBar.style.width = Math.round(((currentIndex + 1) / queue.length) * 100) + '%';
    scoreElement.textContent = 'Верных ответов: ' + correctCount;
    saveState();
  }

  choiceRow.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-choice]');
    if (!button || answered || !currentLink) {
      return;
    }

    answered = true;
    const selectedChoice = button.dataset.choice;
    const selectedDanger = selectedChoice === 'danger';
    const isCorrect = selectedDanger === currentLink.isDangerous;

    if (isCorrect) {
      correctCount += 1;
    }

    showFeedback(isCorrect, selectedChoice);
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < queue.length - 1) {
      currentIndex += 1;
      renderLink();
      saveState();
      return;
    }

    feedbackElement.className = 'link-feedback link-feedback-success';
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
    renderLink();
  }
}());
