import diamondRingImg from '../assets/diamond_solitaire_ring_1784644337248.jpg';
import emeraldRingImg from '../assets/emerald_halo_ring_1784644353333.jpg';
import rubyNecklaceImg from '../assets/ruby_vintage_necklace_1784644369061.jpg';
import sapphirePendantImg from '../assets/sapphire_royal_pendant_1784644382835.jpg';
import diamondBraceletImg from '../assets/diamond_tennis_bracelet_1784644396249.jpg';
import goldWatchImg from '../assets/luxury_gold_watch_1784644409000.jpg';
import diamondEarringsImg from '../assets/diamond_stud_earrings_1784644423394.jpg';

export const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Timepieces'];

export const METALS = [
  { id: 'yellow-gold', name: '18K Yellow Gold', color: '#D4AF37' },
  { id: 'white-gold', name: '18K White Gold', color: '#E5E4E2' },
  { id: 'rose-gold', name: '18K Rose Gold', color: '#E0A96D' },
  { id: 'platinum', name: 'Platinum 950', color: '#F0F0F0' },
];

export const GEMSTONES = [
  { id: 'diamond', name: 'Brilliant Diamond', color: '#E2F7FC', pricePerCarat: 4500 },
  { id: 'emerald', name: 'Colombian Emerald', color: '#00A86B', pricePerCarat: 3800 },
  { id: 'ruby', name: 'Burmese Ruby', color: '#E0115F', pricePerCarat: 4100 },
  { id: 'sapphire', name: 'Ceylon Sapphire', color: '#0F52BA', pricePerCarat: 3600 },
];

export const PRODUCTS = [
  {
    id: 'aura-01',
    name: 'Eternal Solitaire Diamond Ring',
    category: 'Rings',
    price: 4850,
    rating: 4.9,
    reviewsCount: 42,
    image: diamondRingImg,
    metal: 'white-gold',
    stone: 'diamond',
    carats: 1.5,
    description: 'A masterpiece of classic elegance featuring a 1.5-carat GIA-certified round brilliant cut diamond set upon a handcrafted 18K white gold band.',
    details: [
      'Center Stone: 1.5 Carat Diamond (Color F, Clarity VS1)',
      'Metal: 18K White Gold or Platinum',
      'Cut: Excellent Round Brilliant',
      'Certificate: GIA Certified #28194',
      'Lifetime Warranty & Annual Polishing Included'
    ],
    isBestseller: true,
    isNew: true
  },
  {
    id: 'aura-02',
    name: 'Imperial Emerald Halo Ring',
    category: 'Rings',
    price: 6200,
    rating: 5.0,
    reviewsCount: 28,
    image: emeraldRingImg,
    metal: 'yellow-gold',
    stone: 'emerald',
    carats: 2.1,
    description: 'An enchanting 2.1-carat vivid green Colombian emerald surrounded by a sparkling halo of round brilliant diamonds set in rich 18K yellow gold.',
    details: [
      'Center Stone: 2.1 Carat Natural Emerald',
      'Halo Diamonds: 0.45 tcw Round Brilliant',
      'Metal: 18K Yellow Gold',
      'Origin: Muzo Mines, Colombia',
      'Conflict-Free Sourcing Guarantee'
    ],
    isBestseller: true,
    isNew: false
  },
  {
    id: 'aura-03',
    name: 'Vintage Royale Ruby Pendant',
    category: 'Necklaces',
    price: 5400,
    rating: 4.8,
    reviewsCount: 19,
    image: rubyNecklaceImg,
    metal: 'platinum',
    stone: 'ruby',
    carats: 1.8,
    description: 'Inspired by 1920s Art Deco grandeur, featuring a cushion-cut Burmese ruby draped in a delicate cluster of marquise diamonds on an 18-inch platinum chain.',
    details: [
      'Center Stone: 1.8 Carat Pigeon Blood Ruby',
      'Chain Length: 18 inch adjustable platinum chain',
      'Accent Diamonds: 0.35 tcw',
      'Clasp: Custom lobster safety mechanism'
    ],
    isBestseller: false,
    isNew: true
  },
  {
    id: 'aura-04',
    name: 'Celestial Sapphire Drop Necklace',
    category: 'Necklaces',
    price: 7800,
    rating: 4.9,
    reviewsCount: 33,
    image: sapphirePendantImg,
    metal: 'white-gold',
    stone: 'sapphire',
    carats: 3.0,
    description: 'A deep royal blue 3.0-carat Ceylon sapphire framed with intricate diamond filigree, radiating unmatched brilliance and majestic grandeur.',
    details: [
      'Center Stone: 3.0 Carat Ceylon Sapphire',
      'Side Diamonds: 0.60 tcw VVS Clarity',
      'Metal: 18K White Gold',
      'Certificate: SSEF Gemstone Passport'
    ],
    isBestseller: true,
    isNew: false
  },
  {
    id: 'aura-05',
    name: 'Lumière Diamond Tennis Bracelet',
    category: 'Bracelets',
    price: 8900,
    rating: 5.0,
    reviewsCount: 56,
    image: diamondBraceletImg,
    metal: 'white-gold',
    stone: 'diamond',
    carats: 5.0,
    description: 'The pinnacle of fine wristwear. 5.0 total carat weight of perfectly matched round brilliant diamonds seamlessly linked in an ultra-fluid 18K white gold line.',
    details: [
      'Total Carat Weight: 5.0 tcw (45 diamonds)',
      'Diamond Grade: Color F-G, Clarity VS',
      'Closure: Dual-plunger safety latch',
      'Standard Length: 7.0 inches (custom sizing available)'
    ],
    isBestseller: true,
    isNew: true
  },
  {
    id: 'aura-06',
    name: 'AURA Sovereign 18K Gold Chronograph',
    category: 'Timepieces',
    price: 14500,
    rating: 4.9,
    reviewsCount: 15,
    image: goldWatchImg,
    metal: 'yellow-gold',
    stone: 'diamond',
    carats: 0.8,
    description: 'Haute Horlogerie Swiss automatic movement encased in 18K solid yellow gold with an iridescent mother-of-pearl dial and diamond hour indices.',
    details: [
      'Movement: Swiss Automatic Calibre AURA-88 (48hr power reserve)',
      'Case Diameter: 38mm 18K Yellow Gold',
      'Dial: Natural White Mother of Pearl with 12 Diamond Markers',
      'Water Resistance: 50 meters (5 ATM)',
      'Glass: Anti-reflective scratch-proof Sapphire Crystal'
    ],
    isBestseller: false,
    isNew: true
  },
  {
    id: 'aura-07',
    name: 'Radiant Diamond Stud Earrings',
    category: 'Earrings',
    price: 3200,
    rating: 4.9,
    reviewsCount: 67,
    image: diamondEarringsImg,
    metal: 'platinum',
    stone: 'diamond',
    carats: 1.0,
    description: 'Timeless 1.0 total carat weight diamond studs held securely in platinum four-prong basket settings with double-notched posts for maximum security.',
    details: [
      'Total Carat Weight: 1.0 tcw (0.5ct per stud)',
      'Setting: 4-Prong Platinum',
      'Backings: La Pousette Security Friction Backs',
      'Clarity: VS2, Color: E'
    ],
    isBestseller: true,
    isNew: false
  }
];

export const PROMO_CODES = {
  'AURA10': 0.10,
  'ROYAL20': 0.20,
  'WELCOME15': 0.15
};
