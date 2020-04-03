var secondsDisplay = document.querySelector("#timerSec");
var secondsElapsed = 0;
var totalSeconds = 0;
var secondsLeft;
var interval;

function renderTime() {
  //this function is used to render the time on the webpage. If time is over then it displays an alert and renders the high scores if any
  secondsLeft = totalSeconds - secondsElapsed;
  secondsDisplay.textContent = secondsLeft;
  if (secondsElapsed >= totalSeconds) {
    highScoreList.innerHTML = "";
    alert("You ran out of time, try again by using the 'Go Back' button below!");
    renderScores();
  }
}

function startTimer() {
  //this function starts the timer and calls the render timer to display the time
  totalSeconds = 75;
  if (totalSeconds > 0) {
    interval = setInterval(function() {
      secondsElapsed++;
      renderTime();
    }, 1000);
  }
}

function stopTimer() {
  //this function stops the timer
  secondsElapsed = 0;
  clearInterval(interval);
  secondsDisplay.textContent = "00";
}

//Using query selector for the required elements from html page
var content = document.querySelector("#content");
var startContent = document.querySelector("#startcontent");
var questList = document.querySelector("#Question");
var ansList = document.querySelector("#ans-list");
var ansOpt1 = document.querySelector("#ans-opt1");
var ansOpt2 = document.querySelector("#ans-opt2");
var ansOpt3 = document.querySelector("#ans-opt3");
var ansOpt4 = document.querySelector("#ans-opt4");
var answer = document.querySelector("#answer");
var endContent = document.querySelector("#endcontent");
var finalScore = document.querySelector("#finalscore");
var scoreList = document.querySelector("#scorelist");
var initialsForm = document.querySelector("#initials-form");
var initialsText = document.querySelector("#initials-text");
var highScoreList = document.querySelector("#highscorelist");

var quests;
var score = 0;
var answ = "";

//object to save the questions and answers. Last key value is used for saving the correct answers
var quiz = {
  question: [
    "Commonly used Data types DO NOT include:",
    "The condition in an if / else statement is eclosed within:",
    "Arrays in JavaScript can be used to store:",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
  ],
  ansOpt1: [
    "strings",
    "quotes",
    "numbers and strings",
    "commas",
    "console log"
  ],
  ansOpt2: [
    "booleans",
    "parentheses",
    "other arrays",
    "curly brackets",
    "JavaScript"
  ],
  ansOpt3: [
    "alerts", 
    "curly brackets", 
    "booleans", 
    "quotes", 
    "for loops"
  ],
  ansOpt4: [
    "numbers",
    "square brackets",
    "all of the above",
    "parentheses",
    "terminal / bash"
  ],
  corrAns: [
    "ansOpt3", 
    "ansOpt2", 
    "ansOpt4", 
    "ansOpt3", 
    "ansOpt1"
  ]
};

//Object to save the initials and scores
var initScores = {
  initials: [],
  score: []
};

//all the html elements are made hidden
content.style.display = "none";
endContent.style.display = "none";
scoreList.style.display = "none";

function startQuiz() {
  //this function initiates the quiz
  quests = 0;
  answer.textContent = "";
  startContent.style.display = "none";
  scoreList.style.display = "none";
  startTimer();
  renderQues();
}

function renderQues() {
  //this function renders the questions on the page and at the end of all questions displays the final score
  content.style.display = "block";
  if (quests < quiz.question.length) {
    questList.textContent = quiz.question[quests];
    ansOpt1.textContent = quiz.ansOpt1[quests];
    ansOpt2.textContent = quiz.ansOpt2[quests];
    ansOpt3.textContent = quiz.ansOpt3[quests];
    ansOpt4.textContent = quiz.ansOpt4[quests];
  } else {
    content.style.display = "none";
    endContent.style.display = "block";
    score = secondsLeft;
    finalScore.textContent = "Your final score is " + score;
    stopTimer();
  }
}

function nextQ(btnid) {
  //this function is called when any of the answer button is clicked and validates if the answer is right or wrong
  var selAns = "ansOpt" + btnid;
  if (selAns === quiz.corrAns[quests]) {
    answ = "Correct Answer";
  } else {
    answ = "Wrong Answer";
    secondsElapsed += 10;
  }
  answer.textContent = answ;
  quests++;
  renderQues();
}

function endQuiz() {
  //when this funciton is called it ends the quiz and gives the option to enter initials
  var InitialsVal = initialsText.value.trim();
  if(InitialsVal === ""){
    alert("No initials entered, entry will be saved with no initials")
  };
  initScores.initials.unshift(InitialsVal);
  initScores.score.unshift(score);
  highScoreList.innerHTML = "";
  renderScores();
}

//If user hits return instead of clicking Submit button then it calls the EndQuiz function through event listener
initialsForm.addEventListener("submit", function(event) {
  event.preventDefault();
  endQuiz();  
});

function renderScores() {
  //this function is used to render the list of all the scores
  endContent.style.display = "none";
  content.style.display = "none";
  scoreList.style.display = "block";
  
  for (var i = 0; i < Object.values(initScores.initials).length; i++) {
    var P = document.createElement("p");
    P.textContent = "Initials: " + initScores.initials[i] + " Score: " + initScores.score[i];
    highScoreList.appendChild(P);
  }
  stopTimer();
}

function clearScores() {
  //here the Score list will be cleared
  highScoreList.textContent = "";
  initScores.initials = [];
  initScores.score = [];
}