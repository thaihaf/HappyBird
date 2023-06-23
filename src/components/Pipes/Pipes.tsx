import pipeTopImg from "../../assets/pipeTop.png";
import pipeBottomImg from "../../assets/pipeBottom.png";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RootState } from "../../redux/root-reducer";
import {
  BIRD_POSITION_X,
  GAME_HEIGHT,
  PIPES_SPACE,
  PIPES_WIDTH,
} from "../../constants/values.constants";
import { updatePipes } from "./pipes.slice";
import { updatePoint } from "../Game/game.slice";

export default function Pipes() {
  const dispatch = useAppDispatch();
  const { x, pipes } = useAppSelector((state: RootState) => state.pipes);
  const { point } = useAppSelector((state: RootState) => state.game);

  return (
    <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
      {pipes.map(({ topHeight }, i) => {
        const xPipe = x + i * 250;

        // if (xPipe > BIRD_POSITION_X) {
        //   dispatch(updatePoint(point + 1));
        // }
        //  else {
        //   // dispatch(updatePipes(pipes.filter((p) => p.topHeight !== topHeight)));
        // }

        return (
          <div key={i}>
            <div
              style={{
                zIndex: 5,
                position: "absolute",
                top: 0,
                left: xPipe,
                width: PIPES_WIDTH,
                height: topHeight,
                background: `url(${pipeTopImg})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                transition: "all 300ms linear",
              }}
            ></div>
            <div
              style={{
                zIndex: 5,
                position: "absolute",
                bottom: 7,
                left: xPipe,
                width: PIPES_WIDTH,
                height: GAME_HEIGHT - topHeight - PIPES_SPACE,
                background: `url(${pipeBottomImg})`,
                backgroundSize: "cover",
                transition: "all 300ms linear",
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
