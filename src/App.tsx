import "./styles/main.css";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <>
      
      <div className="container">
        <h1>Flight Footprint Calculator</h1>
        <p>Estimate your flight's CO₂ emissions</p>
        <Calculator />
        <footer>© {new Date().getFullYear()} – Final Project, Start2Impact</footer>
      </div>
    </>
  );
}

export default App;
