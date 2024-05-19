//import
import { createAccount, signIn, logIn, signOut } from './javascript/createAccount.js';

// DOM Elements We Need
const form = document.getElementById('form');
const bnt = document.getElementById('bnt');
const textinput = document.getElementById('text-input');
const bodyText = document.getElementById('body-text');
const signOutBtn = document.getElementById('sign-out-btn');
const usernameTop = document.getElementById('username-top');
// Set up Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://chat-app-e5e82-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const chatAppInDB = ref(database, "messages")

// login and signin logic
if (localStorage.getItem('username')){
    logIn()
} else if(!localStorage.getItem('username') && localStorage.getItem('username2')){
    signIn()
} else {
    createAccount()
}
signOutBtn.addEventListener('click',() => {
    signOut()
})

usernameTop.textContent = localStorage.getItem('username')

btn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(textinput.value);
    const myObj = {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('username'),
        text: textinput.value,
        
    }
    push(chatAppInDB, myObj)
    textinput.value = ""
}
)

function scrollToBottom() {
    bodyText.scrollTop = bodyText.scrollHeight;
}
onValue(chatAppInDB, function(snapshot){
    if (snapshot.exists()){
        let html = ''
        let userId = localStorage.getItem("id")
        let itemsArray = Object.entries(snapshot.val())
        for (let item of itemsArray){
            console.log(item[1])
            let reverseClass = (item[1].id == userId) ? 'reverse' : ''
            html += ` 
            <div class="message-structure ${reverseClass}">
                <img src="assets/profile-default.png" alt="">
                <div class="column">
                    <p class="name">${item[1].name}</p>
                    <p class="message">${item[1].text}</p>
                </div>
            </div>`
        }
        bodyText.innerHTML = html
        scrollToBottom()
    }
})

