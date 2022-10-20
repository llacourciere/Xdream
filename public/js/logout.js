const { response } = require("express");

async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

console.log('I have loaded');
document.querySelector('#logout').addEventListener('click', logout);