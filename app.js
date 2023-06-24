document.addEventListener('DOMContentLoaded', function () {
    const signupPage = document.getElementById('signup-page');
    const profilePage = document.getElementById('profile-page');
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signupError = document.getElementById('signup-error');
    const signupSuccess = document.getElementById('signup-success');
    const nameDisplay = document.getElementById('name-display');
    const emailDisplay = document.getElementById('email-display');
    const passwordDisplay = document.getElementById('password-display');
    const logoutButton = document.getElementById('logout-button');

    // Check if access token exists in local storage
    const accessToken = localStorage.getItem('accessToken');
    const hasAccessToken = accessToken !== null;

    // Redirect based on access token
    if (hasAccessToken) {
        signupPage.style.display = 'none';
        profilePage.style.display = 'block';
        displayUserProfile();
    } else {
        signupPage.style.display = 'block';
        profilePage.style.display = 'none';
    }

    // Signup form submission
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (name === '' || email === '' || password === '') {
            signupError.textContent = 'Please fill in all fields.';
            signupSuccess.textContent = '';
        } else {
            // Generate random access token
            const accessToken = generateAccessToken();

            // Save user state in local storage
            const userState = {
                name: name,
                email: email,
                password: password,
                accessToken: accessToken
            };
            localStorage.setItem('userState', JSON.stringify(userState));

            // Display success message and redirect to profile page
            signupError.textContent = '';
            signupSuccess.textContent = 'Sign up successful! Redirecting...';
            setTimeout(function () {
                signupPage.style.display = 'none';
                profilePage.style.display = 'block';
                displayUserProfile();
            }, 1500);
        }
    });

    // Logout button click event
    logoutButton.addEventListener('click', function () {
        // Clear user state and access token from local storage
        localStorage.removeItem('userState');
        localStorage.removeItem('accessToken');

        // Redirect to signup page
        signupPage.style.display = 'block';
        profilePage.style.display = 'none';
    });

    // Display user profile
    function displayUserProfile() {
        const userState = JSON.parse(localStorage.getItem('userState'));
        if (userState) {
            nameDisplay.textContent = 'Full Name: ' + userState.name;
            emailDisplay.textContent = 'Email: ' + userState.email;
            passwordDisplay.textContent = 'Password:' + userState.password;
        }
    }

    // Generate a random access token
    function generateAccessToken() {
        const tokenLength = 16;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';

        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }

        // Save access token in local storage
        localStorage.setItem('accessToken', token);

        return token;
    }
});
