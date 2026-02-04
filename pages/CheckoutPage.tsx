
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Page } from '../App';
import { useAuth } from '../hooks/useAuth';
import { useDatabase } from '../contexts/DatabaseContext';
import { Order } from '../types';

interface CheckoutPageProps {
    setPage: (page: Page) => void;
    setLastOrderId: (id: string) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ setPage, setLastOrderId }) => {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const { createOrder } = useDatabase();
    const total = getCartTotal();
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate a small delay for "Realism"
        setTimeout(() => {
            const newOrderId = `RH-${Math.floor(1000 + Math.random() * 9000)}`;
            const order: Order = {
                id: newOrderId,
                date: new Date().toISOString().split('T')[0],
                status: 'تم التأكيد',
                total: total,
                items: cart.map(item => ({
                    reptileId: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    imageUrl: item.imageUrl
                }))
            };

            createOrder(order);
            setLastOrderId(newOrderId);
            clearCart();
            setIsProcessing(false);
            setPage('orderConfirmation');
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <h2 className="text-3xl font-black mb-4">سلتك فارغة</h2>
                <button onClick={() => setPage('showcase')} className="text-amber-500 font-bold hover:underline">العودة للتسوق</button>
            </div>
        );
    }
    
    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-black text-center mb-12">إتمام الطلب</h1>
            <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row-reverse gap-8">
                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="glass-dark border border-white/10 rounded-[2rem] p-8 sticky top-24 space-y-6 shadow-2xl">
                        <h2 className="text-2xl font-black">ملخص طلبك</h2>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                             {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"/>
                                            <span className="absolute -top-2 -right-2 bg-amber-500 text-gray-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg">x{item.quantity}</span>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm leading-tight">{item.name}</p>
                                            <p className="text-[10px] text-gray-500 font-poppins">${item.price}</p>
                                        </div>
                                    </div>
                                    <span className="font-poppins font-black text-amber-500">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                             ))}
                        </div>
                        <div className="border-t border-white/10 pt-4">
                            <div className="flex justify-between text-2xl font-black">
                                <span>الإجمالي</span>
                                <span className="text-amber-500 font-poppins">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="lg:w-2/3 glass-medium border border-white/10 rounded-[2rem] p-8 md:p-12 space-y-10 shadow-xl">
                    <section>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center text-sm">1</span>
                            معلومات الشحن
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input type="text" placeholder="الاسم الأول" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" />
                             <input type="text" placeholder="الاسم الأخير" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" />
                            <input type="email" defaultValue={user?.email || ''} placeholder="البريد الإلكتروني" required className="md:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" />
                            <input type="text" placeholder="العنوان بالتفصيل (شارع، بناية، طابق)" required className="md:col-span-2 w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all" />
                        </div>
                    </section>

                     <section>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-amber-500 text-gray-900 flex items-center justify-center text-sm">2</span>
                            تفاصيل الدفع
                        </h2>
                        <div className="grid grid-cols-1 gap-5">
                             <div className="relative">
                                <input type="text" placeholder="رقم البطاقة (0000 0000 0000 0000)" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-poppins" />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-1">
                                    <div className="w-8 h-5 bg-white/10 rounded"></div>
                                    <div className="w-8 h-5 bg-white/10 rounded"></div>
                                </div>
                             </div>
                            <div className="grid grid-cols-2 gap-5">
                               <input type="text" placeholder="MM / YY" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-poppins text-center" />
                               <input type="text" placeholder="CVC" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-poppins text-center" />
                            </div>
                        </div>
                    </section>

                    <button 
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full font-black py-5 px-6 rounded-2xl transition-all shadow-2xl relative overflow-hidden group ${isProcessing ? 'bg-gray-700 cursor-not-allowed' : 'bg-amber-500 text-gray-900 hover:bg-amber-400'}`}
                    >
                        {isProcessing ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري معالجة الطلب...
                            </span>
                        ) : (
                            <>
                                <span className="relative z-10 text-xl">تأكيد ودفع ${total.toFixed(2)}</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </>
                        )}
                    </button>
                    <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">جميع المعاملات مشفرة وآمنة تماماً</p>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
