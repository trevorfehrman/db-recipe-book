exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("instructions")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("instructions").insert([
				{ recipe_id: 1, step: 1, description: "Sear Ahi" },
				{ recipe_id: 1, step: 2, description: "Scorch Tortillas" },
				{ recipe_id: 1, step: 3, description: "Assemble" },
				{ recipe_id: 2, step: 1, description: "Make Dough" },
				{ recipe_id: 2, step: 1, description: "Make Tomato Sauce" },
				{ recipe_id: 2, step: 1, description: "Assemble and Bake" },
			]);
		});
};
