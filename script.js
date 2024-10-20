document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    const userHeaderInfo = document.getElementById('user-header-info');
    const userInfoSection = document.getElementById('userInfo');

    function updateUserInfo() {
        if (currentUser) {
            authLink.innerHTML = '<a href="profile.html">Profile</a>';
            document.getElementById('username').textContent = currentUser.username;
            document.getElementById('radiant-amount').textContent = currentUser.radiant;
            document.getElementById('fluttergems-amount').textContent = currentUser.fluttergems;
            userHeaderInfo.style.display = 'flex';

            if (currentUser.isNewUser) {
                userInfoSection.innerHTML = `
                    <h3>Welcome, ${currentUser.username}!</h3>
                    <p>We've given you 10,000 Radiant and 20 Fluttergems to get you started!</p>
                    <p>You can check out the Market, edit your profile or read on the lore! Have fun and enjoy your stay :)</p>
                `;
                currentUser.isNewUser = false;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                // Update the user in existingUsers as well
                const existingUsers = JSON.parse(localStorage.getItem('existingUsers')) || [];
                const userIndex = existingUsers.findIndex(user => user.username === currentUser.username);
                if (userIndex !== -1) {
                    existingUsers[userIndex] = currentUser;
                    localStorage.setItem('existingUsers', JSON.stringify(existingUsers));
                }
            } else {
                userInfoSection.style.display = 'none';
            }
        } else {
            authLink.innerHTML = '<a href="signup.html">Sign Up</a>';
            userHeaderInfo.style.display = 'none';
            userInfoSection.style.display = 'none';
        }
    }

    updateUserInfo();
});
