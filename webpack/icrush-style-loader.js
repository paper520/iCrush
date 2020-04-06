
// icrush-style-loader

const qs = require('querystring');

module.exports = function loader(source) {

  const loaderContext = this;

  const {
    resourceQuery
  } = loaderContext;

  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = qs.parse(rawQuery);

  if (incomingQuery.iCrush != null && incomingQuery.hash) {
    console.log(source);
  }

  return source;

};