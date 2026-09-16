'use strict';

const themeToggleBtn = document.querySelector('[data-theme-toggle]');
const htmlEl = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    htmlEl.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
  } else {
    htmlEl.removeAttribute('data-theme');
    themeToggleBtn.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
  }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});