let pomodoroDiv = document.getElementById("pomodoro"),
    shortBreakDiv = document.getElementById("short-break"),
    longBreakDiv = document.getElementById("long-break")

document.getElementById("navbar-pomodoro").addEventListener("click", () => {
    pomodoroDiv.style.display = "block"
    shortBreakDiv.style.display = "none"
    longBreakDiv.style.display = "none"
})

document.getElementById("navbar-shortBreak").addEventListener("click", () => {
    pomodoroDiv.style.display = "none"
    shortBreakDiv.style.display = "block"
    longBreakDiv.style.display = "none"
})

document.getElementById("navbar-longBreak").addEventListener("click", () => {
    pomodoroDiv.style.display = "none"
    shortBreakDiv.style.display = "none"
    longBreakDiv.style.display = "block"
})

let time = 1500,
    running = false,
    alarm = new Audio,
    counting

alarm.src = "alarm.mp3"

document.getElementsByClassName("button-start")[0].addEventListener("click", startCounting)
document.getElementsByClassName("button-stop")[0].addEventListener("click", stopCounting)
document.getElementsByClassName("button-reset")[0].addEventListener("click", reset)

function startCounting() {
    counting = setInterval(() => {
        time--

        if (time === 0) {
            alarm.play()
            clearInterval(counting)
        }

        document.getElementsByTagName("title")[0].textContent = `(${convert(time)}) Tomato timer`
        document.getElementsByClassName("time")[0].textContent = convert(time)
    }, 1000)
}

function stopCounting() {
    clearInterval(counting)
}

function reset(){
    clearInterval(counting)
    time = 1500
    document.getElementsByTagName("title")[0].textContent = "Tomato timer"
    document.getElementsByClassName("time")[0].textContent = convert(time)
}

function convert(seconds) {
    let minutes = (seconds - (seconds % 60)) / 60,
        secondsLeft = seconds % 60
    
    minutes = (minutes < 10) ? "0" + minutes : minutes.toString()
    secondsLeft = (secondsLeft < 10) ? "0" + secondsLeft : secondsLeft.toString()
    
    return minutes + ":" + secondsLeft
}
