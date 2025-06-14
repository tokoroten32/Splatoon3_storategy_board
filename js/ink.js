// js/ink.js

let selectedInkColor = null;
let isDrawingInk = false;
const INK_RADIUS = 15;
let currentInkStrokePoints = []; // 現在描画中のインクストロークの点を保持

function setInkMode(color, buttonElement) {
  mode = 'ink';
  selectedInkColor = color;
  selectedItemToPlace = null;
  isDrawing = false;
  isDrawingInk = false; // これから描画開始するので一旦false

  clearAllButtonHighlights();
  if (buttonElement) {
    buttonElement.style.border = "2px solid " + (color === 'orange' ? 'darkorange' : 'dodgerblue');
  }
}

function drawInk(x, y, color, radius) {
  drawCtx.beginPath();
  drawCtx.arc(x, y, radius, 0, Math.PI * 2);
  drawCtx.fillStyle = color;
  drawCtx.globalAlpha = 0.2; // 半透明にする
  drawCtx.fill();
  drawCtx.globalAlpha = 1.0; // 他の描画のためにアルファをデフォルトに戻す
}

// Mouse event logic for ink drawing will be in main.js, calling these variables/functions
// mousedown: set isDrawingInk = true, initialize currentInkStrokePoints, draw first point
// mousemove: if isDrawingInk, add point to currentInkStrokePoints, draw point
// mouseup: if isDrawingInk, set isDrawingInk = false, push inkStroke action if points exist
