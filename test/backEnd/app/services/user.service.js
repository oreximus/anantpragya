const { Op } = require("sequelize")
const db = require("_helpers/db")
const common = require("_helpers/common")
const catchError = require("_middleware/catch-error")
const securePassword = require("_helpers/secure-password")

module.exports = {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
}

// Get User List
async function getUserList(params) {
  try {
    const pageAttr = await common.pagination(params.page || 1, params.limit || 10)

    const whereCondition = {
      is_deleted: 0,
    }

    // Search functionality
    if (params.search) {
      whereCondition[Op.or] = [
        { first_name: { [Op.like]: `%${params.search}%` } },
        { last_name: { [Op.like]: `%${params.search}%` } },
        { email: { [Op.like]: `%${params.search}%` } },
      ]
    }

    const output = await db.User.findAndCountAll({
      where: whereCondition,
      order: [["created_at", "DESC"]],
      limit: pageAttr.limit,
      offset: pageAttr.offset,
    })

    if (output.count <= 0) {
      throw "No users found!"
    }

    return output
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Get User By ID
async function getUserById(userId) {
  try {
    const user = await db.User.findOne({
      where: {
        id: userId,
        is_deleted: 0,
      },
    })

    if (!user) {
      throw "User not found!"
    }

    return user
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Create User
async function createUser(params, auth) {
  try {
    // Validate
    if (await db.User.findOne({ where: { email: params.email } })) {
      throw 'Email "' + params.email + '" is already registered'
    }

    const user = new db.User(params)

    // Hash password
    user.password_hash = securePassword.hash(params.password)

    // Set date
    user.created_at = common.curDateTime()
    user.created_by = auth.user_id
    user.updated_at = common.curDateTime()
    user.updated_by = auth.user_id

    // Save user
    await user.save()

    return { message: "User created successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Update User
async function updateUser(params, auth) {
  try {
    const user = await db.User.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    })

    if (!user) {
      throw "User not found!"
    }

    // Validate if the user is trying to update their own role or an admin is updating another admin's role
    if (user.id === auth.user_id && params.role && params.role !== user.role) {
      throw "You cannot change your own role!"
    }

    if (user.is_admin && !auth.isAdmin) {
      throw "Only an admin can update another admin's details!"
    }

    user.first_name = params.first_name || user.first_name
    user.last_name = params.last_name || user.last_name
    user.email = params.email || user.email
    user.role = params.role || user.role
    user.updated_at = common.curDateTime()
    user.updated_by = auth.user_id

    await user.save()

    return { message: "User updated successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Delete User
async function deleteUser(params, auth) {
  try {
    const user = await db.User.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    })

    if (!user) {
      throw "User not found!"
    }

    // Prevent user from deleting themselves
    if (user.id === auth.user_id) {
      throw "You cannot delete your own account!"
    }

    // Prevent non-admins from deleting admins
    if (user.is_admin && !auth.isAdmin) {
      throw "Only an admin can delete another admin's account!"
    }

    user.is_deleted = 1
    user.updated_at = common.curDateTime()
    user.updated_by = auth.user_id

    await user.save()

    return { message: "User deleted successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}

// Update User Status
async function updateUserStatus(params, auth) {
  try {
    const user = await db.User.findOne({
      where: {
        id: params.id,
        is_deleted: 0,
      },
    })

    if (!user) {
      throw "User not found!"
    }

    // Prevent user from changing their own status
    if (user.id === auth.user_id) {
      throw "You cannot change your own status!"
    }

    // Prevent non-admins from changing admin status
    if (user.is_admin && !auth.isAdmin) {
      throw "Only an admin can change another admin's status!"
    }

    user.is_active = params.is_active
    user.updated_at = common.curDateTime()
    user.updated_by = auth.user_id

    await user.save()

    return { message: "User status updated successfully" }
  } catch (err) {
    console.log(err)
    throw catchError(err)
  }
}
