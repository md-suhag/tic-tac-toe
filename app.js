let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // playerX, player0
let count = 0;
let winner = false;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  winner = false;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.classList.remove("hide");
  boxes.forEach((box) => (box.style.backgroundColor = ""));
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.style.color = "red";
      box.innerText = "\u2764\uFE0F";
      turnO = false;
    } else {
      box.style.color = "green";
      box.innerText = "\u274C";
      turnO = true;
    }

    box.disabled = true;
    count += 1;
    checkWinner();
    if (count === 9 && !winner) {
      showWinner(null);
    } else {
      audioPlay();
    }
  });
});
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};
const showWinner = (winnerText) => {
  audioPlay(winnerText);
  msg.innerText =
    count === 9 && !winner
      ? "Alas! Game drawn"
      : `Congratulations, Winner is ${winnerText}`;
  msgContainer.classList.remove("hide");
  resetBtn.classList.add("hide");
  disableBoxes();
  count === 9 && !winner
    ? (msgContainer.style.backgroundColor = "red")
    : (msgContainer.style.backgroundColor = "green");
  setTimeout(() => {
    msgContainer.style.backgroundColor = "";
  }, 500);
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        winner = true;
        showWinner(pos1Val);
        let winboxes = [
          boxes[pattern[0]],
          boxes[pattern[1]],
          boxes[pattern[2]],
        ];
        winboxes.forEach((box) => (box.style.backgroundColor = "yellow"));
        return;
      }
    }
  }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const audioPlay = (winnerText) => {
  let audio;
  if (winnerText) {
    audio = new Audio("audio/success.wav");
  } else if (count === 9 && !winner) {
    audio = new Audio("audio/fail.wav");
  } else {
    audio = new Audio("audio/drop-of-water.mp3");
  }
  audio.play();
};
