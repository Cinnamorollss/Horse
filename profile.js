document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureInput = document.getElementById('profile-picture-input');
    const changePictureBtn = document.getElementById('change-picture-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = settingsModal.querySelector('.close');
    const userHeaderInfo = document.getElementById('user-header-info');

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

            // Update header info
            document.getElementById('username').textContent = currentUser.username;
            document.getElementById('radiant-amount').textContent = currentUser.radiant;
            document.getElementById('fluttergems-amount').textContent = currentUser.fluttergems;
            userHeaderInfo.style.display = 'flex';
        } else {
            window.location.href = 'index.html'; // Redirect to home if not logged in
        }
    }

    updateProfileDisplay();

    changePictureBtn.addEventListener('click', function() {
        profilePictureInput.click();
    });

    profilePictureInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const size = Math.min(512, img.width, img.height);
                    canvas.width = size;
                    canvas.height = size;
                    ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
                    const resizedImage = canvas.toDataURL('image/jpeg');
                    profilePicture.src = resizedImage;
                    currentUser.profilePicture = resizedImage;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

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

    editProfileBtn.addEventListener('click', function() {
        // Implement profile editing functionality here
        console.log('Edit profile clicked');
        // You can open a modal or redirect to an edit page
       
        // Add this function to your existing profile.js
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Make sure your logout button calls this function
document.getElementById('logout-btn').addEventListener('click', logout);
    });
});
