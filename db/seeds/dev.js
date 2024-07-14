exports.seed = async function(knex) {
    await knex.raw("TRUNCATE TABLE \"partners\" CASCADE");
    await knex("partners").insert([
        {
            id: 1,
            name: "partner1",
            email: "test1@gmail.com",
            password: "123"
        }
    ]);
    await knex("contact").del();

    // Inserts seed entries
    await knex("contact").insert([
        { id: 1, name: "John Doe", email: "johndoe@example.com", phone: "123-456-7890" }

    ]);
};
