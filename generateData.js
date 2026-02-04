const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mahaveernagar1st', 
  database: 'recycling_hr'
});

async function seedData() {
  for (let i = 0; i < 40; i++) {
    const name = faker.person.fullName();
    const exp = faker.number.int({ min: 2, max: 20 });
    const skills = faker.helpers.arrayElements(['Waste Sorting', 'Lean Six Sigma', 'Crisis Management', 'Circular Economy', 'Team Leadership'], 3).join(', ');
    
    // Insert Candidate
    const [result] = await connection.promise().query(
      'INSERT INTO candidates (name, experience_years, skills) VALUES (?, ?, ?)', 
      [name, exp, skills]
    );
    
    // Insert Random Evaluation (AI Mock)
    const scores = [faker.number.float({min:5, max:10}), faker.number.float({min:5, max:10}), faker.number.float({min:5, max:10})];
    const avg = scores.reduce((a,b) => a+b)/3;
    
    await connection.promise().query(
      'INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score, overall_avg_score) VALUES (?, ?, ?, ?, ?)',
      [result.insertId, scores[0], scores[1], scores[2], avg]
    );
  }
  console.log("40 Candidates Generated!");
  process.exit();
}
seedData();