const db = require("knex")(require("../../knexfile").development);

module.exports = {
	getDishes() {
		return db("dishes");
	},

	addDish(dish) {
		return db("dishes").insert(dish);
	},

	getDish(id) {
		const dish = db("dishes")
			.where("id", id)
			.first();

		const recipes = db("recipes")
			.select("name", "id")
			.where("dish_id", id);

		return Promise.all([dish, recipes]).then(results => {
			let [dish, recipes] = results;
			let result = { id: dish.id, name: dish.name, recipes: recipes };
			return result;
		});
	},

	addRecipe(recipe) {
		return db("recipes").insert(recipe);
	},
	getRecipe(id) {
		const query_1 = db("recipes")
			.select({
				recipe_name: "recipes.name",
				dish_name: "dishes.name",
			})
			.join("dishes", "dishes.id", "recipes.dish_id")
			.where("recipes.id", id);

		const query_2 = db("instructions")
			.select("step", "description")
			.join("recipes", "recipes.id", "instructions.recipe_id")
			.where("recipes.id", id);

		const query_3 = db("ingredients")
			.select({
				name: "ingredients.name",
				quantity: "recipe_ingredients.quantity",
				unit_of_measure: "recipe_ingredients.unit_of_measure",
			})
			.join(
				"recipe_ingredients",
				"recipe_ingredients.ingredient_id",
				"ingredients.id",
			)
			.join("recipes", "recipes.id", "recipe_ingredients.recipe_id")
			.where("recipes.id", id);

		return Promise.all([query_1, query_2, query_3]).then(
			([result1, result2, result3]) => {
				result1[0].instructions = result2;
				result1[0].ingredients = result3;
				return result1[0];
			},
		);
	},
};
