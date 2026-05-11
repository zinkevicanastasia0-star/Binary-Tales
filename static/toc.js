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