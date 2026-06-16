(function () {
  const crisisSteps = document.getElementById('crisisSteps');
  const scoreElement = document.getElementById('crisisScore');
  const statusElement = document.getElementById('crisisStatus');
  const progressBar = document.getElementById('crisisProgressBar');
  const adviceElement = document.getElementById('crisisAdvice');
  const resetButton = document.getElementById('crisisReset');
  const copyButton = document.getElementById('copyCrisisMessage');
  const copyStatus = document.getElementById('copyCrisisStatus');
  const messageText = document.getElementById('crisisMessageText');

  if (!crisisSteps || !scoreElement || !statusElement || !progressBar || !adviceElement || !resetButton) {
    return;
  }

  const checkboxes = Array.from(crisisSteps.querySelectorAll('input[type="checkbox"]'));
  const total = checkboxes.length;
  const STORAGE_KEY = 'crisis-checklist-state';

  // Сохранить состояние всех чекбоксов в localStorage
  function saveState() {
    const state = checkboxes.map(checkbox => checkbox.checked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Загрузить состояние из localStorage и применить к чекбоксам
  function loadState() {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (Array.isArray(state) && state.length === checkboxes.length) {
          checkboxes.forEach((checkbox, index) => {
            checkbox.checked = state[index];
          });
        }
      } catch (e) {
        console.warn('Ошибка загрузки состояния кризис-чеклиста:', e);
      }
    }
  }

  // Очистить состояние в localStorage
  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getStatus(checkedCount) {
    if (checkedCount <= 2) {
      return {
        text: 'Нужна срочная защита',
        className: 'crisis-status crisis-status-low',
        advice: 'Начните с пароля и завершения всех сессий: это быстрее всего закрывает доступ злоумышленнику.'
      };
    }

    if (checkedCount <= 5) {
      return {
        text: 'Основные меры выполняются',
        className: 'crisis-status crisis-status-medium',
        advice: 'Хорошее начало. Теперь проверьте привязанные контакты, приложения и предупредите друзей.'
      };
    }

    if (checkedCount < total) {
      return {
        text: 'Аккаунт почти под контролем',
        className: 'crisis-status crisis-status-high',
        advice: 'Осталось закрыть последние пункты и сохранить доказательства подозрительной активности.'
      };
    }

    return {
      text: 'План восстановления выполнен',
      className: 'crisis-status crisis-status-high',
      advice: 'План выполнен. Через несколько дней снова проверьте сессии, контакты восстановления и уведомления безопасности.'
    };
  }

  function updateCrisisProgress() {
    const checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
    const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);
    const status = getStatus(checkedCount);

    scoreElement.textContent = checkedCount + ' из ' + total;
    statusElement.textContent = status.text;
    statusElement.className = status.className;
    progressBar.style.width = percent + '%';
    adviceElement.textContent = status.advice;

    checkboxes.forEach((checkbox) => {
      const step = checkbox.closest('.crisis-step');
      if (step) {
        step.classList.toggle('crisis-step-done', checkbox.checked);
      }
    });
  }

  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (!copied) {
      throw new Error('Copy command failed');
    }
  }

  function selectMessageText() {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(messageText);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  async function copyMessage() {
    if (!copyButton || !copyStatus || !messageText) {
      return;
    }

    const text = messageText.textContent.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }
      copyStatus.textContent = 'Текст скопирован';
    } catch (error) {
      try {
        fallbackCopy(text);
        copyStatus.textContent = 'Текст скопирован';
      } catch (fallbackError) {
        selectMessageText();
        copyStatus.textContent = 'Текст выделен, нажмите Ctrl+C или Cmd+C';
      }
    }
  }

  // Обработчик изменения чекбокса (сохраняем состояние)
  function onCheckboxChange() {
    updateCrisisProgress();
    saveState();
  }

  // Добавляем обработчики
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', onCheckboxChange);
  });

  // Кнопка сброса: очищаем чекбоксы, обновляем интерфейс, очищаем localStorage
  resetButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    updateCrisisProgress();
    clearState();
  });

  if (copyButton) {
    copyButton.addEventListener('click', copyMessage);
  }

  // Загружаем сохранённое состояние при запуске
  loadState();
  // Обновляем интерфейс после загрузки состояния
  updateCrisisProgress();
}());
