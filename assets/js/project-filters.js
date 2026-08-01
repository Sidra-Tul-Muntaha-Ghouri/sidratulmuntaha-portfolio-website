'use strict';

const filterButtonGroups = document.querySelectorAll('[data-filter-group]');
const filterSelects = document.querySelectorAll('[data-filter-select]');
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

function setFilter(groupName, value) {
  activeFilters[groupName] = value;

  const btnGroup = document.querySelector(`[data-filter-group="${groupName}"]`);
  if (btnGroup) {
    btnGroup.querySelectorAll('[data-filter-btn]').forEach((b) => {
      b.classList.toggle('active', b.dataset.filterValue === value);
    });
  }

  const select = document.querySelector(`[data-filter-select="${groupName}"]`);
  if (select) select.value = value;

  applyFilters();
}

filterButtonGroups.forEach((group) => {
  const groupName = group.dataset.filterGroup;
  group.querySelectorAll('[data-filter-btn]').forEach((btn) => {
    btn.addEventListener('click', () => setFilter(groupName, btn.dataset.filterValue));
  });
});

filterSelects.forEach((select) => {
  const groupName = select.dataset.filterSelect;
  select.addEventListener('change', () => setFilter(groupName, select.value));
});