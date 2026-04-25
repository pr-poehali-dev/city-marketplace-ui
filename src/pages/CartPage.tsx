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
      <div className="bg-[#f5f5f5] min-h-screen flex items-center justify-center">
        <div className="container max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-[#0D9488]/15 border-2 border-[#0D9488]/30 flex items-center justify-center mb-6 animate-scale-in">
            <Icon name="CheckCircle" size={40} className="text-[#0D9488]" />
          </div>
          <h2 className="text-2xl font-black mb-2 text-[#111111]">Заказ оформлен!</h2>
          <p className="text-gray-400 mb-8">
            Мы получили ваш заказ и скоро свяжемся с вами для подтверждения.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0b7a70] transition-all hover:scale-105"
          >
            Продолжить покупки
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#111111] mb-1">Корзина</h1>
          <p className="text-gray-400 text-sm">
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
                  className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl animate-fade-in shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-0.5">{product.category}</p>
                    <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 text-[#111111]">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-xl p-1">
                        <button
                          onClick={() => changeQty(product.id, -1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-[#111111]"
                        >
                          <Icon name="Minus" size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-[#111111]">{quantities[product.id] || 1}</span>
                        <button
                          onClick={() => changeQty(product.id, 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white transition-colors text-[#111111]"
                        >
                          <Icon name="Plus" size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${product.oldPrice ? 'text-[#EAB308]' : 'text-[#111111]'}`}>
                          {(product.price * (quantities[product.id] || 1)).toLocaleString('ru-RU')} ₽
                        </div>
                        {(quantities[product.id] || 1) > 1 && (
                          <div className="text-xs text-gray-400">{product.price.toLocaleString('ru-RU')} ₽ / шт</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(product.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors self-start mt-1"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:w-80 shrink-0">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24 shadow-sm">
                <h3 className="font-bold mb-4 text-[#111111]">Итого</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Товары ({cartItems.length})</span>
                    <span className="text-[#111111]">{subtotal.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-[#0D9488]">
                      <span>Промокод SALE10</span>
                      <span>−{discount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Доставка</span>
                    <span className="text-[#0D9488] font-medium">Бесплатно</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3 mb-4">
                  <div className="flex justify-between font-black text-lg text-[#111111]">
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
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none text-[#111111] placeholder:text-gray-400 focus:border-[#0D9488] transition-colors"
                  />
                  <button
                    onClick={() => { if (promoCode === 'SALE10') setPromoApplied(true); }}
                    className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium hover:border-[#0D9488]/40 hover:text-[#0D9488] transition-colors"
                  >
                    Применить
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-xs text-[#0D9488] mb-3">✓ Промокод применён, скидка 10%</p>
                )}
                {promoCode && promoCode !== 'SALE10' && !promoApplied && (
                  <p className="text-xs text-red-400 mb-3">Неверный промокод</p>
                )}

                <button
                  onClick={() => setOrderPlaced(true)}
                  className="w-full py-3 bg-[#0D9488] text-white font-bold rounded-xl hover:bg-[#0b7a70] hover:scale-105 transition-all duration-200"
                >
                  Оформить заказ
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Нажимая кнопку, вы соглашаетесь с условиями
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm">
              <Icon name="ShoppingCart" size={32} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-[#111111]">Корзина пуста</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="flex items-center gap-2 px-6 py-3 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0b7a70] transition-all hover:scale-105"
            >
              Перейти в каталог
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
