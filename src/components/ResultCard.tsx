import React from "react";

interface ResultCardProps {
  perPassenger: number;
  total: number;
  passengers: number;
  cabinClass: string;
  origin: string;
  destination: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ 
  perPassenger, 
  total, 
  passengers, 
  cabinClass, 
  origin, 
  destination 
}) => {
  const getCabinClassLabel = (cabin: string) => {
    switch (cabin) {
      case "economy": return "Economy";
      case "premium_economy": return "Premium Economy";
      case "business": return "Business";
      case "first": return "First Class";
      default: return cabin;
    }
  };

  const getImpactLevel = (co2: number) => {
    if (co2 < 0.5) return { level: "Low", color: "#27ae60", emoji: "🟢", className: "impact-low" };
    if (co2 < 1.5) return { level: "Medium", color: "#f39c12", emoji: "🟡", className: "impact-medium" };
    if (co2 < 3.0) return { level: "High", color: "#e67e22", emoji: "🟠", className: "impact-high" };
    return { level: "Very High", color: "#e74c3c", emoji: "🔴", className: "impact-very-high" };
  };

  const impact = getImpactLevel(perPassenger);

  return (
    <div className="result-card">
      <h3>✈️ Flight Carbon Footprint Results</h3>
      
      <div className="result-info">
        <p><strong>Route:</strong> {origin} → {destination}</p>
        <p><strong>Cabin Class:</strong> {getCabinClassLabel(cabinClass)}</p>
        <p><strong>Passengers:</strong> {passengers}</p>
      </div>

      <div className={`impact-card ${impact.className}`}>
        <p className="impact-title">
          <strong>{impact.emoji} Impact Level: {impact.level}</strong>
        </p>
        <p><strong>CO₂ per passenger:</strong> {perPassenger.toFixed(2)} kg</p>
        <p><strong>Total CO₂ ({passengers} passengers):</strong> {total.toFixed(2)} kg</p>
      </div>

      <div className="fun-fact">
        <p><strong>💡 Did you know?</strong></p>
        <p>
          The average person's annual carbon footprint is about 4-5 tons of CO₂. 
          This flight represents approximately {((perPassenger / 4000) * 100).toFixed(1)}% 
          of an average annual footprint.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
