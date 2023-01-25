import "./tag.css";

interface Props {
  name: string;
  color: string;
}

export function TagComponent({ name, color }: Props) {
  return (
    <div className="tag-container">
      <div className="tag" style={{ backgroundColor: color }}>
        {name}
      </div>
    </div>
  );
}
