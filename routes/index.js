const brandRoutes = require('./brand-routes');

module.exports = (app, db) => {
  brandRoutes(app, db)
}