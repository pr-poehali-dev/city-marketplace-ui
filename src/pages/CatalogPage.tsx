import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import Icon from '@/components/ui/icon';

interface CatalogPageProps {
  savedIds: number[];
  cartIds: number[];
  onSave: (id: number) => void;
  onAddToCart: (id: number) => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
}

const SORT_OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price_asc', label: 'Сначала дешевле' },
  { value: 'price_desc', label: 'Сначала дороже' },
  { value: 'rating', label: 'По рейтингу' },
];

export default function CatalogPage({
  savedIds, cartIds, onSave, onAddToCart, activeCategory, onCategorySelect
}: CatalogPageProps) {
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#111111] mb-1">Каталог</h1>
          <p className="text-gray-400 text-sm">{PRODUCTS.length} товаров и услуг</p>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-52 shrink-0 hidden lg:block">
            <div className="bg-white border border-gray-100 rounded-2xl p-4 sticky top-24 shadow-sm">
              <h3 className="font-bold text-sm mb-3 text-[#111111]">Категории</h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onCategorySelect(cat.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                      activeCategory === cat.id
                        ? 'bg-[#0D9488]/10 text-[#0D9488] font-semibold'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#111111]'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Filters bar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {/* Mobile categories scroll */}
              <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 flex-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => onCategorySelect(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all shrink-0 ${
                      activeCategory === cat.id
                        ? 'bg-[#0D9488] text-white font-semibold'
                        : 'bg-white border border-gray-200 text-gray-500'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-auto shrink-0">
                {/* Search */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
                  <Icon name="Search" size={14} className="text-gray-400" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Поиск..."
                    className="bg-transparent text-sm outline-none w-36 text-[#111111] placeholder:text-gray-400"
                  />
                </div>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#111111] outline-none cursor-pointer shadow-sm"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-400 mb-4">
              Найдено: <span className="font-semibold text-[#111111]">{filtered.length}</span>
            </p>

            {/* Grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={savedIds.includes(product.id)}
                    inCart={cartIds.includes(product.id)}
                    onSave={onSave}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="font-bold text-lg mb-2 text-[#111111]">Ничего не нашлось</h3>
                <p className="text-gray-400 text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
                <button
                  onClick={() => { setSearch(''); onCategorySelect('all'); }}
                  className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm hover:border-[#0D9488]/40 hover:text-[#0D9488] transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
