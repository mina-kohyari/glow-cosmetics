import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Menu } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Luminous Silk Foundation",
    price: 45.00,
    category: "Face",
    image: "https://images.unsplash.com/photo-1625093765366-d34401b3f110?auto=format&fit=crop&q=80&w=800",
    rating: 4.8
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    price: 28.00,
    category: "Lips",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    id: 3,
    name: "Hydrating Serum",
    price: 52.00,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    rating: 4.7
  }
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <Menu size={24} />
        <h1 style={styles.logo}>GLOW</h1>
        <div style={styles.navIcons}>
          <Heart size={20} />
          <div style={styles.cartContainer}>
            <ShoppingBag size={20} onClick={() => setCartCount(cartCount + 1)} />
            <span style={styles.badge}>{cartCount}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroText}>
          <h2>Radiance defined.</h2>
          <p>Discover our new Spring collection.</p>
          <button style={styles.shopBtn}>Shop New Arrivals</button>
        </div>
      </header>

      {/* Product Grid */}
      <main style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.details}>
              <p style={styles.category}>{product.category}</p>
              <h3 style={styles.prodName}>{product.name}</h3>
              <div style={styles.priceRow}>
                <span>${product.price.toFixed(2)}</span>
                <span style={styles.rating}><Star size={14} fill="gold" /> {product.rating}</span>
              </div>
              <button 
                style={styles.addBtn} 
                onClick={() => setCartCount(prev => prev + 1)}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'Inter, sans-serif', color: '#333', backgroundColor: '#fafafa', minHeight: '100vh' },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', backgroundColor: '#fff', borderBottom: '1px solid #eee' },
  logo: { letterSpacing: '4px', fontWeight: 'bold' },
  navIcons: { display: 'flex', gap: '20px' },
  cartContainer: { position: 'relative', cursor: 'pointer' },
  badge: { position: 'absolute', top: -8, right: -8, background: '#000', color: '#fff', borderRadius: '50%', padding: '2px 6px', fontSize: '10px' },
  hero: { height: '400px', backgroundImage: 'url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 10%' },
  heroText: { backgroundColor: 'rgba(255,255,255,0.8)', padding: '30px', borderRadius: '4px' },
  shopBtn: { marginTop: '10px', padding: '10px 20px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', padding: '50px 10%' },
  card: { background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  image: { width: '100%', height: '300px', objectFit: 'cover' },
  details: { padding: '20px' },
  category: { fontSize: '12px', color: '#888', textTransform: 'uppercase' },
  prodName: { margin: '5px 0', fontSize: '18px' },
  priceRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  rating: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' },
  addBtn: { width: '100%', padding: '12px', border: '1px solid #000', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }
};