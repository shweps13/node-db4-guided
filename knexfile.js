const localPg = {
  host: 'localhost',
  port: 5432,
  user: 'luis',
  database: 'oldamerica',
};

const pgUser = process.env.PG_USER || 'luis';
const pgDb = process.env.PG_DB || 'oldamerica';

const prodConnection = `postgres://${pgUser}@localhost/${pgDb}`;

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/file/oldamerica.db3',
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      afterCreate: (conn, done) => {
        // enforces foreign key constraints on SQLite, not needed for other DBMS
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },

  production: {
    client: 'pg',
    connection: prodConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
