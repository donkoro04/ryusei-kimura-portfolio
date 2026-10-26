import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

// 共通パーツの簡易インクルード
//   <!-- @include header -->        → src/partials/header.html
//   <!-- @include header:about -->  → 現在地のナビに aria-current="page" を付与
// パーツ内の {{root}} は、ページの階層に合わせた相対パス（./ または ../）に置き換わる
const includePartials = () => ({
  name: 'include-partials',
  transformIndexHtml: {
    order: 'pre',
    handler(html, ctx) {
      const depth = ctx.path.split('/').length - 2;
      const root = depth > 0 ? '../'.repeat(depth) : './';
      return html.replace(/<!--\s*@include\s+([\w-]+)(?::([\w-]+))?\s*-->/g, (_, name, current = '') =>
        readFileSync(resolve(__dirname, `src/partials/${name}.html`), 'utf8')
          .replaceAll('{{root}}', root)
          .replaceAll(`data-nav="${current}"`, `data-nav="${current}" aria-current="page"`)
      );
    },
  },
});

export default defineConfig({
  root: 'src',
  base: './',
  publicDir: resolve(__dirname, 'public'),
  plugins: [includePartials()],
  server: { host: true },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        ryuku: resolve(__dirname, 'src/works/ryuku.html'),
        sukusuku: resolve(__dirname, 'src/works/sukusuku.html'),
        higuma: resolve(__dirname, 'src/works/higuma.html'),
        novelty: resolve(__dirname, 'src/works/novelty.html'),
        parts: resolve(__dirname, 'src/parts.html'),
        'parts-sp': resolve(__dirname, 'src/parts-sp.html'),
      },
    },
  },
  css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
});
