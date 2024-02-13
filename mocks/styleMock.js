const PublicFilmCardStyle = require('../src/components/PublicFilmCard/PublicFilmCardStyle');
console.log('PublicFilmCardStyle:', PublicFilmCardStyle);
console.log('variable: ', process.env.USE_REAL_STYLES);

module.exports = {
  ...(!process.env.USE_REAL_STYLES && { mockStyles: true }),
  ...(process.env.USE_REAL_STYLES && PublicFilmCardStyle),
};
