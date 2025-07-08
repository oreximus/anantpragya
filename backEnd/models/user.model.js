/**
 * Fixed User model with proper withHash scope
 */
const { DataTypes, Sequelize } = require("sequelize");
const common = require("_helpers/common");

module.exports = model;

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("first_name");
        return rawValue
          ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
          : null;
      },
      set(value) {
        this.setDataValue("first_name", value.toLowerCase());
      },
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("last_name");
        return rawValue
          ? rawValue.charAt(0).toUpperCase() + rawValue.slice(1)
          : null;
      },
      set(value) {
        this.setDataValue("last_name", value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone_no: {
      type: DataTypes.INTEGER(20),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    access_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        const rawValue = this.getDataValue("created_at");
        return rawValue
          ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss")
          : null;
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
        const rawValue = this.getDataValue("updated_at");
        return rawValue
          ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss")
          : null;
      },
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    is_admin: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      comment: "0=No, 1=Yes",
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
    tableName: "user",
    name: {
      singular: "user",
      plural: "users",
    },
    defaultScope: {
      attributes: {
        exclude: ["password", "created_by", "updated_by", "is_deleted"],
      },
    },
    scopes: {
      // FIXED: Properly configure withHash scope to include password
      withHash: {
        attributes: {
          include: ["password"], // Include password field
        },
      },
      // Alternative: Include all fields
      withAllFields: {
        attributes: {
          exclude: ["is_deleted"], // Only exclude is_deleted
        },
      },
    },
    underscored: false,
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  };

  const user = sequelize.define("User", attributes, options);

  // Associations
  user.associate = function (models) {
    this.hasMany(models.Post, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "created_by",
        allowNull: false,
      },
      as: "posts",
      targetKey: "id",
    });
    this.hasMany(models.PostComment, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "created_by",
        allowNull: false,
      },
      as: "comments",
      targetKey: "id",
    });
    this.hasMany(models.PostActivity, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "created_by",
        allowNull: false,
      },
      as: "activities",
      targetKey: "id",
    });
  };

  return user;
}
