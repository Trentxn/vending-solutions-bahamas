// ============================================================
// Single source of truth for ALL site copy.
// Text comes from the client's Word document. Edit here, not in pages.
// ============================================================
import {
  Banknote,
  Building2,
  Wrench,
  CalendarCheck,
  Zap,
  ShieldCheck,
  Sparkles,
  ListChecks,
  MapPin,
  Headset,
  Leaf,
  Hospital,
  Hotel,
  Palmtree,
  Landmark,
  GraduationCap,
  Factory,
  PiggyBank,
  PhoneCall,
  Store,
  Warehouse,
  Plane,
  Armchair,
  CupSoda,
  Cookie,
  Salad,
  ClipboardCheck,
  Lightbulb,
  Truck,
  RefreshCw,
  SprayCan,
  Container,
  Droplets,
  BadgeCheck,
} from 'lucide-react'

export const site = {
  name: 'Vending Solutions Bahamas',
  shortName: 'Vending Solutions',
  tagline: 'Premium vending, fully managed, at no cost to your business.',
  established: 2012,
  serviceArea: 'Nassau & Paradise Island',
}

export const nav = [
  { label: 'Machines', to: '/machines' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const hero = {
  headline: 'Premium Vending Solutions for Businesses Throughout The Bahamas',
  subheading:
    'Providing fully managed snack, beverage, and coffee vending services at no cost to your business.',
  primaryCta: { label: 'Request a Free Site Survey', to: '/contact#survey' },
  secondaryCta: { label: 'Contact Us', to: '/contact' },
}

export const trustBar = [
  { icon: CalendarCheck, label: 'Established 2012' },
  { icon: MapPin, label: 'Bahamian-owned & operated' },
  { icon: Banknote, label: '$0 cost to your business' },
  { icon: RefreshCw, label: 'Weekly restocking' },
]

export const about = {
  story: [
    'Vending Solutions Bahamas is a Bahamian-owned company, established in 2012, specializing in the supply and management of vending equipment throughout Nassau & Paradise Island.',
    'We offer a traditional as well as a hot drink vending service. Our traditional service places cold drinks and snacks in a single, temperature-zoned machine; our hot drink service offers a minimum of fifteen self-contained selections, guaranteed to satisfy the discerning user or curious observer.',
    'Every placement comes with professional installation, weekly stocking and maintenance, and reliable customer service. Hosting our equipment conveys the right image as the ideal break and meeting room accessory, and it costs you nothing.',
  ],
  mission:
    'At Vending Solutions Bahamas, we are committed to delivering convenient, reliable, and high-quality vending services while providing exceptional customer support and premium products to our customers.',
  vision:
    'It is our vision to remain the most sought-after vending equipment service provider through sustainable relationships with host locations, reliability, professionalism, and innovation. We have partnered with one of the world’s leading manufacturers of vending equipment, with a presence in more than fifty countries worldwide.',
  standards:
    'Our equipment was subject to quality testing and environmental management concepts established in strict accordance with international standards ISO-9001 and ISO-14001.',
  goals: [
    { icon: Sparkles, text: 'Introduce high-quality, first-to-market vending equipment' },
    { icon: Salad, text: 'Offer healthy as well as fun foods' },
    { icon: BadgeCheck, text: 'Usher in a new standard for quality vending services' },
  ],
}

export const services = {
  snack: {
    title: 'Snack & Beverage Vending',
    summary:
      'Cold drinks and snacks together in one temperature-zoned machine, with over thirty selections stocked to match your location.',
    features: [
      'Cold beverages',
      'Chips',
      'Chocolate',
      'Cookies',
      'Healthy snacks',
      'Juice',
      'Water',
      'Energy drinks',
    ],
  },
  coffee: {
    title: 'Coffee Vending',
    summary:
      'Barista-quality hot drinks, brewed fresh from whole beans, with 15 to 18 selections at the press of a button.',
    features: [
      'Freshly ground coffee beans',
      'Espresso',
      'Cappuccino',
      'Hazelnut',
      'Hot chocolate',
      'French vanilla',
    ],
    selections: '15-18 beverage selections',
  },
}

export const whyChooseUs = [
  { icon: Banknote, title: 'No Cost Installation', text: 'We provide, install, and own the equipment. You just host it.' },
  { icon: ClipboardCheck, title: 'Fully Managed Service', text: 'Stocking, cleaning, and cash handling, all handled by us.' },
  { icon: RefreshCw, title: 'Weekly Restocking', text: 'Machines stay full, fresh, and ready for your team.' },
  { icon: Wrench, title: 'Preventative Maintenance', text: 'Scheduled upkeep keeps downtime near zero.' },
  { icon: Zap, title: 'Fast Service Calls', text: 'Trained technicians respond quickly when you need us.' },
  { icon: Sparkles, title: 'Modern Equipment', text: 'First-to-market machines with the latest technology.' },
  { icon: BadgeCheck, title: 'Quality Products', text: 'Premium snacks and beverages your people recognize.' },
  { icon: ListChecks, title: 'Custom Product Selection', text: 'Menus tailored to your location and preferences.' },
  { icon: MapPin, title: 'Reliable Local Company', text: 'Bahamian-owned and serving Nassau since 2012.' },
  { icon: Headset, title: '24-Hour Help Desk', text: 'Round-the-clock technical support, whenever it matters.' },
  { icon: Leaf, title: 'Eco-Friendly Equipment', text: 'Energy-saving, CFC-free machines built to ISO standards.' },
]

export const comboMachine = {
  name: 'Power of Choice',
  service: 'Traditional Service',
  intro:
    'Our combo machine serves cold drinks and snacks from a single, temperature-zoned cabinet, engineered for capacity, efficiency, and guaranteed delivery.',
  features: [
    'Over thirty different snack and drink options in a single machine',
    'Soft Elevator Delivery System with high-waist dispensing',
    'Energy-saving design disables LED lighting during inactivity',
    'Continuous self-testing and diagnostics',
    'Anti-pick lock cylinder with three-point door locking',
    'Dual currency (BSD/USD) with bill and coin acceptance',
  ],
  specs: [
    { label: 'Selections', value: '30+ snacks & drinks' },
    { label: 'Dimensions', value: '72″H × 31½″W × 37″D' },
    { label: 'Weight', value: '716 lbs' },
    { label: 'Glass front', value: '43½″H × 21″W' },
    { label: 'Electrical', value: '110-115 VAC / 8 amps' },
    { label: 'Refrigeration', value: 'R134A · CFC-free' },
    { label: 'Payment', value: 'BSD & USD bills and coins' },
    { label: 'Housing', value: 'Rust-proof steel, vandal-proof lock' },
  ],
}

export const coffeeMachine = {
  name: 'Barista Coffee',
  service: 'Hot Drink Service',
  intro:
    'Between fifteen and eighteen hot drink selections, brewed fresh from whole beans, using a brewing process that is the first in the market to incorporate a pressured valve, ensuring every brewing cycle completes.',
  features: [
    '15-18 different product selections',
    'Pressured-valve brewing, first and only in the market',
    'Automatic grinder regulation for perfect grind thickness',
    'Fresh bean grinder in every cycle',
    'Easy operation, high reliability',
  ],
  specs: [
    { label: 'Selections', value: '15-18 hot beverages' },
    { label: 'Dimensions', value: '59″H × 19½″W × 22″D' },
    { label: 'Weight', value: '221 lbs' },
    { label: 'Power', value: '110 V 60 Hz (optional 220 V)' },
    { label: 'Brewing', value: 'Pressured-valve, fresh-ground beans' },
    { label: 'Housing', value: 'Rust-proof steel, vandal-proof lock' },
  ],
}

export const healthSafety = {
  title: 'Health & safety, built into every visit',
  items: [
    {
      icon: Container,
      title: 'Sealed canisters',
      text: 'Cups, coffee beans, and solubles live in self-contained canisters refilled with no personal contact.',
    },
    {
      icon: Droplets,
      title: 'Offsite part cleaning',
      text: 'All interior service parts are secured and cleaned offsite to current health & safety protocols.',
    },
    {
      icon: SprayCan,
      title: 'Protective disinfection',
      text: 'Housings are disinfected with surface-bonding solutions designed to form a protective barrier.',
    },
    {
      icon: ShieldCheck,
      title: 'Every single visit',
      text: 'A thorough application of disinfectant solutions is part of every site visit.',
    },
  ],
}

export const products = {
  note: 'Product menus are customized per location. These are popular examples.',
  categories: [
    {
      icon: CupSoda,
      title: 'Cold Drinks',
      items: ['Coca-Cola', 'Pepsi', 'Water', 'Juice', 'Gatorade', 'Iced Tea'],
    },
    {
      icon: Cookie,
      title: 'Snacks',
      items: ['Chips', 'Chocolate', 'Cookies', 'Granola Bars', 'Crackers'],
    },
    {
      icon: Salad,
      title: 'Healthy Choices',
      items: ['Baked snacks', 'Granola', 'Nuts', 'Low-sugar drinks'],
    },
  ],
}

export const howItWorks = {
  title: 'How it works',
  lede: 'From first call to fully stocked in a simple five-step process.',
  steps: [
    { icon: PhoneCall, title: 'Contact Us', text: 'Call, WhatsApp, or send the form and tell us about your location.' },
    { icon: ClipboardCheck, title: 'Free Site Assessment', text: 'We visit, measure, and understand your team’s needs.' },
    { icon: Lightbulb, title: 'Machine Recommendation', text: 'We recommend the right machines and product mix.' },
    { icon: Truck, title: 'Installation', text: 'Professional delivery and setup, at zero cost to you.' },
    { icon: RefreshCw, title: 'Ongoing Service', text: 'Weekly stocking, maintenance, and fast support, for as long as you host.' },
  ],
}

export const industries = {
  lede: 'From hospital lobbies to hotel staff rooms, our machines serve people wherever they work, wait, and take breaks.',
  items: [
    { icon: Hospital, title: 'Hospitals', text: 'Around-the-clock refreshment for staff, patients, and visitors.' },
    { icon: Hotel, title: 'Hotels', text: 'Convenience your guests expect, without staffing a kiosk.' },
    { icon: Palmtree, title: 'Resorts', text: 'Poolside-to-lobby refreshments that keep guests on property.' },
    { icon: Building2, title: 'Corporate Offices', text: 'The break-room upgrade your team will actually use.' },
    { icon: Landmark, title: 'Government Offices', text: 'Reliable service for busy public buildings.' },
    { icon: GraduationCap, title: 'Schools', text: 'Balanced options, including healthy choices, for campuses.' },
    { icon: Factory, title: 'Industrial Facilities', text: 'Fuel for every shift, built vandal-tough.' },
    { icon: PiggyBank, title: 'Banks', text: 'A professional amenity for staff and clients alike.' },
    { icon: Headset, title: 'Call Centers', text: 'Quick refreshment for teams that can’t leave the floor.' },
    { icon: Store, title: 'Retail Centers', text: 'Capture foot traffic with self-serve refreshments.' },
    { icon: Warehouse, title: 'Warehouses', text: 'High-capacity machines for high-demand crews.' },
    { icon: Plane, title: 'Airports', text: 'Grab-and-go convenience for travelers on the move.' },
    { icon: Armchair, title: 'Employee Break Rooms', text: 'The heart of our business: better breaks, happier teams.' },
  ],
}

export const faq = [
  {
    q: 'How much does a vending machine cost?',
    a: 'Nothing. We provide and maintain the equipment at no cost to your business.',
  },
  {
    q: 'Who stocks the machine?',
    a: 'We do. Our team restocks weekly and tailors the product mix to your location.',
  },
  {
    q: 'Who repairs it?',
    a: 'We do. Our personnel are fully trained to troubleshoot any issue, backed by a 24-hour help desk.',
  },
  {
    q: 'How often do you visit?',
    a: 'Based on sales volume. New locations are serviced frequently to establish demand, then on a regular schedule.',
  },
  {
    q: 'Can products be customized?',
    a: 'Yes. We work with you to build a selection your team and customers will love.',
  },
]

// No client testimonials exist yet. Keep disabled until real quotes are provided.
// Schema for later: { quote, name, role, organization }
export const testimonials = {
  enabled: false,
  items: [],
}

export const cta = {
  heading: 'Ready to Offer Convenient Refreshments to Your Employees or Customers?',
  text: 'Contact Vending Solutions Bahamas today for a FREE site assessment and machine recommendation.',
  button: { label: 'Request a Free Site Survey', to: '/contact#survey' },
}

// NOTE: phone numbers and email were read from the machine decals in the
// client's photos. Confirm with the client before launch.
export const contact = {
  phones: [
    { display: '(242) 426-4313', tel: '+12424264313', wa: '12424264313' },
    { display: '(242) 466-6367', tel: '+12424666367', wa: '12424666367' },
  ],
  email: 'vendingsolutionsbahamas@gmail.com',
  hours: 'Mon to Fri · 9:00 AM to 5:00 PM · 24-hour help desk for service calls',
  location: 'Nassau, New Providence, The Bahamas',
  whatsappMessage:
    'Hi Vending Solutions Bahamas, I’d like to request a free site survey for my business.',
}

export const machinesPage = {
  eyebrow: 'The Machines',
  headline: 'Engineered for effortless refreshment',
  lede: 'Take a scroll through the Power of Choice combo machine: capacity, payment, delivery, efficiency, security, and self-monitoring, explained part by part.',
}

export const notFound = {
  title: 'Page not found',
  text: 'The page you’re looking for doesn’t exist. Maybe grab a snack on the way back?',
  button: { label: 'Back to home', to: '/' },
}
