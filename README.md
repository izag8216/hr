# 🏢 HR & Time Tracking System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> 中小企業向けの包括的な人事・勤怠管理システム  
> プロフェッショナルレベルのUI/UXを備えたWebアプリケーション

## 📋 目次

- [概要](#概要)
- [主要機能](#主要機能)
- [技術仕様](#技術仕様)
- [インストール](#インストール)
- [使用方法](#使用方法)
- [機能詳細](#機能詳細)
- [データ管理](#データ管理)
- [カスタマイズ](#カスタマイズ)
- [トラブルシューティング](#トラブルシューティング)
- [ライセンス](#ライセンス)
- [貢献](#貢献)

## 🎯 概要

HR & Time Tracking Systemは、中小企業のニーズに特化して設計された包括的な人事・勤怠管理システムです。モダンなWebテクノロジーを使用し、直感的なユーザーインターフェースと強力な機能を提供します。

### ✨ 特徴

- 🎨 **モダンUI/UX**: ミニマリストでプロフェッショナルなデザイン
- 📱 **レスポンシブ**: モバイル・タブレット・デスクトップ対応
- ⚡ **高速**: Vanilla JavaScriptによる軽量実装
- 💾 **ローカルストレージ**: ブラウザ内でのデータ永続化
- 🔒 **セキュア**: クライアントサイドでの安全なデータ管理
- 🌐 **オフライン対応**: インターネット接続不要

## 🚀 主要機能

### 📊 ダッシュボード
- リアルタイム統計表示
- 今日の勤怠状況一覧
- 最近の活動履歴
- 視覚的なデータ表示

### 👥 従業員管理
- 従業員情報の登録・編集・削除
- 部署・役職管理
- 連絡先情報管理
- 入社日・ステータス管理

### ⏰ 勤怠管理
- 出勤・退勤の記録
- 労働時間の自動計算
- 休憩時間の考慮
- リアルタイム勤怠状況

### 📅 タイムシート
- 月別勤怠表の生成
- 従業員別・全体表示
- 労働時間の集計
- 週末・祝日の識別

### 📈 レポート機能
- 期間別統計レポート
- 従業員別分析
- 労働時間分析
- データエクスポート（JSON形式）

### ⚙️ 設定管理
- 勤務時間設定
- 休憩時間設定
- データバックアップ・復元
- システム設定

## 🛠 技術仕様

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: モダンスタイリング（Grid, Flexbox, CSS Variables）
- **JavaScript (ES6+)**: クラスベース設計、モジュラー構造

### 外部ライブラリ
- **Font Awesome 6.0**: アイコンライブラリ
- **Inter Font**: タイポグラフィ

### ブラウザサポート
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### データストレージ
- **LocalStorage**: ブラウザ内データ永続化
- **JSON**: 構造化データ形式

## 📦 インストール

### 1. リポジトリのクローン
```bash
git clone https://github.com/izag8216/hr.git
cd hr
```

### 2. ファイル構成の確認
```
hr/
├── index.html          # メインHTMLファイル
├── style.css           # スタイルシート
├── app.js             # JavaScriptアプリケーション
└── README.md          # このファイル
```

### 3. 起動
ブラウザで `index.html` を開くだけで使用開始できます。

```bash
# 簡易HTTPサーバーを使用する場合（推奨）
python -m http.server 8000
# または
npx serve .
```

ブラウザで `http://localhost:8000` にアクセス

## 📖 使用方法

### 初回起動
1. ブラウザで `index.html` を開く
2. サンプルデータが自動的に生成される
3. ダッシュボードで概要を確認

### 従業員の追加
1. サイドバーから「従業員管理」を選択
2. 「従業員追加」ボタンをクリック
3. 必要情報を入力して保存

### 勤怠記録
1. 「勤怠管理」セクションに移動
2. 従業員を選択
3. 「出勤」または「退勤」ボタンをクリック

### レポート生成
1. 「レポート」セクションに移動
2. 期間を設定
3. 「レポート生成」ボタンをクリック

## 🔧 機能詳細

### ダッシュボード機能
- **統計カード**: 総従業員数、出勤中、平均労働時間、欠勤者
- **勤怠サマリー**: 今日の出勤状況をリアルタイム表示
- **活動履歴**: 最新の出勤・退勤記録

### 従業員管理機能
- **CRUD操作**: 作成、読み取り、更新、削除
- **バリデーション**: 必須項目チェック
- **検索・フィルタ**: 従業員の検索機能

### 勤怠管理機能
- **時刻記録**: 出勤・退勤時刻の自動記録
- **重複チェック**: 同日の重複出勤防止
- **労働時間計算**: 休憩時間を考慮した自動計算

### タイムシート機能
- **月別表示**: カレンダー形式での勤怠表示
- **週末識別**: 土日の視覚的区別
- **合計時間**: 月間労働時間の自動集計

### レポート機能
- **期間指定**: 任意期間でのレポート生成
- **統計分析**: 平均労働時間、出勤率など
- **エクスポート**: JSON形式でのデータ出力

## 💾 データ管理

### データ構造
```javascript
// 従業員データ
{
  id: Number,
  name: String,
  department: String,
  position: String,
  hireDate: String,
  email: String,
  phone: String,
  createdAt: String
}

// 勤怠データ
{
  id: Number,
  employeeId: Number,
  date: String,
  clockIn: String,
  clockOut: String,
  createdAt: String
}
```

### バックアップ・復元
- **バックアップ**: 設定画面からJSONファイルとしてエクスポート
- **復元**: JSONファイルをインポートしてデータ復元
- **クリア**: 全データの一括削除機能

## 🎨 カスタマイズ

### テーマカスタマイズ
`style.css` の CSS Variables を編集：

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #48bb78;
  /* その他の色設定 */
}
```

### 機能拡張
`app.js` のクラスメソッドを拡張：

```javascript
// 新機能の追加例
HRSystem.prototype.customFeature = function() {
  // カスタム機能の実装
};
```

## 🐛 トラブルシューティング

### よくある問題

**Q: データが保存されない**
A: ブラウザのLocalStorageが有効か確認してください。プライベートモードでは制限される場合があります。

**Q: レスポンシブデザインが正しく表示されない**
A: ブラウザのキャッシュをクリアして再読み込みしてください。

**Q: 日本語が文字化けする**
A: HTMLファイルの文字エンコーディングがUTF-8に設定されているか確認してください。

### デバッグ方法
1. ブラウザの開発者ツールを開く（F12）
2. Consoleタブでエラーメッセージを確認
3. Applicationタブ > Local Storage でデータを確認

## 📄 ライセンス

このプロジェクトは [MIT License](https://opensource.org/licenses/MIT) の下で公開されています。

```
MIT License

Copyright (c) 2025 izag8216

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🤝 貢献

プロジェクトへの貢献を歓迎します！

### 貢献方法
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

### 開発ガイドライン
- コードスタイルの一貫性を保つ
- 適切なコメントを追加
- 機能追加時はドキュメントも更新
- テスト可能な小さな変更を心がける

## 📞 サポート

- **Issues**: [GitHub Issues](https://github.com/izag8216/hr/issues)
- **Discussions**: [GitHub Discussions](https://github.com/izag8216/hr/discussions)

## 🔄 更新履歴

### v1.0.0 (2025-01-XX)
- 初回リリース
- 基本的な人事・勤怠管理機能
- レスポンシブデザイン
- データバックアップ・復元機能

---

<div align="center">

**[⬆ トップに戻る](#-hr--time-tracking-system)**

Made with ❤️ by [izag8216](https://github.com/izag8216)

</div> 