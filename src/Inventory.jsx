import React, { useEffect, useState } from "react";

function CarSection({ title, cars, isAdmin, deleteCar }) {
  return (
    <div style={{ marginBottom: 50 }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: 30,
          marginBottom: 25,
          color: "#e31b23",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 20,
        }}
      >
        {cars.map((car) => (
          <div
            key={car.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${car.image}`}
              alt={car.name}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <h3>
              {car.name} - {car.price}
            </h3>

            <p>
              Year: {car.year}
              <br />
              Engine: {car.engine}
              <br />
              Fuel: {car.fuel}
              <br />
              Transmission: {car.transmission}
              <br />
              Color: {car.color}
              <br />
              Mileage: {car.mileage}
              <br />
              Seats: {car.seats}
            </p>

            {isAdmin && (
              <div>
                <button
                  onClick={() => deleteCar(car.id)}
                  style={{
                    background: "#e31b23",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginTop: 10,
                  }}
                >
                  DELETE CAR
                </button>

                <button
                  onClick={() => {
                    localStorage.setItem("editCar", JSON.stringify(car));
                    window.location.href = "/admin";
                  }}
                  style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: 8,
                    cursor: "pointer",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  EDIT CAR
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Inventory() {
  const [cars, setCars] = useState([]);

  const isAdmin = window.location.pathname === "/admin-inventory";

  useEffect(() => {
    fetch("http://localhost:5000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);

  const deleteCar = async (id) => {
    const confirmDelete = window.confirm("Delete this car?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/delete-car/${id}`, {
        method: "DELETE",
      });

      const result = await res.text();
      alert(result);

      setCars(cars.filter((car) => car.id !== id));
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };

  const inStockCars = cars.filter(
    (car) => !car.location || car.location === "in_stock"
  );

  const atPortCars = cars.filter(
    (car) => car.location === "at_port"
  );

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        {isAdmin ? "ADMIN INVENTORY" : "ALL VEHICLES"}
      </h1>

      <CarSection
        title="IN STOCK"
        cars={inStockCars}
        isAdmin={isAdmin}
        deleteCar={deleteCar}
      />

      <CarSection
        title="AT THE PORT"
        cars={atPortCars}
        isAdmin={isAdmin}
        deleteCar={deleteCar}
      />
    </div>
  );
}