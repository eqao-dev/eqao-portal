/**
 * EQAO Portal - 授業資料インプットページ共通JS
 * 
 * 使い方：
 * 各HTMLページで以下を定義してからこのスクリプトを読み込む
 * 
 * const INPUT_CONFIG = {
 *   themeId: 1,                          // テーマID
 *   themeName: 'テーマ名',                // テーマ名
 *   categories: ['カテゴリ1', 'カテゴリ2'], // 複数カテゴリの場合は配列
 *   // または
 *   category: 'カテゴリ名',               // 単一カテゴリの場合
 *   outputPage: 'output-01-xxx.html'      // 遷移先アウトプットページ
 * };
 */

(function() {
  'use strict';

  // ===== 定数 =====
  const API_URL = 'https://script.google.com/macros/s/AKfycbyXdCxzPU6oXAm2Mi9mfMDeNvQAyE0mmTOABA2EOYelvX6J2Rr48VcizS0vMgIS7Qc7/exec';
  const PAGE_SIZES = [10, 20, 50];
  const DEFAULT_PAGE_SIZE = 20;

  // ===== 状態管理 =====
  let currentUser = null;
  let columns = [];
  let readStatus = {};
  let currentPage = 1;
  let pageSize = DEFAULT_PAGE_SIZE;
  let filterMode = 'all'; // 'all', 'unread', 'read'

  // ===== 設定の取得 =====
  function getConfig() {
    if (typeof INPUT_CONFIG === 'undefined') {
      console.error('INPUT_CONFIG が定義されていません');
      return null;
    }
    return INPUT_CONFIG;
  }

  // ===== ユーティリティ =====
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getCategories() {
    const config = getConfig();
    if (config.categories) {
      return config.categories;
    } else if (config.category) {
      return [config.category];
    }
    return [];
  }

  // ===== フィルター済みコラム取得 =====
  function getFilteredColumns() {
    if (filterMode === 'all') {
      return columns;
    } else if (filterMode === 'unread') {
      return columns.filter((_, index) => !readStatus[index]);
    } else if (filterMode === 'read') {
      return columns.filter((_, index) => readStatus[index]);
    }
    return columns;
  }

  // ===== ページネーション計算 =====
  function getPaginationInfo() {
    const filtered = getFilteredColumns();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    
    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      currentPage,
      pageSize
    };
  }

  // ===== 現在ページのコラム取得 =====
  function getCurrentPageColumns() {
    const filtered = getFilteredColumns();
    const { startIndex, endIndex } = getPaginationInfo();
    return filtered.slice(startIndex, endIndex).map((col, i) => ({
      ...col,
      originalIndex: columns.indexOf(col) // 元のインデックスを保持
    }));
  }

  // ===== コントロールUI生成 =====
  function renderControls() {
    const container = document.getElementById('columnControls');
    if (!container) return;

    const { totalItems, totalPages, startIndex, endIndex } = getPaginationInfo();
    const readCount = Object.keys(readStatus).filter(k => readStatus[k]).length;
    const unreadCount = columns.length - readCount;

    container.innerHTML = `
      <div class="controls-row">
        <div class="filter-group">
          <button class="filter-btn ${filterMode === 'all' ? 'active' : ''}" onclick="InputCommon.setFilter('all')">
            すべて <span class="badge">${columns.length}</span>
          </button>
          <button class="filter-btn ${filterMode === 'unread' ? 'active' : ''}" onclick="InputCommon.setFilter('unread')">
            未読 <span class="badge">${unreadCount}</span>
          </button>
          <button class="filter-btn ${filterMode === 'read' ? 'active' : ''}" onclick="InputCommon.setFilter('read')">
            既読 <span class="badge">${readCount}</span>
          </button>
        </div>
        <div class="page-size-group">
          <label>表示件数：</label>
          <select onchange="InputCommon.setPageSize(this.value)">
            ${PAGE_SIZES.map(size => `
              <option value="${size}" ${size === pageSize ? 'selected' : ''}>${size}件</option>
            `).join('')}
            <option value="all" ${pageSize === Infinity ? 'selected' : ''}>全件</option>
          </select>
        </div>
      </div>
      ${totalItems > 0 ? `
        <div class="controls-row">
          <div class="showing-info">
            ${totalItems}件中 ${startIndex + 1}〜${endIndex}件を表示
          </div>
          ${totalPages > 1 ? `
            <div class="pagination">
              <button class="page-btn" onclick="InputCommon.prevPage()" ${currentPage <= 1 ? 'disabled' : ''}>
                <span class="material-icons">chevron_left</span>
              </button>
              ${generatePageNumbers(totalPages)}
              <button class="page-btn" onclick="InputCommon.nextPage()" ${currentPage >= totalPages ? 'disabled' : ''}>
                <span class="material-icons">chevron_right</span>
              </button>
            </div>
          ` : ''}
        </div>
      ` : ''}
    `;
  }

  // ===== ページ番号生成 =====
  function generatePageNumbers(totalPages) {
    let pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return pages.map(p => {
      if (p === '...') {
        return '<span class="page-ellipsis">...</span>';
      }
      return `<button class="page-num ${p === currentPage ? 'active' : ''}" onclick="InputCommon.goToPage(${p})">${p}</button>`;
    }).join('');
  }

  // ===== コラム描画 =====
  function renderColumns() {
    const container = document.getElementById('columnList');
    if (!container) return;

    const pageColumns = getCurrentPageColumns();
    
    if (pageColumns.length === 0) {
      const message = filterMode === 'unread' ? '未読のコラムはありません' :
                      filterMode === 'read' ? '既読のコラムはありません' :
                      'コラムがありません';
      container.innerHTML = `
        <div class="empty-state">
          <span class="material-icons">article</span>
          <p>${message}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = pageColumns.map(col => {
      const index = col.originalIndex;
      const isRead = readStatus[index] || false;
      const categoryHtml = col.category ? 
        `<span class="column-item-category">${escapeHtml(col.category)}</span>` : '';
      
      return `
        <div class="column-item" data-index="${index}">
          <div class="column-item-header" onclick="InputCommon.toggleColumn(${index})">
            <div class="column-check ${isRead ? 'checked' : ''}" onclick="event.stopPropagation(); InputCommon.toggleRead(${index})">
              <span class="material-icons">check</span>
            </div>
            <div class="column-item-info">
              <div class="column-item-title">${escapeHtml(col.title)}</div>
              <div class="column-item-meta">
                ${categoryHtml}
                ${col.date || ''}
              </div>
            </div>
            <span class="material-icons column-expand">expand_more</span>
          </div>
          <div class="column-content">
            <div class="column-content-text">${escapeHtml(col.content)}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ===== 進捗更新 =====
  function updateProgress() {
    const config = getConfig();
    const total = columns.length;
    const read = Object.keys(readStatus).filter(k => readStatus[k]).length;
    const percent = total > 0 ? Math.round((read / total) * 100) : 0;

    const totalCountEl = document.getElementById('totalCount');
    const readCountEl = document.getElementById('readCount');
    const progressFillEl = document.getElementById('progressFill');
    
    if (totalCountEl) totalCountEl.textContent = total;
    if (readCountEl) readCountEl.textContent = read;
    if (progressFillEl) progressFillEl.style.width = percent + '%';

    // 完了ボタンの状態
    const completeBtn = document.getElementById('completeBtn');
    const statusText = document.getElementById('statusText');

    if (completeBtn && statusText) {
      if (read >= total && total > 0) {
        completeBtn.disabled = false;
        statusText.innerHTML = '<strong>すべての記事を読みました！</strong>';
      } else {
        completeBtn.disabled = true;
        statusText.textContent = `あと ${total - read} 記事を読んでください`;
      }
    }

    // ローカルストレージに進捗保存
    if (currentUser) {
      const progressData = JSON.parse(localStorage.getItem(`eqao_lesson_progress_${currentUser.studentId}`) || '{}');
      progressData[config.themeId] = progressData[config.themeId] || {};
      progressData[config.themeId].inputProgress = percent;
      localStorage.setItem(`eqao_lesson_progress_${currentUser.studentId}`, JSON.stringify(progressData));
    }
  }

  // ===== コラム開閉 =====
  function toggleColumn(index) {
    const item = document.querySelector(`.column-item[data-index="${index}"]`);
    if (!item) return;
    
    item.classList.toggle('open');
    
    // 開いたら自動的に既読にする
    if (item.classList.contains('open') && !readStatus[index]) {
      setTimeout(() => {
        if (item.classList.contains('open')) {
          markAsRead(index);
        }
      }, 1000);
    }
  }

  // ===== 既読トグル =====
  function toggleRead(index) {
    if (readStatus[index]) {
      delete readStatus[index];
    } else {
      readStatus[index] = true;
    }
    saveReadStatus();
    updateCheckUI(index);
    updateProgress();
    renderControls(); // フィルターバッジ更新
  }

  // ===== 既読にする =====
  function markAsRead(index) {
    if (!readStatus[index]) {
      readStatus[index] = true;
      saveReadStatus();
      updateCheckUI(index);
      updateProgress();
      renderControls();
    }
  }

  // ===== チェックUI更新 =====
  function updateCheckUI(index) {
    const check = document.querySelector(`.column-item[data-index="${index}"] .column-check`);
    if (check) {
      if (readStatus[index]) {
        check.classList.add('checked');
      } else {
        check.classList.remove('checked');
      }
    }
  }

  // ===== 読了状態保存 =====
  async function saveReadStatus() {
    const config = getConfig();
    
    // ローカルにも保存（バックアップ）
    localStorage.setItem(`eqao_input_read_${currentUser.studentId}_${config.themeId}`, JSON.stringify(readStatus));
    
    // 読了済み記事のインデックス配列を作成
    const readArticles = Object.keys(readStatus).filter(k => readStatus[k]).map(k => parseInt(k));
    const total = columns.length;
    const percent = total > 0 ? Math.round((readArticles.length / total) * 100) : 0;
    
    // サーバーに保存
    try {
      const url = new URL(API_URL);
      url.searchParams.set('action', 'saveLessonProgress');
      url.searchParams.set('studentId', currentUser.studentId);
      url.searchParams.set('themeId', config.themeId);
      url.searchParams.set('inputCompleted', 'false');
      url.searchParams.set('inputProgress', percent);
      url.searchParams.set('readArticles', JSON.stringify(readArticles));
      await fetch(url.toString());
    } catch (error) {
      console.error('読了状態の保存エラー:', error);
    }
  }

  // ===== インプット完了 =====
  async function completeInput() {
    const config = getConfig();
    const completeBtn = document.getElementById('completeBtn');
    
    completeBtn.disabled = true;
    completeBtn.innerHTML = '<span class="material-icons">sync</span> 保存中...';

    try {
      const readArticles = Object.keys(readStatus).filter(k => readStatus[k]).map(k => parseInt(k));
      
      // ローカルストレージに保存
      const progressData = JSON.parse(localStorage.getItem(`eqao_lesson_progress_${currentUser.studentId}`) || '{}');
      progressData[config.themeId] = {
        inputCompleted: true,
        inputCompletedAt: new Date().toISOString(),
        inputProgress: 100,
        readArticles: readArticles
      };
      localStorage.setItem(`eqao_lesson_progress_${currentUser.studentId}`, JSON.stringify(progressData));

      // サーバー保存
      const url = new URL(API_URL);
      url.searchParams.set('action', 'saveLessonProgress');
      url.searchParams.set('studentId', currentUser.studentId);
      url.searchParams.set('themeId', config.themeId);
      url.searchParams.set('inputCompleted', 'true');
      url.searchParams.set('inputProgress', '100');
      url.searchParams.set('readArticles', JSON.stringify(readArticles));
      await fetch(url.toString());

      alert('インプット完了！アウトプットに進みましょう。');
      window.location.href = config.outputPage;

    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました。もう一度お試しください。');
      completeBtn.disabled = false;
      completeBtn.innerHTML = '<span class="material-icons">check_circle</span> インプット完了';
    }
  }

  // ===== 復習表示 =====
  function showContent() {
    const config = getConfig();
    
    document.getElementById('alreadyCompleted').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('completeFooter').style.display = 'block';
    
    const completeBtn = document.getElementById('completeBtn');
    completeBtn.disabled = false;
    completeBtn.innerHTML = '<span class="material-icons">arrow_forward</span> アウトプットへ進む';
    completeBtn.onclick = function() {
      window.location.href = config.outputPage;
    };
  }

  // ===== コラムデータ読み込み =====
  async function loadColumns() {
    const categories = getCategories();
    
    try {
      const allColumns = [];
      
      for (const category of categories) {
        const url = new URL(API_URL);
        url.searchParams.set('action', 'getColumn');
        url.searchParams.set('category', category);
        
        const res = await fetch(url.toString());
        const data = await res.json();
        
        if (Array.isArray(data)) {
          data.forEach(col => {
            // 複数カテゴリの場合のみカテゴリ情報を付与
            if (categories.length > 1) {
              col.category = category;
            }
            allColumns.push(col);
          });
        }
      }
      
      columns = allColumns;
    } catch (error) {
      console.error('コラム読み込みエラー:', error);
      columns = [];
    }
  }

  // ===== フィルター設定 =====
  function setFilter(mode) {
    filterMode = mode;
    currentPage = 1;
    renderControls();
    renderColumns();
  }

  // ===== ページサイズ設定 =====
  function setPageSize(size) {
    if (size === 'all') {
      pageSize = Infinity;
    } else {
      pageSize = parseInt(size);
    }
    currentPage = 1;
    renderControls();
    renderColumns();
  }

  // ===== ページ移動 =====
  function goToPage(page) {
    const { totalPages } = getPaginationInfo();
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderControls();
      renderColumns();
      // ページトップにスクロール
      document.querySelector('.column-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function prevPage() {
    goToPage(currentPage - 1);
  }

  function nextPage() {
    goToPage(currentPage + 1);
  }

  // ===== 初期化 =====
  async function init() {
    const config = getConfig();
    if (!config) return;

    // ログインチェック
    const loggedIn = localStorage.getItem('eqao_loggedIn');
    if (!loggedIn) {
      localStorage.setItem('eqao_returnUrl', location.href);
      window.location.href = 'login.html';
      return;
    }
    
    currentUser = {
      studentId: localStorage.getItem('eqao_studentId'),
      studentName: localStorage.getItem('eqao_studentName')
    };

    // 完了済みチェック＆読了状態読み込み
    let progressData = {};
    try {
      const res = await fetch(`${API_URL}?action=getLessonProgress&studentId=${currentUser.studentId}`);
      const result = await res.json();
      if (result.success && result.progress) {
        progressData = result.progress;
        if (progressData[config.themeId]?.readArticles) {
          progressData[config.themeId].readArticles.forEach(index => {
            readStatus[index] = true;
          });
        }
      }
    } catch (error) {
      console.error('進捗読み込みエラー:', error);
      progressData = JSON.parse(localStorage.getItem(`eqao_lesson_progress_${currentUser.studentId}`) || '{}');
      const savedReadStatus = localStorage.getItem(`eqao_input_read_${currentUser.studentId}_${config.themeId}`);
      if (savedReadStatus) {
        readStatus = JSON.parse(savedReadStatus);
      }
    }
    
    // 完了済みの場合
    if (progressData[config.themeId]?.inputCompleted) {
      document.getElementById('alreadyCompleted').style.display = 'block';
      document.getElementById('mainContent').style.display = 'none';
      document.getElementById('completeFooter').style.display = 'none';
      document.getElementById('loadingOverlay').style.display = 'none';
      return;
    }

    // コラムデータ読み込み
    await loadColumns();

    // 描画
    renderControls();
    renderColumns();
    updateProgress();

    // ローディング非表示
    document.getElementById('loadingOverlay').style.display = 'none';
  }

  // ===== グローバル公開 =====
  window.InputCommon = {
    init,
    toggleColumn,
    toggleRead,
    completeInput,
    showContent,
    setFilter,
    setPageSize,
    goToPage,
    prevPage,
    nextPage
  };

  // DOMContentLoaded で初期化
  document.addEventListener('DOMContentLoaded', init);

})();
