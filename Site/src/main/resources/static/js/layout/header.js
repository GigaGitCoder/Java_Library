

const AuthUtils = {
    getToken() {
        return localStorage.getItem('jwt_token');
    },

    setToken(token) {
        localStorage.setItem('jwt_token', token);
    },

    removeToken() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_nickname');
        localStorage.removeItem('user_email');
        localStorage.removeItem('user_role');
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    getUserInfo() {
        const token = this.getToken();
        if (!token) return null;

        return {
            nickname: localStorage.getItem('user_nickname') || 'Пользователь',
            email: localStorage.getItem('user_email') || '',
            role: localStorage.getItem('user_role') || 'USER'
        };
    },

    isAdmin() {
        const userInfo = this.getUserInfo();
        if (!userInfo) return false;

        const role = userInfo.role;
        return role === 'ADMIN' || role === 'ROLE_ADMIN';
    }
};

function renderHeader() {
    const headerNav = document.getElementById('headerNav');
    if (!headerNav) return;

    if (AuthUtils.isAuthenticated()) {
        const userInfo = AuthUtils.getUserInfo();

        if (!userInfo) {
            headerNav.innerHTML = `
                <a href="/login" class="header-btn header-btn-login">Вход</a>
                <a href="/register" class="header-btn header-btn-register">Регистрация</a>
            `;
            return;
        }

        const isAdmin = AuthUtils.isAdmin();

        let adminBadge = isAdmin ? '<span class="admin-badge">ADMIN</span>' : '';
        let adminButton = isAdmin ? '<a href="/admin" class="header-btn header-btn-admin">⚙️ Админ-панель</a>' : '';

        const displayName = userInfo.nickname || userInfo.email || 'Пользователь';

        headerNav.innerHTML = `
            <div class="header-user-info">
                <span>👤 ${displayName}${adminBadge}</span>
            </div>
            ${adminButton}
            <button class="header-btn header-btn-logout" onclick="logout()">Выйти</button>
        `;
    } else {
        headerNav.innerHTML = `
            <a href="/login" class="header-btn header-btn-login">Вход</a>
            <a href="/register" class="header-btn header-btn-register">Регистрация</a>
        `;
    }
}

async function logout() {
    const token = AuthUtils.getToken();

    try {
        await fetch('/proxy/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (e) {
        // Игнорируем ошибки
    } finally {
        AuthUtils.removeToken();
        window.location.href = '/';
    }
}

document.addEventListener('DOMContentLoaded', renderHeader);
