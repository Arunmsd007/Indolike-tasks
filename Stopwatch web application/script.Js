
let startStopPause = document.querySelector("#startStopPause");
let reset = document.querySelector("#reset");
let lap = document.querySelector("#lap");
let display = document.querySelector("#display");
let lapsContainer = document.querySelector("#laps");

let hour = 0, min = 0, sec = 0, ms = 0;
let interval;
let isRunning = false;
let lapCount = 1; 


function formatTime() {
  return (
    (hour < 10 ? "0" + hour : hour) + " : " +
    (min < 10 ? "0" + min : min) + " : " +
    (sec < 10 ? "0" + sec : sec) + " : " +
    (ms < 100 ? (ms < 10 ? "00" + ms : "0" + ms) : ms)
  );
}


function updateDisplay() {
  display.innerHTML = formatTime();
}

function startStopwatch() {
  isRunning = true;
  interval = setInterval(() => {
    ms += 10;
    if (ms >= 1000) {
      ms = 0;
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
          min = 0;
          hour++;
        }
      }
    }
    updateDisplay();
  }, 10);
}


startStopPause.addEventListener("click", function () {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    startStopPause.innerText = "Start";
  } else {
    startStopwatch();
    startStopPause.innerText = "Pause";
  }
});


reset.addEventListener("click", function () {
  clearInterval(interval);
  isRunning = false;
  hour = 0;
  min = 0;
  sec = 0;
  ms = 0;
  lapCount = 1;
  updateDisplay();
  startStopPause.innerText = "Start";

  
  lapsContainer.innerHTML = "";
});


lap.addEventListener("click", function () {
  if (!isRunning) return; 


  let lapEntry = document.createElement("li");
  lapEntry.classList.add("lap-item");
  lapEntry.innerHTML = `<strong>Lap ${lapCount}:</strong> ${formatTime()}`;

  
  lapsContainer.appendChild(lapEntry);


  lapCount++;
});


updateDisplay();





const toggleButton = document.createElement("button");
toggleButton.className = "dark-mode-toggle";
toggleButton.textContent = "💡";
document.body.appendChild(toggleButton);


if (localStorage.getItem("dark-mode") === "enabled") {
  document.body.classList.add("dark-mode");
  toggleButton.textContent = "🔦";
}


toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("dark-mode", "enabled");
    toggleButton.textContent = "🔦";
  } else {
    localStorage.setItem("dark-mode", "disabled");
    toggleButton.textContent = "💡";
  }
});
