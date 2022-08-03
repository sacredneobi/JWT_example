const { tokenAuth, checkJWT } = require("../jwt");

const auth = (router) => {
  router.get("/auth/", (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).send({ error: "invalid userId not found in query" });
      return;
    }
    res.status(200).send(tokenAuth(userId));
  });

  router.get("/auth/refresh", checkJWT("SACRED"), (req, res) => {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).send({ error: "invalid userId not found in query" });
      return;
    }
    res.status(200).send(tokenAuth(userId));
  });
};

module.exports = auth;
