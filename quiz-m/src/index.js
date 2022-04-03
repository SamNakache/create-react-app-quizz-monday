import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

document.addEventListener('readystatechange', event => { 
  if (event.target.readyState === "complete") {
    countDown();
    //getData();
    NextQuestion();
  }
});

document.getElementById("option-one-label").addEventListener("click", function(){ checkAnswer("optionA"); });
document.getElementById("option-two-label").addEventListener("click", function(){ checkAnswer("optionB"); });
document.getElementById("option-three-label").addEventListener("click", function(){ checkAnswer("optionC"); });
document.getElementById("option-four-label").addEventListener("click", function(){ checkAnswer("optionD"); });

document.getElementById("continue").addEventListener("click", function(){ newGame() });

function test(index){
  alert(index)
}


const questions = [
  {
      question: "How many days makes a week ?",
      optionA: "10 days",
      optionB: "14 days",
      optionC: "5 days",
      optionD: "7 days",
      correctOption: "optionD"
  },
  {
    question: "How old am I ?",
    optionA: "20",
    optionB: "29",
    optionC: "15",
    optionD: "50",
    correctOption: "optionB"
}
]

let playerScore = 0  //holds the player score
document.getElementById("player-score").innerHTML = playerScore;
let wrongAnswers = 0 //amount of wrong answers picked by player
let rightAnswers = 0
let indexNumber = 0 //will be used in displaying next question
let currentQuestion = questions[indexNumber]
let bestScore = 0;
document.getElementById("best-score").innerHTML = playerScore;
const dataQuestions = [];

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion() {
  //handleQuestions()
  //document.getElementById("player-score").innerHTML = playerScore
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
  
}

function checkAnswer(option){
  if (option == currentQuestion.correctOption){
    playerScore += 10;
    document.getElementById("player-score").innerHTML = playerScore
    rightAnswers++;
  }
  else{
    playerScore -=5;
    document.getElementById("player-score").innerHTML = playerScore
    wrongAnswers++;
  }
    
    if (indexNumber<questions.length){
      indexNumber++
    currentQuestion = questions[indexNumber];
    NextQuestion();
    } 
}


function countDown(){
  var countDownDate = addMinutes(new Date().getTime(), 0.5)

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  minutes = (minutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  seconds = (seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

  // Display the result in the element with id="demo"
  document.getElementById("remaining-time").innerHTML = minutes + ":" + seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    endOfGame();
  }
}, 1000);
}

function addMinutes(date, minutes) {
  return new Date(date + minutes*60000);
}

function endOfGame(){
document.getElementById("remaining-time").innerHTML = "EXPIRED";
    document.getElementById('score-modal').style.display = 'flex';
    document.getElementById('wrong-answers').innerHTML = wrongAnswers;
    document.getElementById('right-answers').innerHTML = rightAnswers;
    document.getElementById('score').innerHTML = playerScore;

}

function newGame(){
  countDown();
    //getData();
  eraseEverything()
    NextQuestion();
}

function eraseEverything(){
  if (playerScore>bestScore){
    bestScore = playerScore
    document.getElementById("best-score").innerHTML = playerScore;
  }
    
  document.getElementById('score-modal').style.display = 'none';
  playerScore = 0  //holds the player score
document.getElementById("player-score").innerHTML = playerScore;
wrongAnswers = 0 //amount of wrong answers picked by player
rightAnswers = 0
indexNumber = 0 //will be used in displaying next question
currentQuestion = questions[indexNumber]
}

/*function getData(){

  var getJSON = function(url, callback) {

    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

getJSON('https://opentdb.com/api.php?amount=100',  function(err, data) {

    if (err != null) {
        console.error(err);
    } else {

      var res = 'category: ${data.result[0].category}';
      console.log(res.category)

       var display = `User_ID: ${data.userId}
ID: ${data.id}
Title: ${data.title} 
Completion_Status: ${data.completed}`;
    }
  
});
      
      data.forEach(q => {
        const newQuestion = {
          question: q.question,
          optionA: q.correct_answer,
          optionB: q.incorrect_answers[0],
          optionC: q.incorrect_answers[1],
          optionD: q.incorrect_answers[2],
          correctOption: q.correct_answer
        }
    
        console.log(newQuestion.question)
    
        dataQuestions.push(newQuestion);
        
      });
   

}*/

