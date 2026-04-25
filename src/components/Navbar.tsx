import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'saved' | 'cart' | 'profile';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  savedCount: number;
  city: string;
  onCityClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, cartCount, savedCount, city, onCityClick }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-[#0D9488] flex items-center justify-center">
            <span className="text-white font-black text-sm">М</span>
          </div>
          <span className="font-black text-lg tracking-tight text-[#111111] hidden sm:block">Маркет</span>
        </button>

        {/* City selector */}
        <button
          onClick={onCityClick}
          className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-[#0D9488] transition-colors shrink-0"
        >
          <Icon name="MapPin" size={14} className="text-[#0D9488]" />
          <span>{city}</span>
          <Icon name="ChevronDown" size={13} className="text-gray-400" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          {searchOpen ? (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 animate-scale-in">
              <Icon name="Search" size={16} className="text-gray-400 shrink-0" />
              <input
                autoFocus
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="Поиск товаров и услуг..."
                className="bg-transparent flex-1 text-sm outline-none text-[#111111] placeholder:text-gray-400"
                onBlur={() => { if (!searchValue) setSearchOpen(false); }}
              />
              {searchValue && (
                <button onClick={() => setSearchValue('')} className="text-gray-400 hover:text-gray-600">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 text-gray-400 hover:text-[#0D9488] transition-colors text-sm"
            >
              <Icon name="Search" size={16} />
              <span className="hidden md:block">Поиск...</span>
            </button>
          )}
        </div>

        {/* Nav actions */}
        <nav className="flex items-center gap-1">
          <NavBtn
            icon="LayoutGrid"
            label="Каталог"
            active={currentPage === 'catalog'}
            onClick={() => onNavigate('catalog')}
          />
          <NavBtn
            icon="Heart"
            label="Сохранённое"
            active={currentPage === 'saved'}
            onClick={() => onNavigate('saved')}
            badge={savedCount}
          />
          <NavBtn
            icon="ShoppingCart"
            label="Корзина"
            active={currentPage === 'cart'}
            onClick={() => onNavigate('cart')}
            badge={cartCount}
          />
          <NavBtn
            icon="User"
            label="Профиль"
            active={currentPage === 'profile'}
            onClick={() => onNavigate('profile')}
          />
        </nav>
      </div>
    </header>
  );
}

interface NavBtnProps {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}

function NavBtn({ icon, label, active, onClick, badge }: NavBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-200 group ${
        active
          ? 'text-[#0D9488] bg-[#0D9488]/10'
          : 'text-gray-400 hover:text-[#111111] hover:bg-gray-50'
      }`}
    >
      <div className="relative">
        <Icon name={icon} size={20} />
        {badge != null && badge > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#0D9488] text-white text-[10px] font-bold rounded-full flex items-center justify-center badge-glow">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium hidden sm:block">{label}</span>
    </button>
  );
}
