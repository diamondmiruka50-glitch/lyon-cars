import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Inventory() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://lyon-cars-api.onrender.com/cars")
      .then((res) => res.json())
      .then((data) =>
        setCars(
          data.map((car) => ({
            ...car,
            image: `https://lyon-cars-api.onrender.com/uploads/${car.image}`,
          }))
        )
      );
  }, []);

  const deleteCar = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `https://lyon-cars-api.onrender.com/cars/${id}`,
        {
          method: "DELETE",
        }
      );

      setCars(cars.filter((car) => car.id !== id));

      alert("Vehicle deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete vehicle");
    }
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: 40,
          fontSize: 40,
        }}
      >
        INVENTORY
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: 25,
        }}
      >
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              background: "#fff",
              borderRadius: 15,
              overflow: "hidden",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: "100%",
                height: 240,
                objectFit: "cover",
              }}
            />

            <div style={{ padding: 20 }}>
              <h2>{car.name}</h2>

              <h3 style={{ color: "#e31b23" }}>
                {car.price}
              </h3>

              <p>
                Year: {car.year}
                <br />
                Engine: {car.engine}
                <br />
                Fuel: {car.fuel}
                <br />
                Transmission: {car.transmission}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 20,
                  flexWrap: "wrap",
                }}
              >
                <Link to={`/car/${car.id}`}>
                  <button style={viewBtn}>
                    VIEW
                  </button>
                </Link>

                <Link to={`/admin?id=${car.id}`}>
                  <button style={editBtn}>
                    EDIT
                  </button>
                </Link>

                <button
                  style={deleteBtn}
                  onClick={() =>
                    deleteCar(car.id)
                  }
                >
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const viewBtn = {
  background: "#000",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "12px 20px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
};