document.addEventListener('DOMContentLoaded', () => {
    const loreContainer = document.getElementById('lore-container');

    const breedLore = [
        {
            name: "Pegasus",
            backstory: "Pegasus are said to be born from the tears of angels, their wings crafted from clouds, and their beautiful manes woven from the sun's light rays.",
            abilities: [
                "Celestial Flight",
                "Stormcaller",
                "Temporal Glimpse"
            ],
            funFacts: [
                "Pegasus are known to collect feathers from other birds and use them as fashion accessories",
                "The connection between Pegasus and angels is so profound that when they bond with an angel, it lasts a lifetime.",
                "Their favourite fruit is the Watermelon."
            ]
        },
        {
            name: "Floralquin",
            backstory: "Floralquin are ancient horses that protect the forests they roam. Their manes and tails are said to be made from ancient tree bark, their eyes are made from acorns and their coats are composed of flower petals.",
            abilities: [
                "Nature's Guardian",
                "Whispering Winds",
                "Seed Sower"
            ],
            funFacts: [
                "Floralquin were thought to be mere myths for centuries. However, when the explorer Sir Bert discovered their homeland, the Aetherwood Archipelago, and named it after these beautiful steeds, the world finally recognized their existence.",
                "While Floralquin have a deep love for all animals, they hold a particular disdain for beavers. This animosity stems from the fact that beavers construct dams from the ancient trees the Floralquin revere and protect.",
                "In celebration of a new foal's birth, Floralquin partake in a peculiar ritual—eating chilies. They believe that enduring the heat will imbue the foal with strength and resilience."
            ]
        },
        {
            name: "Wraithsteeds",
            backstory: "Wraithsteeds are the remnants of noble steeds who once roamed the earth, serving great heroes and guiding lost souls. Often adorned with remnants of their former lives, such as tattered saddles or bridle pieces, they embody a haunting beauty.",
            abilities: [
                "Soulbound Empathy",
                "Veil of Shadows",
                "Ethereal Passage"
            ],
            funFacts: [
                "Wraithsteeds can change the color of their glowing eyes depending on their mood.",
                "Some believe that if a Wraithsteed nuzzles you, it brings good luck.",
                "They often have midnight gallops, leaving trails of shimmering light in their wake that look like falling stars."
            ]
        },
         {
            name: "Nebulamane",
            backstory: "ebulamane are not ordinary horses; they are born from the final breaths of dying stars, each embodying the essence of the universe's most luminous wonders. From this cosmic dust, Nebulamane are formed, infused with the remnants of starlight and energy, each horse uniquely reflecting the characteristics of the star from which it originated.",
            abilities: [
                "Starwhisper Communication",
                "Cosmic Resilience",
                "Stellar Illumination"
            ],
            funFacts: [
                "Nebulamane participate in a ritual known as the Star Song, where they gather together to sing their cosmic melodies.",
                "Nebulamane are known to weave dreams for mortals.",
                "When a shooting star is seen in the sky, it’s actually a Nebulamane galloping across the cosmos, bringing wishes from the stars."
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
