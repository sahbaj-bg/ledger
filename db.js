require("dotenv").config();

const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const db = new Pool({
  connectionString: connectionString
});

module.exports = { db };
