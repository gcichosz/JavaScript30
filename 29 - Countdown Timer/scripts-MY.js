let secondsLeft = 0;
let tickInterval;
let timeLeftDisplay;
let endTimeDisplay;

function updateDisplays() {
    const timeMinutes = Math.floor(secondsLeft / 60);
    const timeSeconds = secondsLeft % 60;
    const endTime = new Date(Date.now() + secondsLeft * 1000);
    const timeLeft = `${timeMinutes}:${timeSeconds
        .toString()
        .padStart(2, '0')}`;

    document.title = timeLeft;
    timeLeftDisplay.innerText = timeLeft;
    endTimeDisplay.innerText = `Be Back At ${endTime.getHours()}:${endTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    secondsLeft--;
    if (secondsLeft < 0) {
        clearInterval(tickInterval);
    }
}

function setTimer(seconds) {
    clearInterval(tickInterval);

    secondsLeft = seconds;
    updateDisplays();
    tickInterval = setInterval(updateDisplays, 1000);
}

(function() {
    const timerButtons = document.querySelectorAll('.timer__button');
    const minutesForm = document.querySelector('#custom');
    timeLeftDisplay = document.querySelector('.display__time-left');
    endTimeDisplay = document.querySelector('.display__end-time');

    timerButtons.forEach(b =>
        b.addEventListener('click', function() {
            setTimer(this.dataset.time);
        })
    );
    minutesForm.addEventListener('submit', function(e) {
        e.preventDefault();

        setTimer(this.elements['minutes'].value * 60);
    });
})();
