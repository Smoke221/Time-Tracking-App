const timerButton = document.querySelector("#timer-button");
const timerDisplay = document.querySelector(".timer");
const arrivalTime = document.querySelector(".arrival-time");
const leftTime = document.querySelector("#left-time p");
const productiveTime = document.querySelector("#productive-time p");
const deskTime = document.querySelector("#desk-time p");
const timeAtWork = document.querySelector("#time-at-work p");
const unproductiveTime = document.querySelector("#Unproductive p");
const productivity = document.querySelector("#productivity p");
let popUp = document.querySelector(".hidden")

const productiveButton = document.querySelector("#productive-button");
const unproductiveButton = document.querySelector("#unproductive-button");
const idleButton = document.querySelector("#idle-button");

var startTime;
let timerIntervalId;

// timerButton.addEventListener("click", function () {
//     if (!startTime) {
//         startTime = new Date();
//         var timeString = startTime.toLocaleTimeString();
//         // console.log(timeString);
//         timerIntervalId = setInterval(updateTimerDisplay, 1000);
//         popUp.style.display = "block"
//     } else {
//         clearInterval(timerIntervalId);
//         startTime = null;
//         updateTimerDisplay();


//         const currentTime = new Date();
//         let currTimeString = currentTime.toLocaleTimeString()
//         const timeElapsed = currTimeString - timeString;

//         // Convert milliseconds to minutes
//         const minutesElapsed = Math.floor(timeElapsed / 60000);

//         let productiveTimeElapsed = parseInt(productiveTime.textContent) || 0;
//         productiveTimeElapsed += minutesElapsed;
//         productiveTime.textContent = productiveTimeElapsed;

//         const deskTimeElapsed = parseInt(deskTime.textContent) || 0;
//         deskTime.textContent = deskTimeElapsed + minutesElapsed;

//         const arrivalTimeElapsed = parseInt(arrivalTime.textContent) || 0;
//         // Convert milliseconds to minutes
//         timeAtWork.textContent = Math.floor((currentTime - arrivalTimeElapsed) / 60000);

//         // Calculate productivity as a percentage of time spent at the desk
//         const deskTimeMinutes = deskTimeElapsed / 60000;
//         productivity.textContent = `${Math.floor((productiveTimeElapsed / deskTimeMinutes) * 100)}%`;

//     }
// });


let isStarted = false;
var timeString;
var currTask;
var timeElapsed;
var productiveTimeElapsed;
var deskTimeElapsed;
var deskTimeMinutes;
var lastClickedButton = null;


const buttons = document.querySelectorAll('.activity-button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const lastClickedButton = event.target.textContent;
    });
});


timerButton.addEventListener("click", () => {
    isStarted = !isStarted;
    if (isStarted) {
        timerButton.textContent = 'Stop';
        startFunction();
    } else {
        timerButton.textContent = 'Start';
        stopFunction();
    }
})
function startFunction() {
    startTime = new Date();
    timeString = startTime.toLocaleTimeString();
    // console.log(timeString);
    timerIntervalId = setInterval(updateTimerDisplay, 1000);
    popUp.style.display = "block"

    arrivalTimeElapsed = startTime.toLocaleTimeString()
    arrivalTime.textContent = arrivalTimeElapsed

    leftTime.textContent = "Online"
}

function stopFunction() {
    clearInterval(timerIntervalId);
    startTime = 0;
    updateTimerDisplay();


    const currentTime = new Date();
    let currTimeString = currentTime.toLocaleTimeString()

    const shuru = new Date(`01/01/2000 ${timeString}`);
    const endTime = new Date(`01/01/2000 ${currTimeString}`);

    const timeDiffMs = endTime - shuru;


    if (timeDiffMs < 1000) {
        timeElapsed = `${timeDiffMs} ms`;
    } else if (timeDiffMs < 60000) {
        timeElapsed = `${Math.round(timeDiffMs / 1000)} sec`;
    } else if (timeDiffMs < 3600000) {
        timeElapsed = `${Math.round(timeDiffMs / 60000)} min`;
    } else {
        timeElapsed = `${Math.round(timeDiffMs / 3600000)} hr`;
    }

    handleProductive()
    handleUnproductive()
}


function handleProductive() {
    productiveTimeElapsed = parseInt(productiveTime.textContent) || 0;
    productiveTimeElapsed += timeElapsed;
    productiveTime.textContent = productiveTimeElapsed;


    deskTimeElapsed = parseInt(deskTime.textContent) || 0;
    deskTimeElapsed += productiveTimeElapsed;
    deskTime.textContent = deskTimeElapsed;



    deskTimeMinutes = deskTimeElapsed > 0 ? deskTimeElapsed / 60000 : 0;
    productivity.textContent = `${Math.floor((productiveTimeElapsed / deskTimeMinutes) * 100)}%`;
}

function handleUnproductive() {
console.log('working');
}

function updateTimerDisplay() {
    const timeElapsed = startTime ? new Date() - startTime : 0;
    const hours = Math.floor(timeElapsed / (1000 * 60 * 60));
    const minutes = Math.floor((timeElapsed / (1000 * 60)) % 60);
    const seconds = Math.floor((timeElapsed / 1000) % 60);
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerDisplay.textContent = formattedTime;
    // console.log(formattedTime);
}


productiveButton.addEventListener("click", () => {
    popUp.style.display = "none";
});
unproductiveButton.addEventListener("click", () => {
    popUp.style.display = "none";
})


