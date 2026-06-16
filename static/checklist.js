(function () {
  const checklist = document.getElementById('securityChecklist');
  const scoreElement = document.getElementById('checklistScore');
  const statusElement = document.getElementById('checklistStatus');
  const adviceElement = document.getElementById('checklistAdvice');
  const progressBar = document.getElementById('checklistProgressBar');
  const resetButton = document.getElementById('checklistReset');

  if (!checklist || !scoreElement || !statusElement || !adviceElement || !progressBar || !resetButton) {
    return;
  }

  const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
  const total = checkboxes.length;
  const STORAGE_KEY = 'security-checklist-state';

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
        console.warn('Ошибка загрузки состояния чек-листа:', e);
      }
    }
  }

  // Очистить состояние в localStorage
  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getAdvice(checkedCount) {
    if (checkedCount <= 3) {
      return 'Сначала укрепите базу: сделайте уникальный длинный пароль и включите двухфакторную аутентификацию.';
    }

    if (checkedCount <= 6) {
      return 'Базовая защита уже есть. Теперь проверьте старые сессии, привязанные контакты и доступы сторонних приложений.';
    }

    if (checkedCount === 7) {
      return 'Почти готово. Остался один пункт — закройте последнюю слабую сторону аккаунта.';
    }

    return 'Отличный уровень защиты. Возвращайтесь к чек-листу иногда, чтобы проверять настройки заново.';
  }

  function getStatus(checkedCount) {
    if (checkedCount <= 3) {
      return {
        text: 'Аккаунт уязвим',
        className: 'checklist-status checklist-status-low'
      };
    }

    if (checkedCount <= 6) {
      return {
        text: 'Базовая защита есть',
        className: 'checklist-status checklist-status-medium'
      };
    }

    return {
      text: 'Хороший уровень безопасности',
      className: 'checklist-status checklist-status-high'
    };
  }

  function updateChecklist() {
    const checkedCount = checkboxes.filter((checkbox) => checkbox.checked).length;
    const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);
    const status = getStatus(checkedCount);

    scoreElement.textContent = checkedCount + ' из ' + total;
    statusElement.textContent = status.text;
    statusElement.className = status.className;
    progressBar.style.width = percent + '%';
    adviceElement.textContent = getAdvice(checkedCount);

    checkboxes.forEach((checkbox) => {
      const item = checkbox.closest('.checklist-item');
      if (item) {
        item.classList.toggle('checklist-item-done', checkbox.checked);
      }
    });
  }

  // Обработчик изменения чекбокса (сохраняем состояние)
  function onCheckboxChange() {
    updateChecklist();
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
    updateChecklist();
    clearState();
  });

  // Загружаем сохранённое состояние при запуске
  loadState();
  // Обновляем интерфейс после загрузки состояния
  updateChecklist();
}());
