# RYUSEI KIMURA Portfolio（site-v2）

Figma（PC 1920px）から実装した静的サイトです。トップ／About／作品詳細（居酒屋瑠玖・すくすく・ヒグマ・ノベルティ）の6ページ。
トークンや共通パーツの一覧は `SPEC.md` を参照してください。

## 公開

`main` ブランチに push すると、GitHub Actions（`.github/workflows/deploy.yml`）がビルドして GitHub Pages に公開します。
公開 URL：https://donkoro04.github.io/ryusei-kimura-portfolio/

## 使い方

`node_modules` は導入済みです（Mac で `npm install` は不要）。
開発サーバーを起動したままにしておくと、ファイルが更新されるたびにブラウザへ自動で反映されます。

```bash
npm install
npm run dev      # 開発サーバー http://localhost:5173
npm run build    # dist/ に公開用の HTML/CSS/JS を出力
npm run preview  # ビルド結果を確認
```

- 確認用ページ：`http://localhost:5173/parts.html`（共通パーツ一覧）
- `dist/` は相対パスで出力されるので、そのままサーバーにアップロードできます。
