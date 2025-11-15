// userController.js
const db = require('./db'); // Importeer de databaseverbinding

// Functie om alle gebruikers op te halen
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Fout bij het ophalen van gebruikers:', err);
            return res.status(500).send('Er is een fout opgetreden bij het ophalen van gebruikers.');
        }
        res.json(results);
    });
};

// Functie om een nieuwe gebruiker toe te voegen
const createUser = (req, res) => {
    const { username, password } = req.body; // Verkrijg gegevens uit het verzoek

    if (!username || !password) {
        return res.status(400).send('Gebruikersnaam en wachtwoord zijn vereist.');
    }

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Fout bij het toevoegen van gebruiker:', err);
            return res.status(500).send('Er is een fout opgetreden bij het toevoegen van de gebruiker.');
        }
        res.status(201).send(`Gebruiker toegevoegd met ID: ${results.insertId}`);
    });
};

// Exporteer de functies voor gebruik in andere modules
module.exports = {
    getAllUsers,
    createUser
};
