// js/items.js

let selectedItemToPlace = null; // { type: 'main' | 'sub', data: object }

function displayWeaponButtons(categoryKey, container) {
  container.innerHTML = ''; // 既存のボタンをクリア
  // selectedItemToPlace = null; // カテゴリ変更時に選択をリセットするならここだが、サブ選択は維持したい場合もある
  // mode = 'draw'; // 必要に応じて描画モードに戻す

  if (!categoryKey || !WEAPON_DATA[categoryKey] || !WEAPON_DATA[categoryKey].weapons) {
    return; // カテゴリが選択されていないか、データがない場合は何もしない
  }

  const weapons = WEAPON_DATA[categoryKey].weapons;
  weapons.forEach(weapon => {
    const button = document.createElement('button');
    button.style.background = 'transparent';
    button.style.border = '1px solid #777'; // 少し濃いめのボーダー
    // button.style.padding = '2px'; // HTML/CSS側で制御するため削除またはコメントアウト
    button.style.margin = '2px';
    button.style.cursor = 'pointer';
    button.title = weapon.name;

    const img = new Image();
    img.src = weapon.src;
    img.alt = weapon.name;
    img.style.width = `${weapon.width}px`;
    img.style.height = `${weapon.height}px`;
    img.style.display = 'block';

    button.appendChild(img);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = weapon.name;
    nameSpan.style.marginLeft = '8px'; // Space between icon and name
    nameSpan.style.fontSize = '11px'; // Smaller font for fitting
    nameSpan.style.color = 'white';   // Ensure text is visible
    nameSpan.style.whiteSpace = 'nowrap'; // Prevent name from wrapping
    button.appendChild(nameSpan);

    // Adjust button styles for flex layout of icon and name
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.padding = '5px 8px'; // パディング調整
    button.onclick = () => {
      selectedItemToPlace = { type: 'main', data: weapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy' if preferred for placing
      clearAllButtonHighlights();
      button.style.border = '2px solid gold';
    };
    container.appendChild(button);
  });
}

function initializeWeaponUI() {
  const weaponSelectorDiv = document.getElementById('weapon-selector');
  const spanElement = weaponSelectorDiv.querySelector('span'); // "武器選択:" のspan
  const buttonsContainer = document.getElementById('weapon-buttons-container');

  // 1. カテゴリ選択プルダウンの作成
  const categoryLabel = document.createElement('span');
  categoryLabel.textContent = ' カテゴリ: ';
  categoryLabel.style.color = 'white';

  const categorySelect = document.createElement('select');
  categorySelect.id = 'weapon-category-selector';
  categorySelect.style.marginLeft = '5px';

  for (const categoryKey in WEAPON_DATA) {
    const categoryDisplayName = WEAPON_DATA[categoryKey].displayName || (categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1));
    categorySelect.innerHTML += `<option value="${categoryKey}">${categoryDisplayName}</option>`;
  }

  // span の後にカテゴリラベルとセレクトを挿入
  if (spanElement && spanElement.nextSibling) {
    weaponSelectorDiv.insertBefore(categorySelect, spanElement.nextSibling);
    weaponSelectorDiv.insertBefore(categoryLabel, categorySelect);
  } else if (spanElement) { // spanはあるが後続要素がない場合
    weaponSelectorDiv.appendChild(categoryLabel);
    weaponSelectorDiv.appendChild(categorySelect);
  }

  // カテゴリセレクタの後に改行を挿入してボタンコンテナを次の行に
  const brElement = document.createElement('br');
  weaponSelectorDiv.insertBefore(brElement, buttonsContainer);

  categorySelect.onchange = () => {
    displayWeaponButtons(categorySelect.value, buttonsContainer);
  };

  // 初期表示 (最初のカテゴリの武器を表示)
  const firstCategoryKey = Object.keys(WEAPON_DATA)[0];
  if (firstCategoryKey) {
    categorySelect.value = firstCategoryKey;
    displayWeaponButtons(firstCategoryKey, buttonsContainer);
  } else {
    displayWeaponButtons('', buttonsContainer); // カテゴリがない場合
  }
}

function initializeSubWeaponUI() {
  const container = document.getElementById('sub-weapon-buttons-container');
  container.innerHTML = ''; // クリア

  SUB_WEAPON_DATA.forEach(subWeapon => {
    const button = document.createElement('button');
    button.style.background = 'transparent';
    button.style.border = '1px solid #777';
    // button.style.padding = '2px';
    button.style.margin = '2px';
    button.style.cursor = 'pointer';
    button.title = subWeapon.name;

    const img = new Image();
    img.src = subWeapon.src;
    img.alt = subWeapon.name;
    img.style.width = `${subWeapon.width}px`;
    img.style.height = `${subWeapon.height}px`;
    img.style.display = 'block';

    button.appendChild(img);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = subWeapon.name;
    nameSpan.style.marginLeft = '8px';
    nameSpan.style.fontSize = '11px';
    nameSpan.style.color = 'white';
    nameSpan.style.whiteSpace = 'nowrap';
    button.appendChild(nameSpan);

    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.padding = '5px 8px';

    button.onclick = () => {
      selectedItemToPlace = { type: 'sub', data: subWeapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy'
      clearAllButtonHighlights();
      button.style.border = '2px solid gold';
    };
    container.appendChild(button);
  });
}

function initializeSpecialWeaponUI() {
  const container = document.getElementById('special-weapon-buttons-container');
  if (!container) {
    console.error("#special-weapon-buttons-container not found.");
    return;
  }
  container.innerHTML = ''; // クリア

  SPECIAL_WEAPON_DATA.forEach(specialWeapon => {
    const button = document.createElement('button');
    button.style.background = 'transparent';
    button.style.border = '1px solid #777';
    button.style.margin = '2px';
    button.style.cursor = 'pointer';
    button.title = specialWeapon.name;

    const img = new Image();
    img.src = specialWeapon.src;
    img.alt = specialWeapon.name;
    img.style.width = `${specialWeapon.width}px`;
    img.style.height = `${specialWeapon.height}px`;
    img.style.display = 'block';
    button.appendChild(img);

    const nameSpan = document.createElement('span');
    nameSpan.textContent = specialWeapon.name;
    nameSpan.style.marginLeft = '8px';
    nameSpan.style.fontSize = '11px';
    nameSpan.style.color = 'white';
    nameSpan.style.whiteSpace = 'nowrap';
    button.appendChild(nameSpan);

    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.padding = '5px 8px';
    button.onclick = () => {
      selectedItemToPlace = { type: 'special', data: specialWeapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy'
      clearAllButtonHighlights();
      button.style.border = '2px solid gold';
    };
    container.appendChild(button);
  });
}

// Mouse event logic for placing items will be in main.js, calling these variables/functions
// mousedown: if mode === 'place' and selectedItemToPlace, draw item, push action
