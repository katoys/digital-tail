# CLAUDE.md

このファイルは、リポジトリ内で作業する Claude Code (claude.ai/code) へのガイダンスを提供します。

## コミュニケーション

ユーザーとのコミュニケーションは日本語で行うこと。

## リポジトリ概要

**ポチ** — 高齢者向けAIコンパニオンロボットのシングルファイル React デモアプリ。
アプリ全体は `file.jsx` に収まっており、ビルドシステム・package.json・テストスイートは存在しない。

## アーキテクチャ

`file.jsx` は自己完結型の React コンポーネントファイル（JSX、TypeScript なし）。
すべてのコンポーネント・モックデータ・スタイルがこの1ファイルに同居している。

**`App`（ルート）が制御する画面階層:**

```
App
├── FamilyApp          — 家族向け画面（オレンジ系テーマ）
│   ├── ApplianceCard  — 家電コントロール（エアコン/照明/テレビ）
│   └── CareProposalCard (forFamily=true)
├── CareDashboard      — ケアマネージャー向けダッシュボード
│   └── CareProposalCard (forFamily=false)
└── UserDetailScreen   — 利用者詳細（タブ: 月次サマリー / サービス提案 / 支援記録）
    └── CareProposalCard (forFamily=false)
```

ナビゲーションは `App` の `useState` 2つで管理: `screen`（`"family"` | `"care"`）と `showDetail`（boolean）。ルーターライブラリは使用しない。

**主要な設計方針:**
- 状態はすべてコンポーネントローカル（`useState`）。グローバル状態管理なし。
- データはすべてファイル先頭に定義された静的モックデータ（`timeline`, `appliances`, `weeklyScores`, `monthlyHighlights`, `careUsers`, `careProposals`）。
- スタイリングは Tailwind CSS ユーティリティクラスのインライン記述。CSS ファイルなし。
- `CareProposalCard` は家族画面・ケアマネ画面の両方で再利用。`forFamily` props でアクションボタンの表示を切り替える。
- モバイル向けレイアウト（`max-w-md`）、デスクトップでは中央寄せ。
