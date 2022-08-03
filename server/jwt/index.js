const jwt = require("jsonwebtoken");

const checkJWT = (marker) => {
  return (req, res, next) => {
    const { authorization } = req.headers;

    let token;

    if (marker) {
      if (authorization && authorization.split(" ")[0] === marker) {
        console.log("IS AUTH SERVICE SACRED");
        token = authorization.split(" ")[1];
      }
    } else {
      if (authorization && authorization.split(" ")[0]) {
        console.log(`IS AUTH SERVICE ${authorization.split(" ")[0]}`);
        token = authorization.split(" ")[1];
      }
    }

    if (!authorization && !token) {
      res.status(401).send({ error: "invalid signature token not found" });
      return;
    }

    jwt.verify(token, process.env.SERVER_PORT, function (err, decoded) {
      if (err) {
        res
          .status(401)
          .send({ error: "invalid signature token", message: err.message });
        return;
      }
      console.log(decoded, Math.floor(Date.now() / 1000));
      next();
    });
  };
};

const tokenAuth = (userId) => {
  let access = jwt.sign({ userId }, process.env.SERVER_PORT, {
    expiresIn: "10m",
  });
  let refresh = jwt.sign({ userId }, process.env.SERVER_PORT, {
    expiresIn: "10h",
  });

  return { access: `SACRED ${access}`, refresh: `SACRED ${refresh}` };
};

module.exports = { checkJWT, tokenAuth };
