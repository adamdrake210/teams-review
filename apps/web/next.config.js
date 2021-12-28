const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
});
