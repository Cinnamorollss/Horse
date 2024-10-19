document.addEventListener('DOMContentLoaded', () => {
    const loreContainer = document.getElementById('lore-container');

    const breedLore = [
        {
            name: "Unicorn",
            image: "images/unicorn.jpg",
            backstory: "Unicorns are majestic creatures born from the purest starlight. They roam the enchanted forests, bringing hope and healing wherever they go.",
            abilities: [
                "Healing touch",
                "Purification of water",
                "Telepathic communication"
            ],
            funFacts: [
                "A unicorn's horn is said to be made of solidified moonbeams",
                "They can only be approached by those with pure hearts",
                "Unicorn hair is a powerful ingredient in many magical potions"
            ]
        },
        {
            name: "Pegasus",
            image: "images/pegasus.jpg",
            backstory: "Pegasi are celestial horses, born from the union of wind and clouds. They soar through the skies, bridging the gap between earth and heaven.",
            abilities: [
                "Flight",
                "Weather manipulation",
                "Cloud walking"
            ],
            funFacts: [
                "Pegasi feathers are highly prized for their magical properties",
                "They can travel at speeds rivaling the fastest winds",
                "Young pegasi learn to fly before they can walk"
            ]
        },
        {
            name: "Kelpie",
            image: "images/kelpie.jpg",
            backstory: "Kelpies are shape-shifting water spirits that usually appear in the form of horses. They inhabit the lochs and rivers of the misty highlands.",
            abilities: [
                "Shape-shifting",
                "Water breathing",
                "Control over water currents"
            ],
            funFacts: [
                "Kelpies can appear as beautiful horses or handsome humans to lure the unwary",
                "Their manes are said to always be dripping with water",
                "In some legends, capturing a kelpie's bridle gives you power over it"
            ]
        },
        // Add more breeds as needed
    ];

    breedLore.forEach(breed => {
        const loreCard = document.createElement('div');
        loreCard.className = 'lore-card';
        loreCard.innerHTML = `
            <div class="lore-card-header">
                <h3>${breed.name}</h3>
                <span class="toggle-icon">+</span>
            </div>
            <div class="lore-card-content">
                <img src="${breed.image}" alt="${breed.name}">
                <h4>Backstory</h4>
                <p>${breed.backstory}</p>
                <h4>Abilities</h4>
                <ul>
                    ${breed.abilities.map(ability => `<li>${ability}</li>`).join('')}
                </ul>
                <h4>Fun Facts</h4>
                <ul>
                    ${breed.funFacts.map(fact => `<li>${fact}</li>`).join('')}
                </ul>
            </div>
        `;
        loreContainer.appendChild(loreCard);

        const header = loreCard.querySelector('.lore-card-header');
        const content = loreCard.querySelector('.lore-card-content');
        const toggleIcon = loreCard.querySelector('.toggle-icon');

        header.addEventListener('click', () => {
            content.classList.toggle('active');
            toggleIcon.textContent = content.classList.contains('active') ? '-' : '+';
        });
    });
});
