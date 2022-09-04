import { useEffect, useState } from "react";
import mainApi from "../apis/mainApi";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    mainApi
      .getProjects()
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
  }, []);

  return { projects, isLoading, error };
};

export default useProjects;
