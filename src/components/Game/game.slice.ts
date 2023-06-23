import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "../../types/type";
import { statusValue } from "../../constants/values.constants";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

export const GAME_KEY = "game";

export type GameState = {
  status: string;
  point: number;
};
const initialState: GameState = {
  status: statusType.STOPPED,
  point: 0,
};

const gameSlice = createSlice({
  name: GAME_KEY,
  initialState,
  reducers: {
    startGame: (state) => {
      if (state.status !== statusValue.PLAY) {
        state.status = statusType.PLAY;
        state.point = 0;
      }
    },
    stopGame: (state) => {
      state.status = statusType.STOPPED;
    },
    updatePoint: (state) => {
      state.point = state.point + 1;
    },
  },
});

export const { startGame, stopGame, updatePoint } = gameSlice.actions;

// const gameConfig = {
//   key: GAME_KEY,
//   // storage,
//   // whitelist: ["data", "flag", "isBack"],
// };

export const gameReducer = gameSlice.reducer;
