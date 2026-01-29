export const products = [
  {
    id: 1,
    name: "Luminous Silk Foundation",
    price: 45.00,
    category: "Face",
    image: ,
    rating: 4.8,
    description: "Build-able coverage with a natural glow."
  },
  // ... add more items here
];import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Menu, X, Trash2 } from 'lucide-react';

// ... (keep the same products array from before)

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, cartId: Date.now() }]);
    setIsCartOpen(true); // Automatically open sidebar when item is added
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.cartId !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <Menu size={24} />
        <h1 style={styles.logo}>GLOW</h1>
        <div style={styles.navIcons}>
          <div style={styles.cartContainer} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {cartItems.length > 0 && <span style={styles.badge}>{cartItems.length}</span>}
          </div>
        </div>
      </nav>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <div style={styles.overlay} onClick={() => setIsCartOpen(false)}>
          <div style={styles.sidebar} onClick={e => e.stopPropagation()}>
            <div style={styles.sidebarHeader}>
              <h3>Your Bag ({cartItems.length})</h3>
              <X size={24} onClick={() => setIsCartOpen(false)} style={{cursor: 'pointer'}} />
            </div>
            
            <div style={styles.cartList}>
              {cartItems.length === 0 ? (
                <p style={{textAlign: 'center', marginTop: '50px'}}>Your bag is empty.</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.cartId} style={styles.cartItem}>
                    <img src={item.image} alt={item.name} style={styles.cartThumb} />
                    <div style={{flex: 1}}>
                      <p style={{fontWeight: 'bold', margin: 0}}>{item.name}</p>
                      <p style={{margin: '5px 0'}}>${item.price.toFixed(2)}</p>
                    </div>
                    <Trash2 size={18} onClick={() => removeFromCart(item.cartId)} style={{cursor: 'pointer', color: '#888'}} />
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={styles.sidebarFooter}>
                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button style={styles.checkoutBtn}>Checkout Now</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <main style={styles.grid}>
        {products.map(product => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <div style={styles.details}>
              <p style={styles.category}>{product.category}</p>
              <h3 style={styles.prodName}>{product.name}</h3>
              <button style={styles.addBtn} onClick={() => addToCart(product)}>
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