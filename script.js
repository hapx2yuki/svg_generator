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

// プロンプトからSVGパスを動的に生成する関数
function generateIconFromPrompt(prompt) {
    const promptLower = prompt.toLowerCase();
    const paths = [];
    
    // Font Awesome風の線画スタイルで生成
    const strokeWidth = 2;
    const viewBox = '0 0 24 24';
    
    // キーワードに基づいてSVGパスを動的に生成
    if (promptLower.includes('ハート') || promptLower.includes('heart') || promptLower.includes('愛') || promptLower.includes('love')) {
        // ハートの輪郭を線で描画
        paths.push({
            d: 'M12 21C12 21 3 13.5 3 8.5C3 5.5 5.5 3 8.5 3C10.04 3 11.54 3.82 12 5C12.46 3.82 13.96 3 15.5 3C18.5 3 21 5.5 21 8.5C21 13.5 12 21 12 21Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('星') || promptLower.includes('star')) {
        // 5芒星の線画
        paths.push({
            d: 'M12 2L14.09 8.26L21 9.27L16.5 13.77L17.59 20.98L12 17.77L6.41 20.98L7.5 13.77L3 9.27L9.91 8.26L12 2Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('家') || promptLower.includes('home') || promptLower.includes('ホーム') || promptLower.includes('house')) {
        // 家の線画
        paths.push({
            d: 'M3 12L5 10V20C5 20.55 5.45 21 6 21H10V15C10 14.45 10.45 14 11 14H13C13.55 14 14 14.45 14 15V21H18C18.55 21 19 20.55 19 20V10L21 12L12 3L3 12Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('メール') || promptLower.includes('mail') || promptLower.includes('email') || promptLower.includes('封筒')) {
        // メール/封筒の線画
        paths.push({
            d: 'M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M22 6L12 13L2 6',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('電話') || promptLower.includes('phone') || promptLower.includes('call')) {
        // 電話の線画
        paths.push({
            d: 'M22 16.92V19.92C22 20.48 21.54 20.93 20.96 20.92C10.65 20.47 3.53 13.35 3.08 3.04C3.07 2.46 3.52 2 4.08 2H7.08C7.6 2 8.04 2.38 8.14 2.88C8.24 3.37 8.34 3.85 8.47 4.33C8.62 4.87 8.46 5.46 8.06 5.85L6.62 7.29C7.82 9.62 9.38 11.18 11.71 12.38L13.15 10.94C13.54 10.54 14.13 10.38 14.67 10.53C15.15 10.66 15.63 10.76 16.12 10.86C16.62 10.96 17 11.4 17 11.92V14.92C17 15.48 16.54 15.93 15.96 15.92C15.65 15.92 15.34 15.91 15.04 15.88',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('設定') || promptLower.includes('gear') || promptLower.includes('歯車') || promptLower.includes('setting')) {
        // 歯車の線画
        const teeth = 8;
        let path = '';
        for (let i = 0; i < teeth; i++) {
            const angle = (i * 360 / teeth) * Math.PI / 180;
            const nextAngle = ((i + 1) * 360 / teeth) * Math.PI / 180;
            const innerRadius = 7;
            const outerRadius = 11;
            
            if (i === 0) {
                path += `M ${12 + Math.cos(angle) * outerRadius} ${12 + Math.sin(angle) * outerRadius} `;
            }
            
            const midAngle = angle + (nextAngle - angle) * 0.3;
            const midAngle2 = angle + (nextAngle - angle) * 0.7;
            
            path += `L ${12 + Math.cos(midAngle) * outerRadius} ${12 + Math.sin(midAngle) * outerRadius} `;
            path += `L ${12 + Math.cos(midAngle2) * innerRadius} ${12 + Math.sin(midAngle2) * innerRadius} `;
            path += `L ${12 + Math.cos(nextAngle) * innerRadius} ${12 + Math.sin(nextAngle) * innerRadius} `;
        }
        path += 'Z';
        
        paths.push({
            d: path,
            fill: 'none',
            stroke: true
        });
        // 中心の円
        paths.push({
            d: 'M12 9A3 3 0 1 0 12 15A3 3 0 1 0 12 9Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('検索') || promptLower.includes('search') || promptLower.includes('虫眼鏡')) {
        // 検索/虫眼鏡の線画
        paths.push({
            d: 'M11 19C15.418 19 19 15.418 19 11C19 6.582 15.418 3 11 3C6.582 3 3 6.582 3 11C3 15.418 6.582 19 11 19Z',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M21 21L16.65 16.65',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('ユーザー') || promptLower.includes('user') || promptLower.includes('人') || promptLower.includes('person')) {
        // ユーザーアイコンの線画
        paths.push({
            d: 'M12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M6 21V19C6 17.35 10 16 12 16C14 16 18 17.35 18 19V21',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('カート') || promptLower.includes('cart') || promptLower.includes('ショッピング') || promptLower.includes('買い物')) {
        // ショッピングカートの線画
        paths.push({
            d: 'M9 22C9.55 22 10 21.55 10 21C10 20.45 9.55 20 9 20C8.45 20 8 20.45 8 21C8 21.55 8.45 22 9 22Z',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M20 22C20.55 22 21 21.55 21 21C21 20.45 20.55 20 20 20C19.45 20 19 20.45 19 21C19 21.55 19.45 22 20 22Z',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M1 1H5L7.68 14.39C7.77 14.82 8.17 15.14 8.61 15.14H19.4C19.83 15.14 20.23 14.82 20.32 14.39L22 6H6',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('チェック') || promptLower.includes('check') || promptLower.includes('完了') || promptLower.includes('ok')) {
        // チェックマークの線画
        paths.push({
            d: 'M5 12L10 17L20 7',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('×') || promptLower.includes('x') || promptLower.includes('閉じる') || promptLower.includes('close') || promptLower.includes('バツ')) {
        // ×マークの線画
        paths.push({
            d: 'M6 6L18 18',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M18 6L6 18',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('プラス') || promptLower.includes('plus') || promptLower.includes('+') || promptLower.includes('追加')) {
        // プラスマークの線画
        paths.push({
            d: 'M12 5V19',
            fill: 'none',
            stroke: true
        });
        paths.push({
            d: 'M5 12H19',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('矢印') || promptLower.includes('arrow')) {
        // 矢印の線画
        if (promptLower.includes('左') || promptLower.includes('left')) {
            paths.push({
                d: 'M19 12H5',
                fill: 'none',
                stroke: true
            });
            paths.push({
                d: 'M12 19L5 12L12 5',
                fill: 'none',
                stroke: true
            });
        } else if (promptLower.includes('上') || promptLower.includes('up')) {
            paths.push({
                d: 'M12 19V5',
                fill: 'none',
                stroke: true
            });
            paths.push({
                d: 'M5 12L12 5L19 12',
                fill: 'none',
                stroke: true
            });
        } else if (promptLower.includes('下') || promptLower.includes('down')) {
            paths.push({
                d: 'M12 5V19',
                fill: 'none',
                stroke: true
            });
            paths.push({
                d: 'M19 12L12 19L5 12',
                fill: 'none',
                stroke: true
            });
        } else {
            // デフォルトは右矢印
            paths.push({
                d: 'M5 12H19',
                fill: 'none',
                stroke: true
            });
            paths.push({
                d: 'M12 5L19 12L12 19',
                fill: 'none',
                stroke: true
            });
        }
    } else if (promptLower.includes('円') || promptLower.includes('circle') || promptLower.includes('丸')) {
        // 円の線画
        paths.push({
            d: 'M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('四角') || promptLower.includes('square') || promptLower.includes('正方形')) {
        // 四角形の線画
        paths.push({
            d: 'M4 4H20V20H4V4Z',
            fill: 'none',
            stroke: true
        });
    } else if (promptLower.includes('三角') || promptLower.includes('triangle')) {
        // 三角形の線画
        paths.push({
            d: 'M12 2L2 20H22L12 2Z',
            fill: 'none',
            stroke: true
        });
    } else {
        // デフォルト: プロンプトの文字から生成される抽象的な形状
        const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const points = [];
        const numPoints = 3 + (hash % 5);
        
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const radius = 8 + (hash * (i + 1) % 4);
            const x = 12 + Math.cos(angle) * radius;
            const y = 12 + Math.sin(angle) * radius;
            points.push(`${x},${y}`);
        }
        
        paths.push({
            d: `M${points[0]} ${points.slice(1).map(p => `L${p}`).join(' ')} Z`,
            fill: 'none',
            stroke: true
        });
    }
    
    return {
        paths,
        viewBox,
        strokeWidth
    };
}

// SVGを生成
function generateSvg(prompt, size, color) {
    const iconData = generateIconFromPrompt(prompt);
    
    const pathElements = iconData.paths.map(path => {
        if (path.stroke) {
            return `<path d="${path.d}" fill="none" stroke="${color}" stroke-width="${iconData.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>`;
        } else {
            return `<path d="${path.d}" fill="${color}"/>`;
        }
    }).join('\n            ');
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="${size}" 
             height="${size}" 
             viewBox="${iconData.viewBox}">
            ${pathElements}
        </svg>
    `;
    
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