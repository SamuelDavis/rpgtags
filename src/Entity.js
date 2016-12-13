import pullAt from 'lodash/pullAt';
import Tag from './Tag';

function addEntity(entity, store = []) {
  if (!(entity instanceof Entity)) {
    throw new Error(`Trying to add ${typeof entity} to Entity list.`);
  }
  store.push(entity);
  return entity;
}

function removeEntity(index, store) {
  return (pullAt(store, [index]) || []).pop();
}

export default class Entity {
  constructor(
    {
      name,
      description,
      stats = {},
      equipment = [],
      inventory = [],
      tags = []
    }
  ) {
    this.name = name;
    this.description = description;
    this.stats = stats;
    this.equipment = [];
    this.inventory = [];
    this.tags = {};
    tags.forEach(this.addTag.bind(this));
    equipment.forEach(this.equip.bind(this));
    inventory.forEach(this.store.bind(this));
  }

  equip(entity) {
    addEntity(entity, this.equipment);
    return this;
  }

  unequip(index) {
    return removeEntity(index, this.equipment);
  }

  store(entity) {
    addEntity(entity, this.inventory);
    return this;
  }

  drop(index) {
    return removeEntity(index, this.inventory);
  }

  addTag(tag) {
    if (!(tag instanceof Tag)) {
      throw new Error(`Trying to add ${typeof tag} to Tag list.`);
    }
    this.tags[tag.id] = tag;
    return this;
  }

  removeTag(tag) {
    delete this.tags[tag.id];
    return this;
  }
}

