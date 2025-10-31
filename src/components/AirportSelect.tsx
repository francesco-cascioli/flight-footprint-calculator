import React, { useState, useEffect } from "react";
import axios from "axios";

type Airport = {
  name: string;
  iata: string;
  city: string;
  country: string;
};

const MAJOR_AIRPORTS: Airport[] = [
  { name: "Leonardo da Vinci International Airport", iata: "FCO", city: "Rome", country: "Italy" },
  { name: "Milan Malpensa Airport", iata: "MXP", city: "Milan", country: "Italy" },
  { name: "Milan Linate Airport", iata: "LIN", city: "Milan", country: "Italy" },
  { name: "Venice Marco Polo Airport", iata: "VCE", city: "Venice", country: "Italy" },
  { name: "Naples International Airport", iata: "NAP", city: "Naples", country: "Italy" },
  { name: "Bologna Guglielmo Marconi Airport", iata: "BLQ", city: "Bologna", country: "Italy" },
  { name: "Florence Airport", iata: "FLR", city: "Florence", country: "Italy" },
  { name: "Turin Airport", iata: "TRN", city: "Turin", country: "Italy" },
  { name: "Palermo Airport", iata: "PMO", city: "Palermo", country: "Italy" },
  { name: "Catania Fontanarossa Airport", iata: "CTA", city: "Catania", country: "Italy" },
  { name: "Perugia San Francesco d'Assisi Airport", iata: "PEG", city: "Perugia", country: "Italy" },
  
  { name: "London Heathrow Airport", iata: "LHR", city: "London", country: "United Kingdom" },
  { name: "London Gatwick Airport", iata: "LGW", city: "London", country: "United Kingdom" },
  { name: "Paris Charles de Gaulle Airport", iata: "CDG", city: "Paris", country: "France" },
  { name: "Paris Orly Airport", iata: "ORY", city: "Paris", country: "France" },
  { name: "Frankfurt Airport", iata: "FRA", city: "Frankfurt", country: "Germany" },
  { name: "Munich Airport", iata: "MUC", city: "Munich", country: "Germany" },
  { name: "Amsterdam Airport Schiphol", iata: "AMS", city: "Amsterdam", country: "Netherlands" },
  { name: "Madrid Barajas Airport", iata: "MAD", city: "Madrid", country: "Spain" },
  { name: "Barcelona Airport", iata: "BCN", city: "Barcelona", country: "Spain" },
  { name: "Zurich Airport", iata: "ZUR", city: "Zurich", country: "Switzerland" },
  { name: "Vienna International Airport", iata: "VIE", city: "Vienna", country: "Austria" },
  { name: "Brussels Airport", iata: "BRU", city: "Brussels", country: "Belgium" },
  
  { name: "John F. Kennedy International Airport", iata: "JFK", city: "New York", country: "United States" },
  { name: "Los Angeles International Airport", iata: "LAX", city: "Los Angeles", country: "United States" },
  { name: "Toronto Pearson International Airport", iata: "YYZ", city: "Toronto", country: "Canada" },
  { name: "Vancouver International Airport", iata: "YVR", city: "Vancouver", country: "Canada" },
  
  { name: "Tokyo Haneda Airport", iata: "HND", city: "Tokyo", country: "Japan" },
  { name: "Tokyo Narita International Airport", iata: "NRT", city: "Tokyo", country: "Japan" },
  { name: "Istanbul Airport", iata: "IST", city: "Istanbul", country: "Turkey" },
  { name: "Istanbul Sabiha Gökçen Airport", iata: "SAW", city: "Istanbul", country: "Turkey" },
  { name: "Dubai International Airport", iata: "DXB", city: "Dubai", country: "United Arab Emirates" },
  { name: "Singapore Changi Airport", iata: "SIN", city: "Singapore", country: "Singapore" },
  { name: "Hong Kong International Airport", iata: "HKG", city: "Hong Kong", country: "Hong Kong" },
  { name: "Seoul Incheon International Airport", iata: "ICN", city: "Seoul", country: "South Korea" },
  { name: "Bangkok Suvarnabhumi Airport", iata: "BKK", city: "Bangkok", country: "Thailand" },
  { name: "Beijing Capital International Airport", iata: "PEK", city: "Beijing", country: "China" },
  { name: "Shanghai Pudong International Airport", iata: "PVG", city: "Shanghai", country: "China" },
  
  { name: "Sydney Kingsford Smith Airport", iata: "SYD", city: "Sydney", country: "Australia" },
  { name: "Melbourne Airport", iata: "MEL", city: "Melbourne", country: "Australia" },
  { name: "Brisbane Airport", iata: "BNE", city: "Brisbane", country: "Australia" },
  { name: "Perth Airport", iata: "PER", city: "Perth", country: "Australia" },
  
  { name: "São Paulo Guarulhos International Airport", iata: "GRU", city: "São Paulo", country: "Brazil" },
  { name: "Rio de Janeiro Galeão International Airport", iata: "GIG", city: "Rio de Janeiro", country: "Brazil" },
  { name: "Brasília International Airport", iata: "BSB", city: "Brasília", country: "Brazil" },
  
  { name: "Buenos Aires Ezeiza International Airport", iata: "EZE", city: "Buenos Aires", country: "Argentina" },
  { name: "Buenos Aires Jorge Newbery Airport", iata: "AEP", city: "Buenos Aires", country: "Argentina" },
  
  { name: "Lima Jorge Chávez International Airport", iata: "LIM", city: "Lima", country: "Peru" },
  
  { name: "Chicago O'Hare International Airport", iata: "ORD", city: "Chicago", country: "United States" },
  { name: "Miami International Airport", iata: "MIA", city: "Miami", country: "United States" },
  { name: "San Francisco International Airport", iata: "SFO", city: "San Francisco", country: "United States" },
  { name: "Seattle-Tacoma International Airport", iata: "SEA", city: "Seattle", country: "United States" },
  { name: "Dallas/Fort Worth International Airport", iata: "DFW", city: "Dallas", country: "United States" },
  
  { name: "Johannesburg OR Tambo International Airport", iata: "JNB", city: "Johannesburg", country: "South Africa" },
  { name: "Cape Town International Airport", iata: "CPT", city: "Cape Town", country: "South Africa" },
  
  { name: "Nairobi Jomo Kenyatta International Airport", iata: "NBO", city: "Nairobi", country: "Kenya" },
  
  { name: "Moscow Sheremetyevo International Airport", iata: "SVO", city: "Moscow", country: "Russia" },
  { name: "Moscow Domodedovo Airport", iata: "DME", city: "Moscow", country: "Russia" },
  { name: "Saint Petersburg Pulkovo Airport", iata: "LED", city: "Saint Petersburg", country: "Russia" },
  
  { name: "Athens International Airport", iata: "ATH", city: "Athens", country: "Greece" },
  { name: "Thessaloniki Airport", iata: "SKG", city: "Thessaloniki", country: "Greece" },
  
  { name: "Berlin Brandenburg Airport", iata: "BER", city: "Berlin", country: "Germany" },
  { name: "Hamburg Airport", iata: "HAM", city: "Hamburg", country: "Germany" },
  { name: "Cologne Bonn Airport", iata: "CGN", city: "Cologne", country: "Germany" },
  { name: "Düsseldorf Airport", iata: "DUS", city: "Düsseldorf", country: "Germany" },
];

const CITY_TO_COUNTRY: Record<string, string> = MAJOR_AIRPORTS.reduce((acc, airport) => {
  const key = airport.city.toLowerCase();
  if (!acc[key]) acc[key] = airport.country;
  return acc;
}, {} as Record<string, string>);

interface AirportSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const AirportSelect: React.FC<AirportSelectProps> = ({ label, value, onChange }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const queryLower = query.toLowerCase();
        
        const localResults = MAJOR_AIRPORTS.filter(airport => 
          airport.name.toLowerCase().includes(queryLower) ||
          airport.iata.toLowerCase().includes(queryLower) ||
          airport.city.toLowerCase().includes(queryLower)
        );
        
        if (localResults.length >= 3) {
          const sortedLocal = localResults.sort((a, b) => {
            const aNameExact = a.name.toLowerCase() === queryLower;
            const bNameExact = b.name.toLowerCase() === queryLower;
            if (aNameExact && !bNameExact) return -1;
            if (!aNameExact && bNameExact) return 1;
            
            const aIataExact = a.iata.toLowerCase() === queryLower;
            const bIataExact = b.iata.toLowerCase() === queryLower;
            if (aIataExact && !bIataExact) return -1;
            if (!aIataExact && bIataExact) return 1;
            
            const aCityExact = a.city.toLowerCase() === queryLower;
            const bCityExact = b.city.toLowerCase() === queryLower;
            if (aCityExact && !bCityExact) return -1;
            if (!aCityExact && bCityExact) return 1;
            
            if (a.country === 'Italy' && b.country !== 'Italy') return -1;
            if (a.country !== 'Italy' && b.country === 'Italy') return 1;
            
            return a.name.localeCompare(b.name);
          });
          
          setSuggestions(sortedLocal.slice(0, 8));
          setLoading(false);
          return;
        }
        
        const url = `https://airportgap.com/api/airports?query=${encodeURIComponent(query)}`;
        const res = await axios.get(url);
        const apiResults: Airport[] = (res.data?.data || []).map((item: { attributes: { name: string; iata: string; city: string; country: string } }) => ({
          name: item.attributes.name,
          iata: item.attributes.iata,
          city: item.attributes.city,
          country: item.attributes.country,
        }));
        
        const allResults = [...localResults];
        apiResults.forEach(apiAirport => {
          if (!allResults.find(local => local.iata === apiAirport.iata)) {
            allResults.push(apiAirport);
          }
        });
        
        const filteredResults = allResults.filter(airport => {
          const queryLower = query.toLowerCase();
          const mappedCountry = CITY_TO_COUNTRY[queryLower];
          if (mappedCountry) return airport.country === mappedCountry;
          return true;
        });
        
        const sortedResults = filteredResults.sort((a, b) => {
          const aNameExact = a.name.toLowerCase() === queryLower;
          const bNameExact = b.name.toLowerCase() === queryLower;
          if (aNameExact && !bNameExact) return -1;
          if (!aNameExact && bNameExact) return 1;
          
          const aIataExact = a.iata.toLowerCase() === queryLower;
          const bIataExact = b.iata.toLowerCase() === queryLower;
          if (aIataExact && !bIataExact) return -1;
          if (!aIataExact && bIataExact) return 1;
          
          const aCityExact = a.city.toLowerCase() === queryLower;
          const bCityExact = b.city.toLowerCase() === queryLower;
          if (aCityExact && !bCityExact) return -1;
          if (!aCityExact && bCityExact) return 1;

          return a.name.localeCompare(b.name);
        });
        
        setSuggestions(sortedResults.slice(0, 8));
      } catch (err) {
        console.error("Airport API error:", err);
       
        const queryLower = query.toLowerCase();
        const fallbackResults = MAJOR_AIRPORTS.filter(airport => 
          airport.name.toLowerCase().includes(queryLower) ||
          airport.iata.toLowerCase().includes(queryLower) ||
          airport.city.toLowerCase().includes(queryLower)
        );
        setSuggestions(fallbackResults.slice(0, 8));
      } finally {
        setLoading(false);
      }
    }, 400);
    
    return () => clearTimeout(t);
  }, [query]);

  
  const handleSelect = (airport: Airport) => {
    setQuery(`${airport.name} (${airport.iata})`); 
    onChange(airport.iata);                        
    setShowList(false);
  };

  return (
    <div className="form-group airport-select">
      <label>{label}</label>
      <input
        type="text"
        placeholder="Type airport name or code"
        value={query}
        onChange={(e) => {
          const t = e.target.value;
          setQuery(t);
          if (/^[A-Za-z]{3}$/.test(t.trim())) {
            onChange(t.trim().toUpperCase());
          } else {
            onChange("");
          }
          setShowList(true);
        }}
        onFocus={() => query.length > 1 && setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 150)}
        autoComplete="off"
      />

      {loading && <p className="loading">Loading...</p>}

      {showList && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((a) => (
            <li
              key={`${a.iata}-${a.name}`}
              onMouseDown={() => handleSelect(a)}
            >
              {a.name} ({a.iata}) — {a.country}
            </li>
          ))}
        </ul>
      )}

      <small>
        Selected IATA: <strong>{value || "—"}</strong>
      </small>
    </div>
  );
};

export default AirportSelect;
