import { useState } from "react";
import DonutChart from "react-donut-chart";

import Filters from "./components/Filters";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Label from "./components/Label";
import ProjectDetail from "./components/ProjectDetail";
import Sidebar from "./components/Sidebar";
import TableReports from "./components/TableReports";

import useGateways from "./hooks/useGateways";
import useProjects from "./hooks/useProjects";
import useReports from "./hooks/useReports";

import imgNoData from "./assets/no_data.png";

import { chartColors } from "./config";
import { formatNumber } from "./helpers";

import "./App.css";

const App = () => {
  const {
    error: reportsError,
    isLoading: isLoadingReports,
    reports,
    loadReports,
  } = useReports();
  const {
    error: projectsError,
    isLoading: isLoadingProjects,
    projects,
  } = useProjects();
  const {
    error: gatewaysError,
    isLoading: isLoadingGateways,
    gateways,
  } = useGateways();
  const [activeFilters, setActiveFilters] = useState({});

  const error = reportsError || projectsError || gatewaysError;
  const isLoading = isLoadingReports || isLoadingProjects || isLoadingGateways;

  const generateReports = (filters) => {
    setActiveFilters(filters);
    loadReports(filters);
  };

  const createGatewayNameMapping = (gateways) => {
    const mapping = {};
    gateways.forEach((gateway) => (mapping[gateway.gatewayId] = gateway.name));
    return mapping;
  };

  const createProjectNameMapping = (projects) => {
    const mapping = {};
    projects.forEach((project) => (mapping[project.projectId] = project.name));
    return mapping;
  };

  const gatewayNameMapping = createGatewayNameMapping(gateways);
  const projectNameMapping = createProjectNameMapping(projects);
  const total = reports.reduce((total, report) => (total += report.amount), 0);

  const getTotalByGateways = (reports) => {
    const totals = {};
    reports.forEach((report) => {
      if (!totals[report.gatewayId]) {
        totals[report.gatewayId] = {
          value: report.amount,
          name: gatewayNameMapping[report.gatewayId],
          gatewayId: report.gatewayId,
        };
      } else {
        totals[report.gatewayId].value += report.amount;
      }
    });
    return totals;
  };

  const getTotalByProject = (reports) => {
    const totals = {};
    reports.forEach((report) => {
      if (!totals[report.projectId]) {
        totals[report.projectId] = {
          value: report.amount,
          name: projectNameMapping[report.projectId],
          projectId: report.projectId,
        };
      } else {
        totals[report.projectId].value += report.amount;
      }
    });
    return totals;
  };

  return (
    <div className="app">
      <Header />
      <div className="app__content">
        <Sidebar className="app__content-sidebar" />
        <main className="app__content-main page-content">
          <div className="page-content__head">
            <div className="page-content__head-text">
              <h1>Reports</h1>
              <p className="mb30">
                Easily generate a report of your transactions
              </p>
            </div>
            <Filters
              className="page-content__head-filters"
              gateways={gateways}
              projects={projects}
              onGenerateReports={generateReports}
            />
          </div>
          {!reports.length ? (
            <div className="page-content__content page-content__content--center">
              {error && (
                <div className="container-small text-center">
                  <h2>Data cannot be loaded</h2>
                </div>
              )}
              {isLoading && (
                <div className="container-small text-center">
                  <h2>Loading...</h2>
                </div>
              )}
              {!error && !isLoading && (
                <div className="container-small text-center">
                  <h2>No reports</h2>
                  <p className="mb50">
                    Currently you have no data for the reports to be generated.
                    <br />
                    Once you start generating traffic through the Balance
                    application the reports will be shown.
                  </p>
                  <img className="img-center" alt="no data" src={imgNoData} />
                </div>
              )}
            </div>
          ) : (
            <>
              {!activeFilters.gatewayId && !activeFilters.projectId && (
                <div className="page-content__content">
                  <div className="box-blue mb30">
                    <p className="mb30">All projects | All gateways</p>
                    {projects.map((project) => (
                      <ProjectDetail
                        key={project.projectId}
                        projectName={project.name}
                        reports={reports
                          .filter(
                            (record) => record.projectId === project.projectId
                          )
                          .map((report) => ({
                            ...report,
                            gatewayName: gatewayNameMapping[report.gatewayId],
                          }))}
                      />
                    ))}
                  </div>
                  <div className="box-blue">
                    <p className="text-uppercase">
                      Total: {formatNumber(total)} USD
                    </p>
                  </div>
                </div>
              )}
              {activeFilters.gatewayId && activeFilters.projectId && (
                <div className="page-content__content">
                  <div className="box-blue mb30">
                    <p className="mb30">
                      {projectNameMapping[activeFilters.projectId]} |{" "}
                      {gatewayNameMapping[activeFilters.gatewayId]}
                    </p>
                    <TableReports
                      reports={reports
                        .filter(
                          (record) =>
                            record.projectId === activeFilters.projectId &&
                            record.gatewayId === activeFilters.gatewayId
                        )
                        .map((report) => ({
                          ...report,
                          gatewayName: gatewayNameMapping[report.gatewayId],
                        }))}
                      skipColumns={["gateway"]}
                    />
                  </div>
                  <div className="box-blue">
                    <p className="text-uppercase">
                      Total: {formatNumber(total)} USD
                    </p>
                  </div>
                </div>
              )}
              {activeFilters.gatewayId && !activeFilters.projectId && (
                <div className="page-content__content">
                  <div className="cols-2">
                    <div>
                      <div className="box-blue mb30">
                        <p className="mb30">
                          All projects |{" "}
                          {gatewayNameMapping[activeFilters.gatewayId]}
                        </p>
                        {projects.map((project) => (
                          <ProjectDetail
                            key={project.projectId}
                            projectName={project.name}
                            reports={reports.filter(
                              (record) => record.projectId === project.projectId
                            )}
                            skipColumns={["gateway"]}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="box-blue">
                        {Object.values(getTotalByProject(reports)).map(
                          (project, index) => (
                            <Label
                              key={project.projectId}
                              color={chartColors[index]}
                            >
                              {project.name}
                            </Label>
                          )
                        )}
                      </div>
                      <div className="chart-wrapper-center">
                        <DonutChart
                          className="element-center"
                          data={Object.values(getTotalByProject(reports))}
                          colors={chartColors}
                          strokeColor={"#FFF"}
                          innerRadius={0.5}
                          legend={false}
                          clickToggle={false}
                          interactive={false}
                          height={270}
                          width={270}
                        />
                      </div>
                      <div className="box-blue">
                        <p className="text-uppercase">
                          Gateway Total: {formatNumber(total)} USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!activeFilters.gatewayId && activeFilters.projectId && (
                <div className="page-content__content">
                  <div className="cols-2">
                    <div>
                      <div className="box-blue mb30">
                        <p className="mb30">
                          {projectNameMapping[activeFilters.projectId]} | All
                          gateways
                        </p>
                        {gateways.map((gateway) => (
                          <ProjectDetail
                            key={gateway.gatewayId}
                            projectName={gateway.name}
                            reports={reports.filter(
                              (record) => record.gatewayId === gateway.gatewayId
                            )}
                            skipColumns={["gateway"]}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="box-blue">
                        {Object.values(getTotalByGateways(reports)).map(
                          (gateway, index) => (
                            <Label
                              key={gateway.gatewayId}
                              color={chartColors[index]}
                            >
                              {gateway.name}
                            </Label>
                          )
                        )}
                      </div>
                      <div className="chart-wrapper-center">
                        <DonutChart
                          className="element-center"
                          data={Object.values(getTotalByGateways(reports))}
                          colors={chartColors}
                          strokeColor={"#FFF"}
                          innerRadius={0.5}
                          legend={false}
                          clickToggle={false}
                          interactive={false}
                          height={270}
                          width={270}
                        />
                      </div>
                      <div className="box-blue">
                        <p className="text-uppercase">
                          Project Total: {formatNumber(total)} USD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer className="app__footer" />
    </div>
  );
};

export default App;
