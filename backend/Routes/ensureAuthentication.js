const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated, (req, res) => {
  console.log("Info about logged in user", req.user);
  res.status(200).json([
    {
      task: "login successful and authenticated",
    },
  ]);
});

module.exports = router;
