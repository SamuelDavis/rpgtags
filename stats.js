window.stats = {
  con_mod: null,
  cha_mod: null,
  str_mod: null,
  max_hp: null,
  base_dmg: null,
  dmg: null,
  load: null,
  armor: null
};

Object.keys(window.stats).forEach(key => window.stats[key] = key);
