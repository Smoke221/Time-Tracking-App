// loading of nav and footer
$(function () {
    $("footer").load("footer.html")
})


// for title date display
var today = new Date();
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var month = monthNames[today.getMonth()];
var day = today.getDate();
var year = today.getFullYear();
document.getElementById("title").innerHTML += " " + month + " " + day + ", " + year;

const timerButton = document.querySelector("#timer-button");
const timerDisplay = document.querySelector(".timer");
const arrivalTime = document.querySelector(".arrival-time");
const leftTime = document.querySelector("#left-time p");
const productiveTime = document.querySelector("#productive-time p");
const deskTime = document.querySelector("#desk-time p");
const timeAtWork = document.querySelector("#time-at-work p");
const unproductiveTime = document.querySelector("#Unproductive p");
const idleTime = document.querySelector("#idle p")
const productivity = document.querySelector("#productivity p");
let popUp = document.querySelector(".hidden")

const productiveAppsDiv = document.querySelector('#productive-data');
const unproductiveAppsDiv = document.querySelector('#unproductive-data');
const idleAppsDiv = document.querySelector('#idle-data');

const productiveButton = document.querySelector("#productive-button");
const unproductiveButton = document.querySelector("#unproductive-button");
const idleButton = document.querySelector("#idle-button");

var startTime;
let timerIntervalId;
var screenTime;
var screenTimeString

window.onload = function () {
    screenTime = new Date();
    screenTimeString = screenTime.toLocaleTimeString();
};


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
var productiveTimeElapsed = null || 0
var unproductiveTimeElapsed = null || 0
var idleTimeElapsed = null || 0
var deskTimeElapsed;
var deskTimeMinutes;
var lastClickedButton = null;
var stopTime;
var stopTimeString;
var numericValue;
var parts;

productiveAppsDiv.textContent = 'No data collected'
unproductiveAppsDiv.textContent = 'No data collected'
idleAppsDiv.textContent = 'No data collected'

const buttons = document.querySelectorAll('.activity-button');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        lastClickedButton = event.target.textContent;
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
        const payload = {
            arrivalTime,
            productiveTimeElapsed,
            unproductiveTimeElapsed,
            idleTimeElapsed,
            deskTimeElapsed
        }
        fetch(`http://localhost:8000/app/myTimeFrame`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch(err => console.log(err, err.message))
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
    stopTime = new Date()
    stopTimeString = stopTime.toLocaleTimeString()

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

    parts = timeElapsed.split(' ')
    numericValue = parseInt(parts[0])


    if (lastClickedButton === 'Productive') {
        handleProductive()
    } else if (lastClickedButton === 'Unproductive') {
        handleUnproductive()
    } else if (lastClickedButton === 'Idle') {
        handleIdle()
    }

    timeAtWork.textContent = unproductiveTimeElapsed + productiveTimeElapsed + parts[1]



    if (productiveTimeElapsed === 0) {
        productiveAppsDiv.textContent = 'No data collected'
    } else {
        productiveAppsDiv.textContent = productiveTimeElapsed + parts[1]

    }


    if (unproductiveTimeElapsed === 0) {
        unproductiveAppsDiv.textContent = 'No data collected'
    } else {
        unproductiveAppsDiv.textContent = 'Time spent on unprodutive apps is' + ' ' + unproductiveTimeElapsed + parts[1]

    }


    if (idleTimeElapsed === 0) {
        idleAppsDiv.textContent = 'No data collected'
    } else {
        idleAppsDiv.textContent = idleTimeElapsed + parts[1]

    }
}


function handleProductive() {
    productiveTimeElapsed = parseInt(productiveTime.textContent) || 0;
    productiveTimeElapsed += numericValue;
    productiveTime.textContent = productiveTimeElapsed + parts[1]


    deskTimeElapsed = parseInt(deskTime.textContent) || 0;
    deskTimeElapsed += numericValue
    deskTime.textContent = deskTimeElapsed + parts[1]


    productivity.textContent = `${Math.floor((productiveTimeElapsed / deskTimeElapsed) * 100)}%`;
}

function handleUnproductive() {
    unproductiveTimeElapsed = parseInt(unproductiveTime.textContent) || 0
    unproductiveTimeElapsed += numericValue;
    unproductiveTime.textContent = unproductiveTimeElapsed + parts[1]

    deskTimeElapsed = parseInt(deskTime.textContent) || 0;
    deskTimeElapsed += numericValue
    deskTime.textContent = deskTimeElapsed + parts[1]

}

function handleIdle() {
    idleTimeElapsed = parseInt(idleTime.textContent) || 0
    idleTimeElapsed += numericValue;
    idleTime.textContent = idleTimeElapsed + parts[1]

    deskTimeElapsed = parseInt(deskTime.textContent) || 0;
    deskTimeElapsed += numericValue
    deskTime.textContent = deskTimeElapsed + parts[1]
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
idleButton.addEventListener("click", () => {
    popUp.style.display = "none";
})




// for chat box
const chatBtn = document.getElementById("chat-btn");
const chatWindow = document.getElementById("chat-window");
const messageDisplay = document.getElementById("message-display");
const messageInput = document.getElementById("message-input");


const socket = new WebSocket("ws://localhost:3000");


socket.onopen = function (event) {
    console.log("WebSocket connection opened:", event);
};


socket.onmessage = function (event) {
    console.log("WebSocket message received:", event.data);
    messageDisplay.innerHTML += "<p>" + event.data + "</p>";
};


socket.onerror = function (event) {
    console.error("WebSocket error:", event);
};


messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const message = messageInput.value;
        console.log("Sending message:", message);
        socket.send(message);
        messageInput.value = "";
    }
});

chatBtn.addEventListener("click", function () {
    chatWindow.style.display = chatWindow.style.display === "none" ? "block" : "none";
});