'use strict';

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

function selectButton(group, value) {
  group.querySelectorAll('[data-filter-btn]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.filterValue === value);
  });
}

function updateDependentGroup(groupName, selectedType) {
  const group = document.querySelector(`[data-filter-group="${groupName}"]`);
  const items = group.querySelectorAll('.filter-item');
  let activeWasHidden = false;

  items.forEach((li) => {
    const parentType = li.dataset.parentType;
    const btn = li.querySelector('[data-filter-btn]');
    const isAllOption = !parentType;
    const shouldShow = isAllOption || selectedType === 'all' || parentType === selectedType;

    li.classList.toggle('is-hidden', !shouldShow);

    if (!shouldShow && btn.classList.contains('active')) {
      activeWasHidden = true;
    }
  });

  // whole enclosure group hides entirely for Power System Studies
  if (groupName === 'enclosure') {
    group.style.display = selectedType === 'power system studies' ? 'none' : '';
  }

  if (activeWasHidden) {
    activeFilters[groupName] = 'all';
    selectButton(group, 'all');
  }
}

document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const groupName = group.dataset.filterGroup;

  group.querySelectorAll('[data-filter-btn]').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilters[groupName] = btn.dataset.filterValue;
      selectButton(group, btn.dataset.filterValue);

      if (groupName === 'type') {
        updateDependentGroup('software', btn.dataset.filterValue);
        updateDependentGroup('enclosure', btn.dataset.filterValue);
      }

      applyFilters();
    });
  });
});