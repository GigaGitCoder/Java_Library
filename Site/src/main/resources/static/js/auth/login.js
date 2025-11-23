

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const token = localStorage.getItem('jwt_token');
    if (token) {
        const warningDiv = document.getElementById('warningMessage');
        if (warningDiv) {
            warningDiv.innerHTML = 'ℹ️ Вы уже авторизованы. <a href="/" style="color: #667eea; font-weight: bold;">Перейти на главную</a>';
            warningDiv.style.display = 'block';
        }
    }

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const errorDiv = document.getElementById('errorMessage');
        const successDiv = document.getElementById('successMessage');
        const warningDiv = document.getElementById('warningMessage');
        const submitBtn = document.getElementById('submitBtn');

        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        warningDiv.style.display = 'none';

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Вход... <span class="loading-spinner"></span>';

        try {
            const response = await fetch('/proxy/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('jwt_token', data.token);
                localStorage.setItem('user_nickname', data.nickname || email);
                localStorage.setItem('user_email', data.email || email);
                localStorage.setItem('user_role', data.role || 'USER');

                successDiv.textContent = '✅ Вход выполнен успешно! Перенаправление...';
                successDiv.style.display = 'block';

                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
            else if (response.status === 500 && data.error &&
                     (data.error.includes('duplicate key') ||
                      data.message.includes('duplicate key') ||
                      data.message.includes('already exists'))) {

                const existingToken = localStorage.getItem('jwt_token');

                if (existingToken) {
                    localStorage.setItem('user_nickname', email.split('@')[0]);
                    localStorage.setItem('user_email', email);

                    warningDiv.innerHTML = '⚠️ Вы уже вошли в систему ранее. Используется существующая сессия.<br>Перенаправление...';
                    warningDiv.style.display = 'block';

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    throw new Error('Ошибка токена. Попробуйте выйти и войти заново.');
                }
            }
            else {
                throw new Error(data.message || data.error || 'Неверный email или пароль');
            }
        } catch (error) {
            errorDiv.textContent = error.message || 'Произошла ошибка при входе. Попробуйте еще раз.';
            errorDiv.style.display = 'block';

            submitBtn.disabled = false;
            submitBtn.textContent = 'Войти';
        }
    });
});
