import '../index.css';

export function Navbar() {
    return (
        <>
        <nav id="navbar">
    <div className="nav-container">
      <h2 className="logo">Recipe Finder</h2>
      <ul className="nav-links">
        <li><a href="./index.html" id="home-link">Home</a></li>
        <li><a href="./favorites.html" id="favorites-link">Favorites</a></li>
      </ul>
    </div>
  </nav>
  
        </>
    )
}