import { useNavigate } from "react-router";
import { useToggle } from "../customHooks";
import SimpleMenuItem from "../SimpleMenuItem/SimpleMenuItem";

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

export default function ColMenuItem({ menuItemName, subMenuItems }: Props) {
  const { toggle, handleClick } = useToggle(false);
  const navigate = useNavigate();

  const toggleAndNavigate = () => {
    handleClick();
    navigate(subMenuItems[0].routePath);
  };

  return (
    <>
      <SimpleMenuItem
        menuItemName={menuItemName}
        routePath={subMenuItems[0].routePath}
        handleOnClick={toggleAndNavigate}
      />
      <div>
        {subMenuItems.map((item, idx) => (
          <SimpleMenuItem
            menuItemName={item.name}
            routePath={item.routePath}
            key={idx}
          />
        ))}
      </div>
    </>
  );
}
