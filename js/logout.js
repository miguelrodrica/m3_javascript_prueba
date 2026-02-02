const logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = '../html/login.html';
});