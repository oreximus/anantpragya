const { sequelize } = require("../config/database")
const User = require("./auth.model")
const Category = require("./master.model")
const { Post, PostActivity, PostData } = require("./blog.model")

// Define associations
User.hasMany(Post, { foreignKey: "user_id", as: "posts" })
Post.belongsTo(User, { foreignKey: "user_id", as: "author" })

Category.hasMany(Post, { foreignKey: "category_id", as: "posts" })
Post.belongsTo(Category, { foreignKey: "category_id", as: "category" })

Post.hasMany(PostActivity, { foreignKey: "post_id", as: "activities" })
PostActivity.belongsTo(Post, { foreignKey: "post_id", as: "post" })

Post.hasMany(PostData, { foreignKey: "post_id", as: "attachments" })
PostData.belongsTo(Post, { foreignKey: "post_id", as: "post" })

User.hasMany(PostActivity, { foreignKey: "user_id", as: "activities" })
PostActivity.belongsTo(User, { foreignKey: "user_id", as: "user" })

module.exports = {
  sequelize,
  User,
  Category,
  Post,
  PostActivity,
  PostData,
}
