import { useState } from 'react';
import Icon from '@/components/ui/icon';

const MOCK_ORDERS = [
  {
    id: '#10234',
    date: '20 апр 2026',
    status: 'delivered',
    statusLabel: 'Доставлен',
    items: ['Беспроводные наушники Pro Max'],
    total: 8990,
  },
  {
    id: '#10198',
    date: '14 апр 2026',
    status: 'processing',
    statusLabel: 'Обрабатывается',
    items: ['Смарт-часы Series 8', 'Коврик для йоги премиум'],
    total: 29790,
  },
  {
    id: '#10145',
    date: '2 апр 2026',
    status: 'delivered',
    statusLabel: 'Доставлен',
    items: ['Кофемашина автоматическая'],
    total: 32500,
  },
];

const STATUS_COLORS: Record<string, string> = {
  delivered: 'text-emerald-600 bg-emerald-50',
  processing: 'text-[#0D9488] bg-[#0D9488]/10',
  cancelled: 'text-red-500 bg-red-50',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [name, setName] = useState('Иван Иванов');
  const [email, setEmail] = useState('ivan@example.com');
  const [phone, setPhone] = useState('+7 900 123-45-67');
  const [saved, setSaved] = useState(false);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[#0D9488] flex items-center justify-center shrink-0">
            <span className="text-2xl font-black text-white">{name.charAt(0)}</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-[#111111]">{name}</h1>
            <p className="text-gray-400 text-sm">{email}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={12} className="text-[#EAB308] fill-[#EAB308]" />
              <span className="text-xs text-gray-400">Покупатель с апреля 2024</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 p-1 rounded-2xl mb-6 w-fit shadow-sm">
          {[
            { id: 'profile' as const, label: 'Профиль', icon: 'User' },
            { id: 'orders' as const, label: 'Заказы', icon: 'Package' },
            { id: 'settings' as const, label: 'Настройки', icon: 'Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'text-gray-400 hover:text-[#111111]'
              }`}
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 animate-fade-in shadow-sm">
            <h2 className="font-bold mb-5 text-[#111111]">Личные данные</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Имя и фамилия</label>
                <input
                  value={name}
                  onChange={e => { setName(e.target.value); setSaved(false); }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-colors text-[#111111]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Email</label>
                <input
                  value={email}
                  onChange={e => { setEmail(e.target.value); setSaved(false); }}
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-colors text-[#111111]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block font-medium">Телефон</label>
                <input
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setSaved(false); }}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0D9488] transition-colors text-[#111111]"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setSaved(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white font-semibold rounded-xl hover:bg-[#0b7a70] hover:scale-105 transition-all duration-200 text-sm"
                >
                  {saved ? <Icon name="Check" size={15} /> : <Icon name="Save" size={15} />}
                  {saved ? 'Сохранено' : 'Сохранить'}
                </button>
                {saved && <span className="text-xs text-[#0D9488] animate-fade-in">Изменения применены</span>}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-3 animate-fade-in">
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#111111]">{order.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>
                        {order.statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#111111]">{order.total.toLocaleString('ru-RU')} ₽</div>
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <Icon name="Package" size={13} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#0D9488]/40 hover:text-[#0D9488] transition-colors">
                    Подробнее
                  </button>
                  {order.status === 'delivered' && (
                    <button className="text-xs px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#0D9488]/40 hover:text-[#0D9488] transition-colors">
                      Повторить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 animate-fade-in space-y-5 shadow-sm">
            <h2 className="font-bold text-[#111111]">Настройки аккаунта</h2>

            {[
              { label: 'Email-уведомления о заказах', desc: 'Получать письма об изменении статуса' },
              { label: 'Push-уведомления', desc: 'Уведомления в браузере' },
              { label: 'Скидки и акции', desc: 'Информация о персональных предложениях' },
            ].map((item, i) => (
              <SettingToggle key={i} label={item.label} desc={item.desc} />
            ))}

            <div className="pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-red-400 text-sm hover:opacity-80 transition-opacity">
                <Icon name="LogOut" size={15} />
                Выйти из аккаунта
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingToggle({ label, desc }: { label: string; desc: string }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-[#111111]">{label}</div>
        <div className="text-xs text-gray-400">{desc}</div>
      </div>
      <button
        onClick={() => setEnabled(e => !e)}
        className={`relative w-10 h-6 rounded-full transition-all duration-300 ${
          enabled ? 'bg-[#0D9488]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${
            enabled ? 'left-5' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
