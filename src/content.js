// ============================================================
// Single source of truth for ALL site copy.
// Text comes from the client's Word document. Edit here, not in pages.
// ============================================================
import {
  Building2,
  Wrench,
  ShieldCheck,
  ListChecks,
  Headset,
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
  ClipboardCheck,
  Lightbulb,
  Truck,
  RefreshCw,
  SprayCan,
  Container,
  Droplets,
  BadgeCheck,
  Smile,
  HandCoins,
  Plug,
  HeartHandshake,
  Globe,
  CalendarCheck,
  MapPin,
  Clock,
  Coins,
} from 'lucide-react'

export const site = {
  name: 'Vending Solutions Bahamas',
  shortName: 'Vending Solutions',
  brandTagline: 'Power of Choice',
  tagline: 'Installed, stocked and serviced at no cost to your business.',
  established: 2012,
  serviceArea: 'New Providence',
}

export const nav = [
  { label: 'Services', to: '/services' },
  { label: 'The Solution', to: '/solution' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// The headline, subheading and promise are the client's own words.
export const hero = {
  headline: 'Premium Vending Solutions for Businesses across New Providence',
  subheading: 'Snacks, beverages, specialty coffee',
  promise: 'Installed, stocked and serviced at No Cost to your business',
  highlight: 'No Cost',
  primaryCta: { label: 'Request a Free Site Survey', to: '/contact#survey' },
  secondaryCta: { label: 'See the solution', to: '/solution' },
  photoAlt:
    'Two Power of Choice vending machines installed in a hospital waiting lounge in Nassau',
  photoChip: 'On location · Nassau',
}

// The message the client wants to dominate the page: what a facilities
// manager gets out of hosting, not what the hardware does.
export const pillars = {
  eyebrow: 'For facilities managers',
  title: 'Everything a great break room should be. Nothing for you to manage.',
  punchline: 'Happy staff.',
  script: 'That is the Power of Choice.',
  items: [
    {
      icon: PiggyBank,
      title: 'No capital investment',
      text: 'We own the equipment. You never buy, lease or repair a thing.',
    },
    {
      icon: ListChecks,
      title: 'One less thing to manage',
      text: 'Stocking, cleaning, cash handling and service calls are all ours.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable service',
      text: 'Scheduled visits, monitored stock levels and a response within 24 hours.',
    },
    {
      icon: Smile,
      title: 'A hassle free employee amenity',
      text: 'Snacks, cold drinks and fresh coffee, steps away from every desk.',
    },
  ],
}

export const included = {
  eyebrow: 'What is included',
  title: 'You give us the floor space. We do the rest.',
  lede: 'Every part of running the machines sits with us, for as long as you host.',
  items: [
    {
      icon: Truck,
      title: 'Machine delivery and installation',
      text: 'Professional setup at no cost to you.',
    },
    {
      icon: RefreshCw,
      title: 'Routine restocking',
      text: 'Monitored and scheduled, so shelves never run bare.',
    },
    {
      icon: Wrench,
      title: 'On demand maintenance',
      text: 'Trained technicians keep every machine clean, stocked and operational.',
    },
    {
      icon: Coins,
      title: 'Dual currency on every machine',
      text: 'BSD and USD, bills and coins.',
    },
    {
      icon: Clock,
      title: 'Response within 24 hours',
      text: 'Typically sooner. One call and it is handled.',
    },
  ],
  link: { label: 'See the full solution', to: '/solution' },
}

// NOTE: the revenue share line comes from the client's own brief ("No Upfront
// Costs, Revenue Share Model") and his third testimonial. No percentages are
// published: confirm the exact terms with the client before launch.
export const terms = {
  eyebrow: 'The commercial side',
  title: 'What hosting actually costs you',
  items: [
    {
      icon: HandCoins,
      title: 'Zero cost to host',
      text: 'The equipment, the installation, the stocking and the maintenance are all ours.',
    },
    {
      icon: PiggyBank,
      title: 'Revenue share model',
      text: 'Your location earns a share of what the machines sell, for as long as you host them.',
    },
    {
      icon: Plug,
      title: 'All we need from you',
      text: 'A spot with a standard outlet and people nearby. That is the whole ask.',
    },
  ],
  note: 'Exact terms are confirmed at your free site survey.',
}

export const serviceCommitment = {
  title: 'Our service commitment',
  text: 'Our team of trained technicians ensures machines are clean, stocked and operational at all times. Response to service issues typically occurs within 24 hours or sooner.',
}

export const about = {
  lede: 'Bahamian owned and serving New Providence since 2012.',
  story: [
    'Vending Solutions Bahamas is a Bahamian owned company, established in 2012, specializing in the supply and management of vending equipment across New Providence.',
    'Hosting our equipment conveys the right image as the ideal break and meeting room accessory, whether that is a hospital lobby, a hotel staff room or a shop floor.',
    'We do not sell machines. We provide the solution and the service behind it.',
  ],
  mission:
    'At Vending Solutions Bahamas, we are committed to delivering convenient, reliable, and high quality vending services while providing exceptional customer support and premium products to our customers.',
  vision:
    'It is our vision to remain the most sought after vending equipment service provider through sustainable relationships with host locations.',
  standards:
    'We partnered with one of the world’s leading manufacturers of vending equipment, present in more than fifty countries. Their equipment is quality tested and built to the international standards ISO 9001 and ISO 14001.',
  // the client's core values, from his brief
  values: [
    { icon: ShieldCheck, title: 'Reliability', text: 'We show up, and the machines work.' },
    { icon: BadgeCheck, title: 'Professionalism', text: 'Trained technicians and a presentable machine, every visit.' },
    { icon: Lightbulb, title: 'Innovation', text: 'We bring equipment to this market before anyone else does.' },
    { icon: HeartHandshake, title: 'Customer Centered Service', text: 'Your location sets the product mix, not a catalogue.' },
  ],
  facts: [
    { icon: CalendarCheck, value: 'Est. 2012', label: 'Bahamian owned from day one' },
    { icon: MapPin, value: 'New Providence', label: 'Our home service area' },
    { icon: Globe, value: '50+ countries', label: 'Where our equipment partner operates' },
    { icon: BadgeCheck, value: 'ISO 9001 & 14001', label: 'Quality and environmental standards' },
  ],
}

export const services = {
  snack: {
    title: 'Snack & Beverage Vending',
    caption: 'Snacks & beverages',
    summary:
      'Cold drinks and snacks together in one temperature zoned machine, with over thirty selections stocked to match your location.',
  },
  coffee: {
    title: 'Specialty Coffee Vending',
    caption: 'Specialty coffee',
    summary:
      'Café style hot drinks at the press of a button, brewed to order rather than poured from a jug.',
    menu: ['Espresso', 'Cappuccino', 'Hot chocolate', 'And 12 to 15 more'],
    beans: 'Medium roasted Arabica beans, ground fresh for every cup.',
    selections: '15 to 18 beverage selections',
  },
}

export const comboMachine = {
  name: 'Power of Choice',
  service: 'Snack & Beverage Service',
  intro:
    'Our combo machine serves cold drinks and snacks from a single, temperature zoned cabinet, engineered for capacity, efficiency, and guaranteed delivery.',
  features: [
    'Over thirty different snack and drink options in a single machine',
    'Soft Elevator Delivery System with waist height dispensing',
    'Energy saving design disables LED lighting during inactivity',
    'Continuous self testing and diagnostics',
    'A lock cylinder built to defeat picking, with three point door locking',
    'Dual currency (BSD/USD) with bill and coin acceptance',
  ],
  specs: [
    { label: 'Selections', value: '30+ snacks & drinks' },
    { label: 'Dimensions', value: '72″H × 31½″W × 37″D' },
    { label: 'Weight', value: '716 lbs' },
    { label: 'Glass front', value: '43½″H × 21″W' },
    { label: 'Electrical', value: '110 to 115 VAC / 8 amps' },
    { label: 'Refrigeration', value: 'R134A, CFC free' },
    { label: 'Payment', value: 'BSD & USD bills and coins' },
    { label: 'Housing', value: 'Rust proof steel, vandal proof lock' },
  ],
}

export const coffeeMachine = {
  name: 'Barista Coffee',
  service: 'Hot Drink Service',
  intro:
    'Between fifteen and eighteen hot drink selections, brewed fresh from medium roasted Arabica beans, using a pressured valve brewing system that is exclusive to us in the local market, so every brewing cycle completes.',
  idealFor: 'Ideal for corporate offices, reception areas and hospitality environments.',
  specs: [
    { label: 'Selections', value: '15 to 18 hot beverages' },
    { label: 'Dimensions', value: '59″H × 19½″W × 22″D' },
    { label: 'Weight', value: '221 lbs' },
    { label: 'Power', value: '110 V 60 Hz (optional 220 V)' },
    { label: 'Brewing', value: 'Pressured valve, exclusive in the local market' },
    { label: 'Grinder', value: 'Automatic grind thickness regulation' },
    { label: 'Housing', value: 'Rust proof steel, vandal proof lock' },
  ],
}

export const healthSafety = {
  title: 'Health & safety, built into every visit',
  items: [
    {
      icon: Container,
      title: 'Sealed canisters',
      text: 'Cups, coffee beans, and solubles live in sealed canisters refilled with no personal contact.',
    },
    {
      icon: Droplets,
      title: 'Offsite part cleaning',
      text: 'All interior service parts are secured and cleaned offsite to current health & safety protocols.',
    },
    {
      icon: SprayCan,
      title: 'Protective disinfection',
      text: 'Housings are disinfected with solutions that bond to the surface and form a protective barrier.',
    },
    {
      icon: ShieldCheck,
      title: 'Every single visit',
      text: 'A thorough application of disinfectant solutions is part of every site visit.',
    },
  ],
}

export const products = {
  note: 'Menus are built per location and tuned over time to what your team actually buys. These are popular examples.',
  categories: [
    {
      icon: Cookie,
      title: 'Snacks',
      items: [
        'Lay’s',
        'Doritos',
        'Cheetos',
        'M&Ms',
        'Snickers',
        'Twix',
        'Trail Mix',
        'Granola Bars',
        'Local Favorites (upon request)',
      ],
    },
    {
      icon: CupSoda,
      title: 'Drinks',
      items: [
        'Coca-Cola',
        'Sprite',
        'Water',
        'Powerade',
        'Juices',
        'Vita Malt',
        'Gatorade',
        'Bottled Teas',
        'Flavored Water',
      ],
    },
  ],
}

export const howItWorks = {
  title: 'How it works',
  lede: 'From first call to fully stocked in five simple steps.',
  steps: [
    { icon: PhoneCall, title: 'Contact Us', text: 'Call, WhatsApp, or send the form and tell us about your location.' },
    { icon: ClipboardCheck, title: 'Free Site Assessment', text: 'We visit, measure, and understand your team’s needs.' },
    { icon: Lightbulb, title: 'Machine Recommendation', text: 'We recommend the right machines and product mix.' },
    { icon: Truck, title: 'Installation', text: 'Professional delivery and setup, at zero cost to you.' },
    { icon: RefreshCw, title: 'Ongoing Service', text: 'Routine restocking, maintenance, and fast support, for as long as you host.' },
  ],
}

// Titles only: thirteen one-line descriptions read as filler, and the list is
// more convincing scanned quickly than read.
export const industries = {
  lede: 'From hospital lobbies to hotel staff rooms, our machines serve people wherever they work, wait, and take breaks.',
  items: [
    { icon: Hospital, title: 'Hospitals' },
    { icon: Hotel, title: 'Hotels' },
    { icon: Palmtree, title: 'Resorts' },
    { icon: Building2, title: 'Corporate Offices' },
    { icon: Landmark, title: 'Government Offices' },
    { icon: GraduationCap, title: 'Schools' },
    { icon: Factory, title: 'Industrial Facilities' },
    { icon: PiggyBank, title: 'Banks' },
    { icon: Headset, title: 'Call Centers' },
    { icon: Store, title: 'Retail Centers' },
    { icon: Warehouse, title: 'Warehouses' },
    { icon: Plane, title: 'Airports' },
    { icon: Armchair, title: 'Employee Break Rooms' },
  ],
}

export const faq = [
  {
    q: 'How much does a vending machine cost?',
    a: 'Nothing. See the full terms on the solution page.',
  },
  {
    q: 'Who stocks the machine?',
    a: 'We do, on a schedule set by how fast your location sells.',
  },
  {
    q: 'Who repairs it?',
    a: 'We do. Our personnel are fully trained to troubleshoot any issue, backed by a 24 hour help desk.',
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

// Supplied by the client. Attributed by role and organisation, as they wrote
// them. Never add a quote here that the client has not provided.
export const testimonials = {
  enabled: true,
  items: [
    {
      quote:
        'Vending Solutions Bahamas has completely upgraded our employee breakroom experience. The combo machine is always well stocked with fresh snacks and drinks, and the service team is prompt and professional. Our staff loves the convenience.',
      name: 'HR Manager',
      organization: 'Financial Services Firm',
    },
    {
      quote:
        'We have had their coffee vending service in our lobby for months now, and guests constantly comment on how good the coffee is. It is a polished, self serve setup that saves us time and still impresses.',
      name: 'Operations Director',
      organization: 'Boutique Hotel',
    },
    {
      quote:
        'What I appreciate most is how hands off the process is. Vending Solutions handles everything, installation, restocking and maintenance, while we benefit from added convenience and a share of the revenue. Win win.',
      name: 'Property Manager',
      organization: 'Mixed Use Commercial Building',
    },
  ],
}

export const cta = {
  heading: 'Ready to give your team the Power of Choice?',
  text: 'Book a free site survey. We will recommend the right setup for your location and handle everything from there.',
  button: { label: 'Request a Free Site Survey', to: '/contact#survey' },
  dock: 'No cost · Installed, stocked, serviced',
}

// Phone numbers, email and postal address as confirmed by the client.
export const contact = {
  phones: [
    { display: '(242) 426 4313', tel: '+12424264313', wa: '12424264313' },
    { display: '(242) 466 6367', tel: '+12424666367', wa: '12424666367' },
  ],
  email: 'vendingsolutionsbahamas@gmail.com',
  hours: 'Mon to Fri · 9:00 AM to 5:00 PM · 24 hour help desk for service calls',
  location: 'Nassau, New Providence, The Bahamas',
  postal: 'P.O. Box CB-11368, Nassau, NP, The Bahamas',
  whatsappMessage:
    'Hi Vending Solutions Bahamas, I’d like to request a free site survey for my business.',
}

export const solutionPage = {
  eyebrow: 'The Solution',
  headline: 'You host it. We run it.',
  lede: 'Snack, beverage and specialty coffee vending, installed, stocked and serviced by our team at no cost to your business. Here is everything that comes with it.',
  tourLink: { label: 'Watch the interactive tour', to: '/#tour' },
}

export const notFound = {
  title: 'Page not found',
  text: 'The page you’re looking for doesn’t exist. Maybe grab a snack on the way back?',
  button: { label: 'Back to home', to: '/' },
}
