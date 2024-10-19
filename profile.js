document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-profile-btn');
    const editForm = document.getElementById('edit-form');
    const profileForm = document.getElementById('profile-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    // Sample user data (replace with actual data fetching logic)
    let userData = {
        username: 'Player123',
        accountCreated: '2024-01-01',
        favHorseBreed: 'Pegasus',
        pronouns: 'They/Them',
        country: 'Equestria',
        description: 'Horse enthusiast and magical creature tamer.'
    };

    function updateProfileDisplay() {
        document.getElementById('username').textContent = userData.username;
        document.getElementById('account-created').textContent = userData.accountCreated;
        document.getElementById('fav-horse-breed').textContent = userData.favHorseBreed;
        document.getElementById('pronouns').textContent = userData.pronouns;
        document.getElementById('country').textContent = userData.country;
        document.getElementById('description').textContent = userData.description;
    }

    function populateEditForm() {
        document.getElementById('edit-account-created').value = userData.accountCreated;
        document.getElementById('edit-fav-horse-breed').value = userData.favHorseBreed;
        document.getElementById('edit-pronouns').value = userData.pronouns;
        document.getElementById('edit-country').value = userData.country;
        document.getElementById('edit-description').value = userData.description;
    }

    editBtn.addEventListener('click', function() {
        editForm.style.display = 'block';
        populateEditForm();
    });

    cancelEditBtn.addEventListener('click', function() {
        editForm.style.display = 'none';
    });

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update userData with form values
        userData.accountCreated = document.getElementById('edit-account-created').value;
        userData.favHorseBreed = document.getElementById('edit-fav-horse-breed').value;
        userData.pronouns = document.getElementById('edit-pronouns').value;
        userData.country = document.getElementById('edit-country').value;
        userData.description = document.getElementById('edit-description').value;

        // Update display and hide form
        updateProfileDisplay();
        editForm.style.display = 'none';

        // Here you would typically send the updated data to a server
        console.log('Profile updated:', userData);
    });

    // Initial profile display
    updateProfileDisplay();
});
