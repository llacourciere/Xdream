const modal = document.querySelector('#signUpModal');

//creates a user by grabbing data from the user sign up modal
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-type': 'application/json' }
        });
//if the information is valid signs the user in and takes them to the dashboard
        if(response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
            $('#myModal').modal('hide')
        } else {
            alert(response.statusText);
        }
    }
}

//logs in a user if they exist in the db
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-type': 'application/json' }
        })
// changes the user to their dashboard once logged in
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);