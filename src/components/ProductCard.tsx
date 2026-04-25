import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isService?: boolean;
}

interface ProductCardProps {
  product: Product;
  isSaved: boolean;
  onSave: (id: number) => void;
  onAddToCart: (id: number) => void;
  inCart: boolean;
}

export default function ProductCard({ product, isSaved, onSave, onAddToCart, inCart }: ProductCardProps) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden card-hover cursor-pointer animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 bg-primary text-primary-foreground rounded-md">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[11px] font-semibold px-2 py-0.5 bg-destructive text-destructive-foreground rounded-md">
              -{discount}%
            </span>
          )}
        </div>
        {/* Save btn */}
        <button
          onClick={e => { e.stopPropagation(); onSave(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 text-muted-foreground hover:text-primary backdrop-blur-sm'
          }`}
        >
          <Icon name={isSaved ? 'Heart' : 'Heart'} size={14} className={isSaved ? 'fill-current' : ''} />
        </button>
        {/* Service tag */}
        {product.isService && (
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] font-medium px-2 py-0.5 bg-background/80 backdrop-blur-sm text-foreground rounded-md border border-border">
              Услуга
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[11px] text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Icon name="Star" size={12} className="text-primary fill-primary" />
          <span className="text-xs font-semibold">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="font-bold text-base">{product.price.toLocaleString('ru-RU')} ₽</div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAddToCart(product.id); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              inCart
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105'
            }`}
          >
            <Icon name={inCart ? 'Check' : 'Plus'} size={14} />
            <span className="hidden sm:block">{inCart ? 'В корзине' : 'В корзину'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
