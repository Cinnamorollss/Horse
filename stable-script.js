document.addEventListener('DOMContentLoaded', function() {
    const ponyGrid = document.getElementById('pony-grid');
    const modal = document.getElementById('pony-detail-modal');
    const closeBtn = document.getElementById('close-modal');
    const ponyName = document.getElementById('pony-name');
    const ponyImage = document.getElementById('pony-image');
    const ponyStats = document.getElementById('pony-stats');
    const editBtn = document.getElementById('edit-pony');
    const trainBtn = document.getElementById('train-pony');
    const feedBtn = document.getElementById('feed-pony');
    const playBtn = document.getElementById('play-pony');

    // Sample pony data (replace with actual data from your backend)
    const ponies = [
        { id: 1, name: 'Starlight', image: 'https://i.imgur.com/AoPkfCr.png', stats: { level: 5, health: 100, happiness: 80 } },
        { id: 2, name: 'Moonbeam', image: 'https://i.imgur.com/AoPkfCr.png', stats: { level: 3, health: 90, happiness: 75 } },
        { id: 3, name: 'Sunburst', image: 'https://i.imgur.com/AoPkfCr.png', stats: { level: 7, health: 95, happiness: 85 } },
        // Add more ponies as needed
    ];

    // Populate pony grid
    function populatePonyGrid() {
        ponyGrid.innerHTML = '';
        ponies.forEach(pony => {
            const ponyCard = document.createElement('div');
            ponyCard.className = 'pony-card';
            ponyCard.innerHTML = `
                <img src="${pony.image}" alt="${pony.name}">
                <h4>${pony.name}</h4>
            `;
            ponyCard.addEventListener('click', () => showPonyDetails(pony));
            ponyGrid.appendChild(ponyCard);
        });
    }

    function showPonyDetails(pony) {
        ponyName.textContent = pony.name;
        ponyImage.src = pony.image;
        ponyImage.alt = pony.name;
        ponyStats.innerHTML = `
            <p>Level: ${pony.stats.level}</p>
            <p>Health: ${pony.stats.health}</p>
            <p>Happiness: ${pony.stats.happiness}</p>
        `;
        modal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    editBtn.onclick = function() {
        alert('Edit pony functionality to be implemented');
        // Implement edit functionality here
    }

    trainBtn.onclick = function() {
        alert('Train pony functionality to be implemented');
        // Implement training functionality here
    }

    feedBtn.onclick = function() {
        alert('Feed pony functionality to be implemented');
        // Implement feeding functionality here
    }

    playBtn.onclick = function() {
        alert('Play with pony functionality to be implemented');
        // Implement play functionality here
    }

    // Initial population of the pony grid
    populatePonyGrid();
});
