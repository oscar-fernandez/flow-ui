import { OnHoverMenuItems } from "../../OnHoverMenuItems/OnHoverMenuItems";
import "./ColMenuItem.css";

export function ColMenuItem() {
  // menuItemName: string
  // subMenuItems: { name: string; routePath: string }
  //   if (menuItemName !== "Pod" && menuItemName !== "Enablee") return;

  return (
    <div className="col-menu">
      <OnHoverMenuItems
        subMenuItems={[
          { name: "Active", routePath: "/active" },
          { name: "Pending Start", routePath: "/pendingstart" },
          { name: "Available", routePath: "/available" },
          { name: "Completed", routePath: "/completed" },
        ]}
      />
      ;
    </div>
  );
}
