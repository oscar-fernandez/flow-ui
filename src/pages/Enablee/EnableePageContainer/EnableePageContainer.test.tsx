import { describe, vi, beforeAll, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EnableePageContainer } from "./EnableePageContainer";
import { useAllEnablees } from "../Hooks/useAllEnablees";
import {
  convertToStringArr,
  generateTags,
} from "../../../utils/utilityFunctions";
import { dummyEnablees } from "../../../data/EnableeMock";
import { usePendingStartEnablees } from "../Hooks/customHook";
import { jest } from "@jest/globals";

vi.mock("../Hooks/useAllEnablees");
vi.mock("../Hooks/customHook");
vi.mock("../../../utils/utilityFunctions");

const mockUsePendingStartEnablees =
  usePendingStartEnablees as jest.MockedFunction<
    typeof usePendingStartEnablees
  >;

const mockUseAllEnablees = useAllEnablees as jest.MockedFunction<
  typeof useAllEnablees
>;
const mockConvertToStringArr = convertToStringArr as jest.MockedFunction<
  typeof convertToStringArr
>;
const mockGenerateTags = generateTags as jest.MockedFunction<
  typeof generateTags
>;

describe("EnableePageContainer", () => {
  beforeAll(() => {
    const techList = ["Java", ".Net", "React", "JavaScript"];
    const tag = { name: "Active", color: "red" };

    mockConvertToStringArr.mockReturnValue(techList);
    mockGenerateTags.mockReturnValue(tag);
  });
  it("renders component with PageNumberCarousel", () => {
    const pageOfItems = [
      {
        items: dummyEnablees,
        hasNext: false,
        totalElements: 150,
      },
      vi.fn(() => null),
    ];
    mockUseAllEnablees.mockReturnValue(pageOfItems);
    render(
      <EnableePageContainer hook={useAllEnablees} displayPageCarousel={true} />
    );
    expect(
      screen.getByRole("button", {
        name: "Next page",
      })
    ).toBeInTheDocument();
    /* clicking on row for coverage */
    const row = screen.getAllByTestId("rowTest");
    fireEvent.click(row[0]);
  });

  it("renders page with hook that returns IEnablee[]", () => {
    const arrOfItems = [dummyEnablees, vi.fn(() => null)];
    mockUsePendingStartEnablees.mockReturnValue(arrOfItems);
    render(
      <EnableePageContainer
        hook={usePendingStartEnablees}
        displayPageCarousel={false}
      />
    );
    expect(
      screen.queryByRole("button", {
        name: "Next page",
      })
    ).not.toBeInTheDocument();
  });
});
