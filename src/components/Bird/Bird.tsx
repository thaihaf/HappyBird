import birdImg from "../../assets/bird.png";
import { BIRD_POSITION_X, BIRD_SIZE } from "../../constants/values.constants";
import { RootState } from "../../redux/root-reducer";
import { useAppSelector } from "../../redux/store";

export default function Bird() {
  const { y, rotate } = useAppSelector((state: RootState) => state.bird);

  return (
    <div
      style={{
        zIndex: 10,
        width: `${BIRD_SIZE}px`,
        height: `${BIRD_SIZE}px`,
        background: `url(${birdImg}) no-repeat`,
        backgroundSize: "cover",
        position: "absolute",
        top: y,
        left: BIRD_POSITION_X,
        transform: `rotate(${rotate}deg)`,
        transition: "tranform 200ms linear, top 100ms linear",
      }}
    ></div>
  );
}
