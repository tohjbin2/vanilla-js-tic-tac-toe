/* app.js의 담당 역할: 여러 가지를 초기화시키는 기능 담당(=html요소나 포인터를 자바스크립트의 변수와 상수로 가져오는(저장하는) 기능 담당). 실제 구동되는 로직이 담긴 파일은 아니다. */

const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
/* TAG: gameData변수는 게임 보드에의 보드판을 가리킨다.
보드의 바뀐 값을 저장(감지)하기 위해 만든 것이다. */

// let editedPlayer = 0; (현재 어디에도 사용되지 않음)
let activePlayer = 0;
let currentRound = 1;
/* let currentRound = 1;:
1라운드부터 시작하기 때문에, 1을 할당했다. */
let gameIsOver = false;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

const playerConfigOverlayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
/* const formElement = document.querySelector("form");: 
class, id가 아닌 기존에 있는? 일반적인 요소인 form을 가져왔다.
id를 입력해 가져올 수 있다지만, 이런식으로 일반적인? 요소들도 변수나 상수로 가져올 수 있다. */
const errorOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
/* TAG: activePlayerNameElement: 게임 보드에 있는 현재 턴인 PLAYER NAME.
화면상에서 'It's your turn' 이후에 위치한 PLAYER NAME에 상수를 할당한 것이다. */
const gameOverElement = document.getElementById("game-over");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");
const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
// TAG: cancelConfigBtnElement: 모달에 있는 'cancel'버튼
const startNewGameBtnElement = document.getElementById("start-game-btn");
// TAG: startNewGameBtnElement: Start New Game버튼에 상수 할당

// TAG: 아래 코드 2개: 모달 열기
editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);
/* openPlayerConfig는 config.js로부터 전달 받은 함수이다.
다른 js파일에 있는 함수를 가져오는 것에 대한 설명은 html파일의 script태그 부분에 있다. */

// TAG: 아래 코드 2개: 모달 닫기
cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);
/* submit 이벤트: (https://developer.mozilla.org/ko/docs/Web/API/HTMLFormElement/submit_event)
자바스크립트 내장 이벤트. 
(마치 click 이벤트를 적용한 것처럼) form 내부에 있는 제출 버튼(<button type="submit">, <input type="submit"> 등)을 '눌렀을 때' 발생한다. */
/* formElement.addEventListener("submit", savePlayerConfig);는 
특정 폼(여기서는 formElement라는 이름인)을 submit(제출)할 경우, savePlayerConfig()함수가 실행되는 것을 의미한다. */

startNewGameBtnElement.addEventListener("click", startNewGame);
/* TAG: 이벤트: startNewGameBtnElement.addEventListener("click", startNewGame);:
Start New game버튼 누르면 게임 시작 */

/* 게임 보드를 선택하는 방법 1 (게임 보드 li를 가져오는 방법 1) ----------start */
const gameFieldElements = document.querySelectorAll("#game-board li");
/* document.querySelectorAll("#game-board li");:
game-board 안에 있는, li요소 전부를 가리킨다. */

for (const gameFieldElement of gameFieldElements) {
  /* for...of:
  of 뒤에는 반복하려는 배열을 넣는다. 
  여기서 gameFieldElements는 배열이면서, 위에서 가져온 gameFieldElements을 의미한다. */
  gameFieldElement.addEventListener("click", selectGameField);
  /* selectGameField()함수는 game.js에 정의되어 있다. */
}
/* 게임 보드를 선택하는 방법 1 (게임 보드 li를 가져오는 방법 1) ----------end */

/* 게임 보드를 선택하는 방법 2 (게임 보드 li를 가져오는 방법 2) ----------start */
// const gameBoardElement = document.getElementById("game-board");
/* const gameBoardElement = document.getElementById("game-board");:
순서가 지정된(ol 안에 있는) 리스트(li 요소) 모조리 가져오기 */

// gameBoardElement.addEventListener("click", selectGameField);

/* 그런데 '게임 보드 li를 가져오는 방법 2'의 경우 치명적인 문제가 있다.
셀과 셀 사이의 공백(화면상에서 보라색과 보라색 사이에 있는 흰색 격자 부분)까지도 이벤트리스너가 적용되어,
그 곳을 클릭해도 X나 O가 나타난다.
그래서 LI가 아닌 부분(격자 부분)을 클릭하면 아무 일도 일어나지 않게끔 만들어야 한다. 
이를 위해서 game.js에 있는, function selectGameField(event) {...} 안에 아래 코드를 넣어 예외 처리를 해둔다. 
  if (event.target.tagName !== "LI") {
    return;
  } */
/* 게임 보드를 선택하는 방법 2 (게임 보드 li를 가져오는 방법 2) ----------end */
