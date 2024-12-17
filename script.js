document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');
    const loginSection = document.getElementById('login');
    const userInfo = document.getElementById('user-info');
    const logoutButton = document.getElementById('logout');
    const accessLogTable = document.getElementById('accessLog').getElementsByTagName('tbody')[0];
    const currentOccupancy = document.getElementById('currentOccupancy');

    const users = {
        admin: { password: 'admin123', role: 'admin' },
        user: { password: 'user123', role: 'user' }
    };

    let occupancy = 0;

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;

        if (users[username] && users[username].password === password) {
            loginSection.classList.add('hidden');
            dashboard.classList.remove('hidden');
            userInfo.textContent = `Bienvenido, ${username} (${users[username].role})`;
            logAccess(username, 'Entrada');
            updateOccupancy(1);
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });

    logoutButton.addEventListener('click', () => {
        const username = userInfo.textContent.split(',')[0].split(' ')[1];
        logAccess(username, 'Salida');
        updateOccupancy(-1);
        loginSection.classList.remove('hidden');
        dashboard.classList.add('hidden');
    });

    function logAccess(username, action) {
        const row = accessLogTable.insertRow();
        row.insertCell(0).textContent = username;
        row.insertCell(1).textContent = new Date().toLocaleString();
        row.insertCell(2).textContent = action;
    }

    function updateOccupancy(change) {
        occupancy += change;
        currentOccupancy.textContent = occupancy;
    }
});