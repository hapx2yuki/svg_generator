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

// プロンプト解析エンジン - テキストから特徴を抽出
function analyzePrompt(prompt) {
    const text = prompt.toLowerCase();
    const analysis = {
        mainShape: 'unknown',
        features: [],
        bodyParts: [],
        attributes: [],
        complexity: 1,
        category: 'abstract'
    };
    
    // カテゴリ判定
    if (text.match(/動物|animal|猫|犬|鳥|魚|モルモット|うさぎ|恐竜/)) {
        analysis.category = 'animal';
    } else if (text.match(/人|person|忍者|ninja|人間|男|女/)) {
        analysis.category = 'human';
    } else if (text.match(/道具|tool|剣|sword|弓|bow|杖|wand|武器/)) {
        analysis.category = 'tool';
    } else if (text.match(/建物|building|城|castle|家|house|tower/)) {
        analysis.category = 'building';
    } else if (text.match(/乗り物|vehicle|車|car|船|ship|飛行機/)) {
        analysis.category = 'vehicle';
    } else if (text.match(/自然|nature|木|tree|花|flower|山|mountain/)) {
        analysis.category = 'nature';
    }
    
    // 基本形状
    if (text.match(/丸|円|circle|round/)) analysis.mainShape = 'circle';
    else if (text.match(/四角|square|box|rectangle/)) analysis.mainShape = 'rectangle';
    else if (text.match(/三角|triangle/)) analysis.mainShape = 'triangle';
    else if (text.match(/長い|long|細い|thin|棒/)) analysis.mainShape = 'line';
    else if (text.match(/楕円|oval|egg/)) analysis.mainShape = 'ellipse';
    
    // 体の部位（動物・人間用）
    if (text.match(/頭|head/)) analysis.bodyParts.push('head');
    if (text.match(/体|body|胴体/)) analysis.bodyParts.push('body');
    if (text.match(/足|leg|脚/)) analysis.bodyParts.push('legs');
    if (text.match(/腕|arm|手/)) analysis.bodyParts.push('arms');
    if (text.match(/尻尾|tail|しっぽ/)) analysis.bodyParts.push('tail');
    if (text.match(/耳|ear/)) analysis.bodyParts.push('ears');
    if (text.match(/目|eye/)) analysis.bodyParts.push('eyes');
    if (text.match(/鼻|nose/)) analysis.bodyParts.push('nose');
    if (text.match(/口|mouth/)) analysis.bodyParts.push('mouth');
    if (text.match(/翼|wing|羽/)) analysis.bodyParts.push('wings');
    
    // 特徴
    if (text.match(/大きい|big|large/)) analysis.features.push('large');
    if (text.match(/小さい|small|tiny/)) analysis.features.push('small');
    if (text.match(/とがった|sharp|pointed/)) analysis.features.push('sharp');
    if (text.match(/曲がった|curved|bend/)) analysis.features.push('curved');
    if (text.match(/複雑|complex|detailed/)) analysis.complexity = 3;
    else if (text.match(/シンプル|simple|basic/)) analysis.complexity = 1;
    else analysis.complexity = 2;
    
    return analysis;
}

// 動的形状生成器 - 解析結果から基本形状を生成
function generateBasicShapes(analysis, prompt) {
    const shapes = [];
    const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // メイン形状を決定
    let mainX = 12, mainY = 12, mainSize = 6;
    
    switch (analysis.category) {
        case 'animal':
            shapes.push(...generateAnimalShape(analysis, hash));
            break;
        case 'human':
            shapes.push(...generateHumanShape(analysis, hash));
            break;
        case 'tool':
            shapes.push(...generateToolShape(analysis, hash));
            break;
        case 'building':
            shapes.push(...generateBuildingShape(analysis, hash));
            break;
        case 'vehicle':
            shapes.push(...generateVehicleShape(analysis, hash));
            break;
        case 'nature':
            shapes.push(...generateNatureShape(analysis, hash));
            break;
        default:
            shapes.push(...generateAbstractShape(analysis, hash));
    }
    
    return shapes;
}

// 動物形状生成
function generateAnimalShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 10;
    
    // 基本的な動物の構造：頭 + 体 + 足
    // 頭
    const headSize = 3 + (variation % 3);
    shapes.push({
        type: 'circle',
        cx: 12,
        cy: 8,
        r: headSize
    });
    
    // 体
    const bodyWidth = 5 + (variation % 4);
    const bodyHeight = 3 + (variation % 3);
    shapes.push({
        type: 'ellipse',
        cx: 12,
        cy: 15,
        rx: bodyWidth,
        ry: bodyHeight
    });
    
    // 耳
    if (analysis.bodyParts.includes('ears') || hash % 3 === 0) {
        const earSize = 1 + (variation % 2);
        shapes.push({
            type: 'circle',
            cx: 12 - headSize + 1,
            cy: 8 - headSize + 1,
            r: earSize
        });
        shapes.push({
            type: 'circle',
            cx: 12 + headSize - 1,
            cy: 8 - headSize + 1,
            r: earSize
        });
    }
    
    // 目
    shapes.push({
        type: 'circle',
        cx: 12 - 1.5,
        cy: 8,
        r: 0.5
    });
    shapes.push({
        type: 'circle',
        cx: 12 + 1.5,
        cy: 8,
        r: 0.5
    });
    
    // 鼻
    shapes.push({
        type: 'circle',
        cx: 12,
        cy: 8 + 1,
        r: 0.3
    });
    
    // 足
    if (analysis.bodyParts.includes('legs') || hash % 2 === 0) {
        const legY = 15 + bodyHeight + 2;
        shapes.push({
            type: 'circle',
            cx: 12 - 2,
            cy: legY,
            r: 1
        });
        shapes.push({
            type: 'circle',
            cx: 12 + 2,
            cy: legY,
            r: 1
        });
    }
    
    // 尻尾
    if (analysis.bodyParts.includes('tail') || hash % 4 === 0) {
        const tailStartX = 12 + bodyWidth;
        const tailEndX = tailStartX + 3 + (variation % 3);
        const tailEndY = 15 + (variation % 4) - 2;
        shapes.push({
            type: 'path',
            d: `M${tailStartX} 15 Q${tailEndX} ${tailEndY} ${tailEndX - 1} ${tailEndY + 1}`
        });
    }
    
    return shapes;
}

// 人間形状生成
function generateHumanShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 8;
    
    // 頭
    shapes.push({
        type: 'circle',
        cx: 12,
        cy: 7,
        r: 3
    });
    
    // 体
    shapes.push({
        type: 'rect',
        x: 10,
        y: 10,
        width: 4,
        height: 8,
        rx: 1
    });
    
    // 腕
    if (analysis.bodyParts.includes('arms') || hash % 3 !== 0) {
        shapes.push({
            type: 'line',
            x1: 10,
            y1: 12,
            x2: 7 + (variation % 3),
            y2: 14 + (variation % 3)
        });
        shapes.push({
            type: 'line',
            x1: 14,
            y1: 12,
            x2: 17 - (variation % 3),
            y2: 14 + (variation % 3)
        });
    }
    
    // 脚
    if (analysis.bodyParts.includes('legs') || hash % 2 === 0) {
        shapes.push({
            type: 'line',
            x1: 11,
            y1: 18,
            x2: 9 + (variation % 2),
            y2: 22
        });
        shapes.push({
            type: 'line',
            x1: 13,
            y1: 18,
            x2: 15 - (variation % 2),
            y2: 22
        });
    }
    
    // 目
    shapes.push({
        type: 'line',
        x1: 10.5,
        y1: 6.5,
        x2: 11.5,
        y2: 6.5
    });
    shapes.push({
        type: 'line',
        x1: 12.5,
        y1: 6.5,
        x2: 13.5,
        y2: 6.5
    });
    
    return shapes;
}

// 道具形状生成
function generateToolShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 6;
    
    if (analysis.mainShape === 'line' || hash % 3 === 0) {
        // 棒状の道具（剣、杖など）
        const length = 16 + (variation % 4);
        shapes.push({
            type: 'line',
            x1: 12,
            y1: 4,
            x2: 12,
            y2: 4 + length
        });
        
        // 持ち手
        shapes.push({
            type: 'line',
            x1: 10,
            y1: 4 + length - 3,
            x2: 14,
            y2: 4 + length - 3
        });
        
        // 先端の装飾
        if (variation % 2 === 0) {
            shapes.push({
                type: 'polygon',
                points: `12 4 ${10 + variation % 3} ${6 + variation % 2} ${14 - variation % 3} ${6 + variation % 2}`
            });
        }
    } else {
        // その他の道具
        shapes.push({
            type: 'rect',
            x: 8,
            y: 8,
            width: 8,
            height: 6,
            rx: 1
        });
        
        // ハンドル
        shapes.push({
            type: 'line',
            x1: 12,
            y1: 14,
            x2: 12,
            y2: 18
        });
    }
    
    return shapes;
}

// 建物形状生成
function generateBuildingShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 5;
    const floors = 2 + (variation % 3);
    
    // 基礎
    shapes.push({
        type: 'rect',
        x: 6,
        y: 18,
        width: 12,
        height: 4
    });
    
    // メインビル
    for (let i = 0; i < floors; i++) {
        const floorY = 18 - (i + 1) * 4;
        const floorWidth = 10 - i;
        const floorX = 12 - floorWidth / 2;
        
        shapes.push({
            type: 'rect',
            x: floorX,
            y: floorY,
            width: floorWidth,
            height: 4
        });
    }
    
    // 屋根
    const roofY = 18 - floors * 4;
    shapes.push({
        type: 'polygon',
        points: `12 ${roofY - 3} ${7 + variation} ${roofY} ${17 - variation} ${roofY}`
    });
    
    // 窓
    for (let i = 0; i < floors; i++) {
        const windowY = 18 - (i + 1) * 4 + 1;
        shapes.push({
            type: 'rect',
            x: 10,
            y: windowY,
            width: 1,
            height: 1
        });
        shapes.push({
            type: 'rect',
            x: 13,
            y: windowY,
            width: 1,
            height: 1
        });
    }
    
    return shapes;
}

// 乗り物形状生成
function generateVehicleShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 4;
    
    // 車体
    shapes.push({
        type: 'rect',
        x: 6,
        y: 12,
        width: 12,
        height: 6,
        rx: 2
    });
    
    // 車輪
    shapes.push({
        type: 'circle',
        cx: 9,
        cy: 20,
        r: 2
    });
    shapes.push({
        type: 'circle',
        cx: 15,
        cy: 20,
        r: 2
    });
    
    // 窓
    shapes.push({
        type: 'rect',
        x: 8,
        y: 8,
        width: 8,
        height: 4,
        rx: 1
    });
    
    return shapes;
}

// 自然形状生成
function generateNatureShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 6;
    
    if (analysis.mainShape === 'circle') {
        // 花のような形
        const petalCount = 5 + (variation % 3);
        const centerX = 12, centerY = 12, radius = 4;
        
        for (let i = 0; i < petalCount; i++) {
            const angle = (i / petalCount) * Math.PI * 2;
            const petalX = centerX + Math.cos(angle) * radius;
            const petalY = centerY + Math.sin(angle) * radius;
            
            shapes.push({
                type: 'circle',
                cx: petalX,
                cy: petalY,
                r: 2
            });
        }
        
        // 中心
        shapes.push({
            type: 'circle',
            cx: centerX,
            cy: centerY,
            r: 1.5
        });
    } else {
        // 木のような形
        // 幹
        shapes.push({
            type: 'rect',
            x: 11,
            y: 14,
            width: 2,
            height: 8
        });
        
        // 葉
        shapes.push({
            type: 'circle',
            cx: 12,
            cy: 10,
            r: 6
        });
    }
    
    return shapes;
}

// 抽象形状生成
function generateAbstractShape(analysis, hash) {
    const shapes = [];
    const variation = hash % 8;
    const complexity = analysis.complexity;
    
    // 基本形状
    switch (analysis.mainShape) {
        case 'circle':
            shapes.push({
                type: 'circle',
                cx: 12,
                cy: 12,
                r: 6 + (variation % 4)
            });
            break;
        case 'rectangle':
            shapes.push({
                type: 'rect',
                x: 6 + (variation % 3),
                y: 6 + (variation % 3),
                width: 12 - (variation % 4),
                height: 12 - (variation % 4),
                rx: variation % 3
            });
            break;
        case 'triangle':
            shapes.push({
                type: 'polygon',
                points: `12 ${4 + variation % 3} ${6 + variation % 2} ${20 - variation % 3} ${18 - variation % 2} ${20 - variation % 3}`
            });
            break;
        default:
            // ランダムな多角形
            const sides = 3 + (complexity * 2) + (variation % 3);
            const points = [];
            for (let i = 0; i < sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const radius = 6 + (hash * (i + 1) % 4);
                const x = 12 + Math.cos(angle) * radius;
                const y = 12 + Math.sin(angle) * radius;
                points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
            }
            shapes.push({
                type: 'polygon',
                points: points.join(' ')
            });
    }
    
    // 複雑さに応じて追加要素
    if (complexity > 1) {
        // 装飾的な要素を追加
        for (let i = 0; i < complexity; i++) {
            const decorX = 12 + (hash * i % 8) - 4;
            const decorY = 12 + (hash * (i + 1) % 8) - 4;
            shapes.push({
                type: 'circle',
                cx: decorX,
                cy: decorY,
                r: 0.5 + (i % 2) * 0.5
            });
        }
    }
    
    return shapes;
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

// メインのSVG生成関数
function generateSvg(prompt, size, color, strokeWidth = 2) {
    // プロンプトを解析
    const analysis = analyzePrompt(prompt);
    
    // 解析結果に基づいて形状を生成
    const shapes = generateBasicShapes(analysis, prompt);
    
    const elements = shapes.map(shape => {
        return '            ' + createSvgElement(shape);
    }).join('\n');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" 
         width="${size}" 
         height="${size}" 
         viewBox="0 0 24 24" 
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

// イベントリスナー設定
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