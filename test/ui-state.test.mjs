import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { artifactForPath, createContactMailto, matchesTag } from '../src/lib/ui-state.mjs';

const root = path.resolve('dist');
function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

test('navigation-targets-exist', () => {
  const pages = htmlFiles(root);
  assert.ok(pages.length >= 16, 'Build the real site before running UI checks');
  for (const file of pages) {
    const html = fs.readFileSync(file, 'utf8');
    const relative = path.relative(root, file).replace(/index\.html$/, '');
    const base = new URL(relative, 'https://daywizz.test/');
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      if (!raw || /^(?:mailto:|tel:|data:|https?:\/\/)/.test(raw)) continue;
      const target = new URL(raw.replaceAll('&amp;', '&'), base);
      if (target.origin !== base.origin) continue;
      let dest = path.join(root, decodeURIComponent(target.pathname));
      if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) dest = path.join(dest, 'index.html');
      assert.ok(fs.existsSync(dest), `${path.relative(root,file)} has a missing target: ${raw}`);
      if (target.hash && dest.endsWith('.html')) {
        const id = decodeURIComponent(target.hash.slice(1));
        const content = fs.readFileSync(dest, 'utf8');
        assert.ok(content.includes(`id="${id}"`), `${raw}: missing anchor ${id}`);
      }
    }
  }
});

test('route-artifact-mapping', () => {
  const index = JSON.parse(fs.readFileSync('.styleseed/artifacts/index.json', 'utf8'));
  const ids = new Set(index.artifacts.map(entry => entry.id));
  for (const file of htmlFiles(root).filter(p => path.relative(root,p).endsWith('index.html'))) {
    const route = '/' + path.relative(root, file).replace(/index\.html$/, '');
    const artifact = artifactForPath(route);
    assert.ok(ids.has(artifact.id), `${route} must use a registered artifact`);
    assert.ok(fs.readFileSync(file, 'utf8').includes(`data-styleseed-artifact="${artifact.id}"`), `${route}: artifact boundary missing`);
  }
  assert.equal(artifactForPath('/blog/').id, 'blog');
  assert.equal(artifactForPath('/blog/article/').id, 'blog-article');
});

test('tag-filter-matches-exact-tags', () => {
  assert.equal(matchesTag(['開発','PawSteps'], 'all'), true);
  assert.equal(matchesTag(['開発','PawSteps'], 'PawSteps'), true);
  assert.equal(matchesTag(['開発','PawSteps'], 'Paw'), false);
  assert.equal(matchesTag(['家族,作品'], '家族,作品'), true);
  assert.equal(matchesTag([], '開発'), false);
  assert.equal(matchesTag([], 'all'), true);
});

test('contact-mailto-preserves-content', () => {
  const name = ' 山田 太郎 & 家族 ';
  const email = ' family+app@example.com ';
  const message = ' 作品について\n本文に & ? # と絵文字も含められます。\n二行目 ';
  const url = new URL(createContactMailto({ name, email, message }));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'shintaro@daywizz.com');
  assert.equal(url.searchParams.get('subject'), 'daywizzへのお問い合わせ（山田 太郎 & 家族）');
  assert.equal(url.searchParams.get('body'), `お名前: ${name.trim()}\nメールアドレス: ${email.trim()}\n\n${message.trim()}`);
  assert.deepEqual([...url.searchParams.keys()], ['subject','body']);
});

test('legal-wording-is-retained', async () => {
  const { execFileSync } = await import('node:child_process');
  // Presentation-only substitutions must not change existing legal frontmatter or wording.
  for (const file of ['src/pages/apps/pawsteps/privacy.astro','src/pages/apps/pawsteps/terms.astro','src/pages/apps/picolle/privacy.astro','src/pages/apps/picolle/terms.astro','src/pages/apps/picolle/tokushoho.astro']) {
    const original = execFileSync('git', ['show', `HEAD:${file}`], { encoding:'utf8' });
    const current = fs.readFileSync(file, 'utf8');
    const withoutClasses = value => value.replace(/class="[^"]*"/g, '');
    assert.equal(withoutClasses(current), withoutClasses(original), `${file}: legal text must remain unchanged`);
  }
});
