let db;
const request = indexedDB.open('MyDatabase', 1);

request.onerror = function(event) {
    console.error('Failed to open database', event);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log('Database opened successfully');
};
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore('people', { keyPath: 'email' });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
};
const transaction = db.transaction(['people'], 'readwrite');
const objectStore = transaction.objectStore('people');
const request = objectStore.add({ name: 'John Doe', email: 'john@example.com' });
const transaction = db.transaction(['people']);
const objectStore = transaction.objectStore('people');
const request = objectStore.get('john@example.com');

request.onsuccess = function(event) {
    console.log('Person:', request.result);
};
const transaction = db.transaction(['people'], 'readwrite');
const objectStore = transaction.objectStore('people');
const request = objectStore.put({ name: 'John Updated', email: 'john@example.com' });
const transaction = db.transaction(['people'], 'readwrite');
const objectStore = transaction.objectStore('people');
const request = objectStore.delete('john@example.com');
const transaction = db.transaction(['people'], 'readonly');
const objectStore = transaction.objectStore('people');
const request = objectStore.openCursor();

request.onsuccess = function(event) {
    const cursor = event.target.result;
    if (cursor) {
        console.log('Person:', cursor.value);
        cursor.continue();
    } else {
        console.log('No more entries');
    }
};
function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("FantasyHorseDB", 1);

        request.onerror = (event) => reject("Error opening database");

        request.onsuccess = (event) => resolve(event.target.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore("ponies", { keyPath: "id", autoIncrement: true });
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("rarity", "rarity", { unique: false });
        };
    });
}
function addPony(db, pony) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["ponies"], "readwrite");
        const objectStore = transaction.objectStore("ponies");
        const request = objectStore.add(pony);

        request.onerror = (event) => reject("Error adding pony");
        request.onsuccess = (event) => resolve(event.target.result);
    });
}
function getAllPonies(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["ponies"], "readonly");
        const objectStore = transaction.objectStore("ponies");
        const request = objectStore.getAll();

        request.onerror = (event) => reject("Error getting ponies");
        request.onsuccess = (event) => resolve(event.target.result);
    });
}
async function resetMarket(db) {
    const rarities = [
        { name: "Common", probability: 0.4, priceMultiplier: 1 },
        { name: "Uncommon", probability: 0.3, priceMultiplier: 2 },
        { name: "Rare", probability: 0.15, priceMultiplier: 4 },
        { name: "Very Rare", probability: 0.1, priceMultiplier: 8 },
        { name: "Extremely Rare", probability: 0.04, priceMultiplier: 16 },
        { name: "God", probability: 0.01, priceMultiplier: 50 }
    ];

    const allPonies = await getAllPonies(db);
    const marketPonies = [];

    for (let i = 0; i < 10; i++) {
        const rarity = weightedRandomChoice(rarities, 'probability');
        const matchingPonies = allPonies.filter(p => p.rarity === rarity.name);
        if (matchingPonies.length > 0) {
            const pony = matchingPonies[Math.floor(Math.random() * matchingPonies.length)];
            const marketPrice = pony.basePrice * rarity.priceMultiplier;
            marketPonies.push({ ...pony, marketPrice });
        }
    }

    return marketPonies;
}

function weightedRandomChoice(items, weightProp) {
    const totalWeight = items.reduce((sum, item) => sum + item[weightProp], 0);
    let random = Math.random() * totalWeight;
    for (const item of items) {
        if (random < item[weightProp]) return item;
        random -= item[weightProp];
    }
    return items[items.length - 1];
}
async function initializeGame() {
    const db = await initDatabase();

    // Add some sample ponies (you would typically do this only once)
    const samplePonies = [
        { name: "Starlight", breed: "Unicorn", rarity: "Rare", imagePath: "images/unicorn.jpg", backstory: "Born from a shooting star...", funFacts: ["Starlight's horn glows...", "She can purify..."], basePrice: 1000 },
        { name: "Zephyr", breed: "Pegasus", rarity: "Uncommon", imagePath: "images/pegasus.jpg", backstory: "Zephyr was hatched from a cloud...", funFacts: ["Zephyr's wings create...", "He can sleep while..."], basePrice: 800 },
        // Add more ponies...
    ];

    for (const pony of samplePonies) {
        await addPony(db, pony);
    }

    // Reset the market
    const marketPonies = await resetMarket(db);
    console.log("Market reset with ponies:", marketPonies);

    // You would typically store marketPonies in your app's state
    // and use it to display the current market offerings
}

// Call this when your app initializes
initializeGame();
