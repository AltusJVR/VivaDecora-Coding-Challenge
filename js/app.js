const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let boardCountarr = [];
let moves = 0;
// This is to assist in looking at what difficulty the player is on
let levelOrigin = window.location.pathname;
// Query string variable
let params = new URLSearchParams(window.location.search);
// Congratuations play again button
const reset = document.querySelector('.resetbtn')

// Event LIstener for each card
cards.forEach(card => card.addEventListener('click', flipCard));

// Play agan button
reset.addEventListener('click', function () {
  window.location.reload()
  resetBoard();
});

// Move Counter
function counter() {
  moves += 1;
  if (moves === 1) {
    document.querySelector('.moves').innerHTML = `${moves} movimento`
  } else {
    document.querySelector('.moves').innerHTML = `${moves} movimentos`
  }
}

// Count how many card are matched
function boardCount() {
  boardCountarr.push(firstCard, secondCard)
}

// Pass the moves and the level to URL to use on the congratuolations page
function setUrl() {
  params.set('moves', moves);
  if (levelOrigin === '/easy.html')
    params.append('level', 'easy');
} if (levelOrigin === '/normal.html') {
  params.append('level', 'normal');
} if (levelOrigin === '/hard.html') {
  params.append('level', 'hard');
}

// Redirect to congratulations page once game is won
function pageRedirect() {
  if (levelOrigin === '/easy.html' && boardCountarr.length === 4) {
    setUrl()
    window.location.href = `${window.location.origin}/congrats.html?${params}`
  } if (levelOrigin === '/normal.html' && boardCountarr.length === 8) {
    setUrl()
    window.location.href = `${window.location.origin}/congrats.html?${params}`;

  } if (levelOrigin === '/hard.html' && boardCountarr.length === 16) {
    setUrl()
    window.location.href = `${window.location.origin}/congrats.html?${params}`;
  }
}

// Flip cards and add classes
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

// Check for match and add background to reflect match or show not matching
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  counter();
  pageRedirect()
  if (isMatch === true) {
    firstCard.classList.add('correct')
    secondCard.classList.add('correct')
    disableCards()
    setTimeout(() => {
      pageRedirect()
    }, 200);
  } if (isMatch === false) {
    firstCard.classList.add('wrong')
    secondCard.classList.add('wrong')
    unflipCards()
  }
}

// Disable correct cards so that they cannot be clicked again
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.classList.remove('bgcolor')
  secondCard.classList.remove('bgcolor')
  boardCount();
  resetBoard();
}

// Reset cards
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
  }, 700);
}

// Reset deck
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Shuffle Cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos
  });
})();

