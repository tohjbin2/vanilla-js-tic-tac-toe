/* game.js의 담당 역할: 게임 보드 로직 담당 */

function resetGameStatus() {
  // TAG: resetGame(): 게임을 다시 시작할 때를 위한 함수 (게임 초기화를 위한 함수). resetGameStatus()함수에 넣었다.
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  /* gameOverElement.firstChild;:
  gameOverElement(game-over라는 id를 할당함)의 첫 번째 요소는 h2이다. 
  (<h2>You won, <span id="winner-name">PLAYER NAME</span>!</h2>) */
  gameOverElement.style.display = "none";

  /* TAG: 아래 for문: 게임 보드를 초기화 시킨다. */
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    /* 여기의 for문(for (let i = 0; i < 3; i++) {...}): 외부 반복문 */
    for (let j = 0; j < 3; j++) {
      /* 여기의 for문(for (let j = 0; j < 3; j++) {...}): 내부 반복문 */
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      /* gameBoardElement: app.js에서 할당한 상수다. 
      (const gameBoardElement = document.getElementById("game-board"))*/
      /* 1. .children: 특정 요소의 모든 자식요소를 가리킨다.
      2. gameBoardElement.children;: 
      gameBoardElement의 모든 자식요소를 가리킨다. html을 확인해보면 가리키는 대상이 모든 li인 것을 알 수 있다. */
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
      /* gameBoardIndex++;:
      1. gameBoardIndex++;는 gameBoardIndex = gameBoardIndex + 1과 같은 의미이다. 
      2. 내부 반복문이 반복될 때마다 값이 1씩 증가한다. */
    }
  }
}

function startNewGame() {
  // TAG: startNewGame(): 게임 보드가 보이게 만드는 함수 (그러기 위한 조건을 따지는 함수)
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }
  /* TAG: if (players[0].name === "" || players[1].name === "") {...}:
  플레이어 이름을 두개 다 입력하지 않으면 경고문이 뜨는 조건. if 안에 있는 두 조건 중 하나에만 해당해도(어느 한쪽만 true여도) 경고문이 나타난다.
  좀 더 자세히 설명하자면, ||를 기준으로 왼쪽에 있는 players[0].name === ""를 먼저 체크해서 해당 부분에 해당되면(=true라면) 경고문을 반환한다. 
  그리고 왼쪽에 있는 players[0].name === ""에 해당되지 않는다면(=false라면), 오른쪽에 있는 players[1].name === ""를 체크해서 해당 부분이 맞다면(=true라면) 경고문을 반환한다. 
  */
  /* -----WARNING! 아래 예시는 강의가 아닌 개인적으로 적용해 본 것이다-----  
  위의 if문(if (players[0].name === "" || players[1].name === "") {...})과 아래 예시는 같은 결과가 나온다.
  for (let i = 0; i <= players.length; i++) {
    if (players[i].name === "") {
      alert("Please set custom player names for both players!");
      return;
    }
  } */

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function checkForGameOver() {
  /* TAG: checkForGameOver()함수: 승자, 무승부 체크하기.
  플레이어가 게임 보드를 누를 때마다 값을 체크한다. 아래 4가지 if문에 해당하지 않으면 아직 승자가 없다는 의미이다. */

  // TAG: 승자 확인 ----------start
  /* 승자 확인 4가지 조건 중, 하나를 충족해 승자가 생기면 1이나 2가 반환된다. */
  /* TAG: 아래 for문: 가로 완성 체크 (ㅡ방향 체크) 
  row(행)가 동일한 값을 가졌는지(동일한 플레이어가 차지했는지) 체크한다. */
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  /* TAG: 아래 for문: 세로 완성 체크 (|방향 체크)
  column(열)이 동일한 값을 가졌는지(동일한 플레이어가 차지했는지) 체크한다. */
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  /* TAG: 아래 if문: 대각선 완성 체크1 (\방향 체크)
  대각선이 동일한 값을 가졌는지(동일한 플레이어가 차지했는지) 체크한다. (왼쪽 위에서부터 오른쪽 아래인 대각선, \방향) */
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  /* TAG: 아래 if문: 대각선 완성 체크2 (/방향 체크)
  대각선이 동일한 값을 가졌는지(동일한 플레이어가 차지했는지) 체크한다. (오른쪽 위에서부터 왼쪽 아래인 대각선, /방향) */
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }
  // TAG: 승자 확인 ----------end

  // TAG: 무승부 확인 ----------start
  if (currentRound === 9) {
    /* currentRound: app.js에서 할당한 변수이다. (let currentRound = 1) */
    return -1;
    /* 위 승자 조건에 어디에도 해당 되지 않고, 9라운드가 되면 -1을 반환한다. */
  }
  // TAG: 무승부 확인 ----------end

  return 0;
  /* return 0;: 위 '승자 조건' 4가지, '무승부 조건' 중 어디에도 해당되지 않는 경우 0을 반환한다. 0이 반환되면 게임은 계속 진행된다. */
}
/* checkForGameOver()에 있는 위쪽에 있는 for문(row값을 체크하는 for문)은 다음 코드와 동일한 의미이다.
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[0][1] &&
    gameData[0][1] === gameData[0][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[1][0] > 0 &&
    gameData[1][0] === gameData[1][1] &&
    gameData[1][1] === gameData[1][2]
  ) {
    return gameData[1][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[2][1] &&
    gameData[2][1] === gameData[2][2]
  ) {
    return gameData[2][0];
  } */
/* 참고: checkForGameOver()함수에 들어갈 수 있는 if문 
(여기에 적은 코드들은 비효율적인 방법으로, 참고를 위해 작성한 것이다)
1. 플레이어 1이 맨 윗줄 가로를 완성한 경우  
if (gameData[0][0] === 1 && gameData[0][1] === 1 && gameData[0][2] === 1) {
  return 1;
} 
2. 2번 if문: 전체 행을 같은 플레이어가 소유한지 확인한 후에, 맞다면 해당 플레이어의 id를 return한다.
if (gameData[0][0] === gameData[0][1] && gameData[0][1] === gameData[0][2]) {
  return gameData[0][0];
} */

function switchPlayer() {
  // TAG: switchPlayer(): 플레이어 전환(교대)과 관련된 함수
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  // TAG: selectGameField(): 게임 보드를 누르는 것과 관련된 함수

  /* (함수의) 매개변수로 들어오는 값은 함수를 어디에 위치시켰느냐에 따라 달라진다. 
  이벤트에 할당하는 함수의 경우 어떤 이벤트가 들어오느냐에 따라 매개 변수로 들어오는 값도 달라진다. 
  selectGameField의 매개변수 event(event라는 이름은 임의로 붙인 것)는, app.js에서 부여한 이벤트리스너에서 들어온다.
  (특정 이벤트 발생시, 특정 함수가 리슨되는 것이다!)
  gameFieldElement를 누를 때('click'), 함수가 실행되면서 그 때 매개변수(여기서는 'event'라는 이름을 가진 값)도 들어오는 것이다. 
  gameFieldElement.addEventListener("click", selectGameField); */

  /* '게임 보드를 선택하는 방법 2 (게임 보드 li를 가져오는 방법 2)' 관련
  아래 if문은 '게임 보드를 선택하는 방법 2 (게임 보드 li를 가져오는 방법 2)'와 관련된 코드이다. 
  이에 대한 정보는 app.js에서 확인할 수 있다. 현재 방법 1을 사용중이어서 주석처리를 한 상태이다. 
  if (event.target.tagName !== "LI") {
    return;
  } 
 */

  if (gameIsOver) {
    /* 승자가 결정되면, 이후에는 게임 보드를 클릭해도 아무 일도 일어나지 않는다.
    (빈 게임 보드를 클릭해도 O나 X가 나타나지 않음) */
    return;
  }

  const selectedField = event.target;
  /* TAG: selectedField: 그냥 event.target을 할당한 변수다. */
  const selectedColumn = selectedField.dataset.col - 1;
  /* selectedColumn: data속성중, col이름을 가진 요소를 가리킨다. html파일의 게임 보드 구현 부분을 보면 확인 할 수 있다. */
  /* 배열에 들어갈 셀 것이기 때문에 -1을 했다. */
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    /* 해당 if문 목적: 한번 선택한 셀(O나 X가 그려지는 게임보드 필드)은 다시 선택할 수 없게 만들기. 
    그래서 이를 위해 선택되었는지 여부를 확인하는 if문이다. */
    alert("Please select an empty field!");
    return;
    /* return;: 여기서 return으로 끊어버리면 이후 코드는 진행되지 않는다. 
    그래서 필드를 중복 선택할 수 없게 하는 코드를 이 위치에 넣은 것이다. */
  }

  selectedField.textContent = players[activePlayer].symbol;
  /* TAG: selectedField.textContent = players[activePlayer].symbol;:
  players, activePlayer는 app.js에서 선언한 변수다. */
  selectedField.classList.add("disabled");
  /* selectedField.classList.add("disabled");: 
  1. event.target.classList.add("disabled");과 동일하다.
  2. 선택된 게임 보드(한번 누른 게임 보드)에는 disabled가 추가된다. */

  gameData[selectedRow][selectedColumn] = activePlayer + 1;
  /* +1을 덧붙인 이유: 
  activePlayer = 0은 플레이어가 없을 때 사용되기 때문에, 첫 번째 플레이어를 1로, 두 번째 플레이어를 2로 지정하고자 +1을 넣었다. */
  /* gameData: app.js에서 할당한 변수다. */
  /* gameData[selectedRow][selectedColumn];:
  1. 첫번째 []을 통해서는 어떤 행에 들어갈지를 결정하고, 두번째 []을 통해서는 어떤 열에 들어갈지를 결정한다.
  2. 참고: 
  row: 행(가로, 위에서 아래)
  column: 열(세로, 왼쪽에서 오른쪽)
  3. 해당 부분에 대한 강의는 Section14-317에 있다. */
  /* gameData[][] (배열을 이중으로 작성하는 이유 (각각의 대괄호를 통해 어디에 접근이 가능한지))
const gameData = [
  [0, 0, 0], // 1
  [0, 0, 0], // 2
  [0, 0, 0], // 3
];
위 예시로 설명하자면, 
1. 첫번째에 작성한 대괄호: 1, 2, 3에 접근을 가능하게 함
(여기 틱택토 프로젝트에서는 '행' 접근을 위해 쓰임)
2. 두번째에 작성한 대괄호: 1, 2, 3 내부에 있는 각각의 요소에 접근을 가능하게 함.
(여기 틱택토 프로젝트에서는 '열' 접근을 위해 쓰임) 
3. 결론
그래서 이 두 쌍의 대괄호들을 통해 얻고자 하는 것은,
첫번째 대괄호를 통해 두번째 대괄호에 접근하고, 또 두번째 대괄호를 통해 각각의 배열 요소에 대한 접근으로,
최종적으로 1, 2, 3 내부에 있는 각각의 요소에 접근하기 위함이다. */
  console.log(gameData, "gameData");

  const winnerId = checkForGameOver();
  console.log(winnerId, "winnerId");

  if (winnerId !== 0) {
    /* winnerId !== 0: winnerId가 0이 아닌 모든 경우. 여기서는 승자가 났을 때, 무승부가 났을 때를 가리킨다. */
    endGame(winnerId);
    /* 여기가 아래에 있는 endGame()에게 매개변수를 전달해주는 곳이다. 여기서 준 winnerId는 endGame에서 winnerIdValue라는 이름으로 사용된다.
    깔끔한 코드를 위해 endGame의 매개변수 이름도 winnerId로 통일하는 편이 좋지만, 연습을 위해 둘을 구분하고자 일부러 이름을 다르게 사용했다. 
    winnerIdValue라는 매개변수 이름만 강의와 다르다. 강의에서는 아래 endGame함수에서 매개변수로 winnerId를 사용했다. */
  }

  currentRound++;
  /* currentRound++;:
  1. currentRound는 app.js에서 할당한 변수이다. (let currentRound = 1)
  2. currentRound++;는 currentRound = currentRound + 1과 같은 의미이다.
  3. 다음 라운드로 갈 때마다(게임 보드를 클릭할 때마다) currentRound의 숫자가 1씩 더해진다. */
  switchPlayer();
}

function endGame(winnerIdValue) {
  /* ---------- WARNING! ----------
  winnerIdValue라는 매개변수 이름만 강의와 다르다. 강의에서는 endGame함수의 매개변수로 winnerId를 사용했다. */
  /* endGame의 매개변수에 있는 winnerIdValue는, 위에 있는 selectGameField()함수가 실행되면서 거기 안의 if문에서 받아오고 있다. */

  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerIdValue > 0) {
    /* winnerIdValue > 0는 승자가 있는 경우다.
    승부가 나지 않은 경우(게임이 계속되는 경우)에는 0을 반환하고, 무승부일 경우에는 -1을 반환하기 때문이다. */

    const winnerName = players[winnerIdValue - 1].name;
    /* winnerIdValue - 1: 배열의 항목에 접근하기 위해 -1을 넣었다. */
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
    /* 1. gameOverElement.firstElementChild;:
    html파일을 보면 gameOverElement(할당된 id는 'game-over'이다)의 첫번째 요소는 h2에 해당한다. 
    2. gameOverElement.firstElementChild.firstElementChild;: 
    gameOverElement의 첫번째 요소인, h2의 첫번째 요소를 가리킨다. 여기서는 span을 가리키고 있다. */
  } else {
    /* 승자가 나는 경우, 무승부가 나는 경우 외에 다른 경우는 없기 때문에 else 에서는 무승부일 경우를 반환하겠다. */
    gameOverElement.firstElementChild.textContent = "It's a draw!";
    /* "It\'s a draw!": \`가 의미하는 것은?(\를 '앞에 넣은 이유)
    '를 입력할 때, 자바스크립트는 문자열을 끝내기 위해 넣은 것이라고 인식할 수 있다. 그래서 '는 문자열을 끝내기 위해 넣은 것이 아니고, 단순히 문자열 안에 포함된 것임을 자바스크립트에게 알리고자 \를 '앞에 넣는 것이다. */
  }
}
