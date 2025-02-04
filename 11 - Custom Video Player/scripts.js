const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    updateButton();
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function key(e) {
    if (e.keyCode == 37) {
        video.currentTime -= 5;
    }
    if (e.keyCode == 39) {
        video.currentTime += 5;
    }
    if (e.keyCode == 38) {
        if (video.volume + 0.05 >= 1) {
            video.volume = 1;
            document.querySelector('input[name="volume"').value = 1;
        } else {
            video.volume += 0.05;
            document.querySelector('input[name="volume"').value += 0.05;
        }
        console.log(video.volume);
    }
    if (e.keyCode == 40) {
        if (video.volume - 0.05 <= 0) {
            video.volume = 0;
            document.querySelector('input[name="volume"').value = 0;
        } else {
            video.volume -= 0.05;
            document.querySelector('input[name="volume"').value -= 0.05;
        }
        console.log(video.volume);
    }
}

video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

window.addEventListener('keydown', key);