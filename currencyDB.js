// currencyDB.js

const DB_NAME = 'FantasyHorseGame';
const DB_VERSION = 1;
const CURRENCY_STORE_NAME = 'currency';

let db;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => reject("Error opening database");

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(CURRENCY_STORE_NAME, { keyPath: "userId" });
            objectStore.createIndex("radiant", "radiant", { unique: false });
            objectStore.createIndex("fluttergem", "fluttergem", { unique: false });
        };
    });
}

function getCurrency(userId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([CURRENCY_STORE_NAME], "readonly");
        const objectStore = transaction.objectStore(CURRENCY_STORE_NAME);
        const request = objectStore.get(userId);

        request.onerror = (event) => reject("Error getting currency");
        request.onsuccess = (event) => {
            const result = event.target.result;
            resolve(result ? result : { userId, radiant: 0, fluttergem: 0 });
        };
    });
}

function updateCurrency(userId, radiant, fluttergem) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([CURRENCY_STORE_NAME], "readwrite");
        const objectStore = transaction.objectStore(CURRENCY_STORE_NAME);
        const request = objectStore.put({ userId, radiant, fluttergem });

        request.onerror = (event) => reject("Error updating currency");
        request.onsuccess = (event) => resolve(event.target.result);
    });
}

function addCurrency(userId, radiantAmount, fluttergemAmount) {
    return getCurrency(userId).then(currentCurrency => {
        const newRadiant = currentCurrency.radiant + radiantAmount;
        const newFluttergem = currentCurrency.fluttergem + fluttergemAmount;
        return updateCurrency(userId, newRadiant, newFluttergem);
    });
}

function subtractCurrency(userId, radiantAmount, fluttergemAmount) {
    return getCurrency(userId).then(currentCurrency => {
        const newRadiant = Math.max(0, currentCurrency.radiant - radiantAmount);
        const newFluttergem = Math.max(0, currentCurrency.fluttergem - fluttergemAmount);
        return updateCurrency(userId, newRadiant, newFluttergem);
    });
}

export { initDB, getCurrency, updateCurrency, addCurrency, subtractCurrency };
