let timeLeftDisplay, backAtDisplay, timerInterval;

const millisecondsToTimeLeft = milliseconds =>
  `${Math.floor(milliseconds / 1000 / 60)}:${(Math.floor(milliseconds / 1000) % 60).toString().padStart(2, '0')}`;

function updateTimer(backAt) {
  if (backAt < Date.now()) {
    clearInterval(timerInterval);
    return;
  }

  timeLeftDisplay.textContent = millisecondsToTimeLeft(backAt.getTime() - Date.now());
  document.title = millisecondsToTimeLeft(backAt.getTime() - Date.now());
}

function setTimer(seconds) {
  clearInterval(timerInterval);

  const backAt = new Date(Date.now() + seconds * 1000);

  timeLeftDisplay.textContent = millisecondsToTimeLeft(backAt.getTime() - Date.now());
  document.title = millisecondsToTimeLeft(backAt.getTime() - Date.now());
  backAtDisplay.textContent = `Be Back At ${backAt.getHours()}:${backAt
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;

  timerInterval = setInterval(() => updateTimer(backAt), 1000);
}

function handlePredefinedTimer() {
  setTimer(this.dataset.time);
}

function setCustomTimer(e) {
  e.preventDefault();

  setTimer(this.minutes.value * 60);

  this.reset();
}

window.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.timer__button');
  const customTimerForm = document.querySelector('#custom');
  timeLeftDisplay = document.querySelector('.display__time-left');
  backAtDisplay = document.querySelector('.display__end-time');

  customTimerForm.addEventListener('submit', setCustomTimer);
  buttons.forEach(b => b.addEventListener('click', handlePredefinedTimer));
});
