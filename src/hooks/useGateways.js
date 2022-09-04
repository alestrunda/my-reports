import { useEffect, useState } from "react";
import mainApi from "../apis/mainApi";

const useGateways = () => {
  const [gateways, setGateways] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    mainApi
      .getGateways()
      .then((response) => response.json())
      .then((json) => {
        setGateways(json.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { gateways, isLoading, error };
};

export default useGateways;
