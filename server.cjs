const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
  host: "containers-us-west-xxx.railway.app",
  user: "root",
  password: "xxxxxxxx",
  database: "railway",
  port: 12345,
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/add-car", upload.array("image", 10), (req, res) => {
  const {
    name,
    price,
    year,
    engine,
    fuel,
    transmission,
    color,
    mileage,
    seats,
    location,
  } = req.body;

  const firstImage = req.files?.[0]?.filename || "";

  const sql = `
    INSERT INTO cars
    (name, price, year, engine, fuel, transmission, color, mileage, seats, image, location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      price,
      year,
      engine,
      fuel,
      transmission,
      color,
      mileage,
      seats,
      firstImage,
      location,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Insert failed");
      }

      const carId = result.insertId;
      const images = req.files || [];

      images.forEach((file) => {
        db.query(
          "INSERT INTO car_images (car_id, image) VALUES (?, ?)",
          [carId, file.filename]
        );
      });

      res.send("Car added successfully");
    }
  );
});

app.get("/cars", (req, res) => {
  db.query("SELECT * FROM cars ORDER BY id DESC", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to fetch cars");
    }

    res.json(result);
  });
});

app.get("/car/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM cars WHERE id = ?", [id], (err, carResult) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching car");
    }

    if (carResult.length === 0) {
      return res.status(404).send("Car not found");
    }

    db.query(
      "SELECT image FROM car_images WHERE car_id = ?",
      [id],
      (err, imageResult) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error fetching images");
        }

        const car = carResult[0];
        car.images = imageResult.map((img) => img.image);

        res.json(car);
      }
    );
  });
});

app.put("/update-car/:id", (req, res) => {
  const id = req.params.id;

  const {
    name,
    price,
    year,
    engine,
    fuel,
    transmission,
    color,
    mileage,
    seats,
    location,
  } = req.body;

  const sql = `
    UPDATE cars SET
    name=?,
    price=?,
    year=?,
    engine=?,
    fuel=?,
    transmission=?,
    color=?,
    mileage=?,
    seats=?,
    location=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      price,
      year,
      engine,
      fuel,
      transmission,
      color,
      mileage,
      seats,
      location,
      id,
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Update failed");
      }

      res.send("Car updated successfully");
    }
  );
});

app.delete("/delete-car/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM car_images WHERE car_id = ?", [id], () => {
    db.query("DELETE FROM cars WHERE id = ?", [id], (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Delete failed");
      }

      res.send("Car deleted successfully");
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});