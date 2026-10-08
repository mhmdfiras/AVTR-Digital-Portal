(() => {
  'use strict';

  const doc = document.documentElement;
  const body = document.body;
  const navWrap = document.querySelector('.nav-wrap');
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const year = document.getElementById('year');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  doc.classList.add('js');
  requestAnimationFrame(() => body.classList.add('site-ready'));

  if (year) year.textContent = new Date().getFullYear();

  /* ---------- lightweight site chrome ---------- */
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  body.prepend(progress);
  const progressBar = progress.firstElementChild;

  const backTop = document.createElement('button');
  backTop.className = 'back-top';
  backTop.type = 'button';
  backTop.setAttribute('aria-label', 'Back to top');
  backTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
  body.appendChild(backTop);

  const updateScrollUI = () => {
    const y = window.scrollY || doc.scrollTop;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, y / max);
    progressBar.style.transform = `scaleX(${ratio})`;
    navWrap?.classList.toggle('scrolled', y > 18);
    backTop.classList.toggle('show', y > 560);
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

  /* ---------- mobile navigation ---------- */
  const closeMenu = () => {
    nav?.classList.remove('open');
    body.classList.remove('menu-open');
    menu?.setAttribute('aria-expanded', 'false');
    const icon = menu?.querySelector('i');
    if (icon) icon.className = 'bi bi-list';
  };

  if (menu && nav) {
    menu.setAttribute('aria-expanded', 'false');
    menu.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = nav.classList.toggle('open');
      body.classList.toggle('menu-open', open);
      menu.setAttribute('aria-expanded', String(open));
      const icon = menu.querySelector('i');
      if (icon) icon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
    });
  }
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('open') && !nav.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  /* ---------- smooth in-page navigation ---------- */
  document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(link => {
    link.addEventListener('click', event => {
      const raw = link.getAttribute('href');
      const hash = raw?.includes('#') ? raw.slice(raw.indexOf('#')) : '';
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      closeMenu();
      const offset = navWrap?.offsetHeight || 82;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', hash);
    });
  });

  /* ---------- reveal animation with automatic staggering ---------- */
  const revealItems = [...document.querySelectorAll('.reveal')];
  revealItems.forEach((el, index) => el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`));

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.11, rootMargin: '0px 0px -4% 0px' });
    revealItems.forEach(el => io.observe(el));
  }

  /* ---------- animate simple home statistics once ---------- */
  const statValues = [...document.querySelectorAll('.stat strong')].filter(el => /^\d+$/.test(el.textContent.trim()));
  if (!reducedMotion && statValues.length && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const original = el.textContent.trim();
        const target = Number(original);
        const pad = original.length;
        const start = performance.now();
        const duration = 780;
        const frame = now => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased)).padStart(pad, '0');
          if (p < 1) requestAnimationFrame(frame);
          else el.textContent = original;
        };
        requestAnimationFrame(frame);
        statsObserver.unobserve(el);
      });
    }, { threshold: 0.7 });
    statValues.forEach(el => statsObserver.observe(el));
  }

  /* ---------- section-aware navigation on the home page ---------- */
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  const homeSections = ['about', 'departments', 'services', 'areas', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if ((currentPath === 'index.html' || currentPath === '') && homeSections.length && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const active = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const id = active.target.id;
      document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href') || '';
        a.classList.toggle('active', href.endsWith(`#${id}`));
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .2, .5, .8] });
    homeSections.forEach(section => sectionObserver.observe(section));
  }

  /* ---------- modern card spotlight + subtle 3D motion ---------- */
  const interactiveCards = document.querySelectorAll([
    '.dept-card', '.service-card', '.area-mini', '.feature-card', '.district',
    '.sector-card', '.area-nav-card', '.value', '.person-card', '.shift',
    '.timeline-step', '.operator-card', '.contact-item', '.complaint-home-features > div',
    '.after-steps > div', '.side-tip'
  ].join(','));

  interactiveCards.forEach(card => card.classList.add('interactive-card'));

  if (finePointer && !reducedMotion) {
    interactiveCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        const rx = (0.5 - py) * 2.4;
        const ry = (px - 0.5) * 3.2;
        card.style.setProperty('--rx', `${rx}deg`);
        card.style.setProperty('--ry', `${ry}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    document.querySelectorAll('.btn, .nav-cta').forEach(button => {
      button.classList.add('magnetic');
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        button.style.setProperty('--mag-x', `${x * 0.06}px`);
        button.style.setProperty('--mag-y', `${y * 0.08}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--mag-x', '0px');
        button.style.setProperty('--mag-y', '0px');
      });
    });
  }

  /* ---------- tiny parallax for major visual panels ---------- */
  const parallaxItems = finePointer && !reducedMotion
    ? [...document.querySelectorAll('.hero-photo, .about-photo, .subhero-photo, .area-hero-card, .hub-image, .project-media')]
    : [];
  let parallaxTicking = false;
  const updateParallax = () => {
    parallaxItems.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const center = rect.top + rect.height / 2;
      const delta = (center - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty('--parallax-y', `${Math.max(-12, Math.min(12, delta * -18))}px`);
    });
    parallaxTicking = false;
  };
  if (parallaxItems.length) {
    updateParallax();
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        parallaxTicking = true;
        requestAnimationFrame(updateParallax);
      }
    }, { passive: true });
  }

  /* ---------- accessibility + loading polish ---------- */
  document.querySelectorAll('img:not(.brand img):not(.success-brand img)').forEach(img => {
    if (!img.hasAttribute('loading')) img.loading = 'lazy';
    img.decoding = 'async';
  });
  document.querySelectorAll('a[target="_blank"]').forEach(a => {
    const rel = new Set((a.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.add('noopener');
    rel.add('noreferrer');
    a.setAttribute('rel', [...rel].join(' '));
  });
})();

/* =========================================================
   MANAGER PRESENTATION UPGRADE
   ========================================================= */
(() => {
  'use strict';

  /* Live Amman operations time */
  const timeNode = document.querySelector('[data-amman-time]');
  if (timeNode) {
    const updateAmmanTime = () => {
      try {
        timeNode.textContent = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Amman', hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
      } catch (_) {
        const now = new Date();
        timeNode.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    };
    updateAmmanTime();
    setInterval(updateAmmanTime, 30000);
  }

  /* Make the new presentation cards participate in the site spotlight motion */
  const newCards = document.querySelectorAll('.ops-step, .future-card, .sector-select');
  newCards.forEach(card => card.classList.add('interactive-card'));

  /* Interactive Amman service map */
  const mapEl = document.getElementById('serviceMap');
  if (!mapEl || typeof window.L === 'undefined') return;

  const sectors = {
    north:   { name: 'North Amman',   operator: 'EFS',       lat: 32.055, lng: 35.900, page: 'north-amman.html',   n: '01' },
    east:    { name: 'East Amman',    operator: 'EFS',       lat: 31.985, lng: 36.015, page: 'east-amman.html',    n: '02' },
    west:    { name: 'West Amman',    operator: 'IMDAAD',    lat: 31.968, lng: 35.835, page: 'west-amman.html',    n: '03' },
    south:   { name: 'South Amman',   operator: 'IMDAAD',    lat: 31.875, lng: 35.920, page: 'south-amman.html',   n: '04' },
    central: { name: 'Central Amman', operator: 'CITY BLUE', lat: 31.955, lng: 35.915, page: 'central-amman.html', n: '05' }
  };

  const map = L.map(mapEl, {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
    tap: true
  }).setView([31.965, 35.92], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const markers = {};
  const iconFor = (sector, active = false) => L.divIcon({
    className: '',
    html: `<div class="sector-map-marker${active ? ' active' : ''}">${sector.n}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -18]
  });

  Object.entries(sectors).forEach(([key, sector]) => {
    const marker = L.marker([sector.lat, sector.lng], { icon: iconFor(sector, key === 'north') }).addTo(map);
    marker.bindPopup(`<div class="map-popup"><small>SERVICE SECTOR ${sector.n}</small><strong>${sector.name}</strong><span>Operator: ${sector.operator}</span><a href="${sector.page}">OPEN SECTOR →</a></div>`);
    marker.on('click', () => selectSector(key, true));
    markers[key] = marker;
  });

  const buttons = [...document.querySelectorAll('.sector-select')];
  const nameNode = document.querySelector('[data-map-sector]');
  const operatorNode = document.querySelector('[data-map-operator]');
  const linkNode = document.querySelector('[data-map-link]');

  function selectSector(key, fromMarker = false) {
    const sector = sectors[key];
    if (!sector) return;
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.sector === key));
    Object.entries(markers).forEach(([markerKey, marker]) => marker.setIcon(iconFor(sectors[markerKey], markerKey === key)));
    if (nameNode) nameNode.textContent = sector.name;
    if (operatorNode) operatorNode.textContent = `Operator: ${sector.operator}`;
    if (linkNode) linkNode.href = sector.page;
    const selectedButton = buttons.find(btn => btn.dataset.sector === key);
    const zoom = Number(selectedButton?.dataset.zoom || 12);
    map.flyTo([sector.lat, sector.lng], zoom, { duration: 0.75 });
    if (!fromMarker) markers[key]?.openPopup();
  }

  buttons.forEach(btn => btn.addEventListener('click', () => selectSector(btn.dataset.sector)));

  /* Map sizing can be wrong when revealed after layout shifts; refresh once visible */
  if ('IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setTimeout(() => map.invalidateSize(), 120);
        mapObserver.disconnect();
      }
    }, { threshold: 0.15 });
    mapObserver.observe(mapEl);
  } else {
    setTimeout(() => map.invalidateSize(), 200);
  }
})();

/* subtle page transition for internal HTML navigation */
(() => {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download')) return;
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;
    let url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return;
    event.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { location.href = url.href; }, 130);
  });
})();


/* =========================================================
   CREATOR CONTACT CARD
   ========================================================= */
(() => {
  const credits = document.querySelectorAll('.creator-credit strong');
  if (!credits.length) return;
  const panel = document.createElement('div');
  panel.className = 'creator-contact-sheet';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML = `
    <div class="creator-contact-backdrop" data-close-creator></div>
    <div class="creator-contact-card" role="dialog" aria-modal="true" aria-label="Website designer contact">
      <button class="creator-close" type="button" aria-label="Close" data-close-creator><i class="bi bi-x-lg"></i></button>
      <span>WEBSITE DESIGN &amp; DEVELOPMENT</span>
      <h3>MHMD OBEIDAT</h3>
      <p>Contact the website designer.</p>
      <a class="creator-phone" href="tel:+962795151152"><i class="bi bi-telephone-fill"></i><div><small>CALL</small><strong>00962795151152</strong></div><i class="bi bi-arrow-up-right"></i></a>
    </div>`;
  document.body.appendChild(panel);
  const open = () => { panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); document.body.classList.add('creator-open'); };
  const close = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); document.body.classList.remove('creator-open'); };
  credits.forEach(el => { el.tabIndex=0; el.setAttribute('role','button'); el.setAttribute('aria-label','Contact MHMD OBEIDAT'); el.title='Click to call MHMD OBEIDAT'; el.addEventListener('click',open); el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}}); });
  panel.querySelectorAll('[data-close-creator]').forEach(el=>el.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.classList.contains('open'))close();});
})();
