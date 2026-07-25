'use strict';

const projectItems = document.querySelectorAll('[data-project-item]');
const projectModalContainer = document.querySelector('[data-project-modal-container]');
const projectOverlay = document.querySelector('[data-project-overlay]');
const projectModalCloseBtn = document.querySelector('[data-project-modal-close-btn]');

const projectModalImg = document.querySelector('[data-project-modal-img]');
const projectModalTitle = document.querySelector('[data-project-modal-title]');
const projectModalText = document.querySelector('[data-project-modal-text]');

const toggleProjectModal = function () {
  projectModalContainer.classList.toggle('active');
};

projectItems.forEach((item) => {
  item.addEventListener('click', function (e) {
    e.preventDefault();

    const logo = item.querySelector('[data-project-logo]');
    const title = item.querySelector('[data-project-title]');
    const text = item.querySelector('[data-project-text]');

    projectModalImg.src = logo.src;
    projectModalImg.alt = logo.alt;
    projectModalTitle.textContent = title.textContent;
    projectModalText.textContent = text.textContent;

    toggleProjectModal();
  });
});

projectModalCloseBtn.addEventListener('click', toggleProjectModal);
projectOverlay.addEventListener('click', toggleProjectModal);