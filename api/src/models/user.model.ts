import mongoose, { Schema, Document } from "mongoose";
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

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    _not_hashed_password: string;   
}

export interface IUserDocument extends IUser, Document {
    matchPasswords(password: string): boolean;
}

const userSchema: Schema<IUserDocument> = new Schema({
    _id: Schema.Types.ObjectId,
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
    _not_hashed_password: {
        type: String,
    }
});

userSchema.virtual('not_hashed_password').set(function (password) {
    this._not_hashed_password = password;
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user._not_hashed_password === undefined) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.password = await bcrypt.hash(user._not_hashed_password, salt);
        return next();
    } catch (err: Error | any) {
        return next(err);
    }
});

/**
 * Methods
*/
userSchema.methods.matchPasswords = function (password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

// Delete password send to client
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

export const User = mongoose.model<IUserDocument>("Users", userSchema);
