// js/items.js

let selectedItemToPlace = null; // { type: 'main' | 'sub', data: object }
// WEAPON_SUB_SPECIAL_DATA は js/data.js に移動しました

/**
 * 汎用的な武器・サブ・スペボタンを作成する関数
 * @param {object} itemData - 武器/サブ/スペのデータオブジェクト (name, src, width, height を含む)
 * @param {string} itemType - 'main', 'sub', 'special' のいずれか
 * @param {function} onClickCallback - ボタンクリック時のコールバック関数
 * @returns {HTMLButtonElement} 作成されたボタン要素
 */
function createItemButton(itemData, itemType, onClickCallback) {
  const button = document.createElement('button');
  button.style.background = 'transparent';
  button.style.border = '1px solid #777';
  button.style.margin = '2px';
  button.style.cursor = 'pointer';
  button.title = itemData.name;
  button.dataset.weaponName = itemData.name; // 識別用
  button.dataset.itemType = itemType; // 識別用

  const img = new Image();
  img.src = itemData.src;
  img.alt = itemData.name;
  img.style.width = `${itemData.width * (itemType === 'main' ? 1 : 0.9)}px`; // メインはそのまま、サブスペは少し小さく
  img.style.height = `${itemData.height * (itemType === 'main' ? 1 : 0.9)}px`;
  img.style.display = 'block';
  button.appendChild(img);

  const nameSpan = document.createElement('span');
  nameSpan.textContent = itemData.name;
  nameSpan.style.marginLeft = '8px';
  nameSpan.style.fontSize = '11px';
  nameSpan.style.color = 'white';
  nameSpan.style.whiteSpace = 'nowrap';
  button.appendChild(nameSpan);

  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.padding = '5px 8px';

  button.onclick = () => onClickCallback(itemData, itemType, button);
  return button;
}

function displayWeaponButtons(categoryKey, container) {
  container.innerHTML = ''; // 既存のボタンをクリア
  // selectedItemToPlace = null; // カテゴリ変更時に選択をリセットするならここだが、サブ選択は維持したい場合もある
  // mode = 'draw'; // 必要に応じて描画モードに戻す

  if (!categoryKey || !WEAPON_DATA[categoryKey] || !WEAPON_DATA[categoryKey].weapons) {
    return; // カテゴリが選択されていないか、データがない場合は何もしない
  }

  const weapons = WEAPON_DATA[categoryKey].weapons;
  weapons.forEach(weapon => {
    const button = createItemButton(weapon, 'main', (itemData, itemType, clickedButton) => {
      selectedItemToPlace = { type: 'main', data: weapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy' if preferred for placing
      clearAllButtonHighlights();
      clickedButton.style.border = '2px solid gold';
      // メインウェポンが選択されたので、右側の「関連メインウェポン」表示エリアをクリア
      const relatedMainWeaponsArea = document.getElementById('related-main-weapons-display');
      if (relatedMainWeaponsArea) {
        relatedMainWeaponsArea.innerHTML = '';
      }
      updateSubSpecialUI(weapon.name); // メインウェポン選択時にサブ/スペUIを更新
    });
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
    const button = createItemButton(subWeapon, 'sub', (itemData, itemType, clickedButton) => {
      selectedItemToPlace = { type: 'sub', data: subWeapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy'
      clearAllButtonHighlights();
      clickedButton.style.border = '2px solid gold';
      // サブウェポンが選択されたので、右側の「関連サブ・スペシャル」表示エリアをクリア
      const relatedSubSpecialArea = document.getElementById('related-sub-special-display-in-panel');
      if (relatedSubSpecialArea) {
        relatedSubSpecialArea.innerHTML = '';
      }
      updateRelatedMainWeaponsUI(subWeapon.name, 'sub'); // 関連メインウェポンを表示
    });
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
    const button = createItemButton(specialWeapon, 'special', (itemData, itemType, clickedButton) => {
      selectedItemToPlace = { type: 'special', data: specialWeapon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;         // 再配置モードを解除
      selectedIconForRepositioning = null; // 再配置対象を解除
      drawCanvas.style.cursor = 'crosshair'; // or 'copy'
      clearAllButtonHighlights();
      clickedButton.style.border = '2px solid gold';
      // スペシャルウェポンが選択されたので、右側の「関連サブ・スペシャル」表示エリアをクリア
      const relatedSubSpecialArea = document.getElementById('related-sub-special-display-in-panel');
      if (relatedSubSpecialArea) {
        relatedSubSpecialArea.innerHTML = '';
      }
      updateRelatedMainWeaponsUI(specialWeapon.name, 'special'); // 関連メインウェポンを表示
    });
    container.appendChild(button);
  });
}

// Mouse event logic for placing items will be in main.js, calling these variables/functions
// mousedown: if mode === 'place' and selectedItemToPlace, draw item, push action
