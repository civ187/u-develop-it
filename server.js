const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request(Not Found) Catch all
app.use((req, res) => {
    res.status(404).end();
  });

// function that will start the Express.js server on port 3001
// Start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

// const inputCheck = require('./utils/inputCheck');

// const sqlite3 = require('sqlite3').verbose();

// // Connect to database
// const db = new sqlite3.Database('./db/election.db', err => {
//     if (err) {
//       return console.error(err.message);
//     }
  
//     console.log('Connected to the election database.');
//   });

// // Delete a candidate
// app.delete('/api/candidate/:id', (req, res) => {
//     const sql = `DELETE FROM candidates WHERE id = ?`;
//     const params = [req.params.id];
//     db.run(sql, params, function(err, result) {
//       if (err) {
//         res.status(400).json({ error: res.message });
//         return;
//       }
  
//       res.json({
//         message: 'successfully deleted',
//         changes: this.changes
//       });
//     });
//   });

// app.delete('/api/party/:id', (req, res) => {
//   const sql = `DELETE FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: res.message });
//       return;
//     }

//     res.json({ message: 'successfully deleted', changes: this.changes });
//   });
// });

// // Create a candidate --- API endpoint that will create candidates
// app.post('/api/candidate', ({ body }, res) => {
//     const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//     const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
//     const params = [body.first_name, body.last_name, body.industry_connected];
//     // ES5 function, not arrow function, to use `this`
//     db.run(sql, params, function(err, result) {
//         if (err) {
//             res.status(400).json({ error: err.message });
//             return;
//         }
        
//         res.json({
//             message: 'success',
//             data: body,
//             id: this.lastID
//         });
//     });
// });

// // Get all candidates --- API endpoint to retrieve all the candidates from the candidates table
// app.get('/api/candidates', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                 AS party_name
//                 FROM candidates
//                 LEFT JOIN parties
//                 ON candidates.party_id = parties.id`;
//     const params = [];
//     db.all(sql, params, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

// // Get single candidate --- API endpoint to get a single candidate
// app.get('/api/candidate/:id', (req, res) => {
//     const sql = `SELECT candidates.*, parties.name
//                 AS party_name
//                 FROM candidates
//                 LEFT JOIN parties
//                 ON candidates.party_id = parties.id
//                 WHERE candidates.id = ?`;
//     const params = [req.params.id];
//     db.get(sql, params, (err, row) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
  
//       res.json({
//         message: 'success',
//         data: row
//       });
//     });
//   });

// //Change party offilication --- API endpoint to change a candidates party
// app.put('/api/candidate/:id', (req, res) => {


  
//   const errors = inputCheck(req.body, 'party_id');

//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }



//   const sql = `UPDATE candidates SET party_id = ? 
//                WHERE id = ?`;
//   const params = [req.body.party_id, req.params.id];

//   db.run(sql, params, function(err, result) {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: req.body,
//       changes: this.changes
//     });
//   });
// });

// // Get all parties --- API endpoint to retrieve all the parties from the parties table
// app.get('/api/parties', (req, res) => {
//   const sql = `SELECT * FROM parties`;
//   const params = [];
//   db.all(sql, params, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Get single party --- API endpoint to retrieve a single party from the parties table
// app.get('/api/party/:id', (req, res) => {
//   const sql = `SELECT * FROM parties WHERE id = ?`;
//   const params = [req.params.id];
//   db.get(sql, params, (err, row) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }

//     res.json({
//       message: 'success',
//       data: row
//     });
//   });
// });




// GET a single candidate
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//     if(err) {
//       console.log(err);
//     }
//     console.log(row);
//   });

//   return all the data in the candidates table
// db.all(`SELECT * FROM candidates`, (err, rows) => {
//     console.log(rows);
//   });

// app.get('/', (req, res) => {
//     res.json({
//       message: 'Hello World'
//     });
//   });

