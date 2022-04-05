import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


getData()

let playerScore = 0  //holds the player score
document.getElementById("player-score").innerHTML = playerScore;
let wrongAnswers = 0 //amount of wrong answers picked by player
let rightAnswers = 0
let indexNumber = 0 //will be used in displaying next question
let currentQuestion;
let bestScore = 0;
document.getElementById("best-score").innerHTML = playerScore;
var dataQuestions = [];
var cell = document.getElementById("option-one-label")
setTimeout(() => { countDown(); }, 2000);
var x;
var l = 5; 



// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  removeColor()
  console.log(index)
  if (index < l) {
    indexNumber = index;
    currentQuestion = dataQuestions[indexNumber];
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    if (currentQuestion.nOptions === 2) {
      document.getElementById("option-three-label").style.display = 'none';
      document.getElementById("option-four-label").style.display = 'none';
    }
    else {
      document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
      document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
      document.getElementById("option-three-label").style.display = 'flex';
      document.getElementById("option-four-label").style.display = 'flex';
    }

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
  colorRightAnswer()
  
}


function colorRightAnswer(){
  switch(currentQuestion.correctOption){
    case 'optionA':
      cell = document.getElementById("option-one-label")
      break;
    case 'optionB':
      cell= document.getElementById("option-two-label")
      break;
    case 'optionC':
      cell= document.getElementById("option-three-label")
      break;
    case 'optionD':
      cell= document.getElementById("option-four-label")
      break;
    default:
  }
  cell.style.backgroundColor = 'green'
}

function removeColor(){
  cell.style.backgroundColor = 'lightgray'
}

function countDown() {
  
    NextQuestion(indexNumber);
    var seconds = 14;

  

  // Update the count down every 1 second
  x = setInterval(function () {

    // Display the result in the element 
    addColor(14 / seconds)
    document.getElementById("remaining-time").innerHTML = seconds;


    // If the count down is finished, write some text
    if (seconds < 1) {
      stopInterval()
    }
    if (!(indexNumber < l)) {
      clearInterval(x)
      document.getElementById("remaining-time").innerHTML = "END";
    }
    seconds--;
  }, 1000);
  
}
function stopInterval(){
      clearInterval(x);
      indexNumber++;
        countDown();
    }


document.getElementById("option-one-label").addEventListener("click", function () { checkAnswer("optionA"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-two-label").addEventListener("click", function () { checkAnswer("optionB"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-three-label").addEventListener("click", function () { checkAnswer("optionC"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-four-label").addEventListener("click", function () { checkAnswer("optionD"); setTimeout(() => { stopInterval(); }, 1000); });

function addColor(result) {
  if (result >= 3)
    document.getElementById("remaining-time").style.color = 'red'
  else if (result < 3 && result >= 1.5)
    document.getElementById("remaining-time").style.color = 'yellow'
  else
    document.getElementById("remaining-time").style.color = 'green'
}


function endOfGame() {
  document.getElementById('score-modal').style.display = 'flex';
  document.getElementById('wrong-answers').innerHTML = wrongAnswers;
  document.getElementById('right-answers').innerHTML = rightAnswers;
  document.getElementById('score').innerHTML = playerScore;

}

//New Game
document.getElementById("continue").addEventListener("click", function () { 
  eraseEverything();
  getData();
  setTimeout(() => { countDown(); }, 2000);
});



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

function getData() {

  const url = 'https://opentdb.com/api.php?amount=100';

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      let q = data.results;
      q.forEach(element => {
        element.incorrect_answers.push(element.correct_answer)
        shuffleArray(element.incorrect_answers)
        var cOption = "";//Will contain the index of the right answer after we shuffled the options
        var c = element.incorrect_answers.indexOf(element.correct_answer)
        switch (c) {
          case 0:
            cOption = "optionA"
            break;
          case 1:
            cOption = "optionB"
            break;
          case 2:
            cOption = "optionC"
            break;
          case 3:
            cOption = "optionD"
            break;
          default:
        }

        const temp = {
          question: element.question,
          optionA: element.incorrect_answers[0],
          optionB: element.incorrect_answers[1],
          optionC: element.incorrect_answers[2],
          optionD: element.incorrect_answers[3],
          correctOption: cOption,
          nOptions: element.incorrect_answers.length//Will contain the number of options for each question
        }
        dataQuestions.push(temp)
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    //l = dataQuestions.length;

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}



