import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountry";

export default function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { country, loading, error } = useCountry(code);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!country) {
    return <h2>No country found</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>
        Back
      </button>

      <div style={{ marginTop: "20px" }}>
        <img
          src={country.flags?.png}
          alt={country.name?.common}
          width="250"
        />

        <h1>{country.name?.common}</h1>

        <h3>Official Name:</h3>
        <p>{country.name?.official}</p>

        <h3>Population:</h3>
        <p>{country.population.toLocaleString()}</p>

        <h3>Region:</h3>
        <p>{country.region}</p>

        <h3>Subregion:</h3>
        <p>{country.subregion}</p>

        <h3>Capital:</h3>
        <p>{country.capital?.join(", ")}</p>

        <h3>Languages:</h3>
        <p>
          {country.languages
            ? Object.values(country.languages).join(", ")
            : "N/A"}
        </p>

        <h3>Currencies:</h3>
        <p>
          {country.currencies
            ? Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")
            : "N/A"}
        </p>

        <h3>Border Countries:</h3>
        <p>
          {country.borders
            ? country.borders.join(", ")
            : "No Borders"}
        </p>
      </div>
    </div>
  );
}
