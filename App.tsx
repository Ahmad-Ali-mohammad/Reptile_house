
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import ShowcasePage from './pages/ShowcasePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersHistoryPage from './pages/OrdersHistoryPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import WarrantyPage from './pages/WarrantyPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BlogPage from './pages/BlogPage';
import ArticleDetailsPage from './pages/ArticleDetailsPage';
import ServicesPage from './pages/ServicesPage';
import QuickCart from './components/QuickCart';
import BottomNavigation from './components/BottomNavigation';
import DashboardLayout from './pages/admin/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { CartProvider } from './contexts/CartContext';
import { PreferencesProvider } from './contexts/PreferencesContext';
import { DatabaseProvider } from './contexts/DatabaseContext';
import { useAuth } from './hooks/useAuth';

export type Page = 'home' | 'login' | 'register' | 'profile' | 'wishlist' | 'showcase' | 'orders' | 'cart' | 'checkout' | 'orderConfirmation' | 'orderTracking' | 'forgotPassword' | 'resetPassword' | 'about' | 'contact' | 'shippingPolicy' | 'returnPolicy' | 'warranty' | 'privacy' | 'terms' | 'dashboard' | 'blog' | 'services' | string;
export type AppMode = 'user' | 'dashboard';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [appMode, setAppMode] = useState<AppMode>('user');
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const { user } = useAuth();

  const setPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const isAdminRoute = currentPage.startsWith('dashboard');
    if (isAdminRoute) {
        if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
            setPage('home');
            setAppMode('user');
        } else {
            setAppMode('dashboard');
        }
    } else {
        setAppMode('user');
    }
  }, [currentPage, user]);

  const renderPage = () => {
    if (currentPage.startsWith('product/')) {
        const id = parseInt(currentPage.split('/')[1]);
        return <ProductDetailsPage productId={id} setPage={setPage} />;
    }
    if (currentPage.startsWith('article/')) {
        const id = parseInt(currentPage.split('/')[1]);
        return <ArticleDetailsPage articleId={id} setPage={setPage} />;
    }

    switch (currentPage) {
      case 'login': return <LoginPage setPage={setPage as any} />;
      case 'register': return <RegisterPage setPage={setPage as any} />;
      case 'profile': return <ProfilePage setPage={setPage as any} />;
      case 'wishlist': return <WishlistPage setPage={setPage as any} />;
      case 'showcase': return <ShowcasePage setPage={setPage as any} />;
      case 'orders': return <OrdersHistoryPage setPage={setPage as any} />;
      case 'cart': return <CartPage setPage={setPage as any} />;
      case 'checkout': return <CheckoutPage setPage={setPage as any} setLastOrderId={setLastOrderId} />;
      case 'orderConfirmation': return <OrderConfirmationPage setPage={setPage as any} orderId={lastOrderId} />;
      case 'orderTracking': return <OrderTrackingPage setPage={setPage as any} orderId={lastOrderId || 'RH-1025'} />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'shippingPolicy': return <ShippingPolicyPage />;
      case 'returnPolicy': return <ReturnPolicyPage />;
      case 'warranty': return <WarrantyPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'blog': return <BlogPage setPage={setPage as any} />;
      case 'services': return <ServicesPage />;
      case 'home':
      default: return <HomePage setPage={setPage as any} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col pb-20 md:pb-0 relative">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-40 -z-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920')", filter: 'blur(10px) brightness(0.3)'}}></div>
        
        {appMode === 'dashboard' ? (
            <DashboardLayout setAppMode={setAppMode} />
        ) : (
            <>
                <Header setPage={setPage as any} setAppMode={setAppMode} />
                <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
                    {renderPage()}
                </main>
                <Footer setPage={setPage as any} />
                <QuickCart setPage={setPage as any} />
                <BottomNavigation currentPage={currentPage} setPage={setPage} user={user} />
            </>
        )}
    </div>
  );
};

const App: React.FC = () => (
    <PreferencesProvider>
        <DatabaseProvider>
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        <AppContent />
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </DatabaseProvider>
    </PreferencesProvider>
);

export default App;
