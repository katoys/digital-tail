# ポチ — 介護支援コンパニオンロボット デモアプリ

高齢者向けコンパニオンロボット「ポチ」を中心とした介護支援サービスのデモ UI。
家族向けアプリと、ケアマネージャー向けダッシュボードの2画面で構成されています。

---

## 起動手順

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開くとアプリが表示されます。

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動（ホットリロード有効） |
| `npm run build` | プロダクションビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルでプレビュー |

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | React 18（Hooks ベース） |
| ファイル形式 | JSX（拡張子は `.jsx`） |
| スタイリング | Tailwind CSS（ユーティリティクラス直書き） |
| アイコン | lucide-react |
| 状態管理 | React ローカル State のみ（`useState` / `useEffect`） |
| バックエンド | なし（モックデータのみ） |
| 依存ライブラリ | react, lucide-react |

---

## アーキテクチャ概要

```
App（ルート）
├── <FamilyApp />               家族向け画面
│   ├── <ApplianceCard />       家電コントロールカード（エアコン / 照明 / テレビ）
│   └── <CareProposalCard forFamily={true} />  ケア提案カード（家族向け表示）
├── <CareDashboard />           ケアマネージャー向けダッシュボード
│   └── <CareProposalCard forFamily={false} /> ケア提案カード（CM向け表示）
└── <UserDetailScreen />        利用者詳細画面（田中花子さん）
    └── <CareProposalCard forFamily={false} /> ケア提案カード
```

### ヘルパーコンポーネント

| コンポーネント | 役割 |
|---|---|
| `PawPrint` | 肉球アイコン（装飾用 SVG） |
| `MiniBar` | インラインのミニプログレスバー |

---

## 画面構成

### 1. 家族向け画面（`FamilyApp`）

オレンジ系のカラーテーマ。家族がスマートフォンから閲覧する想定。

- **リアルタイム時計**（`useEffect` + `setInterval` で 1 秒更新）
- **ポチの状態表示**：気分スコア・ライブステータス
- **家電コントロール**：エアコン（遠隔操作・温度調整・冷房/暖房切替）/ 照明 / テレビ（SwitchBot 連携想定）
- **今日の出来事タイムライン**：ポチが記録した会話・行動ログ
- **ケアマネからの提案**：AI 生成のケアサービス提案を家族向けに表示
- **音声メッセージ送信ボタン**：マイクボタンで疑似送信（1.8 秒後にトーストで完了通知）

### 2. ケアマネージャーダッシュボード（`CareDashboard`）

ダーク系ヘッダー・インジゴ系アクセントカラー。専門職向け。

- **KPI カード**（今週 / 今月切替）：平均気分・活動スコア・服薬達成率
- **AI 総合サマリー**：週・月の分析テキスト
- **棒グラフ**：週別の気分・活動スコア推移（CSS でカスタム描画）
- **担当者サマリー一覧**：ステータスバッジ（良好 / 要確認 / 緊急）・気分バー・服薬確認状況
- **田中花子さんの行をタップ** → `UserDetailScreen` へ遷移

### 3. 利用者詳細画面（`UserDetailScreen`）

田中花子さん（82歳）の詳細。3 タブ構成。

| タブ | 内容 |
|---|---|
| 月次サマリー | KPI・AI月次サマリー文・週別スコア推移バー・今月の気になるポイント |
| サービス提案 | AI によるケアサービス最適化提案（4件）・アクションボタン群 |
| 支援記録 | 訪問・電話記録の時系列ログ |

---

## ナビゲーション設計

- **ボトムタブナビゲーション**（家族 / ケアマネ）：`App` の `screen` ステートで切替
- **スタックライクな画面遷移**：`showDetail` ステートで詳細画面をオーバーレイ表示し、戻るボタンで閉じる
- ルーティングライブラリは不使用。ネイティブアプリに近い UI をピュアな React State で実現

```
screen="family"  →  FamilyApp
screen="care"    →  CareDashboard
                        └─ onClick(田中花子) → showDetail=true → UserDetailScreen
                                                                  └─ onBack → showDetail=false
```

---

## 状態管理

グローバル状態管理ライブラリは使用しない。コンポーネントローカルの `useState` で完結。

| コンポーネント | 主な State |
|---|---|
| `App` | `screen`（表示画面）, `showDetail`（詳細表示フラグ） |
| `FamilyApp` | `pressed`, `waveActive`（マイクボタン）, `showToast`, `currentTime` |
| `CareDashboard` | `period`（週次/月次切替） |
| `UserDetailScreen` | `tab`（タブ切替） |
| `ApplianceCard` | `on`（ON/OFF）, `loading`, `temp`, `mode`, `done` |
| `CareProposalCard` | `expanded`（アコーディオン開閉） |

---

## データ構造

バックエンドなし。ファイル内にハードコードされたモックデータを使用。

| 変数 | 内容 |
|---|---|
| `timeline` | 今日の出来事（時刻・絵文字・テキスト） |
| `appliances` | 家電一覧（エアコン / 照明 / テレビ） |
| `weeklyScores` | 曜日別の気分・活動スコア |
| `monthlyHighlights` | 週別スコアとメモ |
| `careUsers` | 担当利用者 4 名の情報 |
| `careProposals` | AI によるサービス提案 4 件（家族画面・CM画面で共有） |
| `STATUS` | ステータス種別（good / caution / alert）に対応するスタイル定義 |

---

## レイアウト方針

- **最大幅 `max-w-md`（448px）** のスマートフォン縦向きレイアウトを中央寄せ
- 全体をラップした `div` が `min-h-screen` でスクロール可能
- ヘッダーは固定・コンテンツ領域がスクロール（`overflow-y-auto`）
- フォント：`'Hiragino Maru Gothic ProN'`, `'M PLUS Rounded 1c'`（日本語丸ゴシック）

---

## ファイル構成

```
src/
├── main.jsx                         エントリーポイント
├── App.jsx                          ルート（画面切替・ボトムナビ）
├── index.css                        Tailwind CSS ディレクティブ
├── components/
│   ├── FamilyApp.jsx                家族向け画面
│   ├── CareDashboard.jsx            ケアマネージャー向けダッシュボード
│   ├── UserDetailScreen.jsx         利用者詳細（3タブ）
│   ├── ApplianceCard.jsx            家電コントロールカード
│   ├── CareProposalCard.jsx         ケア提案カード（家族・CM共用）
│   └── ui/
│       ├── PawPrint.jsx             肉球 SVG アイコン
│       └── MiniBar.jsx              インライン進捗バー
└── data/
    └── mock.jsx                     全静的モックデータ
```
