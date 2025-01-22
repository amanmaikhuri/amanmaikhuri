const dailyMotivation = document.querySelector(".daily-motivation");
const mindBox =document.getElementById("mind-box");
const breathingBox =document.getElementById("breathing-box");
const mindfulnessBox =document.getElementById("mindfulness-box");
const affirmationBox=document.getElementById("affirmation-box");
const resourceBox =document.getElementById("resource-box");


//mood -Logger

let myMoodLogs=[];
const moodToday =document.querySelector("#mood-options");
const Thoughts =document.querySelector("#text-box");
const submitbtn =document.querySelector("#submit-btn");
const Deletebtn =document.querySelector("#delete-btn");

let pastLogs =document.querySelector("#logs");
let mood =document.querySelector("#mood");
let timenow =document.querySelector("#time-stamp");

let logMoodToLs = document.querySelector("#pastLogs");
const ul = document.querySelector("#ul");

const now = new Date();
const year = now.getFullYear();
const month =String(now.getMonth()+1).padStart(2, '0');
const Day = String(now.getDate()).padStart(2, '0');
const hours= String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

let dayStamp = `${Day}-${month}-${year}`;
let timeStamp = `${hours}:${minutes}:${seconds}`;

let recTime =`[${dayStamp} ${timeStamp}]`;

const logsFromLocalStorage = JSON.parse(localStorage.getItem("myMood-Logs"));


if(logsFromLocalStorage){
    myMoodLogs = logsFromLocalStorage
    render(myMoodLogs)
}


submitbtn.addEventListener("click",function(){
    const myMood = {
        "moodNow": moodToday.value,
        "thoughts" : Thoughts.value,
        "time": recTime,
        "emoji": returnEmoji()
    }
    const pushEntry =` ${myMood.time} ${myMood.moodNow} ${myMood.emoji}
     ${myMood.thoughts}`
    myMoodLogs.push(pushEntry);
    localStorage.setItem("myMood-Logs" ,JSON.stringify(myMoodLogs))
    render(myMoodLogs)
})

Deletebtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myMoodLogs =[]
    render(myMoodLogs)
})


function render(moodlogs){
    let listItems = ""
    for(let i=0 ; i < myMoodLogs.length ;i++){
        listItems += `
            <li>
                ${moodlogs[i]}   
            </li>`
    }
    ul.innerHTML = listItems;
    refreshPage()
}


function returnEmoji() {
    if(moodToday.value === "happy"){
        return "😊"
    } else if(moodToday.value === "sad"){
        return "😔"
    } else if(moodToday.value === "neutral"){
        return "😐"
    } 
}

function refreshPage() {
    //refresh mood
    document.getElementById("mood-options").value = moodToday;
    //refresh thoughts
    Thoughts.value =""
}

//menu.js

const menuIcon =document.getElementById("menuIcon");
const menuOptions =document.getElementById("menuOptions");

/* toogle dropdown */
menuOptions.style.display = "none";

menuIcon.addEventListener("click", () => {
    if(menuOptions.style.display === "block"){
        menuOptions.style.display = "none";
    } else {
        menuOptions.style.display = "block"
    }
});


/*breathing Excercise*/

const startBreathing = document.querySelector(".breathingBtn");

startBreathing.addEventListener("click",() => {
    const circle = document.getElementById("circle");
    const instruction = document.getElementById("instruction");
    const timerElement = document.getElementById("timer");

    instruction.textContent ="";
    let seconds =60;
    timerElement.textContent =`Time Left : ${seconds}s`;
    circle.style.display ="block";
    circle.style.animation ="breathe 4s Infinite";

    const timer  = setInterval(() => {
        seconds -= 1 ;
        timerElement.textContent =`Time Left : ${seconds}s`
        if (seconds <=0){
            clearInterval(timer);
            circle.style.display = "none";
            instruction.textContent =`Breathing Excercise Completed !
            please start again !`; 
            timerElement.textContent ="";
            startBreathing.textContent = "Start Again";

        }
    },1000);
});


/* Affirmations */

const dailyAffirmations = [
    "you are capable of amazing things.",
    "One small positive thought can change  your whole day.",
    "You are stronger than you think.",
    "Every day is a second chance .",
    "You deserve to be happy and loved."
];

const affirmations = document.getElementById("affirmation");

//displaying affirmations 
const randomAffirmation = dailyAffirmations[Math.floor(Math.random()*dailyAffirmations.length)];

affirmations.textContent = `" ${randomAffirmation} "` ;




