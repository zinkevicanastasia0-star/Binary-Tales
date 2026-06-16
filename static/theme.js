(function () {
    const storageKey = 'besafe-theme';
    const root = document.documentElement;

    function readTheme() {
        try {
            return localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
        } catch (error) {
            return 'light';
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(storageKey, theme);
        } catch (error) {
            return;
        }
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        const button = document.getElementById('themeToggle');
        const icon = document.getElementById('themeToggleIcon');
        const logo = document.querySelector('.sidebar-logo');
        const bubble = document.querySelector('.bubble');
        const menuIcon = document.getElementById('menuToggleIcon'); // Добавляем иконку меню

        root.classList.toggle('theme-dark', isDark);
        root.dataset.theme = isDark ? 'dark' : 'light';

        if (button) {
            button.setAttribute('aria-pressed', String(isDark));
            button.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить темную тему');
            button.title = isDark ? 'Включить светлую тему' : 'Включить темную тему';
        }

        if (icon) {
            icon.src = isDark ? '/img/dark-button.svg' : '/img/light-button.svg';
        }

        if (logo) {
            logo.src = isDark ? '/img/BinaryTales-dark.svg' : '/img/BinaryTales.svg';
        }

        if (bubble) {
            bubble.src = isDark ? '/img/bubbles-dark.svg' : '/img/bubbles.svg';
        }

        // Добавляем замену иконки меню
        if (menuIcon) {
            menuIcon.src = isDark ? '/img/menu-dark.svg' : '/img/menu-light.svg';
        }
    }

    applyTheme(readTheme());

    document.addEventListener('DOMContentLoaded', function () {
        const button = document.getElementById('themeToggle');

        applyTheme(readTheme());

        if (!button) {
            return;
        }

        button.addEventListener('click', function () {
            const nextTheme = root.classList.contains('theme-dark') ? 'light' : 'dark';
            applyTheme(nextTheme);
            saveTheme(nextTheme);
        });
    });
})();
