
import React, { useState, useMemo } from 'react';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Order } from '../../types';
import TabsSystem, { TabItem } from '../../components/TabSystem';
import { TrashIcon, PackageIcon } from '../../components/icons';

const OrdersManagementPage: React.FC = () => {
    const { orders, updateOrder, deleteOrder } = useDatabase();
    const [activeTab, setActiveTab] = useState('pending');
    
    const orderTabs: TabItem[] = [
      { id: 'pending', label: 'قيد الانتظار', icon: '⏳', badge: orders.filter(o => o.status === 'تم التأكيد' || o.status === 'قيد المعالجة').length },
      { id: 'shipped', label: 'تم الشحن', icon: '🚚', badge: orders.filter(o => o.status === 'تم الشحن').length },
      { id: 'completed', label: 'مكتملة', icon: '✅' }
    ];

    const filteredOrders = useMemo(() => {
      switch (activeTab) {
        case 'shipped': return orders.filter(o => o.status === 'تم الشحن');
        case 'completed': return orders.filter(o => o.status === 'تم التوصيل');
        default: return orders.filter(o => o.status === 'تم التأكيد' || o.status === 'قيد المعالجة');
      }
    }, [activeTab, orders]);

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        updateOrder(orderId, newStatus);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('⚠️ تحذير: هل أنت متأكد من حذف هذا الطلب نهائياً من السجلات؟ لا يمكن التراجع عن هذه الخطوة.')) {
            deleteOrder(id);
        }
    };
    
    const getStatusSelectClasses = (status: Order['status']) => {
        switch (status) {
            case 'تم التوصيل': return 'bg-green-500/10 text-green-400 border-green-500/20';
            case 'تم الشحن': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'قيد المعالجة': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'تم التأكيد': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="animate-fade-in space-y-8">
            <h1 className="text-4xl font-bold">إدارة الطلبات</h1>
            
            <TabsSystem tabs={orderTabs} activeTabId={activeTab} onChange={setActiveTab} />

            <div className="glass-medium rounded-[2.5rem] p-6 border border-white/10 shadow-2xl overflow-hidden bg-[#11141b]/60">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                <th className="p-6">رقم الطلب</th>
                                <th className="p-6">التاريخ</th>
                                <th className="p-6">المنتجات</th>
                                <th className="p-6">الإجمالي</th>
                                <th className="p-6 text-center">الحالة</th>
                                <th className="p-6 text-left">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="hover:bg-white/5 transition-all group">
                                    <td className="p-6 font-poppins font-black text-white">#{order.id}</td>
                                    <td className="p-6 text-gray-400 text-sm font-bold">{order.date}</td>
                                    <td className="p-6">
                                        <div className="flex -space-x-3 space-x-reverse">
                                            {order.items.slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="relative group/item">
                                                    <img 
                                                        src={item.imageUrl} 
                                                        className="w-10 h-10 rounded-full border-2 border-[#11141b] object-cover shadow-xl group-hover/item:scale-110 transition-transform" 
                                                        title={item.name}
                                                    />
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-[#11141b] flex items-center justify-center text-[10px] font-black text-amber-500">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-6 font-poppins font-black text-amber-500 text-lg">${order.total.toFixed(2)}</td>
                                    <td className="p-6 w-52">
                                        <div className="relative">
                                            <select 
                                                value={order.status} 
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                                className={`text-[10px] font-black rounded-xl block w-full p-3 focus:ring-2 focus:ring-amber-500/50 outline-none transition-all uppercase appearance-none text-center cursor-pointer border ${getStatusSelectClasses(order.status)}`}
                                            >
                                                <option value="تم التأكيد">تم التأكيد</option>
                                                <option value="قيد المعالجة">قيد المعالجة</option>
                                                <option value="تم الشحن">تم الشحن</option>
                                                <option value="تم التوصيل">تم التوصيل</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex justify-start opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => handleDelete(order.id)}
                                                className="p-3 bg-red-500/10 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all border border-red-500/10"
                                                title="حذف الطلب"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredOrders.length === 0 && (
                        <div className="p-20 text-center">
                            <PackageIcon className="w-16 h-16 text-gray-700 mx-auto mb-4 opacity-20" />
                            <p className="text-gray-500 font-bold">لا توجد طلبات في هذه الفئة حالياً</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrdersManagementPage;
