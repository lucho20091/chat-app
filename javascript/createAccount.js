export const createAccount = () =>{
    const usernameInput = document.getElementById('userName');
    const createBtn = document.getElementById('create-btn');


    createBtn.addEventListener('click',(event) => {
        event.preventDefault();
        const random = Math.floor(Math.random() * 99999);
        localStorage.setItem('username', usernameInput.value);
        localStorage.setItem('username2', usernameInput.value);
        localStorage.setItem('id', random)
        usernameInput.value = '';
        document.getElementById('module').classList.add('hide');
        document.getElementById('container').classList.remove('hide');
        window.location.reload();
    })
}

export const signIn = () => {    
    document.getElementById('module').classList.add('hide');
    document.getElementById('module-sign-in').classList.remove('hide');
    const signInBtn = document.getElementById('sign-btn');
    const createAccount = document.getElementById('sign-create-btn');
    signInBtn.addEventListener('click', (event) =>{
        event.preventDefault();
        if (!localStorage.getItem('username')){
            localStorage.setItem('username', localStorage.getItem('username2'));
        } else {
            localStorage.setItem('username2', localStorage.getItem('username'))
        }
        document.getElementById('module-sign-in').classList.add('hide');
        document.getElementById('container').classList.remove('hide');
        window.location.reload();
    })
    createAccount.addEventListener('click', (event) =>{
        event.preventDefault();
        if (confirm('Do you want to create a new account?')){
            localStorage.removeItem('username');
            localStorage.removeItem('username2');
            document.getElementById('module-sign-in').classList.add('hide');
            document.getElementById('module').classList.remove('hide');
            window.location.reload();
        }

    });
}

export const logIn = () =>{
    document.getElementById('module').classList.add('hide');
    document.getElementById('module-sign-in').classList.add('hide');
    document.getElementById('container').classList.remove('hide');
    localStorage.setItem('username2', localStorage.getItem('username'))
}

export const signOut = () =>{
    localStorage.removeItem('username')
    window.location.reload();
}