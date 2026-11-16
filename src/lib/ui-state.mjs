// Shared pure functions used by the real page handlers and functional checks.
export function artifactForPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const id = clean === '/' ? 'home' : clean.startsWith('/blog/') ? 'blog-article' : clean.slice(1).replaceAll('/', '-');
  const landing = ['home', 'about', 'apps-pawsteps', 'apps-picolle', 'apps-omiya'].includes(id);
  return { id, recipe: landing ? 'expressive-brand' : id === 'contact' ? 'calm-consumer' : 'editorial-authority' };
}

export function matchesTag(tags, selected) {
  return selected === 'all' || tags.includes(selected);
}

export function createContactMailto({ name, email, message }) {
  const body = `お名前: ${name.trim()}\nメールアドレス: ${email.trim()}\n\n${message.trim()}`;
  return `mailto:shintaro@daywizz.com?subject=${encodeURIComponent(`daywizzへのお問い合わせ（${name.trim()}）`)}&body=${encodeURIComponent(body)}`;
}
