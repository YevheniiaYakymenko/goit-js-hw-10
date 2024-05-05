import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.btn-start');

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    validateDate();
  },
});

function validateDate() {
  const currentDate = new Date();
  if (userSelectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    disableStartBtn();
  } else {
    enableStartBtn();
  }
}

function enableStartBtn() {
  startBtn.disabled = false;
}

function disableStartBtn() {
  startBtn.disabled = true;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerInterval;
function initialTimer() {
  startBtn.disabled = true;
  input.disabled = true;

  const finallyDate = userSelectedDate.getTime();
  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const deltaTime = finallyDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startBtn.disabled = false;
      input.disabled = false;
    } else {
      const timeClock = convertMs(deltaTime);
      updateTimerDisplay(timeClock);
    }
  }, 1000);
}
startBtn.addEventListener('click', initialTimer);
function updateTimerDisplay(time) {
  const timerDisplay = document.querySelector('.timer');

  const formattedTime = `${addLeadingZero(time.days)}:${addLeadingZero(
    time.hours
  )}:${addLeadingZero(time.minutes)}:${addLeadingZero(time.seconds)}`;

  timerDisplay.textContent = formattedTime;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
