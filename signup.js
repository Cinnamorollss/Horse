document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check if username already exists
        const existingUsers = JSON.parse(localStorage.getItem('existingUsers')) || [];
        if (existingUsers.some(user => user.username === username)) {
            alert('Username already exists. Please choose a different username.');
            return;
        }

        // Create new user
        const newUser = {
            username: username,
            email: email,
            password: password, // In a real app, you should hash this password
            radiant: 10000,
            fluttergems: 20,
            isNewUser: true,
            createdAt: new Date().toISOString()
        };
        
        // Add new user to existing users
        existingUsers.push(newUser);
        localStorage.setItem('existingUsers', JSON.stringify(existingUsers));

        // Set current user (log in)
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        // Redirect to homepage
        window.location.href = 'index.html';
    });
});
