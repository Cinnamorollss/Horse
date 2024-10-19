document.addEventListener('DOMContentLoaded', function() {
    const headerHTML = `
    <header>
        <h1>Fantasy Horse Reality</h1>
        <div class="user-info">
            <p class="username">Player123</p>
            <p class="currency">Premium: 100</p>
            <p class="currency">In-Game: 500</p>
        </div>
    </header>
    `;

    // Check if the header already exists
    if (!document.querySelector('header')) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
});
