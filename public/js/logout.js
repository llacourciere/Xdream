// get the users and replaces the user dashboard with the log in screen once logged out
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
};

document.querySelector('#logout').addEventListener('click', logout);