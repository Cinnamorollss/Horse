document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simulate user creation
    const user = {
        username: username,
        email: email,
        radiant: 10000,
        fluttergems: 20,
        isNewUser: true  // Add this flag
    };
    
    // Store user data in localStorage
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to homepage
    window.location.href = 'index.html';
});
