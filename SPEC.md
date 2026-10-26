# 土台の仕様メモ

次ページ以降の実装依頼では、このメモを前提にしてください（指示書 フェーズ1-5）。

- Figma：`vqNl8FFUAZPChA9RogQLpR`（ポートフォリオ）／ PC 1920px
- 構成：HTML + Sass（FLOCSS）+ Vite
- 完了済みページ（PC）：トップ（5086:8347）、About（5067:7292）、作品詳細 居酒屋瑠玖（5043:5157）／すくすく（5048:6371）／ヒグマ（5048:5736）／ノベルティ（5043:5173）
- コンポーネントライブラリ：Components / BEM + FLOCSS（5133:11289）と照合済み
- SP（1050px 以下・424px 基準）：トップ（5126:10840）／About（5109:10494）／すくすく（5109:10285）／瑠玖（5104:9417）／ヒグマ（5109:9950）／ノベルティ（5104:9046）＝全6ページ対応済み

## デザイントークン（`src/scss/foundation/_variables.scss`）

| 種類 | 変数 | 値 | 用途 |
|---|---|---|---|
| 色 | `--color-bg` | #000 | パネル同士のすき間 |
| | `--color-surface` | #f0f0f0 | パネルの地 |
| | `--color-text` | #000 | 見出し |
| | `--color-text-body` | #212121 | 本文 |
| | `--color-text-sub` | #504e4e | 小ラベル（ターゲット など） |
| | `--color-text-muted` | #ababab | 英字・和文サブ見出し |
| | `--color-tag` | #595555 | タグの文字・枠 |
| | `--color-tag-inverse` | #c3c1c1 | 黒背景上のタグ |
| | `--color-button` | #dfdfdf | More ボタン |
| | `--color-badge-bg` / `-line` / `-text` | #d5d5d5 / #ababab / #7e7e7e | 番号バッジ |
| | `--color-divider` | #d9d9d9 | 区切り線 |
| | `--color-placeholder` | #c4c4c4 | モックアップ画面 |
| | `--color-ryuku` | #2a5083 | 瑠玖の画像未支給枠 |
| フォント | `--font-display` | alphabet-soup-pro（Adobe Fonts）→ Bowlby One | 英字見出し・ナビ・ボタン（大文字表示） |
| | `--font-base` | Inter → Hiragino Sans → Noto Sans JP | それ以外すべて |
| 角丸 | `--radius-l` / `-s` / `-pill` | 16px / 8px / 9999px | パネル・画像 / カード画像 / タグ・バッジ |
| 余白 | `--panel-gap` | 8px | パネル同士 |
| | `--gutter` | 40px | 左右 |
| | `--section-py` | 120px | セクション上下 |
| 幅 | `--header-max` | 1596px | ヘッダー・フッター |
| | `--content-max` | 1052px | 本文エリア |

文字サイズの刻み：96 / 64 / 48 / 40 / 36 / 32 / 28 / 24 / 20 / 16 / 14 / 12px  
行間：見出し 1.2〜1.4、本文 1.8〜2.6（セクションごとに Figma 値を使用）

## レイアウト（`layout/`）

| クラス | 内容 |
|---|---|
| `.l-page` | ページ全体。ヘッダー直下は継ぎ目なし、フッターの上だけ 8px あける |
| `.l-main` | セクションを 8px 間隔で縦に並べる |
| `.l-panel` | グレーの地＋角丸16px。`--first` はヘッダー直下用（下だけ角丸） |
| `.l-container` | 最大 1052px で中央寄せ。`--padded` は内側に左右 40px（作品詳細） |
| `.l-header` / `.l-footer` | `src/partials/` から `<!-- @include header:about -->` で読み込む。`:home/work/about` で現在地に `aria-current` |

## コンポーネント（`component/`）

| クラス | 使い方 |
|---|---|
| `.c-global-nav` | ヘッダー内ナビ（ホバーで白黒反転 ※ライブラリに指定なし） |
| `.c-button` | More ボタン（幅100%）。hover で背景が 559×51 に縮む（ライブラリ state=hover） |
| `.l-header__logo` | hover で 223×28 に拡大（ライブラリ c-logo state=hover）。SP は RK ロゴに切り替え |
| `.c-item-heading` | 補足 16px ＋ 見出し 36px の2段見出し（`__sub`）。作品詳細の各項目 |
| `.c-tag-list` / `.c-tag` | カード用。`--l` は作品詳細用（14px） |
| `.c-section-heading` | `__en`（Alphabet Soup 32px）＋`__ja`（16px グレー）。About |
| `.c-heading-block` | `__title`（48px）＋`__en`（20px グレー）。作品詳細 |
| `.c-number-badge` | 丸 40px「01」。`--pill` で「Episode01」 |
| `.c-card-work` | トップの作品カード。`__image--ryuku` で青塗り。hover で黒背景・白文字・タグ #c3c1c1（Figma state=Hover、0.4s フェード） |
| `.c-scroll-indicator` | Scroll＋矢印（2秒ループで上下） |
| `.c-skill-card` | About のスキル |
| `.c-device-mockup` | スマホ枠（409×843） |

### 作品詳細の部品（`project/_work.scss`）

| クラス | 使い方 |
|---|---|
| `.p-work-text` | 本文 16px／行間2／両端揃え。`--medium` `--black` `--lh-24` |
| `.p-work-image` | 画像。`style="--ar: 横 / 縦"` で比率指定、`--rounded` で角丸16px |
| `.p-work-image-row` / `.p-work-media` | 画像の横並び（等幅）／縦積み（間隔24px） |
| `.p-work-placeholder` | 画像未支給のグレー枠（1052:428） |
| `.p-work-point` | 番号＋2段見出し＋本文の縦並び（すくすく課題／ヒグマきっかけ） |
| `.p-work-block` | 番号なしの2段見出し＋本文（ヒグマ課題） |
| `.p-work-approach__item--split` | 画像とテキストの左右分割（すくすく） |
| `.p-work-outline__lead--loose` | リード文 Medium／行間2（すくすく・ヒグマ） |
| `.p-work-concept__text--tracking` | 字間 0.8px の Regular（瑠玖） |
| `.p-work-list` / `.p-work-item` | 見出し＋本文＋図版のまとまり（間隔120px／64px）（ノベルティ） |
| `.p-work-photo--dark` / `--rotate` | 濃い地に収める写真／縦長写真を -90° 回転して横長枠に収める（ノベルティ） |
| `.p-work-result` | 結果の見出し（32px）＋本文（ノベルティ） |
| `.p-work-section--fixed` | Figma で高さ固定のセクション。`style="--min-h: …"` で最小高さ、内容は上下中央 |
| `.p-work-approach__item--h-402` | 分割レイアウトの行を 402px に固定（すくすく） |

### SP 版の共通パーツ（ライブラリの Mobile）

`l-header`（RK ロゴ）／`l-footer`／`p-work-outline`／`p-work-task__item` は 1050px 以下で SP 表示に切り替わる。
確認は `parts.html` 下部（424px 幅で `parts-sp.html` を表示）。
SP 対応済みのページは `<body class="is-responsive">`。`@include sp` のスタイルはこのクラスがあるページにだけ効く
（`foundation/_mixins.scss`）。未対応ページは `body { min-width: 1100px }` で PC 表示を保つ。
新しく SP を対応したら、そのページの body に `.is-responsive` を付けるだけでよい。

PC / SP で文言を変える箇所は `.u-pc` / `.u-sp`（例：トップのカード「居酒屋瑠玖　<span class="u-pc">サイト</span>リニューアル」）。

新しい共通パーツが必要になったら、作る前に相談し、この表に追記する。

## ファイル構成

```
src/
  index.html / about.html / works/（ryuku / sukusuku / higuma）
  parts.html          共通パーツ確認用（Figma と見比べる用。公開時は削除可）
  parts-sp.html       SP 版の共通パーツ確認用（parts.html から読み込み）
  partials/           head / header / footer
  js/main.js          フォントと Sass の読み込み
  scss/
    foundation/       _variables（トークン）/ _reset / _base
    layout/           _page / _header / _footer
    component/        c- パーツ
    project/          _home / _about / _work / _parts
public/assets/img/    画像（作品ごとにフォルダ。ツールアイコンは tool-figma / tool-illustrator を共用）
```

## Figma と意図的に変えた点

- **Alphabet Soup**：Adobe Fonts のキット `gcb7hig`（JS 埋め込み。このキットは CSS 埋め込みだと 412 エラー）で読み込み。CSS のフォント名は `alphabet-soup-pro`。Adobe Fonts のライセンス上、フォントファイルの同梱（セルフホスト）は不可。読み込みに失敗した場合のみ Bowlby One で表示
- **About「Illsutrator」**：Figma の誤字を「Illustrator」に修正
- **作品詳細 Episode01 の本文**：Figma ではテキスト枠（1066px）が本文エリア（972px）からはみ出して末尾が切れているため、本文エリア内で折り返す（ページ全体が約30px高くなる）
- **Episode01 バッジの文字色**：Figma では #9f9393（02・03 は #7e7e7e）。揺れとみなして #7e7e7e に統一
- **課題02の画像**：Figma 内で縦にわずかに引き伸ばされていたため、比率を保って表示
- **ホバー**：ボタン・ロゴはライブラリどおり。作品カードは Figma の Hover 状態どおり。指定のないナビ（白黒反転）・メール（半透明）は独自
- **すくすくのタグ色**：Figma では #909090（他ページは #595555）。共通の #595555 に統一
- **すくすくの本文色**：Figma の課題・ターゲット・アプローチ本文は #000（瑠玖は #212121）。Figma どおり `--black` で再現
- **ヒグマ「実際のデザイン」**：Figma では PC 用・SP 用の2セクションに同じ画像が入っているため、そのまま2回表示
- **SP ヘッダーのナビ**：Home を非表示（ご要望。ロゴでトップに戻れる）。Work / About Me は Figma どおり余白 24px・間隔 16px・文字 16px
- **SP フッター**：Figma は 472px 幅・Sztos フォントで作られており 424px に収まらないため、著作権表記を下段へ
- **About（PC）の本文幅**：Figma 更新で各セクションに左右 40px が付き本文幅 972px に。スキルカード（340px×3＝1052px）と強みの本文（735px 固定）は Figma 上ではみ出して切れているため、スキルは 3 等分（約313px）、強みの本文は残り幅いっぱい（655px）にして収めた
- **SP About の「強み」**：SP の Figma にはないが、内容を削らず「見出しの下に本文」の縦並びで表示（独自）
- **SP 作品概要のメタ情報**：Figma の書き出し値は間隔 80px 24px だが、画面上は縦横とも 24px のため 24px に
- **SP 瑠玖 アプローチ02**：PC のスマホ枠（CSS で描画）を隠し、SP の Figma どおりスマホ画面の画像（課題01と同じ画像）を表示
- **SP ヒグマ「実際のデザイン」**：SP の Figma は1セクションのみのため、2つ目（PC と同じ画像）を SP では非表示
- **SP ヒグマ アプローチの上下余白**：Figma は 120px（他セクションは 80px）。80px に統一
- **SP ノベルティ リサーチの上下余白**：Figma は 60px（他セクションは 80px）。80px に統一
- **メンバー一覧の折り返し**：Figma どおり折り返さない設定に（PC ノベルティの「プロジェクトマネージャー」が1行に収まり、ページが 22px 短くなった）
- **SP すくすく アプローチ02の本文**：Figma は 13px（他は 12px）。12px に統一

## 未対応

- SP 版（Figma の SP フレームのリンク待ち）。それまでは `body { min-width: 1100px }` で PC レイアウトを保持
- ヒグマ「アニメーション機能」の画像2点：Figma もグレー枠のため、枠のまま

## PC と SP で Figma の内容が違う箇所（PC の内容で表示中）

- 瑠玖 SP にだけ「ターゲットと購買行動モデルを考案」（中身はノベルティの DECAX／29歳男性）が入っている → コピーの混入とみなし未実装

- トップのカードのタグ：すくすく PC「＃クライアントワークス」／SP「＃自主制作」（SP は詳細ページと一致）
- すくすくのメンバー：PC「プログラマー」／SP「エンジニア」

## 原稿の確認が必要な箇所（Figma の文言どおりに表示中）

- すくすく コンセプト本文：「…発見してもらい、z。ターゲット…」に「z。」が混入し、文が途中で切れている
- すくすく アプローチ01：「大人の子供も見やすい」（「大人も子供も」？）
- ヒグマ きっかけ01：「約5800等から」（「頭」？）／「1万以上に増加しています、」
- ヒグマ きっかけ02：「基本的な知識が知ることが必要です」
- ノベルティ キーワード化：「HBA（がノベルティ施策を…」の「（」
- ノベルティ デモ版：「デモ盤として作成」（「デモ版」？）
- ノベルティ アプローチ：番号が 01 → 03 → 02 の順に並んでいる（Figma どおり）
