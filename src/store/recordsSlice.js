import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addRecordApi,
  deleteRecordApi,
  updateRecordApi,
  fetchRecords
} from "../services/api";

export const loadRecords = createAsyncThunk("records/loadRecords", async () => {
  const data = await fetchRecords();
  return data;
});

export const addRecord = createAsyncThunk(
  "records/addRecord",
  async (newRecord) => {
    try {
      console.log("Thunk started ✅", newRecord);

      const data = await addRecordApi(newRecord);

      console.log("Backend returned ✅", data);

      return data;
    } catch (err) {
      console.error("Thunk error ❌", err);
      throw err;
    }
  }
);

export const deleteRecord = createAsyncThunk(
  "records/deleteRecord",
  async (id) => {
    await deleteRecordApi(id);
    return id;
  }
);


export const updateRecord = createAsyncThunk(
  "records/updaterecord",
  async ({ id, updatedRecord }) => {
    const data = await updateRecordApi(id, updatedRecord);
    return data;
  },
);

const recordsSlice = createSlice({
  name: "records",

  initialState: {
    records: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loadRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loadRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })

      .addCase(loadRecords.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load records";
      })

      .addCase(addRecord.fulfilled, (state, action) =>{
        state.records.push(action.payload);
      })

      .addCase(deleteRecord.fulfilled, (state, action) => {
  state.records = state.records.filter(
    (r) => r.id !== action.payload
  );
})


      .addCase(updateRecord.fulfilled, (state, action) => {
        const index= state.records.findIndex(
            (r) => r.id === action.payload.id
        );

        if(index !== -1){
            state.records[index] = action.payload;
        }
      });
  },
});

export default recordsSlice.reducer;
