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

  tags.range = {
    hand: build_tag({
      name: "Hand",
      description: "{name} could fit in the palm of someone's hand."
    }),
    close: build_tag({
      name: "Close",
      description: "{name} is good at attacking near things."
    }),
    reach: build_tag({
      name: "Reach",
      description: "{name} is good at attacking far things."
    })
  };

  tags.equipment = {
    forceful: build_tag({
      name: "Forceful",
      description: "{name}'s attacks can knock targets off their feet."
    })
  };

  tags.weapons = {
    flail: build_tag({
      name: "Flail",
      description: "{name} wields a ball-and-chain mace.",
      props: {
        [stats.load]: 1
      },
      tags: [
        tags.equipment.forceful
      ]
    })
  };

  tags.armor = {
    scale_mail: build_tag({
      name: "Scale Mail",
      description: "{name} wears a layer of armor like metallic fish scales.",
      props: {
        [stats.load]: 2
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

  tags.monsters = {};

  tags.monsters.general = {
    magical: build_tag({
      name: "Magical",
      description: "{name} is certainly magical in nature."
    }),
    devious: build_tag({
      name: "Devious",
      description: "{name} is more dangerous beyond the clash of battle."
    }),
    amorphous: build_tag({
      name: "Amorphous",
      description: "{name} has bizarre and unnatural anatomy."
    }),
    organized: build_tag({
      name: "Organized",
      description: "{name} is one piece of a larger, organized group."
    }),
    intelligent: build_tag({
      name: "Intelligent",
      description: "{name} is smart enough to have gained some training."
    }),
    hoarder: build_tag({
      name: "Hoarder",
      description: "{name} certainly has treasure."
    }),
    stealthy: build_tag({
      name: "Stealthy",
      description: "{name} can avoid detection and prefers to attack with surprise."
    }),
    terrifying: build_tag({
      name: "Terrifying",
      description: "{name}'s very presence evokes fear."
    }),
    cautious: build_tag({
      name: "Cautious",
      description: "{name} prises survival over agression."
    }),
    construct: build_tag({
      name: "Construct",
      description: "{name} was made, not born."
    }),
    planar: build_tag({
      name: "Planar",
      description: "{name} is from beyond this world."
    })
  };

  tags.monsters.sizes = {
    tiny: build_tag({
      name: "Tiny",
      description: "{name} is much smaller than a halfling.",
      props: {
        [stats.dmg]: -2,
      },
      tags: [
        tags.range.hand
      ]
    }),
    small: build_tag({
      name: "Small",
      description: "{name} is about halfling-sized.",
      tags: [
        tags.range.close
      ]
    }),
    normal: build_tag({
      name: "Normal-sized",
      description: "{name} is the size of a human.",
      tags: [
        tags.range.close
      ]
    }),
    large: build_tag({
      name: "Large",
      description: "{name} is much bigger than a human.",
      props: {
        [stats.max_hp]: 4,
        [stats.dmg]: 1,
      },
      tags: [
        tags.range.close,
        tags.range.reach
      ]
    }),
    huge: build_tag({
      name: "Huge",
      description: "{name} is larger than a house.",
      props: {
        [stats.max_hp]: 8,
        [stats.dmg]: 3,
      },
      tags: [
        tags.range.reach
      ]
    })
  };

  tags.monsters.organizations = {
    horde: build_tag({
      name: "Horde",
      description: "{name} is just one small part of a much larger group.",
      props: {
        [stats.base_dmg]: 6,
        [stats.max_hp]: 3
      }
    }),
    group: build_tag({
      name: "Group",
      description: "{name} is part of a small group.",
      props: {
        [stats.base_dmg]: 8,
        [stats.max_hp]: 6
      }
    }),
    solitary: build_tag({
      name: "Solitary",
      description: "{name} can live and fight without the help of others.",
      props: {
        [stats.base_dmg]: 10,
        [stats.max_hp]: 12
      }
    })
  };

  tags.monsters.defenses = {
    thick_hide: build_tag({
      name: "Thick Hide Armor",
      props: {
        [stats.armor]: 1
      }
    }),
    mail: build_tag({
      name: "Mail Armor",
      props: {
        [stats.armor]: 2
      }
    }),
    plate: build_tag({
      name: "Plate Armor",
      props: {
        [stats.armor]: 3
      }
    }),
    magic: build_tag({
      name: "Magic Armor",
      props: {
        [stats.armor]: 4
      },
      tags: [
        tags.monsters.general.magical
      ]
    })
  };

  tags.monsters.known_for = {
    strength: {
      props: {
        [stats.dmg]: 2
      },
      tags: [
        tags.equipment.forceful
      ]
    }
  };

  return tags;

  function build_tag({name = "Required", description, effects = [], moves = [], tags = [], props = {}}) {
    return Object.assign({name, description, effects, moves, tags}, props);
  }
})(window.stats);

