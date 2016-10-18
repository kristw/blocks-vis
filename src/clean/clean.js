const _ = require('lodash');
const fs = require('fs');
const blocks = require('../data/raw/blocks.json');

const groups = _(blocks)
  .groupBy(d => d.owner.id + '/' + d.owner.login)
  .mapValues(values => {
    const colors = _(values)
      .flatMap(v => _.toPairs(v.colors))
      .groupBy(c => c[0])
      .mapValues(vs => _.sumBy(vs, v => v[1]))
      .toPairs()
      .value()
      .sort((a, b) => b[1] - a[1]);

    const sum = _.sumBy(colors, c => c[1]);
    const d = values[0];

    return {
      ownerId: d.owner.id,
      login: d.owner.login,
      uniqueTitleCount: _.uniqBy(values, v => v.description).length,
      count: values.length,
      colors: colors.map(c => ({
        color: c[0],
        weight: c[1] / sum,
      }))
      .filter(c => [
        '#ffffff',
        '#000000',
        '#0000ff',
        '#00ff00',
        '#ff0000',
        '#d2b48c',
        // '#008000',
      ].indexOf(c.color) === -1)
    };
  })
  .values()
  .value()
  .filter(x => x.count > 1 && x.colors.length > 1);

console.log('groups', JSON.stringify(groups, null, 2));

fs.writeFileSync(__dirname + '/../data/processed/colors.json', JSON.stringify(groups, null, 2));

console.log('groups.length', groups.length);