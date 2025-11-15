// db.js
const mysql = require('mysql2'); // Gebruik mysql2 voor betere ondersteuning

fetch('https://nd-3d-prints.page.gd/api.php') // Pas de URL aan naar je eigen subdomein
  .then(response => response.json())
  .then(data => {
    console.log(data); // Verwerk de ontvangen gegevens
  })
  .catch(error => console.error('Error:', error));


module.exports = db; // Exporteer de db-verbinding voor gebruik in andere modules

