// DOM要素の取得
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const svgPreview = document.getElementById('svgPreview');
const sizeSlider = document.getElementById('sizeSlider');
const sizeDisplay = document.getElementById('sizeDisplay');
const strokeSlider = document.getElementById('strokeSlider');
const strokeDisplay = document.getElementById('strokeDisplay');
const colorPicker = document.getElementById('colorPicker');
const downloadSvgBtn = document.getElementById('downloadSvgBtn');
const copySvgBtn = document.getElementById('copySvgBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const svgCode = document.getElementById('svgCode');
const actionsSection = document.getElementById('actionsSection');
const codeSection = document.getElementById('codeSection');

let currentSvg = null;
let currentPrompt = '';
let realtimeTimer = null;

// Featherアイコンスタイルに基づいてSVG要素を生成する関数
function generateFeatherStyleIcon(prompt, strokeWidth = 2) {
    const promptLower = prompt.toLowerCase();
    const elements = [];
    
    // Featherアイコンの基本設定
    const viewBox = '0 0 24 24';
    
    // キーワードに基づいてFeatherスタイルのSVG要素を生成
    if (promptLower.includes('ハート') || promptLower.includes('heart') || promptLower.includes('愛') || promptLower.includes('love')) {
        // FeatherのheartアイコンからSVGパス（より正確に）
        elements.push({
            type: 'path',
            d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
        });
    } else if (promptLower.includes('星') || promptLower.includes('star')) {
        // Featherのstarアイコン（polygon使用）
        elements.push({
            type: 'polygon',
            points: '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
        });
    } else if (promptLower.includes('家') || promptLower.includes('home') || promptLower.includes('ホーム') || promptLower.includes('house')) {
        // Featherのhomeアイコン
        elements.push({
            type: 'path',
            d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
        });
        elements.push({
            type: 'polyline',
            points: '9 22 9 12 15 12 15 22'
        });
    } else if (promptLower.includes('メール') || promptLower.includes('mail') || promptLower.includes('email') || promptLower.includes('封筒')) {
        // Featherのmailアイコン
        elements.push({
            type: 'path',
            d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'
        });
        elements.push({
            type: 'polyline',
            points: '22,6 12,13 2,6'
        });
    } else if (promptLower.includes('検索') || promptLower.includes('search') || promptLower.includes('虫眼鏡')) {
        // Featherのsearchアイコン
        elements.push({
            type: 'circle',
            cx: 11,
            cy: 11,
            r: 8
        });
        elements.push({
            type: 'line',
            x1: 21,
            y1: 21,
            x2: 16.65,
            y2: 16.65
        });
    } else if (promptLower.includes('設定') || promptLower.includes('gear') || promptLower.includes('歯車') || promptLower.includes('setting')) {
        // Featherのsettingsアイコン（簡略化版）
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 12,
            r: 3
        });
        elements.push({
            type: 'path',
            d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'
        });
    } else if (promptLower.includes('ユーザー') || promptLower.includes('user') || promptLower.includes('人') || promptLower.includes('person')) {
        // Featherのuserアイコン
        elements.push({
            type: 'path',
            d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
        });
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 7,
            r: 4
        });
    } else if (promptLower.includes('カート') || promptLower.includes('cart') || promptLower.includes('ショッピング') || promptLower.includes('買い物')) {
        // Featherのshopping-cartアイコン
        elements.push({
            type: 'circle',
            cx: 9,
            cy: 21,
            r: 1
        });
        elements.push({
            type: 'circle',
            cx: 20,
            cy: 21,
            r: 1
        });
        elements.push({
            type: 'path',
            d: 'M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'
        });
    } else if (promptLower.includes('チェック') || promptLower.includes('check') || promptLower.includes('完了') || promptLower.includes('ok')) {
        // Featherのcheckアイコン
        elements.push({
            type: 'polyline',
            points: '20 6 9 17 4 12'
        });
    } else if (promptLower.includes('×') || promptLower.includes('x') || promptLower.includes('閉じる') || promptLower.includes('close') || promptLower.includes('バツ')) {
        // FeatherのXアイコン
        elements.push({
            type: 'line',
            x1: 18,
            y1: 6,
            x2: 6,
            y2: 18
        });
        elements.push({
            type: 'line',
            x1: 6,
            y1: 6,
            x2: 18,
            y2: 18
        });
    } else if (promptLower.includes('プラス') || promptLower.includes('plus') || promptLower.includes('+') || promptLower.includes('追加')) {
        // Featherのplusアイコン
        elements.push({
            type: 'line',
            x1: 12,
            y1: 5,
            x2: 12,
            y2: 19
        });
        elements.push({
            type: 'line',
            x1: 5,
            y1: 12,
            x2: 19,
            y2: 12
        });
    } else if (promptLower.includes('矢印') || promptLower.includes('arrow')) {
        // Feather風の矢印
        if (promptLower.includes('左') || promptLower.includes('left')) {
            elements.push({
                type: 'line',
                x1: 19,
                y1: 12,
                x2: 5,
                y2: 12
            });
            elements.push({
                type: 'polyline',
                points: '12 19 5 12 12 5'
            });
        } else if (promptLower.includes('上') || promptLower.includes('up')) {
            elements.push({
                type: 'line',
                x1: 12,
                y1: 19,
                x2: 12,
                y2: 5
            });
            elements.push({
                type: 'polyline',
                points: '5 12 12 5 19 12'
            });
        } else if (promptLower.includes('下') || promptLower.includes('down')) {
            elements.push({
                type: 'line',
                x1: 12,
                y1: 5,
                x2: 12,
                y2: 19
            });
            elements.push({
                type: 'polyline',
                points: '19 12 12 19 5 12'
            });
        } else {
            // デフォルトは右矢印
            elements.push({
                type: 'line',
                x1: 5,
                y1: 12,
                x2: 19,
                y2: 12
            });
            elements.push({
                type: 'polyline',
                points: '12 5 19 12 12 19'
            });
        }
    } else if (promptLower.includes('円') || promptLower.includes('circle') || promptLower.includes('丸')) {
        // シンプルな円
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 12,
            r: 10
        });
    } else if (promptLower.includes('四角') || promptLower.includes('square') || promptLower.includes('正方形')) {
        // 四角形（rounded rect）
        elements.push({
            type: 'rect',
            x: 3,
            y: 3,
            width: 18,
            height: 18,
            rx: 2,
            ry: 2
        });
    } else if (promptLower.includes('三角') || promptLower.includes('triangle')) {
        // 三角形
        elements.push({
            type: 'polygon',
            points: '12 2 22 20 2 20'
        });
    } else if (promptLower.includes('電話') || promptLower.includes('phone') || promptLower.includes('call')) {
        // Featherのphoneアイコン風
        elements.push({
            type: 'path',
            d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
        });
    } else if (promptLower.includes('モルモット') || promptLower.includes('guinea pig') || promptLower.includes('hamster') || promptLower.includes('ハムスター')) {
        // モルモット/ハムスターのFeather風アイコン
        // 体（楕円形）
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 14,
            rx: 8,
            ry: 5
        });
        // 頭（円）
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 8,
            r: 4
        });
        // 左耳
        elements.push({
            type: 'circle',
            cx: 9.5,
            cy: 5.5,
            r: 1.5
        });
        // 右耳
        elements.push({
            type: 'circle',
            cx: 14.5,
            cy: 5.5,
            r: 1.5
        });
        // 左目
        elements.push({
            type: 'circle',
            cx: 10.5,
            cy: 7.5,
            r: 0.5
        });
        // 右目
        elements.push({
            type: 'circle',
            cx: 13.5,
            cy: 7.5,
            r: 0.5
        });
        // 鼻
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 9,
            r: 0.3
        });
        // 前足（左）
        elements.push({
            type: 'circle',
            cx: 8,
            cy: 17,
            r: 1
        });
        // 前足（右）
        elements.push({
            type: 'circle',
            cx: 16,
            cy: 17,
            r: 1
        });
    } else if (promptLower.includes('猫') || promptLower.includes('cat') || promptLower.includes('ネコ')) {
        // 猫のFeather風アイコン
        // 頭
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 10,
            r: 6
        });
        // 左耳
        elements.push({
            type: 'polygon',
            points: '8 6 10 2 12 6'
        });
        // 右耳
        elements.push({
            type: 'polygon',
            points: '12 6 14 2 16 6'
        });
        // 左目
        elements.push({
            type: 'circle',
            cx: 10,
            cy: 9,
            r: 0.8
        });
        // 右目
        elements.push({
            type: 'circle',
            cx: 14,
            cy: 9,
            r: 0.8
        });
        // 鼻
        elements.push({
            type: 'polygon',
            points: '12 11 11.5 12 12.5 12'
        });
        // 口
        elements.push({
            type: 'path',
            d: 'M10 13 Q12 15 14 13'
        });
        // 体
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 18,
            rx: 4,
            ry: 3
        });
        // しっぽ
        elements.push({
            type: 'path',
            d: 'M16 18 Q20 16 18 12'
        });
    } else if (promptLower.includes('犬') || promptLower.includes('dog') || promptLower.includes('イヌ')) {
        // 犬のFeather風アイコン
        // 頭
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 9,
            rx: 5,
            ry: 4
        });
        // 左耳
        elements.push({
            type: 'ellipse',
            cx: 8,
            cy: 6,
            rx: 2,
            ry: 3
        });
        // 右耳
        elements.push({
            type: 'ellipse',
            cx: 16,
            cy: 6,
            rx: 2,
            ry: 3
        });
        // 鼻
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 11,
            rx: 3,
            ry: 2
        });
        // 左目
        elements.push({
            type: 'circle',
            cx: 10,
            cy: 8,
            r: 0.8
        });
        // 右目
        elements.push({
            type: 'circle',
            cx: 14,
            cy: 8,
            r: 0.8
        });
        // 鼻の穴
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 11,
            r: 0.5
        });
        // 体
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 17,
            rx: 6,
            ry: 4
        });
        // しっぽ
        elements.push({
            type: 'path',
            d: 'M18 15 Q22 12 20 8'
        });
    } else if (promptLower.includes('うさぎ') || promptLower.includes('rabbit') || promptLower.includes('ウサギ')) {
        // うさぎのFeather風アイコン
        // 頭
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 12,
            r: 5
        });
        // 左耳
        elements.push({
            type: 'ellipse',
            cx: 9,
            cy: 4,
            rx: 1.5,
            ry: 4
        });
        // 右耳
        elements.push({
            type: 'ellipse',
            cx: 15,
            cy: 4,
            rx: 1.5,
            ry: 4
        });
        // 左目
        elements.push({
            type: 'circle',
            cx: 10,
            cy: 11,
            r: 0.8
        });
        // 右目
        elements.push({
            type: 'circle',
            cx: 14,
            cy: 11,
            r: 0.8
        });
        // 鼻
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 13,
            r: 0.3
        });
        // 口
        elements.push({
            type: 'path',
            d: 'M11 14 Q12 15 13 14'
        });
        // 体
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 19,
            rx: 4,
            ry: 3
        });
        // しっぽ
        elements.push({
            type: 'circle',
            cx: 16,
            cy: 19,
            r: 1
        });
    } else if (promptLower.includes('恐竜') || promptLower.includes('dinosaur') || promptLower.includes('ティラノ') || promptLower.includes('t-rex')) {
        // 恐竜のFeather風アイコン
        // 頭
        elements.push({
            type: 'ellipse',
            cx: 8,
            cy: 8,
            rx: 4,
            ry: 3
        });
        // 体
        elements.push({
            type: 'ellipse',
            cx: 15,
            cy: 12,
            rx: 6,
            ry: 4
        });
        // 尻尾
        elements.push({
            type: 'path',
            d: 'M21 12 Q24 10 22 6'
        });
        // 前足
        elements.push({
            type: 'line',
            x1: 11,
            y1: 15,
            x2: 10,
            y2: 19
        });
        // 後ろ足
        elements.push({
            type: 'line',
            x1: 17,
            y1: 15,
            x2: 16,
            y2: 20
        });
        // 首
        elements.push({
            type: 'line',
            x1: 8,
            y1: 11,
            x2: 11,
            y2: 9
        });
        // 目
        elements.push({
            type: 'circle',
            cx: 6,
            cy: 7,
            r: 0.5
        });
    } else if (promptLower.includes('忍者') || promptLower.includes('ninja') || promptLower.includes('手裏剣')) {
        // 忍者のFeather風アイコン
        // 頭（丸い）
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 7,
            r: 3
        });
        // 体
        elements.push({
            type: 'rect',
            x: 10,
            y: 10,
            width: 4,
            height: 8
        });
        // 腕（左）
        elements.push({
            type: 'line',
            x1: 10,
            y1: 12,
            x2: 7,
            y2: 14
        });
        // 腕（右）
        elements.push({
            type: 'line',
            x1: 14,
            y1: 12,
            x2: 17,
            y2: 14
        });
        // 脚（左）
        elements.push({
            type: 'line',
            x1: 11,
            y1: 18,
            x2: 9,
            y2: 22
        });
        // 脚（右）
        elements.push({
            type: 'line',
            x1: 13,
            y1: 18,
            x2: 15,
            y2: 22
        });
        // 目（スリット）
        elements.push({
            type: 'line',
            x1: 10.5,
            y1: 6.5,
            x2: 11.5,
            y2: 6.5
        });
        elements.push({
            type: 'line',
            x1: 12.5,
            y1: 6.5,
            x2: 13.5,
            y2: 6.5
        });
        // 手裏剣（手に持つ）
        elements.push({
            type: 'polygon',
            points: '6 13 7 14 6 15 5 14'
        });
    } else if (promptLower.includes('弓矢') || promptLower.includes('bow') || promptLower.includes('arrow') || promptLower.includes('弓')) {
        // 弓矢のFeather風アイコン
        // 弓の本体
        elements.push({
            type: 'path',
            d: 'M6 4 Q2 12 6 20'
        });
        // 弦
        elements.push({
            type: 'line',
            x1: 6,
            y1: 4,
            x2: 6,
            y2: 20
        });
        // 矢
        elements.push({
            type: 'line',
            x1: 6,
            y1: 12,
            x2: 20,
            y2: 12
        });
        // 矢じり
        elements.push({
            type: 'polygon',
            points: '20 12 18 10 18 11 17 11 17 13 18 13 18 14'
        });
        // 矢羽
        elements.push({
            type: 'polygon',
            points: '8 10 10 11 8 12 6 11'
        });
        elements.push({
            type: 'polygon',
            points: '8 12 10 13 8 14 6 13'
        });
    } else if (promptLower.includes('城') || promptLower.includes('castle') || promptLower.includes('お城')) {
        // 城のFeather風アイコン
        // 基盤
        elements.push({
            type: 'rect',
            x: 4,
            y: 16,
            width: 16,
            height: 6
        });
        // メインタワー
        elements.push({
            type: 'rect',
            x: 8,
            y: 8,
            width: 8,
            height: 8
        });
        // 左タワー
        elements.push({
            type: 'rect',
            x: 4,
            y: 12,
            width: 4,
            height: 4
        });
        // 右タワー
        elements.push({
            type: 'rect',
            x: 16,
            y: 12,
            width: 4,
            height: 4
        });
        // 屋根（中央）
        elements.push({
            type: 'polygon',
            points: '8 8 12 4 16 8'
        });
        // 旗
        elements.push({
            type: 'line',
            x1: 12,
            y1: 4,
            x2: 12,
            y2: 2
        });
        elements.push({
            type: 'polygon',
            points: '12 2 14 3 12 4'
        });
    } else if (promptLower.includes('剣') || promptLower.includes('sword') || promptLower.includes('刀')) {
        // 剣のFeather風アイコン
        // 刃
        elements.push({
            type: 'line',
            x1: 12,
            y1: 2,
            x2: 12,
            y2: 16
        });
        // 鍔（つば）
        elements.push({
            type: 'line',
            x1: 9,
            y1: 16,
            x2: 15,
            y2: 16
        });
        // 柄
        elements.push({
            type: 'line',
            x1: 12,
            y1: 16,
            x2: 12,
            y2: 20
        });
        // 柄頭
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 21,
            r: 1
        });
        // 刃の輪郭
        elements.push({
            type: 'line',
            x1: 11,
            y1: 3,
            x2: 12,
            y2: 2
        });
        elements.push({
            type: 'line',
            x1: 13,
            y1: 3,
            x2: 12,
            y2: 2
        });
    } else if (promptLower.includes('魔法') || promptLower.includes('magic') || promptLower.includes('杖') || promptLower.includes('wand')) {
        // 魔法杖のFeather風アイコン
        // 杖
        elements.push({
            type: 'line',
            x1: 6,
            y1: 20,
            x2: 18,
            y2: 8
        });
        // 先端の宝石
        elements.push({
            type: 'polygon',
            points: '18 8 20 6 18 4 16 6'
        });
        // 魔法のきらめき
        elements.push({
            type: 'line',
            x1: 15,
            y1: 5,
            x2: 17,
            y2: 3
        });
        elements.push({
            type: 'line',
            x1: 16,
            y1: 4,
            x2: 16,
            y2: 4
        });
        elements.push({
            type: 'line',
            x1: 20,
            y1: 8,
            x2: 22,
            y2: 6
        });
        elements.push({
            type: 'line',
            x1: 19,
            y1: 10,
            x2: 21,
            y2: 12
        });
    } else if (promptLower.includes('宇宙') || promptLower.includes('space') || promptLower.includes('惑星') || promptLower.includes('planet')) {
        // 宇宙・惑星のFeather風アイコン
        // 惑星
        elements.push({
            type: 'circle',
            cx: 12,
            cy: 12,
            r: 6
        });
        // 輪
        elements.push({
            type: 'ellipse',
            cx: 12,
            cy: 12,
            rx: 9,
            ry: 3
        });
        // 星（背景）
        elements.push({
            type: 'circle',
            cx: 6,
            cy: 6,
            r: 0.5
        });
        elements.push({
            type: 'circle',
            cx: 19,
            cy: 8,
            r: 0.5
        });
        elements.push({
            type: 'circle',
            cx: 20,
            cy: 16,
            r: 0.5
        });
        elements.push({
            type: 'circle',
            cx: 4,
            cy: 18,
            r: 0.5
        });
    } else if (promptLower.includes('ロボット') || promptLower.includes('robot') || promptLower.includes('機械')) {
        // ロボットのFeather風アイコン
        // 頭
        elements.push({
            type: 'rect',
            x: 9,
            y: 4,
            width: 6,
            height: 5,
            rx: 1
        });
        // 体
        elements.push({
            type: 'rect',
            x: 8,
            y: 9,
            width: 8,
            height: 8,
            rx: 1
        });
        // 腕（左）
        elements.push({
            type: 'rect',
            x: 5,
            y: 11,
            width: 3,
            height: 4,
            rx: 1
        });
        // 腕（右）
        elements.push({
            type: 'rect',
            x: 16,
            y: 11,
            width: 3,
            height: 4,
            rx: 1
        });
        // 脚（左）
        elements.push({
            type: 'rect',
            x: 9,
            y: 17,
            width: 2,
            height: 4,
            rx: 1
        });
        // 脚（右）
        elements.push({
            type: 'rect',
            x: 13,
            y: 17,
            width: 2,
            height: 4,
            rx: 1
        });
        // 目
        elements.push({
            type: 'circle',
            cx: 11,
            cy: 6,
            r: 0.5
        });
        elements.push({
            type: 'circle',
            cx: 13,
            cy: 6,
            r: 0.5
        });
        // アンテナ
        elements.push({
            type: 'line',
            x1: 10,
            y1: 4,
            x2: 10,
            y2: 2
        });
        elements.push({
            type: 'line',
            x1: 14,
            y1: 4,
            x2: 14,
            y2: 2
        });
        elements.push({
            type: 'circle',
            cx: 10,
            cy: 2,
            r: 0.5
        });
        elements.push({
            type: 'circle',
            cx: 14,
            cy: 2,
            r: 0.5
        });
    } else {
        // デフォルト: プロンプトから抽象的な図形を生成
        const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const shapeType = hash % 4;
        
        if (shapeType === 0) {
            // 円
            elements.push({
                type: 'circle',
                cx: 12,
                cy: 12,
                r: 8
            });
        } else if (shapeType === 1) {
            // 四角
            elements.push({
                type: 'rect',
                x: 4,
                y: 4,
                width: 16,
                height: 16,
                rx: 2
            });
        } else if (shapeType === 2) {
            // 三角
            elements.push({
                type: 'polygon',
                points: '12 3 21 19 3 19'
            });
        } else {
            // カスタム多角形
            const numSides = 3 + (hash % 4);
            const points = [];
            for (let i = 0; i < numSides; i++) {
                const angle = (i / numSides) * Math.PI * 2;
                const radius = 8;
                const x = 12 + Math.cos(angle) * radius;
                const y = 12 + Math.sin(angle) * radius;
                points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
            }
            elements.push({
                type: 'polygon',
                points: points.join(' ')
            });
        }
    }
    
    return {
        elements,
        viewBox,
        strokeWidth
    };
}

// SVGエレメントを生成
function createSvgElement(element) {
    const { type, ...attrs } = element;
    
    let svgElement = '';
    
    switch (type) {
        case 'circle':
            svgElement = `<circle cx="${attrs.cx}" cy="${attrs.cy}" r="${attrs.r}"/>`;
            break;
        case 'line':
            svgElement = `<line x1="${attrs.x1}" y1="${attrs.y1}" x2="${attrs.x2}" y2="${attrs.y2}"/>`;
            break;
        case 'path':
            svgElement = `<path d="${attrs.d}"/>`;
            break;
        case 'polyline':
            svgElement = `<polyline points="${attrs.points}"/>`;
            break;
        case 'polygon':
            svgElement = `<polygon points="${attrs.points}"/>`;
            break;
        case 'rect':
            const rx = attrs.rx ? ` rx="${attrs.rx}"` : '';
            const ry = attrs.ry ? ` ry="${attrs.ry}"` : '';
            svgElement = `<rect x="${attrs.x}" y="${attrs.y}" width="${attrs.width}" height="${attrs.height}"${rx}${ry}/>`;
            break;
        case 'ellipse':
            svgElement = `<ellipse cx="${attrs.cx}" cy="${attrs.cy}" rx="${attrs.rx}" ry="${attrs.ry}"/>`;
            break;
        default:
            svgElement = '';
    }
    
    return svgElement;
}

// SVGを生成
function generateSvg(prompt, size, color, strokeWidth = 2) {
    const iconData = generateFeatherStyleIcon(prompt, strokeWidth);
    
    const elements = iconData.elements.map(element => {
        return '            ' + createSvgElement(element);
    }).join('\n');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
         width="${size}" 
         height="${size}" 
         viewBox="${iconData.viewBox}" 
         fill="none" 
         stroke="${color}" 
         stroke-width="${strokeWidth}" 
         stroke-linecap="round" 
         stroke-linejoin="round">
${elements}
        </svg>`;
    
    return svg.trim();
}

// SVGを表示
function displaySvg(svg) {
    svgPreview.innerHTML = svg;
    svgCode.textContent = svg;
    actionsSection.classList.remove('hidden');
    codeSection.classList.remove('hidden');
}

// 元のイベントリスナーは下で統合されているため削除

// サイズ変更
sizeSlider.addEventListener('input', (e) => {
    const size = e.target.value;
    sizeDisplay.textContent = `${size}px`;
    
    if (currentPrompt) {
        generateRealtime();
    }
});

// 線の太さ変更
strokeSlider.addEventListener('input', (e) => {
    const strokeWidth = e.target.value;
    strokeDisplay.textContent = `${strokeWidth}px`;
    
    if (currentPrompt) {
        generateRealtime();
    }
});

// 色変更
colorPicker.addEventListener('input', (e) => {
    if (currentPrompt) {
        generateRealtime();
    }
});

// SVGダウンロード
downloadSvgBtn.addEventListener('click', () => {
    if (!currentSvg) return;
    
    const blob = new Blob([currentSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icon-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
});

// SVGコピー
copySvgBtn.addEventListener('click', async () => {
    if (!currentSvg) return;
    
    try {
        await navigator.clipboard.writeText(currentSvg);
        const originalText = copySvgBtn.textContent;
        copySvgBtn.textContent = 'コピーしました！';
        copySvgBtn.classList.add('bg-green-600');
        
        setTimeout(() => {
            copySvgBtn.textContent = originalText;
            copySvgBtn.classList.remove('bg-green-600');
        }, 2000);
    } catch (err) {
        alert('コピーに失敗しました');
    }
});

// 再生成
regenerateBtn.addEventListener('click', () => {
    if (currentPrompt) {
        generateRealtime();
    }
});

// リアルタイム生成関数
function generateRealtime() {
    const prompt = promptInput.value.trim();
    if (prompt.length > 0) {
        currentPrompt = prompt;
        const size = parseInt(sizeSlider.value);
        const color = colorPicker.value;
        const strokeWidth = parseFloat(strokeSlider.value);
        
        currentSvg = generateSvg(prompt, size, color, strokeWidth);
        displaySvg(currentSvg);
    } else {
        // 入力が空の場合はプレビューをクリア
        svgPreview.innerHTML = '<p class="text-gray-400">ここに生成されたアイコンが表示されます</p>';
        actionsSection.classList.add('hidden');
        codeSection.classList.add('hidden');
        currentSvg = null;
        currentPrompt = '';
    }
}

// リアルタイム入力検知
promptInput.addEventListener('input', (e) => {
    // デバウンス処理（300ms後に実行）
    clearTimeout(realtimeTimer);
    realtimeTimer = setTimeout(() => {
        generateRealtime();
    }, 300);
});

// Enterキーで即座に生成
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        clearTimeout(realtimeTimer);
        generateRealtime();
    }
});

// 生成ボタンは即座に実行
generateBtn.addEventListener('click', () => {
    clearTimeout(realtimeTimer);
    generateRealtime();
});