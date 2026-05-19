// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// hamburger
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// header background on scroll
const header = document.querySelector('header');
const heroWrap = document.getElementById('hero-scroll-wrap');
window.addEventListener('scroll', () => {
  const threshold = heroWrap.offsetHeight - window.innerHeight;
  header.style.background = window.scrollY >= threshold
    ? 'rgba(13,13,13,0.85)'
    : 'transparent';
}, { passive: true });

// accordion menu items
document.querySelectorAll('.item-header').forEach(btn => {
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const item = btn.closest('.menu-item');
    const list = btn.closest('.menu-list');
    const wasOpen = item.classList.contains('open');

    list.querySelectorAll('.menu-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      const openButton = openItem.querySelector('.item-header');
      if (openButton) openButton.setAttribute('aria-expanded', 'false');
    });

    if (!wasOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// hero scroll animation
(function () {
  const total = 240;
  const frames = [];
  let lastIdx = 0;

  for (let i = 1; i <= total; i++) {
    const img = new Image();
    img.src = 'animation_frames/ezgif-frame-' + String(i).padStart(3, '0') + '.jpg';
    frames.push(img);
  }

  const heroImg = document.getElementById('hero-anim');
  const wrap = document.getElementById('hero-scroll-wrap');

  function onScroll() {
    const scrolled = window.scrollY;
    const maxScroll = wrap.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1);
    const idx = Math.min(Math.floor(progress * total), total - 1);
    if (idx !== lastIdx && frames[idx] && frames[idx].complete) {
      heroImg.src = frames[idx].src;
      lastIdx = idx;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

// copy phone number to clipboard
document.querySelectorAll('.phone-copy').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const phone = link.getAttribute('data-phone');
    navigator.clipboard.writeText(phone).then(() => {
      const originalText = link.textContent;
      link.textContent = '✓ Zkopírováno!';
      setTimeout(() => {
        link.textContent = originalText;
      }, 2000);
    });
  });
});
