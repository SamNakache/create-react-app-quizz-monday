import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


document.getElementById("continue").addEventListener("click", function () { newGame() });
getData()


let playerScore = 0  //holds the player score
document.getElementById("player-score").innerHTML = playerScore;
let wrongAnswers = 0 //amount of wrong answers picked by player
let rightAnswers = 0
let indexNumber = 0 //will be used in displaying next question
let currentQuestion
let bestScore = 0;
document.getElementById("best-score").innerHTML = playerScore;
const dataQuestions = [];
setTimeout(() => {  countDown(); }, 2000);



// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  console.log(index)
  if (index < dataQuestions.length) {
    indexNumber = index;
    currentQuestion = dataQuestions[indexNumber];
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
  }
  else
    endOfGame()
}

function checkAnswer(option) {
  if (option === currentQuestion.correctOption) {
    playerScore += 10;
    document.getElementById("player-score").innerHTML = playerScore
    rightAnswers++;
  }
  else {
    playerScore -= 5;
    document.getElementById("player-score").innerHTML = playerScore
    wrongAnswers++;
  }
}




function countDown() {
    NextQuestion(indexNumber)
  
  var seconds = 9;

  // Update the count down every 1 second
  var x = setInterval(function () {

    // Display the result in the element 
    addColor(9/seconds)
    document.getElementById("remaining-time").innerHTML = seconds;
    

    // If the count down is finished, write some text
    if (seconds < 1) {
      stopInterval()
    }
    if (!(indexNumber<dataQuestions.length)){
      clearInterval(x)
    }
    seconds--;
  }, 1000);

  function stopInterval(){
    clearInterval(x);
    indexNumber++;
      countDown();
  }

  

document.getElementById("option-one-label").addEventListener("click", function () {checkAnswer("optionA"); stopInterval()});
document.getElementById("option-two-label").addEventListener("click", function () {checkAnswer("optionB"); stopInterval()});
document.getElementById("option-three-label").addEventListener("click", function () {checkAnswer("optionC"); stopInterval()});
document.getElementById("option-four-label").addEventListener("click", function () {checkAnswer("optionD"); stopInterval()});
}

function addColor(result){
  if (result>=3)
    document.getElementById("remaining-time").style.color = 'red'
  else if (result<3 && result>=1.5)
    document.getElementById("remaining-time").style.color = 'yellow'
  else
    document.getElementById("remaining-time").style.color = 'green'
}


function endOfGame() {
  document.getElementById("remaining-time").innerHTML = "END";
  document.getElementById('score-modal').style.display = 'flex';
  document.getElementById('wrong-answers').innerHTML = wrongAnswers;
  document.getElementById('right-answers').innerHTML = rightAnswers;
  document.getElementById('score').innerHTML = playerScore;

}

function newGame() {
  eraseEverything()
  getData();
  countDown();
}

function eraseEverything() {
  if (playerScore > bestScore) {
    bestScore = playerScore
    document.getElementById("best-score").innerHTML = playerScore;
  }

  document.getElementById('score-modal').style.display = 'none';
  playerScore = 0  //holds the player score
  document.getElementById("player-score").innerHTML = playerScore;
  wrongAnswers = 0 //amount of wrong answers picked by player
  rightAnswers = 0
  indexNumber = 0 //will be used in displaying next question
  dataQuestions = []
}

function getData(){

  const url = 'https://opentdb.com/api.php?amount=100';

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let q = data.results;
  q.forEach(element => {
    const temp = {
      question: element.question,
      optionA: element.incorrect_answers[0],
      optionB: element.incorrect_answers[1],
      optionC: element.incorrect_answers[2],
      optionD: element.correct_answer,
      correctOption: "optionD",
      nIncorrectOptions: element.incorrect_answers.length
    }
    dataQuestions.push(temp)
  });
  console.log(dataQuestions[0].question)
})
.catch(function(error) {
  console.log(error);
});

}



