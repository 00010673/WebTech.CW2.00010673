const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const root = path.dirname(require.main.filename || process.require.main.filename);
const ticketsDb = path.join(root, "data/bugs.json");

router.get("/", (req, res) => {
  fs.readFile(ticketsDb, (err, data) => {
		if (err) throw err;

		const tickets = JSON.parse(data);

		res.render("tickets", { tickets: tickets });
  });
});

router.post("/", (req, res) => {
	const ticket = {
		name: req.body.name,
    text: req.body.text,
    status: "open",
		id: id()
	};

	if (ticket.name.trim() == "" || ticket.text.trim() == "") {
		res.render("create", { error: true });
	} else {
		fs.readFile(ticketsDb, (err, data) => {
			if (err) throw err;

			const tickets = JSON.parse(data);

			tickets.push(ticket);

			fs.writeFile(ticketsDb, JSON.stringify(tickets), (err) => {
				if (err) throw err;

				res.render("create", { success: true });
			});
		});
	}
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/:id", (req, res) => {
	fs.readFile(ticketsDb, (err, data) => {
		if (err) throw err;

		const ticket = JSON.parse(data).find((t) => t.id == req.params.id);

		res.render("ticket", { ticket: ticket });
	});
});

router.get("/:id/delete", (req, res) => {
	fs.readFile(ticketsDb, (err, data) => {
		if (err) throw err;

		const tickets = JSON.parse(data);

		tickets.splice(tickets.findIndex((t) => t.id == req.body.id), 1);

		fs.writeFile(ticketsDb, JSON.stringify(tickets), (err) => {
			if (err) throw err;

			res.render("tickets", { tickets: tickets});
		});
	});
});

router.get("/:id/resolve", (req, res) => {
	fs.readFile(ticketsDb, (err, data) => {
		if (err) throw err;

		const tickets = JSON.parse(data);

    tickets.find((t) => t.id === req.params.id).status = "closed";

		fs.writeFile(ticketsDb, JSON.stringify(tickets), (err) => {
			if (err) throw err;

			res.render("tickets", { tickets: tickets});
		});
	});
});

const id = () => {
	return "t_" + Math.random().toString(36).substr(2, 9);
}

module.exports = router;