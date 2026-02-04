
import React, { useState, useRef, useMemo } from 'react';
import { useDatabase } from '../../contexts/DatabaseContext';
import { Reptile } from '../../types';
import { PlusIcon, BoxIcon, StarIcon } from '../../components/icons';
import { DashboardPage } from './DashboardLayout';
import { defaultCategories, defaultSpecies } from '../../constants';

interface NewProductPageProps {
    setActivePage: (page: DashboardPage) => void;
}

const NewProductPage: React.FC<NewProductPageProps> = ({ setActivePage }) => {
    const { addProduct, products } = useDatabase();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const existingCategories = useMemo(() => {
        // Fix: Explicitly type Set as <string> to ensure loop variable 'c' is not inferred as 'unknown'
        const cats = new Set<string>(products.map(p => p.category));
        const combined = [...defaultCategories];
        cats.forEach(c => {
            if (!combined.find(dc => dc.value === c)) {
                combined.push({ value: c as any, label: c });
            }
        });
        return combined;
    }, [products]);

    const existingSpecies = useMemo(() => {
        const specSet = new Set<string>([...defaultSpecies, ...products.map(p => p.species)]);
        return Array.from(specSet).sort();
    }, [products]);

    const [formData, setFormData] = useState<Partial<Reptile>>({
        name: '',
        species: existingSpecies[0] || '',
        price: 0,
        imageUrl: '',
        category: 'snake',
        status: 'متوفر',
        isAvailable: true,
        rating: 5.0,
        description: ''
    });

    const [isNewCategory, setIsNewCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');
    const [isNewSpecies, setIsNewSpecies] = useState(false);
    const [customSpecies, setCustomSpecies] = useState('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const finalCategory = isNewCategory ? customCategory : formData.category;
        const finalSpecies = isNewSpecies ? customSpecies : formData.species;

        if (!finalCategory || !finalSpecies || !formData.imageUrl) {
            alert('يرجى التأكد من ملء جميع الحقول ورفع صورة');
            setIsSubmitting(false);
            return;
        }

        setTimeout(() => {
            const newProduct: Reptile = {
                ...formData as Reptile,
                category: finalCategory as any,
                species: finalSpecies,
                id: Date.now(),
            };
            addProduct(newProduct);
            setIsSubmitting(false);
            setActivePage('products');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in pb-20">
            <h1 className="text-4xl font-black mb-10 text-white">إضافة مخلوق جديد</h1>
            
            <form onSubmit={handleSubmit} className="glass-dark border border-white/10 rounded-[2.5rem] p-10 space-y-10 shadow-2xl bg-[#11141b]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Image Upload Zone */}
                    <div className="md:col-span-1 space-y-4">
                        <label className="text-xs font-black text-amber-500 uppercase tracking-widest block">صورة المخلوق</label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square w-full rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500/50 transition-all overflow-hidden relative group"
                        >
                            {formData.imageUrl ? (
                                <>
                                    <img src={formData.imageUrl} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <span className="text-white text-xs font-black bg-amber-500 px-4 py-2 rounded-xl">تغيير الصورة</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <PlusIcon className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                                    <p className="text-xs text-gray-400 font-bold">اضغط للرفع</p>
                                </div>
                            )}
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                        
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                            <label className="text-xs font-black text-gray-500 uppercase block">تقييم مبدئي</label>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="range" min="1" max="5" step="0.1" 
                                    value={formData.rating} 
                                    onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                                    className="flex-1 accent-amber-500"
                                />
                                <span className="font-poppins font-black text-amber-500 flex items-center gap-1">
                                    {formData.rating?.toFixed(1)} <StarIcon className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Fields */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">اسم المخلوق</label>
                            <input 
                                required
                                type="text"
                                className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                placeholder="مثلاً: لونا، التنين الأحمر"
                            />
                        </div>

                        {/* Species Select */}
                        <div className="col-span-2 sm:col-span-1">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">الفصيلة</label>
                            {!isNewSpecies ? (
                                <select 
                                    className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer text-white"
                                    value={formData.species}
                                    onChange={e => {
                                        if (e.target.value === 'add_new') {
                                            setIsNewSpecies(true);
                                        } else {
                                            setFormData({...formData, species: e.target.value});
                                        }
                                    }}
                                >
                                    {existingSpecies.map(s => <option key={s} value={s}>{s}</option>)}
                                    <option value="add_new" className="text-amber-500 font-bold">+ إضافة فصيلة جديدة...</option>
                                </select>
                            ) : (
                                <div className="flex gap-2">
                                    <input 
                                        autoFocus
                                        type="text"
                                        placeholder="اكتب اسم الفصيلة..."
                                        className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                                        value={customSpecies}
                                        onChange={e => setCustomSpecies(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setIsNewSpecies(false)}
                                        className="p-4 bg-white/5 rounded-xl text-gray-400 hover:text-white"
                                    >✕</button>
                                </div>
                            )}
                        </div>

                        {/* Category Select */}
                        <div className="col-span-2 sm:col-span-1">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">الفئة</label>
                            {!isNewCategory ? (
                                <select 
                                    className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 appearance-none cursor-pointer text-white"
                                    value={formData.category}
                                    onChange={e => {
                                        if (e.target.value === 'add_new') {
                                            setIsNewCategory(true);
                                        } else {
                                            setFormData({...formData, category: e.target.value as any});
                                        }
                                    }}
                                >
                                    {existingCategories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    <option value="add_new" className="text-amber-500 font-bold">+ إضافة فئة جديدة...</option>
                                </select>
                            ) : (
                                <div className="flex gap-2">
                                    <input 
                                        autoFocus
                                        type="text"
                                        placeholder="اسم الفئة..."
                                        className="flex-1 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 text-white"
                                        value={customCategory}
                                        onChange={e => setCustomCategory(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setIsNewCategory(false)}
                                        className="p-4 bg-white/5 rounded-xl text-gray-400 hover:text-white"
                                    >✕</button>
                                </div>
                            )}
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">السعر الأساسي ($)</label>
                            <input 
                                required
                                type="number"
                                className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 font-poppins font-black text-white"
                                value={formData.price}
                                onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                            />
                        </div>
                        
                        <div className="col-span-2 sm:col-span-1">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">حالة التوفر</label>
                            <select 
                                className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer text-white"
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value as any, isAvailable: e.target.value === 'متوفر'})}
                            >
                                <option value="متوفر">متوفر للبيع</option>
                                <option value="قيد الحجز">قيد الحجز لعميل</option>
                                <option value="غير متوفر">غير متوفر حالياً</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2 block">وصف تفصيلي</label>
                            <textarea 
                                rows={5}
                                className="w-full bg-[#1a1c23] border border-white/10 rounded-xl p-4 outline-none focus:ring-2 focus:ring-amber-500/50 resize-none text-white"
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                placeholder="اكتب تفاصيل عن صحة الزاحف..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex-1 bg-amber-500 text-gray-900 font-black py-5 rounded-2xl hover:bg-amber-400 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                    >
                        {isSubmitting ? 'جاري الإضافة...' : 'اعتماد وإدراج في المتجر'}
                    </button>
                    <button 
                        type="button"
                        onClick={() => setActivePage('products')}
                        className="px-10 bg-white/5 text-gray-400 font-bold rounded-2xl hover:bg-white/10 transition-all border border-white/5"
                    >
                        إلغاء
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProductPage;
