

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nickname = document.getElementById('nickname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const errorDiv = document.getElementById('errorMessage');
        const successDiv = document.getElementById('successMessage');
        const submitBtn = document.getElementById('submitBtn');

        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Регистрация... <span class="loading-spinner"></span>';

        try {
            const response = await fetch('/proxy/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                successDiv.textContent = '✅ Регистрация успешна! Перенаправление на страницу входа...';
                successDiv.style.display = 'block';

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                throw new Error(data.message || data.error || 'Ошибка регистрации');
            }
        } catch (error) {
            errorDiv.textContent = error.message || 'Произошла ошибка при регистрации.';
            errorDiv.style.display = 'block';

            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться';
        }
    });
});
