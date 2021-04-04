const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);
const ticketsDb = path.join(root, "data/bugs.json");

router.get("/v1/tickets", (req, res) => {
	fs.readFile(ticketsDb, (err, data) => {
		if (err) throw err;

		const dreams = JSON.parse(data);

		res.json(dreams);
	});
});

module.exports = router;
