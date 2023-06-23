import { Button } from "antd";

export default function Foreground() {
  return (
    <div
      style={{
        backgroundColor: "#e1d694",
        height: "7rem",
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 20,
        paddingLeft: 70,
        boxSizing: "border-box",
      }}
    >
      <Button>Pause</Button>
      <Button>Save</Button>
    </div>
  );
}
