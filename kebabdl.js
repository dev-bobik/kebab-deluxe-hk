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

// dish images by item number
const dishImages = {
  '01': 'dish-images/tortilla_sauce_ultra_hd.webp',
  '02': 'dish-images/tortilla_sauce_ultra_hd.webp',
  '03': 'dish-images/tortilla_sauce_ultra_hd.webp',
  '04': 'dish-images/kebab_wrap_final_6144x4096.webp',
  '05': 'dish-images/doner_triangle_ultra_hd.webp',
  '06': 'dish-images/doner_triangle_ultra_hd.webp',
  '07': 'dish-images/doner_triangle_ultra_hd.webp',
  '08': 'dish-images/doner_box_final_6144x4096.webp',
  '09': 'dish-images/salads_ultra_hd.webp',
  '10': 'dish-images/falafel_wrap_upscaled.webp',
  '11': 'dish-images/tortilasyr.webp',
  '12': 'dish-images/falafel_triangle_ultra_hd_v2.webp',
  '13': 'dish-images/halloumi_triangle_ultra_hd.webp',
  '14': 'dish-images/fried_cheese_ultra_hd.webp',
  '15': 'dish-images/schnitzel_ultra_hd.webp',
  '16': 'dish-images/kebab_box_ultra_hd_fixed.webp',
  '17': 'dish-images/kebab_plate_ultra_hd.webp',
  '18': 'dish-images/kebab_plate_ultra_hd.webp',
  '19': 'dish-images/salads_6144x4096_enhanced.webp',
  '20': 'dish-images/salads_ultra_hd.webp',
};

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

      const body = item.querySelector('.item-body');
      const num = btn.querySelector('.item-number')?.textContent.trim();
      if (num && dishImages[num] && !body.querySelector('.dish-img')) {
        const img = document.createElement('img');
        img.className = 'dish-img';
        img.alt = btn.querySelector('.dish-name')?.childNodes[0]?.textContent.trim() || '';
        img.loading = 'lazy';
        img.onload = () => img.classList.add('loaded');
        img.src = dishImages[num];
        body.prepend(img);
      }
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
