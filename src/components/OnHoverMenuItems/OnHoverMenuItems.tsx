import "./OnHoverMenuItems.css";
import SimpleMenuItem from "../SideBarItems/SimpleMenuItem/SimpleMenuItem";

interface SubMenuItem {
  name: string;
  routePath: string;
  handleOnClick: (path: string) => void;
}

export function OnHoverMenuItems(props: {
  subMenuItems: SubMenuItem[];
  customClick: (path: string) => void;
}) {
  return (
    <div className="hovermenuitems-container">
      <ul className="submenu">
        {props.subMenuItems.map((item, i) => (
          <div className="submenu-item" key={i}>
            <SimpleMenuItem
              menuItemName={item.name}
              routePath={item.routePath}
              handleOnClick={props.customClick}
              isMainMenu={"s"}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
