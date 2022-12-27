/* config.js의 담당 역할: 실제 구동되는 로직 담당 */

function openPlayerConfig(event) {
  // TAG: openPlayerConfig(): 모달을 여는 함수 ('Edit'버튼에 할당)
  editedPlayer = +event.target.dataset.playerid;
  /* editedPlayer는 app에서 할당한 변수다. 
  (config.js에서 바로 할당하면서 더 이상 해당되지 않음) */
  /* ---------- WARNING! 2번 완전 잘못됨 (추후 다시 볼 것) ----------
  1과 2는 같은 의미다.
  1. editedPlayer = +event.target.dataset.playerid;
  2.
  let selectedPlayer = 0;
  const editedPlayer = +event.target.dataset.playerid;
  editedPlayer = selectedPlayer */
  /* +가 의미하는 것:
  1. 맨 앞에 +를 붙임으로써 문자열이 숫자로 바뀌었다.
  html에 있는 data속성의 키값은 오직 문자열로만 들어오기 때문에, +를 통해 숫자로 변형시켰다. 값 유형을 간단히 변경시킨 경우다.
  2. +'1'은 1이 됨(문자열 "1"로 들어오는 값이 숫자 1이 되었다). 
  3. 예시 (3-1, 3-2)
  3-1
  const abc = '15'
  console.log(typeof abc); // string반환
  3-2. 
  const abc = +'15';
  console.log(typeof abc); // number반환 */
  /* dataset속성:
  html파일에 있는 data 속성(=data- 형태)들을 가져온다. 
  1. const selectedPlaterId = event.target.dataset;:
  event.target에 있는 모든 data 속성을 가져옴
  2. const selectedPlaterId = event.target.dataset.playerid;:
  event.target에 있는 것들 중, playerid라는 이름을 가진 data만 가져옴. */
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  // TAG: closePlayerConfig(): 열린 모달에서 모달을 닫는 함수 ('Cancel'버튼에 할당)
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  /* TAG: formElement.firstElementChild.classList.remove("error");:
  기존에 있는 class 중, 'error'라는 이름의 class를 제거한다. */
  /* formElement는 app.js에서 선언한 상수다. */
  errorOutputElement.textContent = "";
  /* TAG: errorOutputElement.textContent = "";:
  모달이 닫힌 후 다시 열었을 때, 에러 메세지를 초기화(에러메세지가 보이지 않게) 하려고 추가했다. */
  formElement.firstElementChild.lastElementChild.value = "";
  /* formElement.firstElementChild.lastElementChild.value = "";:
  이런 작성 방식이 좋은 건 아니다. 왜냐하면 요소가 추가적으로 뒤에 붙거나 할 수 있기 때문이다. 
  그러나 연습을 위해 이러한 방식을 쓴다. */
  /* firstElementChild: css속성자 중, :first-child와 같은 의미 */
  /* lastElementChild: css속성자 중, :last-child와 같은 의미 */
}

function savePlayerConfig(event) {
  // TAG: savePlayerConfig(): 열린 모달에서 바뀐 Player name양식이 제출되면 실행되는 함수 ('Confirm'버튼에 할당)
  event.preventDefault();
  /* preventDefault()메서드: 이벤트 실행을 막는 메서드. 
  여기에서는 이벤트 발생으로(모달창을 닫을 때마다 이벤트가 발생함) 인해 화면이 리로드되는 것을 막고자 쓰였다. */
  const formData = new FormData(event.target);
  /* FormData(): 
  (https://developer.mozilla.org/ko/docs/Web/API/FormData, https://ko.javascript.info/formdata)
  자바스크립트 내장 함수. 특정한 양식을 가진 객체를 생성한다.
  쉽게 말해 자바스크립트에 내장된 일종의 양식서이다. 
  FormData()의 파라미터에는 HTMLFormElement가 와야 한다. ()(소괄호) 안에는 HTMLFormElement만 올 수 있다는 말이다. */
  /* new FormData(event.target);: 
  콘솔 로그로 event.target을 보면 form태그인 것을 알 수 있다. */
  const enteredPlayername = formData.get("playername").trim();
  console.log(formData.get("playername"), "플레이어이름");
  /* TAG: const enteredPlayername = formData.get("playername").trim();: 모달창에 있는 인풋값(인풋 내용) 가져오기 */
  /* .get()메서드: 
  (https://developer.mozilla.org/ko/docs/Web/API/FormData/get, https://ko.javascript.info/formdata)
  formData.get()의 형태. formData에 내장된 인터페이스이다. ()(소괄호)에 들어간 이름을 가진 요소의, 값(중요!)을 얻을 수 있다(가져 올 수 있다). 
  formData.get()이 인식하는 대상은 formData안에서 name=""을 가진 요소이며, 여러 개일 경우 그 중 첫 번째로 위치한 것에 해당한다. 
  .get()에서 ()안에 있는 것과 name=""값이 일치할 경우에 적용된다. */
  /* formData.get("playername");: 
  formData에 있는 요소 중, playername이라는 이름을 가진 요소의 값을 가져온다. 
  html파일을 보면 <input type="text" name="playername" id="playername" required />에서 name="playername"에 해당된다. label, id에 있는 것과는 관련이 없다. 
  그러면 playername을 가진 input의 값(value)를 가져오는 것이다. */
  /* trim()메서드: 문자열의 맨앞, 맨뒤의 공백을 없애주는 메서드. 
  아무 문자 작성 없이 띄어쓰기만 넣으면, 그 여백도 없애준다(빈 스트링으로 처리해준다). */

  if (!enteredPlayername) {
    /* TAG: 해당 if문은 만약 enteredPlayername이 빈 값이면(빈 스트링을 반환했을 때), 
    error라는 클래스를 추가하고 에러 메시지 출력하기 위해 넣었다. */
    // !enteredPlayername는 enteredPlayername === ''와 같은 의미이다. 둘 다 falsy값이다. (빈 스트링은 falsy값이다.)
    event.target.firstElementChild.classList.add("error");
    /* event.target.firstElementChild.classList.add("error");:
    = formElement.firstElementChild.classList.add("error");와 같은 결과를 갖는다. 
    formElement는 app.js에서 선언한 상수다.
    여기서 event.target과 formElement 둘 모두는 form요소(<form>태그)를 가리킨다. */
    /* firstElementChild:
    특정 양식의 첫 번째 자식 요소(특정 양식의 첫 번째 html요소). css선택자인 :first-child와 유사한 역할(한마디로 html 버전의 :first-child). 
    event.target.firstElementChild;는 특정 양식(event.target) 에 있는 첫번째 자식 요소를 의미한다. html문서에 가면 확인할 수 있듯이 여기서는 div를 가리킨다. form태그 안에 있는 div태그를 가리킴. */
    /* 자바 스크립트를 통해 class를 생성하는 방법 2가지 
    (두 방법 모두 기존 class를 유지하면서(건드리지 않으면서), 새로운 class를 추가 생성하는 방법이다.)
    1. className으로 추가
    event.target.firstElementChild.className = "error";:
    기존에 있는 class는 유지하면서, 새롭게 'error'라는 이름의 class를 추가 할당했다. 
    2. classList.add로 추가
    event.target.firstElementChild.classList.add("error"):
    기존에 있는 class는 유지하면서, 새롭게 'error'라는 이름의 class를 추가 할당했다. */
    errorOutputElement.textContent = "Please enter a valid name!";
    return;
    /* return을 입력함으로써 return 이후의 실행을 멈춘다.
    이 return 덕분에, return 다음의 코드가 실행되는 것을 막을 수 있다. 
    먄약 이 return이 없다면 if문에 작성한 조건(!enteredPlayername)에 해당되더라도, 
    아래 작성한 closePlayerConfig()함수 때문에 if문 결과(error클래스, 에러메시지)를 보기도 전에 창이 닫힐 것이다. */
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  /* TAG: updatedPlayerDataElement: 모달창 열은 후, Confirm버튼을 눌렀을 때 들어오는 값이다. */
  /* editedPlayer: 
  1. 위쪽 openPlayerConfig()함수에서 선언한 editedPlayer = +event.target.dataset.playerid;를 의미한다. 
  2. editedPlayer로 1이나 2가 들어올 것이므로, "player-1-data"이나 "player-2-data"라는 이름의 id가 들어오는 것과 같은 결과를 갖게 된다. */
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;
  /* TAG: updatedPlayerDataElement.children[1].textContent = enteredPlayername;:
  모달창에서 입력한 PLAYER NAME을, 메인 화면에서도 같은 이름으로 나타나게 함. */
  /* updatedPlayerDataElement.children[1];:
  updatedPlayerDataElement의 두 번째 자식요소를 가리킨다. html파일에 들어가 확인할 수 있는데, 여기서는 h3태그를 의미한다(article태그의 두 번째 자식 요소는 h3태그다. <h3>PLAYER NAME</h3>). */
  /* children 속성: (https://developer.mozilla.org/ko/docs/Web/API/Node/appendChild)
  .children[]형태.
  특정 요소가 가진, 자식 요소를 배열을 통해 가져온다. 
  주의할 점 1. 특정요소의 '자식 요소'에만 접근 가능하다. 자식요소의 자식요소(손자(?))에는 접근 할 수 없다. 
  주의할 점 2. 배열을 통해 접근하지만, 배열 형식으로 가져오는 것은 아니다. typeof로 확인해보니 object가 나왔다. 
  ---------- WARNING! 주의할 점2 부분이 확인할 필요가 있다면 나중에 다시 확인해보자 ---------- */

  players[editedPlayer - 1].name = enteredPlayername;
  /* TAG: players[editedPlayer - 1].name = enteredPlayername;:
  모달을 통해 변경한 이름을, 상수 players(app.js에서 선언함)에 있는 name에도 같은 이름이 들어가게 한다. */
  /* players[editedPlayer - 1].name = enteredPlayername;:
  1. players는 app.js에서 선언한 상수다.
  3-1. editedPlayer는 위쪽 openPlayerConfig()함수에서 저장한 값이다.
  3-2. 배열의 인덱스는 0에서 부터 시작하므로, 첫 번째와 두 번째를 가리키기 위해서는 editPlayer에서 -1을 한 것이다.
  (editPlayer의 값으로 1과 2가 들어온다. 1은 Player1(첫 번째 플레이어)의 값이고, 2는 Player2(두 번째 플레이어)의 값이다.) */
  /* players[editedPlayer - 1].name = enteredPlayername;는 아래 2번에 있는 if문과 동일한 의미이다.
  1. 아래 if문을 설명하자면: 만약 editedPlayer가 1이라면  players의 첫 번째에 있는 name에 enteredPlayername를 넣고,
  만약 editedPlayer가 1이외의 경우라면 players의 두 번째에 있는 name에 enteredPlayername를 넣으라는 거다. 
  2.
  if (editedPlayer === 1) {
    players[0].name = enteredPlayername;
  } else {
    players[1].name = enteredPlayername;
  } */

  closePlayerConfig();
}
