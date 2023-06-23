import { combineReducers } from "@reduxjs/toolkit";
import { BIRD_KEY, birdReducer } from "../components/Bird/bird.slice";
import { GAME_KEY, gameReducer } from "../components/Game/game.slice";
import { PIPES_KEY, pipesReducer } from "../components/Pipes/pipes.slice";

const rootReducer = combineReducers({
  [GAME_KEY]: gameReducer,
  [BIRD_KEY]: birdReducer,
  [PIPES_KEY]: pipesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
