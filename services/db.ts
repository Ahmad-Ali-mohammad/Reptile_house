
import { Reptile, Order, Address, User, Article, HeroSlide } from '../types';
import { featuredReptiles, mockOrders, mockAddresses } from '../constants';

const PRODUCTS_KEY = 'rh_products';
const ORDERS_KEY = 'rh_orders';
const ADDRESSES_KEY = 'rh_addresses';
const USERS_KEY = 'rh_users';
const ARTICLES_KEY = 'rh_articles';
const HERO_KEY = 'rh_hero_slides';

const initialHeroSlides: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&q=80&w=1200',
    title: 'اكتشف عالم الزواحف المذهل',
    subtitle: 'مجموعة فريدة من الزواحف الصحية والجميلة من جميع أنحاء العالم.',
    buttonText: 'تصفح المعرض',
    link: 'showcase',
    active: true
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1548332159-21915998797e?auto=format&fit=crop&q=80&w=1200',
    title: 'جودة ورعاية لا مثيل لهما',
    subtitle: 'بإشراف الخبير سيمون شلش، نضمن لك أفضل رعاية لحيوانك الأليف.',
    buttonText: 'خدماتنا',
    link: 'services',
    active: true
  }
];

export const db = {
  getProducts: (): Reptile[] => {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(featuredReptiles));
      return featuredReptiles;
    }
    return JSON.parse(data);
  },

  saveProduct: (product: Reptile) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id && p.id !== 0);
    let updated;
    if (index > -1) {
      products[index] = product;
      updated = products;
    } else {
      const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      updated = [{ ...product, id: nextId }, ...products];
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteProduct: (id: number) => {
    const products = db.getProducts().filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return products;
  },

  getHeroSlides: (): HeroSlide[] => {
    const data = localStorage.getItem(HERO_KEY);
    if (!data) {
        localStorage.setItem(HERO_KEY, JSON.stringify(initialHeroSlides));
        return initialHeroSlides;
    }
    return JSON.parse(data);
  },

  saveHeroSlide: (slide: HeroSlide) => {
    const slides = db.getHeroSlides();
    const index = slides.findIndex(s => s.id === slide.id);
    let updated;
    if (index > -1) {
        slides[index] = slide;
        updated = slides;
    } else {
        updated = [...slides, { ...slide, id: `slide-${Date.now()}` }];
    }
    localStorage.setItem(HERO_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteHeroSlide: (id: string) => {
    const slides = db.getHeroSlides().filter(s => s.id !== id);
    localStorage.setItem(HERO_KEY, JSON.stringify(slides));
    return slides;
  },

  getArticles: (): Article[] => {
    const data = localStorage.getItem(ARTICLES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveArticle: (article: Article) => {
    const articles = db.getArticles();
    const index = articles.findIndex(a => a.id === article.id);
    let updated;
    if (index > -1) {
      articles[index] = article;
      updated = articles;
    } else {
      updated = [{ ...article, id: Date.now() }, ...articles];
    }
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(updated));
    return updated;
  },

  // Added deleteArticle to fix Error in contexts/DatabaseContext.tsx
  deleteArticle: (id: number) => {
    const articles = db.getArticles().filter(a => a.id !== id);
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    return articles;
  },

  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) users[index] = user;
    else users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  },

  getAddresses: (): Address[] => {
    const data = localStorage.getItem(ADDRESSES_KEY);
    if (!data) {
      localStorage.setItem(ADDRESSES_KEY, JSON.stringify(mockAddresses));
      return mockAddresses;
    }
    return JSON.parse(data);
  },

  saveAddress: (address: Address) => {
    const addresses = db.getAddresses();
    if (address.isDefault) addresses.forEach(a => a.isDefault = false);
    const index = addresses.findIndex(a => a.id === address.id);
    let updated = index > -1 ? (addresses[index] = address, addresses) : [address, ...addresses];
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
    return updated;
  },

  // Added deleteAddress to fix Error in contexts/DatabaseContext.tsx
  deleteAddress: (id: number) => {
    const addresses = db.getAddresses().filter(a => a.id !== id);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
    return addresses;
  },

  getOrders: (): Order[] => {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(mockOrders));
      return mockOrders;
    }
    return JSON.parse(data);
  },

  saveOrder: (order: Order) => {
    const orders = db.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders;
  }
};
