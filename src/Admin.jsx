import React, { useEffect, useState } from "react";

export default function Admin() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    year: "",
    engine: "",
    fuel: "",
    transmission: "",
    color: "",
    mileage: "",
    seats: "",
    location: "",
  });

  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const editCar = JSON.parse(localStorage.getItem("editCar"));

    if (editCar) {
      setFormData({
        name: editCar.name || "",
        price: editCar.price || "",
        year: editCar.year || "",
        engine: editCar.engine || "",
        fuel: editCar.fuel || "",
        transmission: editCar.transmission || "",
        color: editCar.color || "",
        mileage: editCar.mileage || "",
        seats: editCar.seats || "",
        location: editCar.location || "",
      });

      setEditingId(editCar.id);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitCar = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (editingId) {
        response = await fetch(
          `https://lyon-cars-api.onrender.com/update-car/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
        });

        for (let i = 0; i < images.length; i++) {
          data.append("image", images[i]);
        }

        response = await fetch("https://lyon-cars-api.onrender.com/add-car", {
          method: "POST",
          body: data,
        });
      }

      const result = await response.text();
      alert(result);

      localStorage.removeItem("editCar");

      setFormData({
        name: "",
        price: "",
        year: "",
        engine: "",
        fuel: "",
        transmission: "",
        color: "",
        mileage: "",
        seats: "",
        location: "",
      });

      setImages([]);
      setEditingId(null);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 25,
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {editingId ? "EDIT VEHICLE" : "LYON CARS ADMIN"}
      </h1>

      <form
        onSubmit={submitCar}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <input
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          name="engine"
          placeholder="Engine"
          value={formData.engine}
          onChange={handleChange}
        />

        <input
          name="fuel"
          placeholder="Fuel"
          value={formData.fuel}
          onChange={handleChange}
        />

        <input
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
        />

        <input
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        <input
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
        />

        <input
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
        />

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Select Vehicle Location</option>
          <option value="in_stock">In Stock</option>
          <option value="at_port">At The Port</option>
        </select>

        {!editingId && (
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
          />
        )}

        <button
          type="submit"
          style={{
            padding: 16,
            background: "#000",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          {editingId ? "UPDATE CAR" : "ADD CAR"}
        </button>
      </form>
    </div>
  );
}