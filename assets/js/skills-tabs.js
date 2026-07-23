'use strict';

const skillsTabBtns = document.querySelectorAll('[data-skills-tab-btn]');
const skillsTabContents = document.querySelectorAll('[data-skills-tab-content]');

skillsTabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    skillsTabBtns.forEach((b) => b.classList.remove('active'));
    skillsTabContents.forEach((c) => c.classList.remove('active'));

    btn.classList.add('active');
    skillsTabContents[index].classList.add('active');
  });
});