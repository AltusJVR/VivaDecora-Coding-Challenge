const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;

const reset = document.querySelector('.resetbtn')
cards.forEach(card => card.addEventListener('click', flipCard));


reset.addEventListener('click', function () {
  location.reload();
  resetBoard();
})

function counter() {
  moves += 1;
  if (moves === 1) {
    document.querySelector('.moves').innerHTML = `${moves} movimento`
  } else {
    document.querySelector('.moves').innerHTML = `${moves} movimentos`
  }
}

function flipCard() {

  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  // second click
  secondCard = this;
  checkForMatch();
}

// Check for match and add background to reflect match or not
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  counter();
  if (isMatch === true) {
    firstCard.classList.add('correct')
    secondCard.classList.add('correct')
    disableCards()
  } if (isMatch === false) {
    firstCard.classList.add('wrong')
    secondCard.classList.add('wrong')
    unflipCards()
  }
}




function disableCards() {

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.remove('bgcolor')
  secondCard.classList.remove('bgcolor')
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    firstCard.classList.remove('wrong')
    secondCard.classList.remove('wrong')
    firstCard.classList.remove('bgcolor')
    secondCard.classList.remove('bgcolor')
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

function setMoves() {
  if (moves <= 1)
    document.querySelector('.moves').innerHTML = `${moves}`;
  console.log(moves)
} if (moves > 1) {
  document.querySelector('.moves').innerHTML = `${moves}`;
  console.log(moves)
}

