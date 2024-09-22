import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [ROLE_USER, ROLE_STORE_KEEPER, ROLE_ADMIN, ROLE_COMPTA]
 *           default: ROLE_USER
 *       example:
 *         name: John Doe
 *         email: john.doe@toto.com
 *         password: password
 *         role: ROLE_USER
 */

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN", "ROLE_COMPTA"],
    default: "ROLE_USER",
  },
});

UserSchema.virtual('not_hashed_password').set(function (password) {
  this._not_hashed_password = password;
});

UserSchema.pre('save', async function(next) {
  const user = this;

  if (user._not_hashed_password === undefined) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user._not_hashed_password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 * Methods
*/
UserSchema.methods = {
  matchPasswords: async (data) => {
    return bcrypt.compare(data, this.password);
  }
}

const UserModel = mongoose.model('Users', UserSchema)

export {
  UserModel
}
