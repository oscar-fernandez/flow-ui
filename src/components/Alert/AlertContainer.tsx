import "./Alert.css";
import AlertText from "./AlertText";
import AlertButton from "./AlertButton";

export default function AlertContainer() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <AlertText text={"No pending pods ..."}></AlertText>
        <AlertButton text={"Create Pod"}></AlertButton>
      </div>
    </>
  );
}
