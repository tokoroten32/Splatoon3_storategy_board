// js/canvas.js

const bgCanvas = document.getElementById('bgCanvas');
const drawCanvas = document.getElementById('drawCanvas');
const bgCtx = bgCanvas.getContext('2d');
const drawCtx = drawCanvas.getContext('2d');

function resizeCanvases() {
  const canvasContainer = document.getElementById('canvasContainer');
  // Ensure canvasContainer is found and has dimensions
  if (canvasContainer) {
    const containerWidth = canvasContainer.offsetWidth;
    const containerHeight = canvasContainer.offsetHeight;

    bgCanvas.width = containerWidth;
    bgCanvas.height = containerHeight;
    drawCanvas.width = containerWidth;
    drawCanvas.height = containerHeight;
  } else {
    console.error("#canvasContainer not found for resizing.");
  }
}

function drawBackground() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height); // まずキャンバスをクリア

  const mapInfo = MAP_DATA[selectedMapKey];
  if (!mapInfo) {
    console.error(`Map data not found for key: ${selectedMapKey}`);
    bgCtx.fillStyle = '#555'; // デフォルト背景色
    bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgCtx.font = "16px sans-serif";
    bgCtx.fillStyle = "white";
    bgCtx.fillText(`Map data for "${selectedMapKey}" not found.`, 10, 30);
    return;
  }

  const ruleInfo = RULE_DATA[selectedRuleKey];
  const ruleName = ruleInfo ? ruleInfo.displayName : selectedRuleKey;
  const mapName = mapInfo.displayName;

  // フォルダの命名規則に従ってパスを生成
  // map-rule/画像（[rule]）-ブキ射程表あり/（[rule]）[map_name]
  const mapImagePath = `./map-rule/画像（${ruleName}）-ブキ射程表あり/（${ruleName}）${mapName}.jpg`;

  if (mapImagePath) {
    const img = new Image();
    img.src = mapImagePath;
    img.onload = () => {
      const canvasWidth = bgCanvas.width;
      const canvasHeight = bgCanvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // アスペクト比を計算
      const canvasAspect = canvasWidth / canvasHeight;
      const imgAspect = imgWidth / imgHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) { // 画像がキャンバスより横長
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imgAspect;
      } else { // 画像がキャンバスより縦長または同じ比率
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imgAspect;
      }
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = (canvasHeight - drawHeight) / 2;

      bgCtx.fillStyle = '#222'; // 背景色で余白を埋める (drawImageの前に)
      bgCtx.fillRect(0, 0, canvasWidth, canvasHeight);
      bgCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };
    img.onerror = () => {
      console.error(`背景画像の読み込み失敗: ${mapImagePath}`);
      bgCtx.fillStyle = '#555'; // エラー時背景色
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
      bgCtx.font = "16px sans-serif";
      bgCtx.fillStyle = "white";
      bgCtx.fillText(`Error loading map: ${mapImagePath}`, 10, 30);
    };
  }
}
