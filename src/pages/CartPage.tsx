import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'saved' | 'cart' | 'profile';

interface CartPageProps {
  cartIds: number[];
  onRemoveFromCart: (id: number) => void;
  onNavigate: (page: Page) => void;
}

export default function CartPage({ cartIds, onRemoveFromCart, onNavigate }: CartPageProps) {
  const cartItems = PRODUCTS.filter(p => cartIds.includes(p.id));
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(cartIds.map(id => [id, 1]))
  );
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const changeQty = (id: number, delta: number) => {
    setQuantities(prev => {
      const next = (prev[id] || 1) + delta;
      if (next < 1) return prev;
      return { ...prev, [id]: next };
    });
  };

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * (quantities[p.id] || 1), 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  if (orderPlaced) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-6 animate-scale-in">
          <Icon name="CheckCircle" size={40} className="text-primary" />
        </div>
        <h2 className="text-2xl font-black mb-2">Заказ оформлен!</h2>
        <p className="text-muted-foreground mb-8">
          Мы получили ваш заказ и скоро свяжемся с вами для подтверждения.
        </p>
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
        >
          Продолжить покупки
          <Icon name="ArrowRight" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">Корзина</h1>
        <p className="text-muted-foreground text-sm">
          {cartItems.length > 0 ? `${cartItems.length} товар${cartItems.length === 1 ? '' : cartItems.length < 5 ? 'а' : 'ов'}` : 'Пусто'}
        </p>
      </div>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-3">
            {cartItems.map(product => (
              <div
                key={product.id}
                className="flex gap-4 p-4 bg-card border border-border rounded-2xl animate-fade-in"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">{product.category}</p>
                  <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    {/* Qty */}
                    <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
                      <button
                        onClick={() => changeQty(product.id, -1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{quantities[product.id] || 1}</span>
                      <button
                        onClick={() => changeQty(product.id, 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {(product.price * (quantities[product.id] || 1)).toLocaleString('ru-RU')} ₽
                      </div>
                      {(quantities[product.id] || 1) > 1 && (
                        <div className="text-xs text-muted-foreground">{product.price.toLocaleString('ru-RU')} ₽ / шт</div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors self-start mt-1"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
              <h3 className="font-bold mb-4">Итого</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                  <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Промокод SALE10</span>
                    <span>−{discount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-primary font-medium">Бесплатно</span>
                </div>
              </div>

              <div className="border-t border-border pt-3 mb-4">
                <div className="flex justify-between font-black text-lg">
                  <span>К оплате</span>
                  <span>{total.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              {/* Promo */}
              <div className="flex gap-2 mb-4">
                <input
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="Промокод"
                  className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => { if (promoCode === 'SALE10') setPromoApplied(true); }}
                  className="px-3 py-2 bg-secondary border border-border rounded-xl text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  Применить
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-primary mb-3">✓ Промокод применён, скидка 10%</p>
              )}
              {promoCode && promoCode !== 'SALE10' && !promoApplied && (
                <p className="text-xs text-destructive mb-3">Неверный промокод</p>
              )}

              <button
                onClick={() => setOrderPlaced(true)}
                className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              >
                Оформить заказ
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Нажимая кнопку, вы соглашаетесь с условиями
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
            <Icon name="ShoppingCart" size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground text-sm mb-6 max-w-xs">
            Добавьте товары из каталога, чтобы оформить заказ
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
