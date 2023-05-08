import nextConnect from 'next-connect';

import { readGallery } from '@controllers/galleryController';
import dbConnect from '@libs/mongoose';

const handler = nextConnect();

dbConnect();
handler.get(readGallery);

export default handler;
