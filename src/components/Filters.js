import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { gatewaysToOptions, projectsToOptions } from "../helpers";

const Filters = ({ className, gateways, projects, onGenerateReports }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleGenerateReports = () =>
    onGenerateReports({
      from: startDate,
      to: endDate,
      gatewayId: selectedGateway?.value,
      projectId: selectedProject?.value,
    });

  return (
    <div className={className}>
      <div className="mb10">
        <Select
          className="react-select"
          classNamePrefix="react-select"
          placeholder="Select project"
          value={selectedProject}
          onChange={setSelectedProject}
          options={[
            { value: undefined, label: "Select project" },
            ...projectsToOptions(projects),
          ]}
        />
      </div>
      <div className="ml20 mb10">
        <Select
          className="react-select"
          classNamePrefix="react-select"
          placeholder="Select gateway"
          value={selectedGateway}
          onChange={setSelectedGateway}
          options={[
            { value: undefined, label: "Select gateway" },
            ...gatewaysToOptions(gateways),
          ]}
        />
      </div>
      <div className="relative ml20 mb10">
        <DatePicker
          placeholderText="From date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="relative ml20 mb10">
        <DatePicker
          placeholderText="To date"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <button className="ml20 button-blue" onClick={handleGenerateReports}>
        Generate report
      </button>
    </div>
  );
};

export default Filters;
