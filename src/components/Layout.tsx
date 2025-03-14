import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BildirimMenusu } from './BildirimMenusu';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Users,
  BarChart2,
  TrendingUp,
  FileText,
  Settings,
  LogOut,
  Sun,
  Building,
  Menu,
  X,
  Shield,
  Wrench,
  Zap,
  Activity,
  ClipboardList,
  Package
} from 'lucide-react';

export const Layout: React.FC = () => {
  const { kullanici, cikisYap } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAcik, setMenuAcik] = useState(false);

  const navigation = [
    { name: 'Anasayfa', href: '/anasayfa', icon: LayoutDashboard },
    ...(kullanici?.rol === 'bekci' ? [
      { name: 'Nöbet Kontrol', href: '/nobet-kontrol', icon: Shield }
    ] : [
      { name: 'Arızalar', href: '/arizalar', icon: AlertTriangle },
      { name: 'Stok Kontrol', href: '/stok-kontrol', icon: Package },
      {
        name: 'Aylık Bakım Kontrolleri',
        icon: ClipboardList,
        children: [
          { name: 'Yapılan İşler', href: '/yapilan-isler', icon: Wrench },
          { name: 'Elektrik Kesintileri', href: '/elektrik-kesintileri', icon: Zap },
          { name: 'İnvertör Kontrolleri', href: '/invertor-kontrol', icon: Activity },
          { name: 'Mekanik Bakım', href: '/mekanik-bakim', icon: Wrench },
          { name: 'Elektrik Bakım', href: '/elektrik-bakim', icon: Zap },
        ]
      },
      { name: 'Sahalar', href: '/sahalar', icon: Building },
      { name: 'İstatistikler', href: '/istatistikler', icon: BarChart2 },
      ...(kullanici?.rol !== 'musteri' ? [
        { name: 'Performans', href: '/performans', icon: TrendingUp }
      ] : []),
      { name: 'Raporlar', href: '/raporlar', icon: FileText },
      ...(kullanici?.rol === 'yonetici' ? [
        { name: 'Müşteriler', href: '/musteriler', icon: Users },
        { name: 'Ekip', href: '/ekip', icon: Users },
      ] : []),
    ]),
    { name: 'Ayarlar', href: '/ayarlar', icon: Settings },
  ];

  const handleCikis = async () => {
    try {
      await cikisYap();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  useEffect(() => {
    setMenuAcik(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuAcik) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuAcik]);

  const renderNavItem = (item: any, isChild = false) => {
    if (item.children) {
      return (
        <div key={item.name} className="space-y-1">
          <div className={`flex items-center px-2 py-2 text-sm font-medium ${
            item.children.some((child: any) => child.href === location.pathname)
              ? 'text-yellow-700'
              : 'text-gray-600'
          }`}>
            <item.icon className="h-5 w-5 mr-2" />
            {item.name}
          </div>
          <div className="pl-4 space-y-1">
            {item.children.map((child: any) => renderNavItem(child, true))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        to={item.href}
        className={`${
          location.pathname === item.href
            ? 'bg-yellow-50 text-yellow-700'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        } group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
          isChild ? 'ml-4' : ''
        }`}
      >
        <item.icon className={`${
          location.pathname === item.href
            ? 'text-yellow-500'
            : 'text-gray-400 group-hover:text-gray-500'
        } mr-3 h-5 w-5`} />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {menuAcik && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMenuAcik(false)}
        />
      )}

      <div className="sticky top-0 z-40 lg:hidden">
        <div className="bg-white shadow-sm">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setMenuAcik(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-3 flex items-center">
                <Sun className="h-8 w-8 text-yellow-500" />
                <div className="ml-2">
                  <h1 className="text-sm font-bold text-gray-900">EDEON ENERJİ</h1>
                  <p className="text-xs text-gray-600">Solar Enerjin</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <BildirimMenusu />
              <button
                onClick={handleCikis}
                className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto border-r border-gray-200">
              <div className="flex items-center flex-shrink-0 px-4">
                <Sun className="h-8 w-8 text-yellow-500" />
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">EDEON ENERJİ</h1>
                  <p className="text-sm text-gray-600">Solar Enerjin</p>
                </div>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map(item => renderNavItem(item))}
              </nav>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex items-center w-full">
                  <div>
                    <img
                      className="inline-block h-9 w-9 rounded-full"
                      src={kullanici?.fotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(kullanici?.ad || '')}`}
                      alt={kullanici?.ad}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">{kullanici?.ad}</p>
                    <p className="text-xs font-medium text-gray-500 capitalize">
                      {kullanici?.rol}
                    </p>
                  </div>
                  <button
                    onClick={handleCikis}
                    className="ml-auto p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-y-0 left-0 z-50 w-full sm:w-80 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
            menuAcik ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center">
                <Sun className="h-8 w-8 text-yellow-500" />
                <div className="ml-3">
                  <h1 className="text-lg font-bold text-gray-900">EDEON ENERJİ</h1>
                  <p className="text-sm text-gray-600">Solar Enerjin</p>
                </div>
              </div>
              <button
                onClick={() => setMenuAcik(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                {navigation.map(item => renderNavItem(item))}
              </nav>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-10 w-10 rounded-full"
                    src={kullanici?.fotoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(kullanici?.ad || '')}`}
                    alt={kullanici?.ad}
                  />
                </div>
                <div className="ml-3">
                  <p className="text-base font-medium text-gray-700">{kullanici?.ad}</p>
                  <p className="text-sm font-medium text-gray-500 capitalize">{kullanici?.rol}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mt-0 lg:mt-0">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};