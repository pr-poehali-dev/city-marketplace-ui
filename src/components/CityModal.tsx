import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CITIES = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Уфа', 'Ростов-на-Дону',
  'Краснодар', 'Омск', 'Воронеж', 'Пермь', 'Волгоград',
];

interface CityModalProps {
  onSelect: (city: string) => void;
}

export default function CityModal({ onSelect }: CityModalProps) {
  const [search, setSearch] = useState('');

  const filtered = CITIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-[#0D9488] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">Выберите город</h2>
              <p className="text-white/75 text-sm">Для показа актуальных предложений</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
            <Icon name="Search" size={16} className="text-gray-400 shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Найти город..."
              className="bg-transparent flex-1 text-sm outline-none text-[#111111] placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Cities list */}
        <div className="overflow-y-auto max-h-72 px-3 py-3">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-1.5">
              {filtered.map(city => (
                <button
                  key={city}
                  onClick={() => onSelect(city)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-left text-[#111111] hover:bg-[#0D9488]/10 hover:text-[#0D9488] transition-all duration-150 group"
                >
                  <Icon name="MapPin" size={13} className="text-gray-300 group-hover:text-[#0D9488] shrink-0 transition-colors" />
                  {city}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400 text-sm">
              Город не найден
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 pt-2 border-t border-gray-100">
          <button
            onClick={() => onSelect('Москва')}
            className="w-full py-2.5 text-sm text-gray-400 hover:text-[#0D9488] transition-colors"
          >
            Пропустить — использовать Москву
          </button>
        </div>
      </div>
    </div>
  );
}
