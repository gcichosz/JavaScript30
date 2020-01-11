const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function playSnapSound() {
    snap.currentTime = 0;
    snap.play();
}

function captureVideoToImage(blob) {
    let downloadLink = document.createElement('a');
    let picture = document.createElement('img');
    downloadLink.appendChild(picture);
    let imgUrl = window.URL.createObjectURL(blob);

    picture.src = imgUrl;
    downloadLink.href = imgUrl;
    downloadLink.download = 'handsome';
    strip.appendChild(downloadLink);
}

function takePhoto() {
    playSnapSound();
    canvas.toBlob(captureVideoToImage, 'image/jpeg', 0.95);
}

function resizeCanvas(video) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
}

function redEffect(pixels) {
    for (let i = 1; i < pixels.data.length; i += 4) {
        pixels.data[i] = 0;
    }

    for (let i = 2; i < pixels.data.length; i += 4) {
        pixels.data[i] = 0;
    }

    return pixels;
}

function rgbSplit(pixels) {

    return pixels;
}

function greenScreen(pixels) {
    const redMin = document.querySelector('input[name="rmin"').value;
    const redMax = document.querySelector('input[name="rmax"').value;
    const greenMin = document.querySelector('input[name="gmin"').value;
    const greenMax = document.querySelector('input[name="gmax"').value;
    const blueMin = document.querySelector('input[name="bmin"').value;
    const blueMax = document.querySelector('input[name="bmax"').value;

    for (let i = 0; i < pixels.data.length; i += 4) {
        if ((pixels.data[i] < redMin || pixels.data[i] > redMax) &&
            (pixels.data[i + 1] < greenMin || pixels.data[i + 1] > greenMax) &&
            (pixels.data[i + 2] < blueMin || pixels.data[i + 2] > blueMax)) {
            pixels.data[i] = 255;
            pixels.data[i + 1] = 255;
            pixels.data[i + 2] = 255;
        }
    }

    return pixels;
}

function redrawCanvas(video) {
    resizeCanvas(video);

    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    try {
        let pixels = ctx.getImageData(0, 0, video.videoWidth, video.videoHeight);

        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        // pixels - greenScreen(pixels);

        ctx.putImageData(pixels, 0, 0);
    } catch {

    }

    setTimeout(redrawCanvas, 1000 / 30, video);
}

function pipeVideoStreamToCanvas() {
    redrawCanvas(this);
}

async function connectMediaStream() {
    let videoStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    video.srcObject = videoStream;

    video.addEventListener('play', pipeVideoStreamToCanvas);
    video.play();
};

connectMediaStream();