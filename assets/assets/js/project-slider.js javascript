'use strict';

const sliders = document.querySelectorAll('[data-project-slider]');

sliders.forEach((slider) => {
  const images = slider.querySelectorAll('.slider-img');
  if (images.length <= 1) return;

  let currentIndex = 0;
  let intervalId = null;

  const showImage = (index) => {
    images.forEach((img) => img.classList.remove('active'));
    images[index].classList.add('active');
  };

  slider.addEventListener('mouseenter', () => {
    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 700);
  });

  slider.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    currentIndex = 0;
    showImage(0);
  });
});