/**
 * The post category model uses Sequelize to define the schema for the post_category table
 */
const { DataTypes, Sequelize } = require("sequelize")
const common = require("_helpers/common")

module.exports = model

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        const rawValue = this.getDataValue("created_at")
        return rawValue ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss") : null
      },
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        const rawValue = this.getDataValue("updated_at")
        return rawValue ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss") : null
      },
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      comment: "0=No, 1=Yes",
    },
    is_deleted: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      comment: "0=No, 1=Yes",
    },
  }

  const options = {
    tableName: "post_category",
    name: {
      singular: "postCategory",
      plural: "postCategories",
    },
    defaultScope: {
      attributes: {
        exclude: ["created_by", "updated_by", "is_deleted"],
      },
    },
    underscored: false,
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }

  const postCategory = sequelize.define("PostCategory", attributes, options)

  // Associations
  postCategory.associate = function (models) {
    this.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "category_id",
        allowNull: false,
      },
      as: "posts",
      targetKey: "id",
    })
  }

  return postCategory
}
