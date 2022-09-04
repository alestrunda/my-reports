import { useEffect, useState } from "react";
import mainApi from "../apis/mainApi";

const useUser = () => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    mainApi
      .getUsers()
      .then((response) => response.json())
      .then((json) => {
        setUser(json.data[0]);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, isLoading, error };
};

export default useUser;
