const apiBaseUrl = 'mongodb+srv://abdulwalidev:tZ90SJWhOdPx1GqW@cluster0.mwfza.mongodb.net/spamDump?retryWrites=true&w=majority'; // Replace with your actual backend URL

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            try {
                const response = await fetch(`${apiBaseUrl}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, confirmPassword })
                });

                const result = await response.json();
                if (response.ok) {
                    window.location.href = 'login.html';
                } else {
                    alert(result.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${apiBaseUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', result.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert(result.msg);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    if (document.getElementById('welcome-message')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'login.html';
        } else {
            document.getElementById('welcome-message').innerText = 'Welcome to your dashboard!';
        }
    }
});
