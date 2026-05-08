'use strict';

const login = document.getElementById("login");
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');

localStorage.setItem('email', 'fullname@gmail.com');
localStorage.setItem('password', 'hunter2');

function checkInfo(){
    if(emailInput.value === localStorage.getItem('email') && pwInput.value === localStorage.getItem('password')){
        window.location.href = "home.html";
    } else {
        alert("Incorrect username or password");
    }
}

login.addEventListener("submit", (event) => {
    event.preventDefault(); // For Fakebook I just disguised a div as the submit button, but I found this since then
    // This prevents the browser's default form submission behavior
    checkInfo();
});