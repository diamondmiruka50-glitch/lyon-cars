import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CarSection({ title, carList, isMobile }) {
  const sectionBg = title === "AT THE PORT" ? "#eef5ff" : "#ffffff";

  return (
    <section
      style={{
        padding: isMobile ? "20px 15px 35px" : "30px 40px 50px",
        background: sectionBg,
      }}
    >
      <h2
        style={{
          fontSize: isMobile ? 28 : 38,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 30,
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
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 25,
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
                borderRadius: 18,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <img
                src={car.image}
                alt={car.name}
                style={{
                  width: "100%",
                  height: isMobile ? 240 : 260,
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: 20 }}>
                <h3
                  style={{
                    fontSize: 22,
                    marginBottom: 10,
                    color: "#111",
                  }}
                >
                  {car.name}
                </h3>

                <h4
                  style={{
                    color: "#e31b23",
                    fontSize: 22,
                    marginBottom: 15,
                  }}
                >
                  {car.price}
                </h4>

                <p style={{ lineHeight: 1.8, color: "#444" }}>
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
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ButtonSection({ enquiry = false, isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 20,
        flexWrap: "wrap",
        padding: "10px 20px 40px",
      }}
    >
      <Link to="/inventory" style={{ textDecoration: "none" }}>
        <button
          style={{
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: isMobile ? "15px 28px" : "18px 40px",
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          VIEW ALL
        </button>
      </Link>

      <a
        href="https://wa.me/254799117367?text=Hello%20LYON%20CARS%2C%20I%20am%20interested%20in%20your%20vehicles"
        target="_blank"
        rel="noreferrer"
      >
        <button
          style={{
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: isMobile ? "15px 28px" : "18px 40px",
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {enquiry ? "MAKE ENQUIRY" : "BOOK TEST DRIVE"}
        </button>
      </a>
    </div>
  );
}

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const makes = [
    ...new Set(
      cars.map((car) => car.name?.split(" ")[0]).filter(Boolean)
    ),
  ];

  const years = Array.from({ length: 27 }, (_, i) => 2000 + i);

  const models = [
    ...new Set(
      cars
        .filter(
          (car) =>
            !selectedMake ||
            car.name?.split(" ")[0] === selectedMake
        )
        .map((car) =>
          car.name?.split(" ").slice(1).join(" ")
        )
        .filter(Boolean)
    ),
  ];

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

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* NAVBAR */}

      <nav
        style={{
          background: "#000",
          padding: isMobile ? "20px" : "18px 50px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 20 : 0,
        }}
      >
        <Link
          to="/inventory"
          style={{ textDecoration: "none" }}
        >
          <h1
            style={{
              fontSize: isMobile ? 44 : 48,
              lineHeight: 1,
              margin: 0,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <span style={{ color: "#e31b23" }}>LYON</span>{" "}
            <span style={{ color: "#fff" }}>CARS</span>
          </h1>
        </Link>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 18 : 35,
            alignItems: "center",
          }}
        >
          <a href="#in-stock" style={navLink}>
            In Stock
          </a>

          <a href="#at-port" style={navLink}>
            At The Port & On Ship
          </a>

          <a href="#why-choose-us" style={navLink}>
            Why Choose Us
          </a>

          <a href="#contact-us" style={navLink}>
            Contact Us
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: 15,
            alignItems: "center",
          }}
        >
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="facebook"
            style={socialIcon}
          />

          <img
            src="https://img.icons8.com/color/48/instagram-new.png"
            alt="instagram"
            style={socialIcon}
          />

          <img
            src="https://img.icons8.com/color/48/tiktok--v1.png"
            alt="tiktok"
            style={socialIcon}
          />
        </div>
      </nav>

      {/* HERO SECTION */}

      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile
            ? "70px 20px 80px"
            : "110px 50px 140px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: isMobile
              ? "54px"
              : "clamp(48px,5vw,78px)",
            fontWeight: "bold",
            lineHeight: 1.1,
            whiteSpace: isMobile ? "normal" : "nowrap",
            marginBottom: 50,
          }}
        >
          FIND YOUR{" "}
          <span style={{ color: "red" }}>DREAM</span>{" "}
          CAR TODAY.
        </h2>

        <div
          style={{
            background: "rgba(0,0,0,0.7)",
            padding: isMobile ? 20 : 30,
            borderRadius: 18,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 18,
            justifyContent: "center",
            alignItems: "center",
            maxWidth: 1300,
            margin: "0 auto",
          }}
        >
          <select
            style={inputStyle}
            value={selectedMake}
            onChange={(e) =>
              setSelectedMake(e.target.value)
            }
          >
            <option value="">All Makes</option>

            {makes.map((make, index) => (
              <option key={index}>{make}</option>
            ))}
          </select>

          <select
            style={inputStyle}
            value={selectedModel}
            onChange={(e) =>
              setSelectedModel(e.target.value)
            }
          >
            <option value="">All Models</option>

            {models.map((model, index) => (
              <option key={index}>{model}</option>
            ))}
          </select>

          <select
            style={inputStyle}
            value={yearMin}
            onChange={(e) =>
              setYearMin(e.target.value)
            }
          >
            <option value="">Year Min</option>

            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          <select
            style={inputStyle}
            value={yearMax}
            onChange={(e) =>
              setYearMax(e.target.value)
            }
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
        <CarSection
          title="IN STOCK"
          carList={inStockCars.slice(0, 6)}
          isMobile={isMobile}
        />
      </div>

      <ButtonSection isMobile={isMobile} />

      <div id="at-port">
        <CarSection
          title="AT THE PORT"
          carList={atPortCars.slice(0, 6)}
          isMobile={isMobile}
        />
      </div>

      <ButtonSection enquiry={true} isMobile={isMobile} />

      {/* WHY US */}

      <section
        id="why-choose-us"
        style={{
          background: "#0f172a",
          color: "#fff",
          padding: isMobile
            ? "60px 20px"
            : "80px 50px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 34 : 42,
            marginBottom: 40,
          }}
        >
          WHY CHOOSE US
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(3,1fr)",
            gap: 25,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div style={whyCard}>
            <h3>Customer Satisfaction</h3>
            <p>
              Quality vehicles and excellent customer
              support.
            </p>
          </div>

          <div style={whyCard}>
            <h3>Reliability</h3>
            <p>
              All vehicles are professionally inspected.
            </p>
          </div>

          <div style={whyCard}>
            <h3>Variety of Brands</h3>
            <p>
              Choose from top international vehicle
              brands.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact-us"
        style={{
          padding: isMobile
            ? "60px 20px"
            : "80px 50px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#e31b23",
            fontSize: isMobile ? 34 : 42,
            marginBottom: 40,
          }}
        >
          CONTACT US
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "1fr 1fr",
            gap: 40,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <button style={contactBtn}>
              📧 E-MAIL
            </button>

            <button style={contactBtn}>
              📞 CALL US
            </button>

            <button style={contactBtn}>
              💬 WHATSAPP
            </button>
          </div>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <input
              type="text"
              placeholder="Enter your name"
              style={formInput}
            />

            <input
              type="email"
              placeholder="Enter your email"
              style={formInput}
            />

            <input
              type="tel"
              placeholder="Enter your phone number"
              style={formInput}
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              style={formInput}
            ></textarea>

            <button style={submitBtn}>
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}

      <footer
        style={{
          background: "#000",
          color: "#fff",
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h2 style={{ color: "#e31b23" }}>
          LYON MOTORS
        </h2>

        <p>Along Kiambu Road</p>

        <p>
          Mon-Sat 8.00am-6.00pm
          <br />
          Sun & Public Holidays 11.30am-5.00pm
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 15,
            margin: "20px 0",
          }}
        >
          <img
            src="https://img.icons8.com/color/48/facebook-new.png"
            alt="facebook"
            style={socialIcon}
          />

          <img
            src="https://img.icons8.com/color/48/instagram-new.png"
            alt="instagram"
            style={socialIcon}
          />

          <img
            src="https://img.icons8.com/color/48/tiktok--v1.png"
            alt="tiktok"
            style={socialIcon}
          />
        </div>

        <p>📧 lyonmotors@gmail.com</p>
      </footer>
    </div>
  );
}

const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: 18,
};

const socialIcon = {
  width: 38,
  height: 38,
  cursor: "pointer",
};

const inputStyle = {
  padding: "18px",
  borderRadius: 12,
  border: "none",
  width: "100%",
  maxWidth: 260,
  fontSize: 18,
};

const searchBtn = {
  background: "#e31b23",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  padding: "18px 35px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 17,
};

const whyCard = {
  background: "#1e293b",
  padding: 30,
  borderRadius: 18,
};

const formInput = {
  padding: 18,
  borderRadius: 10,
  border: "1px solid #ccc",
};

const submitBtn = {
  background: "#e31b23",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: 18,
  fontWeight: "bold",
};

const contactBtn = {
  background: "#0f172a",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: 18,
  fontWeight: "bold",
  cursor: "pointer",
};