import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`https://lyon-cars-api.onrender.com/car/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!car) {
    return <h2 style={{ textAlign: "center" }}>Loading vehicle...</h2>;
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      <h1>{car.name}</h1>
      <h2 style={{ color: "#e31b23" }}>{car.price}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {car.images && car.images.length > 0 ? (
          car.images.map((img, index) => (
            <img
              key={index}
              src={`https://lyon-cars-api.onrender.com/uploads/${img}`}
              alt={`car-${index}`}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          ))
        ) : (
          <p>No gallery images found</p>
        )}
      </div>

      <div style={{ marginTop: "35px", lineHeight: 2, fontSize: 18 }}>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Engine:</strong> {car.engine}</p>
        <p><strong>Fuel:</strong> {car.fuel}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Seats:</strong> {car.seats}</p>
      </div>

      <a
        href="https://wa.me/254799117367"
        target="_blank"
        rel="noreferrer"
      >
        <button
          style={{
            marginTop: 20,
            background: "#25D366",
            color: "white",
            border: "none",
            padding: "18px 35px",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          MAKE ENQUIRY ON WHATSAPP
        </button>
      </a>
    </div>
  );
}