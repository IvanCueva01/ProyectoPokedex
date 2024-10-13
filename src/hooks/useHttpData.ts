import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T | null>(null); // Cambia a null inicialmente
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    setError(null);

    axios
      .get<T>(url, { signal }) // Cambia a T en lugar de T[]
      .then(({ data }) => {
        if (!ignore) {
          setData(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [url]);

  return { data, loading, error };
}
