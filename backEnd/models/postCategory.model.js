/**
 * The post category model uses Sequelize to define the schema for the post_category table
 */
const { DataTypes, Sequelize } = require("sequelize")

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
        exclude: ["is_deleted"],
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
      targetKey: "id",
    })
  }

  return postCategory
}
