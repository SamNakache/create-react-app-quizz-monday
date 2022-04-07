//import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';




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
var x;
var numberOfQuestion = 15;
var pause = false;
var usedHalf = false;

getData()
setTimeout(() => { countDown(); }, 2000);



document.getElementById("option-one-label").addEventListener("click", function () { checkAnswer("optionA"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-two-label").addEventListener("click", function () { checkAnswer("optionB"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-three-label").addEventListener("click", function () { checkAnswer("optionC"); setTimeout(() => { stopInterval(); }, 1000); });
document.getElementById("option-four-label").addEventListener("click", function () { checkAnswer("optionD"); setTimeout(() => { stopInterval(); }, 1000); });

document.getElementById("play-pause-image").addEventListener("click", function () { pauseGame() });
document.getElementById("half").addEventListener("click", function () { half() });

//Restart Game
document.getElementById("restart").addEventListener("click", function () { 
  if (!pause)
    pauseGame()
  document.getElementById('before-new').style.display = 'flex';
});
document.getElementById("no").addEventListener("click", function () { 
  pauseGame()
  document.getElementById('before-new').style.display = 'none';
});
document.getElementById("yes").addEventListener("click", function () { 
  restartGame();
});




//New Game
document.getElementById("continue").addEventListener("click", function () {newGame()});




// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  removeColor()
  //cell.style.backgroundColor = "white";
  if (index < numberOfQuestion) {
    indexNumber = index;
    document.getElementById("number-question").innerHTML = (indexNumber + 1) + "/" + numberOfQuestion;
    currentQuestion = dataQuestions[indexNumber];
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = "A. "+currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = "B. "+currentQuestion.optionB;
    if (currentQuestion.nOptions === 2) {
      document.getElementById("option-three-label").style.display = 'none';
      document.getElementById("option-four-label").style.display = 'none';
    }
    else {
      document.getElementById("option-three-label").innerHTML = "C. "+currentQuestion.optionC;
      document.getElementById("option-four-label").innerHTML = "D. "+currentQuestion.optionD;
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
    if (playerScore>=5){
      playerScore -= 5;
    document.getElementById("player-score").innerHTML = playerScore
    }
    wrongAnswers++;
  }
  colorRightAnswer()

}


function colorRightAnswer() {
  switch (currentQuestion.correctOption) {
    case 'optionA':
      cell = document.getElementById("option-one-label")
      break;
    case 'optionB':
      cell = document.getElementById("option-two-label")
      break;
    case 'optionC':
      cell = document.getElementById("option-three-label")
      break;
    case 'optionD':
      cell = document.getElementById("option-four-label")
      break;
    default:
  }
  cell.style.backgroundColor = 'green'
}

function removeColor() {
  document.querySelectorAll('.option').forEach(item => {
    item.style.color = "black" 
    item.style.backgroundColor = "white" 
    item.addEventListener("mouseover", event => {
      item.style.backgroundColor = "rgb(58, 208, 231)";
      item.style.color = "white" 
    })
    item.addEventListener("mouseout", event => {
      item.style.backgroundColor = "white";
      item.style.color = "black" 
  })
  })
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
    if (!(indexNumber < numberOfQuestion)) {
      clearInterval(x)
      document.getElementById("remaining-time").innerHTML = "END";
    }
    if (!pause)
      seconds--;
  }, 1000);

}
function stopInterval() {
  clearInterval(x);
  indexNumber++;
  countDown();
}

function newGame(){
  eraseEverything();
  getData();
  setTimeout(() => { countDown(); }, 2000);
}




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
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function pauseGame() {
  if (!pause) {
    pause = true;
    document.getElementById("display-question").innerHTML = "";
    document.getElementById("option-one-label").innerHTML = "";
    document.getElementById("option-two-label").innerHTML = "";
    document.getElementById("option-three-label").innerHTML = "";
    document.getElementById("option-four-label").innerHTML = "";
    document.getElementById("play-pause-image").src = "play.png";
  }
  else {
    pause = false;
    NextQuestion(indexNumber)
    document.getElementById("play-pause-image").src = "pause.png";
  }

}

function half() {
  if (!usedHalf && !(currentQuestion.nOptions === 2)) 
  {
    document.getElementById("half").style.opacity = 0.5;
    usedHalf = true;
    removeTwoRandomOptions()
  }
}

function removeTwoRandomOptions() {
  var removable = [];
  let marked = -1
  while (removable.length < 2) {
    let option = getRandomInt(4);
    if (option !== marked) {
      switch (option) {
        case 0:
          if (checkOption("optionA")) {
            removable.push("option-one-label");
            marked = 0;
          }
          break;
        case 1:
          if (checkOption("optionB")) {
            removable.push("option-two-label");
            marked = 1;
          }
          break;
        case 2:
          if (checkOption("optionC")) {
            removable.push("option-three-label");
            marked = 2;
          }
          break;
        case 3:
          if (checkOption("optionD")) {
            removable.push("option-four-label");
            marked = 3;
          }
          break;
        default:
      }
    }

  }
  removable.forEach(element => {
    document.getElementById(element).innerHTML = "";
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkOption(option) {
  if (option === currentQuestion.correctOption)
    return false;
  return true;
}

function restartGame(){
  pauseGame();
  clearInterval(x);
  const b = bestScore;
  endOfGame();
  document.getElementById('before-new').style.display = 'none';
  newGame();
  document.getElementById("best-score").innerHTML = b;
}



