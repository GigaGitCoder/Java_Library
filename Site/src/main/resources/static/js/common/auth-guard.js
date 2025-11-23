
(function() {
    'use strict';

    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');

    if (!token || (role !== 'ADMIN' && role !== 'ROLE_ADMIN')) {
        const accessDenied = document.getElementById('accessDenied');
        if (accessDenied) {
            accessDenied.style.display = 'block';
        }

        setTimeout(function() {
            window.location.href = '/';
        }, 3000);

        return;
    }

    const adminContent = document.getElementById('adminContent');
    if (adminContent) {
        adminContent.style.display = 'block';
    }
})();
