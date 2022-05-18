module.exports = {
  "local": {
    "username": process.env.DEMO_DB_USER,
    "password": process.env.DEMO_DB_PASS,
    "database": process.env.DEMO_DB_DATABASE,
    "host": process.env.DEMO_DB_HOST,
    port: process.env.DEMO_DB_PORT,
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
    "username": process.env.DEMO_DB_USER,
    "password": process.env.DEMO_DB_PASS,
    "database": process.env.DEMO_DB_DATABASE,
    "host": process.env.DEMO_DB_HOST,
    port: process.env.DEMO_DB_PORT,
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  },
  "production": {
    "username": process.env.DEMO_DB_USER,
    "password": process.env.DEMO_DB_PASS,
    "database": process.env.DEMO_DB_DATABASE,
    "host": process.env.DEMO_DB_HOST,
    port: process.env.DEMO_DB_PORT,
    "dialect": "mysql",
    "define": {
      "timestamps": false
    }
  }
}
