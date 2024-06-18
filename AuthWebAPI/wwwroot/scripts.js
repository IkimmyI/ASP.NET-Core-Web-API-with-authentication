document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login, store token in localStorage
            localStorage.setItem('token', data.token);
            window.location.href = '/swagger/index.html'; // Redirect to dashboard or another page
        })
        .catch(error => {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').innerText = 'Invalid email or password. Please try again.';
            console.error('Error:', error);
        });
});
