module.exports = {
  "local": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    port: process.env.DB_PORT,
    "dialect": "mysql",
    dialectOptions: {
      options: {
        requestTimeout: 3
      }
    },
    "define": {
      "timestamps": false
    }
  },
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    port: process.env.DB_PORT,
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    port: process.env.DB_PORT,
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  }
}
