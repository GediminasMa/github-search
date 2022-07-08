import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const rootUrl = 'https://api.github.com';

const initialState = {
  data: {},
  repos: [],
  followers: [],
  isLoading: true,
  limit: 0,
  remaining: 0,
  error: {
    show: false,
    message: '',
  },
};

export const searchUser = createAsyncThunk(
  'user/searchUser',
  async (user, thunkAPI) => {
    try {
      const { data: newData } = await axios.get(`${rootUrl}/users/${user}`);
      const { login, followers_url } = newData;
      const { data: newRepos } = await axios.get(
        `${rootUrl}/users/${login}/repos?per_page=100`,
      );
      const { data: newFollowers } = await axios.get(
        `${followers_url}?per_page=100`,
      );

      return { newData, newRepos, newFollowers };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const checkRequests = createAsyncThunk(
  'user/checkRequests',
  async (_, thunkAPI) => {
    try {
      const {
        data: { rate },
      } = await axios.get(`${rootUrl}/rate_limit`);

      return rate;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    changeUser: (state, action) => {
      const newUser = action.payload;

      state.data = newUser;
    },
    changeRepos: (state, action) => {
      const newRepos = action.payload;

      state.repos = newRepos;
    },
    changeFollowers: (state, action) => {
      const newFollowers = action.payload;

      state.followers = newFollowers;
    },
    toggleError: (state, action) => {
      const { show, message } = action.payload;
      state.error.show = show;
      state.error.message = message;
    },
  },
  extraReducers: {
    [checkRequests.pending]: (state) => {
      state.isLoading = true;
    },
    [checkRequests.fulfilled]: (state, action) => {
      const { limit, remaining } = action.payload;
      state.limit = limit;
      state.remaining = remaining;

      if (remaining <= 0) {
        state.error = { show: true, message: 'No requests left for this hour' };
      }

      state.isLoading = false;
    },
    [checkRequests.rejected]: (state, action) => {
      console.log(action.payload);
      state.isLoading = true;
    },

    [searchUser.pending]: (state) => {
      state.isLoading = true;
    },
    [searchUser.fulfilled]: (state, action) => {
      const { newData, newRepos, newFollowers } = action.payload;

      state.data = newData;
      state.repos = newRepos;
      state.followers = newFollowers;
    },
    [searchUser.rejected]: (state, action) => {
      console.log(action.payload);
      state.error = { show: true, message: 'User not found' };
    },
  },
});

export const { changeUser, changeRepos, changeFollowers, toggleError } =
  userSlice.actions;
export default userSlice.reducer;
