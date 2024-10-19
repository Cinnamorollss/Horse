// Simulated player's horse collection
let playerHorses = [
    { id: 1, name: "Shadowfax", level: 1 },
    { id: 2, name: "Bucephalus", level: 3 },
    { id: 3, name: "Pegasus", level: 2 }
];

const horseList = document.getElementById('horse-list');
const trainBtn = document.getElementById('train-btn');
const trainModal = document.getElementById('train-modal');
const trainHorseList = document.getElementById('train-horse-list');
const closeModalBtn = document.getElementById('close-modal');

let cooldownTimer;
let cooldownTime = 60; // 60 seconds cooldown

// Display horses in the stable
function displayHorses() {
    horseList.innerHTML = '';
    playerHorses.forEach(horse => {
        const horseElement = document.createElement('div');
        horseElement.textContent = `${horse.name} (Level ${horse.level})`;
        horseList.appendChild(horseElement);
    });
}

// Display horses in the training modal
function displayTrainHorses() {
    trainHorseList.innerHTML = '';
    playerHorses.forEach(horse => {
        const horseElement = document.createElement('div');
        horseElement.textContent = `${horse.name} (Level ${horse.level})`;
        horseElement.addEventListener('click', () => trainHorse(horse));
        trainHorseList.appendChild(horseElement);
    });
}

// Train a selected horse
function trainHorse(horse) {
    const levelIncrease = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
    horse.level += levelIncrease;
    alert(`${horse.name} has been trained! Level increased by ${levelIncrease}.`);
    displayHorses();
    displayTrainHorses();
    trainModal.style.display = 'none';
    startCooldown();
}

// Start cooldown timer
function startCooldown() {
    trainBtn.disabled = true;
    cooldownTimer = setInterval(updateCooldown, 1000);
    updateCooldown();
}

// Update cooldown timer
function updateCooldown() {
    if (cooldownTime <= 0) {
        clearInterval(cooldownTimer);
        trainBtn.disabled = false;
        trainBtn.textContent = "Train Horses";
        cooldownTime = 60;
    } else {
        trainBtn.textContent = `Train Horses (${cooldownTime}s)`;
        cooldownTime--;
    }
}

// Event listeners
trainBtn.addEventListener('click', () => {
    if (!trainBtn.disabled) {
        trainModal.style.display = 'block';
        displayTrainHorses();
    }
});

closeModalBtn.addEventListener('click', () => {
    trainModal.style.display = 'none';
});

// Initial display of horses
displayHorses();
