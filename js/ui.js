// js/ui.js

function clearAllButtonHighlights() {
  const controlButtons = document.querySelectorAll('#controls > button'); // #controls 直下の子ボタンのみ対象
  controlButtons.forEach(btn => {
    if(btn.textContent !== 'クリア') { // クリアボタンは常にデフォルトスタイル
         btn.style.border = "1px solid #555"; // デフォルトの枠線に戻すか、初期スタイルに
    }
  });

  const weaponButtonsContainer = document.getElementById('weapon-buttons-container');
  if (weaponButtonsContainer) {
      const weaponButtons = weaponButtonsContainer.querySelectorAll('button');
      weaponButtons.forEach(wb => wb.style.border = '1px solid #ccc'); // 武器ボタンのデフォルト枠線
  }
  const subWeaponButtonsContainer = document.getElementById('sub-weapon-buttons-container');
  if (subWeaponButtonsContainer) {
      const subWeaponButtons = subWeaponButtonsContainer.querySelectorAll('button');
      subWeaponButtons.forEach(swb => swb.style.border = '1px solid #ccc');
  }
  const specialWeaponButtonsContainer = document.getElementById('special-weapon-buttons-container');
  if (specialWeaponButtonsContainer) {
      const specialWeaponButtons = specialWeaponButtonsContainer.querySelectorAll('button');
      specialWeaponButtons.forEach(spwb => spwb.style.border = '1px solid #ccc');
  }
}

function initializeAccordion() {
  const selectors = [
    { titleId: 'weapon-selector-title', contentId: 'weapon-buttons-container', categorySelectId: 'weapon-category-selector' },
    { titleId: 'sub-weapon-selector-title', contentId: 'sub-weapon-buttons-container' },
    { titleId: 'special-weapon-selector-title', contentId: 'special-weapon-buttons-container' }
  ];

  selectors.forEach(selector => {
    const titleElement = document.getElementById(selector.titleId);
    const contentElement = document.getElementById(selector.contentId);
    const categorySelectElement = selector.categorySelectId ? document.getElementById(selector.categorySelectId) : null;

    if (titleElement && contentElement) {
      contentElement.style.display = 'none'; // 初期状態で閉じる
      if (categorySelectElement) {
        categorySelectElement.style.display = 'none'; // 初期状態で武器カテゴリセレクタも閉じる
      } 

      titleElement.addEventListener('click', () => {
        const isHidden = contentElement.style.display === 'none';
        contentElement.style.display = isHidden ? 'flex' : 'none'; // Assuming flex for button containers
        if (categorySelectElement) {
          categorySelectElement.style.display = isHidden ? 'inline-block' : 'none';
        }
        titleElement.classList.toggle('active', isHidden); // Optional: for styling active/inactive titles
      });
    }
  });
}

function initializeGearUI() {
  const container = document.getElementById('gear-icons-container');
  const selectedGearDisplayArea = document.getElementById('selected-gear-display-area');
  if (!container) {
    console.error("#gear-icons-container not found.");
    return;
  }
  container.innerHTML = ''; // クリア

  GEAR_DATA.forEach(gear => {
    const button = document.createElement('button');
    button.style.background = 'transparent';
    button.style.border = '1px solid #777';
    button.style.padding = '2px';
    button.style.margin = '1px'; // 少し小さめのマージン
    button.style.cursor = 'pointer';
    button.title = gear.name;

    const img = new Image();
    img.src = gear.src;
    img.alt = gear.name;
    img.style.width = `${gear.width}px`;
    img.style.height = `${gear.height}px`;
    img.style.display = 'block';
    button.appendChild(img);

    // ギアアイコンは名前テキストなしで、アイコンのみとする（スペース節約のため）
    // 必要であれば items.js の武器ボタン生成ロジックを参考に nameSpan を追加

    button.onclick = () => {
      console.log(`Gear selected: ${gear.name}`);
      if (selectedGearDisplayArea) {
        const selectedImg = new Image();
        selectedImg.src = gear.src;
        selectedImg.alt = gear.name;
        selectedImg.title = gear.name;
        selectedImg.style.width = `${gear.width}px`; // 元のサイズを維持
        selectedImg.style.height = `${gear.height}px`;
        selectedImg.style.margin = '2px';
        selectedImg.style.cursor = 'pointer'; // 削除できるようにポインター変更
        selectedImg.oncontextmenu = (e) => { // 右クリックで削除
            e.preventDefault();
            selectedImg.remove();
        };
        selectedGearDisplayArea.appendChild(selectedImg);
      }
      // 選択元のボタンのハイライトは行わない（複数選択可能なため）
    };
    container.appendChild(button);
  });
}

function updateSubSpecialUI(mainWeaponName) {
  const relatedDisplayArea = document.getElementById('related-sub-special-display-in-panel');

  if (!relatedDisplayArea) {
    console.error("#related-sub-special-display-in-panel not found.");
    return;
  }
  // メインウェポンが選択されたので、「関連メインウェポン」表示はクリア
  const relatedMainWeaponsArea = document.getElementById('related-main-weapons-display');
  if (relatedMainWeaponsArea) {
    relatedMainWeaponsArea.innerHTML = '';
  }

  relatedDisplayArea.innerHTML = ''; // 表示エリアをクリア

  let targetSubName = null;
  let targetSpecialName = null;
  let targetSubData = null;
  let targetSpecialData = null;

  if (mainWeaponName && WEAPON_SUB_SPECIAL_DATA.length > 0) { // items.js の WEAPON_SUB_SPECIAL_DATA を参照
    const weaponInfo = WEAPON_SUB_SPECIAL_DATA.find(w => w.weapon === mainWeaponName);
    if (weaponInfo) {
      targetSubName = weaponInfo.sub;
      targetSpecialName = weaponInfo.special;

      // サブウェポンデータを取得
      targetSubData = SUB_WEAPON_DATA.find(sub => sub.name === targetSubName);
      // スペシャルウェポンデータを取得
      targetSpecialData = SPECIAL_WEAPON_DATA.find(sp => sp.name === targetSpecialName);
    }
  }

  const createAndAppendButton = (itemData, itemType) => {
    if (!itemData) return;
    const button = createItemButton(itemData, itemType, (clickedItemData, clickedItemType, clickedButton) => {
      selectedItemToPlace = { type: clickedItemType, data: clickedItemData };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;
      selectedIconForRepositioning = null;
      drawCanvas.style.cursor = 'crosshair';
      
      // マップ下のボタンのハイライト処理 (オプション)
      // 他のマップ下ボタンのハイライトを解除
      Array.from(relatedDisplayArea.children).forEach(childBtn => {
        if (childBtn.tagName === 'BUTTON') childBtn.style.border = '1px solid #777';
      });
      clickedButton.style.border = '2px solid gold';

      // 左側UIのツールボタンのハイライトもクリア
      clearAllButtonHighlights();
    });
    // 右パネル内でのボタンスタイル調整
    button.style.width = 'calc(100% - 4px)'; // コンテナ幅に合わせる (マージン2px * 2を考慮)
    button.style.padding = '5px 8px'; // items.js の createItemButton と同じパディング
    button.querySelector('img').style.width = `${itemData.width * 0.9}px`; // items.js のサブスペと同じサイズ感
    button.querySelector('img').style.height = `${itemData.height * 0.9}px`;
    button.querySelector('span').style.fontSize = '11px'; // items.js と同じフォントサイズ

    relatedDisplayArea.appendChild(button);
  };

  if (targetSubData) createAndAppendButton(targetSubData, 'sub');
  if (targetSpecialData) createAndAppendButton(targetSpecialData, 'special');
}

function updateRelatedMainWeaponsUI(selectedSubOrSpecialName, itemType) { // itemType: 'sub' or 'special'
  const displayArea = document.getElementById('related-main-weapons-display');
  if (!displayArea) {
    console.error("#related-main-weapons-display not found.");
    return;
  }
  displayArea.innerHTML = ''; // 表示エリアをクリア

  // サブ/スペシャルが選択されたので、「関連サブ・スペシャル」表示はクリア
  const relatedSubSpecialArea = document.getElementById('related-sub-special-display-in-panel');
  if (relatedSubSpecialArea) {
    relatedSubSpecialArea.innerHTML = '';
  }

  if (!selectedSubOrSpecialName || WEAPON_SUB_SPECIAL_DATA.length === 0) { // items.js の WEAPON_SUB_SPECIAL_DATA を参照
    return;
  }

  const relatedMains = WEAPON_SUB_SPECIAL_DATA.filter(weaponEntry => { // items.js の WEAPON_SUB_SPECIAL_DATA を参照
    if (itemType === 'sub') {
      return weaponEntry.sub === selectedSubOrSpecialName;
    } else if (itemType === 'special') {
      return weaponEntry.special === selectedSubOrSpecialName;
    }
    return false;
  }).map(weaponEntry => {
    // WEAPON_DATA から完全な武器オブジェクトを見つける
    for (const category in WEAPON_DATA) {
      const foundWeapon = WEAPON_DATA[category].weapons.find(w => w.name === weaponEntry.weapon);
      if (foundWeapon) return foundWeapon;
    }
    return null; // 見つからなかった場合
  }).filter(weapon => weapon !== null);

  relatedMains.forEach(mainWeaponData => {
    const button = createItemButton(mainWeaponData, 'main', (clickedItemData, clickedItemType, clickedButton) => {
      selectedItemToPlace = { type: 'main', data: clickedItemData };
      mode = 'place';
      drawCanvas.style.cursor = 'crosshair';

      Array.from(displayArea.children).forEach(childBtn => {
        if (childBtn.tagName === 'BUTTON') childBtn.style.border = '1px solid #777';
      });
      clickedButton.style.border = '2px solid gold';
      clearAllButtonHighlights(); // 左側のUIのハイライトもクリア

      updateSubSpecialUI(clickedItemData.name); // 関連サブ・スペシャルを更新
    });
    button.style.width = 'calc(100% - 4px)';
    // 他のスタイルは createItemButton と updateSubSpecialUI のボタンに準拠
    displayArea.appendChild(button);
  });
}

function initializeInfoPanelToggle() {
  const toggleButton = document.getElementById('info-panel-toggle');
  const infoPanel = document.getElementById('info-panel');

  if (toggleButton && infoPanel) {
    // 初期状態は開いているとする
    infoPanel.dataset.isOpen = 'true'; // カスタムデータ属性で状態を管理

    toggleButton.addEventListener('click', () => {
      const isOpen = infoPanel.dataset.isOpen === 'true';
      if (isOpen) {
        infoPanel.style.width = '0px';
        infoPanel.style.padding = '15px 0'; // 縦のパディングは維持しつつ横を0に
        toggleButton.textContent = '>';
      } else {
        infoPanel.style.width = '250px'; // 元の幅に戻す
        infoPanel.style.padding = '15px';
        toggleButton.textContent = '<';
      }
      infoPanel.dataset.isOpen = isOpen ? 'false' : 'true';
    });
  }
}
