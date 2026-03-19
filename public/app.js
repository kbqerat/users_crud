const API = '/api/users';

const form          = document.getElementById('user-form');
const nameInput     = document.getElementById('name');
const emailInput    = document.getElementById('email');
const ageInput      = document.getElementById('age');
const genreInput    = document.getElementById('genre');
const userIdInput   = document.getElementById('user-id');
const formTitle     = document.getElementById('form-title');
const submitBtn     = document.getElementById('submit-btn');
const cancelBtn     = document.getElementById('cancel-btn');
const usersBody     = document.getElementById('users-body');
const usersCards    = document.getElementById('users-cards');
const emptyState    = document.getElementById('empty-state');
const emptySub      = document.getElementById('empty-sub');
const tableWrap     = document.getElementById('table-wrap');
const skeleton      = document.getElementById('skeleton');
const searchInput   = document.getElementById('search');
const clearSearch   = document.getElementById('clear-search');
const genreFilter   = document.getElementById('genre-filter');
const perPage       = document.getElementById('per-page');
const pagination    = document.getElementById('pagination');
const paginInfo     = document.getElementById('pagination-info');
const pageNumbers   = document.getElementById('page-numbers');
const prevPage      = document.getElementById('prev-page');
const nextPage      = document.getElementById('next-page');
const firstPage     = document.getElementById('first-page');
const lastPage      = document.getElementById('last-page');
const mobileToggle      = document.getElementById('mobile-form-toggle');
const mobileToggleIcon  = document.getElementById('mobile-toggle-icon');
const mobileToggleLabel = document.getElementById('mobile-toggle-label');
const sidebar           = document.getElementById('sidebar');
const importCsvBtn      = document.getElementById('import-csv-btn');
const csvOverlay        = document.getElementById('csv-overlay');
const closeCsvBtn       = document.getElementById('close-csv');
const cancelCsvBtn      = document.getElementById('cancel-csv');
const csvDrop           = document.getElementById('csv-drop');
const csvFile           = document.getElementById('csv-file');
const csvPreview        = document.getElementById('csv-preview');
const csvPreviewBody    = document.getElementById('csv-preview-body');
const csvRowCount       = document.getElementById('csv-row-count');
const csvClearBtn       = document.getElementById('csv-clear-btn');
const doImportBtn       = document.getElementById('do-import-btn');
const csvResult         = document.getElementById('csv-result');
const advFilterBtn      = document.getElementById('adv-filter-btn');
const advFilters        = document.getElementById('advanced-filters');
const ageMinRange       = document.getElementById('age-min-range');
const ageMaxRange       = document.getElementById('age-max-range');
const ageMinVal         = document.getElementById('age-min-val');
const ageMaxVal         = document.getElementById('age-max-val');
const rangeFill         = document.getElementById('range-fill');
const resetFiltersBtn   = document.getElementById('reset-filters-btn');
const archivesCard      = document.getElementById('archives-card');
const archivesCount     = document.getElementById('archives-count');
const archivesList      = document.getElementById('archives-list');
const archivesEmpty     = document.getElementById('archives-empty');
const archivesSkeleton  = document.getElementById('archives-skeleton');
const archivesToggle    = document.getElementById('archives-toggle');
const archivesBody      = document.getElementById('archives-body');
const archivesChevron   = document.getElementById('archives-chevron');
const deleteAllBtn      = document.getElementById('delete-all-btn');
const deleteAllOverlay  = document.getElementById('delete-all-overlay');
const cancelDeleteAll   = document.getElementById('cancel-delete-all');
const confirmDeleteAll  = document.getElementById('confirm-delete-all');
const deleteAllCount    = document.getElementById('delete-all-count');
const deleteUserName    = document.getElementById('delete-user-name');
const shortcutsBtn      = document.getElementById('shortcuts-btn');
const shortcutsOverlay  = document.getElementById('shortcuts-overlay');
const closeShortcuts    = document.getElementById('close-shortcuts');
const activityList      = document.getElementById('activity-list');
const clearLogBtn       = document.getElementById('clear-log-btn');
const exportCsvBtn      = document.getElementById('export-csv-btn');
const exportPdfBtn  = document.getElementById('export-pdf-btn');
const themeToggle   = document.getElementById('theme-toggle');
const themeIcon     = document.getElementById('theme-icon');
const toast         = document.getElementById('toast');
const modalOverlay  = document.getElementById('modal-overlay');
const confirmDel    = document.getElementById('confirm-delete');
const cancelDel     = document.getElementById('cancel-delete');
const detailOverlay = document.getElementById('detail-overlay');
const closeDetail   = document.getElementById('close-detail');
const detailEditBtn = document.getElementById('detail-edit-btn');
const detailCopyBtn = document.getElementById('detail-copy-btn');
const editOverlay   = document.getElementById('edit-overlay');
const editForm      = document.getElementById('edit-form');
const editUserId    = document.getElementById('edit-user-id');
const editName      = document.getElementById('edit-name');
const editEmail     = document.getElementById('edit-email');
const editAge       = document.getElementById('edit-age');
const editGenre     = document.getElementById('edit-genre');
const editSaveBtn   = document.getElementById('edit-save-btn');
const editCancelBtn = document.getElementById('edit-cancel-btn');
const editClose     = document.getElementById('edit-close');
const editAvatar    = document.getElementById('edit-avatar');
const editModalName = document.getElementById('edit-modal-name');
const editModalEmail= document.getElementById('edit-modal-email');

const statTotal  = document.getElementById('stat-total');
const statHommes = document.getElementById('stat-hommes');
const statFemmes = document.getElementById('stat-femmes');
const statAvg    = document.getElementById('stat-avg');
const statYoung  = document.getElementById('stat-young');
const statOld    = document.getElementById('stat-old');

let allUsers       = [];
let filteredUsers  = [];
let currentPage    = 1;
let sortCol        = 'createdAt';
let sortDir        = 'desc';
let pendingDeleteId= null;
let currentDetail  = null;

let chartGenre = null;
let chartAge   = null;

function initCharts() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const labelColor = isDark ? '#94a3b8' : '#64748b';

  Chart.defaults.font.family = 'Inter, sans-serif';

  const ctxG = document.getElementById('chart-genre').getContext('2d');
  chartGenre = new Chart(ctxG, {
    type: 'doughnut',
    data: {
      labels: ['Masculin', 'Féminin', 'Non renseigné'],
      datasets: [{ data: [0, 0, 0], backgroundColor: ['#3b82f6', '#ec4899', '#cbd5e1'], borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}` } } },
      animation: { animateScale: true }
    }
  });

  const ctxA = document.getElementById('chart-age').getContext('2d');
  chartAge = new Chart(ctxA, {
    type: 'bar',
    data: {
      labels: ['0–20', '21–30', '31–40', '41–50', '51+'],
      datasets: [{
        label: 'Utilisateurs',
        data: [0, 0, 0, 0, 0],
        backgroundColor: ['#a5b4fc','#818cf8','#6366f1','#4f46e5','#3730a3'],
        borderRadius: 7,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: labelColor, font: { size: 11 } } },
        y: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 11 }, stepSize: 1, precision: 0 }, beginAtZero: true }
      },
      animation: { duration: 600 }
    }
  });
}

function renderRecentUsers(users) {
  const el = document.getElementById('recent-list');
  const recent = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (!recent.length) {
    el.innerHTML = '<div class="recent-empty">Aucun utilisateur pour l\'instant.</div>';
    return;
  }
  el.innerHTML = recent.map(u => {
    const initials    = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const avatarClass = u.genre === 'Masculin' ? 'male' : u.genre === 'Féminin' ? 'female' : 'none';
    const date = u.createdAt
      ? new Date(u.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })
      : '—';
    return `
      <div class="recent-item" data-id="${u.id}">
        <div class="avatar ${avatarClass}" style="width:36px;height:36px;font-size:0.78rem;flex-shrink:0">${initials}</div>
        <div class="recent-item-info">
          <div class="recent-item-name">${escHtml(u.name)}</div>
          <div class="recent-item-date">${date}</div>
        </div>
      </div>`;
  }).join('');

  el.querySelectorAll('.recent-item').forEach(item => {
    item.addEventListener('click', () => {
      const user = allUsers.find(u => u.id === item.dataset.id);
      if (user) openDetail(user);
    });
  });
}

function updateCharts(users) {
  if (!chartGenre || !chartAge) return;

  const hommes = users.filter(u => u.genre === 'Masculin').length;
  const femmes = users.filter(u => u.genre === 'Féminin').length;
  const autres = users.filter(u => !u.genre).length;
  chartGenre.data.datasets[0].data = [hommes, femmes, autres];
  chartGenre.update();

  const legendEl = document.getElementById('chart-genre-legend');
  legendEl.innerHTML = [
    { label: 'Masculin', val: hommes, color: '#3b82f6' },
    { label: 'Féminin',  val: femmes, color: '#ec4899' },
    { label: 'Autre',    val: autres, color: '#cbd5e1' },
  ].map(l => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${l.color}"></span>
      <span class="legend-label">${l.label}</span>
      <span class="legend-value">${l.val}</span>
    </div>`).join('');

  const buckets = [0, 0, 0, 0, 0];
  users.forEach(u => {
    if (!u.age) return;
    const a = Number(u.age);
    if (a <= 20) buckets[0]++;
    else if (a <= 30) buckets[1]++;
    else if (a <= 40) buckets[2]++;
    else if (a <= 50) buckets[3]++;
    else buckets[4]++;
  });
  chartAge.data.datasets[0].data = buckets;
  chartAge.update();
}

function refreshChartTheme() {
  if (!chartGenre || !chartAge) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor  = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  chartAge.options.scales.x.ticks.color = labelColor;
  chartAge.options.scales.y.ticks.color = labelColor;
  chartAge.options.scales.y.grid.color  = gridColor;
  chartAge.update();
}

const LOG_KEY = 'um_activity';
const LOG_MAX = 20;

function getLog() {
  try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch { return []; }
}
function saveLog(log) { localStorage.setItem(LOG_KEY, JSON.stringify(log)); }

function addActivity(type, name) {
  const log = getLog();
  log.unshift({ type, name, time: new Date().toISOString() });
  saveLog(log.slice(0, LOG_MAX));
  renderActivity();
}

function renderActivity() {
  const log = getLog();
  if (!log.length) {
    activityList.innerHTML = '<li class="activity-empty">Aucune activité pour l\'instant.</li>';
    return;
  }
  activityList.innerHTML = log.map(entry => {
    const icons  = { add: 'fa-plus', edit: 'fa-pen', delete: 'fa-trash' };
    const labels = { add: 'Ajouté', edit: 'Modifié', delete: 'Supprimé' };
    return `
      <li class="activity-item">
        <div class="activity-icon ${entry.type}">
          <i class="fa-solid ${icons[entry.type]}"></i>
        </div>
        <div class="activity-body">
          <div class="activity-msg">${labels[entry.type]} : <span>${escHtml(entry.name)}</span></div>
          <div class="activity-time">${relativeTime(entry.time)}</div>
        </div>
      </li>`;
  }).join('');
}

function relativeTime(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60)   return 'À l\'instant';
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400)return `Il y a ${Math.floor(diff / 3600)} h`;
  return new Date(iso).toLocaleDateString('fr-FR', { day:'2-digit', month:'short' });
}

clearLogBtn.addEventListener('click', () => {
  localStorage.removeItem(LOG_KEY);
  renderActivity();
  showToast('Historique effacé', 'info');
});

archivesToggle.addEventListener('click', () => {
  const open = archivesBody.style.display !== 'none';
  archivesBody.style.display = open ? 'none' : 'block';
  archivesChevron.classList.toggle('open', !open);
});

deleteAllBtn.addEventListener('click', () => {
  const count = allUsers.length;
  if (!count) return showToast('Aucun utilisateur à supprimer', 'error');
  deleteAllCount.textContent = count;
  deleteAllOverlay.style.display = 'flex';
});
cancelDeleteAll.addEventListener('click', () => deleteAllOverlay.style.display = 'none');
deleteAllOverlay.addEventListener('click', e => { if (e.target === deleteAllOverlay) deleteAllOverlay.style.display = 'none'; });
confirmDeleteAll.addEventListener('click', async () => {
  deleteAllOverlay.style.display = 'none';
  confirmDeleteAll.disabled = true;
  for (const user of [...allUsers]) {
    await fetch(`${API}/${user.id}`, { method: 'DELETE' });
    addActivity('delete', user.name);
  }
  confirmDeleteAll.disabled = false;
  showToast('Tous les utilisateurs supprimés', 'info');
  fetchUsers(); fetchArchived();
});

shortcutsBtn.addEventListener('click', () => shortcutsOverlay.style.display = 'flex');
closeShortcuts.addEventListener('click', () => shortcutsOverlay.style.display = 'none');
shortcutsOverlay.addEventListener('click', e => { if (e.target === shortcutsOverlay) shortcutsOverlay.style.display = 'none'; });

document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  const typing = ['INPUT','TEXTAREA','SELECT'].includes(tag);

  if (e.key === 'Escape') {
    if (shortcutsOverlay.style.display === 'flex') { shortcutsOverlay.style.display = 'none'; return; }
    if (editOverlay.style.display === 'flex')      { closeEditModal(); return; }
    if (detailOverlay.style.display === 'flex')    { detailOverlay.style.display = 'none'; return; }
    if (modalOverlay.style.display === 'flex')     { modalOverlay.style.display = 'none'; return; }
    if (typing) { document.activeElement.blur(); return; }
    if (searchInput.value) { searchInput.value = ''; clearSearch.style.display = 'none'; applyFiltersAndRender(); }
  }

  if (typing) return;

  if (e.key === '/' || e.key === 'f') {
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === 'n' || e.key === 'N') {
    if (window.innerWidth <= 768) {
      sidebar.classList.add('open');
      mobileToggleIcon.className = 'fa-solid fa-xmark';
      mobileToggleLabel.textContent = 'Masquer le formulaire';
    }
    nameInput.focus();
  }
  if (e.key === '?') { shortcutsOverlay.style.display = 'flex'; }
  if (e.key === 'd' || e.key === 'D') {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
    refreshChartTheme();
  }
});

mobileToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  mobileToggleIcon.className  = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-plus';
  mobileToggleLabel.textContent = isOpen ? 'Masquer le formulaire' : 'Ajouter un utilisateur';
  if (isOpen) sidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
  refreshChartTheme();
});
function updateThemeIcon(t) { themeIcon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'; }

let toastTimer;
function showToast(msg, type = 'success') {
  clearTimeout(toastTimer);
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<strong>${icons[type]}</strong> ${msg}`;
  toast.className = `toast ${type} show`;
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

async function fetchUsers() {
  skeleton.style.display = 'flex';
  tableWrap.style.display = 'none';
  emptyState.style.display = 'none';
  pagination.style.display = 'none';
  try {
    const [usersRes, statsRes] = await Promise.all([fetch(API), fetch(`${API}/stats`)]);
    allUsers = await usersRes.json();
    renderStats(await statsRes.json());
    updateCharts(allUsers);
    renderRecentUsers(allUsers);
    applyFiltersAndRender();
  } catch {
    showToast('Erreur de connexion au serveur', 'error');
  } finally {
    skeleton.style.display = 'none';
  }
}

function animateCount(el, from, to, duration, suffix = '') {
  if (from === to) { el.textContent = to + suffix; return; }
  el.classList.add('counting');
  const start = performance.now();
  const range = to - from;
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + range * ease) + suffix;
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      el.classList.remove('counting');
      el.animate([{ transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 200, easing: 'ease-out' });
    }
  }
  requestAnimationFrame(step);
}

function renderStats(s) {
  const prev = {
    total:   parseInt(statTotal.textContent)  || 0,
    hommes:  parseInt(statHommes.textContent) || 0,
    femmes:  parseInt(statFemmes.textContent) || 0,
    avg:     parseInt(statAvg.textContent)    || 0,
    young:   parseInt(statYoung.textContent)  || 0,
    old:     parseInt(statOld.textContent)    || 0,
  };

  animateCount(statTotal,  prev.total,  s.total,             700);
  animateCount(statHommes, prev.hommes, s.hommes,            700);
  animateCount(statFemmes, prev.femmes, s.femmes,            700);
  animateCount(statAvg,    prev.avg,    s.avgAge   || 0,     800, s.avgAge   ? ' ans' : '');
  animateCount(statYoung,  prev.young,  s.youngest || 0,     800, s.youngest ? ' ans' : '');
  animateCount(statOld,    prev.old,    s.oldest   || 0,     800, s.oldest   ? ' ans' : '');

  if (!s.avgAge)   statAvg.textContent   = '—';
  if (!s.youngest) statYoung.textContent = '—';
  if (!s.oldest)   statOld.textContent   = '—';
}

function applyFiltersAndRender() {
  const q  = searchInput.value.trim().toLowerCase();
  const gf = genreFilter.value;

  const ageMin = Number(ageMinRange.value);
  const ageMax = Number(ageMaxRange.value);
  const ageFilterActive = ageMin > 1 || ageMax < 120;

  filteredUsers = allUsers.filter(u => {
    const matchQ   = !q  || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchG   = !gf || u.genre === gf;
    const matchAge = !ageFilterActive || (u.age && u.age >= ageMin && u.age <= ageMax);
    return matchQ && matchG && matchAge;
  });

  filteredUsers.sort((a, b) => {
    let va = a[sortCol] ?? '';
    let vb = b[sortCol] ?? '';
    if (sortCol === 'age') {
      va = Number(va) || 0;
      vb = Number(vb) || 0;
      return sortDir === 'asc' ? va - vb : vb - va;
    }
    va = String(va).toLowerCase();
    vb = String(vb).toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ?  1 : -1;
    return 0;
  });

  currentPage = 1;
  renderPage();
}

function renderPage() {
  const limit      = Number(perPage.value);
  const total      = filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * limit;
  const slice = filteredUsers.slice(start, start + limit);

  usersBody.innerHTML = '';

  if (total === 0) {
    emptyState.style.display = 'block';
    tableWrap.style.display  = 'none';
    pagination.style.display = 'none';
    emptySub.textContent = searchInput.value || genreFilter.value
      ? 'Aucun résultat pour ces filtres.'
      : 'Commence par en ajouter un !';
    return;
  }

  emptyState.style.display = 'none';
  tableWrap.style.display  = 'block';

  const isMobile = window.innerWidth <= 768;
  usersCards.innerHTML = '';

  slice.forEach((u, i) => {
    const initials    = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const avatarClass = u.genre === 'Masculin' ? 'male' : u.genre === 'Féminin' ? 'female' : 'none';
    const date = u.createdAt
      ? new Date(u.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
      : '—';

    const tr = document.createElement('tr');
    tr.style.animationDelay = `${i * 0.04}s`;
    tr.innerHTML = `
      <td><div class="user-cell"><div class="avatar ${avatarClass}">${initials}</div><span class="user-name">${escHtml(u.name)}</span></div></td>
      <td class="email-cell">${escHtml(u.email)}</td>
      <td>${genreBadge(u.genre)}</td>
      <td>${u.age ? `<span class="age-badge">${u.age} ans</span>` : '<span style="color:var(--text-subtle)">—</span>'}</td>
      <td class="date-cell">${date}</td>
      <td class="actions-cell">
        <button class="btn btn-icon btn-view-icon"    data-id="${u.id}" title="Voir"><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-icon btn-edit-icon"    data-id="${u.id}" title="Modifier"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-icon btn-archive-icon" data-id="${u.id}" title="Archiver"><i class="fa-solid fa-box-archive"></i></button>
        <button class="btn btn-icon btn-del-icon"     data-id="${u.id}" title="Supprimer définitivement"><i class="fa-solid fa-trash"></i></button>
      </td>`;
    usersBody.appendChild(tr);

    const card = document.createElement('div');
    card.className = 'user-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="user-card-avatar ${avatarClass}">${initials}</div>
      <div class="user-card-body">
        <div class="user-card-name">${escHtml(u.name)}</div>
        <div class="user-card-email">${escHtml(u.email)}</div>
        <div class="user-card-meta">
          ${genreBadge(u.genre)}
          ${u.age ? `<span class="age-badge">${u.age} ans</span>` : ''}
          <span style="font-size:0.72rem;color:var(--text-subtle)">${date}</span>
        </div>
      </div>
      <div class="user-card-actions">
        <button class="btn btn-icon btn-view-icon"    data-id="${u.id}" title="Voir"><i class="fa-solid fa-eye"></i></button>
        <button class="btn btn-icon btn-edit-icon"    data-id="${u.id}" title="Modifier"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-icon btn-archive-icon" data-id="${u.id}" title="Archiver"><i class="fa-solid fa-box-archive"></i></button>
        <button class="btn btn-icon btn-del-icon"     data-id="${u.id}" title="Supprimer"><i class="fa-solid fa-trash"></i></button>
      </div>`;
    usersCards.appendChild(card);
  });

  if (totalPages > 1) {
    pagination.style.display = 'flex';
    paginInfo.textContent = `${start + 1}–${Math.min(start + limit, total)} sur ${total}`;
    firstPage.disabled = prevPage.disabled = currentPage === 1;
    lastPage.disabled  = nextPage.disabled = currentPage === totalPages;
    renderPageNumbers(totalPages);
  } else {
    pagination.style.display = 'none';
  }
}

function genreBadge(genre) {
  if (!genre) return '<span style="color:var(--text-subtle)">—</span>';
  const cls  = genre === 'Masculin' ? 'male' : 'female';
  const icon = genre === 'Masculin' ? 'fa-mars' : 'fa-venus';
  return `<span class="genre-badge ${cls}"><i class="fa-solid ${icon}"></i>${genre}</span>`;
}

function renderPageNumbers(totalPages) {
  pageNumbers.innerHTML = '';
  const range = buildPageRange(currentPage, totalPages);
  range.forEach(p => {
    if (p === '...') {
      const span = document.createElement('span');
      span.className = 'page-ellipsis';
      span.textContent = '…';
      pageNumbers.appendChild(span);
    } else {
      const btn = document.createElement('button');
      btn.className = `page-number${p === currentPage ? ' active' : ''}`;
      btn.textContent = p;
      btn.addEventListener('click', () => { currentPage = p; renderPage(); });
      pageNumbers.appendChild(btn);
    }
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);
  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('...');
    result.push(p);
  });
  return result;
}

document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    sortDir = sortCol === col ? (sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
    sortCol = col;
    document.querySelectorAll('th.sortable').forEach(t => t.classList.remove('sort-asc', 'sort-desc'));
    th.classList.add(sortDir === 'asc' ? 'sort-asc' : 'sort-desc');
    applyFiltersAndRender();
  });
});

searchInput.addEventListener('input', () => {
  clearSearch.style.display = searchInput.value ? 'block' : 'none';
  applyFiltersAndRender();
});
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  clearSearch.style.display = 'none';
  applyFiltersAndRender();
});
genreFilter.addEventListener('change', applyFiltersAndRender);
perPage.addEventListener('change', () => { currentPage = 1; renderPage(); });

firstPage.addEventListener('click', () => { currentPage = 1; renderPage(); });
prevPage.addEventListener('click',  () => { if (currentPage > 1) { currentPage--; renderPage(); } });
nextPage.addEventListener('click',  () => {
  const totalPages = Math.ceil(filteredUsers.length / Number(perPage.value));
  if (currentPage < totalPages) { currentPage++; renderPage(); }
});
lastPage.addEventListener('click', () => {
  currentPage = Math.ceil(filteredUsers.length / Number(perPage.value));
  renderPage();
});

function handleActionClick(e) {
  const btn = e.target.closest('.btn-icon');
  if (!btn) return;
  const user = allUsers.find(u => u.id === btn.dataset.id);
  if (!user) return;
  if (btn.classList.contains('btn-view-icon'))    openDetail(user);
  if (btn.classList.contains('btn-edit-icon'))    startEdit(user);
  if (btn.classList.contains('btn-archive-icon')) archiveUser(user.id, user.name);
  if (btn.classList.contains('btn-del-icon'))     openDeleteModal(user.id, user.name);
}
usersBody.addEventListener('click', handleActionClick);
usersCards.addEventListener('click', handleActionClick);

function validateForm() {
  let ok = true;
  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age   = ageInput.value;

  if (!name || name.length < 2) { setFieldError('name', 'Au moins 2 caractères.'); ok = false; }
  else setFieldValid('name');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldError('email', 'Email invalide.'); ok = false; }
  else setFieldValid('email');

  if (!age) { setFieldError('age', 'L\'âge est requis.'); ok = false; }
  else if (Number(age) < 1 || Number(age) > 120) { setFieldError('age', 'Entre 1 et 120.'); ok = false; }
  else clearFieldError('age');

  if (!genreInput.value) { setFieldError('genre', 'Veuillez choisir un genre.'); ok = false; }
  else clearFieldError('genre');

  return ok;
}
function setFieldError(f, m) { document.getElementById(f).classList.replace('valid','invalid') || document.getElementById(f).classList.add('invalid'); document.getElementById(`err-${f}`).textContent = m; }
function setFieldValid(f)   { document.getElementById(f).classList.replace('invalid','valid') || document.getElementById(f).classList.add('valid'); document.getElementById(`err-${f}`).textContent = ''; }
function clearFieldError(f) { document.getElementById(f).classList.remove('invalid','valid'); document.getElementById(`err-${f}`).textContent = ''; }
[nameInput, emailInput, ageInput].forEach(inp => inp.addEventListener('input', () => clearFieldError(inp.id)));
genreInput.addEventListener('change', () => clearFieldError('genre'));

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!validateForm()) return;
  const id   = userIdInput.value;
  const body = { name: nameInput.value.trim(), email: emailInput.value.trim(), age: ageInput.value ? Number(ageInput.value) : null, genre: genreInput.value || null };
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> En cours…';
  try {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (res.status === 409) {
      setFieldError('email', 'Cet email est déjà utilisé');
      return;
    }
    showToast('Utilisateur ajouté');
    addActivity('add', body.name);
    resetForm();
    sidebar.classList.remove('open');
    mobileToggleIcon.className = 'fa-solid fa-plus';
    mobileToggleLabel.textContent = 'Ajouter un utilisateur';
    fetchUsers();
  } catch { showToast('Erreur lors de la sauvegarde', 'error'); }
  finally { submitBtn.disabled = false; resetSubmitBtn(); }
});

function startEdit(user) {
  detailOverlay.style.display = 'none';
  editUserId.value = user.id;
  editName.value   = user.name;
  editEmail.value  = user.email;
  editAge.value    = user.age ?? '';
  editGenre.value  = user.genre ?? '';
  ['edit-name','edit-email','edit-age','edit-genre'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('invalid','valid');
    document.getElementById('edit-err-' + id.replace('edit-',''))?.textContent && (document.getElementById('edit-err-' + id.replace('edit-','')).textContent = '');
  });
  const initials    = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  const avatarClass = user.genre === 'Masculin' ? 'male' : user.genre === 'Féminin' ? 'female' : 'none';
  editAvatar.textContent = initials;
  editAvatar.className   = `edit-avatar ${avatarClass}`;
  editModalName.textContent  = user.name;
  editModalEmail.textContent = user.email;
  editOverlay.style.display  = 'flex';
  setTimeout(() => editName.focus(), 50);
}

function openDetail(user) {
  currentDetail = user;
  const initials    = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarClass = user.genre === 'Masculin' ? 'male' : user.genre === 'Féminin' ? 'female' : 'none';
  const date = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    : '—';
  const da = document.getElementById('detail-avatar');
  da.textContent  = initials;
  da.className    = `detail-avatar ${avatarClass}`;
  document.getElementById('detail-name').textContent  = user.name;
  document.getElementById('detail-email').textContent = user.email;
  document.getElementById('detail-genre').innerHTML   = genreBadge(user.genre);
  document.getElementById('detail-age').textContent   = user.age ? `${user.age} ans` : '—';
  document.getElementById('detail-date').textContent  = date;
  detailOverlay.style.display = 'flex';
}

closeDetail.addEventListener('click', () => detailOverlay.style.display = 'none');
detailOverlay.addEventListener('click', e => { if (e.target === detailOverlay) detailOverlay.style.display = 'none'; });
detailEditBtn.addEventListener('click', () => { if (currentDetail) startEdit(currentDetail); });

function closeEditModal() { editOverlay.style.display = 'none'; }
editClose.addEventListener('click', closeEditModal);
editCancelBtn.addEventListener('click', closeEditModal);
editOverlay.addEventListener('click', e => { if (e.target === editOverlay) closeEditModal(); });

editEmail.addEventListener('blur', async () => {
  const val = editEmail.value.trim();
  if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return;
  const res  = await fetch(`${API}/check-email?email=${encodeURIComponent(val)}&excludeId=${editUserId.value}`);
  const data = await res.json();
  if (data.exists) {
    editEmail.classList.add('invalid');
    document.getElementById('edit-err-email').textContent = 'Cet email est déjà utilisé';
  } else {
    editEmail.classList.remove('invalid');
    document.getElementById('edit-err-email').textContent = '';
  }
});
['edit-name','edit-email','edit-age'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('invalid','valid');
    document.getElementById('edit-err-' + id.replace('edit-','')).textContent = '';
  });
});
editGenre.addEventListener('change', () => {
  editGenre.classList.remove('invalid');
  document.getElementById('edit-err-genre').textContent = '';
});

editForm.addEventListener('submit', async e => {
  e.preventDefault();
  let ok = true;
  const name  = editName.value.trim();
  const email = editEmail.value.trim();
  const age   = editAge.value;
  const genre = editGenre.value;
  if (name.length < 2) { editName.classList.add('invalid'); document.getElementById('edit-err-name').textContent = 'Nom trop court (min 2 caractères)'; ok = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { editEmail.classList.add('invalid'); document.getElementById('edit-err-email').textContent = 'Email invalide'; ok = false; }
  if (!age || Number(age) < 1 || Number(age) > 120) { editAge.classList.add('invalid'); document.getElementById('edit-err-age').textContent = 'Âge entre 1 et 120'; ok = false; }
  if (!genre) { editGenre.classList.add('invalid'); document.getElementById('edit-err-genre').textContent = 'Genre requis'; ok = false; }
  if (!ok) return;
  editSaveBtn.disabled = true;
  editSaveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> En cours…';
  try {
    const res = await fetch(`${API}/${editUserId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, age: Number(age), genre })
    });
    if (res.status === 409) {
      editEmail.classList.add('invalid');
      document.getElementById('edit-err-email').textContent = 'Cet email est déjà utilisé';
      return;
    }
    closeEditModal();
    addActivity('edit', name);
    showToast('Utilisateur modifié');
    fetchUsers();
  } catch { showToast('Erreur lors de la sauvegarde', 'error'); }
  finally { editSaveBtn.disabled = false; editSaveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Enregistrer'; }
});
detailCopyBtn.addEventListener('click', () => {
  if (!currentDetail) return;
  navigator.clipboard.writeText(currentDetail.email).then(() => showToast('Email copié !', 'info'));
});

function openDeleteModal(id, name) {
  pendingDeleteId = id;
  deleteUserName.textContent = name || 'cet utilisateur';
  modalOverlay.style.display = 'flex';
}
confirmDel.addEventListener('click', async () => {
  if (!pendingDeleteId) return;
  const deleted = allUsers.find(u => u.id === pendingDeleteId);
  await fetch(`${API}/${pendingDeleteId}`, { method: 'DELETE' });
  modalOverlay.style.display = 'none';
  if (deleted) addActivity('delete', deleted.name);
  pendingDeleteId = null;
  showToast('Utilisateur supprimé définitivement', 'info');
  fetchUsers();
  fetchArchived();
});
cancelDel.addEventListener('click', () => { modalOverlay.style.display = 'none'; pendingDeleteId = null; });
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) { modalOverlay.style.display = 'none'; pendingDeleteId = null; } });

async function archiveUser(id, name) {
  await fetch(`${API}/${id}/archive`, { method: 'PATCH' });
  addActivity('edit', name);
  showToast(`${name} archivé`, 'info');
  fetchUsers();
  fetchArchived();
}

async function fetchArchived() {
  archivesSkeleton.style.display = 'flex';
  archivesEmpty.style.display = 'none';
  archivesList.innerHTML = '';
  const res  = await fetch(`${API}/archived`);
  const list = await res.json();
  archivesSkeleton.style.display = 'none';
  archivesCount.textContent = list.length;
  if (!list.length) { archivesEmpty.style.display = 'block'; archivesCard.style.display = 'none'; return; }
  const wasHidden = archivesCard.style.display === 'none';
  archivesCard.style.display = 'block';
  if (wasHidden) {
    archivesBody.style.display = 'none';
    archivesChevron.classList.remove('open');
  }
  archivesList.innerHTML = list.map(u => {
    const initials    = u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const avatarClass = u.genre === 'Masculin' ? 'male' : u.genre === 'Féminin' ? 'female' : 'none';
    const date = u.archivedAt
      ? new Date(u.archivedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
      : '—';
    return `
      <div class="archive-item">
        <div class="avatar ${avatarClass}" style="width:34px;height:34px;font-size:0.78rem;flex-shrink:0">${initials}</div>
        <div class="archive-item-info">
          <div class="archive-item-name">${escHtml(u.name)}</div>
          <div class="archive-item-meta">
            <span>${escHtml(u.email)}</span>
            ${u.genre ? `<span>${genreBadge(u.genre)}</span>` : ''}
            <span style="color:var(--text-subtle)">Archivé le ${date}</span>
          </div>
        </div>
        <div class="archive-item-actions">
          <button class="btn btn-icon btn-restore" data-id="${u.id}" title="Restaurer"><i class="fa-solid fa-rotate-left"></i></button>
          <button class="btn btn-icon btn-del-icon" data-id="${u.id}" data-name="${escHtml(u.name)}" title="Supprimer définitivement"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
  }).join('');

  archivesList.querySelectorAll('.btn-restore').forEach(btn => {
    btn.addEventListener('click', async () => {
      const user = list.find(u => u.id === btn.dataset.id);
      await fetch(`${API}/${btn.dataset.id}/restore`, { method: 'PATCH' });
      if (user) addActivity('add', user.name);
      showToast('Utilisateur restauré');
      fetchUsers(); fetchArchived();
    });
  });
  archivesList.querySelectorAll('.archive-item-actions .btn-del-icon').forEach(btn => {
    btn.addEventListener('click', () => openDeleteModal(btn.dataset.id, btn.dataset.name));
  });
}

function updateRangeSlider() {
  const min = Number(ageMinRange.value);
  const max = Number(ageMaxRange.value);
  ageMinVal.textContent = min;
  ageMaxVal.textContent = max;
  const pct1 = ((min - 1) / 119) * 100;
  const pct2 = ((max - 1) / 119) * 100;
  rangeFill.style.left  = pct1 + '%';
  rangeFill.style.width = (pct2 - pct1) + '%';
  applyFiltersAndRender();
}

ageMinRange.addEventListener('input', () => {
  if (Number(ageMinRange.value) > Number(ageMaxRange.value)) ageMinRange.value = ageMaxRange.value;
  updateRangeSlider();
});
ageMaxRange.addEventListener('input', () => {
  if (Number(ageMaxRange.value) < Number(ageMinRange.value)) ageMaxRange.value = ageMinRange.value;
  updateRangeSlider();
});

advFilterBtn.addEventListener('click', () => {
  const open = advFilters.style.display === 'none';
  advFilters.style.display = open ? 'flex' : 'none';
  advFilterBtn.classList.toggle('active', open);
});

resetFiltersBtn.addEventListener('click', () => {
  ageMinRange.value = 1; ageMaxRange.value = 120;
  updateRangeSlider();
  genreFilter.value = '';
  searchInput.value = ''; clearSearch.style.display = 'none';
  applyFiltersAndRender();
  showToast('Filtres réinitialisés', 'info');
});

emailInput.addEventListener('blur', async () => {
  const email = emailInput.value.trim();
  const id    = userIdInput.value;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
  const res  = await fetch(`${API}/check-email?email=${encodeURIComponent(email)}${id ? `&excludeId=${id}` : ''}`);
  const data = await res.json();
  if (data.exists) setFieldError('email', 'Cet email est déjà utilisé.');
  else setFieldValid('email');
});

let csvRows = [];

importCsvBtn.addEventListener('click', () => { csvOverlay.style.display = 'flex'; });
closeCsvBtn.addEventListener('click',  closeCsvModal);
cancelCsvBtn.addEventListener('click', closeCsvModal);
csvOverlay.addEventListener('click', e => { if (e.target === csvOverlay) closeCsvModal(); });

function closeCsvModal() {
  csvOverlay.style.display = 'none';
  resetCsvModal();
}
function resetCsvModal() {
  csvRows = [];
  csvPreview.style.display = 'none';
  csvResult.style.display  = 'none';
  csvDrop.style.display    = 'flex';
  csvFile.value = '';
  doImportBtn.disabled = true;
  doImportBtn.innerHTML = '<i class="fa-solid fa-upload"></i> Importer';
}

csvFile.addEventListener('change', () => { if (csvFile.files[0]) parseCSV(csvFile.files[0]); });
csvDrop.addEventListener('click', () => csvFile.click());
csvDrop.addEventListener('dragover', e => { e.preventDefault(); csvDrop.classList.add('drag-over'); });
csvDrop.addEventListener('dragleave', () => csvDrop.classList.remove('drag-over'));
csvDrop.addEventListener('drop', e => {
  e.preventDefault(); csvDrop.classList.remove('drag-over');
  if (e.dataTransfer.files[0]) parseCSV(e.dataTransfer.files[0]);
});
csvClearBtn.addEventListener('click', resetCsvModal);

function parseCSV(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const lines  = e.target.result.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const start  = lines[0].toLowerCase().includes('nom') || lines[0].toLowerCase().includes('name') ? 1 : 0;
    csvRows = lines.slice(start).map(line => {
      const cols  = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
      const name  = cols[0] || '';
      const email = cols[1] || '';
      const age   = cols[2] ? parseInt(cols[2]) : null;
      const genre = ['Masculin','Féminin'].includes(cols[3]) ? cols[3] : null;
      let status  = 'ok';
      if (!name || name.length < 2)                           status = 'err';
      else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) status = 'err';
      else if (age && (age < 1 || age > 120))                 status = 'err';
      else if (!genre)                                        status = 'warn';
      return { name, email, age, genre, status };
    });

    csvRowCount.textContent = `${csvRows.length} ligne(s) détectée(s)`;
    csvPreviewBody.innerHTML = csvRows.slice(0, 8).map(r => `
      <tr class="csv-row-${r.status}">
        <td>${escHtml(r.name)}</td>
        <td>${escHtml(r.email)}</td>
        <td>${r.age ?? '—'}</td>
        <td>${r.genre ?? '—'}</td>
        <td>${r.status === 'ok' ? 'Valide' : r.status === 'warn' ? 'Genre manquant' : 'Invalide'}</td>
      </tr>`).join('');
    if (csvRows.length > 8) {
      csvPreviewBody.innerHTML += `<tr><td colspan="5" style="text-align:center;color:var(--text-subtle);font-style:italic">… et ${csvRows.length - 8} autres lignes</td></tr>`;
    }
    csvDrop.style.display = 'none';
    csvPreview.style.display = 'block';
    doImportBtn.disabled = !csvRows.filter(r => r.status !== 'err').length;
  };
  reader.readAsText(file);
}

doImportBtn.addEventListener('click', async () => {
  const valid = csvRows.filter(r => r.status !== 'err');
  doImportBtn.disabled = true;
  doImportBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Import en cours…';
  let ok = 0, fail = 0;
  for (const row of valid) {
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(row) });
    if (res.ok) { ok++; addActivity('add', row.name); } else fail++;
  }
  csvPreview.style.display = 'none';
  csvResult.style.display  = 'block';
  document.getElementById('csv-ok').textContent   = ok;
  document.getElementById('csv-fail').textContent = fail;
  doImportBtn.innerHTML = '<i class="fa-solid fa-check"></i> Terminé';
  showToast(`${ok} utilisateur(s) importé(s)`);
  fetchUsers();
});

exportCsvBtn.addEventListener('click', () => {
  if (!allUsers.length) { showToast('Aucune donnée', 'info'); return; }
  const headers = ['ID', 'Nom', 'Email', 'Genre', 'Âge', 'Créé le'];
  const rows = allUsers.map(u => [
    u.id, `"${u.name}"`, u.email, u.genre ?? '', u.age ?? '',
    u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '',
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  downloadFile(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), `utilisateurs_${today()}.csv`);
  showToast('Export CSV téléchargé');
});

exportPdfBtn.addEventListener('click', () => {
  if (!allUsers.length) { showToast('Aucune donnée', 'info'); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(99, 102, 241);
  doc.rect(0, 0, 220, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('UserManager — Liste des utilisateurs', 14, 13);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}`, 14, 22);

  doc.autoTable({
    startY: 34,
    head: [['Nom', 'Email', 'Genre', 'Âge', 'Ajouté le']],
    body: allUsers.map(u => [
      u.name, u.email, u.genre ?? '—', u.age ?? '—',
      u.createdAt ? new Date(u.createdAt).toLocaleDateString('fr-FR') : '—',
    ]),
    headStyles: { fillColor: [99, 102, 241], fontStyle: 'bold', fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    styles: { cellPadding: 4 },
    columnStyles: { 0: { fontStyle: 'bold' } },
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} / ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 8);
  }

  doc.save(`utilisateurs_${today()}.pdf`);
  showToast('Export PDF téléchargé');
});

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}
function today() { return new Date().toISOString().slice(0, 10); }
function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function resetForm() {
  form.reset();
  userIdInput.value = '';
  ['name','email','age'].forEach(clearFieldError);
  formTitle.innerHTML = '<i class="fa-solid fa-user-plus"></i> Nouvel utilisateur';
  resetSubmitBtn();
  cancelBtn.style.display = 'none';
}
function resetSubmitBtn() { submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Ajouter'; submitBtn.disabled = false; }
cancelBtn.addEventListener('click', resetForm);

initCharts();
renderActivity();
updateRangeSlider();
fetchUsers();

(function initOnboarding() {
  if (localStorage.getItem('um_onboarded')) return;

  const overlay  = document.getElementById('onboarding-overlay');
  const slides   = Array.from(document.querySelectorAll('.ob-slide'));
  const dots     = Array.from(document.querySelectorAll('.ob-step-dot'));
  const prevBtn  = document.getElementById('ob-prev');
  const nextBtn  = document.getElementById('ob-next');
  const skipBtn  = document.getElementById('ob-skip');
  let current = 0;

  overlay.style.display = 'flex';

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    prevBtn.style.visibility = current === 0 ? 'hidden' : 'visible';

    if (current === slides.length - 1) {
      nextBtn.innerHTML = '<i class="fa-solid fa-check"></i> Terminer';
    } else {
      nextBtn.innerHTML = 'Suivant <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  function finish() {
    localStorage.setItem('um_onboarded', '1');
    overlay.style.display = 'none';
  }

  nextBtn.addEventListener('click', () => {
    if (current < slides.length - 1) goTo(current + 1);
    else finish();
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) goTo(current - 1);
  });

  skipBtn.addEventListener('click', finish);

  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  overlay.addEventListener('click', e => {
    if (e.target === overlay) finish();
  });
})();
fetchArchived();
