

let allBooks = [];

async function loadAllBooks() {
    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const noBooksDiv = document.getElementById('noBooks');
    const bookGrid = document.getElementById('bookGrid');

    try {
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        noBooksDiv.style.display = 'none';
        bookGrid.innerHTML = '';

        const response = await fetch('/proxy/books');

        if (!response.ok) {
            throw new Error('Ошибка загрузки книг');
        }

        const data = await response.json();
        allBooks = Array.isArray(data) ? data : (data.content || []);

        loadingDiv.style.display = 'none';
        displayBooks(allBooks);
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.textContent = '❌ Ошибка загрузки книг: ' + error.message;
        errorDiv.style.display = 'block';
    }
}

function displayBooks(books) {
    const bookGrid = document.getElementById('bookGrid');
    const noBooksDiv = document.getElementById('noBooks');

    if (!books || books.length === 0) {
        bookGrid.innerHTML = '';
        noBooksDiv.style.display = 'block';
        return;
    }

    noBooksDiv.style.display = 'none';

    bookGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-title">${escapeHtml(book.title)}</div>
            <div class="book-author">✍️ ${escapeHtml(book.author)}</div>
            <div class="book-info">
                <span>🏷️ Жанр:</span>
                <span>${escapeHtml(book.genre)}</span>
            </div>
            <div class="book-info">
                <span>📅 Дата выхода:</span>
                <span>${book.date || 'Не указана'}</span>
            </div>
            <div class="book-description">
                ${escapeHtml(book.description || 'Описание отсутствует')}
            </div>
            <a href="${book.fileLink}" target="_blank" class="book-link">
                📖 Открыть книгу
            </a>
        </div>
    `).join('');
}

async function searchBooks() {
    const title = document.getElementById('searchTitle').value.trim();
    const author = document.getElementById('searchAuthor').value.trim();
    const genre = document.getElementById('searchGenre').value.trim();
    const dateFrom = document.getElementById('searchDateFrom').value;
    const dateTo = document.getElementById('searchDateTo').value;

    // Если все поля пустые, показываем все книги
    if (!title && !author && !genre && !dateFrom && !dateTo) {
        displayBooks(allBooks);
        return;
    }

    const loadingDiv = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    const bookGrid = document.getElementById('bookGrid');

    try {
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        bookGrid.innerHTML = '';

        let url = '/proxy/books/search?';
        const params = [];

        if (title) params.push(`title=${encodeURIComponent(title)}`);
        if (author) params.push(`author=${encodeURIComponent(author)}`);
        if (genre) params.push(`genre=${encodeURIComponent(genre)}`);
        if (dateFrom) params.push(`minReleaseDate=${dateFrom}`);
        if (dateTo) params.push(`maxReleaseDate=${dateTo}`);

        url += params.join('&');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Ошибка поиска');
        }

        const data = await response.json();
        const searchResults = Array.isArray(data) ? data : (data.content || []);

        loadingDiv.style.display = 'none';
        displayBooks(searchResults);
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.textContent = '❌ Ошибка поиска: ' + error.message;
        errorDiv.style.display = 'block';
    }
}

function clearSearchAndLoadAll() {
    document.getElementById('searchTitle').value = '';
    document.getElementById('searchAuthor').value = '';
    document.getElementById('searchGenre').value = '';
    document.getElementById('searchDateFrom').value = '';
    document.getElementById('searchDateTo').value = '';

    displayBooks(allBooks);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


document.addEventListener('DOMContentLoaded', function() {
    loadAllBooks();


    const searchInputs = [
        'searchTitle',
        'searchAuthor',
        'searchGenre',
        'searchDateFrom',
        'searchDateTo'
    ];

    searchInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBooks();
                }
            });
        }
    });
});
