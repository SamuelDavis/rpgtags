export default class Tag {
  constructor(
    {
      id,
      description,
      stats = {},
      effects = [],
      tags = []
    }
  ) {
    this.id = id;
    this.description = description;
    this.stats = stats;
    this.effects = effects;
    this.tags = tags;
  }
}
