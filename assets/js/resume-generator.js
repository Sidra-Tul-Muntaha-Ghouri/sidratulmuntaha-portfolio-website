'use strict';

const resumeBtn = document.querySelector('[data-generate-resume]');

function text(selector, root = document) {
  const el = root.querySelector(selector);
  return el ? el.textContent.trim().replace(/\s+/g, ' ') : '';
}

function buildResumeHTML() {
  const name = text('.info-content .name');
  const title = text('.info-content .title');
  const email = text('[href^="mailto:"]');
  const phone = text('[href^="tel:"]');
  const location = document.querySelector('.contact-item:nth-child(3) address')
    ? text('.contact-item:nth-child(3) address') : '';
  const aboutText = Array.from(document.querySelectorAll('.about-text p'))
    .map((p) => `<p>${p.innerHTML}</p>`).join('');

  let html = `<h1>${name}</h1>
    <div class="rp-contact">${title} &nbsp;|&nbsp; ${phone} &nbsp;|&nbsp; ${email} &nbsp;|&nbsp; ${location}</div>
    <h2>Professional Summary</h2>
    ${aboutText}`;

  // Resume page sections (Education, Skills, Experience, Internships, Volunteer, Certificates)
  document.querySelectorAll('[data-resume-section]').forEach((section) => {
    const sectionTitle = text('h3', section);
    html += `<h2>${sectionTitle}</h2>`;

    section.querySelectorAll('.timeline-item').forEach((item) => {
      const itemTitle = text('h4', item);
      const org = text('h6', item) || text('span > span', item);
      const date = text('span', item);
      const bullets = Array.from(item.querySelectorAll('.timeline-text'))
        .map((b) => `<li>${b.textContent.trim()}</li>`).join('');
      const pills = Array.from(item.querySelectorAll('.skills-pill'))
        .map((b) => b.textContent.trim()).join(', ');

      html += `<div class="rp-entry">
        <div class="rp-entry-top"><span>${itemTitle}</span><span class="rp-date">${date}</span></div>
        ${org ? `<div class="rp-org">${org}</div>` : ''}
        ${pills ? `<p>${pills}</p>` : ''}
        ${bullets ? `<ul>${bullets}</ul>` : ''}
      </div>`;
    });
  });

  // Featured Projects
  const projectCards = document.querySelectorAll('.featured-home .project-item');
  if (projectCards.length) {
    html += `<h2>Featured Projects</h2>`;
    projectCards.forEach((card) => {
      const pTitle = text('.project-title', card);
      const pCategory = text('.project-category', card);
      html += `<div class="rp-entry">
        <div class="rp-entry-top"><span>${pTitle}</span><span class="rp-date">${pCategory}</span></div>
      </div>`;
    });
  }

  return html;
}

resumeBtn.addEventListener('click', () => {
  let sheet = document.querySelector('.resume-print-sheet');
  if (!sheet) {
    sheet = document.createElement('div');
    sheet.className = 'resume-print-sheet';
    document.body.appendChild(sheet);
  }
  sheet.innerHTML = buildResumeHTML();
  window.print();
});