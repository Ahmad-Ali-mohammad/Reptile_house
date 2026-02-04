
import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedReptiles from '../components/FeaturedReptiles';
import SocialSection from '../components/SocialSection';
import ReptileCard from '../components/ReptileCard';
import { useDatabase } from '../contexts/DatabaseContext';
import { Page } from '../App';

interface HomePageProps {
    setPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { products } = useDatabase();
  const featured = products.find(p => p.rating >= 4.9) || products[0];

  return (
    <>
      <Hero setPage={setPage as any} />
      <Categories />
      
      {/* Featured Big Card Highlight */}
      {featured && (
        <section className="mb-20">
            <h2 className="text-4xl font-black mb-10 text-center">عرض خاص</h2>
            <ReptileCard reptile={featured} variant="featured" setPage={setPage} />
        </section>
      )}

      <FeaturedReptiles reptiles={products.slice(0, 6)} setPage={setPage} />
      <SocialSection />
    </>
  );
};

export default HomePage;
