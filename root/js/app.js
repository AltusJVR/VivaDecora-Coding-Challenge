const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let boardCountarr = [];
let moves = 0;
let congratsStore = moves;
let levelOrigin = window.location.href;
let windowPath = window.location.pathname;


let params = new URLSearchParams(window.location.search);

const reset = document.querySelector('.resetbtn')
cards.forEach(card => card.addEventListener('click', flipCard));

reset.addEventListener('click', function () {
  window.location.reload()
  resetBoard();
});

function counter() {
  moves += 1;
  if (moves === 1) {
    document.querySelector('.moves').innerHTML = `${moves} movimento`
  } else {
    document.querySelector('.moves').innerHTML = `${moves} movimentos`
  }
}

function boardCount() {
  boardCountarr.push(firstCard, secondCard)
}

function setUrl() {
  params.set('moves', moves);
  if (levelOrigin === 'http://127.0.0.1:5500/root/normal.html' || windowPath === '/easy.html')
    params.append('level', 'easy');
} if (levelOrigin === 'http://127.0.0.1:5500/root/normal.html' || windowPath === '/easy.html') {
  params.append('level', 'normal');
} if (levelOrigin === 'http://127.0.0.1:5500/root/normal.html' || windowPath === '/easy.html') {
  params.append('level', 'hard');
}

function pageRedirect() {
  if (levelOrigin === 'http://127.0.0.1:5500/root/easy.html' && boardCountarr.length === 4) {
    setUrl()
    window.location.href = `${window.location.origin}/root/congrats.html?${params}`;
  } if (levelOrigin === 'http://127.0.0.1:5500/root/normal.html' && boardCountarr.length === 8) {
    setUrl()
    window.location.href = `${window.location.origin}/root/congrats.html?${params}`;

  } if (levelOrigin === 'http://127.0.0.1:5500/root/hard.html' && boardCountarr.length === 16) {
    setUrl()
    window.location.href = `${window.location.origin}/root/congrats.html?${params}`;

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

// Check for match and add background to reflect match or show not matching
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  counter();
  pageRedirect();
  if (isMatch === true) {
    firstCard.classList.add('correct')
    secondCard.classList.add('correct')
    disableCards()
    pageRedirect()
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
  boardCount();
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
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}
function removeParams() {
  params.delete('moves')
  params.delete('level')
  history.replaceState(null, null, params)
}


(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos
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