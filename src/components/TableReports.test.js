import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TableReports from "./TableReports";
import { dateToUserFormat, formatNumber } from "../helpers";

const reports = [
  {
    paymentId: "6149cf567833e57669e60455",
    amount: 2663.69,
    projectId: "ERdPQ",
    gatewayId: "i6ssp",
    gatewayName: "Gateway 1",
    userIds: ["rahej"],
    modified: "2021-09-20",
    created: "2021-04-11",
  },
];

test("renders the project name", () => {
  render(<TableReports reports={reports} />);
  expect(
    screen.getByText(dateToUserFormat(new Date("2021-04-11")))
  ).toBeInTheDocument();
  expect(screen.getByText("Gateway 1")).toBeInTheDocument();
  expect(screen.getByText("6149cf567833e57669e60455")).toBeInTheDocument();
  expect(screen.getByText(`${formatNumber(2663.69)} USD`)).toBeInTheDocument();
});

test("when 'gateway' is set to skip then it's not rendered", () => {
  render(<TableReports reports={reports} skipColumns={["gateway"]} />);
  expect(screen.queryByText("Gateway 1")).toBeNull();
});
