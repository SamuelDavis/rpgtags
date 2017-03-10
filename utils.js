Array.prototype.sum = function () {
  return this.reduce((acc, item) => acc + (parseFloat(item) || 0), 0);
};

Array.prototype.merge = function () {
  return this.reduce((acc, item) => Object.assign(acc, item), {})
};

/**
 * @param {String} prop
 * @param {Object|Array} source
 * @param {Object|undefined} original defaults to source
 * @returns {Array}
 */
function reduce_prop(prop, source, original = undefined) {
  if (!prop || !source) {
    return [];
  }

  original = original || source;

  if (source instanceof Array) {
    return source.reduce((acc, source) =>
      acc.concat(reduce_prop(prop, source, original)), []);
  }

  return [source[prop]]
    .concat(reduce_prop(prop, source["tags"], original))
    .filter(item => item !== undefined)
    .map(item => {
      switch (typeof item) {
        case "function":
          return item(original);
        case "string":
          return template(item, original);
        default:
          return item
      }
    });
}

/**
 * @param {String} string
 * @param {Object} source
 * @returns {String}
 */
function template(string, source) {
  return (string.match(/{[a-z_]+(\.[a-z0-9]+)?}/g) || [])
    .reduce((string, match) => {
      let [prop, func] = match.substr(1, match.length - 2).split(".");
      const props = reduce_prop(prop, source);

      if (props.length < 1) {
        return string;
      }

      switch (func) {
        case "ucword":
          const replacement = props[0]
            .replace(/\b[a-z]/g, letter => letter.toUpperCase());
          return string.replace(match, replacement);
        default:
          return string.replace(match, props[0])
      }
    }, string);
}

function roll(sides = 6, number = 2) {
  return (new Array(number))
    .fill(Math.random)
    .map(gen_num => Math.ceil(gen_num() * sides));
}

function make_move(move, source) {
  const roll_result = roll().sum() + reduce_prop(move.stat, source).sum();
  const option = Object
    .keys(move.results)
    .sort()
    .reverse()
    .reduce((acc, check) => check < roll_result ? check : acc, false);
  const result = move.results[option] || move.description || "Defer to GM.";
  return template(result, source);
}
