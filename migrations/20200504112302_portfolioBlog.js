exports.up = function (knex) {
    return knex.schema
        .createTable("login", (tbl) => {
            tbl.text("username", 15).notNullable();
            tbl.text("password", 15).notNullable();
        })

        .createTable("blogs", (tbl) => {
            tbl.increments();
            tbl.text("title", 30).notNullable();
            tbl.text("body", 30).notNullable();
            tbl.date("date").notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("blog");
};
