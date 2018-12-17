const { Client } = require("pg");

const client = new Client({
    connectionString: "postgres://postgres@localhost:5432/grads-offers-node"
});

client.connect();

module.exports = client;