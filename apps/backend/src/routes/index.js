const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ status: "Running." });
});

module.exports = { router };
