const express = require("express");
const app = express();
const PORT = 8000;
const tickets = require("./routes/tickets.js");
const api = require("./routes/api.js");

app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
	res.render("index");
});

//routes
app.use("/tickets", tickets);
app.use("/api", api);

app.listen(PORT, () => {
	console.log("Application is listening to http://localhost:" + PORT);
});
