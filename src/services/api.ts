import axios from "axios";

const API_BASE_URL = "https://api.goclimate.com/v1";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

const calculateFallbackFootprint = (origin: string, destination: string, cabinClass: string): number => {
  console.log("🔄 Using fallback calculation...");
  
  const airportData: { [key: string]: { lat: number; lon: number; name: string } } = {
    'FCO': { lat: 41.8003, lon: 12.2389, name: 'Rome Fiumicino' },
    'MXP': { lat: 45.6306, lon: 8.7281, name: 'Milan Malpensa' },
    'LIN': { lat: 45.4451, lon: 9.2767, name: 'Milan Linate' },
    'VCE': { lat: 45.5053, lon: 12.3519, name: 'Venice Marco Polo' },
    'NAP': { lat: 40.8860, lon: 14.2908, name: 'Naples International' },
    'BLQ': { lat: 44.5354, lon: 11.2887, name: 'Bologna Guglielmo Marconi' },
    'FLR': { lat: 43.8100, lon: 11.2051, name: 'Florence Airport' },
    'TRN': { lat: 45.2008, lon: 7.6496, name: 'Turin Airport' },
    'PMO': { lat: 38.1759, lon: 13.0912, name: 'Palermo Airport' },
    'CTA': { lat: 37.4668, lon: 15.0664, name: 'Catania Fontanarossa' },
    'PEG': { lat: 43.0959, lon: 12.5132, name: 'Perugia San Francesco d\'Assisi' },
    'LHR': { lat: 51.4700, lon: -0.4543, name: 'London Heathrow' },
    'LGW': { lat: 51.1481, lon: -0.1903, name: 'London Gatwick' },
    'CDG': { lat: 49.0097, lon: 2.5479, name: 'Paris Charles de Gaulle' },
    'ORY': { lat: 48.7233, lon: 2.3794, name: 'Paris Orly' },
    'FRA': { lat: 50.0379, lon: 8.5622, name: 'Frankfurt Airport' },
    'MUC': { lat: 48.3538, lon: 11.7861, name: 'Munich Airport' },
    'AMS': { lat: 52.3105, lon: 4.7683, name: 'Amsterdam Schiphol' },
    'MAD': { lat: 40.4839, lon: -3.5680, name: 'Madrid Barajas' },
    'BCN': { lat: 41.2974, lon: 2.0833, name: 'Barcelona Airport' },
    'ZUR': { lat: 47.4647, lon: 8.5492, name: 'Zurich Airport' },
    'VIE': { lat: 48.1103, lon: 16.5697, name: 'Vienna International' },
    'BRU': { lat: 50.9014, lon: 4.4844, name: 'Brussels Airport' },
    'JFK': { lat: 40.6413, lon: -73.7781, name: 'New York JFK' },
    'LAX': { lat: 33.9416, lon: -118.4085, name: 'Los Angeles International' },
    'YYZ': { lat: 43.6777, lon: -79.6246, name: 'Toronto Pearson' },
    'YVR': { lat: 49.1967, lon: -123.1815, name: 'Vancouver International' },
    // Asia
    'HND': { lat: 35.5494, lon: 139.7798, name: 'Tokyo Haneda' },
    'NRT': { lat: 35.7720, lon: 140.3928, name: 'Tokyo Narita' },
    'IST': { lat: 41.2753, lon: 28.7519, name: 'Istanbul Airport' },
    'SAW': { lat: 40.8986, lon: 29.3092, name: 'Istanbul Sabiha Gökçen' },
    'DXB': { lat: 25.2532, lon: 55.3657, name: 'Dubai International' },
    'SIN': { lat: 1.3644, lon: 103.9915, name: 'Singapore Changi' },
    'HKG': { lat: 22.3080, lon: 113.9185, name: 'Hong Kong International' },
    'ICN': { lat: 37.4602, lon: 126.4407, name: 'Seoul Incheon' },
    'BKK': { lat: 13.6900, lon: 100.7501, name: 'Bangkok Suvarnabhumi' },
    'PEK': { lat: 40.0799, lon: 116.6031, name: 'Beijing Capital' },
    'PVG': { lat: 31.1434, lon: 121.8052, name: 'Shanghai Pudong' },
    // Australia
    'SYD': { lat: -33.9399, lon: 151.1753, name: 'Sydney Kingsford Smith' },
    'MEL': { lat: -37.6733, lon: 144.8433, name: 'Melbourne Airport' },
    'BNE': { lat: -27.3842, lon: 153.1175, name: 'Brisbane Airport' },
    'PER': { lat: -31.9403, lon: 115.9669, name: 'Perth Airport' },
    // Brasile
    'GRU': { lat: -23.4356, lon: -46.4731, name: 'São Paulo Guarulhos' },
    'GIG': { lat: -22.8089, lon: -43.2500, name: 'Rio de Janeiro Galeão' },
    'BSB': { lat: -15.8692, lon: -47.9206, name: 'Brasília International' },
    // Argentina
    'EZE': { lat: -34.8222, lon: -58.5358, name: 'Buenos Aires Ezeiza' },
    'AEP': { lat: -34.5592, lon: -58.4156, name: 'Buenos Aires Jorge Newbery' },
    // Perù
    'LIM': { lat: -12.0219, lon: -77.1143, name: 'Lima Jorge Chávez' },
    // USA aggiuntivi
    'ORD': { lat: 41.9786, lon: -87.9048, name: 'Chicago O\'Hare' },
    'MIA': { lat: 25.7959, lon: -80.2870, name: 'Miami International' },
    'SFO': { lat: 37.6213, lon: -122.3790, name: 'San Francisco International' },
    'SEA': { lat: 47.4502, lon: -122.3088, name: 'Seattle-Tacoma' },
    'DFW': { lat: 32.8968, lon: -97.0380, name: 'Dallas/Fort Worth' },
    // Sudafrica
    'JNB': { lat: -26.1337, lon: 28.2423, name: 'Johannesburg OR Tambo' },
    'CPT': { lat: -33.9648, lon: 18.6017, name: 'Cape Town International' },
    // Kenya
    'NBO': { lat: -1.3192, lon: 36.9278, name: 'Nairobi Jomo Kenyatta' },
    // Russia
    'SVO': { lat: 55.9726, lon: 37.4146, name: 'Moscow Sheremetyevo' },
    'DME': { lat: 55.4148, lon: 37.9060, name: 'Moscow Domodedovo' },
    'LED': { lat: 59.8003, lon: 30.2625, name: 'Saint Petersburg Pulkovo' },
    // Grecia
    'ATH': { lat: 37.9364, lon: 23.9445, name: 'Athens International' },
    'SKG': { lat: 40.5197, lon: 22.9709, name: 'Thessaloniki Airport' },
    // Germania aggiuntivi
    'BER': { lat: 52.3519, lon: 13.4938, name: 'Berlin Brandenburg' },
    'HAM': { lat: 53.6304, lon: 9.9882, name: 'Hamburg Airport' },
    'CGN': { lat: 50.8659, lon: 7.1427, name: 'Cologne Bonn' },
    'DUS': { lat: 51.2895, lon: 6.7668, name: 'Düsseldorf Airport' }
  };

  const originData = airportData[origin.toUpperCase()];
  const destData = airportData[destination.toUpperCase()];

  if (!originData || !destData) {
    // Se non abbiamo dati per questi aeroporti, usa un valore medio
    return 0.5; // kg CO2 per passeggero
  }

  // Calcola la distanza approssimativa usando la formula di Haversine
  const R = 6371; // Raggio della Terra in km
  const dLat = (destData.lat - originData.lat) * Math.PI / 180;
  const dLon = (destData.lon - originData.lon) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(originData.lat * Math.PI / 180) * Math.cos(destData.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  let baseFootprint = distance * 0.2;

  const cabinMultipliers: { [key: string]: number } = {
    'economy': 1.0,
    'premium_economy': 1.2,
    'business': 1.5,
    'first': 2.0
  };

  const multiplier = cabinMultipliers[cabinClass] || 1.0;
  const finalFootprint = baseFootprint * multiplier;

  console.log(`📊 Fallback calculation: ${distance.toFixed(0)}km distance, ${finalFootprint.toFixed(2)}kg CO2`);
  
  return Math.max(0.1, finalFootprint);
};

const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_GOCLIMATE_API_KEY;
  if (!apiKey || apiKey === "your_api_key_here") {
    throw new Error(
      "API key not configured. Please add VITE_GOCLIMATE_API_KEY to your .env file. " +
      "Get your API key from: https://www.goclimate.com/"
    );
  }
  return apiKey;
};

export const getFlightFootprint = async (origin: string, destination: string, cabinClass: string = "economy"): Promise<number> => {
  try {
    if (!origin || !destination) {
      throw new Error("Origin and destination are required");
    }

    if (origin.length !== 3 || destination.length !== 3) {
      throw new Error("Airport codes must be 3 characters long");
    }

    const apiKey = getApiKey();

    console.log("🌍 Making API request to GoClimate...");
    console.log("📍 Origin:", origin, "Destination:", destination);
    console.log("🔑 API Key:", apiKey.substring(0, 8) + "...");

    let response;
    try {
      response = await axios.post(
        `${API_BASE_URL}/flight_footprint`,
        {
          segments: [{ origin: origin.toUpperCase(), destination: destination.toUpperCase() }],
          cabin_class: cabinClass
        },
        {
          auth: {
            username: apiKey,
            password: ""
          },
          timeout: API_TIMEOUT,
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Flight-Footprint-App/1.0'
          }
        }
      );
    } catch (firstError) {
      console.log("🔄 First endpoint failed, trying alternative...");
      
      try {
        response = await axios.post(
          `${API_BASE_URL}/flights`,
          {
            segments: [{ origin: origin.toUpperCase(), destination: destination.toUpperCase() }],
            cabin_class: cabinClass
          },
          {
            auth: {
              username: apiKey,
              password: ""
            },
            timeout: API_TIMEOUT,
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Flight-Footprint-App/1.0'
            }
          }
        );
      } catch (secondError) {
        throw firstError;
      }
    }

    console.log("✅ API Response:", response.data);

    // Validazione risposta
    if (!response.data || typeof response.data.footprint_kg !== 'number') {
      throw new Error("Invalid response from API");
    }

    if (response.data.footprint_kg < 0) {
      throw new Error("Invalid footprint value received from API");
    }

    return response.data.footprint_kg;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Invalid API key. Please check your VITE_GOCLIMATE_API_KEY in .env file");
      } else if (error.response?.status === 400) {
        throw new Error("Invalid airport codes or request parameters");
      } else if (error.response?.status === 404) {
        console.log("⚠️ API endpoint not found, using fallback calculation...");
        return calculateFallbackFootprint(origin, destination, cabinClass);
      } else if (error.response?.status === 429) {
        throw new Error("API rate limit exceeded. Please try again later");
      } else if (error.code === 'ECONNABORTED') {
        throw new Error("Request timeout. Please check your internet connection");
      } else if (error.response && error.response.status >= 500) {
        throw new Error("Server error. Please try again later");
      }
    }
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("An unexpected error occurred while calculating flight footprint");
  }
};
