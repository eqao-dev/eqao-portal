/* ========================================
   共通ナビゲーションメニュー
   nav-menu.js
   ※ index.htmlのボタン配置順に合わせて更新
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
      { href: 'https://lin.ee/nM1pgho', icon: 'person', iconColor: 'icon-line', label: '塾生LINE', external: true },
      { href: 'https://lin.ee/qbBTdgx', icon: 'campaign', iconColor: 'icon-line', label: '保護者LINE（配信用）', external: true },
      { href: 'https://lin.ee/x3WPAvR', icon: 'mail', iconColor: 'icon-line', label: '保護者LINE（連絡用）', external: true }
    ]
  },
  {
    category: '塾情報',
    items: [
      { href: 'stats.html', icon: 'bar_chart', iconColor: 'icon-blue', label: '数字で見るEQAO' },
      { href: 'simulator.html', icon: 'calculate', iconColor: 'icon-orange', label: '料金シミュレーター' },
      { href: 'results.html', icon: 'emoji_events', iconColor: 'icon-green', label: '合格実績' }
    ]
  },
  {
    category: '各種申し込み・連絡',
    items: [
      { href: 'parent-guide.html', icon: 'family_restroom', iconColor: 'icon-teal', label: '保護者の方へ' },
      { href: 'forms.html', icon: 'list_alt', iconColor: 'icon-amber', label: '各種申し込み' },
      { href: 'https://forms.gle/ijJqayjPRZZsQY5r9', icon: 'priority_high', iconColor: 'icon-red', label: '緊急連絡', external: true }
    ]
  },
  {
    category: '面談予約',
    items: [
      { href: 'meeting-principal.html', icon: 'person', iconColor: 'icon-blue', label: '塾長面談' },
      { href: 'meeting-sansya.html', icon: 'family_restroom', iconColor: 'icon-teal', label: '三者面談' },
      { href: 'meeting-tantou.html', icon: 'support_agent', iconColor: 'icon-orange', label: '担任面談' }
    ]
  },
  {
    category: 'スケジュール',
    items: [
      { href: 'yearly-schedule.html', icon: 'calendar_month', iconColor: 'icon-blue', label: '年間スケジュール' },
      { href: 'exam-schedule.html', icon: 'school', iconColor: 'icon-indigo', label: '受験スケジュール', badge: '個別' },
      { href: 'schedule.html', icon: 'event_note', iconColor: 'icon-purple', label: '授業スケジュール', badge: '個別' },
      { href: 'zoom-links.html', icon: 'videocam', iconColor: 'icon-purple', label: 'Zoomリンク一覧' }
    ]
  },
  {
    category: 'チェックリスト一覧',
    items: [
      { href: 'checklist.html', icon: 'checklist', iconColor: 'icon-teal', label: 'チェックリスト教材' },
      { href: 'progress.html', icon: 'trending_up', iconColor: 'icon-teal', label: '自己/進捗管理シート', badge: '個別' },
      { href: 'school-list.html', icon: 'location_city', iconColor: 'icon-teal', label: '志望校/併願校管理シート', badge: '個別' }
    ]
  },
  {
    category: '学習コンテンツ',
    items: [
      { href: 'https://one-stream.io/join/user/dfc86da0-9483-45b9-97e9-2b633cb669ac', icon: 'play_circle', iconColor: 'icon-orange', label: '動画教材', external: true },
      { href: 'videos.html', icon: 'video_library', iconColor: 'icon-pink', label: '過去の集団授業動画' },
      { href: 'https://www.notion.so/EQAO-COMMUNITY-LINE-21f5f9664112803a8ee2cff1a4d5e2a7', icon: 'dashboard', iconColor: 'icon-pink', label: '生徒プラットフォーム', external: true },
      { href: 'materials.html', icon: 'folder_shared', iconColor: 'icon-orange', label: '教材/問題集一式' },
      { href: 'column.html', icon: 'article', iconColor: 'icon-pink', label: 'コラム一覧' }
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
    category: 'イベント・プログラム',
    items: [
      { href: 'moshi.html', icon: 'quiz', iconColor: 'icon-green', label: 'EQAO模試' },
      { href: 'mcff.html', icon: 'mic', iconColor: 'icon-green', label: 'MCFF申し込み' },
      { href: 'party.html', icon: 'celebration', iconColor: 'icon-green', label: 'EQAO PARTY' },
      { href: 'camp.html', icon: 'wb_sunny', iconColor: 'icon-red', label: 'EQAO CAMP' },
      { href: 'study-tour.html', icon: 'flight', iconColor: 'icon-red', label: 'EQAO STUDY TOUR' },
      { href: 'recommended-events.html', icon: 'emoji_events', iconColor: 'icon-orange', label: '推奨イベント一覧' }
    ]
  },
  {
    category: 'カリキュラム・ルール',
    items: [
      { href: 'exchange-meeting.html', icon: 'groups', iconColor: 'icon-orange', label: '塾生交流会' },
      { href: 'curriculum.html', icon: 'route', iconColor: 'icon-purple', label: '授業の流れ' },
      { href: 'curriculum-support.html', icon: 'account_tree', iconColor: 'icon-purple', label: 'カリキュラムとサポート体制' },
      { href: 'rules.html', icon: 'gavel', iconColor: 'icon-brown', label: '基本事項規定および生徒保護者規則' },
      { href: 'parent-checklist.html', icon: 'family_restroom', iconColor: 'icon-green', label: '保護者向けチェックリスト' }
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
  const studentId = localStorage.getItem('eqao_studentId') || '';
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
          <span class="nav-user-id">${escapeHtml(studentId)}</span>
          <span id="navUserName" class="nav-user-name">${escapeHtml(studentName)}</span>
        </div>
        <div class="nav-user-actions">
          <a href="password-change.html" class="nav-password-btn">
            <span class="material-icons">key</span>
            <span>パスワード変更</span>
          </a>
          <button class="nav-logout-btn" onclick="doLogout()">
            <span class="material-icons">logout</span>
            <span>ログアウト</span>
          </button>
        </div>
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
      <!-- フィードバック -->
      <div class="nav-category">その他</div>
      <div class="nav-section">
        <a href="javascript:void(0)" class="nav-item" onclick="openFeedbackModal()">
          <span class="material-icons icon-grey">feedback</span>
          <span>不具合報告・ご要望</span>
        </a>
      </div>
      
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
  localStorage.removeItem('eqao_needsPasswordChange');
  localStorage.removeItem('eqao_hasVideoAccess');
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

// ============================================
// フィードバックモーダル
// ============================================
const FEEDBACK_API_URL = 'https://script.google.com/macros/s/AKfycbzskl5amlvabH3zreoRKO0jXa93v4xJj_wQEbFqnDpN_qYUSTGISFjOtHdw-ixmpzlp/exec';

function generateFeedbackModalHTML() {
  return `
    <div id="feedbackModalOverlay" class="feedback-modal-overlay" onclick="closeFeedbackModalOnOverlay(event)">
      <div class="feedback-modal" onclick="event.stopPropagation()">
        <div class="feedback-modal-header">
          <span class="material-icons">feedback</span>
          <h2>不具合報告・ご要望</h2>
          <button class="feedback-modal-close" onclick="closeFeedbackModal()">
            <span class="material-icons">close</span>
          </button>
        </div>
        
        <div class="feedback-modal-body">
          <div class="feedback-form-group">
            <label class="feedback-label">報告種別 <span class="required">*</span></label>
            <div class="feedback-type-selector">
              <label class="feedback-type-option">
                <input type="radio" name="feedbackType" value="不具合" checked>
                <span class="feedback-type-btn">
                  <span class="material-icons">bug_report</span>
                  不具合
                </span>
              </label>
              <label class="feedback-type-option">
                <input type="radio" name="feedbackType" value="要望">
                <span class="feedback-type-btn">
                  <span class="material-icons">lightbulb</span>
                  要望
                </span>
              </label>
              <label class="feedback-type-option">
                <input type="radio" name="feedbackType" value="その他">
                <span class="feedback-type-btn">
                  <span class="material-icons">help</span>
                  その他
                </span>
              </label>
            </div>
          </div>
          
          <div class="feedback-form-group">
            <label class="feedback-label">該当ページ・機能（任意）</label>
            <input type="text" id="feedbackPage" class="feedback-input" placeholder="例：受験スケジュール、チェックリスト など">
          </div>
          
          <div class="feedback-form-group">
            <label class="feedback-label">詳細内容 <span class="required">*</span></label>
            <textarea id="feedbackContent" class="feedback-textarea" rows="5" placeholder="具体的な内容をご記入ください"></textarea>
          </div>
          
          <div class="feedback-notice">
            <p>※ 順次対応いたしますので、修正はしばらくお待ちください。</p>
            <p>※ 個別の対応報告は基本的に行っておりません。更新後にご確認ください。</p>
            <p>※ ご要望については、必要に応じて個別にご連絡する場合があります。また、全てのご要望にお応えできるとは限りませんのでご了承ください。</p>
          </div>
        </div>
        
        <div class="feedback-modal-footer">
          <button class="feedback-btn-cancel" onclick="closeFeedbackModal()">キャンセル</button>
          <button class="feedback-btn-submit" onclick="submitFeedback()">
            <span class="material-icons">send</span>
            送信
          </button>
        </div>
      </div>
    </div>
  `;
}

function generateFeedbackStylesHTML() {
  return `
    <style id="feedbackModalStyles">
      
      /* フィードバックモーダル */
      .feedback-modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .feedback-modal-overlay.show {
        display: flex;
      }
      
      .feedback-modal {
        background: white;
        border-radius: 16px;
        width: 100%;
        max-width: 480px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: feedbackModalIn 0.3s ease;
      }
      
      @keyframes feedbackModalIn {
        from { opacity: 0; transform: scale(0.95) translateY(-10px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      
      .feedback-modal-header {
        background: linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%);
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .feedback-modal-header h2 {
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        margin: 0;
      }
      
      .feedback-modal-header > .material-icons {
        font-size: 24px;
      }
      
      .feedback-modal-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.2s;
      }
      
      .feedback-modal-close:hover {
        background: rgba(255,255,255,0.3);
      }
      
      .feedback-modal-body {
        padding: 20px;
        max-height: 60vh;
        overflow-y: auto;
      }
      
      .feedback-form-group {
        margin-bottom: 20px;
      }
      
      .feedback-form-group:last-child {
        margin-bottom: 0;
      }
      
      .feedback-label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
      }
      
      .feedback-label .required {
        color: #e53935;
      }
      
      .feedback-type-selector {
        display: flex;
        gap: 8px;
      }
      
      .feedback-type-option {
        flex: 1;
        cursor: pointer;
      }
      
      .feedback-type-option input {
        display: none;
      }
      
      .feedback-type-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 12px 8px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        transition: all 0.2s;
      }
      
      .feedback-type-btn .material-icons {
        font-size: 24px;
      }
      
      .feedback-type-option input:checked + .feedback-type-btn {
        border-color: #3f51b5;
        background: #e8eaf6;
        color: #3f51b5;
      }
      
      .feedback-input {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        color: #333;
        font-family: inherit;
      }
      
      .feedback-input:focus {
        outline: none;
        border-color: #3f51b5;
      }
      
      .feedback-notice {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 12px 14px;
        margin-top: 8px;
      }
      
      .feedback-notice p {
        font-size: 11px;
        color: #666;
        line-height: 1.6;
        margin: 0 0 4px 0;
      }
      
      .feedback-notice p:last-child {
        margin-bottom: 0;
      }
      
      .feedback-textarea {
        width: 100%;
        padding: 12px 14px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        font-family: inherit;
        resize: vertical;
        min-height: 120px;
      }
      
      .feedback-textarea:focus {
        outline: none;
        border-color: #3f51b5;
        box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
      }
      
      .feedback-modal-footer {
        padding: 16px 20px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }
      
      .feedback-btn-cancel {
        padding: 10px 20px;
        background: #e0e0e0;
        color: #666;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
        font-family: inherit;
      }
      
      .feedback-btn-cancel:hover {
        background: #d0d0d0;
      }
      
      .feedback-btn-submit {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 24px;
        background: linear-gradient(135deg, #5c6bc0 0%, #3f51b5 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
      }
      
      .feedback-btn-submit:hover {
        box-shadow: 0 4px 12px rgba(63, 81, 181, 0.4);
      }
      
      .feedback-btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      
      .feedback-btn-submit .material-icons {
        font-size: 18px;
      }
      
      /* 送信中スピナー */
      .feedback-spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: feedbackSpin 0.8s linear infinite;
      }
      
      @keyframes feedbackSpin {
        to { transform: rotate(360deg); }
      }
      
      /* 送信完了メッセージ */
      .feedback-success {
        text-align: center;
        padding: 40px 20px;
      }
      
      .feedback-success-icon {
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
      }
      
      .feedback-success-icon .material-icons {
        font-size: 36px;
        color: white;
      }
      
      .feedback-success-title {
        font-size: 18px;
        font-weight: 700;
        color: #333;
        margin-bottom: 8px;
      }
      
      .feedback-success-text {
        font-size: 14px;
        color: #666;
      }
    </style>
  `;
}

function initFeedbackModal() {
  // スタイルを追加
  if (!document.getElementById('feedbackModalStyles')) {
    document.head.insertAdjacentHTML('beforeend', generateFeedbackStylesHTML());
  }

  // モーダルを追加
  if (!document.getElementById('feedbackModalOverlay')) {
    document.body.insertAdjacentHTML('beforeend', generateFeedbackModalHTML());
  }
}

function openFeedbackModal() {
  // ナビを閉じる
  closeNav();

  // モーダルを初期化
  initFeedbackModal();

  // ページ入力欄をリセット
  const pageInput = document.getElementById('feedbackPage');
  if (pageInput) {
    pageInput.value = '';
  }

  // 内容をリセット
  const contentArea = document.getElementById('feedbackContent');
  if (contentArea) {
    contentArea.value = '';
  }

  // 種別をリセット
  const firstRadio = document.querySelector('input[name="feedbackType"]');
  if (firstRadio) {
    firstRadio.checked = true;
  }

  // モーダルを表示
  document.getElementById('feedbackModalOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeFeedbackModal() {
  const overlay = document.getElementById('feedbackModalOverlay');
  if (overlay) {
    overlay.classList.remove('show');
  }
  document.body.style.overflow = '';
}

function closeFeedbackModalOnOverlay(event) {
  if (event.target === event.currentTarget) {
    closeFeedbackModal();
  }
}

async function submitFeedback() {
  const typeInput = document.querySelector('input[name="feedbackType"]:checked');
  const pageInput = document.getElementById('feedbackPage');
  const contentInput = document.getElementById('feedbackContent');
  const submitBtn = document.querySelector('.feedback-btn-submit');

  const type = typeInput ? typeInput.value : '';
  const page = pageInput ? pageInput.value : '';
  const content = contentInput ? contentInput.value.trim() : '';

  if (!content) {
    alert('詳細内容を入力してください');
    return;
  }

  // ボタンを無効化
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="feedback-spinner"></span>送信中...';

  try {
    const studentId = localStorage.getItem('eqao_studentId') || '';
    const studentName = localStorage.getItem('eqao_studentName') || '';

    const params = new URLSearchParams({
      action: 'submitFeedback',
      type: type,
      page: page,
      content: content,
      studentId: studentId,
      studentName: studentName,
      userAgent: navigator.userAgent
    });

    const response = await fetch(FEEDBACK_API_URL + '?' + params.toString());
    const result = await response.json();

    if (result.success) {
      // 成功メッセージを表示
      const modalBody = document.querySelector('.feedback-modal-body');
      const modalFooter = document.querySelector('.feedback-modal-footer');

      modalBody.innerHTML = `
        <div class="feedback-success">
          <div class="feedback-success-icon">
            <span class="material-icons">check</span>
          </div>
          <div class="feedback-success-title">送信完了しました</div>
          <div class="feedback-success-text">ご報告ありがとうございます。<br>確認次第対応いたします。</div>
        </div>
      `;

      modalFooter.innerHTML = `
        <button class="feedback-btn-submit" onclick="closeFeedbackModal()" style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);">
          閉じる
        </button>
      `;
    } else {
      throw new Error(result.message || '送信に失敗しました');
    }
  } catch (error) {
    console.error('Feedback error:', error);
    alert('送信に失敗しました。時間をおいて再度お試しください。');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span class="material-icons">send</span>送信';
  }
}

// DOMContentLoadedで初期化
document.addEventListener('DOMContentLoaded', function () {
  initNavMenu();
});