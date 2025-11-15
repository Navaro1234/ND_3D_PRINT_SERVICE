// db.js
const mysql = require('mysql2'); // Gebruik mysql2 voor betere ondersteuning

const db = mysql.createConnection({
    host: 'localhost',          // Vervang dit door je MySQL host
    user: 'Database',           // Vervang dit door je MySQL gebruikersnaam
    password: 'DatabaseSecure', // Vervang dit door je MySQL wachtwoord
    database: '3D_PRINT_SERVICE' // Vervang dit door je database naam
});

// Maak verbinding met de database
db.connect((err) => {
    if (err) {
        console.error('Fout bij verbinden met de database:', err);
        return;
    }
    console.log('Database verbonden!');
});

module.exports = db; // Exporteer de db-verbinding voor gebruik in andere modules
