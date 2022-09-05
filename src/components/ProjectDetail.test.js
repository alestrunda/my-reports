import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ProjectDetail from "./ProjectDetail";
import { formatNumber } from "../helpers";

const reports = [
  {
    paymentId: "6149cf567833e57669e60455",
    amount: 2663.69,
    projectId: "ERdPQ",
    gatewayId: "i6ssp",
    userIds: ["rahej"],
    modified: "2021-09-20",
    created: "2021-04-11",
  },
];

test("renders the project name", () => {
  render(<ProjectDetail projectName="My project" reports={reports} />);
  expect(screen.getByText("My project")).toBeInTheDocument();
});

test("renders the total", () => {
  render(<ProjectDetail projectName="My project" reports={reports} />);
  expect(screen.getByTestId("total")).toHaveTextContent(
    formatNumber(reports[0].amount)
  );
});

test("when clicked on the project head, then project records toggle", async () => {
  render(<ProjectDetail projectName="My project" reports={reports} />);

  //open
  await userEvent.click(screen.getByTestId("project-head"));
  expect(screen.getByText("6149cf567833e57669e60455")).toBeInTheDocument();

  //close
  await userEvent.click(screen.getByTestId("project-head"));
  expect(screen.queryByText("6149cf567833e57669e60455")).toBeNull();
});
