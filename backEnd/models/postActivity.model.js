/**
 * The post activity model uses Sequelize to define the schema for the post_activity table
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
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    is_liked: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      comment: "0=No, 1=Yes",
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
    tableName: "post_activity",
    name: {
      singular: "postActivity",
      plural: "postActivities",
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

  const postActivity = sequelize.define("PostActivity", attributes, options)

  // Associations
  postActivity.associate = function (models) {
    this.belongsTo(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
      targetKey: "id",
    })
    this.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "created_by",
        allowNull: false,
      },
      as: "user",
      targetKey: "id",
    })
  }

  return postActivity
}
