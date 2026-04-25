import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/data/products';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'saved' | 'cart' | 'profile';

interface SavedPageProps {
  savedIds: number[];
  cartIds: number[];
  onSave: (id: number) => void;
  onAddToCart: (id: number) => void;
  onNavigate: (page: Page) => void;
}

export default function SavedPage({ savedIds, cartIds, onSave, onAddToCart, onNavigate }: SavedPageProps) {
  const saved = PRODUCTS.filter(p => savedIds.includes(p.id));

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">Сохранённое</h1>
        <p className="text-muted-foreground text-sm">
          {saved.length > 0 ? `${saved.length} товар${saved.length === 1 ? '' : saved.length < 5 ? 'а' : 'ов'}` : 'Пусто'}
        </p>
      </div>

      {saved.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {saved.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={true}
              inCart={cartIds.includes(product.id)}
              onSave={onSave}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
            <Icon name="Heart" size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Здесь пока пусто</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            Нажмите на сердечко на карточке товара, чтобы добавить в сохранённое
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
          >
            Перейти в каталог
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
