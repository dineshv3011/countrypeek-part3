import { useEffect, useState } from "react";

export default function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    async function fetchCountry() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch country");
        }

        const data = await response.json();

        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [code]);

  return { country, loading, error };
}
