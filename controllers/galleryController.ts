import Gallery from '@models/gallery';

export const readGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find({});
    res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
