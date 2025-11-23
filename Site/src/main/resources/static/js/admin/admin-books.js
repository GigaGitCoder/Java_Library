

let currentBooks = [];

async function loadBooks() {
    try {
        const response = await fetch('/proxy/books');
        const data = await response.json();

        currentBooks = Array.isArray(data) ? data : (data.content || []);
        displayBooks(currentBooks);

        document.getElementById('loadingBooks').style.display = 'none';
        document.getElementById('booksTable').style.display = 'table';
    } catch (error) {
        showNotification('Ошибка загрузки книг', 'error');
    }
}

function displayBooks(books) {
    const tbody = document.getElementById('booksTableBody');
    tbody.innerHTML = '';

    if (books.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">Книги не найдены</td></tr>';
        return;
    }

    books.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.date || 'Не указана'}</td>
            <td>${book.description ? book.description.substring(0, 50) + '...' : 'Нет описания'}</td>
            <td><a href="${book.fileLink}" target="_blank">Открыть</a></td>
            <td class="actions">
                <button class="btn btn-warning" onclick='openEditModal(${JSON.stringify(book).replace(/'/g, "&#39;")})'>Изменить</button>
                <button class="btn btn-danger" onclick="deleteBook(${book.id})">Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function searchBooks() {
    const title = document.getElementById('searchTitle').value;
    const author = document.getElementById('searchAuthor').value;
    const genre = document.getElementById('searchGenre').value;
    const minDate = document.getElementById('searchMinDate').value;
    const maxDate = document.getElementById('searchMaxDate').value;

    let url = '/proxy/books/search?';
    if (title) url += `title=${encodeURIComponent(title)}&`;
    if (author) url += `author=${encodeURIComponent(author)}&`;
    if (genre) url += `genre=${encodeURIComponent(genre)}&`;
    if (minDate) url += `minReleaseDate=${minDate}&`;
    if (maxDate) url += `maxReleaseDate=${maxDate}&`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        currentBooks = Array.isArray(data) ? data : (data.content || []);
        displayBooks(currentBooks);
    } catch (error) {
        showNotification('Ошибка поиска книг', 'error');
    }
}

function resetSearch() {
    document.getElementById('searchTitle').value = '';
    document.getElementById('searchAuthor').value = '';
    document.getElementById('searchGenre').value = '';
    document.getElementById('searchMinDate').value = '';
    document.getElementById('searchMaxDate').value = '';
    loadBooks();
}

function openCreateModal() {
    document.getElementById('modalTitle').textContent = 'Добавить книгу';
    document.getElementById('bookForm').reset();
    document.getElementById('bookId').value = '';
    document.getElementById('bookModal').style.display = 'block';
}

function openEditModal(book) {
    document.getElementById('modalTitle').textContent = 'Редактировать книгу';
    document.getElementById('bookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookGenre').value = book.genre;
    document.getElementById('bookDate').value = book.date;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookFileLink').value = book.fileLink;
    document.getElementById('bookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

async function saveBook(e) {
    e.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const bookData = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        genre: document.getElementById('bookGenre').value,
        date: document.getElementById('bookDate').value,
        description: document.getElementById('bookDescription').value,
        fileLink: document.getElementById('bookFileLink').value
    };

    try {
        let response;
        if (bookId) {
            response = await fetch(`/proxy/books/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        } else {
            response = await fetch('/proxy/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        }

        if (response.ok) {
            showNotification(bookId ? 'Книга успешно обновлена' : 'Книга успешно добавлена', 'success');
            closeModal();
            loadBooks();
        } else {
            throw new Error('Ошибка сохранения');
        }
    } catch (error) {
        showNotification('Ошибка сохранения книги', 'error');
    }
}

async function deleteBook(id) {
    if (!confirm('Вы уверены, что хотите удалить эту книгу?')) {
        return;
    }

    try {
        const response = await fetch(`/proxy/books/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Книга успешно удалена', 'success');
            loadBooks();
        } else {
            throw new Error('Ошибка удаления');
        }
    } catch (error) {
        showNotification('Ошибка удаления книги', 'error');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    const adminContent = document.getElementById('adminContent');
    if (adminContent && adminContent.style.display === 'block') {
        loadBooks();

        const bookForm = document.getElementById('bookForm');
        if (bookForm) {
            bookForm.addEventListener('submit', saveBook);
        }

        closeModalOnClickOutside('bookModal');
    }
});
