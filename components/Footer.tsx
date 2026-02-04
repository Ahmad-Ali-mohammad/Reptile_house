
import React from 'react';
import { Page } from '../App';

interface FooterProps {
    setPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setPage }) => {
  const handleNav = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    setPage(page);
  };

  return (
    <footer className="bg-black/30 backdrop-filter backdrop-blur-lg border-t border-white/10 mt-16 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-right">
          {/* Brand Identity */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-amber-400 font-cairo tracking-tighter">Reptile House</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              بإدارة سيمون شلش. متجرك الأول للزواحف الفريدة في دمشق. نقدم جودة ورعاية لا مثيل لهما لجميع عشاق هذه المخلوقات المذهلة.
            </p>
            <div className="flex justify-start gap-4 pt-2">
                <a href="https://www.facebook.com/share/1EupNJpz48/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href="https://www.instagram.com/reptile_hou" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-amber-500 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.002 8a3.315 3.315 0 100 6.63 3.315 3.315 0 000-6.63zm5.49-3.75a1.238 1.238 0 100 2.475 1.238 1.238 0 000-2.475z" /></svg>
                </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-amber-500/20 pb-2 w-fit">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleNav(e, 'home')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> الرئيسية</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'showcase')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> معرض الزواحف</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'blog')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> المدونة التعليمية</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'about')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> من نحن</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'contact')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> اتصل بنا</a></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b border-amber-500/20 pb-2 w-fit">السياسات والضمان</h4>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => handleNav(e, 'shippingPolicy')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> سياسة الشحن والتوصيل</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'returnPolicy')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> سياسة الإرجاع</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'warranty')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> الضمان والصحة</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'privacy')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> سياسة الخصوصية</a></li>
              <li><a href="#" onClick={(e) => handleNav(e, 'terms')} className="text-gray-400 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm font-bold"><span>•</span> الشروط والأحكام</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white border-b border-amber-500/20 pb-2 w-fit">النشرة البريدية</h4>
            <p className="text-gray-400 text-sm">اشترك ليصلك كل جديد وعروض حصرية من سيمون شلش.</p>
            <form className="flex group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني"
                className="w-full bg-white/5 border border-white/10 rounded-s-2xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all text-sm"
              />
              <button className="bg-amber-500 text-gray-900 font-black px-6 rounded-e-2xl hover:bg-amber-400 transition-all shadow-lg active:scale-95 text-xs">
                إرسال
              </button>
            </form>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">الموقع متاح للتصفح والطلب</span>
            </div>
            
            <div className="text-center space-y-2">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">تصميم وتطوير</p>
                <a 
                    href="https://www.instagram.com/ahmad_el_mohammad" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all"
                >
                    <span className="text-white font-black text-xs font-poppins">Ahmad El-Mohammad</span>
                </a>
            </div>

            <div className="text-center text-gray-600 mt-6 pb-4">
              <p className="text-[10px] font-bold">&copy; {new Date().getFullYear()} Reptile House Damascus. جميع الحقوق محفوظة.</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
