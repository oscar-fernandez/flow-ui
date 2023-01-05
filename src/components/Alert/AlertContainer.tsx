import "./Alert.css";
import AlertText from "./AlertText";
import AlertButton from "./AlertButton";

interface Props {
  text: string;
  buttonText: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function AlertContainer({ text, buttonText, handleClick }: Props) {
  return (
    <>
      <div style={{ display: "flex" }}>
        <AlertText text={text}></AlertText>
        <AlertButton text={buttonText} handleClick={handleClick}></AlertButton>
      </div>
    </>
  );
}

export default AlertContainer;
