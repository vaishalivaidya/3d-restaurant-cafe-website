import React from 'react';
import { CartProvider } from './lib/cartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BurgerStory } from './components/BurgerStory';
import { BurgerExplodedLab } from './components/BurgerExplodedLab';
import { SectionSnapController } from './components/SectionSnapController';
import { PizzaExperience } from './components/PizzaExperience';
import { Menu } from './components/Menu';
import { SignatureDish } from './components/SignatureDish';
import { About } from './components/About';
import { Chef } from './components/Chef';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { OnlineOrderSection } from './components/OnlineOrderSection';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { OrderCartModal } from './components/OrderCartModal';

export default function App() {
  return (
    <CartProvider>
      <div className="restaurant-app-wrapper">
        {/* Navigation Top Bar */}
        <Navbar />

        {/* 1. Cinematic Hero Section with Interactive 3D Burger */}
        <main>
          <Hero />

          {/* 2. "From Ingredients to Plate" 3D Burger Story */}
          <BurgerStory />

          {/* 2.5 3D Exploded Burger & Looping Cinematic GIF Studio */}
          <BurgerExplodedLab />

          {/* Snap-to-section controller with smooth cinematic fade between Burger and Pizza */}
          <SectionSnapController />

          {/* 3. Handcrafted Pizza 3D Experience */}
          <PizzaExperience />

          {/* 4. Interactive Artisanal Menu */}
          <Menu />

          {/* 5. Signature Dish 3D Product Showcase with Annotations */}
          <SignatureDish />

          {/* 6. About Us (More Than Food. It's an Experience.) */}
          <About />

          {/* 7. Professional Chef Section */}
          <Chef />

          {/* 8. Restaurant Experience Gallery */}
          <Gallery />

          {/* 9 & 10. Location, Hours, Contact Actions & Interactive Google Map */}
          <Location />

          {/* 11. Table Reservation Section */}
          <ReservationSection />

          {/* 12. Online Order Channels Section */}
          <OnlineOrderSection />
        </main>

        {/* 13. Elegant Dark Footer */}
        <Footer />

        {/* Modals & Drawers */}
        <OrderCartModal />
        <ReservationSection isModal={true} />
      </div>
    </CartProvider>
  );
}
