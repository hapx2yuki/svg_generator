// DOM要素の取得
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const svgPreview = document.getElementById('svgPreview');
const sizeSlider = document.getElementById('sizeSlider');
const sizeDisplay = document.getElementById('sizeDisplay');
const colorPicker = document.getElementById('colorPicker');
const downloadSvgBtn = document.getElementById('downloadSvgBtn');
const copySvgBtn = document.getElementById('copySvgBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const svgCode = document.getElementById('svgCode');
const actionsSection = document.getElementById('actionsSection');
const codeSection = document.getElementById('codeSection');

let currentSvg = null;
let currentPrompt = '';

// Featherアイコンスタイルに基づいてSVG要素を生成する関数
function generateFeatherStyleIcon(prompt) {
    const promptLower = prompt.toLowerCase();
    const elements = [];
    
    // Featherアイコンの基本設定
    const strokeWidth = 2;
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
        default:
            svgElement = '';
    }
    
    return svgElement;
}

// SVGを生成
function generateSvg(prompt, size, color) {
    const iconData = generateFeatherStyleIcon(prompt);
    
    const elements = iconData.elements.map(element => {
        return '            ' + createSvgElement(element);
    }).join('\n');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
         width="${size}" 
         height="${size}" 
         viewBox="${iconData.viewBox}" 
         fill="none" 
         stroke="${color}" 
         stroke-width="${iconData.strokeWidth}" 
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

// イベントリスナー
generateBtn.addEventListener('click', () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
        alert('アイコンの説明を入力してください');
        return;
    }
    
    currentPrompt = prompt;
    const size = parseInt(sizeSlider.value);
    const color = colorPicker.value;
    
    currentSvg = generateSvg(prompt, size, color);
    displaySvg(currentSvg);
});

// サイズ変更
sizeSlider.addEventListener('input', (e) => {
    const size = e.target.value;
    sizeDisplay.textContent = `${size}px`;
    
    if (currentSvg && currentPrompt) {
        const color = colorPicker.value;
        currentSvg = generateSvg(currentPrompt, size, color);
        displaySvg(currentSvg);
    }
});

// 色変更
colorPicker.addEventListener('input', (e) => {
    if (currentSvg && currentPrompt) {
        const size = parseInt(sizeSlider.value);
        const color = e.target.value;
        currentSvg = generateSvg(currentPrompt, size, color);
        displaySvg(currentSvg);
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
        const size = parseInt(sizeSlider.value);
        const color = colorPicker.value;
        currentSvg = generateSvg(currentPrompt, size, color);
        displaySvg(currentSvg);
    }
});

// Enterキーで生成
promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateBtn.click();
    }
});