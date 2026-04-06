
import { showAlert } from './alerts';
const signupForm = document.querySelector('.form--signup');

if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    try {
      const res = await fetch('/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm
        })
      });

      const data = await res.json();

      if (data.status === 'success') {
        showAlert('Signup successful!');
        window.setTimeout(() => {
        location.assign('/');
      }, 1500);
      } else {
        showAlert(data.message);
      }
    } catch (err) {
      console.error(err);
      showAlert('Something went wrong!');
    }
  });
}
