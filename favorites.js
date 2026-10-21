// ==========================================================================
// お気に入り（LocalStorage保存・読み込み・削除・並び替え）機能
// ==========================================================================
const STORAGE_KEY = 'oreca2_favorites';

// 現在の構成をお気に入り保存
function saveCurrentFavorite() {
  if (!currentMonster) return;

  const favorites = loadFavorites();
  
  const newFav = {
    id: Date.now().toString(), // ユニークID（保存時のタイムスタンプ）
    monsterId: currentMonster.id,
    monsterName: currentMonster.name,
    chapter: currentMonster.chapter,
    reels: JSON.parse(JSON.stringify(currentReels)),
    date: new Date().toLocaleDateString()
  };

  favorites.push(newFav);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  alert(`「${currentMonster.name}」のコマンド構成をお気に入り保存しました！`);
}

// お気に入り一覧を読み込み
function loadFavorites() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// お気に入り一覧モーダルを開く
function openFavoritesModal() {
  renderFavoritesList();
  document.getElementById('favoritesModal').classList.add('active');
}

// お気に入り一覧モーダルを閉じる
function closeFavoritesModal() {
  document.getElementById('favoritesModal').classList.remove('active');
}

// お気に入り一覧の描画（並び替え対応版）
function renderFavoritesList() {
  const body = document.getElementById('favoritesListBody');
  let favorites = loadFavorites();

  // 選択されている並び替え条件を取得
  const sortSelect = document.getElementById('sortOrder');
  const sortOrder = sortSelect ? sortSelect.value : 'newest';

  // 条件に合わせて配列を並び替え（ソート）
  favorites.sort((a, b) => {
    if (sortOrder === 'newest') {
      return Number(b.id) - Number(a.id); // 新しい順（IDのタイムスタンプ降順）
    } else if (sortOrder === 'oldest') {
      return Number(a.id) - Number(b.id); // 古い順（IDのタイムスタンプ昇順）
    } else if (sortOrder === 'name') {
      return a.monsterName.localeCompare(b.monsterName, 'ja'); // モンスター名の50音順
    } else if (sortOrder === 'chapter') {
      return a.chapter.localeCompare(b.chapter, 'ja'); // 章の名前順
    }
    return 0;
  });

  if (favorites.length === 0) {
    body.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 2rem 0;">保存されたお気に入り構成はありません。</p>';
    return;
  }

  body.innerHTML = '';
  favorites.forEach(fav => {
    const item = document.createElement('div');
    item.className = 'favorite-item';

    item.innerHTML = `
      <div>
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.25rem;">
          <span class="badge badge-amber">${fav.chapter}</span>
          <span style="font-weight: bold; color: #fff; font-size: 1rem;">${fav.monsterName}</span>
          <span style="font-size: 0.7rem; color: #64748b;">(${fav.date})</span>
        </div>
        <div style="font-size: 0.75rem; color: #94a3b8; font-family: monospace;">リール構成保存済み</div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-amber" onclick="loadFavoriteItem('${fav.id}')">読み込む</button>
        <button class="btn btn-rose" onclick="deleteFavoriteItem('${fav.id}')">削除</button>
      </div>
    `;
    body.appendChild(item);
  });
}

// お気に入りの構成をシミュレーターに読み込む
function loadFavoriteItem(favId) {
  const favorites = loadFavorites();
  const fav = favorites.find(f => f.id === favId);
  if (!fav) return;

  selectMonster(fav.monsterId, fav.reels);
  closeFavoritesModal();
}

// お気に入りを削除
function deleteFavoriteItem(favId) {
  if (!confirm('このお気に入り構成を削除してもよろしいですか？')) return;

  let favorites = loadFavorites();
  favorites = favorites.filter(f => f.id !== favId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  renderFavoritesList();
}