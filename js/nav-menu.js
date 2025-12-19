/* ========================================
   共通ナビゲーションメニュー
   nav-menu.js
======================================== */

// メニュー構造（index.htmlのボタン配置順に合わせる）
const NAV_MENU_STRUCTURE = [
  {
    category: null, // カテゴリーなし（ホーム）
    items: [
      { href: 'index.html', icon: 'home', iconColor: 'icon-indigo', label: 'ホーム' }
    ]
  },
  {
    category: 'LINE連携',
    items: [
      { href: 'https://lin.ee/nM1pgho', icon: 'chat', iconColor: 'icon-line', label: '塾生専用公式LINE', external: true },
      { href: 'https://lin.ee/qbBTdgx', icon: 'family_restroom', iconColor: 'icon-line', label: '保護者専用LINE[配信用]', external: true },
      { href: 'https://lin.ee/x3WPAvR', icon: 'mail', iconColor: 'icon-line', label: '保護者専用LINE[連絡用]', external: true }
    ]
  },
  {
    category: '塾情報',
    items: [
      { href: 'stats.html', icon: 'bar_chart', iconColor: 'icon-indigo', label: '数字で見るEQAO' },
      { href: 'simulator.html', icon: 'calculate', iconColor: 'icon-orange', label: '料金シミュレーター' },
      { href: 'results.html', icon: 'emoji_events', iconColor: 'icon-green', label: '合格実績' }
    ]
  },
  {
    category: '各種申し込み・ヘルプ',
    items: [
      { href: 'forms.html', icon: 'list_alt', iconColor: 'icon-indigo', label: '各種申し込みフォーム' },
      { href: 'faq.html', icon: 'help', iconColor: 'icon-indigo', label: 'よくある質問' }
    ]
  },
  {
    category: 'スケジュール',
    items: [
      { href: 'yearly-schedule.html', icon: 'calendar_month', iconColor: 'icon-blue', label: '年間スケジュール' },
      { href: 'exam-schedule.html', icon: 'school', iconColor: 'icon-indigo', label: '受験スケジュール' },
      { href: 'schedule.html', icon: 'event_note', iconColor: 'icon-purple', label: '授業スケジュール' }
    ]
  },
  {
    category: 'チェックリスト',
    items: [
      { href: 'checklist.html', icon: 'checklist', iconColor: 'icon-teal', label: 'チェックリスト教材' },
      { href: 'progress.html', icon: 'trending_up', iconColor: 'icon-teal', label: '自己/進捗管理シート' },
      { href: 'school-list.html', icon: 'location_city', iconColor: 'icon-teal', label: '志望校/併願校管理シート' }
    ]
  },
  {
    category: '教材',
    items: [
      { href: 'https://one-stream.io/join/user/dfc86da0-9483-45b9-97e9-2b633cb669ac', icon: 'play_circle', iconColor: 'icon-orange', label: '動画教材（onestream）', external: true },
      { href: 'materials.html', icon: 'folder_shared', iconColor: 'icon-orange', label: '生徒共通教材一覧' }
    ]
  },
  {
    category: '受験対策データベース',
    items: [
      { href: 'past-exams.html', icon: 'description', iconColor: 'icon-red', label: '過去問' },
      { href: 'documents.html', icon: 'assignment', iconColor: 'icon-red', label: '生徒の書類' },
      { href: 'interviews.html', icon: 'record_voice_over', iconColor: 'icon-red', label: '面接の内容' }
    ]
  },
  {
    category: 'コンテンツ',
    items: [
      { href: 'videos.html', icon: 'video_library', iconColor: 'icon-pink', label: '過去の集団授業動画' },
      { href: 'https://www.notion.so/EQAO-COMMUNITY-LINE-21f5f9664112803a8ee2cff1a4d5e2a7', icon: 'dashboard', iconColor: 'icon-pink', label: '生徒プラットフォーム', external: true },
      { href: 'column.html', icon: 'article', iconColor: 'icon-pink', label: 'コラム一覧' }
    ]
  },
  {
    category: 'イベント申し込み',
    items: [
      { href: 'moshi.html', icon: 'quiz', iconColor: 'icon-green', label: 'EQAO模試' },
      { href: 'mcff.html', icon: 'mic', iconColor: 'icon-green', label: 'MCFF申し込み' },
      { href: 'party.html', icon: 'celebration', iconColor: 'icon-green', label: 'EQAO PARTY' }
    ]
  },
  {
    category: 'プログラム申し込み',
    items: [
      { href: 'camp.html', icon: 'park', iconColor: 'icon-red', label: 'EQAO CAMP' },
      { href: 'study-tour.html', icon: 'flight', iconColor: 'icon-red', label: 'EQAO STUDY TOUR' }
    ]
  },
  {
    category: 'カリキュラム',
    items: [
      { href: 'zoom-links.html', icon: 'videocam', iconColor: 'icon-purple', label: 'Zoomリンク一覧' },
      { href: 'curriculum.html', icon: 'route', iconColor: 'icon-purple', label: '授業の流れ' },
      { href: 'curriculum-support.html', icon: 'account_tree', iconColor: 'icon-purple', label: 'カリキュラムとサポート体制' }
    ]
  },
  {
    category: 'ルール関連',
    items: [
      { href: 'rules.html', icon: 'gavel', iconColor: 'icon-brown', label: '生徒/保護者ルール一覧' }
    ]
  }
];

// 現在のページを取得
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return page;
}

// メニューHTMLを生成
function generateNavMenuHTML() {
  const currentPage = getCurrentPage();
  const studentName = localStorage.getItem('eqao_studentName') || 'ゲスト';
  
  let html = `
    <div id="navOverlay" class="nav-overlay" onclick="closeNav()"></div>
    <div id="navMenu" class="nav-menu">
      <div class="nav-header">
        <span class="nav-header-title">メニュー</span>
        <button class="nav-close" onclick="closeNav()">
          <span class="material-icons">close</span>
        </button>
      </div>
      
      <div class="nav-user-section">
        <div class="nav-user-info">
          <span class="material-icons">person</span>
          <span id="navUserName" class="nav-user-name">${escapeHtml(studentName)}</span>
        </div>
        <button class="nav-logout-btn" onclick="doLogout()">
          <span class="material-icons">logout</span>
          <span>ログアウト</span>
        </button>
      </div>
  `;
  
  NAV_MENU_STRUCTURE.forEach(section => {
    if (section.category) {
      html += `<div class="nav-category">${section.category}</div>`;
    }
    
    html += '<div class="nav-section">';
    
    section.items.forEach(item => {
      const isActive = item.href === currentPage;
      const isExternal = item.external;
      const isDisabled = item.disabled;
      
      let classes = 'nav-item';
      if (isActive) classes += ' active';
      if (isDisabled) classes += ' disabled';
      
      const target = isExternal ? ' target="_blank"' : '';
      const href = isDisabled ? 'javascript:void(0)' : item.href;
      
      html += `
        <a href="${href}" class="${classes}"${target}>
          <span class="material-icons ${item.iconColor}">${item.icon}</span>
          <span>${item.label}</span>
          ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
          ${isExternal ? '<span class="material-icons nav-badge-external">open_in_new</span>' : ''}
        </a>
      `;
    });
    
    html += '</div>';
  });
  
  html += `
      <div class="nav-footer">
        © 2025 EQAO Education Group
      </div>
    </div>
  `;
  
  return html;
}

// HTMLエスケープ
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// メニューを挿入
function initNavMenu() {
  // 既存のナビメニューがあれば削除
  const existingOverlay = document.getElementById('navOverlay');
  const existingMenu = document.getElementById('navMenu');
  if (existingOverlay) existingOverlay.remove();
  if (existingMenu) existingMenu.remove();
  
  // 新しいメニューを挿入
  const navHTML = generateNavMenuHTML();
  document.body.insertAdjacentHTML('beforeend', navHTML);
}

// メニューを開く
function openNav() {
  document.getElementById('navMenu').classList.add('open');
  document.getElementById('navOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// メニューを閉じる
function closeNav() {
  document.getElementById('navMenu').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ログアウト
function doLogout() {
  localStorage.removeItem('eqao_loggedIn');
  localStorage.removeItem('eqao_studentId');
  localStorage.removeItem('eqao_studentName');
  localStorage.removeItem('eqao_password');
  localStorage.removeItem('eqao_rowIndex');
  localStorage.removeItem('eqao_isAdmin');
  window.location.href = 'index.html';
}

// ユーザー名を更新
function setNavUserName() {
  const studentName = localStorage.getItem('eqao_studentName');
  const navUserName = document.getElementById('navUserName');
  if (navUserName) {
    navUserName.textContent = studentName || 'ゲスト';
  }
}

// DOMContentLoadedで初期化
document.addEventListener('DOMContentLoaded', function() {
  initNavMenu();
});
