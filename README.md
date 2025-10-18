# Flight Footprint Calculator

A React web application to calculate the carbon footprint of flights. Users can select departure and arrival airports, specify the number of passengers, and choose a cabin class to get an estimate of CO₂ emissions.

## Features

- **Airport Selection**: Choose from a comprehensive database of international airports
- **Passenger Count**: Specify the number of passengers (1-20)
- **Cabin Class**: Select from Economy, Premium Economy, Business, or First Class
- **CO₂ Calculation**: Get accurate CO₂ emissions per passenger and total
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time API**: Uses GoClimate API for precise calculations
- **Fallback System**: Local calculation when API is unavailable

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Modern styling with gradients
- **GoClimate API** - Carbon footprint calculations
- **AirportGap API** - Airport database

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- GoClimate API key (optional, fallback available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/francesco-cascioli/flight-footprint-calculator.git
cd flight-footprint-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your GoClimate API key to `.env`:
```
VITE_GOCLIMATE_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and visit `http://localhost:5173`

## Usage

1. **Select Airports**: Choose your departure and arrival airports from the dropdown
2. **Enter Passengers**: Specify the number of passengers (1-20)
3. **Choose Cabin Class**: Select from Economy, Premium Economy, Business, or First Class
4. **Calculate**: Click "Calculate footprint" to get your CO₂ emissions
5. **View Results**: See CO₂ per passenger and total emissions with impact level

## API Configuration

### GoClimate API
- Get your free API key from [GoClimate](https://www.goclimate.com/)
- Add it to your `.env` file as `VITE_GOCLIMATE_API_KEY`
- The app works without API key using fallback calculations

### Airport Database
- Uses AirportGap API for airport suggestions
- Includes major airports worldwide
- Local database for faster suggestions

## Project Structure

```
src/
├── components/
│   ├── AirportSelect.tsx    # Airport selection component
│   ├── PassengerInput.tsx   # Passenger count input
│   └── ResultCard.tsx       # Results display
├── pages/
│   └── Calculator.tsx        # Main calculator page
├── services/
│   └── api.ts              # API integration
├── styles/
│   └── main.css            # Global styles
└── App.tsx                 # Root component
```

## Features in Detail

### Airport Selection
- Autocomplete with search functionality
- Major airports from all continents
- IATA code display for clarity
- Real-time suggestions

### CO₂ Calculation
- Accurate emissions based on distance and cabin class
- GoClimate API integration
- Fallback calculation using Haversine formula
- Impact level indicators (Low, Medium, High, Very High)

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Touch-friendly interface
- Optimized for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [GoClimate](https://www.goclimate.com/) for carbon footprint calculations
- [AirportGap](https://airportgap.com/) for airport database
- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for the fast build tool

## Contact

Francesco Cascioli - [GitHub](https://github.com/francesco-cascioli)

Project Link: [https://github.com/francesco-cascioli/flight-footprint-calculator](https://github.com/francesco-cascioli/flight-footprint-calculator)