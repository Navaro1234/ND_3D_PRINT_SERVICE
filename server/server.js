const express = require('express');
const cors = require('cors'); 
const db = require('./db'); 
const multer = require('multer'); // Importeer multer voor bestandsuploads

const app = express();
const PORT = process.env.PORT || 2512; 
app.use(express.json({ limit: '10mb' }));
app.use(cors()); 

// Configureer multer
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // Max 10 MB voor uploads

// Basisroute
app.get('/', (req, res) => {
    res.send('Welkom bij de 3D Print Service API!');
});

// Voorbeeldroute om gegevens op te halen uit de database
app.get('/gebruikers', (req, res) => {
    db.query('SELECT * FROM gebruikers', (err, results) => {
        if (err) {
            console.error('Fout bij het ophalen van gegevens:', err);
            return res.status(500).send('Er is een fout opgetreden bij het ophalen van gegevens.');
        }
        res.json(results);
    });
});

// Route om een nieuwe gebruiker te registreren
app.post('/registreren', upload.single('profiel_foto'), (req, res) => {
    const { gebruikersnaam, email, wachtwoord } = req.body; 
    const profiel_foto = req.file ? req.file.filename : null; // Gebruik de bestandsnaam van de geüploade afbeelding

    if (!gebruikersnaam || !email || !wachtwoord) {
        return res.status(400).send('Gebruikersnaam, email en wachtwoord zijn verplicht.');
    }

    const query = 'INSERT INTO gebruikers (gebruikersnaam, email, wachtwoord, profiel_foto) VALUES (?, ?, ?, ?)';
    db.query(query, [gebruikersnaam, email, wachtwoord, profiel_foto], (err, results) => {
        if (err) {
            console.error('Fout bij het registreren van de gebruiker:', err.message);
            return res.status(500).send('Er is een fout opgetreden bij het registreren van de gebruiker: ' + err.message);
        }
        res.status(201).json({
            message: 'Gebruiker succesvol geregistreerd',
            gebruiker: { gebruikersnaam, email, profiel_foto }
        });
    });
});

// Route om een gebruiker te verwijderen
app.delete('/gebruikers/:gebruikersnaam', (req, res) => {
    const gebruikersnaam = req.params.gebruikersnaam; 

    const query = 'DELETE FROM gebruikers WHERE gebruikersnaam = ?';
    db.query(query, [gebruikersnaam], (err, results) => {
        if (err) {
            console.error('Fout bij het verwijderen van de gebruiker:', err.message);
            return res.status(500).send('Er is een fout opgetreden bij het verwijderen van de gebruiker: ' + err.message);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Gebruiker niet gevonden.');
        }
        res.status(200).json({ message: 'Gebruiker succesvol verwijderd.' });
    });
});

// Start de server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
