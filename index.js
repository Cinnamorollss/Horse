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
    document.getElementById('radiant-amount').innerText = currency.radiant;
    document.getElementById('fluttergem-amount').innerText = currency.fluttergem;
}

function updateUserInfo() {
    const userInfoElement = document.querySelector('.user-info');
    userInfoElement.innerHTML = `
        <p>Welcome, ${currentUser.username}!</p>
    `;
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');

    function showPage(pageId) {
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
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
