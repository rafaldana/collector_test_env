import axios from 'axios';

import { Gallery } from '@models/gallery';
import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '@store/Store';

const baseUri = process.env.BASE_URI;
console.log("base:", baseUri);

// Read Tasks

interface StateType {
  gallery: [];
  error: string;
}
const GallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallery: [],
    error: "",
  },
  reducers: {
    hasError(state: StateType, action) {
      state.error = action.payload;
    },
    getGallery: (state, action) => {
      state.gallery = action.payload;
    },
  },
});

const { getGallery, hasError } = GallerySlice.actions;

export const fetchGallery = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get("/api/gallery");
    dispatch(getGallery(response.data.gallery));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export default GallerySlice.reducer;
