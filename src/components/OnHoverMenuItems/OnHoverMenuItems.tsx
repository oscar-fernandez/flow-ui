import "./OnHoverMenuItems.css";
import SimpleMenuItem from "../SideBarItems/SimpleMenuItem/SimpleMenuItem";
import { useCustomNavigate } from "../SideBarItems/customHooks";
import { useState } from "react";

export function OnHoverMenuItems(props: {
  subMenuItems: Array<{ name: string; routePath: string }>;
}) {
  const [itemRoute, setItemRoute] = useState("");
  const { handleNavigate } = useCustomNavigate(itemRoute);

  const itemClicked = (path: string) => {
    setItemRoute(path);
    handleNavigate();
  };

  return (
    <div className="hovermenuitems-container">
      <ul className="submenu">
        {props.subMenuItems.map((item, i) => (
          <div key={i}>
            <SimpleMenuItem
              menuItemName={item.name}
              routePath={item.routePath}
              handleOnClick={itemClicked}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
