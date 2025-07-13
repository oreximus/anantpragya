/**
 * The user model uses Sequelize to define the schema for the user table
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
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "User",
      comment: "User, Editor, Admin",
    },
    verification_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("verified_at")
        return rawValue ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss") : null
      },
    },
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    reset_token_expires: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("reset_token_expires")
        return rawValue ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss") : null
      },
    },
    password_reset_at: {
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue("password_reset_at")
        return rawValue ? common.dateFormat(rawValue, "YYYY-MM-DD HH:mm:ss") : null
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
      defaultValue: 0,
      comment: "0=No, 1=Yes",
    },
    is_deleted: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      comment: "0=No, 1=Yes",
    },
  }

  const options = {
    tableName: "user",
    name: {
      singular: "user",
      plural: "users",
    },
    defaultScope: {
      // Exclude hash by default
      attributes: {
        exclude: ["password_hash", "verification_token", "reset_token"],
      },
    },
    scopes: {
      // Include hash with this scope
      withHash: {
        attributes: {
          include: ["password_hash"],
        },
      },
    },
    underscored: false,
    timestamps: false,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  }

  const user = sequelize.define("User", attributes, options)

  // Virtual property to check if user is admin
  user.prototype.isAdmin = function () {
    return this.role === "Admin"
  }

  // Associations
  user.associate = function (models) {
    this.hasMany(models.RefreshToken, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      as: "refreshTokens",
      targetKey: "id",
    })
  }

  return user
}
