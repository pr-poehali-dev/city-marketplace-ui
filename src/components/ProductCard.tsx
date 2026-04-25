import Icon from '@/components/ui/icon';

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
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover cursor-pointer animate-fade-in shadow-sm">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#0D9488] text-white rounded-md">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md badge-sale">
              -{discount}%
            </span>
          )}
        </div>
        {/* Save btn */}
        <button
          onClick={e => { e.stopPropagation(); onSave(product.id); }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? 'bg-[#0D9488] text-white'
              : 'bg-white/90 text-gray-400 hover:text-[#0D9488] shadow-sm'
          }`}
        >
          <Icon name="Heart" size={14} className={isSaved ? 'fill-current' : ''} />
        </button>
        {/* Service tag */}
        {product.isService && (
          <div className="absolute bottom-2 left-2">
            <span className="text-[11px] font-medium px-2 py-0.5 bg-white/90 text-[#111111] rounded-md border border-gray-200">
              Услуга
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[11px] text-gray-400 mb-1">{product.category}</p>
        <h3 className="font-medium text-sm leading-snug mb-2 line-clamp-2 text-[#111111]">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Icon name="Star" size={12} className="text-[#EAB308] fill-[#EAB308]" />
          <span className="text-xs font-semibold text-[#111111]">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price + Cart */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className={`font-bold text-base ${product.oldPrice ? 'text-[#EAB308]' : 'text-[#111111]'}`}>
              {product.price.toLocaleString('ru-RU')} ₽
            </div>
            {product.oldPrice && (
              <div className="text-xs text-gray-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
          <button
            onClick={e => { e.stopPropagation(); onAddToCart(product.id); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              inCart
                ? 'bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/30'
                : 'bg-[#0D9488] text-white hover:bg-[#0b7a70] hover:scale-105'
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
