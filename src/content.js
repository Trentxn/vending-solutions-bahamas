// ============================================================
// Single source of truth for ALL site copy.
// Text comes from the client's Word document. Edit here, not in pages.
// ============================================================
import {
  Building2,
  Wrench,
  ShieldCheck,
  Sparkles,
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
  Salad,
  ClipboardCheck,
  Lightbulb,
  Truck,
  RefreshCw,
  SprayCan,
  Container,
  Droplets,
  BadgeCheck,
  Smile,
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

export const serviceCommitment = {
  title: 'Our service commitment',
  text: 'Our team of trained technicians ensures machines are clean, stocked and operational at all times. Response to service issues typically occurs within 24 hours or sooner.',
  values: ['Reliability', 'Professionalism', 'Innovation', 'Customer Centered Service'],
}

export const about = {
  lede: 'Bahamian owned and serving New Providence since 2012.',
  story: [
    'Vending Solutions Bahamas is a Bahamian owned company, established in 2012, specializing in the supply and management of vending equipment across New Providence.',
    'Every placement comes with professional installation, routine stocking and maintenance, and reliable customer service. Hosting our equipment conveys the right image as the ideal break and meeting room accessory, and it costs you nothing.',
    'We do not sell machines. We provide the solution and the service behind it.',
  ],
  mission:
    'At Vending Solutions Bahamas, we are committed to delivering convenient, reliable, and high quality vending services while providing exceptional customer support and premium products to our customers.',
  vision:
    'It is our vision to remain the most sought after vending equipment service provider through sustainable relationships with host locations, reliability, professionalism, and innovation. We have partnered with one of the world’s leading manufacturers of vending equipment, with a presence in more than fifty countries worldwide.',
  standards:
    'Our equipment was subject to quality testing and environmental management concepts established in strict accordance with international standards ISO 9001 and ISO 14001.',
  goals: [
    { icon: Sparkles, text: 'Introduce high quality vending equipment, first to market' },
    { icon: Salad, text: 'Offer healthy as well as fun foods' },
    { icon: BadgeCheck, text: 'Usher in a new standard for quality vending services' },
  ],
}

export const services = {
  snack: {
    title: 'Snack & Beverage Vending',
    caption: 'Snacks & beverages',
    summary:
      'Cold drinks and snacks together in one temperature zoned machine, with over thirty selections stocked to match your location.',
    features: [
      'Cold drinks & water',
      'Chips & snacks',
      'Chocolate & candy bars',
      'Juices & sports drinks',
      'Trail mix & granola bars',
      'Local favorites on request',
    ],
  },
  coffee: {
    title: 'Specialty Coffee Vending',
    caption: 'Specialty coffee',
    summary:
      'Espresso, cappuccino, hot chocolate and more, brewed fresh from medium roasted Arabica beans, with 15 to 18 selections at the press of a button.',
    features: [
      'Espresso & cappuccino',
      'Hot chocolate',
      'Medium roasted Arabica beans',
      'Pressured valve brewing',
      'Automatic grind regulation',
      'Freshly ground for every cup',
    ],
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
  // the drink menu itself lives on the services page
  features: [
    '15 to 18 selections, including espresso, cappuccino and hot chocolate',
    'Medium roasted Arabica beans for a smooth, creamy taste',
    'Pressured valve brewing, exclusive in the local market',
    'Automatic grind thickness regulation for consistent flavour',
  ],
  specs: [
    { label: 'Selections', value: '15 to 18 hot beverages' },
    { label: 'Dimensions', value: '59″H × 19½″W × 22″D' },
    { label: 'Weight', value: '221 lbs' },
    { label: 'Power', value: '110 V 60 Hz (optional 220 V)' },
    { label: 'Brewing', value: 'Pressured valve, freshly ground beans' },
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
    a: 'Nothing. We provide, install and maintain the equipment at no cost to your business. You host the solution, we run it.',
  },
  {
    q: 'Who stocks the machine?',
    a: 'We do. Restocking is monitored and scheduled, and the product mix is tailored to your location.',
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
