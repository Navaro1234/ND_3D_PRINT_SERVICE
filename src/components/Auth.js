import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const API_URL = 'http://localhost:2512'; // Basis URL voor de API

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/gebruikers`, { // Inloggen endpoint
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setIsLoggedIn(true);
            alert('Inloggen succesvol!');
        } else {
            alert('Inloggen mislukt. Controleer je gebruikersnaam en wachtwoord.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Maak een nieuwe FormData instantie aan
        const formData = new FormData();
        formData.append('gebruikersnaam', username);
        formData.append('email', email);
        formData.append('wachtwoord', password);
        
        // Voeg de profielfoto toe als deze is geselecteerd
        if (profilePicture) {
            formData.append('profiel_foto', profilePicture); // Zorg ervoor dat dit een bestand is
        }

        // Verstuur de FormData naar de server
        const response = await fetch(`${API_URL}/registreren`, {
            method: 'POST',
            body: formData, // Gebruik FormData in plaats van JSON
        });

        if (response.ok) {
            setIsLoggedIn(true);
            alert('Registratie succesvol!');
        } else {
            alert('Registratie mislukt. Controleer je gegevens.');
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowDropdown(false);
        setProfilePicture(null);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(file); // Bewaar het bestand in plaats van de URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAccountDelete = async () => {
        const response = await fetch(`${API_URL}/gebruikers/${username}`, { // Verwijder account endpoint
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            alert('Account is succesvol verwijderd.');
            handleLogout(); // Log de gebruiker uit en reset de profielfoto
        } else {
            alert('Er is een fout opgetreden bij het verwijderen van het account.');
        }
    };

    return (
        <div className="auth-container">
            {isLoggedIn && (
                <div className="user-menu-container">
                    <div className="user-circle" onClick={toggleDropdown}>
                        {profilePicture ? (
                            <img
                                src={URL.createObjectURL(profilePicture)} // Gebruik de URL voor weergave
                                alt="Profiel"
                                className="profile-picture"
                            />
                        ) : (
                            <div className="default-picture">👤</div>
                        )}
                    </div>
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button onClick={() => setShowSettings(true)}>Instellingen</button>
                            <button onClick={handleLogout}>Uitloggen</button>
                        </div>
                    )}
                </div>
            )}

            {!isLoggedIn ? (
                <form onSubmit={isRegistering ? handleRegister : handleLogin} className="auth-form">
                    <div>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {isRegistering && (
                        <div>
                            <label htmlFor="profile-picture">Profielfoto:</label>
                            <input
                                type="file"
                                id="profile-picture"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    )}
                    <button type="submit">{isRegistering ? 'Registreren' : 'Inloggen'}</button>
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Heb je al een account? Inloggen' : 'Nog geen account? Registreren'}
                    </button>
                </form>
            ) : null}

            {showSettings && (
                <div className="settings-modal">
                    <h2>Instellingen</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label htmlFor="new-username">Nieuwe Gebruikersnaam:</label>
                            <input
                                type="text"
                                id="new-username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="new-email">Nieuw E-mail:</label>
                            <input
                                type="email"
                                id="new-email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="new-password">Nieuw Wachtwoord:</label>
                            <input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Opslaan</button>
                        <button type="button" onClick={() => setShowSettings(false)}>Annuleren</button>
                    </form>
                    <button className="delete-account-button" onClick={handleAccountDelete}>
                        Account Verwijderen
                    </button>
                </div>
            )}
        </div>
    );
};

export default Auth;
