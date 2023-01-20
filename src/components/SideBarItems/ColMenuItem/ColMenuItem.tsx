import { useNavigate } from "react-router";
import { useToggle } from "../customHooks";
import { Collapse } from "@mui/material";
import SimpleMenuItem from "../SimpleMenuItem/SimpleMenuItem";
import "./ColMenuItem.css";

//move to interfaces directory
interface SubMenuItem {
  name: string;
  routePath: string;
  handleOnClick: () => void;
}

interface Props {
  menuItemName: string;
  subMenuItems: SubMenuItem[];
}

const ChildComp: React.FC = () => (
  <p className="hover-menu">This is a child component</p>
);

export default function ColMenuItem({ menuItemName, subMenuItems }: Props) {
  const { toggle, handleClick } = useToggle(false);
  const navigate = useNavigate();

  const toggleAndNavigate = () => {
    handleClick();
    if (!toggle) {
      navigate(subMenuItems[0].routePath);
    }
  };

  return (
    <div className="colMenuItem-container">
      <SimpleMenuItem
        menuItemName={menuItemName}
        routePath={subMenuItems[0].routePath}
        handleOnClick={toggleAndNavigate}
      />
      <ChildComp />
      <Collapse in={toggle} timeout={1}>
        <div>
          {subMenuItems.map((item, idx) => (
            <SimpleMenuItem
              menuItemName={item.name}
              routePath={item.routePath}
              key={idx}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
}
