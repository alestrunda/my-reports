export const projectsToOptions = (projects) =>
  projects.map((project) => ({
    value: project.projectId,
    label: project.name,
  }));

export const gatewaysToOptions = (gateways) =>
  gateways.map((gateway) => ({
    value: gateway.gatewayId,
    label: gateway.name,
  }));

// https://stackoverflow.com/a/16714931/6846434
export const dateToApiFormat = (date) => {
  if (!(date instanceof Date)) return;
  return date.toISOString().slice(0, 10);
};

// https://stackoverflow.com/a/12409344/6846434
export const dateToUserFormat = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return mm + "/" + dd + "/" + yyyy;
};

// https://stackoverflow.com/a/2901298/6846434
export const formatNumber = (number) =>
  Math.round(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
