var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", (req, res, next) => {
  console.log(`First name: ${req.body.firstName}`);
  console.log(`Last name: ${req.body.lastName}`);
  res.send("POST received!");
});

router.use(bodyParser.urlencoded({ extended: true }));

module.exports = router;
