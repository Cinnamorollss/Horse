document.addEventListener('DOMContentLoaded', () => {
    // Populate user info
    const userInfo = document.querySelector('.user-info');
    // This should be replaced with actual user data from your authentication system
    const user = {
        username: 'Player123',
        premiumCurrency: 100,
        inGameCurrency: 500
    };
    userInfo.innerHTML = `
        <p class="username">${user.username}</p>
        <p class="currency">Premium: ${user.premiumCurrency}</p>
        <p class="currency">In-Game: ${user.inGameCurrency}</p>
    `;

    // Handle subscription button
    const subscribeButton = document.getElementById('subscribe-button');
    subscribeButton.addEventListener('click', (e) => {
        e.preventDefault();
        // This should be replaced with your actual subscription logic
        alert('Thank you for your interest in subscribing! This feature is coming soon.');
    });
});
