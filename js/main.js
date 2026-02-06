// js/main.js

// Global variables needed by multiple modules
let mode = 'draw'; // 'draw', 'arrow', 'ink', 'place', 'reposition'
// selectedRuleKey は js/data.js に移動しました
// selectedMapKey は js/data.js に移動しました

let selectedActions = []; // 選択されたアクション（アイコン）のリスト
let clipboardActions = []; // コピーされたアクションのリスト
let isBoxSelecting = false; // 範囲選択中かどうか
let selectionStart = { x: 0, y: 0 }; // 範囲選択の開始点
let selectionCurrent = { x: 0, y: 0 }; // 範囲選択の現在点

let tabs = [];
let activeTabId = null;
let nextTabId = 0;

let selectedIconForRepositioning = null; // 再配置対象のアイコンオブジェクト(actions配列内の参照)
let isRepositioningIcon = false;         // アイコン再配置中かどうかのフラグ
let dragOffsetX = 0;                     // ドラッグ開始時のアイコン左上からのマウスオフセットX
let dragOffsetY = 0;                     // ドラッグ開始時のアイコン左上からのマウスオフセットY

function initializeMapSelector() {
  const mapSelect = document.getElementById('map-select');
  if (!mapSelect) {
    console.error("#map-select not found.");
    return;
  }

  for (const key in MAP_DATA) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = MAP_DATA[key].displayName;
    mapSelect.appendChild(option);
  }
  mapSelect.value = selectedMapKey; // 初期値を設定

  mapSelect.addEventListener('change', (event) => {
    selectedMapKey = event.target.value;
    drawBackground(); // 新しいマップで背景を再描画
    clearCanvas();    // マップ変更時に描画盤面をクリア
    saveCurrentTabState();
    renderTabBar();
  });
}

function initializeRuleSelector() {
  const ruleSelect = document.getElementById('rule-select');
  if (!ruleSelect) {
    console.error("#rule-select not found.");
    return;
  }

  for (const key in RULE_DATA) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = RULE_DATA[key].displayName; // RULE_DATAのキーは 'nb', 'ar' など
    ruleSelect.appendChild(option);
  }
  ruleSelect.value = selectedRuleKey; // 初期値を設定

  ruleSelect.addEventListener('change', (event) => {
    selectedRuleKey = event.target.value;
    drawBackground(); // 新しいルールで背景(マップ)を再描画
    clearCanvas();    // ルール変更時に描画盤面をクリア
    saveCurrentTabState();
    renderTabBar();
  });
}

// Initial setup
window.addEventListener('load', () => { // async と await loadWeaponSubSpecialData() を削除
  resizeCanvases(); // DOMのサイズが確定してから実行
  initializeMapSelector();  // マップセレクタを初期化
  initializeRuleSelector(); // ルールセレクタを初期化
  initializeWeaponUI();
  initializePlayerIconUI();    // プレイヤーアイコンUIを初期化
  initializeSubWeaponUI();
  initializeSpecialWeaponUI(); // スペシャルウェポンUIを初期化
  initializeAccordion();       // アコーディオン機能を初期化
  initializeGearUI();          // ギアUIを初期化
  initializeGearGrid();        // ギアグリッドのD&D機能を初期化
  initializeGearClearButton(); // ギアクリアボタンを初期化
  initializeInfoPanelToggle(); // 情報パネルのトグル機能を初期化
  initializeSelectButton();    // 選択ボタンを初期化
  initTabs();                  // タブ機能を初期化
  updateSubSpecialUI(null);      // 初期状態ではメイン武器未選択なのでマップ下のサブ/スペは非表示
  drawBackground(); // 最後に背景を描画 (ルール選択が反映されるように)
});

// Event Listeners
drawCanvas.addEventListener('mousedown', e => {
  // console.log("Mousedown event triggered. Button:", e.button, "Mode:", mode); // Log button and mode
  // actions.forEach((act, index) => { if(act.type === 'item_icon') console.log(`Mousedown - Icon[${index}] in actions:`, act.x, act.y, act.width, act.height, act.src) });

  if (e.button !== 0) { // Process only left clicks for this mousedown logic
    return;
  }
  const rect = drawCanvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // 選択モードの処理
  if (mode === 'select') {
    // アイコンをクリックしたかチェック
    let clickedIcon = null;
    for (let i = actions.length - 1; i >= 0; i--) {
      const action = actions[i];
      if (action.type === 'item_icon') {
        if (clickX >= action.x && clickX <= action.x + action.width &&
            clickY >= action.y && clickY <= action.y + action.height) {
          clickedIcon = action;
          break;
        }
      }
    }

    if (clickedIcon) {
      // アイコンをクリックした場合
      if (!selectedActions.includes(clickedIcon)) {
        if (!e.shiftKey) selectedActions = []; // Shiftキーが押されていなければ選択解除
        selectedActions.push(clickedIcon);
      } else if (e.shiftKey) {
        // 既に選択済みでShiftキーが押されている場合は選択解除
        selectedActions = selectedActions.filter(a => a !== clickedIcon);
        redrawAllActions(selectedActions);
        return;
      }

      // ドラッグ移動の準備
      isRepositioningIcon = true;
      dragOffsetX = clickX; // 相対移動のためにクリック位置を保存
      dragOffsetY = clickY;
      // 選択中の全アイコンの初期位置を保存
      selectedActions.forEach(act => {
        act.initialX = act.x;
        act.initialY = act.y;
      });
      redrawAllActions(selectedActions);
      return;
    } else {
      // 何もない場所をクリックした場合 -> 範囲選択開始
      if (!e.shiftKey) selectedActions = [];
      isBoxSelecting = true;
      selectionStart = { x: clickX, y: clickY };
      selectionCurrent = { x: clickX, y: clickY };
      redrawAllActions(selectedActions);
      return;
    }
  }

  // Check if clicking on an existing icon for repositioning
  // Iterate in reverse to select the top-most item
  for (let i = actions.length - 1; i >= 0; i--) {
    const action = actions[i];
    if (action.type === 'item_icon') {
      // console.log(`Mousedown check: click(${clickX},${clickY}) vs icon(${action.x},${action.y} w:${action.width},h:${action.height})`);
      if (
        clickX >= action.x &&
        clickX <= action.x + action.width &&
        clickY >= action.y &&
        clickY <= action.y + action.height
      ) {
        // console.log("Mousedown: Icon found for repositioning", action);
        selectedIconForRepositioning = action; // Store the reference to the action object in actions array
        isRepositioningIcon = true;
        mode = 'reposition'; // Set mode to reposition
        
        // 既存の単体移動ロジックでも選択状態を更新しておく
        selectedActions = [action];
        redrawAllActions(selectedActions);

        dragOffsetX = clickX - action.x;
        dragOffsetY = clickY - action.y;
        // 再配置のために選択されたアイコンに応じてUIを更新
        if (action.itemType === 'main' && action.weaponName) {
          updateSubSpecialUI(action.weaponName); // マップ下の表示を更新
        } else if ((action.itemType === 'sub' || action.itemType === 'special') && action.weaponName) {
          updateRelatedMainWeaponsUI(action.weaponName, action.itemType);
        } else {
          updateSubSpecialUI(null); // それ以外はマップ下の表示をリセット
        }

        clearAllButtonHighlights(); // Deselect any tool buttons
        drawCanvas.style.cursor = 'grabbing';
        return; // Stop further processing for this mousedown event
      }
    }
  }
  // If not repositioning, proceed with other modes
  drawCanvas.style.cursor = 'crosshair'; // Reset cursor if not repositioning

  if (mode === 'draw') {
    isDrawing = true;
    startX = clickX;
    startY = clickY;
  } else if (mode === 'arrow') {
    isDrawing = true; // Reuse isDrawing for arrow drawing phase
    startX = clickX;
    startY = clickY;
  } else if (mode === 'ink' && selectedInkColor) {
    isDrawingInk = true;
    currentInkStrokePoints = []; // 新しいストロークを開始
    currentInkStrokePoints.push({ x: clickX, y: clickY });
    drawInk(clickX, clickY, selectedInkColor, INK_RADIUS);
  } else if (mode === 'place' && selectedItemToPlace && selectedItemToPlace.data.src) {
    const itemData = selectedItemToPlace.data;
    const itemType = selectedItemToPlace.type;

    const iconImg = new Image(); // This is for initial placement, not needed for redrawAllActions
    iconImg.src = itemData.src;
    const scaleFactor = 2.0;
    const iconWidth = itemData.width * scaleFactor;
    const iconHeight = itemData.height * scaleFactor;
    const drawX = clickX - iconWidth / 2; // Centered placement
    const drawY = clickY - iconHeight / 2; // Centered placement

    // Draw immediately for user feedback, then add to actions for persistence
    iconImg.onload = () => { // Ensure image is loaded before drawing
        drawCtx.drawImage(iconImg, drawX, drawY, iconWidth, iconHeight);
    };
    iconImg.onerror = () => { // Fallback if image fails to load
        console.error(`アイコン画像の読み込み失敗 (配置時): ${itemData.src}`);
        drawCtx.strokeRect(drawX, drawY, iconWidth, iconHeight); // Draw a placeholder
    };

    actions.push({
      type: 'item_icon',
      itemType: itemType, // 'main', 'sub', or 'special'
      weaponName: itemData.name, // アイテム名も保存 (メイン武器の場合、サブスペ特定に使う)
      x: drawX,
      y: drawY,
      src: itemData.src,
      width: iconWidth,
      height: iconHeight
    });
    // メインウェポンを配置した場合、マップ下のサブ/スペUIを更新
    if (itemType === 'main') {
      updateSubSpecialUI(itemData.name);
    }
  }
});

drawCanvas.addEventListener('mousemove', e => {
  const rect = drawCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if (mode === 'select') {
    if (isRepositioningIcon) {
      // 複数選択移動
      const dx = mouseX - dragOffsetX;
      const dy = mouseY - dragOffsetY;
      selectedActions.forEach(act => {
        act.x = act.initialX + dx;
        act.y = act.initialY + dy;
      });
      redrawAllActions(selectedActions);
    } else if (isBoxSelecting) {
      // 範囲選択ボックスの描画
      selectionCurrent = { x: mouseX, y: mouseY };
      redrawAllActions(selectedActions);
      
      const x = Math.min(selectionStart.x, selectionCurrent.x);
      const y = Math.min(selectionStart.y, selectionCurrent.y);
      const w = Math.abs(selectionCurrent.x - selectionStart.x);
      const h = Math.abs(selectionCurrent.y - selectionStart.y);
      
      drawCtx.strokeStyle = '#00FF00';
      drawCtx.lineWidth = 1;
      drawCtx.setLineDash([5, 3]);
      drawCtx.strokeRect(x, y, w, h);
      drawCtx.setLineDash([]);
    }
  } else if (isRepositioningIcon && selectedIconForRepositioning) {
    selectedIconForRepositioning.x = mouseX - dragOffsetX;
    selectedIconForRepositioning.y = mouseY - dragOffsetY;
    redrawAllActions(selectedActions); // Redraw all actions to show the icon moving
  } else if (mode === 'draw' && isDrawing) {
    // 線描画中のプレビューなどはここ (今回はmouseupで確定描画)
  } else if (mode === 'ink' && isDrawingInk && selectedInkColor) {
    const rect = drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    drawInk(x, y, selectedInkColor, INK_RADIUS);
    currentInkStrokePoints.push({ x, y });
  }
});

drawCanvas.addEventListener('mouseup', e => {
  if (mode === 'select') {
    if (isBoxSelecting) {
      isBoxSelecting = false;
      // 範囲内のアイコンを選択
      const x1 = Math.min(selectionStart.x, selectionCurrent.x);
      const y1 = Math.min(selectionStart.y, selectionCurrent.y);
      const x2 = Math.max(selectionStart.x, selectionCurrent.x);
      const y2 = Math.max(selectionStart.y, selectionCurrent.y);

      actions.forEach(act => {
        if (act.type === 'item_icon') {
          // アイコンの中心が範囲内にあるか、あるいは包含判定
          const centerX = act.x + act.width / 2;
          const centerY = act.y + act.height / 2;
          if (centerX >= x1 && centerX <= x2 && centerY >= y1 && centerY <= y2) {
            if (!selectedActions.includes(act)) {
              selectedActions.push(act);
            }
          }
        }
      });
      redrawAllActions(selectedActions);
    }
    if (isRepositioningIcon) {
      isRepositioningIcon = false;
      // 一時プロパティの削除
      selectedActions.forEach(act => {
        delete act.initialX;
        delete act.initialY;
      });
    }
  } else if (isRepositioningIcon) {
    isRepositioningIcon = false;
    // selectedIconForRepositioning is already updated in actions array by reference
    selectedIconForRepositioning = null;
    // mode = 'draw'; // Optionally revert to a default mode or let user select next tool
    drawCanvas.style.cursor = 'crosshair'; // Reset cursor
    redrawAllActions(selectedActions); // Final redraw to ensure consistency
  } else if (isDrawing && mode === 'draw') {
    const rect = drawCanvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    drawCtx.strokeStyle = 'cyan';
    drawCtx.lineWidth = 2;
    drawCtx.beginPath();
    drawCtx.moveTo(startX, startY);
    drawCtx.lineTo(endX, endY);
    drawCtx.stroke();
    actions.push({ type: 'line', startX: startX, startY: startY, endX: endX, endY: endY, color: 'cyan', lineWidth: 2 });
    isDrawing = false;
  } else if (isDrawing && mode === 'arrow') {
    const rect = drawCanvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    drawArrow(drawCtx, startX, startY, endX, endY, 'yellow', 2); // Example color/width

    actions.push({
      type: 'arrow',
      startX: startX,
      startY: startY,
      endX: endX,
      endY: endY,
      color: 'yellow',
      lineWidth: 2
    });
    isDrawing = false;
  } else if (isDrawingInk && mode === 'ink') {
    isDrawingInk = false;
    if (currentInkStrokePoints.length > 0) {
      actions.push({ type: 'inkStroke', points: [...currentInkStrokePoints], color: selectedInkColor, radius: INK_RADIUS });
      currentInkStrokePoints = [];
    }
  }
});

drawCanvas.addEventListener('contextmenu', e => {
  e.preventDefault(); // デフォルトのコンテキストメニュー表示をキャンセル
  const rect = drawCanvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // console.log(`ContextMenu event triggered. Click at (${clickX}, ${clickY})`);
  // actions.forEach((act, index) => { if(act.type === 'item_icon') console.log(`ContextMenu - Icon[${index}] in actions:`, act.x, act.y, act.width, act.height, act.src) });

  // 削除対象のアイコンを探す (actions配列を逆順に探索して最前面のものを対象とする)
  for (let i = actions.length - 1; i >= 0; i--) {
    const action = actions[i];
    if (action.type === 'item_icon') {
      // console.log(`ContextMenu check: click(${clickX},${clickY}) vs icon(${action.x},${action.y} w:${action.width},h:${action.height})`);
      if (
        clickX >= action.x &&
        clickX <= action.x + action.width &&
        clickY >= action.y &&
        clickY <= action.y + action.height
      ) {
        // console.log("ContextMenu: Icon found for deletion", action);
        actions.splice(i, 1); // 見つかったアイコンをactions配列から削除
        selectedActions = selectedActions.filter(a => a !== action); // 選択リストからも削除
        redrawAllActions(selectedActions); // キャンバスを再描画
        return; // 複数のアイコンが重なっている場合、一つだけ削除して終了
      }
    }
  }
});

function saveMapState() {
  const mapState = {
    selectedMapKey: selectedMapKey,
    selectedRuleKey: selectedRuleKey,
    actions: actions
  };

  const jsonData = JSON.stringify(mapState, null, 2); // null, 2 で整形されたJSON文字列に
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const mapName = MAP_DATA[selectedMapKey] ? MAP_DATA[selectedMapKey].displayName : 'unknown_map';
  const ruleName = RULE_DATA[selectedRuleKey] ? RULE_DATA[selectedRuleKey].displayName : 'unknown_rule';
  a.download = `splatoon_strategy_${mapName}_${ruleName}.json`; // ダウンロード時のファイル名
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log("マップ状態が保存されました。");
}

function loadMapState(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const mapState = JSON.parse(e.target.result);
      if (mapState && mapState.actions && mapState.selectedMapKey && mapState.selectedRuleKey) {
        actions.length = 0; // 現在のアクションをクリア
        actions.push(...mapState.actions); // ロードしたアクションで置き換え

        selectedMapKey = mapState.selectedMapKey;
        selectedRuleKey = mapState.selectedRuleKey;

        // UIの選択状態を更新
        const mapSelect = document.getElementById('map-select');
        if (mapSelect) mapSelect.value = selectedMapKey;
        const ruleSelect = document.getElementById('rule-select');
        if (ruleSelect) ruleSelect.value = selectedRuleKey;

        drawBackground();   // 新しいマップとルールで背景を再描画
        selectedActions = []; // 選択状態はクリア
        redrawAllActions(selectedActions); // ロードしたアクションを再描画
        saveCurrentTabState();
        renderTabBar();

        console.log("マップ状態が読み込まれました。");
      } else {
        console.error("無効なJSONファイル形式です。");
        alert("無効なJSONファイル形式です。");
      }
    } catch (error) {
      console.error("JSONファイルの読み込みまたは解析に失敗しました:", error);
      alert("JSONファイルの読み込みに失敗しました。");
    }
  };
  reader.readAsText(file);
}

window.addEventListener('resize', () => {
  resizeCanvases();
  drawBackground();
  redrawAllActions(selectedActions);
});

window.addEventListener('keydown', e => {
  // Undo
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    undoLastAction();
  }
  
  // Copy
  if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
    if (selectedActions.length > 0) {
      // 循環参照を避けるため、必要なデータだけコピー
      clipboardActions = JSON.parse(JSON.stringify(selectedActions));
    }
  }

  // Paste
  if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
    if (clipboardActions.length > 0) {
      selectedActions = []; // ペーストしたアイテムを選択状態にするためクリア
      clipboardActions.forEach(item => {
        // 少しずらして配置
        item.x += 20;
        item.y += 20;
        actions.push(item);
        selectedActions.push(item);
      });
      redrawAllActions(selectedActions);
    }
  }

  // Delete
  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (selectedActions.length > 0) {
      // 選択されたアクションを削除
      for (let i = actions.length - 1; i >= 0; i--) {
        if (selectedActions.includes(actions[i])) {
          actions.splice(i, 1);
        }
      }
      selectedActions = [];
      redrawAllActions(selectedActions);
    }
  }
});

function initTabs() {
  const container = document.getElementById('controls');
  const tabBar = document.createElement('div');
  tabBar.id = 'tab-bar';
  tabBar.style.display = 'flex';
  tabBar.style.flexWrap = 'wrap';
  tabBar.style.gap = '5px';
  tabBar.style.padding = '5px';
  tabBar.style.background = '#222';
  tabBar.style.marginBottom = '5px';
  
  if (container) {
    container.parentNode.insertBefore(tabBar, container);
  }

  // Initial tab with current state
  const tabId = nextTabId++;
  tabs.push({
    id: tabId,
    mapKey: selectedMapKey,
    ruleKey: selectedRuleKey,
    actions: [] // actions are currently empty on load
  });
  activeTabId = tabId;
  renderTabBar();
}

function createNewTab() {
  saveCurrentTabState();
  
  const tabId = nextTabId++;
  const newMapKey = 'hirame';
  const newRuleKey = 'nb';
  
  tabs.push({
    id: tabId,
    mapKey: newMapKey,
    ruleKey: newRuleKey,
    actions: []
  });
  
  switchTab(tabId);
}

function switchTab(tabId) {
  if (activeTabId === tabId) return;
  
  saveCurrentTabState(); // Save old tab state
  
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return;
  
  activeTabId = tabId;
  selectedMapKey = tab.mapKey;
  selectedRuleKey = tab.ruleKey;
  
  // Restore actions
  actions.length = 0;
  if (tab.actions) {
    actions.push(...JSON.parse(JSON.stringify(tab.actions)));
  }
  
  selectedActions = []; // Clear selection
  
  // Update UI Selectors
  const mapSelect = document.getElementById('map-select');
  if (mapSelect) mapSelect.value = selectedMapKey;
  
  const ruleSelect = document.getElementById('rule-select');
  if (ruleSelect) ruleSelect.value = selectedRuleKey;
  
  drawBackground();
  redrawAllActions();
  renderTabBar();
}

function closeTab(e, tabId) {
  e.stopPropagation();
  if (tabs.length <= 1) {
    alert("最後のタブは閉じられません。");
    return;
  }
  
  const idx = tabs.findIndex(t => t.id === tabId);
  if (idx === -1) return;
  
  tabs.splice(idx, 1);
  
  if (activeTabId === tabId) {
    const newIdx = Math.max(0, idx - 1);
    const newTab = tabs[newIdx];
    
    activeTabId = newTab.id;
    selectedMapKey = newTab.mapKey;
    selectedRuleKey = newTab.ruleKey;
    actions.length = 0;
    if (newTab.actions) {
        actions.push(...JSON.parse(JSON.stringify(newTab.actions)));
    }
    selectedActions = [];
    
    const mapSelect = document.getElementById('map-select');
    if (mapSelect) mapSelect.value = selectedMapKey;
    const ruleSelect = document.getElementById('rule-select');
    if (ruleSelect) ruleSelect.value = selectedRuleKey;
    
    drawBackground();
    redrawAllActions();
  }
  
  renderTabBar();
}

function saveCurrentTabState() {
  if (activeTabId === null) return;
  const tab = tabs.find(t => t.id === activeTabId);
  if (tab) {
    tab.mapKey = selectedMapKey;
    tab.ruleKey = selectedRuleKey;
    tab.actions = JSON.parse(JSON.stringify(actions));
  }
}

function renderTabBar() {
  const tabBar = document.getElementById('tab-bar');
  if (!tabBar) return;
  
  tabBar.innerHTML = '';
  
  tabs.forEach(tab => {
    const btn = document.createElement('div');
    btn.style.display = 'inline-flex';
    btn.style.alignItems = 'center';
    btn.style.padding = '5px 10px';
    btn.style.marginRight = '5px';
    btn.style.background = tab.id === activeTabId ? '#555' : '#333';
    btn.style.border = '1px solid #777';
    btn.style.cursor = 'pointer';
    btn.style.color = 'white';
    btn.style.userSelect = 'none';
    
    const mapName = MAP_DATA[tab.mapKey] ? MAP_DATA[tab.mapKey].displayName : tab.mapKey;
    const ruleName = RULE_DATA[tab.ruleKey] ? RULE_DATA[tab.ruleKey].displayName : tab.ruleKey;
    
    const title = document.createElement('span');
    title.textContent = `${mapName} (${ruleName})`;
    btn.appendChild(title);
    
    const close = document.createElement('span');
    close.textContent = ' ×';
    close.style.marginLeft = '8px';
    close.style.fontWeight = 'bold';
    close.style.cursor = 'pointer';
    close.onclick = (e) => closeTab(e, tab.id);
    close.onmouseover = () => close.style.color = 'red';
    close.onmouseout = () => close.style.color = 'white';
    
    btn.appendChild(close);
    
    btn.onclick = (e) => {
        if (e.target !== close) switchTab(tab.id);
    };
    
    tabBar.appendChild(btn);
  });
  
  const addBtn = document.createElement('button');
  addBtn.textContent = '+';
  addBtn.style.padding = '5px 10px';
  addBtn.style.cursor = 'pointer';
  addBtn.style.background = '#333';
  addBtn.style.color = 'white';
  addBtn.style.border = '1px solid #777';
  addBtn.onclick = createNewTab;
  tabBar.appendChild(addBtn);
}
