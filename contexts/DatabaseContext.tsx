
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Reptile, Order, Address, User, Article, HeroSlide } from '../types';
import { db } from '../services/db';

interface DatabaseContextType {
  products: Reptile[];
  orders: Order[];
  addresses: Address[];
  users: User[];
  articles: Article[];
  heroSlides: HeroSlide[];
  addProduct: (product: Reptile) => void;
  deleteProduct: (id: number) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: number) => void;
  createOrder: (order: Order) => void;
  updateOrder: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  addArticle: (article: Article) => void;
  deleteArticle: (id: number) => void;
  saveHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: string) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  refreshData: () => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Reptile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  const refreshData = () => {
    setProducts(db.getProducts());
    setOrders(db.getOrders());
    setAddresses(db.getAddresses());
    setArticles(db.getArticles());
    setUsers(db.getUsers());
    setHeroSlides(db.getHeroSlides());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addProduct = (product: Reptile) => {
    const updated = db.saveProduct(product);
    setProducts([...updated]);
  };

  const deleteProduct = (id: number) => {
    const updated = db.deleteProduct(id);
    setProducts([...updated]);
  };

  const addAddress = (address: Address) => {
    const updated = db.saveAddress(address);
    setAddresses([...updated]);
  };

  const removeAddress = (id: number) => {
    const updated = db.deleteAddress(id);
    setAddresses([...updated]);
  };

  const addArticle = (article: Article) => {
    const updated = db.saveArticle(article);
    setArticles([...updated]);
  };

  const deleteArticle = (id: number) => {
    const updated = db.deleteArticle(id);
    setArticles([...updated]);
  };

  const saveHeroSlide = (slide: HeroSlide) => {
    const updated = db.saveHeroSlide(slide);
    setHeroSlides([...updated]);
  };

  const deleteHeroSlide = (id: string) => {
    const updated = db.deleteHeroSlide(id);
    setHeroSlides([...updated]);
  };

  const createOrder = (order: Order) => {
    db.saveOrder(order);
    refreshData();
  };

  const updateOrder = (id: string, status: Order['status']) => refreshData();
  const deleteOrder = (id: string) => refreshData();
  const updateUser = (user: User) => { db.saveUser(user); refreshData(); };
  const deleteUser = (id: string) => refreshData();

  return (
    <DatabaseContext.Provider value={{ 
      products, 
      orders, 
      addresses, 
      users,
      articles,
      heroSlides,
      addProduct, 
      deleteProduct, 
      addAddress,
      removeAddress,
      createOrder, 
      updateOrder, 
      deleteOrder,
      addArticle,
      deleteArticle,
      saveHeroSlide,
      deleteHeroSlide,
      updateUser,
      deleteUser,
      refreshData 
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDatabase must be used within a DatabaseProvider');
  return context;
};
