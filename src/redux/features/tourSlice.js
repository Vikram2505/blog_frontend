import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour created successfully.");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getTours = createAsyncThunk(
  "/tour/getTours",
  async (tourData, { rejectWithValue }) => {
    try {
      const response = await api.getTour(tourData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSingleTour = createAsyncThunk(
  "/tours/getSingleTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getSingleTour(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Get those tours created by specific user
export const getTourByUser = createAsyncThunk(
  "/tour/user-tours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTourByUser();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Delete the single tour of user by ID
export const deleteTour = createAsyncThunk(
  "/tour/delete-tour",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteTour(id);
      toast.success("Tour deleted successfully.");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update tour by id
export const updateSingleTour = createAsyncThunk(
  "/tour/update-tour",
  async ({ updatedTourData, id, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(updatedTourData, id);
      toast.success("Tour updated successfully");
      navigate("/dashboard");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// search tour by keyward
export const searchTours = createAsyncThunk(
  "/tour/searchTours",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(searchQuery);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// show tour by tag
export const showTourByTag = createAsyncThunk(
  "/tour/tour-tag/:tagName",
  async (tagName, { rejectWithValue }) => {
    try {
      const response = await api.showTourByTag(tagName);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Show related tour
export const showRelatedTour = createAsyncThunk("/tour/relatedTour", async(tags, {rejectWithValue}) => {
  try{
    const response = await api.showRelatedTour(tags);
    return response.data;
  }catch(err){
    return rejectWithValue(err.response.data);
  }
})

export const likeTour = createAsyncThunk("/tour/like", async({_id}, {rejectWithValue}) => {
  try {
    const response = await api.likeTour(_id);
    // console.log(response,'log response');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {}, //create single tour
    tours: [], //get all tours
    userTours: [], //created by logged in user
    tourByTag: [],
    relatedTour: [],
    editTour: null,
    pageNo: 1,
    dataLimit: 3,
    numberOfPage: null,
    error: "",
    loading: false,
  },
  reducers: {
    editTour: (state, action) => {
      state.editTour = action.payload;
    },
    setCurrentPage: (state, action) => {
      // console.log(action.payload, 'setcurrent page');
      state.pageNo = action.payload;
    }
  },
  extraReducers: {
    // Create tour
    [createTour.pending]: (state, action) => {
      state.loading = true;
    },
    [createTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = [action.payload];
    },
    [createTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // Get all tours
    [getTours.pending]: (state, action) => {
      state.loading = true;
    },
    [getTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPage = action.payload.numberOfPages;
    },
    [getTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // GET single tour
    [getSingleTour.pending]: (state, action) => {
      state.loading = true;
    },
    [getSingleTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    },
    [getSingleTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // get tours create by specific user
    [getTourByUser.pending]: (state, action) => {
      state.loading = true;
    },
    [getTourByUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [getTourByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    // delete single tour
    [deleteTour.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
      // const {
      //   arg: { id },
      // } = action.meta;
      // if (id) {
      //  state.userTours = state.userTours.find((item) => item._id !== id);
      // //  console.log(state.userTours = state.userTours.find((item) => item._id !== id));
      // }
    },
    [deleteTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    // update single tour
    [updateSingleTour.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSingleTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    },
    [updateSingleTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [searchTours.pending]: (state, action) => {
      state.loading = true;
    },
    [searchTours.fulfilled]: (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showTourByTag.pending]: (state, action) => {
      state.loading = true;
    },
    [showTourByTag.fulfilled]: (state, action) => {
      state.loading = false;
      state.tourByTag = action.payload;
    },
    [showTourByTag.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [showRelatedTour.pending]: (state, action) => {
      state.loading = true;
    },
    [showRelatedTour.fulfilled]: (state, action) => {
      state.loading = false;
      state.relatedTour = action.payload;
    },
    [showRelatedTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [likeTour.pending]: () => {},
    [likeTour.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      // state.tours = action.payload
      // const {
      //   arg: { _id },
      // } = action.meta;
      // if (_id) {
      //  state.userTours = state.userTours.find((item) => item._id === _id ? action.payload: item);
      // //  console.log(state.userTours = state.userTours.find((item) => item._id !== id));
      // }
    },
    [likeTour.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { editTour, setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
