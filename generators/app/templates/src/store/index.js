if (process.env.NODE_ENV === 'production') {
  module.exports = require('./Prod/configureStore.prod');
} else {
  module.exports = require('./Dev/configureStore.dev');
}
