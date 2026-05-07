# CLAUDE.md

このファイルは、リポジトリ内で作業する Claude Code (claude.ai/code) へのガイダンスを提供します。

## コミュニケーション

ユーザーとのコミュニケーションは日本語で行うこと。

## 開発コマンド

```bash
npm install       # 依存パッケージのインストール
npm run dev       # 開発サーバー起動（Vite）
npm run build     # プロダクションビルド
npm run preview   # ビルド結果のプレビュー
```

## リポジトリ概要

**ポチ** — 高齢者向けAIコンパニオンロボットの React デモアプリ（Vite + Tailwind CSS）。
バックエンドなし、テストスイートなし。すべてのデータは静的モック。

## URL 構成（GitHub Pages）

| パス | 内容 |
|---|---|
| `https://katoys.github.io/digital-tail/` | LP（静的 HTML） |
| `https://katoys.github.io/digital-tail/app/` | React デモアプリ |

LP は `lp/` 配下の静的ファイル（ビルド不要）。デプロイ時に React ビルド（`dist/app/`）と LP（`dist/`）を合成して GitHub Pages へ配信する。

## アーキテクチャ

```
lp/
└── index.html                       — LP（静的 HTML・ビルド不要）

src/
├── App.jsx                          — ルート（画面切替・ボトムナビ）
├── components/
│   ├── FamilyApp.jsx                — 家族向け画面（オレンジ系テーマ）
│   ├── CareDashboard.jsx            — ケアマネージャー向けダッシュボード
│   ├── UserDetailScreen.jsx         — 利用者詳細（3タブ）
│   ├── ApplianceCard.jsx            — 家電コントロール（エアコン/照明/テレビ）
│   ├── CareProposalCard.jsx         — ケア提案カード（家族・CM共用）
│   └── ui/
│       ├── PawPrint.jsx             — 肉球 SVG アイコン
│       └── MiniBar.jsx              — インライン進捗バー
└── data/
    └── mock.jsx                     — 全静的データ・STATUS 定数
```

ナビゲーションは `App` の `useState` 2つで管理: `screen`（`"family"` | `"care"`）と `showDetail`（boolean）。ルーターライブラリは使用しない。

**主要な設計方針:**
- 状態はすべてコンポーネントローカル（`useState`）。グローバル状態管理なし。
- `src/data/mock.jsx` に全モックデータを集約。`careProposals` のアイコンはコンポーネント参照（`Icon: Users` 等）で保持し、`CareProposalCard` 内で `<p.Icon size={15} />` としてレンダリング。
- スタイリングは Tailwind CSS ユーティリティクラスのインライン記述。CSS ファイルは `src/index.css`（Tailwind ディレクティブのみ）。
- `CareProposalCard` は家族画面・ケアマネ画面の両方で再利用。`forFamily` props でアクションボタンの表示を切り替える。
- モバイル向けレイアウト（`max-w-md`）、デスクトップでは中央寄せ。
