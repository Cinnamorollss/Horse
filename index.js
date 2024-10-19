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
// index.js

import * as CurrencyDB from './currencyDB.js';

let currentUser = {
    id: "user123", // This should be dynamically set when a user logs in
    username: "Player123"
};

async function initializeApp() {
    try {
        await CurrencyDB.initDB();
        console.log("Database initialized successfully");

        // Set initial currency (if not already set)
        await CurrencyDB.updateCurrency(currentUser.id, 1000, 10);

        // Get current currency
        let currency = await CurrencyDB.getCurrency(currentUser.id);
        updateCurrencyDisplay(currency);

        // Set up user info
        updateUserInfo();

        // Set up navigation
        setupNavigation();

    } catch (error) {
        console.error("Error:", error);
    }
}

function updateCurrencyDisplay(currency) {
    const displayElement = document.getElementById('currency-display');
    displayElement.innerHTML = `
        <p>Radiant: ${currency.radiant}</p>
        <p>Fluttergem: ${currency.fluttergem}</p>
    `;
}

function updateUserInfo() {
    const userInfoElement = document.querySelector('.user-info');
    userInfoElement.innerHTML = `
        <p>Welcome, ${currentUser.username}!</p>
    `;
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            loadPage(page);
        });
    });
}

function loadPage(page) {
    const mainContent = document.getElementById('main-content');
    // Here you would typically load content based on the page
    // For now, we'll just update with a placeholder
    mainContent.innerHTML = `<h2>${page.charAt(0).toUpperCase() + page.slice(1)}</h2>
                             <p>This is the ${page} page of Celestial Herds.</p>`;
}

// Example functions for adding and removing currency
async function addRadiant(amount) {
    await CurrencyDB.addCurrency(currentUser.id, amount, 0);
    let currency = await CurrencyDB.getCurrency(currentUser.id);
    updateCurrencyDisplay(currency);
}

async function removeRadiant(amount) {
    await CurrencyDB.subtractCurrency(currentUser.id, amount, 0);
    let currency = await CurrencyDB.getCurrency(currentUser.id);
    updateCurrencyDisplay(currency);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Expose functions to global scope for testing in console
window.addRadiant = addRadiant;
window.removeRadiant = removeRadiant;

addRadiant(100);  // Adds 100 Radiant
removeRadiant(50);  // Removes 50 Radiant
