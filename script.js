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
    HighScoreList.innerHTML = "";
    alert("You ran out of time, try again by using the 'Go Back' button below!");
    RenderScores();
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
var Content = document.querySelector("#Content");
var StartContent = document.querySelector("#startcontent");
var QuestList = document.querySelector("#Question");
var AnsList = document.querySelector("#ans-list");
var AnsOpt1 = document.querySelector("#ans-opt1");
var AnsOpt2 = document.querySelector("#ans-opt2");
var AnsOpt3 = document.querySelector("#ans-opt3");
var AnsOpt4 = document.querySelector("#ans-opt4");
var Answer = document.querySelector("#answer");
var EndContent = document.querySelector("#endcontent");
var FinalScore = document.querySelector("#finalscore");
var ScoreList = document.querySelector("#scorelist");
var InitialsForm = document.querySelector("#initials-form");
var InitialsText = document.querySelector("#initials-text");
var HighScoreList = document.querySelector("#highscorelist");

var Quests;
var Score = 0;
var Answ = "";

//object to save the questions and answers. Last key value is used for saving the correct answers
var quiz = {
  Question: [
    "Commonly used Data types DO NOT include:",
    "The condition in an if / else statement is eclosed within:",
    "Arrays in JavaScript can be used to store:",
    "String values must be enclosed within _____ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content to the debugger is:"
  ],
  AnsOpt1: [
    "strings",
    "quotes",
    "numbers and strings",
    "commas",
    "console log"
  ],
  AnsOpt2: [
    "booleans",
    "parentheses",
    "other arrays",
    "curly brackets",
    "JavaScript"
  ],
  AnsOpt3: [
    "alerts", 
    "curly brackets", 
    "booleans", 
    "quotes", 
    "for loops"
  ],
  AnsOpt4: [
    "numbers",
    "square brackets",
    "all of the above",
    "parentheses",
    "terminal / bash"
  ],
  CorrAns: [
    "AnsOpt3", 
    "AnsOpt2", 
    "AnsOpt4", 
    "AnsOpt3", 
    "AnsOpt1"
  ]
};

//Object to save the initials and scores
var InitScores = {
  Initials: [],
  Score: []
};

//all the html elements are made hidden
Content.style.display = "none";
EndContent.style.display = "none";
ScoreList.style.display = "none";

function StartQuiz() {
  //this function initiates the quiz
  Quests = 0;
  Answer.textContent = "";
  StartContent.style.display = "none";
  ScoreList.style.display = "none";
  startTimer();
  renderQues();
}

function renderQues() {
  //this function renders the questions on the page and at the end of all questions displays the final score
  Content.style.display = "block";
  if (Quests < quiz.Question.length) {
    QuestList.textContent = quiz.Question[Quests];
    AnsOpt1.textContent = quiz.AnsOpt1[Quests];
    AnsOpt2.textContent = quiz.AnsOpt2[Quests];
    AnsOpt3.textContent = quiz.AnsOpt3[Quests];
    AnsOpt4.textContent = quiz.AnsOpt4[Quests];
  } else {
    Content.style.display = "none";
    EndContent.style.display = "block";
    Score = secondsLeft;
    FinalScore.textContent = "Your final score is " + Score;
    stopTimer();
  }
}

function NextQ(btnid) {
  //this function is called when any of the answer button is clicked and validates if the answer is right or wrong
  var SelAns = "AnsOpt" + btnid;
  if (SelAns === quiz.CorrAns[Quests]) {
    Answ = "Correct Answer";
  } else {
    Answ = "Wrong Answer";
    secondsElapsed += 10;
  }
  Answer.textContent = Answ;
  Quests++;
  renderQues();
}

function EndQuiz() {
  //when this funciton is called it ends the quiz and gives the option to enter initials
  var InitialsVal = InitialsText.value.trim();
  InitScores.Initials.unshift(InitialsVal);
  InitScores.Score.unshift(Score);
  HighScoreList.innerHTML = "";
  RenderScores();
}

function RenderScores() {
  //this function is used to render the list of all the scores
  EndContent.style.display = "none";
  Content.style.display = "none";
  ScoreList.style.display = "block";
  
  for (var i = 0; i < Object.values(InitScores.Initials).length; i++) {
    var P = document.createElement("p");
    P.textContent = "Initials: " + InitScores.Initials[i] + " Score: " + InitScores.Score[i];
    HighScoreList.appendChild(P);
  }
  stopTimer();
}

function ClearScores() {
  //here the Score list will be cleared
  HighScoreList.textContent = "";
  InitScores.Initials = [];
  InitScores.Score = [];
}