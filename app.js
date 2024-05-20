import express from "express";
import { createConnection } from "mysql";
const app = express();
const port = 3000;

const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/records", (req, res) => {
  db.query("SELECT * FROM records", (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`API service running at http://localhost:${port}`);
});
