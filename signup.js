// Simulated database of existing users
let existingUsers = JSON.parse(localStorage.getItem('existingUsers')) || [];

const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
const signupForm = document.getElementById('signupForm');

// Debounce function
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

// Check username uniqueness
const checkUsername = debounce(function() {
    const username = usernameInput.value.trim();
    if (username === '') {
        usernameError.textContent = '';
        return;
    }

    if (existingUsers.includes(username)) {
        usernameError.textContent = 'Username already taken. Please choose another.';
        usernameInput.setCustomValidity('Username already taken');
    } else {
        usernameError.textContent = '';
        usernameInput.setCustomValidity('');
    }
}, 500);

usernameInput.addEventListener('input', checkUsername);

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (existingUsers.includes(username)) {
        usernameError.textContent = 'Username already taken. Please choose another.';
        return;
    }
    
    // Simulate user creation
    const user = {
        username: username,
        email: email,
        radiant: 10000,
        fluttergems: 20,
        isNewUser: true
    };
    
    // Add the new username to the existing users list
    existingUsers.push(username);
    localStorage.setItem('existingUsers', JSON.stringify(existingUsers));

    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to homepage
    window.location.href = 'index.html';
});
