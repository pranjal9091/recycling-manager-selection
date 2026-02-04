-- Database Schema for Recycling Manager Selection
CREATE DATABASE IF NOT EXISTS recycling_hr;
USE recycling_hr;

-- 1. Candidates Table
CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    experience_years INT,
    skills TEXT, -- Comma separated skills
    current_location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Evaluations Table (AI Scores)
CREATE TABLE evaluations (
    evaluation_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    crisis_management_score DECIMAL(4,2),
    sustainability_score DECIMAL(4,2),
    team_motivation_score DECIMAL(4,2),
    overall_avg_score DECIMAL(4,2),
    ai_feedback_summary TEXT,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- 3. Rankings Table (Auto-updated)
CREATE TABLE rankings (
    rank_id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT,
    final_score DECIMAL(4,2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
);

-- Trigger to auto-update rankings when a new evaluation is added
DELIMITER //
CREATE TRIGGER update_rankings_after_eval
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    INSERT INTO rankings (candidate_id, final_score)
    VALUES (NEW.candidate_id, NEW.overall_avg_score)
    ON DUPLICATE KEY UPDATE final_score = NEW.overall_avg_score;
END; //
DELIMITER ;