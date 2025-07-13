/**
 * The post model uses Sequelize to define the schema for the post table
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
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    summary: {
      // New field
      type: DataTypes.TEXT,
      allowNull: true,
    },
    post_data: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      // New field
      type: DataTypes.STRING(50),
      defaultValue: "draft",
      comment: "draft, published",
    },
    tags: {
      // New field for JSON array of tags
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("tags")
        return rawValue ? JSON.parse(rawValue) : []
      },
      set(value) {
        this.setDataValue("tags", JSON.stringify(value))
      },
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
    tableName: "post",
    name: {
      singular: "post",
      plural: "posts",
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

  const post = sequelize.define("Post", attributes, options)

  // Associations
  post.associate = function (models) {
    this.belongsTo(models.PostCategory, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "category_id",
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
      as: "author",
      targetKey: "id",
    })
    this.hasMany(models.PostComment, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
      as: "comments",
      targetKey: "id",
    })
    this.hasMany(models.PostActivity, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
      as: "activities",
      targetKey: "id",
    })
    this.hasMany(models.PostFile, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "post_id",
        allowNull: false,
      },
      as: "files",
      targetKey: "id",
    })
  }

  return post
}
