const MONSTERS = [
  {
    id: "red_dragon",
    name: "レッドドラゴン",
    maxCapacity: [12.0, 14.0, 16.0, 18.0], // ★1〜★4のキャパ容量
    availableSkillIds: [
      "miss", "kougeki", "kougeki_p", "kougeki_pp", "move_1_2", "move_2_3", "move_3_4", "hi_no_iki"
    ],
    // 初期配置 (各リール6枠の技ID)
    initialReels: [
      ["kougeki", "kougeki", "hi_no_iki", "miss", "move_1_2", "kougeki_p"],
      ["kougeki", "kougeki_p", "move_2_3", "miss", "hi_no_iki", "kougeki_p"],
      ["kougeki_p", "move_3_4", "miss", "hi_no_iki", "kougeki_pp", "kougeki"],
      ["kougeki_pp", "hi_no_iki", "kougeki_pp", "miss", "kougeki_pp", "hi_no_iki"]
    ]
  }
];