if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else if (process.env.NODE_ENV === "test") {
  console.log('test env');
  if (validKeysFile("./test")) {
    module.exports = require("./test");
  }
} else {
  if (validKeysFile("./dev")) {
    module.exports = require("./dev");
  }
}

function validKeysFile(path) {
  try {
    require.resolve(path);
    const module = require(path);
    return (
      module.googleClientID &&
      module.googleClientSecret &&
      module.cookieKey &&
      module.mongoURI
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
