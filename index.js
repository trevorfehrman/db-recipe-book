const express = require("express");
const cors = require("cors");

const helpers = require("./db/helpers");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/dishes", function(req, res, next) {
	helpers
		.getDishes()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(next);
});

app.post("/api/dishes", function(req, res, next) {
	const { name } = req.body;
	if (!name)
		return res
			.status(400)
			.json({ message: "Please include a name next time ya ding dong" });

	helpers
		.addDish({ name })
		.then(data => res.status(201).json(data))
		.catch(next);
});

app.get("/api/dishes/:id", function(req, res, next) {
	helpers
		.getDish(req.params.id)
		.then(data => {
			if (!data)
				return res
					.status(404)
					.json({ message: "No Dish by that name ya ding dong" });
			res.status(200).json(data);
		})
		.catch(next);
});

app.get("/api/recipes", function(req, res, next) {
	helpers
		.getRecipes()
		.then(data => {
			res.status(200).json(data);
		})
		.catch(next);
});

app.post("/api/recipes", function(req, res, next) {
	const { name, dish_id } = req.body;

	if (!name || !dish_id)
		return res
			.status(400)
			.json({ message: "Please provide name and or id" });
	helpers
		.addRecipe({ name, dish_id })
		.then(data => res.status(201).json(data))
		.catch(next);
});

app.use(function(err, _, res, _) {
	console.error(err);
	res.status(500).json({ message: "Something broke" });
});

app.listen(8000, () => console.log("Server on 8000 n00b"));
