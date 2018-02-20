if(process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  try {
    require.resolve('./dev');
    const dev = require('./dev');
    if(dev.googleClientID && dev.googleClientSecret && dev.cookieKey && dev.mongoURI) {
      module.exports = dev;
    } else {
      throw new Error("Please, make sure you set up your dev.js file correctly for your own config keys. See the README for instructions.");
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}