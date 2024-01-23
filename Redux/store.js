// In a file, e.g., store.js
import {configureStore} from '@reduxjs/toolkit';
import userReducer from '/Users/ai/Desktop/ReactN_Projects/reduxTask/reduxTask/Redux/Features/Counter/userSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
