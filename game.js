const chessGame = document.querySelector("#chessgame");

const playerDisplay = document.querySelector("#player");

const infoDisplay = document.querySelector("#info-display");

const width = 8;

let playerTurn = "blue";
playerDisplay.textContent = "Blue Player";

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];

function createBoard() {
  startPieces.forEach((startPieces, a) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPieces;
    square.setAttribute("square-id", a);
    square.firstChild && square.firstChild.setAttribute("draggable", true);
    // square.classList.add("yellow");
    const row = Math.floor((63 - a) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(a % 2 === 0 ? "yellow" : "green");
    } else {
      square.classList.add(a % 2 === 0 ? "green" : "yellow");
    }

    if (a <= 15) {
      square.firstChild.firstChild.classList.add("blue");
    } else if (a >= 48) {
      square.firstChild.firstChild.classList.add("red");
    }

    chessGame.append(square);
  });
}

createBoard();

const allSquares = document.querySelectorAll(".square");

// console.log(allSquares);

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}

function dragOver(e) {
  e.preventDefault();
  // console.log(e.target);
}

function changePlayer() {
  if (playerTurn === "Blue Player") {
    reverseIds();
    playerTurn = "Red Player";
    playerDisplay.textContent = "Red Player";
  } else {
    revertIds();
    playerTurn = "Blue Player";
    playerDisplay.textContent = "Blue Player";
  }
}

function dragDrop(e) {
  e.stopPropagation();

  // console.log("playerTurn", playerTurn);

  // console.log(draggedElement);
  const taken = e.target.classList.contains("piece");
  // console.log("e.target", e.target);

  const valid = checkIfValid(e.target);

  const correctTrun = draggedElement.firstChild.classList.contains(playerTurn);

  const otherPlayer = playerTurn === "blue" ? "red" : "blue";

  // console.log("otherPlayer", otherPlayer);
  const takenBack = e.target.firstChild?.classList.contains(otherPlayer);

  //
  if (correctTrun) {
    if (takenBack && valid) {
      // e.target.append(draggedElement);
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }
    // then check
    if (taken && !takenBack) {
      infoDisplay.textContent = "Invalid Move";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      changePlayer();
      return;
    }
  }

  // changePlayer();
}

function checkIfValid(target) {
  // console.log(target);
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));

  const startId = Number(startPositionId);

  const piece = draggedElement.id;

  console.log("targetId", targetId);
  console.log("startId", startId);
  console.log("piece", piece);
  // console.log(targetId);

  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];

      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild)
      ) {
        return true;
      }
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, a) =>
    square.setAttribute("square-id", width * width - 1 - a)
  );
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, a) => square.setAttribute("square-id", a));
}
