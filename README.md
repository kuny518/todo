# TODO

React + TypeScript + Vite で作られたシンプルなTODOアプリです。

**デプロイURL:**
- GitHub Pages: https://kuny518.github.io/todo/
- Vercel: https://todo-ten-swart-66.vercel.app

## 機能

- タスクの追加・完了トグル・編集(ダブルクリック)・削除
- 削除時のUndoトースト
- すべて / 未完了 / 完了 のフィルタ、完了済みの一括削除
- `localStorage`への永続化

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

`main`ブランチへのpushで、GitHub Actions がGitHub Pagesへ(`.github/workflows/deploy.yml`)、Vercelが本番環境へ、それぞれ自動的にビルド・デプロイします。
