tags["tags.characters.bueno"] = {
  id: "tags.characters.bueno",
  name: "Bueno the Barbarian",
  description: "{name} is pretty great.",
  equipment: [
    "tags.item_list.weapons.battle_axe"
  ],
  inventory: [],
  moves: [
    "tags.move_list.basic"
  ],
  effects: [
    "Is pretty great."
  ],
  tags: [
    "tags.classes.barbarian"
  ]
};

console.log({
  description: reduce_prop(
    "description",
    [tags["tags.characters.bueno"], tags["tags.characters.bueno"].equipment]
  ).clean().join(" "),
  effects: reduce_prop(
    "effects",
    [tags["tags.characters.bueno"], tags["tags.characters.bueno"].equipment]
  ).clean().flatten().join(" "),
  moves: reduce_prop(
    "moves",
    tags["tags.characters.bueno"]
  ).clean().flatten().map(move => move.name).join("; "),
  weight: reduce_prop(
    "weight",
    [tags["tags.characters.bueno"], tags["tags.characters.bueno"].equipment]
  ).clean().sum()
});
