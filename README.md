# Flight Footprint Calculator

A simple web app to check how much CO₂ your flight produces. Just pick your airports, add passengers, and see the results.

## What it does

- Pick any airport in the world
- Add how many people are flying
- Choose your seat class
- Get the CO₂ numbers

## How to use it

1. **Pick airports** - Start and destination
2. **Add passengers** - How many people
3. **Pick seat class** - Economy, Business, etc.
4. **Click calculate** - See your CO₂ numbers

## Tech stuff

- React + TypeScript
- Vite for building
- GoClimate API for real data
- Works on phone and computer

## Setup

1. Download the code
2. Run `npm install`
3. Run `npm run dev`
4. Open your browser

## API key

You can add a GoClimate API key in the `.env` file, but it works without it too.

## Files

- `src/components/` - The UI parts
- `src/pages/Calculator.tsx` - Main page
- `src/services/api.ts` - API calls
- `src/styles/main.css` - Styling

## Contact

Made by Francesco Cascioli