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
    button.draggable = true; // ドラッグ可能にする
    button.title = gear.name;

    const img = new Image();
    img.src = gear.src;
    img.alt = gear.name;
    img.style.width = `${gear.width}px`;
    img.style.height = `${gear.height}px`;
    img.style.display = 'block';
    button.appendChild(img);

    // ドラッグ開始時のイベント
    button.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', gear.src); // ドラッグするデータの種類と内容を設定
      e.dataTransfer.setData('gear-name', gear.name); // 名前も渡す
    });

    container.appendChild(button);
  });
}

function initializeGearGrid() {
  const slots = document.querySelectorAll('.gear-slot');

  // スロット内のギア画像にドラッグ＆ドロップと右クリック削除のイベントリスナーを追加するヘルパー関数
  const addDragDropListenersToImage = (img, slot) => {
    img.draggable = true;

    // スロット内のギアをドラッグ開始
    img.addEventListener('dragstart', (e) => {
      e.stopPropagation(); // 親要素へのイベント伝播を停止
      e.dataTransfer.setData('text/plain', img.src);
      e.dataTransfer.setData('gear-name', img.alt);
      e.dataTransfer.setData('source-slot-index', slot.dataset.slotIndex); // 移動元のスロットindexを保存

      // ドラッグ中の見た目を変更（少し待ってから実行）
      setTimeout(() => {
        img.style.opacity = '0.5';
      }, 0);
    });

    // ドラッグ終了時（ドロップ成功・失敗問わず）
    img.addEventListener('dragend', (e) => {
      e.stopPropagation();
      img.style.opacity = '1'; // 見た目を元に戻す
    });

    // 右クリックで削除
    img.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      img.remove();
    });
  };

  slots.forEach(slot => {
    // ドロップ対象の上にある間
    slot.addEventListener('dragover', (e) => {
      e.preventDefault(); // ドロップを許可
      slot.classList.add('drag-over');
    });

    // ドロップ対象から離れた時
    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    // ドロップされた時
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');

      const sourceSlotIndex = e.dataTransfer.getData('source-slot-index');

      if (sourceSlotIndex) {
        // --- 他のスロットからの移動 ---
        const sourceSlot = document.querySelector(`.gear-slot[data-slot-index='${sourceSlotIndex}']`);
        const sourceImg = sourceSlot ? sourceSlot.querySelector('img') : null;

        // 移動元スロットや画像が見つからない、または同じスロットへのドロップの場合は何もしない
        if (!sourceImg || sourceSlot === slot) {
          return;
        }

        const targetImg = slot.querySelector('img');

        // ドロップ先(target)の画像を移動元(source)へ移動
        if (targetImg) {
          sourceSlot.appendChild(targetImg);
          addDragDropListenersToImage(targetImg, sourceSlot);
        } else {
          sourceSlot.innerHTML = '';
        }

        // 移動元(source)の画像をドロップ先(target)へ移動
        slot.appendChild(sourceImg);
        addDragDropListenersToImage(sourceImg, slot);
      } else {
        // --- 左のギアリストからの新規配置 ---
        const gearSrc = e.dataTransfer.getData('text/plain');
        const gearName = e.dataTransfer.getData('gear-name');

        if (gearSrc) {
          slot.innerHTML = ''; // 既存のギアをクリア
          const img = document.createElement('img');
          img.src = gearSrc;
          img.alt = gearName;
          img.title = gearName;
          
          slot.appendChild(img);
          addDragDropListenersToImage(img, slot); // 新しいギアにイベントリスナーを設定
        }
      }
    });
  });
}

function initializeGearClearButton() {
  const clearButton = document.getElementById('clear-gear-button');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      // ユーザーに確認
      if (confirm('ギア構成をすべてクリアしますか？')) {
        const slots = document.querySelectorAll('.gear-slot');
        slots.forEach(slot => {
          slot.innerHTML = ''; // 各スロットの中身を空にする
        });
      }
    });
  }
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
  const INFO_PANEL_STATE_KEY = 'splatoonStrategyBoard.infoPanel.isOpen';

  if (toggleButton && infoPanel) {
    // ローカルストレージから保存された状態を読み込む
    const savedState = localStorage.getItem(INFO_PANEL_STATE_KEY);
    // 保存された値がない場合は 'true' (開いた状態) をデフォルトとする
    const initialStateIsOpen = savedState === null ? true : (savedState === 'true');

    // 初期状態を適用
    infoPanel.dataset.isOpen = initialStateIsOpen.toString();
    if (!initialStateIsOpen) {
      // 閉じた状態のスタイルを適用（リロード時のアニメーションを防ぐため一時的に無効化）
      infoPanel.style.transition = 'none';
      infoPanel.style.width = '0px';
      infoPanel.style.padding = '15px 0';
      toggleButton.textContent = '>';
      setTimeout(() => infoPanel.style.transition = '', 0); // すぐにアニメーションを再度有効化
    }

    toggleButton.addEventListener('click', () => {
      const wasOpen = infoPanel.dataset.isOpen === 'true';
      const nowOpen = !wasOpen;

      if (nowOpen) {
        infoPanel.style.width = '250px';
        infoPanel.style.padding = '15px';
        toggleButton.textContent = '<';
      } else {
        infoPanel.style.width = '0px';
        infoPanel.style.padding = '15px 0'; // 縦のパディングは維持しつつ横を0に
        toggleButton.textContent = '>';
      }
      infoPanel.dataset.isOpen = nowOpen.toString();
      // 新しい状態をローカルストレージに保存
      localStorage.setItem(INFO_PANEL_STATE_KEY, nowOpen.toString());
    });
  }
}

function initializePlayerIconUI() {
  const container = document.getElementById('controls');
  if (!container) {
    console.error("#controls container not found for player icons.");
    return;
  }

  PLAYER_ICON_DATA.forEach(playerIcon => {
    const button = document.createElement('button');
    button.style.background = 'transparent';
    button.style.border = '1px solid #555'; // clearAllButtonHighlights のデフォルトスタイルに合わせる
    button.style.padding = '2px';
    button.style.margin = '2px';
    button.style.cursor = 'pointer';
    button.title = playerIcon.name;
    button.dataset.itemName = playerIcon.name; // 識別用

    const img = new Image();
    img.src = playerIcon.src;
    img.alt = playerIcon.name;
    img.style.width = `${playerIcon.width}px`;
    img.style.height = `${playerIcon.height}px`;
    img.style.display = 'block';
    button.appendChild(img);

    button.addEventListener('click', () => {
      selectedItemToPlace = { type: 'player', data: playerIcon };
      mode = 'place';
      selectedInkColor = null;
      isDrawing = false;
      isDrawingInk = false;
      isRepositioningIcon = false;
      selectedIconForRepositioning = null;
      drawCanvas.style.cursor = 'crosshair';

      clearAllButtonHighlights();
      button.style.border = '2px solid gold';
    });

    const clearButton = Array.from(container.querySelectorAll('button')).find(btn => btn.textContent === 'クリア');
    if (clearButton) {
      container.insertBefore(button, clearButton);
    } else {
      container.appendChild(button);
    }
  });
}

function initializeSelectButton() {
  const container = document.getElementById('controls');
  if (!container) return;

  const button = document.createElement('button');
  button.textContent = '選択';
  button.style.background = '#333';
  button.style.color = 'white';
  button.style.border = '1px solid #555';
  button.style.padding = '5px 10px';
  button.style.margin = '2px';
  button.style.cursor = 'pointer';

  button.addEventListener('click', () => {
    setSelectMode(button);
  });

  // 先頭に追加
  container.insertBefore(button, container.firstChild);
}
