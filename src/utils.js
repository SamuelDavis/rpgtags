import _ from 'lodash/fp';
import Tag from './Tag';
import Entity from './Entity';

export function reduceProperty(key, source, carry = {}) {
  if (source instanceof Array) {
    source.forEach(item => reduceProperty(key, item, carry));
  } else {
    const resKey = source instanceof Tag
      ? `Tag.${source.id}`
      : source instanceof Entity
        ? `Entity.${source.name}`
        : 'Unknown';
    let property = _.get(key, source);
    if (property !== undefined) {
      if (key === 'tags') {
        property = _.values(property);
      }
      carry[resKey] = property;
    }
    (_.values(source.tags) || []).forEach(tag => reduceProperty(key, tag, carry));
  }
  return carry;
}
