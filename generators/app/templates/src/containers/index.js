if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Prod/Root.prod');
} else {
  module.exports = require('./Dev/Root.dev');
}
