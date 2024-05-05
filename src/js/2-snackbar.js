import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

const form = document
  .querySelector('.form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const delay = parseInt(document.querySelector('input[name="delay"]').value);
    const state = document.querySelector('input[name="state"]:checked').value;

    createPromise(delay, state)
      .then(() => {
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
      })
      .catch(() => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
      });
  });
