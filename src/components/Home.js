import React from 'react';

function Home({ theme, toggleTheme }) {
  return (
    <div className="home">
      <h1>Welcome to Movie Explorer</h1>
      <p>Discover and explore your favorite movies!</p>
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default Home;