/**
 * The comment file model uses Sequelize to define the schema for the comment_file table
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
    comment_id: {
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
    tableName: "comment_file",
    name: {
      singular: "commentFile",
      plural: "commentFiles",
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

  const commentFile = sequelize.define("CommentFile", attributes, options)

  // Associations
  commentFile.associate = function (models) {
    this.belongsTo(models.PostComment, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "comment_id",
        allowNull: false,
      },
      targetKey: "id",
    })
  }

  return commentFile
}
