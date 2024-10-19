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
            image: "images/pegasus.jpg",
            backstory: "Zephyr was hatched from a cloud during a thunderstorm, giving him the ability to control winds.",
            funFacts: [
                "Zephyr's wings create miniature rainbows when he flies",
                "He can sleep while flying, riding air currents",
                "Zephyr enjoys racing against eagles for fun"
            ],
            price: 1200
        },
        // Add more horses as needed
    ];

    // Populate market grid
    horses.forEach(horse => {
        const horseCard = document.createElement('div');
        horseCard.className = 'horse-card';
        horseCard.innerHTML = `
            <img src="${horse.image}" alt="${horse.name}">
            <p>${horse.name} (${horse.breed})</p>
        `;
        horseCard.addEventListener('click', () => showHorseDetails(horse));
        marketGrid.appendChild(horseCard);
    });

    // Show horse details in modal
    function showHorseDetails(horse) {
        modalHorseName.textContent = `${horse.name} (${horse.breed})`;
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
