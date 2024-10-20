document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureInput = document.getElementById('profile-picture-input');
    const changePictureBtn = document.getElementById('change-picture-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = settingsModal.querySelector('.close');

    function updateProfileDisplay() {
        if (currentUser) {
            document.getElementById('profile-username').textContent = currentUser.username;
            document.getElementById('profile-pronouns').textContent = currentUser.pronouns || 'Not specified';
            document.getElementById('profile-region').textContent = currentUser.region || 'Not specified';
            document.getElementById('profile-description').textContent = currentUser.description || 'No description provided';
            document.getElementById('profile-created').textContent = currentUser.createdAt || 'Unknown';

            if (currentUser.profilePicture) {
                profilePicture.src = currentUser.profilePicture;
            }
        } else {
            window.location.href = 'index.html'; // Redirect to home if not logged in
        }
    }

    updateProfileDisplay();

    // ... (previous code for changing profile picture remains the same) ...

    settingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    document.getElementById('update-username-btn').addEventListener('click', function() {
        const newUsername = document.getElementById('change-username').value;
        if (newUsername) {
            currentUser.username = newUsername;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateProfileDisplay();
            alert('Username updated successfully!');
        }
    });

    document.getElementById('update-email-btn').addEventListener('click', function() {
        const newEmail = document.getElementById('change-email').value;
        if (newEmail) {
            currentUser.email = newEmail;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Email updated successfully!');
        }
    });

    document.getElementById('update-password-btn').addEventListener('click', function() {
        const newPassword = document.getElementById('change-password').value;
        if (newPassword) {
            currentUser.password = newPassword; // In a real app, you'd hash this password
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert('Password updated successfully!');
        }
    });

    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});
