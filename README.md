# ✈️ Flight Footprint Calculator

A React-based web app that calculates the carbon footprint of air travel using real flight data.  
This project integrates with the [GoClimate API](https://api.goclimate.com/) and [Airport Database API](https://airportgap.com/) to provide accurate CO₂ emissions calculations for flights worldwide.

Built to practice and demonstrate front-end development skills with **React**, **TypeScript**, **Axios**, and **Vite**.

🔗 [Live Demo](https://flight-footprint.netlify.app/)

---

## 🔍 Features

- 🛫 Calculate CO₂ emissions for any flight route
- 🌍 Search from 100+ international airports
- 👥 Multi-passenger calculations
- ✈️ Different cabin class options (Economy, Business, First)
- 📊 Visual impact level indicators
- 💡 Educational facts about carbon footprints
- 🔄 Fallback calculation system for reliability
- 📱 Responsive design and mobile-friendly
- 🎨 Modern gradient UI with smooth animations

---

## 🧱 Tech Stack

- **React 19** – component-based UI
- **TypeScript** – type safety and better development experience
- **Vite** – fast development and build tool
- **Axios** – API calls to GoClimate and Airport APIs
- **CSS3** – modern styling with gradients and animations
- **Environment Variables** – secure API key management

---

## 📁 Project Structure

src/
├── components/        # Reusable UI components
│   ├── AirportSelect.tsx
│   └── ResultCard.tsx
├── pages/             # Main application views
│   └── Calculator.tsx
├── services/          # API integration
│   └── api.ts
├── styles/            # Global CSS styling
│   └── main.css
├── App.tsx            # Main application component
└── main.tsx           # Entry point

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- GoClimate API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/francesco-cascioli/flight-footprint-calculator.git
   cd flight-footprint-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your GoClimate API key to `.env`:
   ```
   VITE_GOCLIMATE_API_KEY=your_api_key_here
   VITE_API_TIMEOUT=10000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔧 API Integration

### GoClimate API
- **Endpoint**: `https://api.goclimate.com/v1/flight_footprint`
- **Purpose**: Calculate CO₂ emissions for flights
- **Fallback**: Local calculation using Haversine formula

### Airport Database API
- **Endpoint**: `https://airportgap.com/api/airports`
- **Purpose**: Search and autocomplete airport codes
- **Fallback**: Local database of major airports

---

## 🌍 Supported Airports

The app includes a comprehensive database of international airports:

- **🇮🇹 Italy**: Rome, Milan, Venice, Naples, Florence, Perugia
- **Europe**: London, Paris, Madrid, Barcelona, Frankfurt, Berlin, Amsterdam, Athens, Istanbul
- **🇺🇸 USA**: New York, Los Angeles, Chicago, Miami, San Francisco
- **Asia**: Tokyo, Dubai, Singapore, Hong Kong, Seoul, Shanghai, Bangkok
- **🇦🇺 Australia**: Sydney, Melbourne, Brisbane, Perth
- **South America**: São Paulo, Rio de Janeiro, Buenos Aires, Lima
- **Africa**: Johannesburg, Cape Town, Nairobi
- **🇷🇺 Russia**: Moscow, Saint Petersburg

---

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation
- **Visual Feedback**: Loading states, error handling, and success animations
- **Impact Indicators**: Color-coded CO₂ impact levels (Low, Medium, High, Very High)

---

## 🤔 Why this project?

This app was developed to apply React and TypeScript fundamentals while building something meaningful for the environment.
I've focused on:

- **Real-world API integration** with proper error handling
- **Type safety** with TypeScript throughout
- **User experience** with smooth animations and responsive design
- **Environmental awareness** with educational content
- **Reliability** with fallback calculation systems
- **Professional code structure** with clean, maintainable components

---

## 🔮 Future Enhancements

- [ ] Carbon offset recommendations
- [ ] Flight comparison tool
- [ ] Historical emissions tracking
- [ ] Multi-language support
- [ ] Export results to PDF
- [ ] Social sharing features

---

## 👤 Author

Francesco Cascioli – Front-end developer in training  
📍 Umbria, Italy  
📫 [GitHub](https://github.com/francesco-cascioli)

---

## 📄 License

This project is for educational purposes only.  
All carbon footprint calculations are provided by GoClimate API.

---

## 🌱 Environmental Impact

This calculator helps users understand the environmental impact of their travel choices, promoting awareness and encouraging more sustainable transportation decisions.
