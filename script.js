"use strict";

const gridDisplay = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");
let squares = [];
const width = 3;

const generate = function () {
  let randomNumber = Math.floor(Math.random() * squares.length);
  if (squares[randomNumber].innerHTML == 0) squares[randomNumber].innerHTML = 2;
  else generate();
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
  columnUpdatedGrid,
  gridArray2
) {
  squares[width * rowGrid + columnGrid].innerHTML =
    gridArray2[rowUpdatedGrid][columnUpdatedGrid];
};

const moveRight = function () {
  let gridArray1 = [],
    gridArray2 = [];
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = 0; j < width; j++) {
      cells.push(parseInt(squares[width * i + j].innerHTML));
    }
    gridArray1.push(cells);
    let temp = [];
    for (let j = 0; j < cells.length; j++) {
      temp.push(cells[j]);
    }
    temp = computeUpdatedGrid(temp);
    gridArray2.push(temp);
  }

  if (JSON.stringify(gridArray2) === JSON.stringify(gridArray1)) {
    //console.log("return");
    return;
  }
  //console.log("no return", gridArray1, gridArray2);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //squares[width * i + j].innerHTML = gridArray2[i][j];
      updateBoard(i, j, i, j, gridArray2);
    }
  }
  generate();
};

const moveLeft = function () {
  let gridArray1 = [],
    gridArray2 = [];
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = width - 1; j >= 0; j--) {
      cells.push(parseInt(squares[width * i + j].innerHTML));
    }
    gridArray1.push(cells);
    let temp = [];
    for (let j = 0; j < cells.length; j++) {
      temp.push(cells[j]);
    }
    temp = computeUpdatedGrid(temp);
    gridArray2.push(temp);
  }
  if (JSON.stringify(gridArray2) === JSON.stringify(gridArray1)) {
    //console.log("return");
    return;
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //squares[width * i + j].innerHTML = gridArray2[i][width-1-j];
      updateBoard(i, j, i, width - 1 - j, gridArray2);
    }
  }
  generate();
};

const moveUp = function () {
  let gridArray1 = [],
    gridArray2 = [];
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = width - 1; j >= 0; j--) {
      cells.push(parseInt(squares[width * j + i].innerHTML));
    }
    gridArray1.push(cells);
    let temp = [];
    for (let j = 0; j < cells.length; j++) {
      temp.push(cells[j]);
    }
    temp = computeUpdatedGrid(temp);
    gridArray2.push(temp);
  }
  if (JSON.stringify(gridArray2) === JSON.stringify(gridArray1)) {
    //console.log("return");
    return;
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //squares[width * j + i].innerHTML = gridArray2[width-1-j][i];
      updateBoard(j, i, i, width - 1 - j, gridArray2);
    }
  }
  generate();
};

const moveDown = function () {
  let gridArray1 = [],
    gridArray2 = [];
  for (let i = 0; i < width; i++) {
    let cells = [];
    for (let j = 0; j < width; j++) {
      cells.push(parseInt(squares[width * j + i].innerHTML));
    }
    gridArray1.push(cells);
    let temp = [];
    for (let j = 0; j < cells.length; j++) {
      temp.push(cells[j]);
    }
    temp = computeUpdatedGrid(temp);
    gridArray2.push(temp);
  }
  if (JSON.stringify(gridArray2) === JSON.stringify(gridArray1)) {
    //console.log("return");
    return;
  }
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //squares[width * j + i].innerHTML = gridArray2[i][j];
      updateBoard(j, i, i, j, gridArray2);
    }
  }
  generate();
};

document.addEventListener("keydown", function (e) {
  //console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      console.log("right");
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
  }
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
