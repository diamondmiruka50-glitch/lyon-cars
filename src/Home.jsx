import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function CarSection({ title, carList }) {
  const sectionBg = title === "AT THE PORT" ? "#eef5ff" : "#ffffff";

  return (
    <section
      style={{
        padding: "20px 35px 35px",
        marginTop: "-40px",
        background: sectionBg,
      }}
    >
      <h2
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
          background: "linear-gradient(90deg,#e31b23,#ff9800)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {carList.map((car, i) => (
          <Link
            to={`/car/${car.id || i + 1}`}
            key={i}
            style={{ textDecoration: "none", color: "inherit" }}
          >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 15,
              background: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: "100%",
                height: 220,
                maxHeight: "50vw",
                objectFit: "cover",
                borderRadius: 10,
              }}
            />

            <h3>
              {car.name} - {car.price}
            </h3>

            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              Year: {car.year}
              <br />
              Engine: {car.engine}
              <br />
              Fuel Type: {car.fuel}
              <br />
              Transmission: {car.transmission}
              <br />
              Color: {car.color}
              <br />
              Mileage: {car.mileage}
              <br />
              Seating Capacity: {car.seats}
            </p>
          </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ButtonSection({ enquiry = false }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 25,
        paddingBottom: 35,
      }}
    >
      <Link to="/inventory" style={{ textDecoration: "none" }}>
        <button style={viewBtn}>VIEW ALL</button>
      </Link>

      <a href="https://wa.me/254799117367?text=Hello%20LYON%20CARS%2C%20I%20am%20interested%20in%20your%20vehicles" target="_blank" rel="noreferrer">
        <button style={bookBtn}>
          {enquiry ? "MAKE ENQUIRY" : "BOOK TEST DRIVE"}
        </button>
      </a>
    </div>
  );
}

export default function App() {
  const [cars, setCars] = useState([]);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");

  const makes = [...new Set(cars.map((car) => car.name?.split(" ")[0]).filter(Boolean))];

  const years = Array.from({ length: 27 }, (_, i) => 2000 + i);

  const models = [...new Set(
    cars
      .filter((car) => !selectedMake || car.name?.split(" ")[0] === selectedMake)
      .map((car) => car.name?.split(" ").slice(1).join(" "))
      .filter(Boolean)
  )];

  const filteredCars = cars.filter((car) => {
    const make = car.name?.split(" ")[0];
    const model = car.name?.split(" ").slice(1).join(" ");

    return (
      (!selectedMake || make === selectedMake) &&
      (!selectedModel || model === selectedModel) &&
      (!yearMin || Number(car.year) >= Number(yearMin)) &&
      (!yearMax || Number(car.year) <= Number(yearMax))
    );
  });

  const inStockCars = filteredCars.filter(
    (car) => !car.location || car.location === "in_stock"
  );

  const atPortCars = filteredCars.filter(
    (car) => car.location === "at_port"
  );

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

  return (
    <div
      style={{
        fontFamily: "Arial,sans-serif",
        background: "#fff",
        scrollBehavior: "smooth",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <nav style={navStyle}>
        <div style={logoContainer}>
          <a href="/inventory" style={{ textDecoration: "none" }}>
            <h1 style={logoStyle}>
              <span style={{ color: "#e31b23" }}>LYON</span> CARS
            </h1>
          </a>
        </div>

        <div style={menuWrapper}>
          <div style={menuStyle}>
            <a href="#in-stock" style={linkStyle}>In Stock</a>
            <a href="#at-port" style={linkStyle}>At The Port & On Ship</a>
            <a href="#why-choose-us" style={linkStyle}>Why Choose Us</a>
            <a href="#contact-us" style={linkStyle}>Contact Us</a>
          </div>
        </div>

        <div style={socialContainer}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/facebook-new.png"
              alt="Facebook"
              style={socialIcon}
            />
          </a>

          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/instagram-new.png"
              alt="Instagram"
              style={socialIcon}
            />
          </a>

          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            <img
              src="https://img.icons8.com/color/48/tiktok--v1.png"
              alt="TikTok"
              style={socialIcon}
            />
          </a>
        </div>
      </nav>

      <section style={heroStyle}>
        <h2 style={{ fontSize: "clamp(32px, 7vw, 60px)", fontWeight: "bold" }}>
          FIND YOUR <span style={{ color: "red" }}>DREAM</span> CAR TODAY.
        </h2>

        <div style={searchContainer}>
          <select
            style={inputStyle}
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">All Makes</option>
            {makes.map((make, index) => (
              <option key={index}>{make}</option>
            ))}
          </select>
          <select
            style={inputStyle}
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="">All Models</option>
            {models.map((model, index) => (
              <option key={index}>{model}</option>
            ))}
          </select>
          <select
            style={inputStyle}
            value={yearMin}
            onChange={(e) => setYearMin(e.target.value)}
          >
            <option value="">Year Min</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            style={inputStyle}
            value={yearMax}
            onChange={(e) => setYearMax(e.target.value)}
          >
            <option value="">Year Max</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <button style={searchBtn}>SEARCH</button>
        </div>
      </section>

      <div id="in-stock">
        <CarSection title="IN STOCK" carList={inStockCars.slice(0, 6)} />
      </div>
      <ButtonSection />

      <div id="at-port">
        <CarSection title="AT THE PORT" carList={atPortCars.slice(0, 6)} />
      </div>
      <ButtonSection enquiry={true} />

      <section id="why-choose-us" style={whySection}>
        <h2 style={{ fontSize: 32 }}>WHY CHOOSE US</h2>

        <div style={whyGrid}>
          <div style={whyCard}>
            <h3>Customer Satisfaction</h3>
            <p>Quality vehicles and excellent customer support.</p>
          </div>

          <div style={whyCard}>
            <h3>Reliability</h3>
            <p>All vehicles are professionally inspected.</p>
          </div>

          <div style={whyCard}>
            <h3>Variety of Brands</h3>
            <p>Choose from top international vehicle brands.</p>
          </div>
        </div>
      </section>

      <section id="contact-us" style={{ padding: "70px 35px", background: "#fff" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, color: "#e31b23" }}>
          CONTACT US
        </h2>

        <div style={contactGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <a href="mailto:lyonmotors@gmail.com"><button style={contactBtn}>📧 E-MAIL</button></a>
            <a href="tel:+254799117367"><button style={contactBtn}>📞 CALL US</button></a>
            <a href="https://wa.me/254799117367?text=Hello%20LYON%20CARS%2C%20I%20am%20interested%20in%20your%20vehicles"><button style={contactBtn}>💬 WHATSAPP</button></a>
          </div>

          <form style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <input type="text" placeholder="Enter your name" style={formInput} />
            <input type="email" placeholder="Enter your email" style={formInput} />
            <input type="tel" placeholder="Enter your phone number" style={formInput} />
            <input type="text" placeholder="Subject" style={formInput} />
            <textarea rows="6" placeholder="Write your message here..." style={formInput}></textarea>
            <button type="submit" style={submitBtn}>SUBMIT</button>
          </form>
        </div>
      </section>

      <footer style={footerStyle}>
        <h3 style={{ color: "#e31b23", fontSize: 26 }}>Visit Our Showroom</h3>
        <p>Along Kiambu Road</p>
        <p>
          <strong>Opening Hours:</strong><br />
          Mon-Sat 8.00am-6.00pm<br />
          Sun & Public Holidays 11.30am-5.00pm
        </p>
        <h2>LYON MOTORS</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 25, fontSize: 30 }}>
          <img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram" style={{ width: 34, height: 34 }} />
          <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={{ width: 34, height: 34 }} />
          <img src="https://img.icons8.com/color/48/tiktok--v1.png" alt="TikTok" style={{ width: 34, height: 34 }} />
        </div>
        <p>📧 lyonmotors@gmail.com</p>
      </footer>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: "600",
  whiteSpace: "nowrap",
};

const navStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
  background: "#000",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 20,
  padding: "15px 20px",
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  margin: 0,
  fontSize: "clamp(24px, 5vw, 38px)",
  fontWeight: "bold",
  color: "white",
  letterSpacing: 1,
};

const menuWrapper = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
};

const menuStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: 20,
  rowGap: 12,
};

const socialContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  flexWrap: "wrap",
};

const socialIcon = {
  width: 30,
  height: 30,
  objectFit: "contain",
};



const heroStyle = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "80px 30px",
  color: "white",
  textAlign: "center",
};

const searchContainer = {
  flexWrap: "wrap",
  background: "rgba(0,0,0,0.75)",
  padding: 25,
  borderRadius: 18,
  display: "flex",
  gap: 15,
  justifyContent: "center",
  flexWrap: "wrap",
};

const inputStyle = {
  width: "220px",
  maxWidth: "100%",
  padding: "14px 18px",
  borderRadius: 8,
  fontSize: 16,
};

const searchBtn = {
  background: "#e31b23",
  color: "white",
  border: "none",
  padding: "14px 35px",
  borderRadius: 8,
};

const viewBtn = {
  background: "black",
  color: "white",
  padding: "18px 40px",
  borderRadius: 10,
  border: "none",
};

const bookBtn = {
  background: "#2db742",
  color: "white",
  padding: "18px 40px",
  borderRadius: 10,
  border: "none",
};

const whySection = {
  padding: "60px 35px",
  background: "#0f172a",
  color: "white",
  textAlign: "center",
};

const whyGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 25,
  maxWidth: 1200,
  margin: "auto",
};

const whyCard = {
  background: "#1e293b",
  padding: 25,
  borderRadius: 12,
};

const contactGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: 40,
  maxWidth: 1100,
  margin: "auto",
};

const formInput = {
  padding: "16px",
  borderRadius: 8,
  border: "1px solid #ccc",
};

const submitBtn = {
  background: "#e31b23",
  color: "white",
  border: "none",
  padding: "16px",
  borderRadius: 8,
};

const contactBtn = {
  background: "#0f172a",
  color: "white",
  border: "none",
  padding: "18px",
  borderRadius: 8,
  fontWeight: "bold",
};

const footerStyle = {
  background: "#000",
  color: "white",
  textAlign: "center",
  padding: "50px 20px",
  marginTop: 40,
};