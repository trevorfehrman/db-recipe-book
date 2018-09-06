exports.up = function(knex, Promise) {
	return knex.schema.createTable("instructions", function(table) {
		table.increments();

		table
			.integer("step")
			.unsigned()
			.notNullable();

		table
			.integer("recipe_id")
			.unsigned()
			.references("recipes.id");
		table
			.integer("ingredient_id")
			.unsigned()
			.references("ingredients.id");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("instructions");
};
