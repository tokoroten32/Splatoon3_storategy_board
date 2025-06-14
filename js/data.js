// js/data.js

const WEAPON_DATA = {
  'shooter': {
    displayName: 'シューター',
    weapons: [
      { key: 'wakaba_shooter', name: 'わかばシューター', src: './icons/weapon-main/shooter/わかばシューター.png', width: 30, height: 30 },
      { key: 'momiji_shooter', name: 'もみじシューター', src: './icons/weapon-main/shooter/もみじシューター.png', width: 30, height: 30 },
      { key: 'splattershot', name: 'スプラシューター', src: './icons/weapon-main/shooter/スプラシューター.png', width: 30, height: 30 },
      { key: 'splattershot_collabo', name: 'スプラシューターコラボ', src: './icons/weapon-main/shooter/スプラシューターコラボ.png', width: 30, height: 30 },
      { key: 'promodeler_mg', name: 'プロモデラーMG', src: './icons/weapon-main/shooter/プロモデラーMG.png', width: 30, height: 30 },
      { key: 'promodeler_rg', name: 'プロモデラーRG', src: './icons/weapon-main/shooter/プロモデラーRG.png', width: 30, height: 30 },
      { key: 'nzap85', name: 'N-ZAP85', src: './icons/weapon-main/shooter/N-ZAP85.png', width: 30, height: 30 },
      { key: 'nzap89', name: 'N-ZAP89', src: './icons/weapon-main/shooter/N-ZAP89.png', width: 30, height: 30 },
      { key: 'prime_shooter', name: 'プライムシューター', src: './icons/weapon-main/shooter/プライムシューター.png', width: 30, height: 30 },
      { key: 'prime_shooter_collabo', name: 'プライムシューターコラボ', src: './icons/weapon-main/shooter/プライムシューターコラボ.png', width: 30, height: 30 },
      { key: '52gallon', name: '.52ガロン', src: './icons/weapon-main/shooter/52ガロン.png', width: 30, height: 30 },
      { key: '52gallon_deco', name: '.52ガロンデコ', src: './icons/weapon-main/shooter/52ガロンデコ.png.webp', width: 30, height: 30 },
      { key: '96gallon', name: '.96ガロン', src: './icons/weapon-main/shooter/96ガロン.png', width: 30, height: 30 },
      { key: '96gallon_deco', name: '.96ガロンデコ', src: './icons/weapon-main/shooter/96ガロンデコ.png.webp', width: 30, height: 30 },
      { key: 'jet_sweeper', name: 'ジェットスイーパー', src: './icons/weapon-main/shooter/ジェットスイーパー.png', width: 30, height: 30 },
      { key: 'jet_sweeper_custom', name: 'ジェットスイーパーカスタム', src: './icons/weapon-main/shooter/ジェットスイーパーカスタム.png.webp', width: 30, height: 30 },
      { key: 'space_shooter', name: 'スペースシューター', src: './icons/weapon-main/shooter/スペースシューター.png', width: 30, height: 30 },
      { key: 'space_shooter_collabo', name: 'スペースシューターコラボ', src: './icons/weapon-main/shooter/スペースシューターコラボ.png', width: 30, height: 30 },
      { key: 'l3_reelgun', name: 'L3リールガン', src: './icons/weapon-main/shooter/L3リールガン.png', width: 30, height: 30 },
      { key: 'l3_reelgun_d', name: 'L3リールガンD', src: './icons/weapon-main/shooter/L3リールガンD.png.webp', width: 30, height: 30 },
      { key: 'h3_reelgun', name: 'H3リールガン', src: './icons/weapon-main/shooter/H3リールガン.png', width: 30, height: 30 },
      { key: 'h3_reelgun_d', name: 'H3リールガンD', src: './icons/weapon-main/shooter/H3リールガンD.png', width: 30, height: 30 },
      { key: 'bold_marker', name: 'ボールドマーカー', src: './icons/weapon-main/shooter/ボールドマーカー.png', width: 30, height: 30 },
      { key: 'bold_marker_neo', name: 'ボールドマーカーネオ', src: './icons/weapon-main/shooter/ボールドマーカーネオ.png.webp', width: 30, height: 30 },
      { key: 'sharp_marker', name: 'シャープマーカー', src: './icons/weapon-main/shooter/シャープマーカー.png', width: 30, height: 30 },
      { key: 'sharp_marker_neo', name: 'シャープマーカーネオ', src: './icons/weapon-main/shooter/シャープマーカーネオ.png.webp', width: 30, height: 30 },
      { key: 'bottlegeist', name: 'ボトルガイザー', src: './icons/weapon-main/shooter/ボトルガイザー.png', width: 30, height: 30 },
      { key: 'bottlegeist_foil', name: 'ボトルガイザーフォイル', src: './icons/weapon-main/shooter/ボトルガイザーフォイル.png', width: 30, height: 30 },
    ]
  },
  'roller': {
    displayName: 'ローラー',
    weapons: [
      { key: 'splat_roller', name: 'スプラローラー', src: './icons/weapon-main/roller/スプラローラー.png', width: 30, height: 30 },
      { key: 'splat_roller_collabo', name: 'スプラローラーコラボ', src: './icons/weapon-main/roller/スプラローラーコラボ.png.webp', width: 30, height: 30 },
      { key: 'carbon_roller', name: 'カーボンローラー', src: './icons/weapon-main/roller/カーボンローラー.png', width: 30, height: 30 },
      { key: 'carbon_roller_deco', name: 'カーボンローラーデコ', src: './icons/weapon-main/roller/カーボンローラーデコ.png', width: 30, height: 30 },
      { key: 'variable_roller', name: 'ヴァリアブルローラー', src: './icons/weapon-main/roller/ヴァリアブルローラー.png', width: 30, height: 30 },
      { key: 'variable_roller_foil', name: 'ヴァリアブルローラーフォイル', src: './icons/weapon-main/roller/ヴァリアブルローラーフォイル.png.webp', width: 30, height: 30 },
      { key: 'dynamo_roller', name: 'ダイナモローラー', src: './icons/weapon-main/roller/ダイナモローラー.png', width: 30, height: 30 },
      { key: 'dynamo_roller_tesla', name: 'ダイナモローラーテスラ', src: './icons/weapon-main/roller/ダイナモローラーテスラ.png', width: 30, height: 30 },
      { key: 'wide_roller', name: 'ワイドローラー', src: './icons/weapon-main/roller/ワイドローラー.png', width: 30, height: 30 },
      { key: 'wide_roller_collabo', name: 'ワイドローラーコラボ', src: './icons/weapon-main/roller/ワイドローラーコラボ.png', width: 30, height: 30 },
    ]
  },
  'charger': {
    displayName: 'チャージャー',
    weapons: [
      { key: 'splat_charger', name: 'スプラチャージャー', src: './icons/weapon-main/charger/スプラチャージャー.png', width: 30, height: 30 },
      { key: 'splat_charger_collabo', name: 'スプラチャージャーコラボ', src: './icons/weapon-main/charger/スプラチャージャーコラボ.png', width: 30, height: 30 },
      { key: 'splat_scope', name: 'スプラスコープ', src: './icons/weapon-main/charger/スプラスコープ.png', width: 30, height: 30 },
      { key: 'splat_scope_collabo', name: 'スプラスコープコラボ', src: './icons/weapon-main/charger/スプラスコープコラボ.png', width: 30, height: 30 },
      { key: 'liter_4k', name: 'リッター4K', src: './icons/weapon-main/charger/リッター4K.png', width: 30, height: 30 },
      { key: 'liter_4k_custom', name: 'リッター4Kカスタム', src: './icons/weapon-main/charger/リッター4Kカスタム.png', width: 30, height: 30 },
      { key: 'scope_4k', name: '4Kスコープ', src: './icons/weapon-main/charger/4Kスコープ.png', width: 30, height: 30 },
      { key: 'scope_4k_custom', name: '4Kスコープカスタム', src: './icons/weapon-main/charger/4Kスコープカスタム.png.webp', width: 30, height: 30 },
      { key: 'squicklin_a', name: 'スクイックリンα', src: './icons/weapon-main/charger/スクイックリンα.png', width: 30, height: 30 },
      { key: 'squicklin_b', name: 'スクイックリンβ', src: './icons/weapon-main/charger/スクイックリンβ.png', width: 30, height: 30 },
      { key: 'bamboozler_14_mk1', name: '14式竹筒銃・甲', src: './icons/weapon-main/charger/14式竹筒銃・甲.png', width: 30, height: 30 },
      { key: 'bamboozler_14_mk2', name: '14式竹筒銃・乙', src: './icons/weapon-main/charger/14式竹筒銃・乙.png', width: 30, height: 30 },
      { key: 'soytuber', name: 'ソイチューバー', src: './icons/weapon-main/charger/ソイチューバー.png', width: 30, height: 30 },
      { key: 'soytuber_custom', name: 'ソイチューバーカスタム', src: './icons/weapon-main/charger/ソイチューバーカスタム.png', width: 30, height: 30 },
      { key: 'rpen_5b', name: 'R-PEN／5B', src: './icons/weapon-main/charger/R-PEN／5B.png', width: 30, height: 30 },
      { key: 'rpen_5h', name: 'R-PEN／5H', src: './icons/weapon-main/charger/R-PEN／5H.png', width: 30, height: 30 },
    ]
  },
  'slosher': {
    displayName: 'スロッシャー',
    weapons: [
      { key: 'bucket_slosher', name: 'バケットスロッシャー', src: './icons/weapon-main/slosher/バケットスロッシャー.png', width: 30, height: 30 },
      { key: 'bucket_slosher_deco', name: 'バケットスロッシャーデコ', src: './icons/weapon-main/slosher/バケットスロッシャーデコ.png', width: 30, height: 30 },
      { key: 'hissen', name: 'ヒッセン', src: './icons/weapon-main/slosher/ヒッセン.png', width: 30, height: 30 },
      { key: 'hissen_hue', name: 'ヒッセン・ヒュー', src: './icons/weapon-main/slosher/ヒッセン・ヒュー.png', width: 30, height: 30 },
      { key: 'screw_slosher', name: 'スクリュースロッシャー', src: './icons/weapon-main/slosher/スクリュースロッシャー.png', width: 30, height: 30 },
      { key: 'screw_slosher_neo', name: 'スクリュースロッシャーネオ', src: './icons/weapon-main/slosher/スクリュースロッシャーネオ.png', width: 30, height: 30 },
      { key: 'explosher', name: 'エクスプロッシャー', src: './icons/weapon-main/slosher/エクスプロッシャー.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'explosher_custom', name: 'エクスプロッシャーカスタム', src: './icons/weapon-main/slosher/エクスプロッシャーカスタム.png.webp', width: 30, height: 30 },
      { key: 'overflosher', name: 'オーバーフロッシャー', src: './icons/weapon-main/slosher/オーバーフロッシャー.png', width: 30, height: 30 },
      { key: 'overflosher_deco', name: 'オーバーフロッシャーデコ', src: './icons/weapon-main/slosher/オーバーフロッシャーデコ.png', width: 30, height: 30 },
      { key: 'mopplin', name: 'モップリン', src: './icons/weapon-main/slosher/モップリン.png', width: 30, height: 30 },
      { key: 'mopplin_d', name: 'モップリンD', src: './icons/weapon-main/slosher/モップリンD.png.webp', width: 30, height: 30 },
    ]
  },
  'spinner': {
    displayName: 'スピナー',
    weapons: [
      { key: 'splat_spinner', name: 'スプラスピナー', src: './icons/weapon-main/spinner/スプラスピナー.png', width: 30, height: 30 },
      { key: 'splat_spinner_collabo', name: 'スプラスピナーコラボ', src: './icons/weapon-main/spinner/スプラスピナーコラボ.png', width: 30, height: 30 },
      { key: 'barrel_spinner', name: 'バレルスピナー', src: './icons/weapon-main/spinner/バレルスピナー.png', width: 30, height: 30 },
      { key: 'barrel_spinner_deco', name: 'バレルスピナーデコ', src: './icons/weapon-main/spinner/バレルスピナーデコ.png', width: 30, height: 30 },
      { key: 'hydrant', name: 'ハイドラント', src: './icons/weapon-main/spinner/ハイドラント.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'hydrant_custom', name: 'ハイドラントカスタム', src: './icons/weapon-main/spinner/ハイドラントカスタム.png.webp', width: 30, height: 30 },
      { key: 'kugelschreiber', name: 'クーゲルシュライバー', src: './icons/weapon-main/spinner/クーゲルシュライバー.png', width: 30, height: 30 },
      { key: 'kugelschreiber_hue', name: 'クーゲルシュライバー・ヒュー', src: './icons/weapon-main/spinner/クーゲルシュライバー・ヒュー.png', width: 30, height: 30 },
      { key: 'nautilus_47', name: 'ノーチラス47', src: './icons/weapon-main/spinner/ノーチラス47.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'nautilus_79', name: 'ノーチラス79', src: './icons/weapon-main/spinner/ノーチラス79.png.webp', width: 30, height: 30 },
      { key: 'examiner', name: 'イグザミナー', src: './icons/weapon-main/spinner/イグザミナー.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'examiner_hue', name: 'イグザミナー・ヒュー', src: './icons/weapon-main/spinner/イグザミナー・ヒュー.png.webp', width: 30, height: 30 },
    ]
  },
  'burster': {
    displayName: 'ブラスター',
    weapons: [
      { key: 'nova_blaster', name: 'ノヴァブラスター', src: './icons/weapon-main/burster/ノヴァブラスター.png', width: 30, height: 30 },
      { key: 'nova_blaster_neo', name: 'ノヴァブラスターネオ', src: './icons/weapon-main/burster/ノヴァブラスターネオ.png', width: 30, height: 30 },
      { key: 'hot_blaster', name: 'ホットブラスター', src: './icons/weapon-main/burster/ホットブラスター.png', width: 30, height: 30 },
      { key: 'hot_blaster_custom', name: 'ホットブラスターカスタム', src: './icons/weapon-main/burster/ホットブラスターカスタム.png', width: 30, height: 30 },
      { key: 'long_blaster', name: 'ロングブラスター', src: './icons/weapon-main/burster/ロングブラスター.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'long_blaster_custom', name: 'ロングブラスターカスタム', src: './icons/weapon-main/burster/ロングブラスターカスタム.png.webp', width: 30, height: 30 },
      { key: 'clash_blaster', name: 'クラッシュブラスター', src: './icons/weapon-main/burster/クラッシュブラスター.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'clash_blaster_neo', name: 'クラッシュブラスターネオ', src: './icons/weapon-main/burster/クラッシュブラスターネオ.png.webp', width: 30, height: 30 },
      { key: 'rapid_blaster', name: 'ラピッドブラスター', src: './icons/weapon-main/burster/ラピッドブラスター.png', width: 30, height: 30 }, // PNGが存在すると仮定
      { key: 'rapid_blaster_deco', name: 'ラピッドブラスターデコ', src: './icons/weapon-main/burster/ラピッドブラスターデコ.png.webp', width: 30, height: 30 },
      { key: 'r_blaster_elite', name: 'Rブラスターエリート', src: './icons/weapon-main/burster/Rブラスターエリート.png', width: 30, height: 30 },
      { key: 'r_blaster_elite_deco', name: 'Rブラスターエリートデコ', src: './icons/weapon-main/burster/Rブラスターエリートデコ.png', width: 30, height: 30 },
      { key: 's_blast92', name: 'S-BLAST92', src: './icons/weapon-main/burster/S-BLAST92.png', width: 30, height: 30 },
      { key: 's_blast91', name: 'S-BLAST91', src: './icons/weapon-main/burster/S-BLAST91.png', width: 30, height: 30 },
    ]
  },
  'brella': {
    displayName: 'シェルター',
    weapons: [
      { key: 'parashelter', name: 'パラシェルター', src: './icons/weapon-main/brella/パラシェルター.png', width: 30, height: 30 },
      { key: 'parashelter_sorella', name: 'パラシェルターソレーラ', src: './icons/weapon-main/brella/パラシェルターソレーラ.png', width: 30, height: 30 },
      { key: 'camping_shelter', name: 'キャンピングシェルター', src: './icons/weapon-main/brella/キャンピングシェルター.png', width: 30, height: 30 },
      { key: 'camping_shelter_sorella', name: 'キャンピングシェルターソレーラ', src: './icons/weapon-main/brella/キャンピングシェルターソレーラ.png', width: 30, height: 30 },
      { key: 'spy_gadget', name: 'スパイガジェット', src: './icons/weapon-main/brella/スパイガジェット.png', width: 30, height: 30 },
      { key: 'spy_gadget_sorella', name: 'スパイガジェットソレーラ', src: './icons/weapon-main/brella/スパイガジェットソレーラ.png', width: 30, height: 30 },
      { key: 'brella_24_mk1', name: '24式張替傘・甲', src: './icons/weapon-main/brella/24式張替傘・甲.png', width: 30, height: 30 },
      { key: 'brella_24_mk2', name: '24式張替傘・乙', src: './icons/weapon-main/brella/24式張替傘・乙.png.webp', width: 30, height: 30 },
    ]
  },
  'brush': {
    displayName: 'フデ',
    weapons: [
      { key: 'pablo', name: 'パブロ', src: './icons/weapon-main/brush/パブロ.png', width: 30, height: 30 },
      { key: 'pablo_hue', name: 'パブロ・ヒュー', src: './icons/weapon-main/brush/パブロ・ヒュー.png', width: 30, height: 30 },
      { key: 'hokusai', name: 'ホクサイ', src: './icons/weapon-main/brush/ホクサイ.png', width: 30, height: 30 },
      { key: 'hokusai_hue', name: 'ホクサイ・ヒュー', src: './icons/weapon-main/brush/ホクサイ・ヒュー.png', width: 30, height: 30 },
      { key: 'fincent', name: 'フィンセント', src: './icons/weapon-main/brush/フィンセント.png', width: 30, height: 30 },
      { key: 'fincent_hue', name: 'フィンセント・ヒュー', src: './icons/weapon-main/brush/フィンセント・ヒュー.png', width: 30, height: 30 },
    ]
  },
  'dualies': {
    displayName: 'マニューバー',
    weapons: [
      { key: 'splat_dualies', name: 'スプラマニューバー', src: './icons/weapon-main/dualies/スプラマニューバー.png', width: 30, height: 30 },
      { key: 'splat_dualies_collabo', name: 'スプラマニューバーコラボ', src: './icons/weapon-main/dualies/スプラマニューバーコラボ.png', width: 30, height: 30 },
      { key: 'kelvin_525', name: 'ケルビン525', src: './icons/weapon-main/dualies/ケルビン525.png', width: 30, height: 30 },
      { key: 'kelvin_525_deco', name: 'ケルビン525デコ', src: './icons/weapon-main/dualies/ケルビン525デコ.png.webp', width: 30, height: 30 },
      { key: 'dual_sweeper', name: 'デュアルスイーパー', src: './icons/weapon-main/dualies/デュアルスイーパー.png', width: 30, height: 30 },
      { key: 'dual_sweeper_custom', name: 'デュアルスイーパーカスタム', src: './icons/weapon-main/dualies/デュアルスイーパーカスタム.png', width: 30, height: 30 },
      { key: 'quad_hopper_black', name: 'クアッドホッパーブラック', src: './icons/weapon-main/dualies/クアッドホッパーブラック.png', width: 30, height: 30 },
      { key: 'quad_hopper_white', name: 'クアッドホッパーホワイト', src: './icons/weapon-main/dualies/クアッドホッパーホワイト.png', width: 30, height: 30 },
      { key: 'splatter_hue', name: 'スパッタリー・ヒュー', src: './icons/weapon-main/dualies/スパッタリー・ヒュー.png', width: 30, height: 30 },
      { key: 'splatter', name: 'スパッタリー', src: './icons/weapon-main/dualies/スパッタリー.png', width: 30, height: 30 },
      { key: 'gaen_ff', name: 'ガエンFF', src: './icons/weapon-main/dualies/ガエンFF.png.webp', width: 30, height: 30 },
      { key: 'gaen_ff_custom', name: 'ガエンFFカスタム', src: './icons/weapon-main/dualies/ガエンFFカスタム.png.webp', width: 30, height: 30 },
    ]
  },
  'stringer': {
    displayName: 'ストリンガー',
    weapons: [
      { key: 'tristringer', name: 'トライストリンガー', src: './icons/weapon-main/stringer/トライストリンガー.png', width: 30, height: 30 },
      { key: 'tristringer_collabo', name: 'トライストリンガーコラボ', src: './icons/weapon-main/stringer/トライストリンガーコラボ.png', width: 30, height: 30 },
      { key: 'lact_450', name: 'LACT-450', src: './icons/weapon-main/stringer/LACT-450.png', width: 30, height: 30 },
      { key: 'lact_450_deco', name: 'LACT-450デコ', src: './icons/weapon-main/stringer/LACT-450デコ.png', width: 30, height: 30 },
      { key: 'fluid_v', name: 'フルイドV', src: './icons/weapon-main/stringer/フルイドV.png.webp', width: 30, height: 30 },
      { key: 'fluid_v_custom', name: 'フルイドVカスタム', src: './icons/weapon-main/stringer/フルイドVカスタム.png.webp', width: 30, height: 30 },
    ]
  },
  'wiper': {
    displayName: 'ワイパー',
    weapons: [
      { key: 'drive_wiper', name: 'ドライブワイパー', src: './icons/weapon-main/wiper/ドライブワイパー.png', width: 30, height: 30 },
      { key: 'drive_wiper_deco', name: 'ドライブワイパーデコ', src: './icons/weapon-main/wiper/ドライブワイパーデコ.png', width: 30, height: 30 },
      { key: 'gym_wiper', name: 'ジムワイパー', src: './icons/weapon-main/wiper/ジムワイパー.png', width: 30, height: 30 },
      { key: 'gym_wiper_hue', name: 'ジムワイパー・ヒュー', src: './icons/weapon-main/wiper/ジムワイパー・ヒュー.png', width: 30, height: 30 },
      { key: 'dental_wiper_sumi', name: 'デンタルワイパースミ', src: './icons/weapon-main/wiper/デンタルワイパースミ.png.webp', width: 30, height: 30 },
      { key: 'dental_wiper_mint', name: 'デンタルワイパーミント', src: './icons/weapon-main/wiper/デンタルワイパーミント.png.webp', width: 30, height: 30 },
    ]
  }
};

const SUB_WEAPON_DATA = [
  { key: 'curling_bomb', name: 'カーリングボム', src: './icons/weapon-sub/カーリングボム.webp', width: 25, height: 25 },
  { key: 'suction_bomb', name: 'キューバンボム', src: './icons/weapon-sub/キューバンボム.webp', width: 25, height: 25 },
  { key: 'quick_bomb', name: 'クイックボム', src: './icons/weapon-sub/クイックボム.webp', width: 25, height: 25 },
  { key: 'jump_beacon', name: 'ジャンプビーコン', src: './icons/weapon-sub/ジャンプビーコン.webp', width: 25, height: 25 },
  { key: 'splash_shield', name: 'スプラッシュシールド', src: './icons/weapon-sub/スプラッシュシールド.webp', width: 25, height: 25 },
  { key: 'splat_bomb', name: 'スプラッシュボム', src: './icons/weapon-sub/スプラッシュボム.webp', width: 25, height: 25 },
  { key: 'sprinkler', name: 'スプリンクラー', src: './icons/weapon-sub/スプリンクラー.webp', width: 25, height: 25 },
  { key: 'fizzy_bomb', name: 'タンサンボム', src: './icons/weapon-sub/タンサンボム.webp', width: 25, height: 25 },
  { key: 'ink_mine', name: 'トラップ', src: './icons/weapon-sub/トラップ.webp', width: 25, height: 25 },
  { key: 'torpedo', name: 'トーピード', src: './icons/weapon-sub/トーピード.webp', width: 25, height: 25 },
  { key: 'toxic_mist', name: 'ポイズンミスト', src: './icons/weapon-sub/ポイズンミスト.webp', width: 25, height: 25 },
  { key: 'point_sensor', name: 'ポイントセンサー', src: './icons/weapon-sub/ポイントセンサー.webp', width: 25, height: 25 },
  { key: 'angle_shooter', name: 'ラインマーカー', src: './icons/weapon-sub/ラインマーカー.webp', width: 25, height: 25 },
  { key: 'autobomb', name: 'ロボットボム', src: './icons/weapon-sub/ロボットボム.webp', width: 25, height: 25 }
];

const RULE_DATA = {
  'nb': { displayName: 'ナワバリ', icon: './icons/rule/ルール_ナワバリ.png' },
  'ar': { displayName: 'エリア', icon: './icons/rule/ルール_エリア.png' },
  'ya': { displayName: 'ヤグラ', icon: './icons/rule/ルール_ヤグラ.png' },
  'hk': { displayName: 'ホコ', icon: './icons/rule/ルール_ホコ.png' },
  'as': { displayName: 'アサリ', icon: './icons/rule/ルール_アサリ.png' }
};

let selectedRuleKey = 'nb'; // デフォルトで選択されるルールキー (ファイル末尾に合わせる)
let selectedMapKey = 'hirame'; // デフォルトで選択されるマップキー

const MAP_DATA = {
  'hirame': {
    displayName: 'ヒラメが丘団地',
    rules: {
      'nb': './maps/ヒラメが丘団地/hirame_nb.jpg',
      'ar': './maps/ヒラメが丘団地/hirame_ar.jpg',
      'ya': './maps/ヒラメが丘団地/hirame_ya.png',
      'hk': './maps/ヒラメが丘団地/hirame_hk.avif',
      'as': './maps/ヒラメが丘団地/hirame_as.avif'
    }
  },
  'ohyou': {
    displayName: 'オヒョウ海運',
    rules: {
      'nb': './maps/オヒョウ海運/ohyou_nb.avif',
      'ar': './maps/オヒョウ海運/ohyou_ar.avif',
      'ya': './maps/オヒョウ海運/ohyou_ya.avif',
      'hk': './maps/オヒョウ海運/ohyou_hk.jpg',
      'as': './maps/オヒョウ海運/ohyou_as.avif'
    }
  },
  'kajiki': {
    displayName: 'カジキ空港',
    rules: {
      'nb': './maps/カジキ空港/kajiki_nb.avif',
      'ar': './maps/カジキ空港/kajiki_ar.avif',
      'ya': './maps/カジキ空港/kajiki_ya.avif',
      'hk': './maps/カジキ空港/kajiki_hk.jpg',
      'as': './maps/カジキ空港/kajiki_as.jpg'
    }
  },
  'kinme': {
    displayName: 'キンメダイ美術館',
    rules: {
      'nb': './maps/キンメダイ美術館/kinme_nb.jpg',
      'ar': './maps/キンメダイ美術館/kinme_ar.jpg',
      'ya': './maps/キンメダイ美術館/kinme_ya.png',
      'hk': './maps/キンメダイ美術館/kinme_hk.jpg',
      'as': './maps/キンメダイ美術館/kinme_as.jpg'
    }
  },
  'kusaya': {
    displayName: 'クサヤ温泉',
    rules: {
      'nb': './maps/クサヤ温泉/kusaya_nb.avif',
      'ar': './maps/クサヤ温泉/kusaya_ar.avif',
      'ya': './maps/クサヤ温泉/kusaya_ya.jpg',
      'hk': './maps/クサヤ温泉/kusaya_hk.jpg',
      'as': './maps/クサヤ温泉/kusaya_as.avif'
    }
  },
  'konbu': {
    displayName: 'コンブトラック',
    rules: {
      'nb': './maps/コンブトラック/konbu_nb.avif',
      'ar': './maps/コンブトラック/konbu_ar.avif',
      'ya': './maps/コンブトラック/konbu_ya.jpg',
      'hk': './maps/コンブトラック/konbu_hk.avif',
      'as': './maps/コンブトラック/konbu_as.jpg'
    }
  },
  'gonzui': {
    displayName: 'ゴンズイ地区',
    rules: {
      'nb': './maps/ゴンズイ地区/gonzui_nb.avif',
      'ar': './maps/ゴンズイ地区/gonzui_ar.avif',
      'ya': './maps/ゴンズイ地区/gonzui_ya.avif',
      'hk': './maps/ゴンズイ地区/gonzui_hk.jpg',
      'as': './maps/ゴンズイ地区/gonzui_as.avif'
    }
  },
  'zatou': {
    displayName: 'ザトウマーケット',
    rules: {
      'nb': './maps/ザトウマーケット/zatou_nb.avif',
      'ar': './maps/ザトウマーケット/zatou_ar.avif',
      'ya': './maps/ザトウマーケット/zatou_ya.avif',
      'hk': './maps/ザトウマーケット/zatou_hk.avif',
      'as': './maps/ザトウマーケット/zatou_as.avif'
    }
  },
  'sumesi': {
    displayName: 'スメーシーワールド',
    rules: {
      'nb': './maps/スメーシーワールド/sumesi_nb.avif',
      'ar': './maps/スメーシーワールド/sumesi_ar.avif',
      'ya': './maps/スメーシーワールド/sumesi_ya.jpg',
      'hk': './maps/スメーシーワールド/sumesi_hk.webp',
      'as': './maps/スメーシーワールド/sumesi_as.avif'
    }
  },
  // 他のマップデータも同様に追加...
  // 以下、提供されたリストに基づいて追加 (一部省略、必要に応じて全件追加してください)
  'takaasi': { displayName: 'タカアシ経済特区', rules: { 'nb': './maps/タカアシ経済特区/takaasi_nb.avif', 'ar': './maps/タカアシ経済特区/takaasi_ar.avif', 'ya': './maps/タカアシ経済特区/takaasi_ya.jpg', 'hk': './maps/タカアシ経済特区/takaasi_hk.avif', 'as': './maps/タカアシ経済特区/takaasi_as.jpg' } },
  'tarapo': { displayName: 'タラポート', rules: { 'nb': './maps/タラポート/tarapo_nb.avif', 'ar': './maps/タラポート/tarapo_ar.avif', 'ya': './maps/タラポート/tarapo_ya.avif', 'hk': './maps/タラポート/tarapo_hk.jpg', 'as': './maps/タラポート/tarapo_as.jpg' } },
  'tyouzame': { displayName: 'チョウザメ造船', rules: { 'nb': './maps/チョウザメ造船/tyouzame_nb.jpg', 'ar': './maps/チョウザメ造船/tyouzame_ar.avif', 'ya': './maps/チョウザメ造船/tyouzame_ya.avif', 'hk': './maps/チョウザメ造船/tyouzame_hk.avif', 'as': './maps/チョウザメ造船/tyouzame_as.avif' } },
  'namerou': { displayName: 'ナメロウ金属', rules: { 'nb': './maps/ナメロウ金属/namerou_nb.webp', 'ar': './maps/ナメロウ金属/namerou_ar.avif', 'ya': './maps/ナメロウ金属/namerou_ya.avif', 'hk': './maps/ナメロウ金属/namerou_hk.jpg', 'as': './maps/ナメロウ金属/namerou_as.webp' } },
  'nanpura': { displayName: 'ナンプラー遺跡', rules: { 'nb': './maps/ナンプラー遺跡/nanpura-_nb.avif', 'ar': './maps/ナンプラー遺跡/nanpura-_ar.avif', 'ya': './maps/ナンプラー遺跡/nanpura-_ya.avif', 'hk': './maps/ナンプラー遺跡/nanpura-_hk.jpg', 'as': './maps/ナンプラー遺跡/nanpura-_as.jpg' } }, // ファイル名注意: nanpura-
  'negitoro': { displayName: 'ネギトロ炭鉱', rules: { 'nb': './maps/ネギトロ炭鉱/negitoro_nb.avif', 'ar': './maps/ネギトロ炭鉱/negitoro_ar.avif', 'ya': './maps/ネギトロ炭鉱/negitoro_ya.avif', 'hk': './maps/ネギトロ炭鉱/negitoro_hk.avif', 'as': './maps/ネギトロ炭鉱/negitoro_as.avif' } },
  'baigai': { displayName: 'バイガイ亭', rules: { 'nb': './maps/バイガイ亭/baigai_nb.avif', 'ar': './maps/バイガイ亭/baigai_ar.avif', 'ya': './maps/バイガイ亭/baigai_ya.avif', 'hk': './maps/バイガイ亭/baigai_hk.avif', 'as': './maps/バイガイ亭/baigai_as.avif' } },
  'masaba': { displayName: 'マサバ海峡大橋', rules: { 'nb': './maps/マサバ海峡大橋/masaba_nb.avif', 'ar': './maps/マサバ海峡大橋/masaba_ar.avif', 'ya': './maps/マサバ海峡大橋/masaba_ya.avif', 'hk': './maps/マサバ海峡大橋/masaba_hk.jpg', 'as': './maps/マサバ海峡大橋/masaba_as.avif' } },
  'mategai': { displayName: 'マテガイ放水路', rules: { 'nb': './maps/マテガイ放水路/mategai_nb.avif', 'ar': './maps/マテガイ放水路/mategai_ar.avif', 'ya': './maps/マテガイ放水路/mategai_ya.jpg', 'hk': './maps/マテガイ放水路/mategai_hk.avif', 'as': './maps/マテガイ放水路/mategai_as.avif' } },
  'mahimahi': { displayName: 'マヒマヒリゾート＆スパ', rules: { 'nb': './maps/マヒマヒリゾート＆スパ/mahimahi_nb.avif', 'ar': './maps/マヒマヒリゾート＆スパ/mahimahi_ar.avif', 'ya': './maps/マヒマヒリゾート＆スパ/mahimahi_ya.avif', 'hk': './maps/マヒマヒリゾート＆スパ/mahimahi_hk.avif', 'as': './maps/マヒマヒリゾート＆スパ/mahimahi_as.jpg' } },
  'manta': { displayName: 'マンタマリア号', rules: { 'nb': './maps/マンタマリア号/manta_nb.avif', 'ar': './maps/マンタマリア号/manta_ar.avif', 'ya': './maps/マンタマリア号/manta_ya.jpg', 'hk': './maps/マンタマリア号/manta_hk.avif', 'as': './maps/マンタマリア号/manta_as.avif' } },
  'yagara': { displayName: 'ヤガラ市場', rules: { 'nb': './maps/ヤガラ市場/yagara_nb.avif', 'ar': './maps/ヤガラ市場/yagara_ar.avif', 'ya': './maps/ヤガラ市場/yagara_ya.png', 'hk': './maps/ヤガラ市場/yagara_hk.jpg', 'as': './maps/ヤガラ市場/yagara_as.avif' } },
  'yunohana': { displayName: 'ユノハナ大渓谷', rules: { 'nb': './maps/ユノハナ大渓谷/yunohana_nb.jpg', 'ar': './maps/ユノハナ大渓谷/yunohana_ar.avif', 'ya': './maps/ユノハナ大渓谷/yunohana_ya.png', 'hk': './maps/ユノハナ大渓谷/yunohana_hk.avif', 'as': './maps/ユノハナ大渓谷/yunohana_as.avif' } },
  'ryuuguu': { displayName: 'リュウグウターミナル', rules: { 'nb': './maps/リュウグウターミナル/ryuuguu_nb.avif', 'ar': './maps/リュウグウターミナル/ryuuguu_ar.webp', 'ya': './maps/リュウグウターミナル/ryuuguu_ya.jpg', 'hk': './maps/リュウグウターミナル/ryuuguu_hk.webp', 'as': './maps/リュウグウターミナル/ryuuguu_as.avif' } },
  'amabi': { displayName: '海女美術大学', rules: { 'nb': './maps/海女美術大学/amabi_nb.avif', 'ar': './maps/海女美術大学/amabi_ar.avif', 'ya': './maps/海女美術大学/amabi_ya.avif', 'hk': './maps/海女美術大学/amabi_hk.avif', 'as': './maps/海女美術大学/amabi_as.avif' } }
};

const SPECIAL_WEAPON_DATA = [
  { key: 'amefurashi', name: 'アメフラシ', src: './icons/special/アメフラシ.webp', width: 30, height: 30 },
  { key: 'ultrashot', name: 'ウルトラショット', src: './icons/special/ウルトラショット.webp', width: 30, height: 30 },
  { key: 'ultrachakuchi', name: 'ウルトラチャクチ', src: './icons/special/ウルトラチャクチ.webp', width: 30, height: 30 },
  { key: 'ultrahanko', name: 'ウルトラハンコ', src: './icons/special/ウルトラハンコ.webp', width: 30, height: 30 },
  { key: 'energy_stand', name: 'エナジースタンド', src: './icons/special/エナジースタンド.webp', width: 30, height: 30 },
  { key: 'kani_tank', name: 'カニタンク', src: './icons/special/カニタンク.webp', width: 30, height: 30 },
  { key: 'kyuinki', name: 'キューインキ', src: './icons/special/キューインキ.webp', width: 30, height: 30 },
  { key: 'great_barrier', name: 'グレートバリア', src: './icons/special/グレートバリア.webp', width: 30, height: 30 },
  { key: 'sameride', name: 'サメライド', src: './icons/special/サメライド.webp', width: 30, height: 30 },
  { key: 'shokuwander', name: 'ショクワンダー', src: './icons/special/ショクワンダー.webp', width: 30, height: 30 },
  { key: 'jetpack', name: 'ジェットパック', src: './icons/special/ジェットパック.webp', width: 30, height: 30 },
  { key: 'suminagasheet', name: 'スミナガシート', src: './icons/special/スミナガシート.webp', width: 30, height: 30 },
  { key: 'superchakuchi', name: 'スーパーチャクチ', src: './icons/special/スーパーチャクチ.webp', width: 30, height: 30 }, // Provided as スーパーチャクチ.webp
  { key: 'teioika', name: 'テイオウイカ', src: './icons/special/テイオウイカ.webp', width: 30, height: 30 },
  { key: 'decoychirashi', name: 'デコイチラシ', src: './icons/special/デコイチラシ.webp', width: 30, height: 30 },
  { key: 'triple_tornado', name: 'トリプルトルネード', src: './icons/special/トリプルトルネード.webp', width: 30, height: 30 },
  { key: 'nicedama', name: 'ナイスダマ', src: './icons/special/ナイスダマ.webp', width: 30, height: 30 },
  { key: 'hopsonar', name: 'ホップソナー', src: './icons/special/ホップソナー.webp', width: 30, height: 30 },
  { key: 'multi_missile', name: 'マルチミサイル', src: './icons/special/マルチミサイル.webp', width: 30, height: 30 },
  { key: 'megaphone_laser', name: 'メガホンレーザー5.1ch', src: './icons/special/メガホンレーザー5.1ch.webp', width: 30, height: 30 }
];

const GEAR_DATA = [
  { key: 'action_up', name: 'アクション強化', src: './icons/gia/アクション強化.webp', width: 28, height: 28 },
  { key: 'ika_dash_up', name: 'イカダッシュ速度アップ', src: './icons/gia/イカダッシュ速度アップ.webp', width: 28, height: 28 },
  { key: 'ika_ninja', name: 'イカニンジャ', src: './icons/gia/イカニンジャ.webp', width: 28, height: 28 },
  { key: 'ink_eff_sub', name: 'インク効率アップ(サブ)', src: './icons/gia/インク効率アップ(サブ).webp', width: 28, height: 28 },
  { key: 'ink_eff_main', name: 'インク効率アップ(メイン)', src: './icons/gia/インク効率アップ(メイン).webp', width: 28, height: 28 },
  { key: 'ink_recovery_up', name: 'インク回復力アップ', src: './icons/gia/インク回復力アップ.webp', width: 28, height: 28 },
  { key: 'comeback', name: 'カムバック', src: './icons/gia/カムバック.webp', width: 28, height: 28 },
  // { key: 'gear_placeholder', name: 'ギア(プレースホルダ?)', src: './icons/gia/ギア.png.webp', width: 28, height: 28 }, // ファイル名が汎用的すぎるため一旦コメントアウト
  { key: 'sub_impact_reduction', name: 'サブ影響軽減', src: './icons/gia/サブ影響軽減.webp', width: 28, height: 28 },
  { key: 'sub_performance_up', name: 'サブ性能アップ', src: './icons/gia/サブ性能アップ.webp', width: 28, height: 28 },
  { key: 'thermal_ink', name: 'サーマルインク', src: './icons/gia/サーマルインク.webp', width: 28, height: 28 },
  { key: 'start_dash', name: 'スタートダッシュ', src: './icons/gia/スタートダッシュ.webp', width: 28, height: 28 },
  { key: 'stealth_jump', name: 'ステルスジャンプ', src: './icons/gia/ステルスジャンプ.webp', width: 28, height: 28 },
  { key: 'special_charge_up', name: 'スペシャル増加量アップ', src: './icons/gia/スペシャル増加量アップ.webp', width: 28, height: 28 },
  { key: 'special_performance_up', name: 'スペシャル性能アップ', src: './icons/gia/スペシャル性能アップ.webp', width: 28, height: 28 },
  { key: 'special_saver', name: 'スペシャル減少量ダウン', src: './icons/gia/スペシャル減少量ダウン.webp', width: 28, height: 28 },
  { key: 'super_jump_time_shorten', name: 'スーパージャンプ時間短縮', src: './icons/gia/スーパージャンプ時間短縮.webp', width: 28, height: 28 },
  { key: 'human_speed_up', name: 'ヒト移動速度アップ', src: './icons/gia/ヒト移動速度アップ.webp', width: 28, height: 28 },
  { key: 'last_spurt', name: 'ラストスパート', src: './icons/gia/ラストスパート.webp', width: 28, height: 28 },
  { key: 'revenge', name: 'リベンジ', src: './icons/gia/リベンジ.webp', width: 28, height: 28 },
  { key: 'ukemi', name: '受け身術', src: './icons/gia/受け身術.webp', width: 28, height: 28 },
  { key: 'object_damage_up', name: '対物攻撃力アップ', src: './icons/gia/対物攻撃力アップ.webp', width: 28, height: 28 },
  { key: 'respawn_penalty_up', name: '復活ペナルティアップ', src: './icons/gia/復活ペナルティアップ.webp', width: 28, height: 28 },
  { key: 'respawn_time_shorten', name: '復活時間短縮', src: './icons/gia/復活時間短縮.webp', width: 28, height: 28 },
  { key: 'opponent_ink_reduction', name: '相手インク影響軽減', src: './icons/gia/相手インク影響軽減.webp', width: 28, height: 28 }
];
