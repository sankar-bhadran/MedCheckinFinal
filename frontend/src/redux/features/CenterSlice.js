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
      const response = await axios.get('center/scanregister');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addScan = createAsyncThunk(
  "centre/addscan",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const response = await axios.post("center/addscan",data);
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

export const getContinue=createAsyncThunk('center/continuebutton',async(_,{rejectWithValue})=>{
  console.log("sadkjanskdl")
  try {
    const response =await axios.patch('center/onetimeapprovel');
    console.log("response",response)
    return response.data
  } catch (error) {
   return rejectWithValue(error.response.data)    
  }
})

export const reApply=createAsyncThunk('center/reapply',async(data,{rejectWithValue})=>{
  try {
    const response=await axios.patch('center/reapply',data);
    console.log("response",response)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

const centerSlice = createSlice({
  initialState,
  name: "center",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScanDetails.pending, (state, action) => {
        state.loading = true;
        state.Centerdata=null
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
        state.CommonData = action.payload.scanCategories;
      })

      .addCase(getScanCategories.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(addScan.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(addScan.fulfilled, (state, action) => {
        state.CenterStatus = true;
      })

      .addCase(addScan.rejected, (state, action) => {
        state.error = action.error.message || " ";
      })

      .addCase(getContinue.pending,(state,action)=>{
        state.loading=true
      })

      .addCase(getContinue.fulfilled,(state,action)=>{
        state.CenterStatus=true
      })

      .addCase(getContinue.rejected,(state,action)=>{
        state.error=action.error.message || " "
      })

      .addCase(reApply.pending,(state,action)=>{
        state.loading=true
      })

      .addCase(reApply.fulfilled,(state,action)=>{
        state.CenterStatus=true
      })

      .addCase(reApply.rejected,(state,action)=>{
        state.error=action.error.message || " "
      })
  },
});

export default centerSlice.reducer;
