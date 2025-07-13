const config = require("_config/config.json")
const mysql = require("mysql2/promise")
const { Sequelize } = require("sequelize")
const db = {}

module.exports = db

initialize()

async function initialize() {
  // Create DB if it doesn't already exist
  const { host, port, user, password, database } = config.database
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  })
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`)

  // Connect to DB
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    host: host,
    port: port,
    logging: false,
  })

  // Init models and add them to the exported db object
  db.User = require("../models/user.model")(sequelize)
  db.RefreshToken = require("../models/refreshToken.model")(sequelize)
  db.PostCategory = require("../models/postCategory.model")(sequelize)
  db.Post = require("../models/post.model")(sequelize)
  db.PostActivity = require("../models/postActivity.model")(sequelize)
  db.PostComment = require("../models/postComment.model")(sequelize)
  db.PostFile = require("../models/postFile.model")(sequelize)
  db.CommentFile = require("../models/commentFile.model")(sequelize)

  // Associate models
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  // Sync all models with database
  await sequelize.sync({ alter: true })
}
