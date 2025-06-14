// js/actions.js

const actions = []; // 描画操作の履歴を保存する配列

function drawArrow(ctx, fromX, fromY, toX, toY, color, lineWidth) {
  const headLength = 10; // length of head in pixels
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke(); // Draw the line part

  // Draw the arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.stroke();
}

function redrawAllActions() {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height); // まずキャンバスをクリア
  actions.forEach(action => {
    if (action.type === 'line') {
      drawCtx.strokeStyle = action.color;
      drawCtx.lineWidth = action.lineWidth;
      drawCtx.beginPath();
      drawCtx.moveTo(action.startX, action.startY);
      drawCtx.lineTo(action.endX, action.endY);
      drawCtx.stroke();
    } else if (action.type === 'item_icon') {
      const img = new Image();
      img.src = action.src;
      img.onload = () => {
        drawCtx.drawImage(img, action.x, action.y, action.width, action.height);
      };
      img.onerror = () => {
        console.error(`アイコン再描画エラー: ${action.src}`);
        drawCtx.strokeRect(action.x, action.y, action.width, action.height);
      };
    } else if (action.type === 'inkStroke') {
      action.points.forEach(point => {
        drawCtx.beginPath();
        drawCtx.arc(point.x, point.y, action.radius, 0, Math.PI * 2);
        drawCtx.fillStyle = action.color;
        drawCtx.globalAlpha = 0.2;  // 透明度を20%に設定
        drawCtx.fill();
        drawCtx.globalAlpha = 1.0;   // 他の描画のためにアルファをデフォルトに戻す
      });
    } else if (action.type === 'arrow') {
      drawArrow(drawCtx, action.startX, action.startY, action.endX, action.endY, action.color, action.lineWidth);
    }
  });
}

function undoLastAction() {
  if (actions.length > 0) {
    actions.pop();
    redrawAllActions();
  }
}

function clearCanvas() {
  drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
  actions.length = 0; // アクション履歴もクリア
}
