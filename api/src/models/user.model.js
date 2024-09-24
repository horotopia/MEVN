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

const userSchema = new Schema({
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

userSchema.virtual('not_hashed_password').set(function (password) {
    this._not_hashed_password = password;
});

userSchema.pre('save', async function(next) {
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
userSchema.methods.matchPasswords = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Delete password send to client
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

export const User = mongoose.model('Users', userSchema);
