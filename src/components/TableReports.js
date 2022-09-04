import { dateToUserFormat, formatNumber } from "../helpers";

const TableReports = ({ reports, skipColumns = [] }) => {
  if (!reports.length) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          {!skipColumns.includes("gateway") && <th>Gateway</th>}
          <th className="text-center">Transaction ID</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.paymentId}>
            <td>{dateToUserFormat(new Date(report.created))}</td>
            {!skipColumns.includes("gateway") && <td>{report.gatewayName}</td>}
            <td className="text-center">{report.paymentId}</td>
            <td className="text-right">{formatNumber(report.amount)} USD</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableReports;
