const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
const scoreDisplay = document.querySelector('#score')
let score = 0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if(!hasFlippedCard) {
    // first card flipped 
    hasFlippedCard = true;
    firstCard = this; 
    // this = element that fired this event
    return;
  }
  // second card flipped 
  hasFlippedCard = false;
  secondCard = this;
  
  checkForMatch();
}

function scoreUp() {
  score +=10;
  scoreDisplay.innerHTML = score;
}

function scoreDown() {
score -=1;
  scoreDisplay.innerHTML = score;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 
    
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    scoreUp();
    console.log("Match: " + firstCard.dataset.framework);
    setTimeout("flashMatchOn()", 50);
    setTimeout("flashMatchOff()", 450);
    setTimeout("flashMatchOn()", 850);
    setTimeout("flashMatchOff()", 1250);
    setTimeout("flashMatchOn()", 1650);
    setTimeout("flashMatchOff()", 2050);
    scoreImgFound();
    resetBoard();
}


function flashMatchOn() {
  document.getElementById("flashmatch").style.visibility ="visible"; 
  }
function flashMatchOff() {
  document.getElementById("flashmatch").style.visibility ="hidden"; 
  }


function scoreImgFound() {
// Get desired elements
var element = document.getElementsByClassName(firstCard.dataset.framework);

// Iterate through the retrieved elements and remove "notfound" class name.
for(var i = 0; i < element.length; i++)
{
    element[i].classList.remove('notfound');
    console.log(element[i].className);
}
}

function unflipCards() {
    lockBoard = true;  
    scoreDown();
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
    }, 1000);
}

function resetBoard() {
  [hasFlippedCard,lockBoard] = [false, false];
  [firstCard,secondCard] = [null, null];00
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 29);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

