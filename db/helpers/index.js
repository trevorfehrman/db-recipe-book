const db = require("knex")(require("../../knexfile").development);

module.exports = {
	getDishes() {
		return db("dishes");
	},

	addDish(dish) {
		return db("dishes").insert(dish);
	},

	getDish(id) {
		return db("dishes").where("id", id);
	},
	getRecipes(id) {
		return db("recipes");
	},

	addRecipe(recipe) {
		return db("recipes").insert(recipe);
	},
};
