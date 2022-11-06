import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [controller, setController] = useState();

  const axiosInstance = axios.create();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      const controller = new AbortController();
      setController(controller);
      try {
        const res = await axiosInstance({
          url,
          method,
          data: body,
        });

        return res;
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [error, loading, sendRequest];
};
