
// ─── Scroll progress bar ──────────────────────────────────────────────────────
const scrollProgressBar = document.getElementById('scrollProgress');
if (scrollProgressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

// ─── Custom SVG icons (for skills without a simple-icons slug) ────────────────
const customIcons = {
  sql:   'M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.5 6 2s-2.13 2-6 2-6-1.5-6-2 2.13-2 6-2zm0 16c-3.87 0-6-1.5-6-2v-2.23C7.61 17.63 9.72 18 12 18s4.39-.37 6-1.23V19c0 .5-2.13 2-6 2zm0-4c-3.87 0-6-1.5-6-2v-2.23C7.61 13.63 9.72 14 12 14s4.39-.37 6-1.23V15c0 .5-2.13 2-6 2zm0-4c-3.87 0-6-1.5-6-2V9.77C7.61 10.63 9.72 11 12 11s4.39-.37 6-1.23V11c0 .5-2.13 2-6 2z',
  agile: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
};

function makeCustomSvg(pathData) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '22');
  svg.setAttribute('height', '22');
  svg.innerHTML = `<path d="${pathData}"/>`;
  return svg;
}

// ─── Skills catalogue ─────────────────────────────────────────────────────────
const skillsData = [
  // Development
  { id: 'python',     name: 'Python',     level: 3, category: 'dev',   icon: 'python' },
  { id: 'git',        name: 'Git',        level: 2, category: 'dev',   icon: 'git' },
  { id: 'pentaho',    name: 'Pentaho',    level: 2, category: 'dev',   icon: 'hitachi' },
  { id: 'docker',     name: 'Docker',     level: 2, category: 'dev',   icon: 'docker' },
  { id: 'sql',        name: 'SQL',        level: 3, category: 'dev',   icon: null },
  { id: 'pulumi',     name: 'Pulumi',     level: 1, category: 'cloud', icon: 'pulumi' },
  // Data analysis
  { id: 'grafana',    name: 'Grafana',    level: 3, category: 'data',  icon: 'grafana' },
  { id: 'tableau',    name: 'Tableau',    level: 1, category: 'data',  icon: 'tableau' },
  { id: 'powerbi',    name: 'Power BI',   level: 1, category: 'data',  icon: 'powerbi' },
  { id: 'sapbo',      name: 'SAP BO',     level: 1, category: 'data',  icon: 'sap' },
  // Orchestration
  { id: 'stepfunctions',    name: 'Step Functions',    level: 3, category: 'orchestration',  icon: 'amazonwebservices' },
  { id: 'prefect',    name: 'Prefect',    level: 1, category: 'orchestration',  icon: 'prefect' },
  { id: 'airflow',    name: 'Airflow',    level: 1, category: 'orchestration',  icon: 'apacheairflow' },
  // Databases
  { id: 'mysql',      name: 'MySQL',      level: 3, category: 'db',    icon: 'mysql' },
  { id: 'mssql',      name: 'SQL Server', level: 2, category: 'db',    icon: 'microsoftsqlserver' },
  { id: 'postgresql', name: 'PostgreSQL', level: 3, category: 'db',    icon: 'postgresql' },
  { id: 'oracle',     name: 'Oracle',     level: 2, category: 'db',    icon: 'oracle' },
  // Cloud
  { id: 'aws',        name: 'AWS',        level: 3, category: 'cloud', icon: 'amazonwebservices' },
  { id: 'snowflake',  name: 'Snowflake',  level: 1, category: 'cloud', icon: 'snowflake' },
  { id: 'databricks', name: 'Databricks', level: 1, category: 'cloud', icon: 'databricks' },
  // Project management
  { id: 'bitbucket',  name: 'Bitbucket',  level: 3, category: 'pm',    icon: 'bitbucket' },
  { id: 'agile',      name: 'Agile',      level: 3, category: 'pm',    icon: null },
  { id: 'jira',       name: 'Jira',       level: 2, category: 'pm',    icon: 'jira' },
];

const categoryDefs = ['dev', 'data', 'orchestration', 'db', 'cloud', 'pm'];

function renderSkills() {
  const container = document.querySelector('.skills-cards');
  if (!container) return;
  container.innerHTML = '';
  const lang = document.documentElement.lang || 'fr';
  const t = translations[lang] || translations.fr;

  categoryDefs.forEach(cat => {
    const items = skillsData
      .filter(s => s.category === cat)
      .sort((a, b) => b.level - a.level || (skillDuration[b.id] || 0) - (skillDuration[a.id] || 0));
    if (!items.length) return;

    const card = document.createElement('div');
    card.className = 'skill-card';

    const label = document.createElement('span');
    label.className = 'skill-card__label';
    label.dataset.i18n = `skills.${cat}`;
    label.textContent = t[`skills.${cat}`] || cat;
    card.appendChild(label);

    const itemsDiv = document.createElement('div');
    itemsDiv.className = 'skill-card__items';

    items.forEach(s => {
      const div = document.createElement('div');
      div.className = 'stack-item';
      div.dataset.level = s.level;
      div.dataset.skill = s.id;

      if (s.icon) {
        const img = document.createElement('img');
        img.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${s.icon}.svg`;
        img.alt = s.name;
        img.addEventListener('error', () => { img.style.display = 'none'; });
        div.appendChild(img);
      } else if (customIcons[s.id]) {
        div.appendChild(makeCustomSvg(customIcons[s.id]));
      }

      const nameSpan = document.createElement('span');
      nameSpan.textContent = s.name;
      div.appendChild(nameSpan);

      const dots = document.createElement('span');
      dots.className = 'skill-dots';
      dots.innerHTML = '<i></i><i></i><i></i>';
      div.appendChild(dots);

      itemsDiv.appendChild(div);
    });

    card.appendChild(itemsDiv);
    container.appendChild(card);
  });
}

// ─── Role → Skills mapping ────────────────────────────────────────────────────
const roleSkills = {
  laps: {
    start: CURRENT_JOB_START,
    end: null,                  // ongoing
    skills: [
      { id: 'python',         key: true  },
      { id: 'aws',            key: true  },
      { id: 'grafana',        key: true  },
      { id: 'mysql',          key: true  },
      { id: 'sql',            key: false },
      { id: 'snowflake',      key: false },
      { id: 'docker',         key: false },
      { id: 'bitbucket',      key: false },
      { id: 'agile',          key: false },
      { id: 'databricks',     key: false },
      { id: 'jira',           key: false },
      { id: 'pulumi',         key: false },
      { id: 'git',            key: false },
      { id: 'stepfunctions',  key: false },
      { id: 'airflow',        key: false },
    ]
  },
  bialr1: {
    start: new Date(2023, 0),   // Jan 2023
    end:   new Date(2023, 11),  // Dec 2023
    skills: [
      { id: 'pentaho',    key: true  },
      { id: 'aws',        key: true  },
      { id: 'postgresql', key: true  },
      { id: 'prefect',    key: true  },
      { id: 'sql',        key: false },
      { id: 'agile',      key: false },
      { id: 'jira',       key: false },
      { id: 'git',        key: false },
    ]
  },
  bialr2: {
    start: new Date(2021, 8),   // Sep 2021
    end:   new Date(2022, 11),  // Dec 2022
    skills: [
      { id: 'pentaho', key: true  },
      { id: 'oracle',  key: true  },
      { id: 'git',     key: true  },
      { id: 'sql',     key: false },
    ]
  },
  bialr3: {
    start: new Date(2020, 8),   // Sep 2020
    end:   new Date(2021, 7),   // Aug 2021
    skills: [
      { id: 'pentaho', key: true  },
      { id: 'oracle',  key: true  },
      { id: 'mssql',   key: true  },
      { id: 'sapbo',   key: true  },
      { id: 'sql',     key: false },
      { id: 'aws',     key: false },
      { id: 'tableau', key: false },
      { id: 'powerbi', key: false },
      { id: 'git',     key: false },
    ]
  }
};

// Total usage duration (ms) per skill, computed after roleSkills
const skillDuration = {};
Object.values(roleSkills).forEach(role => {
  const end = role.end || new Date();
  const ms = end - role.start;
  role.skills.forEach(s => {
    skillDuration[s.id] = (skillDuration[s.id] || 0) + ms;
  });
});

const skillNames = Object.fromEntries(skillsData.map(s => [s.id, s.name]));

function roleMonths(role) {
  const end = role.end || new Date();
  return Math.max(1,
    (end.getFullYear() - role.start.getFullYear()) * 12 +
    end.getMonth() - role.start.getMonth()
  );
}

function skillTotalMonths(skillId) {
  return Object.values(roleSkills)
    .filter(r => r.skills.some(s => s.id === skillId))
    .reduce((sum, r) => sum + roleMonths(r), 0);
}

function formatSkillDuration(months, lang) {
  const halfYears = Math.ceil(months / 6);
  const y = Math.floor(halfYears / 2);
  const half = halfYears % 2 === 1;

  if (lang === 'fr') {
    if (halfYears <= 1) return '6 mois';
    const base = `${y} an${y > 1 ? 's' : ''}`;
    return half ? `${y},5 an${y > 1 ? 's' : ''}` : base;
  } else {
    if (halfYears <= 1) return '6 mo';
    const n = y + (half ? 0.5 : 0);
    return `${half ? `${y}.5` : y} yr${n > 1 ? 's' : ''}`;
  }
}

function updateSkillDurations(lang) {
  document.querySelectorAll('.stack-item[data-skill]').forEach(el => {
    const months = skillTotalMonths(el.dataset.skill);
    el.dataset.years = formatSkillDuration(months, lang);
  });
}

function generateExperienceTags() {
  document.querySelectorAll('.timeline-subitem[data-role]').forEach(el => {
    const role = roleSkills[el.dataset.role];
    if (!role) return;
    const container = el.querySelector('.tags');
    if (!container) return;
    container.innerHTML = '';
    role.skills
      .filter(s => s.key)
      .forEach(s => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = skillNames[s.id] || s.id;
        container.appendChild(span);
      });
  });
}

// ─── Read-more toggle helper ──────────────────────────────────────────────────
// Handles expand/collapse with a label swap (delayed on close for CSS animation)
function attachReadMore(btn, bodyEl, moreKey, lessKey) {
  const span = btn.querySelector('[data-i18n]');
  btn.addEventListener('click', () => {
    const expanded = bodyEl.classList.toggle('expanded');
    const t = translations[currentLang] || translations.fr;
    btn.classList.toggle('expanded', expanded);
    if (expanded) {
      span.textContent = t[lessKey];
    } else {
      // wait for close animation to finish before changing the text
      setTimeout(() => { span.textContent = t[moreKey]; }, 400);
    }
  });
}

// ─── About read more ──────────────────────────────────────────────────────────
const aboutBody   = document.getElementById('aboutBody');
const aboutToggle = document.getElementById('aboutToggle');
if (aboutBody && aboutToggle) attachReadMore(aboutToggle, aboutBody, 'about.readmore', 'about.readless');

// ─── Experience tasks toggles ─────────────────────────────────────────────────
document.querySelectorAll('.tasks-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const ul = btn.nextElementSibling;
    ul.classList.toggle('expanded');
    btn.classList.toggle('expanded', ul.classList.contains('expanded'));
    updateToggleLabel(btn, btn, 'exp.tasks.hide', 'exp.tasks.show');
  });
});

// ─── Stat counters ────────────────────────────────────────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';

  if (prefersReducedMotion) {
    el.textContent = target + suffix;
    return;
  }

  const duration = 1300;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('[data-count]').forEach(animateCounter);
      counterObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);

const statsBlock = document.querySelector('.about-stats');
if (statsBlock) counterObserver.observe(statsBlock);

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.08 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Sticky Nav show/hide ─────────────────────────────────────────────────────
const nav = document.getElementById('siteNav');

(function () {
  const THRESHOLD = 80;
  let navVisible = false;

  function updateNav() {
    const show = window.scrollY > THRESHOLD;
    if (show === navVisible) return;
    navVisible = show;
    nav.classList.toggle('visible', show);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

// ─── Active nav link ──────────────────────────────────────────────────────────
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

let clickedLink = null;

function setActive(link) {
  navLinks.forEach(a => a.classList.toggle('active', a === link));
  scrollNavToActive(link);
}

function scrollNavToActive(link) {
  const container = link.closest('.nav-links');
  if (!container) return;
  const linkCenter = link.offsetLeft + link.offsetWidth / 2;
  const target = linkCenter - container.offsetWidth / 2;
  container.scrollTo({ left: target, behavior: 'smooth' });
}

navLinks.forEach(a => {
  a.addEventListener('click', () => {
    clickedLink = a;
    setActive(a);
    // Release click lock once scroll settles
    setTimeout(() => { clickedLink = null; }, 1000);
  });
});

const activeObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting && !clickedLink) {
      navLinks.forEach(a => {
        const isActive = a.getAttribute('href') === '#' + e.target.id;
        a.classList.toggle('active', isActive);
        if (isActive) scrollNavToActive(a);
      });
    }
  }),
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => activeObserver.observe(s));

// ─── Theme toggle ─────────────────────────────────────────────────────────────
(function () {
  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');

  function currentlyDark() {
    if (html.dataset.theme) return html.dataset.theme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const dark = !currentlyDark();
      html.dataset.theme = dark ? 'dark' : 'light';
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    });
  }
})();

// ─── Footer year ──────────────────────────────────────────────────────────────
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Skill durations & experience tags ───────────────────────────────────────
const initLang = document.documentElement.lang || 'fr';
renderSkills();
updateSkillDurations(initLang);
generateExperienceTags();

// ─── Project read more ────────────────────────────────────────────────────────
document.querySelectorAll('.project-readmore').forEach(btn => {
  attachReadMore(btn, document.getElementById(btn.dataset.desc), 'projects.readmore', 'projects.readless');
});

// ─── Status dot: tap-to-toggle on touch devices ───────────────────────────────
(() => {
  const statusDot = document.querySelector('.avatar-status');
  if (!statusDot) return;
  const tooltip = statusDot.querySelector('.avatar-status__tooltip');

  statusDot.addEventListener('click', e => {
    e.stopPropagation();
    tooltip.classList.toggle('is-open');
  });

  document.addEventListener('click', () => {
    tooltip.classList.remove('is-open');
  });
})();

// ─── Contact form — Formspree AJAX ───────────────────────────────────────────
(() => {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');
  const submit = document.getElementById('contactSubmit');
  if (!form) return;

  let dismissTimer = null;

  function setStatus(msg, type) {
    clearTimeout(dismissTimer);
    status.className = `contact-form__status ${type}`;
    status.textContent = msg;
    dismissTimer = setTimeout(() => {
      status.classList.add('is-fading');
      setTimeout(() => {
        status.className = 'contact-form__status';
        status.textContent = '';
      }, 600);
    }, 10000);
  }

  function validateForm() {
    let valid = true;
    form.querySelectorAll('[required]').forEach(el => {
      const empty = !el.value.trim();
      const badEmail = el.type === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
      if (empty || badEmail) {
        el.classList.add('is-invalid');
        valid = false;
      } else {
        el.classList.remove('is-invalid');
      }
    });
    return valid;
  }

  // Clear invalid state on input
  form.querySelectorAll('[required]').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('is-invalid'));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm()) return;

    submit.disabled = true;
    submit.classList.add('is-loading');
    status.className = 'contact-form__status';
    status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        setStatus(translations[currentLang]['contact.success'], 'is-success');
        form.reset();
      } else {
        throw new Error('server');
      }
    } catch {
      setStatus(translations[currentLang]['contact.error'], 'is-error');
    } finally {
      submit.disabled = false;
      submit.classList.remove('is-loading');
    }
  });
})();
