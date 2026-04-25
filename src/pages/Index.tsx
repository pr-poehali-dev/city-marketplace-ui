import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CityModal from '@/components/CityModal';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import SavedPage from '@/pages/SavedPage';
import CartPage from '@/pages/CartPage';
import ProfilePage from '@/pages/ProfilePage';

type Page = 'home' | 'catalog' | 'saved' | 'cart' | 'profile';

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [city, setCity] = useState<string | null>(null);
  const [cityModalOpen, setCityModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userCity');
    if (saved) {
      setCity(saved);
    } else {
      setCityModalOpen(true);
    }
  }, []);

  const handleCitySelect = (selected: string) => {
    setCity(selected);
    localStorage.setItem('userCity', selected);
    setCityModalOpen(false);
  };

  const toggleSave = (id: number) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleCart = (id: number) => {
    setCartIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const removeFromCart = (id: number) => {
    setCartIds(prev => prev.filter(i => i !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {cityModalOpen && <CityModal onSelect={handleCitySelect} />}
      <Navbar
        currentPage={page}
        onNavigate={setPage}
        cartCount={cartIds.length}
        savedCount={savedIds.length}
        city={city ?? 'Выбрать город'}
        onCityClick={() => setCityModalOpen(true)}
      />
      <main>
        {page === 'home' && (
          <HomePage
            savedIds={savedIds}
            cartIds={cartIds}
            onSave={toggleSave}
            onAddToCart={toggleCart}
            onNavigate={setPage}
            onCategorySelect={setActiveCategory}
          />
        )}
        {page === 'catalog' && (
          <CatalogPage
            savedIds={savedIds}
            cartIds={cartIds}
            onSave={toggleSave}
            onAddToCart={toggleCart}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
          />
        )}
        {page === 'saved' && (
          <SavedPage
            savedIds={savedIds}
            cartIds={cartIds}
            onSave={toggleSave}
            onAddToCart={toggleCart}
            onNavigate={setPage}
          />
        )}
        {page === 'cart' && (
          <CartPage
            cartIds={cartIds}
            onRemoveFromCart={removeFromCart}
            onNavigate={setPage}
          />
        )}
        {page === 'profile' && (
          <ProfilePage />
        )}
      </main>
    </div>
  );
}