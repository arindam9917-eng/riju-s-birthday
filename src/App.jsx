import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Customizer from './components/Customizer';
import TryOnModal from './components/TryOnModal';
import RingSizer from './components/RingSizer';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import VIPBookingModal from './components/VIPBookingModal';
import StorySection from './components/StorySection';
import Footer from './components/Footer';

import { PRODUCTS } from './data/products';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('catalog');
  const [cartItems, setCartItems] = useState([
    {
      ...PRODUCTS[0],
      quantity: 1,
      ringSize: '7',
      selectedMetal: 'white-gold'
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState(['aura-02', 'aura-05']);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [tryOnProduct, setTryOnProduct] = useState(null);

  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');

  const [toastMessage, setToastMessage] = useState(null);

  // Currency Conversion Rates
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£';
  const currencyRate = currency === 'USD' ? 1 : currency === 'EUR' ? 0.92 : 0.79;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart Actions
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedMetal === product.selectedMetal && item.ringSize === product.ringSize);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedMetal === product.selectedMetal && item.ringSize === product.ringSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`" ${product.name} " added to your Shopping Bag`);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from saved vault`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`" ${product.name} " saved to your vault`);
    }
  };

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          background: 'rgba(12, 13, 20, 0.95)',
          border: '1px solid var(--gold-primary)',
          backdropFilter: 'blur(16px)',
          color: '#FFF',
          padding: '14px 22px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--gold-glow)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.88rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <CheckCircle2 size={18} color="var(--gold-primary)" />
          {toastMessage}
        </div>
      )}

      {/* Navbar Header */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Banner Section */}
      <Hero
        onExploreClick={() => {
          setActiveSection('catalog');
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onCustomizerClick={() => {
          setActiveSection('customizer');
          document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onTryOnClick={() => setTryOnProduct(PRODUCTS[0])}
      />

      {/* High Collection Catalog */}
      <Catalog
        products={PRODUCTS}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        wishlistIds={wishlistIds}
        onTryOn={(p) => setTryOnProduct(p)}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Bespoke Interactive Customizer Studio */}
      <Customizer
        onAddToCart={handleAddToCart}
        onTryOnCustom={(p) => setTryOnProduct(p)}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      {/* Interactive Ring Size Guide */}
      <RingSizer />

      {/* Heritage & Brand Story */}
      <StorySection />

      {/* Footer */}
      <Footer onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Modals & Drawers */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(quickViewProduct.id)}
          onTryOn={(p) => setTryOnProduct(p)}
          currencySymbol={currencySymbol}
          currencyRate={currencyRate}
        />
      )}

      {tryOnProduct && (
        <TryOnModal
          product={tryOnProduct}
          onClose={() => setTryOnProduct(null)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onAddToCart={handleAddToCart}
        currencySymbol={currencySymbol}
        currencyRate={currencyRate}
      />

      <VIPBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

    </div>
  );
}
