import { Schema, model } from "mongoose";

export interface Pictures {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  name: string;
  description: string;
}

const picturesSchema = new Schema<Pictures>({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  description: String
}, { timestamps: true });

export const PicturesModel = model<Pictures>('Pictures', picturesSchema);
