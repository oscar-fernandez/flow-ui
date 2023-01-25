import { describe, it, vi } from "vitest";
import { OnHoverMenuItems } from "./OnHoverMenuItems";
import { listOfSubMenuItems1 } from "../../data/SubMenuMock";
import { render } from "@testing-library/react";

const customFunction = (path: string) => {
  vi.mock("react-router", () => ({
    useNavigate: (path: string) => vi.fn(),
  }));
};

describe("On Hover Menu Item component", () => {
  it('expands and show sub menu items when "Main Menu" is clicked', () => {
    render(
      <OnHoverMenuItems
        subMenuItems={listOfSubMenuItems1}
        customClick={customFunction}
      />
    );
  });
});
