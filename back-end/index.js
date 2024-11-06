require('dotenv').config();
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());


const rds_host = process.env.RDS_HOST
const rds_user = process.env.RDS_USER
const rds_password = process.env.RDS_PASSWORD

const db = mysql.createConnection({
    host: rds_host,
    user: rds_user,
    password: rds_password,
    database: "election66",
    port: "3306"
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to RDS =', err)
        return;
    }
    else {
        console.log('RDS successfully connected');
    }
})

app.get("/get-max-vote-district", (req, res) => {
    const q = ` SELECT rd.province_id, pv.name AS province_name, rd.district, 
                rd.party_id, pt.name AS party_name, rd.vote
                FROM result_dist rd
                JOIN province pv ON rd.province_id = pv.id
                JOIN party pt ON rd.party_id = pt.id
                JOIN (
                        SELECT province_id, district, MAX(vote) AS max_vote
                        FROM result_dist
                        GROUP BY province_id, district
                ) AS max_results ON rd.province_id = max_results.province_id
                        AND rd.district = max_results.district
                        AND rd.vote = max_results.max_vote; `;
    
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        
        return res.json(data)
    })
})


app.get("/get-party-rank", (req, res) => {
    const columns = Array.from({ length: 77 }, (_, i) => `pv${i + 1}`);

    const q = ` SELECT p.id AS party_id, p.name AS party_name, total_votes.total_vote, total_seats.total_seat
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
                ORDER BY total_votes.total_vote DESC; `;
   
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        
        return res.json(data);
    });
});



app.listen(8800, ()=>{
    console.log("Server is running on port 8800")
})
