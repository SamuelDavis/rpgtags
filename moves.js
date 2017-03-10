window.moves = (function (stats) {
  let moves = {};

  moves.basic = {
    hack_and_slash: build_move({
      name: "Hack & Slash"
    }),
    volley: build_move({
      name: "Volley"
    }),
    defy_danger: build_move({
      name: "Defy Danger"
    }),
    defend: build_move({
      name: "Defend"
    }),
    spout_lore: build_move({
      name: "Spout Lore"
    }),
    discern_realities: build_move({
      name: "Discern Realities"
    }),
    parley: build_move({
      name: "Parley"
    }),
    aid: build_move({
      name: "Aid"
    }),
    interfere: build_move({
      name: "Interfere"
    })
  };

  moves.special = {
    last_breath: build_move({
      name: "Last Breath"
    }),
    encumbrance: build_move({
      name: "Encumbrance"
    }),
    make_camp: build_move({
      name: "Make Camp"
    }),
    take_watch: build_move({
      name: "Take Watch"
    }),
    undertake_a_perilous_journey: build_move({
      name: "Undertake a Perilous Journey"
    }),
    end_of_session: build_move({
      name: "End Session"
    }),
    level_up: build_move({
      name: "Level Up"
    }),
    carouse: build_move({
      name: "Carouse"
    }),
    supply: build_move({
      name: "Supply"
    }),
    recover: build_move({
      name: "Recover"
    }),
    recruit: build_move({
      name: "Recruit"
    }),
    outstanding_warrants: build_move({
      name: "Be Served Outstanding Warrants"
    }),
    bolster: build_move({
      name: "Bolster"
    })
  };

  moves.classes = {
    paladin: {
      basic: {
        lay_on_hands: build_move({
          name: "Lay on Hands",
          condition: "Touch someone, skin-to-skin, and pray for their well-being.",
          stat: stats.cha_mod,
          results: {
            10: "Heal 1d8 and remove one disease from target.",
            7: "Transfer 1d8 damage and 1 disease from target to yourself."
          }
        }),
        i_am_the_law: build_move({
          name: "I am the Law",
          condition: "Give an NPC a command based on your divine authority.",
          stat: stats.cha_mod,
          results: {
            7: "Target choose one: " + [
              "follow the command",
              "back away cautiously and flee",
              "attack"
            ].join("; ")
          }
        }),
        quest: build_move({
          name: "Go on a Quest"
        })
      },
      advanced: {
        divine_favor: build_move({
          name: "Divine Favor",
          description: "Invoke a spell as though you were a cleric of level ({level} - {acquisition_level})."
        }),
        bloody_aegis: build_move({
          name: "Bloody Aegis",
          condition: "Take damage and have fewer than 6 disabilities.",
          description: "Take no damage but acquire a disability you do not yet have."
        }),
        smite: build_move({
          name: "Smite",
          condition: "Be on a Quest.",
          description: "Deal +1d4 damage."
        }),
        exterminatus: build_move({
          name: "Exterminatus",
          condition: "Speak aloud your promise to defeat a specific enemy.",
          description: "Until your chosen target is defeated:" + [
            "+2d4 damage to that target",
            "-4 damage to any other target."
          ].join(", "),
        }),
        charge: build_move({
          name: "Charge!",
          condition: "Lead the charge into combat.",
          description: "+1 forward"
        }),
        staunch_defender: build_move({
          name: "Staunch Defender",
          condition: "Use the Defend move.",
          description: "Always get +1 hold, even on a 6-"
        }),
        setup_strike: build_move({
          name: "Setup Strike",
          condition: "Use the Hack & Slash move.",
          description: "Choose an ally: their next attack against your target does +1d4 damage."
        }),
        holy_protection: build_move({
          name: "Holy Protection",
          condition: "Be on a Quest.",
          description: "+1 armor"
        }),
        voice_of_authority: build_move({
          name: "Voice of Authority",
          description: "+1 to order hirelings"
        }),
        hospitaller: build_move({
          name: "Hospitaller",
          condition: "Heal an ally.",
          description: "Target heals an additional +1d8 damage."
        })
      }
    }
  };

  return moves;

  function build_move({name = "Required", description, condition, stat, results = {}}) {
    return {name, description, condition, stat, results};
  }
})(window.stats);

