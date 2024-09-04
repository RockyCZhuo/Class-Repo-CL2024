let w = 420;
let h = 420;
const slots = [0, 0, 0, 0, 0, 0, 0, 0, 0];
const pawnXLoc = [
  w / 6,
  w / 2,
  (5 * w) / 6,
  w / 6,
  w / 2,
  (5 * w) / 6,
  w / 6,
  w / 2,
  (5 * w) / 6,
];
const pawnYLoc = [
  h / 6,
  h / 6,
  h / 6,
  h / 2,
  h / 2,
  h / 2,
  (5 * h) / 6,
  (5 * h) / 6,
  (5 * h) / 6,
];
let isCircle = true;
let hasWinnerLine = false;

function setup() {
  var canvas = createCanvas(w, h);
  //only when mouse is within board area, check mouse position when mouse released
  canvas.mouseReleased(checkSlot);
  drawBoard();
  drawPawn();
}

function draw() {}

function drawBoard() {
  background(220);
  line(0, h / 3, w, h / 3);
  line(0, (2 * h) / 3, w, (2 * h) / 3);
  line(w / 3, 0, w / 3, h);
  line((2 * w) / 3, 0, (2 * w) / 3, h);
  //console.log(slots);
}

function drawPawn() {
  let circleX, circleY;
  for (let i = 0; i < 9; i++) {
    let tempPawn = slots[i];
    switch (slots[i]) {
      case 0:
        //console.log("draw nothing on " + i);
        break;
      case 1:
        //circle draw when 1 appears
        circle(pawnXLoc[i], pawnYLoc[i], w / 3);
        break;
      case 2:
        // cross draw when 2 appears
        line(
          pawnXLoc[i] - w / 6,
          pawnYLoc[i] - h / 6,
          pawnXLoc[i] + w / 6,
          pawnYLoc[i] + h / 6
        );
        line(
          pawnXLoc[i] - w / 6,
          pawnYLoc[i] + h / 6,
          pawnXLoc[i] + w / 6,
          pawnYLoc[i] - h / 6
        );
        break;
      default:
      //console.log(`nothing is recorded on this slot`);
    }
  }
}

function highlightSlot() {}

function checkSlot() {
  let row, col, targetSlot;
  if (mouseX < w / 3) {
    col = 0;
  } else if (mouseX < (2 * w) / 3) {
    col = 1;
  } else {
    col = 2;
  }
  if (mouseY < h / 3) {
    row = 0;
  } else if (mouseY < (2 * h) / 3) {
    row = 1;
  } else {
    row = 2;
  }
  //calculate slots number based on mouseX and mouseY,
  targetSlot = row * 3 + col;
  if (slots[targetSlot] == 0) {
    //slot can be placed a new pawn
    if (isCircle == true) {
      slots[targetSlot] = 1;
    } else {
      slots[targetSlot] = 2;
    }
    drawBoard();
    drawPawn();
    if (hasWinnerLine == false) {
      checkResult(isCircle);
    }
    //circle and cross take turn
    isCircle = !isCircle;
  }
}

function checkResult(pawnIsCircle) {
  //list all possibilities
  if (slots[0] == slots[1] && slots[2] == slots[1] && slots[0] != 0) {
    //first row
    hasWinnerLine = true;
  } else if (slots[3] == slots[4] && slots[4] == slots[5] && slots[5] != 0) {
    //second row
    hasWinnerLine = true;
  } else if (slots[6] == slots[7] && slots[6] == slots[8] && slots[8] != 0) {
    //third row
    hasWinnerLine = true;
  } else if (slots[0] == slots[3] && slots[3] == slots[6] && slots[6] != 0) {
    //first column
    hasWinnerLine = true;
  } else if (slots[4] == slots[1] && slots[7] == slots[1] && slots[1] != 0) {
    //second column
    hasWinnerLine = true;
  } else if (slots[2] == slots[5] && slots[2] == slots[8] && slots[2] != 0) {
    //third column
    hasWinnerLine = true;
  } else if (slots[0] == slots[4] && slots[0] == slots[8] && slots[0] != 0) {
    //right corner dia
    hasWinnerLine = true;
  } else if (slots[2] == slots[4] && slots[2] == slots[6] && slots[2] != 0) {
    //left corner dia
    hasWinnerLine = true;
  } else if (slots.includes(0) == false) {
    //Tie!!!
    console.log("Tie!");
        restartGame();

  }
  if (hasWinnerLine) {
    if (pawnIsCircle) {
      console.log("Circle wins!");
    } else {
      console.log("Cross wins!");
    }
    restartGame();
  }
}

function restartGame() {
  hasWinnerLine = false;
  for (let k = 0;k<9;k++){
    slots[k] = 0;
    
  }
  drawBoard();
  drawPawn();
}
