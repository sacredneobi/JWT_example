const auth = require("./auth");
const test = require("./test");

module.exports = (router) => {
  auth(router);
  test(router);
};
