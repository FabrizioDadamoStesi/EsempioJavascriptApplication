const express = require('express');
const mysql = require('mysql');
const app = express();

// Connessione al database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'myDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connessione al database avvenuta con successo!');
});

// Creazione della tabella dei giochi, se non esiste già
const createTableQuery = 'CREATE TABLE IF NOT EXISTS videogiochi (' +
  'id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,' +
  'titolo VARCHAR(30) NOT NULL,' +
  'piattaforma VARCHAR(30) NOT NULL,' +
  'anno_lancio YEAR(4) NOT NULL,' +
  'genere VARCHAR(30) NOT NULL' +
  ')';
connection.query(createTableQuery, (err, results) => {
  if (err) throw err;
  console.log('Tabella videogiochi creata con successo!');
});

// Aggiunta di un gioco al database
app.post('/addgame', (req, res) => {
  const { titolo, piattaforma, anno_lancio, genere } = req.body;
  const insertGameQuery = `INSERT INTO videogiochi (titolo, piattaforma, anno_lancio, genere)
                            VALUES ('${titolo}', '${piattaforma}', '${anno_lancio}', '${genere}')`;
  connection.query(insertGameQuery, (err, results) => {
    if (err) throw err;
    console.log('Gioco aggiunto con successo!');
    res.send('Gioco aggiunto con successo!');
  });
});

app.listen(3000, () => {
  console.log('Server avviato sulla porta 3000!');
});
