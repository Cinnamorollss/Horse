document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const profilePicture = document.getElementById('profile-picture');
    const profilePictureInput = document.getElementById('profile-picture-input');
    const changePictureBtn = document.getElementById('change-picture-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');

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

    editProfileBtn.addEventListener('click', function() {
        // Implement profile editing functionality here
        console.log('Edit profile clicked');
        // You can open a modal or redirect to an edit page
    });
});
