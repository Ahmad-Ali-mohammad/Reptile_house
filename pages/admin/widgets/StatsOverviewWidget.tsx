import React from 'react';
// FIX: Import `ClipboardListIcon` to resolve reference error.
import { PackageIcon, ShoppingCartIcon, UserIcon, ClipboardListIcon } from '../../../components/icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center space-x-4 space-x-reverse">
        <div className="bg-amber-500/20 text-amber-300 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-400">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const StatsOverviewWidget: React.FC = () => {
    const stats = [
        { title: "إجمالي المبيعات", value: "$12,450", icon: <ShoppingCartIcon className="w-6 h-6" /> },
        { title: "إجمالي الطلبات", value: "350", icon: <ClipboardListIcon className="w-6 h-6" /> },
        { title: "العملاء الجدد", value: "85", icon: <UserIcon className="w-6 h-6" /> },
        { title: "المنتجات المتاحة", value: "68", icon: <PackageIcon className="w-6 h-6" /> },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
        </div>
    );
};

export default StatsOverviewWidget;