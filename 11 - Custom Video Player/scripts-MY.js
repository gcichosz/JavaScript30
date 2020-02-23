let video;
let playToggleButton;
let progressIndicator;

function updateProgress() {
  const elapsed = (video.currentTime / video.duration) * 100;
  progressIndicator.style.flexBasis = `${elapsed}%`;
}

function toggleVideoPlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  playToggleButton.textContent = video.paused ? '►' : '❚ ❚';
}

function changeProgress(e) {
  if (e.buttons !== 1 && e.which !== 1) {
    return;
  }

  const elapsed = (e.offsetX / this.offsetWidth) * video.duration;
  video.currentTime = elapsed;
}

function onSliderChange() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += Number(this.dataset.skip);
}

window.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.progress');
  const sliders = document.querySelectorAll('input[type="range"]');
  const skipButtons = document.querySelectorAll('button[data-skip]');
  video = document.querySelector('.viewer');
  progressIndicator = document.querySelector('.progress__filled');
  playToggleButton = document.querySelector('.toggle');

  video.addEventListener('timeupdate', updateProgress);

  video.addEventListener('click', toggleVideoPlay);
  playToggleButton.addEventListener('click', toggleVideoPlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);

  progressBar.addEventListener('click', changeProgress);
  progressBar.addEventListener('mousemove', changeProgress);

  sliders.forEach(s => s.addEventListener('input', onSliderChange));

  skipButtons.forEach(b => b.addEventListener('click', skip));
});
