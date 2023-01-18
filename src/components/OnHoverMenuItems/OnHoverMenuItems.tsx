import { Route, Routes } from "react-router";
import "./OnHoverMenuItems.css";
import {
  setSubMenuItems,
  setIsSubMenuItemsClicked,
} from "../../utils/utilityFunctions";

export function OnHoverMenuItems(props: {
  subMenuItems: Array<{ name: string; routePath: string }>;
}) {
  function goToPage(routePath: string, name: string) {
    setSubMenuItems(props.subMenuItems, name);
    setIsSubMenuItemsClicked(true);
    <Routes>
      <Route path={routePath} />
    </Routes>;
  }

  return (
    <div className="hovermenuitems-container">
      <ul className="submenu">
        {props.subMenuItems.map((item, i) => (
          <li
            className="items"
            onClick={() => goToPage(item.routePath, item.name)}
            key={i}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
