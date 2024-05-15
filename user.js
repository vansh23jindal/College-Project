document.addEventListener('DOMContentLoaded', () => {
    const updateProfileForm = document.querySelector('#update-profile-form');
  
    if (updateProfileForm) {
      updateProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const formData = new FormData(updateProfileForm);
        const formObject = Object.fromEntries(formData.entries());
  
        // Add the access token to the headers
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', `Bearer ${accessToken}`);
  
          fetch('http://localhost:5500/api/update-profile', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(formObject)
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to update profile.');
            }
          })
          .then((data) => {
            console.log('Profile updated successfully:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      });
    }
  });