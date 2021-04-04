const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);
const ticketsDb = path.join(root, "data/dreams.json");

router.get("/", (req, res) => {
  res.render("tickets");
});

module.exports = router;