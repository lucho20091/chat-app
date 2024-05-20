// Import
import { createAccount, signIn, logIn, signOut } from './javascript/createAccount.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

// DOM Elements We Need
const form = document.getElementById('form');
const btn = document.getElementById('btn');
const textinput = document.getElementById('text-input');
const fileInput = document.getElementById('file-input');
const bodyText = document.getElementById('body-text');
const signOutBtn = document.getElementById('sign-out-btn');
const usernameTop = document.getElementById('username-top');

// Set up Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBKe0bu_r4f4uh101ZUPytZmv9j88UWYZA",
    authDomain: "chat-app-v2-1d04b.firebaseapp.com",
    databaseURL: "https://chat-app-v2-1d04b-default-rtdb.firebaseio.com/",
    projectId: "chat-app-v2-1d04b",
    storageBucket: "chat-app-v2-1d04b.appspot.com",
    messagingSenderId: "1055166223911",
    appId: "1:1055166223911:web:279426271b75a30fab6002"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const chatAppInDB = ref(database, "messages");

// Login and Signin Logic
if (localStorage.getItem('username')) {
    logIn();
} else if (!localStorage.getItem('username') && localStorage.getItem('username2')) {
    signIn();
} else {
    createAccount();
}

signOutBtn.addEventListener('click', () => {
    signOut();
});

usernameTop.textContent = localStorage.getItem('username');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    
    const text = textinput.value;
    const file = fileInput.files[0];
    const userId = localStorage.getItem('id');
    const username = localStorage.getItem('username');
    
    const messageObj = {
        id: userId,
        name: username,
        text: text,
        imageUrl: null,
    };
    
    if (file) {
        const storageReference = storageRef(storage, `images/${file.name}`);
        uploadBytes(storageReference, file).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        }).then((url) => {
            messageObj.imageUrl = url;
            push(chatAppInDB, messageObj);
            textinput.value = "";
            fileInput.value = "";
        }).catch((error) => {
            console.error('Error uploading file:', error);
        });
    } else {
        push(chatAppInDB, messageObj);
        textinput.value = "";
    }
});

function scrollToBottom() {
    bodyText.scrollTop = bodyText.scrollHeight;
}

onValue(chatAppInDB, (snapshot) => {
    if (snapshot.exists()) {
        let html = '';
        const userId = localStorage.getItem("id");
        const itemsArray = Object.entries(snapshot.val());
        for (const [key, value] of itemsArray) {
            if (!value.text == '' || !value.imageUrl == '') {                
                const reverseClass = (value.id === userId) ? 'reverse' : '';
                html += `
                    <div class="message-structure ${reverseClass}">
                        <img src="assets/profile-default.png" alt="">
                        <div class="column">
                            <p class="name">${value.name}</p>
                            <div class="message">            
                            <p>${value.text}</p>
                            ${value.imageUrl ? `<img src="${value.imageUrl}" alt="Image" class="uploaded-image">` : ''}
                            </div>
                        </div>
                    </div>`;
            }
        }
        bodyText.innerHTML = html;
        scrollToBottom();
    }
});
