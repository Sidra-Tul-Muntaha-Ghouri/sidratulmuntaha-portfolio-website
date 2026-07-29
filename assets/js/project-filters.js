'use strict';

const filterGroups = document.querySelectorAll('[data-filter-group]');
const projectItems = document.querySelectorAll('[data-filter-item]');

const activeFilters = {
  type: 'all',
  software: 'all',
  enclosure: 'all'
};

function applyFilters() {
  projectItems.forEach((item) => {
    const matchesType = activeFilters.type === 'all' || (item.dataset.type || '').includes(activeFilters.type);
    const matchesSoftware = activeFilters.software === 'all' || (item.dataset.software || '').includes(activeFilters.software);
    const matchesEnclosure = activeFilters.enclosure === 'all' || (item.dataset.enclosure || '').includes(activeFilters.enclosure);

    if (matchesType && matchesSoftware && matchesEnclosure) {
      item.classList.add('active');
      item.style.display = '';
    } else {
      item.classList.remove('active');
      item.style.display = 'none';
    }
  });
}

filterGroups.forEach((group) => {
  const groupName = group.dataset.filterGroup;
  const buttons = group.querySelectorAll('[data-filter-btn]');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilters[groupName] = btn.dataset.filterValue;
      applyFilters();
    });
  });
});