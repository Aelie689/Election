require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const rds_host = process.env.RDS_HOST;
const rds_user = process.env.RDS_USER;
const rds_password = process.env.RDS_PASSWORD;

const db = mysql.createConnection({
  host: rds_host,
  user: rds_user,
  password: rds_password,
  database: "election66",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to RDS =", err);
    return;
  } else {
    console.log("RDS successfully connected");
  }
});

app.get("/candidates", (req, res) => {
  const limit = parseInt(req.query.limit) || 100; 
  const offset = parseInt(req.query.offset) || 0; 
  const type = req.query.type || "Constituency"; 

  const query = `
    SELECT 
        candidates.id,
        candidates.name,
        candidates.number,
        candidates.education,
        candidates.gender,
        candidates.age,
        candidates.occupation,
        candidates.district,
        candidates.type,
        candidates.province_id,
        candidates.party_id,
        candidates.order,
        IFNULL(province.name, 'ไม่ระบุ') AS province_name,
        IFNULL(party.name, 'ไม่ระบุ') AS party_name,
        IFNULL(party.color_code, '#CCCCCC') AS party_color
    FROM candidates
    LEFT JOIN province ON candidates.province_id = province.id
    LEFT JOIN party ON candidates.party_id = party.id
    WHERE candidates.type = ?
    LIMIT ? OFFSET ?;
  `;

  const countQuery = `SELECT COUNT(*) AS totalItems FROM candidates WHERE type = ?`;

  // Run two queries to get data and total items
  db.query(countQuery, [type], (err, countResult) => {
    if (err) {
      console.error("Error counting candidates:", err);
      return res.status(500).json({ error: err.code, message: err.message });
    }

    const totalItems = countResult[0].totalItems;

    db.query(query, [type, limit, offset], (err, data) => {
      if (err) {
        console.error("Error fetching candidates:", err);
        return res.status(500).json({ error: err.code, message: err.message });
      }

      return res.json({
        data,
        totalItems,
      });
    });
  });
});

app.get("/get-max-vote-district", (req, res) => {
  const q = `
    SELECT rd.province_id, pv.name AS province_name, rd.district, 
           rd.party_id, pt.name AS party_name, rd.vote
    FROM result_dist rd
    JOIN province pv ON rd.province_id = pv.id
    JOIN party pt ON rd.party_id = pt.id
    JOIN (
      SELECT province_id, district, MAX(vote) AS max_vote
      FROM result_dist
      GROUP BY province_id, district
    ) AS max_results 
    ON rd.province_id = max_results.province_id
    AND rd.district = max_results.district
    AND rd.vote = max_results.max_vote;
  `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/party-name", (req, res) => {
  const q = `SELECT id, name from party;`;
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/get-party-rank", (req, res) => {
  const columns = Array.from({ length: 77 }, (_, i) => `pv${i + 1}`);

  const q = ` SELECT p.id AS party_id, p.name AS party_name, p.color_code, total_votes.total_vote, total_seats.total_seat
                FROM party p
                LEFT JOIN (
                    SELECT rp.party_id, (${columns.join(" + ")}) AS total_vote
                    FROM result_party rp
                ) AS total_votes ON p.id = total_votes.party_id
                LEFT JOIN (
                    SELECT rd.party_id, COUNT(*) AS total_seat
                    FROM result_dist rd
                    JOIN party pt ON rd.party_id = pt.id
                    JOIN (
                        SELECT province_id, district, MAX(vote) AS max_vote
                        FROM result_dist
                        GROUP BY province_id, district
                    ) AS max_results ON rd.province_id = max_results.province_id
                                    AND rd.district = max_results.district
                                    AND rd.vote = max_results.max_vote
                    GROUP BY pt.id
                ) AS total_seats ON p.id = total_seats.party_id
                ORDER BY total_seats.total_seat DESC; `;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/province-name", (req, res) => {
  const q = "SELECT id, name FROM province WHERE name IS NOT NULL;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/result_dist", (req, res) => {
  const q = "SELECT * FROM result_dist;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/authenticate-user", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate username to ensure it doesn't contain special characters
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Only allows alphanumeric characters and underscores
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "Invalid username format" });
    }

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return res.json({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          tel: user.telnumber,
          username: user.username,
        });
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add-user", async (req, res) => {
  try {
    const { firstname, lastname, telnumber, username, password } = req.body;

    if (!firstname || !lastname || !telnumber || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (firstname, lastname, telnumber, username, password) VALUES (?, ?, ?, ?, ?)";

    db.query(
      sql,
      [firstname, lastname, telnumber, username, hashedPassword],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          const userId = result.insertId;
          res.json({ id: userId });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/result-submit-constituency", async (req, res) => {
  try {
    const records = req.body;

    if (!Array.isArray(records) || records.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non-empty array" });
    }

    const insertResults = [];

    for (const record of records) {
      const { candidate_id, district, number, party_id, province_id, vote } =
        record;

      // Validate required fields for each record
      if (
        !province_id ||
        !district ||
        !number ||
        !vote ||
        !candidate_id ||
        !party_id
      ) {
        return res
          .status(400)
          .json({ error: "All fields are required in each record" });
      }

      const updateResultSql =
        "UPDATE result_dist SET vote = ? WHERE candidate_id = ? AND province_id = ? AND district = ? AND number = ? AND party_id = ?";

      await new Promise((resolve, reject) =>
        db.query(
          updateResultSql,
          [vote, candidate_id, province_id, district, number, party_id],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
      );

      insertResults.push({
        candidate_id,
        province_id,
        district,
        number,
        vote,
        party_id,
      });
    }

    res.json({
      message: "Results processed successfully",
      results: insertResults,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.get("/dist-info", (req, res) => {
  const q =
    "SELECT candidate_id, party_id, province_id, district, number FROM result_dist;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.put("/result-submit-partylist", async (req, res) => {
  try {
    const records = req.body;

    // Validate that the request body is a non-empty array
    if (!Array.isArray(records) || records.length === 0) {
      return res
        .status(400)
        .json({ error: "Request body must be a non-empty array" });
    }

    const insertResults = [];

    // Dynamically generate valid province IDs from pv1 to pv77
    const validProvinceIds = Array.from({ length: 77 }, (_, i) => `pv${i + 1}`);

    for (const record of records) {
      const { party, party_id, province, province_id, vote } = record;

      // Validate required fields for each record
      if (!province_id || !vote || !party_id) {
        return res
          .status(400)
          .json({ error: "All fields are required in each record" });
      }

      // Ensure province_id is a valid column name
      if (!validProvinceIds.includes(province_id)) {
        return res.status(400).json({ error: "Invalid province_id" });
      }

      // Dynamically construct the SQL query
      const updateResultSql = `UPDATE result_party SET \`${province_id}\` = ? WHERE party_id = ?`;

      // Perform the query
      await new Promise((resolve, reject) =>
        db.query(updateResultSql, [vote, party_id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        })
      );

      insertResults.push({
        province_id,
        vote,
        party_id,
      });
    }

    // Respond with success message and results
    res.json({
      message: "Party List Results processed successfully",
      results: insertResults,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
