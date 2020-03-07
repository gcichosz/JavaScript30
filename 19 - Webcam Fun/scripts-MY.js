let video, canvas, ctx, strip, snap;

function playSnapSound() {
  snap.currentTime = 0;
  snap.play();
}

function takePhoto() {
  playSnapSound();

  const photoData = canvas.toDataURL('image/jpeg');

  const link = document.createElement('a');
  link.href = photoData;
  link.setAttribute('download', 'photo');
  link.innerHTML = `<img src="${photoData}" alt="A photo" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 1] = 0;
    pixels.data[i + 2] = 0;
  }

  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  let red, green, blue;

  document.querySelectorAll('input[type="range"]').forEach(i => (levels[i.name] = i.value));

  for (let i = 0; i < pixels.data.length; i += 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 300] = pixels.data[i];
    pixels.data[i - 150] = pixels.data[i + 1];
    pixels.data[i + 150] = pixels.data[i + 2];
  }

  return pixels;
}

function pipeVideoStreamToCanvas() {
  setInterval(() => {
    if (!video.paused && !video.ended) {
      ctx.drawImage(video, 0, 0);
      let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(rgbSplit(pixels), 0, 0);
    }
  }, 1000 / 30);
}

window.addEventListener('DOMContentLoaded', async () => {
  video = document.querySelector('.player');
  canvas = document.querySelector('.photo');
  ctx = canvas.getContext('2d');
  strip = document.querySelector('.strip');
  snap = document.querySelector('.snap');

  video.addEventListener('loadedmetadata', function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  });

  video.addEventListener('play', pipeVideoStreamToCanvas);

  const camera = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  video.srcObject = camera;
  video.play();
});
