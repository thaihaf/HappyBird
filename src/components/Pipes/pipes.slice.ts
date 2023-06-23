import { styled } from "styled-components";
import { createSlice } from "@reduxjs/toolkit";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

export const PIPES_KEY = "pipes";
export type Pipe = { topHeight: number };
export type PipesState = {
  x: number;
  pipes: Array<Pipe>;
};
const initialState: PipesState = {
  x: 660,
  pipes: [],
};

const pipesSlice = createSlice({
  name: PIPES_KEY,
  initialState,
  reducers: {
    pipesRunning: (state) => {
      if (state.pipes.length > 0) {
        state.x = state.x - 20;
      }
    },
    pipesGenerate: (state) => {
      const topHeight = Math.round(Math.random() * 350) + 50;
      state.pipes = [...state.pipes, { topHeight }];
    },
    updatePipes: (state, action) => {
      state.pipes = action.payload;
    },
  },
});

export const { pipesRunning, pipesGenerate, updatePipes } = pipesSlice.actions;

// const pipesConfig = {
//   key: PIPES_KEY,
//   // storage,
//   // whitelist: ["data", "flag", "isBack"],
// };

export const pipesReducer = pipesSlice.reducer;
