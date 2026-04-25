import ProductCard from '@/components/ProductCard';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'saved' | 'cart' | 'profile';

interface HomePageProps {
  savedIds: number[];
  cartIds: number[];
  onSave: (id: number) => void;
  onAddToCart: (id: number) => void;
  onNavigate: (page: Page) => void;
  onCategorySelect: (cat: string) => void;
}

export default function HomePage({ savedIds, cartIds, onSave, onAddToCart, onNavigate, onCategorySelect }: HomePageProps) {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/50 to-background border-b border-border">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/projects/ee7690b0-89af-4c27-826e-72750a4295f7/files/df9f3ccf-91a7-4338-a8dd-7b7a5d171ecd.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />

        <div className="relative container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/15 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Тысячи товаров и услуг
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
              Всё что нужно —<br />
              <span className="text-primary">в одном месте</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Товары, услуги, доставка. Лучшие предложения от проверенных продавцов.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 hover:scale-105 transition-all duration-200"
              >
                Перейти в каталог
                <Icon name="ArrowRight" size={18} />
              </button>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="flex -space-x-2">
                  {['🧑', '👩', '👨'].map((e, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs">
                      {e}
                    </div>
                  ))}
                </div>
                <span>50 000+ покупателей</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Категории</h2>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <button
              key={cat.id}
              onClick={() => { onCategorySelect(cat.id); onNavigate('catalog'); }}
              className="flex flex-col items-center gap-2 p-3 bg-card border border-border rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-[11px] font-medium text-center leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '50K+', label: 'Покупателей', icon: 'Users' },
              { value: '12K+', label: 'Товаров', icon: 'Package' },
              { value: '98%', label: 'Довольных', icon: 'ThumbsUp' },
              { value: '24/7', label: 'Поддержка', icon: 'Headphones' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <Icon name={stat.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-black text-lg leading-none">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Популярное</h2>
            <p className="text-sm text-muted-foreground">Что покупают прямо сейчас</p>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Все товары <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(product => (
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
      </section>

      {/* Banner */}
      <section className="container max-w-7xl mx-auto px-4 pb-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-primary/10 to-secondary border border-primary/20 p-8 md:p-12">
          <div className="absolute right-0 top-0 w-64 h-full opacity-20"
            style={{
              background: 'radial-gradient(circle at 80% 50%, hsl(22 90% 55%) 0%, transparent 70%)'
            }}
          />
          <div className="relative max-w-md">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Продаёте товары или услуги?
            </h2>
            <p className="text-muted-foreground mb-6">
              Разместите объявление бесплатно и получайте заказы уже сегодня.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-105">
              Стать продавцом
              <Icon name="ArrowRight" size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
