const { checkJWT } = require("../jwt");

const test = (router) => {
  router.get("/testAuth/", checkJWT(), (req, res) => {
    res.status(200).send({ access: "GRAND" });
  });
  router.get("/testAuthOnlySACRED/", checkJWT("SACRED"), (req, res) => {
    res.status(200).send({ access: "GRAND" });
  });
  router.get("/test/", (req, res) => {
    res.status(200).send({ access: "GRAND WITH OUT JWT" });
  });
};

module.exports = test;
