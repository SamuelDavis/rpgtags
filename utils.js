Array.prototype.clean = function (cb = item => item !== undefined) {
  return this.filter(cb);
};

Array.prototype.sum = function () {
  return this.reduce((acc, item) => acc + (parseFloat(item) || 0), 0);
};

Array.prototype.merge = function () {
  return this.reduce((acc, item) => Object.assign(acc, item), {})
};

Array.prototype.flatten = function () {
  return this.reduce((acc, item) => acc.concat(item), [])
};

Array.prototype.intersects = function (other) {
  return this.filter(item => other.indexOf(item) !== -1).length > 0;
};

function get_tags(name) {
  if (tags.hasOwnProperty(name)) {
    return [tags[name]];
  }

  return Object
    .values(tags)
    .filter(tag => tag.id.indexOf(name) !== -1);
}

function reduce_prop(prop, source, original = undefined) {
  source = typeof source === "string" ? tags[source] : source;
  original = original || source;

  if (!prop || !source) {
    return [];
  }

  if (source instanceof Array) {
    return source.reduce((acc, item) => {
      return acc.concat(reduce_prop(prop, item, original));
    }, []);
  }

  return [source[prop]]
    .concat(reduce_prop(prop, source["tags"], original))
    .map(item => format_item(item, original));
}

function format_item(item, source) {
  switch (true) {
    case item instanceof Array:
      return item.map(item => format_item(item, source));
    case typeof item === "string":
      return item.indexOf("tags.") === 0
        ? format_item(get_tags(item)[0], source)
        : template(item, source);
    default:
      return (
        item === undefined
        || !item.hasOwnProperty('requirements')
        || check_reqs(item['requirements'], source)
      )
        ? item
        : undefined;
  }
}

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

function check_reqs(reqs, source) {
  reqs = reqs instanceof Array ? reqs : [];

  const requirements = {
    equipped_any: (item_list, source) => {
      return (source['equipment'] || [])
        .reduce((acc, item) => {
          return acc || item_list.map(item => item.id).indexOf(item) !== -1
        }, false);
    }
  };

  return reqs.reduce((acc, req) => {
    const [func, args] = /([a-z_]+)\(([a-z_\., ]+)\)/g.exec(req).slice(1);
    return requirements[func]
      .apply(null, args.split(", ").map(get_tags).concat([source]));
  }, true)
}
