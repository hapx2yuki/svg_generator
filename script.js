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
let currentPathData = null;

// SVGパスを生成する関数（プロンプトから動的に生成）
function generateSvgPath(prompt) {
    // プロンプトを基にしたシンプルなアイコン生成ロジック
    const promptLower = prompt.toLowerCase();
    
    // 基本的な形状パターン
    const shapes = {
        circle: (cx = 12, cy = 12, r = 10) => {
            return `M ${cx-r} ${cy} A ${r} ${r} 0 0 0 ${cx+r} ${cy} A ${r} ${r} 0 0 0 ${cx-r} ${cy}`;
        },
        square: (size = 16, x = 4, y = 4) => {
            return `M ${x} ${y} h ${size} v ${size} h -${size} Z`;
        },
        triangle: (size = 20) => {
            const height = size * 0.866;
            return `M 12 ${(24-height)/2} L ${12+size/2} ${(24+height)/2} L ${12-size/2} ${(24+height)/2} Z`;
        },
        star: () => {
            return 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
        },
        heart: () => {
            return 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
        },
        arrow: (direction = 'right') => {
            const paths = {
                right: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
                left: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z',
                up: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z',
                down: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'
            };
            return paths[direction] || paths.right;
        },
        plus: () => {
            return 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z';
        },
        check: () => {
            return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
        },
        cross: () => {
            return 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z';
        }
    };
    
    // プロンプトから形状を判定
    if (promptLower.includes('円') || promptLower.includes('circle') || promptLower.includes('丸')) {
        return { path: shapes.circle(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('四角') || promptLower.includes('square') || promptLower.includes('正方形')) {
        return { path: shapes.square(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('三角') || promptLower.includes('triangle')) {
        return { path: shapes.triangle(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('星') || promptLower.includes('star')) {
        return { path: shapes.star(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('ハート') || promptLower.includes('heart') || promptLower.includes('愛')) {
        return { path: shapes.heart(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('矢印') || promptLower.includes('arrow')) {
        if (promptLower.includes('左') || promptLower.includes('left')) {
            return { path: shapes.arrow('left'), viewBox: '0 0 24 24' };
        } else if (promptLower.includes('上') || promptLower.includes('up')) {
            return { path: shapes.arrow('up'), viewBox: '0 0 24 24' };
        } else if (promptLower.includes('下') || promptLower.includes('down')) {
            return { path: shapes.arrow('down'), viewBox: '0 0 24 24' };
        }
        return { path: shapes.arrow('right'), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('プラス') || promptLower.includes('plus') || promptLower.includes('+')) {
        return { path: shapes.plus(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('チェック') || promptLower.includes('check') || promptLower.includes('完了')) {
        return { path: shapes.check(), viewBox: '0 0 24 24' };
    } else if (promptLower.includes('×') || promptLower.includes('x') || promptLower.includes('閉じる') || promptLower.includes('close')) {
        return { path: shapes.cross(), viewBox: '0 0 24 24' };
    }
    
    // より複雑なアイコンの生成
    return generateComplexIcon(prompt);
}

// より複雑なアイコンを生成
function generateComplexIcon(prompt) {
    const promptLower = prompt.toLowerCase();
    
    // キーワードベースでパスを生成
    if (promptLower.includes('家') || promptLower.includes('home') || promptLower.includes('ホーム')) {
        return {
            path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('メール') || promptLower.includes('mail') || promptLower.includes('email')) {
        return {
            path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('電話') || promptLower.includes('phone') || promptLower.includes('call')) {
        return {
            path: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('時計') || promptLower.includes('clock') || promptLower.includes('time')) {
        return {
            path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('カメラ') || promptLower.includes('camera') || promptLower.includes('写真')) {
        return {
            path: 'M12 15.2c1.74 0 3.2-1.46 3.2-3.2S13.74 8.8 12 8.8 8.8 10.26 8.8 12s1.46 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('音楽') || promptLower.includes('music') || promptLower.includes('音符')) {
        return {
            path: 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
            viewBox: '0 0 24 24'
        };
    } else if (promptLower.includes('本') || promptLower.includes('book') || promptLower.includes('読書')) {
        return {
            path: 'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
            viewBox: '0 0 24 24'
        };
    }
    
    // デフォルト: プロンプトの文字数に基づいて生成されるランダムな形状
    const hash = prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const defaultShapes = [
        'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', // 円
        'M4 4h16v16H4z', // 正方形
        'M12 2l10 20H2z', // 三角形
        'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' // 星
    ];
    
    return {
        path: defaultShapes[hash % defaultShapes.length],
        viewBox: '0 0 24 24'
    };
}

// SVGを生成
function generateSvg(prompt, size, color) {
    // 新しい動的生成ロジックを使用
    const pathData = generateSvgPath(prompt);
    currentPathData = pathData;
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="${size}" 
             height="${size}" 
             viewBox="${pathData.viewBox}"
             fill="${color}">
            <path d="${pathData.path}"/>
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