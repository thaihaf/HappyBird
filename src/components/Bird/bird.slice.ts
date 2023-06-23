import { createSlice } from "@reduxjs/toolkit";
import {
  BIRD_SIZE,
  GAME_HEIGHT,
  POSITION,
} from "../../constants/values.constants";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

export const BIRD_KEY = "bird";

export type BirdState = {
  rotate: number;
  y: number;
};
const initialState: BirdState = {
  rotate: 0,
  y: 250,
};

const birdSlice = createSlice({
  name: BIRD_KEY,
  initialState,
  reducers: {
    birdFly: (state) => {
      state.y = state.y - 50;
      state.rotate = -20;
    },
    birdFall: (state) => {
      state.y = state.y + 20;
      state.rotate = 20;
    },
    birdTouched: (state, action) => {
      switch (action.payload) {
        case POSITION.TOP:
          state.y = 0;
          break;
        case POSITION.RIGHT:
          state.y = state.y + 5;
          break;
        case POSITION.BOTTOM:
          state.y = GAME_HEIGHT - BIRD_SIZE - 7;
          break;
        case POSITION.LEFT:
          state.y = state.y - 5;
          break;
        default:
          break;
      }
    },
    birdRotate: (state, action) => {
      state.rotate = action.payload + 50;
    },
  },
});

export const { birdFly, birdFall, birdRotate, birdTouched } = birdSlice.actions;

// const birdConfig = {
//   key: BIRD_KEY,
//   // storage,
//   // whitelist: ["data", "flag", "isBack"],
// };

export const birdReducer = birdSlice.reducer;
