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

  moves.game_master = {
    reveal_an_unwelcome_truth: build_move({
      name: "Reveal an Unwelcome Truth"
    }),
    show_signs_of_an_approaching_threat: build_move({
      name: "Show Signs of an Approaching Threat"
    }),
    deal_damage: build_move({
      name: "Deal Damage"
    }),
    use_up_their_resources: build_move({
      name: "Use Up Their Resources"
    }),
    turn_their_move_back_on_them: build_move({
      name: "Turn Their Move Back On Them"
    }),
    separate_them: build_move({
      name: "Separate Them"
    }),
    give_an_opportunity_that_fits_a_class_abilities: build_move({
      name: "Give an Opportunity that Fits a Class' Abilities"
    }),
    show_a_downside_to_their_class_race_or_equipment: build_move({
      name: "Show a Downside to their Class, Race, or Equipment"
    }),
    offer_an_opportunity_with_a_cost: build_move({
      name: "Offer an Opportunity With a Cost"
    }),
    offer_an_opportunity_without_a_cost: build_move({
      name: "Offer an Opportunity Without a Cost"
    }),
    put_someone_in_a_spot: build_move({
      name: "Put Someone in a Spot"
    }),
    tell_them_the_requirements_or_consequences_and_ask: build_move({
      name: "Tell Them the Requirements or Consequences and Ask"
    })
  };

  moves.dungeon = {
    change_the_environment: build_move({
      name: "Change the Environment"
    }),
    point_to_a_looming_threat: build_move({
      name: "Point to a Looming Threat"
    }),
    introduce_a_new_faction: build_move({
      name: "Introduce a New Faction"
    }),
    introduce_a_new_creature: build_move({
      name: "Introduce a New Creature"
    }),
    use_an_existing_threat: build_move({
      name: "Use an Existing Threat"
    }),
    make_them_backtrack: build_move({
      name: "Make them Backtrack"
    }),
    present_riches_at_a_price: build_move({
      name: "Present Riches at a Price"
    }),
    present_a_challenge: build_move({
      name: "Present a Challenge"
    })
  };

  return moves;

  function build_move({name = "Required", description, condition, stat, results = {}}) {
    return {name, description, condition, stat, results};
  }
})(window.stats);

