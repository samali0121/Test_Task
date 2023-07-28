const express = require("express");
const app = express.Router();
const { pgsql } = require("./db");

// API routes for CRUD operations

app.get("/", (req, res) => {
  res.json({ rseult: "Your server is running" });
});

app.get("/read-data", async (req, res) => {
  try {
    const query = "SELECT * from users";
    const result = await pgsql.query(query);
    res.json({ result: result.rows });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/create-user", async (req, res) => {
  try {
    const { username, gender, email, field } = req.body;

    // Validate if all required fields are present
    if (!username || !gender || !email || !field) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const checkQuery = "SELECT user_id FROM users WHERE username = $1";
    const checkValues = [username];
    const checkResult = await pgsql.query(checkQuery, checkValues);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Insert the new record into the database
    const query =
      "INSERT INTO users (username, gender, email, field) VALUES ($1, $2, $3, $4)";
    const values = [username, gender, email, field];
    await pgsql.query(query, values);

    return res.status(201).json({ message: "New record added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/user-update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { username, gender, email, field } = req.body;

    // Validate if all required fields are present
    if (!username || !gender || !email || !field) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the record with the specified ID exists in the database
    const checkQuery = "SELECT * FROM users WHERE user_id = $1";
    const checkValues = [id];
    const checkResult = await pgsql.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Update the existing record in the database
    const updateQuery =
      "UPDATE users SET username = $1, gender = $2, email = $3, field = $4 WHERE user_id = $5";
    const updateValues = [username, gender, email, field, id];
    await pgsql.query(updateQuery, updateValues);

    return res.status(200).json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/user-delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the record with the specified ID exists in the database
    const checkQuery = "SELECT * FROM users WHERE user_id = $1";
    const checkValues = [id];
    const checkResult = await pgsql.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Delete the record from the database
    const deleteQuery = "DELETE FROM users WHERE user_id = $1";
    const deleteValues = [id];
    await pgsql.query(deleteQuery, deleteValues);

    return res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
