import { useState } from "react";
import AirportSelect from "../components/AirportSelect";
import ResultCard from "../components/ResultCard";
import { getFlightFootprint } from "../services/api";

type CabinClass = "economy" | "premium_economy" | "business" | "first";

const Calculator = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const [co2PerPassenger, setCo2PerPassenger] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin || !destination) {
      setError("Please select both departure and arrival airports.");
      return;
    }

     console.log("🛫 Origin:", origin, "🛬 Destination:", destination);

    setError("");
    setLoading(true);

    try {
      const footprint = await getFlightFootprint(origin, destination, cabinClass);
      setCo2PerPassenger(footprint);
    } catch (err) {
      console.error("Error details:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while fetching data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const totalCo2 = co2PerPassenger ? co2PerPassenger * passengers : null;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AirportSelect label="Departure airport" value={origin} onChange={setOrigin} />
        <AirportSelect label="Arrival airport" value={destination} onChange={setDestination} />

        <div className="form-group">
          <label htmlFor="passengers">Number of passengers</label>
          <input
            id="passengers"
            type="number"
            min={1}
            max={20}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            aria-label="Number of passengers"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cabin-class">Cabin class</label>
          <select
            id="cabin-class"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value as CabinClass)}
            aria-label="Cabin class selection"
          >
            <option value="economy">Economy</option>
            <option value="premium_economy">Premium Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </select>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Calculating..." : "Calculate footprint"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {co2PerPassenger && totalCo2 && (
        <ResultCard
          perPassenger={co2PerPassenger}
          total={totalCo2}
          passengers={passengers}
          cabinClass={cabinClass}
          origin={origin}
          destination={destination}
        />
      )}
    </>
  );
};

export default Calculator;
