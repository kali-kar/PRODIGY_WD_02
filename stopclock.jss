let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const display = document.getElementById('display');
const laps = document.getElementById('laps');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        startPauseButton.textContent = 'Pause';
        startPauseButton.style.backgroundColor = '#ffeb3b';
    } else {
        clearInterval(tInterval);
        running = false;
        startPauseButton.textContent = 'Start';
        startPauseButton.style.backgroundColor = '#61dafb';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseButton.textContent = 'Start';
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
    startPauseButton.style.backgroundColor = '#61dafb';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    display.textContent = hours + ':' + minutes + ':' + seconds;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.textContent = 'Lap ' + lapCounter + ': ' + display.textContent;
        laps.appendChild(lapTime);
    }
}
