const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
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
  };

  const options = {
    tableName: "post_category",
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    defaultScope: {
      where: { is_deleted: 0 },
      attributes: { exclude: ["is_deleted"] },
    },
  };

  const PostCategory = sequelize.define("PostCategory", attributes, options);

  PostCategory.associate = function (models) {
    this.hasMany(models.Post, {
      foreignKey: "category_id",
      as: "posts",
    });
  };

  return PostCategory;
}
