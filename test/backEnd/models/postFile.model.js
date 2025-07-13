/**
 * The post file model uses Sequelize to define the schema for the post_file table
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
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    original_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    file_path: {
      type: DataTypes.STRING(255),
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
    tableName: "post_file",
    name: {
      singular: "postFile",
      plural: "postFiles",
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

  const postFile = sequelize.define("PostFile", attributes, options)

  // Associations
  postFile.associate = function (models) {
    this.belongsTo(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
      targetKey: "id",
    })
  }

  return postFile
}
