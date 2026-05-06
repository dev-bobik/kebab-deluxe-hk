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
window.addEventListener('scroll', () => {
  header.style.background = window.scrollY > 40
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
