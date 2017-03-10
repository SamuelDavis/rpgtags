character = {
  name: "Osing",
  level: 1,
  description: "{name} is fey in appearance. {posessive.ucword} hair is short and copper-colored. {pronoun.ucword} has brown eyes. {name} is a pack-rat, and carries a satchel of random junk.",
  moves: Object.assign(
    moves.basic,
    moves.special
  ),
  gear: [
    tags.armor.scale_mail,
    tags.weapons.flail,
    {
      name: "Junk",
      [stats.load]: 2
    }
  ],
  tags: [
    tags.classes.paladin,
    tags.races.dwarf,
    tags.sexes.male
  ]
};

console.log({
  character,
  description: []
    .concat(reduce_prop("description", character))
    .concat(reduce_prop("description", character.gear)),
  gear: reduce_prop("name", character.gear),
  moves: reduce_prop("moves", character).merge(),
  load: []
    .concat(reduce_prop(stats.load, character))
    .concat(reduce_prop(stats.load, character.gear))
});

console.log("I am the Law -- " + make_move(
    moves.classes.paladin.basic.i_am_the_law,
    character
  ));

console.log("Divine Favor -- " + make_move(
    moves.classes.paladin.advanced.divine_favor,
    character
  ));

