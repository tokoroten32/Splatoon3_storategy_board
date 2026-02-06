// js/drawing.js

let isDrawing = false;
let startX = 0, startY = 0;

function setDrawMode(buttonElement) {
  mode = 'draw';
  selectedItemToPlace = null;
  selectedInkColor = null;
  isDrawingInk = false;

  clearAllButtonHighlights();
  if (buttonElement) {
    buttonElement.style.border = "2px solid cyan";
  }
}

function setArrowMode(buttonElement) {
  mode = 'arrow';
  selectedItemToPlace = null;
  selectedInkColor = null;
  isDrawingInk = false; // Ensure other drawing modes are off
  isDrawing = false;    // Ensure line drawing mode is reset before starting arrow

  clearAllButtonHighlights();
  if (buttonElement) {
    buttonElement.style.border = "2px solid yellow"; // Or another distinct color
  }
}

function setSelectMode(buttonElement) {
  mode = 'select';
  selectedItemToPlace = null;
  selectedInkColor = null;
  isDrawingInk = false;
  isDrawing = false;

  clearAllButtonHighlights();
  if (buttonElement) {
    buttonElement.style.border = "2px solid #00FF00";
  }
}

// Mouse event logic for drawing lines will be in main.js, calling these variables/functions
// mousedown: set isDrawing = true, startX, startY
// mousemove: (optional preview)
// mouseup: draw line, push action, set isDrawing = false
