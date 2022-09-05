import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoxInitials from "./BoxInitials";

test('when no name passed then renders "N/A"', () => {
  render(<BoxInitials />);
  expect(screen.getByText("N/A")).toBeInTheDocument();
});

test("when name passed then renders its initials", () => {
  render(<BoxInitials firstName="John" lastName="Doe" />);
  expect(screen.getByText("JD")).toBeInTheDocument();
});
