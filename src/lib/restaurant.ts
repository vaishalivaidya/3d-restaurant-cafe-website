/**
 * Restaurant Brand & Contact Configuration
 * All values are editable placeholders for easy personalization.
 */

export interface RestaurantConfig {
  name: string;
  tagline: string;
  subheading: string;
  address: {
    street: string;
    suite: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    fullFormatted: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    whatsAppNumber: string;
    whatsAppDisplay: string;
  };
  openingHours: {
    days: string;
    time: string;
    kitchenCloses: string;
  }[];
  links: {
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  chef: {
    name: string;
    title: string;
    experienceYears: number;
    signatureCuisine: string;
    speciality: string;
    bio: string;
    quote: string;
  };
}

export const RESTAURANT_DATA: RestaurantConfig = {
  name: "Ember & Craft",
  tagline: "Crafted With Passion. Served With Flavor.",
  subheading: "Fresh ingredients. Bold flavors. Made for unforgettable moments.",
  address: {
    street: "742 Evergreen Promenade",
    suite: "Suite 100",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "United States",
    fullFormatted: "742 Evergreen Promenade, Suite 100, San Francisco, CA 94107",
  },
  contact: {
    phone: "+15557428390",
    phoneDisplay: "+1 (555) 742-8390",
    email: "concierge@emberandcraftdining.com",
    whatsAppNumber: "+15557428390",
    whatsAppDisplay: "+1 (555) 742-8390",
  },
  openingHours: [
    {
      days: "Monday – Thursday",
      time: "11:00 AM – 10:30 PM",
      kitchenCloses: "10:00 PM",
    },
    {
      days: "Friday – Saturday",
      time: "11:00 AM – 11:30 PM",
      kitchenCloses: "11:00 PM",
    },
    {
      days: "Sunday",
      time: "11:00 AM – 10:00 PM",
      kitchenCloses: "9:30 PM",
    },
  ],
  links: {
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086381285324!2d-122.4217785!3d37.7766048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=San+Francisco+CA",
    instagram: "https://instagram.com/emberandcraft",
    facebook: "https://facebook.com/emberandcraft",
    youtube: "https://youtube.com/@emberandcraft",
  },
  social: {
    instagram: "https://instagram.com/emberandcraft",
    facebook: "https://facebook.com/emberandcraft",
    twitter: "https://twitter.com/emberandcraft",
  },
  stats: [
    { label: "Wood-Fired Temperature", value: "900°F" },
    { label: "Dry-Aged Beef Blend", value: "45 Days" },
    { label: "Fermentation Time", value: "72 Hours" },
    { label: "Handcrafted Recipes", value: "100%" },
  ],
  chef: {
    name: "Executive Chef Matteo Rossi",
    title: "Culinary Director & Master Pizzaiolo",
    experienceYears: 18,
    signatureCuisine: "Neo-Artisanal Fire-Grilled & Slow-Fermented Hearth Fare",
    speciality: "Dry-Aged Smash Patties & 72-Hour Naturally Leavened Sourdough Crusts",
    bio: "With nearly two decades of culinary mastery across Michelin-starred kitchens in Milan, London, and San Francisco, Chef Matteo combines ancient wood-fired techniques with contemporary culinary alchemy. Every ingredient is ethically sourced from local regenerative farms, cured in-house, and cooked over cured oak and cherrywood embers.",
    quote: "Cooking over fire is not merely a cooking method—it is an elemental language that transforms pristine ingredients into soul-stirring memories.",
  },
};
