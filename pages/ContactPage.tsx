
import React from 'react';
import { PhoneIcon, MailIcon, FacebookIcon } from '../components/icons';

const ContactPage: React.FC = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
        // Here you would typically handle form submission, e.g., send data to an API
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div>
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4">تواصل معنا</h1>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    هل لديك سؤال أو استفسار؟ فريقنا مستعد لمساعدتك.
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-center space-x-4 space-x-reverse">
                        <PhoneIcon className="w-8 h-8 text-amber-400" />
                        <div>
                            <h3 className="font-bold text-lg">الهاتف</h3>
                            <a href="tel:+963993595766" className="text-gray-300 hover:text-white" dir="ltr">+963 993 595 766</a>
                        </div>
                    </div>
                     <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-center space-x-4 space-x-reverse">
                        <MailIcon className="w-8 h-8 text-amber-400" />
                        <div>
                            <h3 className="font-bold text-lg">البريد الإلكتروني</h3>
                            <a href="mailto:info@reptilehouse.sy" className="text-gray-300 hover:text-white">info@reptilehouse.sy</a>
                        </div>
                    </div>
                     <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-center space-x-4 space-x-reverse">
                        <FacebookIcon className="w-8 h-8 text-amber-400" />
                        <div>
                            <h3 className="font-bold text-lg">تابعنا</h3>
                            <a href="https://www.facebook.com/share/1EupNJpz48/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">فيسبوك</a>
                            <span className="text-gray-400 mx-2">|</span>
                            <a href="https://www.instagram.com/reptile_hou" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">انستغرام</a>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-filter backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="الاسم الكامل" required className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="email" placeholder="البريد الإلكتروني" required className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="tel" placeholder="رقم الهاتف (اختياري)" className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="text" placeholder="الموضوع" className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <textarea placeholder="رسالتك..." required rows={4} className="w-full bg-white/10 border border-white/20 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea>
                        <button type="submit" className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-amber-400 transition-colors">
                            إرسال
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
