import { describe, it, expect, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ColMenuItem from "./ColMenuItem";
import { EnableeSubMenuItems as list } from "../menuItems";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
}));

describe("ColMenuItem", () => {
  it('expands and show sub menu items when "Main Menu" is clicked', () => {
    render(<ColMenuItem menuItemName={"Main Menu"} subMenuItems={list} />);
    const mainMenuBtn = screen.getByText("Main Menu");
    fireEvent.click(mainMenuBtn);
    expect(screen.getByText(list[0].name)).toBeInTheDocument();
  });

  it("displays the hover menu", async () => {
    render(<ColMenuItem menuItemName={"Main Menu"} subMenuItems={list} />);
    const mainMenuBtn = screen.getByText("Main Menu");
    fireEvent.mouseOver(mainMenuBtn);
    const subMenuList = await screen.findAllByText(list[0].name);
    expect(subMenuList[0]).toBeInTheDocument();
  });

  it("displays and removes hover menu", async () => {
    render(<ColMenuItem menuItemName={"Main Menu"} subMenuItems={list} />);
    const mainMenuBtn = screen.getByText("Main Menu");
    expect(screen.queryByTestId("hover-menu")).not.toBeInTheDocument();
    fireEvent.mouseOver(mainMenuBtn);
    await expect(screen.getByTestId("hover-menu")).toBeInTheDocument();
    fireEvent.mouseOver(screen.getByTestId("hover-menu"));
    fireEvent.mouseLeave(screen.getByTestId("hover-menu"));
    await waitForElementToBeRemoved(screen.queryByTestId("hover-menu"));
    expect(screen.queryByTestId("hover-menu")).not.toBeInTheDocument();
  });
});
