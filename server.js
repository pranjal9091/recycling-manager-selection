const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mahaveernagar1st', 
    database: 'recycling_hr'
});

// API to get all candidates with their rankings
app.get('/api/leaderboard', (req, res) => {
    const query = `
        SELECT c.id, c.name, c.experience_years, c.skills, 
               e.crisis_management_score as crisis, 
               e.sustainability_score as sustainability, 
               e.team_motivation_score as motivation, 
               e.overall_avg_score as score
        FROM candidates c
        JOIN evaluations e ON c.id = e.candidate_id
        ORDER BY e.overall_avg_score DESC`;
    
    db.query(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(5001, () => console.log("Server running on port 5001"));