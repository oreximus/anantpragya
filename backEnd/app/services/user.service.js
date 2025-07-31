/**
 * The user service is responsible for all database interaction and core business logic
 * related to user management operations
 */
const { Op } = require("sequelize");
const db = require("_helpers/db");
const common = require("_helpers/common");
const catchError = require("_middleware/catch-error");

module.exports = {
  getUserList,
  getUserById,
  updateUserStatus,
};

// Get User List
async function getUserList(params, auth) {
  try {
    // Check if requesting user is admin
    const requestingUser = await db.User.findOne({
      where: { id: auth.user_id },
    });

    if (!requestingUser || !requestingUser.is_admin) {
      throw "Unauthorized! Admin access required.";
    }

    const pageAttr = await common.pagination(
      params.page || 1,
      params.limit || 10,
    );

    const whereCondition = {
      is_deleted: 0,
    };

    // Search functionality
    if (params.search) {
      whereCondition[Op.or] = [
        { first_name: { [Op.like]: `%${params.search}%` } },
        { last_name: { [Op.like]: `%${params.search}%` } },
        { email: { [Op.like]: `%${params.search}%` } },
      ];
    }

    // Filter by active status
    if (params.is_active !== undefined) {
      whereCondition.is_active = params.is_active;
    }

    const output = await db.User.findAndCountAll({
      where: whereCondition,
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone_no",
        "created_at",
        "updated_at",
        "is_admin",
        "is_active",
      ],
      order: [["created_at", "DESC"]],
      limit: pageAttr.limit,
      offset: pageAttr.offset,
    });

    if (output.count <= 0) {
      throw "No users found!";
    }

    return {
      data: output.rows,
      total: output.count,
      page: Math.floor(pageAttr.offset / pageAttr.limit) + 1,
      limit: pageAttr.limit,
      totalPages: Math.ceil(output.count / pageAttr.limit),
    };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Get User By ID
async function getUserById(userId, auth) {
  try {
    // Check if requesting user is admin
    const requestingUser = await db.User.findOne({
      where: { id: auth.user_id },
    });

    if (!requestingUser || !requestingUser.is_admin) {
      throw "Unauthorized! Admin access required.";
    }

    const user = await db.User.findOne({
      where: {
        id: userId,
        is_deleted: 0,
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone_no",
        "created_at",
        "updated_at",
        "is_admin",
        "is_active",
      ],
    });

    if (!user) {
      throw "User not found!";
    }

    return user;
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}

// Update User Status
async function updateUserStatus(params, auth) {
  try {
    // Check if requesting user is admin
    const requestingUser = await db.User.findOne({
      where: { id: auth.user_id },
    });

    if (!requestingUser || !requestingUser.is_admin) {
      throw "Unauthorized! Admin access required.";
    }

    const user = await db.User.findOne({
      where: {
        id: params.user_id,
        is_deleted: 0,
      },
    });

    if (!user) {
      throw "User not found!";
    }

    // Prevent admin from deactivating themselves
    if (user.id === auth.user_id && params.is_active === 0) {
      throw "You cannot deactivate your own account!";
    }

    // Update user status
    user.is_active = params.is_active;
    user.updated_at = common.curDateTime();
    user.updated_by = auth.user_id;

    await user.save();

    return {
      message: `User ${params.is_active ? "activated" : "deactivated"} successfully`,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_active: user.is_active,
      },
    };
  } catch (err) {
    console.log(err);
    throw catchError(err);
  }
}
