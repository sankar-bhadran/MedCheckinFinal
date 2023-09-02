import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstances";

const initialState = {
  loading: false,
  CenterStatus: false,
  Centerdata: null,
  CommonData: null,
  error: "",
  Messages: " ",
};

export const getScanDetails = createAsyncThunk(
  "center/scandetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`center/scanregister/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getScanCategories = createAsyncThunk(
  "center/scanCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("center/scancategories");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const centerSlice = createSlice({
  initialState,
  name: "center",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScanDetails.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getScanDetails.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.Centerdata = action.payload.dataToSend;
        console.log(action.payload.isSubmitted);
      })

      .addCase(getScanDetails.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getScanCategories.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(getScanCategories.fulfilled, (state, action) => {
        state.CenterStatus = true;
        state.Centerdata = {
          ...state.Centerdata,
          ...action.payload.scanCategories,
        };
      })

      .addCase(getScanCategories.rejected, (state, action) => {
        state.error = action.error.message || " ";
      });
  },
});

export default centerSlice.reducer;
