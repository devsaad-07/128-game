"use strict";

const gridDisplay = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
const newGame = document.querySelector(".new-game");
const bestScoreDisplay = document.getElementById("best-score");
let gameWon = false;

let gameOver = 0;

let squares = [];
const width = 3;
let gridArray1 = [],
  gridArray2 = [];
let score = 0,
  bestScore = 0;

const generate = function () {
  let randomNumber = Math.floor(Math.random() * squares.length);
  let numberChoice = Math.floor(Math.random() * 2);
  if (squares[randomNumber].innerHTML == 0)
    squares[randomNumber].innerHTML = numberChoice === 0 ? 2 : 4;
  else generate();
};

const isGameOver = function () {
  gridArray1 = [];
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = 0; j < width; j++) {
      cells.push(parseInt(squares[width * i + j].innerHTML));
    }
    gridArray1.push(cells);
  }

  for (let i = 0; i < gridArray1.length; i++) {
    for (let j = 0; j < gridArray1[i].length; j++) {
      if (
        (i < width - 1 && gridArray1[i][j] === gridArray1[i + 1][j]) ||
        gridArray1[i][j] === 0 ||
        (j < width - 1 && gridArray1[i][j] === gridArray1[i][j + 1])
      ) {
        return false;
      }
    }
  }
  bestScoreDisplay.textContent = bestScore;
  gameOver = 1;
  return true;
};

const computeUpdatedGrid = function (cells) {
  let count = 0;
  for (let i = width - 1; i >= 0; i--) {
    if (cells[i] !== 0) {
      let temp = cells[i];
      cells[i] = cells[width - 1 - count];
      cells[width - 1 - count] = temp;
      count++;
    }
  }
  let res = [];
  for (let i = width - 1; i >= 0; i--) {
    if (i == 0) {
      res.push(cells[i]);
      continue;
    }
    if (cells[i] === cells[i - 1]) {
      res.push((cells[i] *= 2));
      if (cells[i] === 128) {
        gameWon = true;
      }
      score += cells[i];
      if (score > bestScore) {
        bestScore = score;
      }
      i--;
    } else {
      res.push(cells[i]);
    }
  }
  cells = [];
  for (let i = res.length - 1; i >= 0; i--) {
    cells.push(res[i]);
  }
  for (let i = width - cells.length; i > 0; i--) {
    cells.unshift(0);
  }
  return cells;
};

const updateBoard = function (
  rowGrid,
  columnGrid,
  rowUpdatedGrid,
  columnUpdatedGrid
) {
  squares[width * rowGrid + columnGrid].innerHTML =
    gridArray2[rowUpdatedGrid][columnUpdatedGrid];
};

const helper = function () {
  for (let i = 0; i < gridArray1.length; i++) {
    let temp = [];
    for (let j = 0; j < gridArray1[i].length; j++) {
      temp.push(gridArray1[i][j]);
    }
    temp = computeUpdatedGrid(temp);
    scoreDisplay.textContent = score;
    gridArray2.push(temp);
  }
  if (JSON.stringify(gridArray2) === JSON.stringify(gridArray1)) {
    return false;
  }
  return true;
};

const moveRight = function () {
  (gridArray1 = []), (gridArray2 = []);
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = 0; j < width; j++) {
      cells.push(parseInt(squares[width * i + j].innerHTML));
    }
    gridArray1.push(cells);
  }
  if (helper(gridArray1, gridArray2)) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        updateBoard(i, j, i, j, gridArray2);
      }
    }
    generate();
  }
};

const moveLeft = function () {
  (gridArray1 = []), (gridArray2 = []);
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = width - 1; j >= 0; j--) {
      cells.push(parseInt(squares[width * i + j].innerHTML));
    }
    gridArray1.push(cells);
  }
  if (helper(gridArray1, gridArray2)) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        updateBoard(i, j, i, width - 1 - j, gridArray2);
      }
    }
    generate();
  }
};

const moveUp = function () {
  (gridArray1 = []), (gridArray2 = []);
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = width - 1; j >= 0; j--) {
      cells.push(parseInt(squares[width * j + i].innerHTML));
    }
    gridArray1.push(cells);
  }
  if (helper(gridArray1, gridArray2)) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        updateBoard(j, i, i, width - 1 - j, gridArray2);
      }
    }
    generate();
  }
};

const moveDown = function () {
  (gridArray1 = []), (gridArray2 = []);
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = 0; j < width; j++) {
      cells.push(parseInt(squares[width * j + i].innerHTML));
    }
    gridArray1.push(cells);
  }
  if (helper(gridArray1, gridArray2)) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < width; j++) {
        updateBoard(j, i, i, j, gridArray2);
      }
    }
    generate();
  }
};

document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      if (!gameOver || !gameWon) {
        moveUp();
        if (isGameOver()) {
          alert("Game Over!");
        }
        if (gameWon) {
          alert("Game Lost");
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!gameOver || !gameWon) {
        moveDown();
        if (isGameOver()) {
          alert("Game Over!");
        }
        if (gameWon) {
          alert("Game Lost");
        }
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      if (!gameOver || !gameWon) {
        moveRight();
        if (isGameOver()) {
          alert("Game Over!");
        }
        if (gameWon) {
          alert("Game Lost");
        }
      }
      break;
    case "ArrowLeft":
      e.preventDefault();
      if (!gameOver || !gameWon) {
        moveLeft();
        if (isGameOver()) {
          alert("Game Over!");
        }
        if (gameWon) {
          alert("Game Lost");
        }
      }
      break;
  }
});

newGame.addEventListener("click", function () {
  gameOver = 0;
  gameWon = false;
  score = 0;
  scoreDisplay.textContent = 0;
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = 0;
  }
  generate();
  generate();
});

const createBoard = function () {
  for (let i = 0; i < width; i++) {
    let row = document.createElement("div");
    row.classList.add("grid-row");
    for (let j = 0; j < width; j++) {
      let square = document.createElement("div");
      square.classList.add("grid-square");
      square.innerHTML = 0;
      row.appendChild(square);
      squares.push(square);
    }
    gridDisplay.appendChild(row);
  }
  generate();
  generate();
};

createBoard();
