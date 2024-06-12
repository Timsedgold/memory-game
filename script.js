const gameContainer = document.getElementById("game");
const startButton = document.querySelector("button");
const restartButton = document.querySelector('.restart-button');
const counter = document.querySelector('.counter');
const bestScoreBtn = document.querySelector('.best-score');
const numOfCardsInput = document.querySelector('#numOfCard');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);
    //  console.log('index', index);
    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  // for (let i = 0; i < numberOfCards; i++) {
  //    const randomIndex = Math.floor(Math.random() * colorArray.length);
    //  const color = colorArray[randomIndex];
     for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
     // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
     
  }
  


// Array to keep track of flipped cards
let flippedCards = [];
let matchedCards = [];
let currentScore = 0;
let bestScore = JSON.parse(localStorage.getItem('Best Score')) || Infinity;


function handleCardClick(event) {
    // If there are already two cards flipped, or the clicked card is already flipped, return early.
   currentScore++;
   counter.textContent = `Score ${currentScore}`;
  
  if (flippedCards.length === 2 || flippedCards.includes(event.target)) {
    return;
  }
  // Get the color from the class list of the clicked element
  const color = event.target.classList[0];
  // Set the background color of the clicked element to the color
  event.target.style.backgroundColor = color;
  flippedCards.push(event.target);

  // If there are two cards flipped, check for a match
  if (flippedCards.length === 2) {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard === secondCard) {
       // Clicking the same card twice, so we don't count it as a match
       firstCard.style.backgroundColor = '';
       flippedCards = [];
    }
     else if (firstCard.classList[0] === secondCard.classList[0]) {
     flippedCards = []; // Reset the flippedCards array for the next turn.
     matchedCards.push(firstCard, secondCard);
     if (matchedCards.length === 10) {
       restartButton.style.display = 'inline';
       if (currentScore < bestScore) {
        bestScore = currentScore;
        localStorage.setItem('Best Score', JSON.stringify(bestScore));
        bestScoreBtn.textContent = `Best Score ${bestScore}`;
       }
      }
    } 
    else {
      // Not a match, flip the cards back over after a short delay
      setTimeout(()=> {
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        flippedCards = []; // Reset the flippedCards array for the next turn
      }, 1000);
    }
   
  } 
  
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame(e) {
  gameContainer.innerHTML = '';
    let shuffledColors = shuffle(COLORS);
   createDivsForColors(shuffledColors);
   e.preventDefault();
   restartButton.style.display = 'none';
   currentScore = 0;
   counter.textContent = `Score ${currentScore}`;
  bestScoreBtn.textContent = `Best Score ${bestScore === Infinity ? 0 : bestScore}`;
  
}







