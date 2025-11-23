

function checkAdminAccess() {
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');

    if (!token) {
        return false;
    }

    const isAdmin = role === 'ADMIN' || role === 'ROLE_ADMIN';
    return isAdmin;
}

window.addEventListener('load', function() {
    const adminContent = document.getElementById('adminContent');
    if (!adminContent) return;

    if (!checkAdminAccess()) {
        adminContent.innerHTML = `
            <div class="access-denied">
                <h2>🚫 Доступ запрещён</h2>
                <p>У вас нет прав для просмотра этой страницы.</p>
                <p>Только администраторы могут получить доступ к админ-панели.</p>
                <a href="/" class="btn-action">← Вернуться на главную</a>
            </div>
        `;
        return;
    }

    adminContent.innerHTML = `
        <header class="page-header">
            <h1>⚙️ Админ-панель</h1>
            <p class="subtitle">Управление системой библиотеки</p>
        </header>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value" id="totalUsersCount">
                    <span class="loading-spinner"></span>
                </div>
                <div class="stat-label">Всего пользователей</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">📚</div>
                <div class="stat-value" id="totalBooksCount">
                    <span class="loading-spinner"></span>
                </div>
                <div class="stat-label">Всего книг</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">⚙️</div>
                <div class="stat-value">1.0.0</div>
                <div class="stat-label">Версия системы</div>
            </div>
        </div>

        <div class="admin-sections">
            <div class="admin-card" onclick="window.location.href='/admin/users'">
                <h2>👥 Управление пользователями</h2>
                <p>Просмотр, редактирование и удаление пользователей</p>
                <ul>
                    <li>✓ Просмотр всех пользователей</li>
                    <li>✓ Поиск по nickname, email, роли</li>
                    <li>✓ Редактирование данных</li>
                    <li>✓ Удаление пользователей</li>
                    <li>✓ Регистрация администраторов</li>
                </ul>
                <a href="/admin/users" class="btn-action" onclick="event.stopPropagation()">Открыть →</a>
            </div>

            <div class="admin-card" onclick="window.location.href='/admin/books'">
                <h2>📚 Управление книгами</h2>
                <p>Добавление, редактирование и удаление книг</p>
                <ul>
                    <li>✓ Добавление новых книг</li>
                    <li>✓ Редактирование информации</li>
                    <li>✓ Удаление книг</li>
                    <li>✓ Поиск по параметрам</li>
                    <li>✓ Управление файлами</li>
                </ul>
                <a href="/admin/books" class="btn-action" onclick="event.stopPropagation()">Открыть →</a>
            </div>

            <div class="admin-card">
                <h2>⚡ Быстрые действия</h2>
                <p>Часто используемые функции</p>
                <ul>
                    <li><a href="/admin/users" style="color: #667eea; text-decoration: none;">→ Зарегистрировать админа</a></li>
                    <li><a href="/admin/books" style="color: #667eea; text-decoration: none;">→ Добавить книгу</a></li>
                    <li><a href="/" style="color: #667eea; text-decoration: none;">→ Главная страница</a></li>
                </ul>
            </div>
        </div>
    `;

    loadStatistics();
});

async function loadStatistics() {
    const token = localStorage.getItem('jwt_token');

    try {
        const usersResponse = await fetch('/proxy/auth/admin/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (usersResponse.ok) {
            const usersData = await usersResponse.json();
            const usersCount = Array.isArray(usersData) ? usersData.length : (usersData.content ? usersData.content.length : 0);
            document.getElementById('totalUsersCount').textContent = usersCount;
        } else {
            throw new Error('Ошибка загрузки пользователей');
        }
    } catch (error) {
        document.getElementById('totalUsersCount').textContent = '—';
    }

    try {
        const booksResponse = await fetch('/proxy/books');

        if (booksResponse.ok) {
            const booksData = await booksResponse.json();
            const booksCount = Array.isArray(booksData) ? booksData.length : (booksData.content ? booksData.content.length : 0);
            document.getElementById('totalBooksCount').textContent = booksCount;
        } else {
            throw new Error('Ошибка загрузки книг');
        }
    } catch (error) {
        document.getElementById('totalBooksCount').textContent = '—';
    }
}
