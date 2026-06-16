<<<<<<< HEAD
// Переключение светлой/тёмной темы
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // При загрузке страницы проверяем сохранённую тему
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        if (themeToggle) themeToggle.textContent = '🌙';
    }
    
    // Обработчик нажатия на кнопку
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-theme')) {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }
})();
=======
// Автоматическое создание оглавления из заголовков H2 и H3
document.addEventListener('DOMContentLoaded', function() {
    // Находим контент страницы
    const content = document.querySelector('.content-wrapper');
    if (!content) return;
    
    // Находим все заголовки H2 и H3 внутри content-wrapper
    const headings = content.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Если заголовков мало — оглавление не нужно
    
    // Создаём контейнер для оглавления
    const tocContainer = document.createElement('aside');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = '<div class="toc-header">📑 Содержание</div><ul class="toc-list"></ul>';
    
    const tocList = tocContainer.querySelector('.toc-list');
    
    // Добавляем ID каждому заголовку и создаём пункт оглавления
    headings.forEach((heading, index) => {
        // Создаём уникальный ID для заголовка
        const id = `section-${index}-${heading.textContent.toLowerCase().replace(/[^a-zа-яё0-9]/g, '-')}`;
        heading.id = id;
        
        // Создаём пункт оглавления
        const li = document.createElement('li');
        li.className = `toc-item toc-level-${heading.tagName.toLowerCase()}`;
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        tocList.appendChild(li);
    });
    
    // Вставляем оглавление перед контентом (но можно и после)
    // Для размещения справа используем CSS, а не позиционирование в DOM
    content.parentElement.insertBefore(tocContainer, content);
});
>>>>>>> 78ffc22293c2dadceb59b3cd07ecde3f68c65882
