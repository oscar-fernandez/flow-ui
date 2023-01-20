import "./OnHoverMenuItems.css";
import {
  setSubMenuItems,
  setIsSubMenuItemsClicked,
} from "../../utils/utilityFunctions";
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
              isMainMenu={false}
              handleOnClick={itemClicked}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
