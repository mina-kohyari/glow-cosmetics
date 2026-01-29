import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Menu, X, Trash2, ArrowRight, Search } from 'lucide-react';

// --- PROFESSIONAL DATA LAYER ---
const COSMETIC_PRODUCTS = [
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
  },
  {
    id: 4,
    name: "Rose Quartz Roller",
    price: 35.00,
    category: "Tools",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
    rating: 4.6
  }
];

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, cartId: Date.now() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={styles.appContainer}>
      {/* 1. HEADER & NAV */}
      <nav style={{
        ...styles.navbar, 
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={styles.navInner}>
          <Menu size={20} style={styles.clickable} />
          <h1 style={styles.brandLogo}>GLOW</h1>
          <div style={styles.navActions}>
            <Search size={20} style={styles.clickable} />
            <div style={styles.cartTrigger} onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartItems.length > 0 && <span style={styles.cartBadge}>{cartItems.length}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <span style={styles.heroSub}>Organic & Cruelty Free</span>
          <h2 style={styles.heroTitle}>The New Standard <br/> of Beauty</h2>
          <button style={styles.heroBtn}>Shop Collection <ArrowRight size={16} /></button>
        </div>
      </header>

      {/* 3. PRODUCT GRID */}
      <section style={styles.contentSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Featured Products</h3>
          <div style={styles.underline}></div>
        </div>
        
        <div style={styles.grid}>
          {COSMETIC_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </section>

      {/* 4. CART SIDEBAR */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        total={subtotal}
      />
    </div>
  );
}

// --- SUB-COMPONENTS (Professional Decomposition) ---

const ProductCard = ({ product, onAdd }) => (
  <div style={styles.card}>
    <div style={styles.cardImageWrapper}>
      <img src={product.image} alt={product.name} style={styles.cardImg} />
      <div style={styles.quickAddOverlay} onClick={() => onAdd(product)}>
        Add to Bag
      </div>
    </div>
    <div style={styles.cardDetails}>
      <span style={styles.cardCategory}>{product.category}</span>
      <h4 style={styles.cardName}>{product.name}</h4>
      <div style={styles.cardPriceRow}>
        <span style={styles.cardPrice}>${product.price.toFixed(2)}</span>
        <span style={styles.cardRating}><Star size={12} fill="#FFD700" color="#FFD700" /> {product.rating}</span>
      </div>
    </div>
  </div>
);

const CartSidebar = ({ isOpen, onClose, items, onRemove, total }) => (
  <>
    {isOpen && <div style={styles.backdrop} onClick={onClose} />}
    <aside style={{...styles.sidebar, transform: isOpen ? 'translateX(0)' : 'translateX(100%)'}}>
      <div style={styles.sidebarHeader}>
        <h3 style={{margin: 0, letterSpacing: '1px'}}>YOUR BAG</h3>
        <X size={24} onClick={onClose} style={styles.clickable} />
      </div>
      
      <div style={styles.sidebarBody}>
        {items.length === 0 ? (
          <div style={styles.emptyState}>Your bag is currently empty.</div>
        ) : (
          items.map(item => (
            <div key={item.cartId} style={styles.cartItem}>
              <img src={item.image} alt={item.name} style={styles.cartItemImg} />
              <div style={{flex: 1}}>
                <div style={styles.cartItemName}>{item.name}</div>
                <div style={styles.cartItemPrice}>${item.price.toFixed(2)}</div>
              </div>
              <Trash2 size={16} style={styles.trashIcon} onClick={() => onRemove(item.cartId)} />
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div style={styles.sidebarFooter}>
          <div style={styles.totalRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button style={styles.checkoutBtn}>Checkout</button>
        </div>
      )}
    </aside>
  </>
);

// --- PROFESSIONAL STYLES OBJECT ---
const styles = {
  appContainer: { fontFamily: "'Inter', sans-serif", color: '#1a1a1a', backgroundColor: '#fff' },
  navbar: { position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'all 0.4s ease' },
  navInner: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', maxWidth: '1400px', margin: '0 auto' },
  brandLogo: { fontSize: '24px', letterSpacing: '6px', fontWeight: '800', margin: 0 },
  navActions: { display: 'flex', gap: '20px', alignItems: 'center' },
  cartTrigger: { position: 'relative', cursor: 'pointer' },
  cartBadge: { position: 'absolute', top: '-8px', right: '-8px', background: '#000', color: '#fff', fontSize: '10px', borderRadius: '50%', padding: '2px 6px' },
  
  heroSection: { height: '80vh', backgroundImage: 'url("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 10%' },
  heroSub: { textTransform: 'uppercase', letterSpacing: '3px', fontSize: '12px', fontWeight: '600' },
  heroTitle: { fontSize: '56px', fontWeight: '300', margin: '20px 0', lineHeight: '1.2' },
  heroBtn: { display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 35px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600', textTransform: 'uppercase', fontSize: '12px' },
  
  contentSection: { padding: '80px 10%', maxWidth: '1400px', margin: '0 auto' },
  sectionHeader: { textAlign: 'center', marginBottom: '60px' },
  sectionTitle: { fontSize: '28px', fontWeight: '300', marginBottom: '10px' },
  underline: { width: '40px', height: '2px', background: '#000', margin: '0 auto' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' },
  card: { cursor: 'pointer' },
  cardImageWrapper: { position: 'relative', overflow: 'hidden', backgroundColor: '#f9f9f9' },
  cardImg: { width: '100%', height: '380px', objectFit: 'cover' },
  quickAddOverlay: { position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.8)', color: '#fff', textAlign: 'center', padding: '12px 0', fontSize: '14px', transform: 'translateY(100%)', transition: 'transform 0.3s ease' },
  // Note: For actual hover, you'd use a CSS file, but we'll stick to a clean static look here
  cardDetails: { padding: '20px 0' },
  cardCategory: { fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' },
  cardName: { fontSize: '16px', fontWeight: '500', margin: '8px 0' },
  cardPriceRow: { display: 'flex', justifyContent: 'space-between' },
  cardPrice: { fontWeight: '700' },
  cardRating: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' },

  sidebar: { position: 'fixed', right: 0, top: 0, height: '100%', width: '380px', backgroundColor: '#fff', zIndex: 2000, transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)' },
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1500 },
  sidebarHeader: { padding: '30px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' },
  sidebarBody: { flex: 1, overflowY: 'auto', padding: '30px' },
  cartItem: { display: 'flex', gap: '15px', marginBottom: '25px', alignItems: 'center' },
  cartItemImg: { width: '70px', height: '90px', objectFit: 'cover' },
  cartItemName: { fontSize: '14px', fontWeight: '600' },
  cartItemPrice: { fontSize: '13px', color: '#666', marginTop: '5px' },
  trashIcon: { color: '#ccc', cursor: 'pointer' },
  sidebarFooter: { padding: '30px', borderTop: '1px solid #f0f0f0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginBottom: '20px' },
  checkoutBtn: { width: '100%', padding: '18px', background: '#000', color: '#fff', border: 'none', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer' },
  
  clickable: { cursor: 'pointer' },
  emptyState: { textAlign: 'center', color: '#999', marginTop: '50px' }
};