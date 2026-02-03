const form = document.querySelector('#signupForm');
const nameUser = document.querySelector('#nameInputSignup');
const emailUser = document.querySelector('#emailInputSignup');
const passwordUser = document.querySelector('#passwordInputSignup');
const confirmPasswordUser = document.querySelector('#confirmPasswordInputSignup');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    let emailExists = false;

    for (let user of users) {
        if (user.email === emailUser.value) {
            emailExists = true;
            break;
        }
    };

    if (emailExists) {
        alert('Este email ya está registrado');
        return;
    };

    if (passwordUser.value !== confirmPasswordUser.value) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    const newUser = {
        name: nameUser.value,
        email: emailUser.value,
        password: passwordUser.value,
        role: "user",
        userInfo: []
    };

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    });

    alert('Usuario registrado correctamente');
    form.reset();
});