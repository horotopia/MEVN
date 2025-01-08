import { Schema, model } from "mongoose";
<<<<<<< Updated upstream
=======
import { picturesSchema } from "../services/mongoose";
>>>>>>> Stashed changes

export interface Pictures {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  name: string;
  description: string;
}

<<<<<<< Updated upstream
const picturesSchema = new Schema<Pictures>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  description: String
}, { timestamps: true });

=======
>>>>>>> Stashed changes
export const PicturesModel = model<Pictures>('Pictures', picturesSchema);
