import { useState } from "react";
import mainApi from "../apis/mainApi";

const useReports = () => {
  const [reports, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const loadReports = (filters) => {
    setLoading(true);
    mainApi
      .getReports(filters)
      .then((response) => response.json())
      .then((json) => {
        setProjects(json.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { reports, isLoading, error, loadReports };
};

export default useReports;
