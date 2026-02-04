import React from 'react';
import { Filters } from '../pages/ShowcasePage';
// Fix: Import defaultSpecies and alias it as allSpecies to resolve the missing export error from constants.ts
import { defaultSpecies as allSpecies } from '../constants';

interface FilterSidebarProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters }) => {
    
    const toggleCategory = (cat: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const toggleSpecies = (sp: string) => {
        setFilters(prev => ({
            ...prev,
            species: prev.species.includes(sp)
                ? prev.species.filter(s => s !== sp)
                : [...prev.species, sp]
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, price: Number(e.target.value) }));
    };

    const handleStatusChange = (status: string) => {
        setFilters(prev => ({ ...prev, status }));
    };

    const categories = [
        { value: 'snake', label: 'الثعابين' },
        { value: 'lizard', label: 'السحالي' },
        { value: 'turtle', label: 'السلاحف' },
    ];

    const statuses = ['الكل', 'متوفر', 'قيد الحجز', 'غير متوفر'];

    return (
        <div className="glass-medium rounded-[2rem] p-8 space-y-10 sticky top-28 shadow-2xl border border-white/10">
            {/* Category Checkbox Group */}
            <div>
                <h4 className="font-black text-amber-400 mb-6 text-lg">الفئة</h4>
                <div className="space-y-4">
                    {categories.map(cat => (
                        <label key={cat.value} className="flex items-center space-x-3 space-x-reverse cursor-pointer group">
                            <div 
                                onClick={() => toggleCategory(cat.value)}
                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${filters.categories.includes(cat.value) ? 'bg-amber-500 border-amber-500' : 'border-white/20 group-hover:border-white/40'}`}
                            >
                                {filters.categories.includes(cat.value) && (
                                    <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <span className="text-gray-300 font-bold group-hover:text-white transition-colors">{cat.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10"></div>

            {/* Price Range Slider */}
            <div>
                <h4 className="font-black text-amber-400 mb-6 text-lg">السعر الأقصى</h4>
                <div className="space-y-5">
                    <input 
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={filters.price}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/10">
                        <span className="text-gray-400 text-sm font-bold">الميزانية:</span>
                        <span className="font-black font-poppins text-xl text-amber-300">
                            ${filters.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10"></div>

            {/* Species Multi-Dropdown Simulation */}
            <div>
                <h4 className="font-black text-amber-400 mb-6 text-lg">الفصيلة</h4>
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {allSpecies.map(sp => (
                        <label key={sp} className="flex items-center space-x-3 space-x-reverse cursor-pointer group">
                             <input 
                                type="checkbox"
                                checked={filters.species.includes(sp)}
                                onChange={() => toggleSpecies(sp)}
                                className="w-5 h-5 rounded border-white/20 bg-transparent text-amber-500 focus:ring-amber-500 cursor-pointer"
                            />
                            <span className="text-gray-400 text-sm font-bold group-hover:text-white transition-colors">{sp}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10"></div>

            {/* Availability Radio Group */}
            <div>
                <h4 className="font-black text-amber-400 mb-6 text-lg">حالة التوفر</h4>
                <div className="grid grid-cols-2 gap-3">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${filters.status === status ? 'bg-amber-500 border-amber-500 text-gray-900 shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>
            
            <button 
                onClick={() => setFilters({ categories: [], price: 10000, species: [], status: 'الكل' })}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-bold py-3 rounded-2xl transition-all border border-white/10"
            >
                تصفير الفلاتر
            </button>
        </div>
    );
};

export default FilterSidebar;