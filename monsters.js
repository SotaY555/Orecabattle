const MONSTERS = [
  {
    id: "red_dragon",
    name: "レッドドラゴン",
    maxCapacity: [12.0, 14.0, 16.0, 18.0], // ★1〜★4のキャパ容量
    availableSkillIds: [
      "miss", "kougeki", "kougeki_p", "move_1_2", "move_2_3", "move_3_4", "hi_no_iki"
    ],
    // 初期配置 (各リール6枠の技ID)
    initialReels: [
      ["kougeki", "kougeki", "hi_no_iki", "miss", "move_1_2", "kougeki_p"],
      ["kougeki", "kougeki_p", "move_2_3", "miss", "hi_no_iki", "kougeki_p"],
      ["kougeki_p", "move_3_4", "miss", "hi_no_iki", "kougeki_p", "kougeki"],
      ["kougeki_p", "hi_no_iki", "kougeki_p", "miss", "kougeki_p", "hi_no_iki"]
    ]
  },
  {
    id: "reonale",
    name: "魔王レオナーレ",
    maxCapacity: [16.8, 21.0, 24.6, 28.8], // ★1〜★4のキャパ容量
    availableSkillIds: [
      "miss", "kougeki", "kougeki_p", "tameru", "move_1_2", "move_2_3", "move_3_4", "juudentyu", "maounoichigeki", "daikoushin", "mee"
    ],
    // 初期配置 (各リール6枠の技ID)
    initialReels: [
      ["kougeki", "move_1_2", "move_1_2", "move_1_2", "move_1_2", "move_1_2"],
      ["kougeki", "move_2_3", "move_2_3", "move_2_3", "move_2_3", "move_2_3"],
      ["kougeki_p", "kougeki_p", "move_3_4", "move_3_4", "move_3_4", "move_3_4"],
      ["juudentyu", "daikoushin", "daikoushin", "daikoushin", "daikoushin", "daikoushin"]
    ]
  }
];