'use strict';

const resumeFilterBtns = document.querySelectorAll('[data-resume-filter-btn]');
const resumeSections = document.querySelectorAll('[data-resume-section]');

resumeFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    resumeFilterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const value = btn.dataset.resumeFilterValue;

    resumeSections.forEach((section) => {
      if (value === 'all' || section.dataset.resumeSection === value) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
});