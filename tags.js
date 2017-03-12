const tag_store = [
  /**
   * tags.range
   */
  {
    id: "tags.range.close",
    name: "Close",
    description: "Only viable within arms' reach.",
    effects: [
      "Is viable within arms' reach."
    ]
  },
  /**
   * tags.weapons
   */
  {
    id: "tags.weapons.forceful",
    name: "Forceful",
    description: "When used as a weapon, it can knock someone backwards or even off their feet.",
    effects: [
      "Attacks push people and things around."
    ]
  },
  {
    id: "tags.weapons.forceful.messy",
    name: "Messy",
    description: "It deals damage in a particularly destructive way, ripping people and things apart.",
    effects: [
      "Damage done is particularly destructive."
    ]
  },
  /**
   * tags.item_list.weapons
   */
  {
    id: "tags.item_list.weapons.battle_axe",
    name: "Battle Axe",
    coins: 15,
    damage: 1,
    weight: 2,
    tags: [
      "tags.range.close"
    ]
  },
  /**
   * tags.move_list.basic
   */
  {
    id: "tags.move_list.basic.hack_and_slash",
    name: "Hack and Slash"
  },
  /**
   * tags.move_list.classes.barbarian
   */
  {
    id: "tags.move_list.classes.barbarian",
    name: "Musclebound",
    tags: [
      "tags.weapons.forceful",
      "tags.weapons.messy"
    ],
    requirements: [
      "equipped_any(tags.item_list.weapons)"
    ]
  },
  /**
   * tags.classes
   */
  {
    id: "tags.classes.barbarian",
    name: "Barbarian",
    moves: [
      "tags.move_list.classes.barbarian"
    ]
  }
];

window.tags = tag_store.reduce((acc, tag) => {
  acc[tag.id] = tag;
  return acc;
}, {});
