const reset = document.querySelector('.resetbtn');
let params = new URLSearchParams(window.location.search);
let b = document.getElementsByClassName('congratsMoves');
let c = params.get('moves');
// Insert moves from URLsearch params
function setMoves() {
  b[0].innerHTML += `Com ${c} movimentos!`;
}
setMoves();
// Play again on same difficulty
function goBack() {
  window.history.back()
}
// Play again button
reset.addEventListener('click', goBack);