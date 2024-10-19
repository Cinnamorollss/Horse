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

import * as CurrencyDB from './currencyDB.js';

async function initializeApp() {
    try {
        await CurrencyDB.initDB();
        console.log("Database initialized successfully");

        // Example usage:
        const userId = "user123"; // This should be the logged-in user's ID

        // Set initial currency (if not already set)
        await CurrencyDB.updateCurrency(userId, 1000, 10);

        // Get current currency
        let currency = await CurrencyDB.getCurrency(userId);
        console.log("Current currency:", currency);

        // Add some Radiant
        await CurrencyDB.addCurrency(userId, 500, 0);
        currency = await CurrencyDB.getCurrency(userId);
        console.log("After adding 500 Radiant:", currency);

        // Subtract some Fluttergem
        await CurrencyDB.subtractCurrency(userId, 0, 5);
        currency = await CurrencyDB.getCurrency(userId);
        console.log("After subtracting 5 Fluttergem:", currency);

    } catch (error) {
        console.error("Error:", error);
    }
}

initializeApp();
