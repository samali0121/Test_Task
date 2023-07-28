const { Pool } = require("pg");

// PostgreSQL database connection setup
const pgsql = new Pool({
  user: "docker",
  host: "192.168.8.103",
  database: "CRUD",
  password: "docker",
  port: 7778, // Default PostgreSQL port
});

module.exports = {
  pgsql,
};
