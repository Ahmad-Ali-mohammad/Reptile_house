
import React, { useState } from 'react';
import { AppMode } from '../../App';
import Sidebar from './Sidebar';
import AdminDashboardPage from './AdminDashboardPage';
import ProductsManagementPage from './ProductsManagementPage';
import OrdersManagementPage from './OrdersManagementPage';
import AnalyticsPage from './AnalyticsPage';
import InventoryPage from './InventoryPage';
import ShippingPage from './ShippingPage';
import NewProductPage from './NewProductPage';
import UsersManagementPage from './UsersManagementPage';
import MediaLibraryPage from './MediaLibraryPage';
import BlogManagementPage from './BlogManagementPage';
import HeroManagementPage from './HeroManagementPage';
import { MenuIcon } from '../../components/icons';

export type DashboardPage = 'dashboard' | 'analytics' | 'products' | 'newProduct' | 'inventory' | 'orders' | 'shipping' | 'users' | 'media' | 'blog_mgmt' | 'hero_mgmt';

interface DashboardLayoutProps {
    setAppMode: (mode: AppMode) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ setAppMode }) => {
    const [activePage, setActivePage] = useState<DashboardPage>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (activePage) {
            case 'analytics': return <AnalyticsPage />;
            case 'products': return <ProductsManagementPage />;
            case 'newProduct': return <NewProductPage setActivePage={setActivePage as any} />;
            case 'inventory': return <InventoryPage />;
            case 'orders': return <OrdersManagementPage />;
            case 'shipping': return <ShippingPage />;
            case 'users': return <UsersManagementPage />;
            case 'media': return <MediaLibraryPage />;
            case 'blog_mgmt': return <BlogManagementPage />;
            case 'hero_mgmt': return <HeroManagementPage />;
            case 'dashboard':
            default: return <AdminDashboardPage />;
        }
    };

    const getPageTitle = () => {
        switch (activePage) {
            case 'analytics': return 'الإحصائيات والتحليلات';
            case 'products': return 'إدارة المنتجات';
            case 'newProduct': return 'إضافة منتج جديد';
            case 'inventory': return 'إدارة المخزون';
            case 'orders': return 'إدارة الطلبات';
            case 'shipping': return 'الشحن والتوصيل';
            case 'users': return 'إدارة المستخدمين';
            case 'media': return 'مكتبة الوسائط';
            case 'blog_mgmt': return 'إدارة المدونة والمحتوى';
            case 'hero_mgmt': return 'إدارة واجهة الموقع الرئيسية';
            default: return 'لوحة التحكم الرئيسية';
        }
    }

    return (
        <div className="relative z-50 flex h-screen bg-[#0a0c10] overflow-hidden text-right" dir="rtl">
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            <div className={`fixed inset-y-0 right-0 z-[70] transform transition-transform duration-500 ease-out lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <Sidebar activePage={activePage} setActivePage={(p) => { setActivePage(p); setIsSidebarOpen(false); }} setAppMode={setAppMode} />
            </div>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="flex items-center justify-between p-6 bg-gray-900/40 backdrop-blur-md border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white/5 rounded-xl text-amber-500">
                            <MenuIcon className="w-6 h-6" />
                        </button>
                        <div className="hidden lg:block">
                            <h1 className="text-xl font-black text-white">{getPageTitle()}</h1>
                        </div>
                    </div>
                    <div className="text-sm font-bold text-gray-500 font-poppins">{new Date().toLocaleDateString('ar-SY')}</div>
                </header>

                <main className="flex-1 p-6 md:p-10 overflow-y-auto scrollbar-hide bg-gradient-to-b from-transparent to-gray-900/20">
                    <div className="max-w-6xl mx-auto animate-fade-in">{renderContent()}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
