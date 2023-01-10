import "./Alert.css";

interface Props {
  text: string;
}

export default function AlertText({ text }: Props) {
  return (
    <>
      <p className="text">{text}</p>
    </>
  );
}
