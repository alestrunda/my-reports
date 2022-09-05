import { useState } from "react";

import TableReports from "./TableReports";

import { formatNumber } from "../helpers";

const ProjectDetail = ({ projectName, reports, skipColumns }) => {
  const [showReports, setShowReports] = useState(false);

  const total = reports.reduce((total, report) => (total += report.amount), 0);

  const toggleRecords = () => {
    setShowReports(!showReports);
  };

  return (
    <>
      <button
        className="box-white"
        onClick={toggleRecords}
        data-testid="project-head"
      >
        <div className="row-edges">
          <p>{projectName}</p>
          <p className="text-uppercase">
            Total: <span data-testid="total">{formatNumber(total)}</span> USD
          </p>
        </div>
      </button>
      {showReports && (
        <div className="mb10 mt15">
          <TableReports reports={reports} skipColumns={skipColumns} />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
