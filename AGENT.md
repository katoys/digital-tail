# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication

ユーザーとのコミュニケーションは日本語で行うこと。

## Repository Overview

Single-file React demo app for **ポチ** — an AI companion robot for elderly care.
The entire application lives in `file.jsx`. There is no build system, package.json, or test suite.

## Architecture

`file.jsx` is a self-contained React component file (JSX, not TypeScript). All components, mock data, and styles are co-located in this one file.

**Screen hierarchy controlled by `App` (root):**

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

Navigation uses two `useState` values in `App`: `screen` (`"family"` | `"care"`) and `showDetail` (boolean). No router library is used.

**Key design decisions:**
- All state is component-local (`useState`). No global state management.
- All data is static mock data defined at the top of the file (`timeline`, `appliances`, `weeklyScores`, `monthlyHighlights`, `careUsers`, `careProposals`).
- Styling is inline Tailwind CSS utility classes. No CSS files.
- `CareProposalCard` is reused in both the family view and care manager view; the `forFamily` prop switches the action buttons shown in the expanded state.
- The app is sized for mobile (`max-w-md`), centered on desktop.
