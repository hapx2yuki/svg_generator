# SVG Icon Generator

Font Awesome風のシンプルなアイコンをプロンプトから生成するWebアプリケーション。

## 概要

このアプリケーションは、テキストプロンプトを入力するだけで、Font Awesome風のシンプルでクリーンなSVGアイコンを動的に生成できます。プロンプトの内容を解析し、適切な形状やアイコンを自動的に生成します。生成されたアイコンはサイズや色をカスタマイズでき、SVGファイルとしてダウンロードすることも可能です。

## 機能

- 🎨 プロンプトからアイコンを自動生成
- 📐 リアルタイムでサイズ調整（24px〜256px）
- 🎨 カラーピッカーで色変更
- 💾 SVGファイルとしてダウンロード
- 📋 SVGコードをクリップボードにコピー
- 🔄 再生成機能

## 使い方

1. ブラウザで `index.html` を開く
2. テキストボックスにアイコンの説明を入力
3. 「アイコンを生成」ボタンをクリック
4. 生成されたアイコンのサイズや色を調整
5. 必要に応じてダウンロードまたはコピー

## 対応アイコンパターン

### 基本形状
- 円 / circle / 丸
- 四角 / square / 正方形
- 三角 / triangle
- 星 / star
- ハート / heart / 愛

### 矢印・記号
- 矢印（右、左、上、下）/ arrow (right, left, up, down)
- プラス / plus / +
- チェック / check / 完了
- × / x / 閉じる / close

### アイコン
- 家 / home / ホーム
- メール / mail / email
- 電話 / phone / call
- 時計 / clock / time
- カメラ / camera / 写真
- 音楽 / music / 音符
- 本 / book / 読書

### その他
上記以外のプロンプトでも、入力内容に基づいて適切なアイコンが自動生成されます。

## 技術スタック

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript

## デモ

[https://hapx2yuki.github.io/svg_generator/](https://hapx2yuki.github.io/svg_generator/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)