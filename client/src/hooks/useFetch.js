import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [controller, setController] = useState();

  const URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://volunteers-mern-app-backend.onrender.com";

  const axiosInstance = axios.create({
    baseURL: URL,
  });

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      const controller = new AbortController();
      setController(controller);
      try {
        const res = await axiosInstance({
          url,
          method,
          headers,
          data: body,
        });

        console.log(res);
        return res;
      } catch (err) {
        console.log(err);
        console.log(err.response.data.error);
        if (err?.response?.data?.error) setError(err.response.data.error);
        else setError(err.response?.data?.message);
      } finally {
        console.log(error);
        setLoading(false);
      }
    },
    []
  );

  const clearError = () => setError("");

  useEffect(() => {
    return () => controller && controller.abort();
  }, [controller]);

  return [error, loading, sendRequest, clearError];
};
