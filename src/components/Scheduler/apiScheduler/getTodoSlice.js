/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from "../../../app/api/Request"

export const getTodo = createAsyncThunk("todo/get", async (listId, rejectWithValue) => {
  try {
    const body = null
    const link = `/lists/${listId}/tasks`

    const res = await request("GET", link, body, true)

    return res
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  loading: false,
  data: [],
  error: null,
  success: false,
}

const getTodoSlice = createSlice({
  name: "getTodo",
  initialState,
  reducers: {
    resetUser: state => {
      state.loading = false
      state.data = []
      state.success = false
      state.error = null
    },
    pushNewTodo: (state, action) => {
      state.data.push(action.payload)
    },
  },
  extraReducers: {
    [getTodo.pending]: state => {
      state.loading = true
      state.error = null
    },
    [getTodo.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload

      state.success = true
    },
    [getTodo.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { resetUser, pushNewTodo } = getTodoSlice.actions
export default getTodoSlice.reducer
