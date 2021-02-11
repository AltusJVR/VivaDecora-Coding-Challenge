const reset = document.querySelector('.resetbtn');
let params = new URLSearchParams(window.location.search);
let b = document.getElementsByClassName('congratsMoves');
let c = params.get('moves');

function setMoves() {
  b[0].innerHTML += `Com ${c} movimentos!`;
}

setMoves();

function goBack() {
  window.history.back()
}

reset.addEventListener('click', goBack);