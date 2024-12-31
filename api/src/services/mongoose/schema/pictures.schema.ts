import { Schema } from "mongoose";
import { Pictures } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Pictures:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - name
 *         - description
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         productId:
 *           type: string
 *           description: L'identifiant du produit
 *         name:
 *           type: string
 *           description: Le nom de l'image
 *         description:
 *           type: string
 *           description: La description de l'image
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a // optional
 *         productId: 5f4f6d7e5e5c5b5a5a4a5a5a // optional
 *         name: image.jpg
 *         description: Une image de test
 */

export const picturesSchema = new Schema<Pictures>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Users",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Products",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "pictures",
    versionKey: false,
  }
);
