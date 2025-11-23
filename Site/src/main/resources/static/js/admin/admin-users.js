

let currentUsers = [];
const token = localStorage.getItem('jwt_token');

async function loadUsers() {
    try {
        const response = await fetch('/proxy/auth/admin/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка загрузки пользователей');
        }

        const data = await response.json();
        currentUsers = Array.isArray(data) ? data : (data.content || []);
        displayUsers(currentUsers);

        document.getElementById('loadingUsers').style.display = 'none';
        document.getElementById('usersTable').style.display = 'table';
    } catch (error) {
        showNotification('Ошибка загрузки пользователей', 'error');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;">Пользователи не найдены</td></tr>';
        return;
    }

    users.forEach(user => {
        const roleBadge = user.role === 'ADMIN'
            ? '<span class="role-badge role-admin">ADMIN</span>'
            : '<span class="role-badge role-user">USER</span>';

        const createdDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Не указана';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.nickname || 'Не указан'}</td>
            <td>${user.email}</td>
            <td>${roleBadge}</td>
            <td>${createdDate}</td>
            <td class="actions">
                <button class="btn btn-warning" onclick='openEditModal(${JSON.stringify(user).replace(/'/g, "&#39;")})'>Изменить</button>
                <button class="btn btn-danger" onclick="deleteUser(${user.id})">Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function searchUsers() {
    const name = document.getElementById('searchNickname').value;
    const email = document.getElementById('searchEmail').value;
    const role = document.getElementById('searchRole').value;

    let url = '/proxy/auth/admin/users/search?';
    if (name) url += `name=${encodeURIComponent(name)}&`;
    if (email) url += `email=${encodeURIComponent(email)}&`;
    if (role) url += `role=${encodeURIComponent(role)}&`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Ошибка поиска');
        }

        const data = await response.json();
        currentUsers = Array.isArray(data) ? data : (data.content || []);
        displayUsers(currentUsers);
    } catch (error) {
        showNotification('Ошибка поиска пользователей', 'error');
    }
}

function resetSearch() {
    document.getElementById('searchNickname').value = '';
    document.getElementById('searchEmail').value = '';
    document.getElementById('searchRole').value = '';
    loadUsers();
}

function openEditModal(user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('userNickname').value = user.nickname || '';
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPassword').value = '';
    document.getElementById('userModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function openRegisterAdminModal() {
    document.getElementById('adminForm').reset();
    document.getElementById('adminModal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

async function updateUser(e) {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const userData = {
        nickname: document.getElementById('userNickname').value,
        email: document.getElementById('userEmail').value
    };

    const password = document.getElementById('userPassword').value;
    if (password) {
        userData.password = password;
    }

    try {
        const response = await fetch(`/proxy/auth/admin/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            showNotification('Пользователь успешно обновлен', 'success');
            closeModal();
            loadUsers();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка обновления');
        }
    } catch (error) {
        showNotification(error.message || 'Ошибка обновления пользователя', 'error');
    }
}

async function registerAdmin(e) {
    e.preventDefault();

    const adminData = {
        nickname: document.getElementById('adminNickname').value,
        email: document.getElementById('adminEmail').value,
        password: document.getElementById('adminPassword').value
    };

    try {
        const response = await fetch('/proxy/auth/admin/users/registerAsAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(adminData)
        });

        if (response.ok) {
            showNotification('Администратор успешно зарегистрирован', 'success');
            closeAdminModal();
            loadUsers();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка регистрации');
        }
    } catch (error) {
        showNotification(error.message || 'Ошибка регистрации администратора', 'error');
    }
}

async function deleteUser(id) {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) {
        return;
    }

    try {
        const response = await fetch(`/proxy/auth/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            showNotification('Пользователь успешно удален', 'success');
            loadUsers();
        } else {
            throw new Error('Ошибка удаления');
        }
    } catch (error) {
        showNotification('Ошибка удаления пользователя', 'error');
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    const adminContent = document.getElementById('adminContent');
    if (adminContent && adminContent.style.display === 'block') {
        loadUsers();

        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', updateUser);
        }

        const adminForm = document.getElementById('adminForm');
        if (adminForm) {
            adminForm.addEventListener('submit', registerAdmin);
        }

        window.onclick = function(event) {
            const userModal = document.getElementById('userModal');
            const adminModal = document.getElementById('adminModal');

            if (event.target === userModal) {
                closeModal();
            }
            if (event.target === adminModal) {
                closeAdminModal();
            }
        }
    }
});
