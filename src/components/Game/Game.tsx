import styled from "styled-components";
import background from "../../assets/bg.jpg";
import Pipes from "../Pipes/Pipes";
import Foreground from "../Foreground/Foreground";
import Bird from "../Bird/Bird";
import { useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { birdFall, birdFly, birdTouched } from "../Bird/bird.slice";
import { RootState } from "../../redux/root-reducer";
import { startGame, stopGame, updatePoint } from "./game.slice";
import { pipesGenerate, pipesRunning, updatePipes } from "../Pipes/pipes.slice";
import {
  BIRD_POSITION_X,
  BIRD_SIZE,
  GAME_HEIGHT,
  GAME_WIDTH,
  POSITION,
  statusValue,
} from "../../constants/values.constants";
import { statusType } from "../../types/type";

const Container = styled.div`
  width: ${GAME_WIDTH}px;
  height: ${GAME_HEIGHT}px;
  background: url(${background}) bottom no-repeat border-box #71c5cf;
  position: relative;
  border: "1px solid red";
`;
type isTouchedType = {
  value: boolean;
  typeTouched?: string;
};
export default function Game() {
  const dispatch = useAppDispatch();
  const { status, point } = useAppSelector((state: RootState) => state.game);
  const { y } = useAppSelector((state: RootState) => state.bird);
  const { x, pipes } = useAppSelector((state: RootState) => state.pipes);

  const isTouchedGame = useMemo<isTouchedType>(() => {
    if (y >= GAME_HEIGHT - BIRD_SIZE - 25) {
      return { value: false, typeTouched: POSITION.BOTTOM };
    } else if (y <= 0) {
      return { value: false, typeTouched: POSITION.TOP };
    }
    return { value: true };
  }, [y]);
  useEffect(() => {
    let action1: number;
    const data = isTouchedGame;

    if (status === statusType.PLAY && data.value) {
      action1 = setInterval(() => {
        dispatch(birdFall());
      }, 200);
    } else if (status !== statusValue.STOPPED) {
      dispatch(birdTouched(data.typeTouched));
      dispatch(stopGame());
    }

    return () => clearInterval(action1);
  }, [dispatch, isTouchedGame, status]);

  useEffect(() => {
    let action1: number;

    if (status === statusType.PLAY) {
      action1 = setInterval(() => {
        dispatch(pipesRunning());
      }, 200);
    }

    return () => clearInterval(action1);
  }, [dispatch, status]);

  // useEffect(() => {
  //   pipes.forEach((pipe, i) => {
  //     const xPipe = x + i * 250;
  //     if (xPipe < BIRD_POSITION_X + BIRD_SIZE) {
  //       dispatch(updatePoint());
  //     }
  //     if (xPipe < 0) {
  //       dispatch(
  //         updatePipes(pipes.filter((p) => p.topHeight !== pipe.topHeight))
  //       );
  //     }
  //   });
  // }, [dispatch, pipes, x]);

  useEffect(() => {
    let action2: number;

    console.log(pipes);
    if (status === statusType.PLAY) {
      const abc = pipes.r
      dispatch(updatePipes(abc));
    }

    return () => clearInterval(action2);
  }, [dispatch, status, x]);
  useEffect(() => {
    let action2: number;

    if (status === statusType.PLAY) {
      action2 = setInterval(() => {
        dispatch(pipesGenerate());
      }, 2000);
    }

    return () => clearInterval(action2);
  }, [dispatch, status]);

  useEffect(() => {
    const keyPressEvent = (e: KeyboardEvent) => {
      if (e.keyCode === 32) {
        dispatch(birdFly());

        if (status !== statusType.PLAY) {
          dispatch(startGame());
        }
      }
    };

    document.addEventListener("keypress", keyPressEvent);

    return () => document.removeEventListener("keypress", keyPressEvent);
  }, [dispatch, status]);

  return (
    <Container>
      <div
        className="pointCount"
        style={{
          color: "#fffff",
          fontSize: 70,
          position: "absolute",
          width: "100%",
          zIndex: 15,
          top: GAME_HEIGHT / 6,
        }}
      >
        {point}
      </div>

      <Bird />
      <Pipes />
      <Foreground />
    </Container>
  );
}
