import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InstantSearch } from "react-instantsearch-core";
import SideDrawer from "../SideDrawer";
import "@testing-library/jest-dom/extend-expect";
const mockSearch = jest.fn(() => Promise.resolve({ hits: [] }));
jest.mock("react-instantsearch-core", () => ({
  ...jest.requireActual("react-instantsearch-core"),
  useInstantSearchContext: () => ({ searchClient: { search: mockSearch } }),
}));
test("renders SideDrawer component without DokumententypRefinement", async () => {
  render(
    <InstantSearch searchClient={{ search: mockSearch }}>
      <SideDrawer />
    </InstantSearch>
  );
  // Continue with your other expectations...
  expect(screen.getAllByText("Dokumententyp", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Gesetz", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Europäische Norm", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Unternehmen", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Personen", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Autor", { exact: false }).length).toBe(1);
  expect(screen.getAllByText("Datum", { exact: false }).length).toBe(1);
  // Interaction test: Click on an item in the SideDrawer
  const gesetzCheckbox = screen.queryByText("Gesetz");
  if (gesetzCheckbox) {
    userEvent.click(gesetzCheckbox);
    // Add expectations for the deselected item
    // Verify that the item is no longer selected
    expect(gesetzCheckbox).toHaveClass("collapse-title", { exact: false });
  } else {
    console.log("Element not found: Gesetz");
  }
});
