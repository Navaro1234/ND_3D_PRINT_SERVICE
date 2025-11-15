import React, { useState } from 'react';

const Products = () => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [fileLink, setFileLink] = useState('');
  const [projectIdea, setProjectIdea] = useState('');
  const [showInstructions, setShowInstructions] = useState(false); // Standaard verborgen

  const products = [
    { id: 1, name: 'Kleine 3D print', description: 'Dit is product 1', price: 3 },
    { id: 2, name: 'Middelmatige 3D print', description: 'Dit is product 2', price: 5 },
    { id: 3, name: 'Grote 3D print', description: 'Dit is product 3', price: 7 },
  ];

  const handleAddToCart = (product) => {
    if (isValidUrl(fileLink)) {
      if (projectIdea.trim().length < 10) {
        alert('Voer een projectidee van minimaal 10 tekens in om door te gaan.');
        return;
      }
      const discountedPrice = Math.round(product.price * 0.95 * 20) / 20; // 5% korting en afgerond op 5 cent
      const productWithFileLink = { ...product, fileLink, idea: projectIdea, price: discountedPrice };
      setCart([...cart, productWithFileLink]);
      console.log(`Product "${product.name}" met Google Drive link "${fileLink}" en idee "${projectIdea}" toegevoegd aan winkelwagen.`);
      setFileLink('');
      setProjectIdea('');
    } else if (projectIdea.trim().length >= 10) {
      const productWithIdea = { ...product, idea: projectIdea };
      setCart([...cart, productWithIdea]);
      console.log(`Product "${product.name}" met idee "${projectIdea}" toegevoegd aan winkelwagen.`);
      setProjectIdea('');
    } else {
      alert('Voer een geldige Google Drive link of een projectidee van minimaal 10 tekens in om toe te voegen.');
    }
  };

  const handleResetCart = () => {
    setCart([]);
    console.log('Winkelwagentje is leeggemaakt.');
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
        alert('Uw winkelwagentje is leeg. Voeg producten toe voordat u bestelt.');
        return;
    }

    const orderDetails = cart.map(item => ({
        name: item.name,
        price: item.price,
        fileLink: item.fileLink,
        idea: item.idea,
    }));

    const total = getTotalPrice();
    const order = { items: orderDetails, total };

    // Sla de bestelling op via de API
    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });

        if (response.ok) {
            console.log('Bestelling succesvol opgeslagen:', await response.json());
            // Winkelwagentje leegmaken na plaatsen bestelling
            setCart([]);
        } else {
            console.error('Fout bij het opslaan van de bestelling:', response.statusText);
        }
    } catch (error) {
        console.error('Fout bij het opslaan van de bestelling:', error);
    }
  };

  const isValidUrl = (url) => {
    const pattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/;
    return pattern.test(url);
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  const openGoogleDrive = () => {
    window.open('https://drive.google.com', '_blank');
  };

  return (
    <div>
      {/* Knop voor instructies bovenaan */}
      <button onClick={toggleInstructions} style={{ marginBottom: '20px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>
        {showInstructions ? 'Verberg instructies' : 'Hoe 3D-printbestand uploaden?'}
      </button>

      {/* Instructies sectie */}
      {showInstructions && (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <h3>Stappen om een 3D-printbestand te uploaden:</h3>
          <ol>
            <li>Ga naar <button onClick={openGoogleDrive} style={{ backgroundColor: 'transparent', color: '#007bff', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>Google Drive</button> en upload daar uw 3D-printbestand.</li>
            <li>Klik op 'Delen' voor het bestand en zorg ervoor dat 'Iedereen met de link kan bewerken' is geselecteerd.</li>
            <li>Kopieer de link naar uw 3D-printbestand op Google Drive.</li>
            <li>Plak de link in het invoerveld 'Google Drive link' op deze pagina.</li>
            <li>Typ in het projectidee-invoerveld een korte beschrijving van uw project (minimaal 10 tekens).</li>
            <li>Kies het gewenste product door op de knop 'Voeg toe aan winkelwagen' te klikken.</li>
            <li>Herhaal deze stappen voor elk product dat u wilt bestellen.</li>
            <li>Wanneer u klaar bent, kunt u uw bestelling plaatsen door op de 'Bestel' knop te klikken.</li>
          </ol>
        </div>
      )}

      <h2>Producten</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Prijs: €{product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>Voeg toe aan winkelwagen</button>
          </div>
        ))}
      </div>

      <button onClick={toggleCartVisibility} style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>
        {isCartVisible ? 'Verberg winkelwagentje' : 'Toon winkelwagentje'}
      </button>

      {isCartVisible && (
        <div style={{ position: 'absolute', top: '60px', right: '20px', border: '1px solid #ccc', padding: '10px', backgroundColor: '#fff' }}>
          <h2>Winkelwagentje</h2>
          {cart.length === 0 ? (
            <p>Uw winkelwagentje is leeg.</p>
          ) : (
            <div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>{item.name} - €{item.price.toFixed(2)} (Google Drive link: {item.fileLink}, Idee: {item.idea})</li>
                ))}
              </ul>
              <p>Totaal: €{getTotalPrice().toFixed(2)}</p>
              <button onClick={handleResetCart} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>Leeg winkelwagentje</button>
              <button onClick={handleOrder} style={{ marginTop: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px' }}>Bestel</button>
            </div>
          )}
        </div>
      )}

      <h1 style={{ marginTop: '20px' }}>Google Drive link</h1>
      <input 
        type="text" 
        placeholder="Voer hier uw Google Drive link in..." 
        value={fileLink}
        onChange={(e) => setFileLink(e.target.value)}
        style={{ marginTop: '10px', display: 'block', width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
      />

      {/* Invoerveld voor projectidee */}
      <h2 style={{ marginTop: '30px' }}>Project Idee</h2>
      <textarea
        value={projectIdea}
        onChange={(e) => setProjectIdea(e.target.value)}
        placeholder="Typ hier uw projectidee (minimaal 10 tekens)..."
        rows="4"
        style={{ width: '100%', marginTop: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
      />
    </div>
  );
};

export default Products;
