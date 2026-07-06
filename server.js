const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to handle JSON data and serve frontend files
app.use(express.json());
app.use(express.static(__dirname));

// Connect to the SQLite Database
const db = new sqlite3.Database('./school.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database successfully.");
        // Create a table for student report cards including Biology
        db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    admission_number TEXT,
    class_level TEXT,
    term TEXT,
    math_score INTEGER,
    english_score INTEGER,
    biology_score INTEGER
)`);
    }
});

// Route to save a new student record to the database
app.post('/api/students', (req, res) => {
    const { name, admission_number, class_level, term, math_score, english_score } = req.body;

    const query = `INSERT INTO students (name, admission_number, class_level, term, math_score, english_score) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(query, [name, admission_number, class_level, term, math_score, english_score], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Student record saved successfully!", id: this.lastID });
    });
});
// Route for the admin to get all student records from the database
app.get('/api/admin/students', (req, res) => {
    const query = `SELECT * FROM students`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ students: rows });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});