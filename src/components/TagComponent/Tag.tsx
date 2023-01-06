import "./tag.css";

export function TagComponent(props: {
  name: string | undefined;
  color: string | undefined;
}) {
  return (
    <div className="tag-container">
      <div className="tag" style={{ backgroundColor: props.color }}>
        {props.name}
      </div>
    </div>
  );
}
