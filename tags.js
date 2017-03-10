window.tags = (function (stats) {
  let tags = {};

  tags.sexes = {
    male: build_tag({
      name: "Male",
      props: {
        posessive: "his",
        pronoun: "he"
      }
    }),
    female: build_tag({
      name: "Female",
      props: {
        posessive: "her",
        pronoun: "she"
      }
    })
  };

  tags.races = {
    dwarf: build_tag({
      name: "Dwarf",
      description: "Like most dwarves, {name} is both short and given to hardiness."
    })
  };

  tags.armor = {
    scale_mail: build_tag({
      name: "Scale Mail",
      props: {
        [stats.load]: 2,
        description: "{name} wears a layer of armor like metallic fish scales."
      }
    })
  };

  tags.weapons = {
    flail: build_tag({
      name: "Flail",
      props: {
        [stats.load]: 1
      }
    })
  };

  tags.alignments = {
    lawful: build_tag({
      name: "Lawful",
      description: "{name} submits wholly to authority."
    }),
    chaotic: build_tag({
      name: "Chaotic",
      description: "{name} is unpredictable and usually self-centered."
    }),
    good: build_tag({
      name: "Good",
      description: "{name} is committed to improving the world however they can."
    }),
    evil: build_tag({
      name: "Evil",
      description: "{name} revels in the destruction and suffering of others."
    })
  };

  tags.classes = {
    paladin: build_tag({
      name: "Paladin",
      description: "{name} has devoted themselves as a paladin.",
      moves: moves.classes.paladin.basic,
      effects: {
        armored: {
          name: "Armored",
          description: "Ignore the 'clumsy' tag"
        }
      },
      props: {
        [stats.max_hp]: source => 10 + reduce_prop(stats.con_mod, source).sum(),
        [stats.base_dmg]: 10,
        [stats.load]: source => -12 - reduce_prop(stats.str_mod, source).sum()
      }
    })
  };

  return tags;

  function build_tag({name = "Required", description, effects = [], moves = [], props = {}}) {
    return Object.assign({name, description, effects, moves}, props);
  }
})(window.stats);

