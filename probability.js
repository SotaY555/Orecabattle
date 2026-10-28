// ==========================================
// 1ターン目 技発動確率計算スクリプト (probability.js)
// ==========================================

/**
 * 現在のシミュレーター上のリール構成 (currentReels) から、
 * 1ターン目の各技の発動確率を計算する関数
 */
function calculateFirstTurnProbabilities() {
  if (typeof SKILLS === 'undefined' || typeof currentReels === 'undefined' || currentReels.length === 0) {
    console.error('SKILLS または currentReels が定義されていません。');
    return {};
  }

  // 技ごとの確率を足し上げるためのオブジェクト
  let skillProbabilities = {};
  const reels = currentReels; // [ [リール1の6マス], [リール2の6マス], ... ]

  // 前方リール移動技かどうかを判定するヘルパー
  function isForwardMoveSkill(skillId) {
    const skill = SKILLS[skillId];
    if (!skill) return false;
    const name = skill.name;
    // 「☆→☆☆」「☆☆→☆☆☆」「☆☆☆→☆☆☆☆」などの前方移動技を判定
    return (name === '★→★★' || name === '★★→★★★' || name === '★★★→★★★★');
  }

  // --- 1リール目の抽選 (各 1/6) ---
  if (reels[0]) {
    reels[0].forEach(skillId1 => {
      const prob1 = 1 / 6;
      const skill1 = SKILLS[skillId1] || { name: `ID:${skillId1}`, type: "normal" };

      if (isForwardMoveSkill(skillId1) && reels[1]) {
        // --- 2リール目へ移動した場合 ---
        reels[1].forEach(skillId2 => {
          const prob2 = prob1 * (1 / 6);
          const skill2 = SKILLS[skillId2] || { name: `ID:${skillId2}`, type: "normal" };

          if (isForwardMoveSkill(skillId2) && reels[2]) {
            // --- 3リール目へ移動した場合 ---
            reels[2].forEach(skillId3 => {
              const prob3 = prob2 * (1 / 6);
              const skill3 = SKILLS[skillId3] || { name: `ID:${skillId3}`, type: "normal" };

              if (isForwardMoveSkill(skillId3) && reels[3]) {
                // --- 4リール目へ移動した場合 ---
                reels[3].forEach(skillId4 => {
                  const prob4 = prob3 * (1 / 6);
                  const skill4 = SKILLS[skillId4] || { name: `ID:${skillId4}`, type: "normal" };
                  
                  addProb(skill4.name, prob4);
                });
              } else {
                addProb(skill3.name, prob3);
              }
            });
          } else {
            addProb(skill2.name, prob2);
          }
        });
      } else {
        // 移動しない（その場で決定）
        addProb(skill1.name, prob1);
      }
    });
  }

  function addProb(name, prob) {
    skillProbabilities[name] = (skillProbabilities[name] || 0) + prob;
  }

  return skillProbabilities;
}

// 画面上（HTML）に確率結果を描画するUI連携関数
function renderFirstTurnProbability() {
  const resultContainer = document.getElementById('firstTurnProbResult');
  if (!resultContainer) return;

  const probs = calculateFirstTurnProbabilities();
  if (Object.keys(probs).length === 0) {
    resultContainer.innerHTML = '<p style="color: #94a3b8; font-size: 0.8rem;">計算データがありません。</p>';
    return;
  }

  // 確率が高い順に並び替え
  const sorted = Object.entries(probs).sort((a, b) => b[1] - a[1]);

  let html = '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem;">';
  sorted.forEach(([name, prob]) => {
    const percent = (prob * 100).toFixed(2);
    html += `
      <div style="background: #0f172a; border: 1px solid #334155; padding: 0.5rem 0.75rem; border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.8rem; color: #f8fafc; font-weight: bold;">${name}</span>
        <span style="font-size: 0.85rem; color: #38bdf8; font-family: monospace; font-weight: bold;">${percent}%</span>
      </div>
    `;
  });
  html += '</div>';

  resultContainer.innerHTML = html;
}