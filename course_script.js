// ── Language Toggle ──────────────────────────────────────────
let lang = 'ar';

function applyLang() {
  const isAr = lang === 'ar';
  document.documentElement.lang = lang;
  // Direction on html element for layout (sidebar side, etc.)
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  document.querySelectorAll('.ar').forEach(el => {
    el.style.display = isAr ? '' : 'none';
  });
  document.querySelectorAll('.en').forEach(el => {
    el.style.display = isAr ? 'none' : '';
  });

  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = isAr ? 'Switch to English 🇬🇧' : 'العربية 🇸🇦';

  // Update sidebar direction
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.dir = isAr ? 'rtl' : 'ltr';
}

document.getElementById('lang-btn')?.addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  applyLang();
});

applyLang(); // default: Arabic

// ── Progress Bar ──────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';

  // Back to top button
  const btt = document.getElementById('btt');
  if (btt) btt.style.display = scrolled > 300 ? 'flex' : 'none';

  // Active sidebar link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (scrolled >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('#sidebar a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  scrollSidebarToActive();
});

// ── Mobile: scroll active item into view ──────────────────────
function scrollSidebarToActive() {
  const active = document.querySelector('#sidebar a.active');
  if (active && window.innerWidth <= 900) {
    active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// ── Back to Top ───────────────────────────────────────────────
document.getElementById('btt')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Copy Buttons ──────────────────────────────────────────────
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const code = btn.closest('.code-wrap')?.querySelector('code')?.innerText || '';
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    });
  });
});

// ── Highlight.js ──────────────────────────────────────────────
hljs.highlightAll();
