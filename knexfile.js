// Update with your config settings.

module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./db/db.sqlite3",
		},
		useNullAsDefault: true,
		migrations: { directory: "./db/migrations" },
		seeds: { director: "./db/seeds" },
	},
};
