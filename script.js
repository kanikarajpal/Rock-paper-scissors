const choice = ['Rock', 'Paper', 'Scissors'];
let finalResult = document.getElementById('result');
let finalScore = document.getElementById('player-score');
let compChoice = document.getElementById('compChoice');
let userChoice = document.getElementById('userChoice');
let subHeading = document.getElementsByClassName('sub-heading');
const end = document.getElementById('endGameButton');
let exactScore = 0;

function getComputerChoice() {
  const compchoice = Math.floor(Math.random() * choice.length);
  return choice[compchoice];
}

function getResult(playerChoice, computerChoice) {
  let score = 0;

  if (playerChoice == computerChoice) {
    score = 0;
  } else if (
    (playerChoice == 'Rock' && computerChoice == 'Scissors') ||
    (playerChoice == 'Scissors' && computerChoice == 'Paper') ||
    (playerChoice == 'Paper' && computerChoice == 'Rock')
  ) {
    score = 1;
  } else {
    score = -1;
  }

  return score;
}

function showImage(playerChoice, compChoice) {
  const compIcon = document.getElementById('computerCurrentIcon');
  const userIcon = document.getElementById('userCurrentIcon');
  const userIconClasses = userIcon.classList;
  const compIconClasses = compIcon.classList;

  document.getElementsByClassName('currentImg')[0].style.display = 'block';
  document.getElementsByClassName('currentImg')[1].style.display = 'block';
  document.getElementById('head-part').style.display = 'none';
  document.getElementById('left').style.display = 'block';
  document.getElementById('right').style.display = 'block';

  if ('userAnim' == userIconClasses[2] && 'compAnim' == compIconClasses[2]) {
    userIconClasses.remove('userAnim');
    compIconClasses.remove('compAnim');
    console.log(userIconClasses);

    setTimeout(() => {
      userIcon.classList.add('userAnim');
      compIcon.classList.add('compAnim');
    }, 50);
  } else {
    userIcon.classList.add('userAnim');
    compIcon.classList.add('compAnim');
  }

  userIcon.src = `./images/${playerChoice}.png`;
  compIcon.src = `./images/${compChoice}.png`;
}

function showResult(score, playerChoice, computerChoice) {
  showImage(playerChoice, computerChoice);
  exactScore += score;

  if (score == -1) {
    finalResult.innerHTML = '<h1>You lose !</h1>';
    finalScore.innerHTML = `<h2>SCORE : ${exactScore}`;
  } else if (score == 1) {
    finalResult.innerHTML = '<h1>You won ! </h1>';
    finalScore.innerHTML = `<h2>SCORE : ${exactScore}`;
  } else {
    finalResult.innerHTML = "<h1> It's a tie!</h1>";

    finalScore.innerHTML = `<h2>SCORE : ${exactScore}`;
  }
}
function onClickRPS(playerChoice) {
  let comp = getComputerChoice();
  let score = getResult(playerChoice, comp);

  showResult(score, playerChoice, comp);
}
function endGame() {
  document.getElementById('head-part').style.display = 'block';
  document.getElementsByClassName('currentImg')[0].style.display = 'none';
  document.getElementsByClassName('currentImg')[1].style.display = 'none';
  finalResult.innerText = ' ';
  finalScore.innerText = ' ';
  document.getElementById('left').style.display = 'none';
  document.getElementById('right').style.display = 'none';
  exactScore = 0;
  end.style.display = 'none';
}

function playGame() {
  const buttons = document.querySelectorAll('.rpsButton');

  // use querySelector to select all RPS Buttons
  buttons.forEach(
    (button) =>
      (button.onclick = () => {
        onClickRPS(button.value);
        end.style.display = 'block';
        document.getElementsByClassName('resultContainer').padding = 0;

        // take the value for the image
      })
  );

  end.onclick = () => endGame();
}
// ** endGame function clears all the text on the DOM **

playGame();
