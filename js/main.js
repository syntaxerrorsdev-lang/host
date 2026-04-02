// Mobile menu toggle for pages other than index
document.addEventListener('DOMContentLoaded', function () {
  const btn  = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => menu.classList.toggle('open'));
  }
});
