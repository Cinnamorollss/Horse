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

document.addEventListener('DOMContentLoaded', () => {
    const marketGrid = document.getElementById('market-grid');
    const modal = document.getElementById('horse-details-modal');
    const modalClose = document.getElementsByClassName('close')[0];
    const modalHorseName = document.getElementById('modal-horse-name');
    const modalHorseImage = document.getElementById('modal-horse-image');
    const modalHorseBackstory = document.getElementById('modal-horse-backstory');
    const modalHorseFacts = document.getElementById('modal-horse-facts');
    const purchaseButton = document.getElementById('purchase-button');

    // Sample horse data (replace with actual data from your game logic/database)
    const horses = [
        {
            id: 1,
            name: "Starlight",
            breed: "Unicorn",
            rarity: "Rare",
            image: "images/unicorn.jpg",
            backstory: "Born from a shooting star, Starlight possesses the power to grant wishes to those pure of heart.",
            funFacts: [
                "Starlight's horn glows in the presence of true love",
                "She can purify any water source with a touch of her horn",
                "Starlight's favorite food is rainbow-colored apples"
            ],
            price: 1000
        },
        {
            id: 2,
            name: "Zephyr",
            breed: "Pegasus",
            rarity: "Uncommon",
            image: "images/pegasus.jpg",
            backstory: "Zephyr was hatched from a cloud during a thunderstorm, giving him the ability to control winds.",
            funFacts: [
                "Zephyr's wings create miniature rainbows when he flies",
                "He can sleep while flying, riding air currents",
                "Zephyr enjoys racing against eagles for fun"
            ],
            price: 1200
        },
        {
            id: 3,
            name: "Shadowmist",
            breed: "Nightmare",
            rarity: "Very Rare",
            image: "images/nightmare.jpg",
            backstory: "Shadowmist emerged from the depths of a forgotten cave, bringing with her the power to traverse the realm of dreams.",
            funFacts: [
                "Shadowmist's mane is made of living shadows",
                "She can turn invisible under the light of a full moon",
                "Shadowmist feeds on the fears of her riders, turning them into courage"
            ],
            price: 2000
        },
        // Add more horses as needed
    ];

    // Populate market grid
    horses.forEach(horse => {
        const horseCard = document.createElement('div');
        horseCard.className = 'horse-card';
        horseCard.innerHTML = `
            <img src="${horse.image}" alt="${horse.name}">
            <p>${horse.name} (${horse.rarity})</p>
        `;
        horseCard.addEventListener('click', () => showHorseDetails(horse));
        marketGrid.appendChild(horseCard);
    });

    // Show horse details in modal
    function showHorseDetails(horse) {
        modalHorseName.textContent = `${horse.name} (${horse.rarity})`;
        modalHorseImage.src = horse.image;
        modalHorseImage.alt = horse.name;
        modalHorseBackstory.textContent = horse.backstory;
        modalHorseFacts.innerHTML = horse.funFacts.map(fact => `<li>${fact}</li>`).join('');
        purchaseButton.textContent = `Purchase for ${horse.price} coins`;
        modal.style.display = "block";
    }

    // Close modal when clicking on <span> (x)
    modalClose.onclick = () => {
        modal.style.display = "none";
    }

    // Close modal when clicking outside of it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle purchase button click
    purchaseButton.addEventListener('click', () => {
        // Implement purchase logic here
        alert('Purchase functionality coming soon!');
    });

    // Populate user info (replace with actual user data)
    const userInfo = document.querySelector('.user-info');
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
});
