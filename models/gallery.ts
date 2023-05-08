import { model, Model, models, Schema } from 'mongoose';

export interface IGallery {
  id: string;
  photo: string;
  title: string;
  authorName: string;
  authorSurname: string;
  autor: string;
  size: string;
  estimateFrom: number;
  estimateTo: number;
  priceStart: number;
  priceSold: number;
  media: string;
  year?: number;
  owner: string;
  endBeforeTime: number;
}

const gallerySchema = new Schema<IGallery, Model<IGallery>>(
  {
    id: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    authorSurname: { type: String, required: true },
    autor: { type: String, required: true },
    size: { type: String, required: true },
    estimateFrom: { type: Number, required: true },
    estimateTo: { type: Number, required: true },
    priceStart: { type: Number, required: true },
    priceSold: { type: Number, required: true },
    media: { type: String, required: true },
    year: String,
    owner: { type: String, required: true },
    endBeforeTime: Number, // 0 - NO; 1-museum; 2-gallery
  },
  { collection: "gallery" }
);

const Gallery =
  (models.Gallery as Model<IGallery>) ||
  model<IGallery>("Gallery", gallerySchema);

export default Gallery;
