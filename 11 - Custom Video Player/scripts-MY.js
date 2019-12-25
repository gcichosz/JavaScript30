let video;
let playToggleButton;
let filledProgressBar;

function toggleVideoPlay() {
    if (video.paused) {
        playToggleButton.innerText = `▮▮`;
        video.play();
    } else {
        playToggleButton.innerText = `►`;
        video.pause();
    }
}

function updateProgressBar() {
    filledProgressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`
}

function skipVideo() {
    video.currentTime += +this.dataset.skip;
}

function handleSliderChange() {
    video[this.name] = this.value;
}

function windVideo(event) {
    if (event.buttons === 1) {
        video.currentTime = event.offsetX / this.offsetWidth * video.duration;
    }
}

(function () {
    const progressBar = document.querySelector('.progress');
    const skipButtons = document.querySelectorAll('.player__button[data-skip]')
    const sliders = document.querySelectorAll('.player__slider');
    playToggleButton = document.querySelector('.player__button.toggle');
    video = document.querySelector('video');
    filledProgressBar = document.querySelector('.progress__filled');

    video.addEventListener('click', toggleVideoPlay)
    playToggleButton.addEventListener('click', toggleVideoPlay);

    video.addEventListener('timeupdate', updateProgressBar);

    skipButtons.forEach(b => b.addEventListener('click', skipVideo));

    sliders.forEach(s => s.addEventListener('input', handleSliderChange));

    progressBar.addEventListener('mousedown', windVideo);
    progressBar.addEventListener('mousemove', windVideo);
})();