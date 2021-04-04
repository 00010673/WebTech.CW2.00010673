const express = require("express");
const app = express();
const PORT = 8000;
const tickets = require("./routes/tickets.js");

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
	res.render("index");
});

app.use("/tickets", tickets);

app.listen(PORT, () => {
	console.log("Application is listening to http://localhost:" + PORT);
});
