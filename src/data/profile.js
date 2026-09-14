/** Single source of truth for personal / brand info. Change it here, it changes everywhere. */
export const profile = {
  name: 'Tariq',
  fullName: 'Tariq Aslam',
  role: 'Senior WordPress Developer — Bug Fixes, Elementor & WooCommerce',
  greeting: "I'm glad you're here.",
  badges: [
    '🏆 10+ years of WordPress experience',
    '🚀 50+ websites delivered',
    '🧩 Elementor Pro & WooCommerce',
    '🐛 Small fixes welcome too',
  ],
  // Hero paragraph — the opening of the Upwork overview.
  tagline:
    'I build, fix, optimise and maintain WordPress websites. Whether you need a new site, a Figma or Lovable conversion, a WooCommerce store, an urgent bug fix, speed optimisation or technical SEO — I can help.',
  email: 'tmaslam@gmail.com',
  location: 'Pakistan · Working with clients worldwide',
  availability: 'Available for new projects',
  upworkUrl: 'https://www.upwork.com/',
  githubUrl: 'https://github.com/vvtechsol1',
  resumeUrl: '',
}

/**
 * Verbatim from the Upwork profile — real contracts, no invented quotes.
 * The WordPress contract leads here, since that is what this profile is about.
 */
export const upworkJobs = [
  {
    title: 'Website for Event Organizer Company',
    rating: null,
    feedback: null,
    period: 'Jul 21 – Aug 3, 2026',
    budget: '$200.00',
    type: 'Fixed price',
    tags: ['WordPress Website', 'WordPress Website Design', 'Corporate Website', 'WordPress Landing Page'],
  },
  {
    title: 'Senior Full Stack AI Engineer for Voice Automation SaaS Platform',
    rating: 5.0,
    feedback: null,
    period: 'Jul 22 – Jul 28, 2026',
    budget: '$300.00',
    type: 'Fixed price',
    tags: ['AI Platform', 'Generative AI Software', 'AI Bot', 'AI Development', 'AI Chatbot'],
  },
]

/**
 * Sixteen, so the reference's four-column service grid fills four clean rows —
 * the whole WordPress offering, from conversion and builds through to the
 * niches (membership, LMS, booking, listings) and the maintenance work.
 * `icon` names an export from components/Icons.jsx.
 */
export const services = [
  {
    n: '01',
    icon: 'IcoWordPress',
    title: 'WordPress Development',
    body: 'Custom websites, landing pages and business sites — built on clean, maintainable code rather than a pile of plugins.',
    tags: ['Custom Themes', 'Landing Pages', 'PHP', 'MySQL'],
  },
  {
    n: '02',
    icon: 'IcoDesign',
    title: 'Figma / XD / PSD → WordPress',
    body: 'Pixel-perfect, fully responsive conversion from Figma, XD, PSD, HTML or Lovable — into a custom theme or into Elementor, your call.',
    tags: ['Figma', 'XD', 'PSD', 'HTML'],
  },
  {
    n: '03',
    icon: 'IcoPuzzle',
    title: 'Elementor & Elementor Pro',
    body: 'Custom designs and widgets, custom CSS, responsive breakpoints, and the editor fixes that stop the builder fighting you.',
    tags: ['Elementor Pro', 'Custom Widgets', 'CSS', 'Responsive'],
  },
  {
    n: '04',
    icon: 'IcoCart',
    title: 'WooCommerce Stores',
    body: 'Store setup end to end — products and variations, shipping, taxes, coupons and the custom features your catalogue actually needs.',
    tags: ['Products', 'Shipping', 'Taxes', 'Coupons'],
  },
  {
    n: '05',
    icon: 'IcoCard',
    title: 'Checkout & Payment Fixes',
    body: 'Broken checkouts, failing gateways, orders not completing, tax and currency errors — traced to the cause and fixed.',
    tags: ['Stripe', 'PayPal', 'Gateways', 'Orders'],
  },
  {
    n: '06',
    icon: 'IcoBug',
    title: 'WordPress Bug Fixing',
    body: 'Critical errors, white screen of death, 500 errors, PHP and JavaScript failures — diagnosed properly, not patched over.',
    tags: ['White Screen', '500 Errors', 'PHP', 'JavaScript'],
  },
  {
    n: '07',
    icon: 'IcoWrench',
    title: 'Broken Theme Repair',
    body: 'Themes that broke after an update, lost styling, layout collapse or a half-finished handover — rebuilt back to working.',
    tags: ['Theme Repair', 'Update Breakage', 'Child Themes', 'CSS'],
  },
  {
    n: '08',
    icon: 'IcoPlug',
    title: 'Plugin & Theme Customisation',
    body: 'Bending an existing plugin or theme to your requirement, and resolving the conflicts between them — with update-safe overrides.',
    tags: ['Hooks & Filters', 'Overrides', 'Conflicts', 'Compatibility'],
  },
  {
    n: '09',
    icon: 'IcoCode',
    title: 'Custom Plugin Development',
    body: 'Purpose-built plugins in PHP and JavaScript when no existing one fits — with a settings screen your team can actually use.',
    tags: ['Custom Plugins', 'Admin UI', 'PHP', 'jQuery'],
  },
  {
    n: '10',
    icon: 'IcoUsers',
    title: 'Membership Sites',
    body: 'Paid membership and subscription sites — tiers, gated content, recurring billing and member dashboards.',
    tags: ['Memberships', 'Subscriptions', 'Gated Content', 'Roles'],
  },
  {
    n: '11',
    icon: 'IcoBook',
    title: 'LMS & Course Sites',
    body: 'Course platforms with lessons, quizzes, progress tracking, certificates and student dashboards — LearnDash, Tutor or LifterLMS.',
    tags: ['LearnDash', 'Tutor LMS', 'Quizzes', 'Certificates'],
  },
  {
    n: '12',
    icon: 'IcoCalendar',
    title: 'Booking & Appointments',
    body: 'Booking systems with real availability, staff and service rules, deposits and payment on booking, plus email confirmations.',
    tags: ['Availability', 'Deposits', 'Calendars', 'Reminders'],
  },
  {
    n: '13',
    icon: 'IcoHome',
    title: 'Real Estate & Listings',
    body: 'Property and directory sites — searchable listings with filters, maps, enquiry forms and agent or vendor dashboards.',
    tags: ['Listings', 'Search Filters', 'Maps', 'Enquiries'],
  },
  {
    n: '14',
    icon: 'IcoBolt',
    title: 'Speed Optimisation',
    body: 'PageSpeed, GTmetrix and Core Web Vitals — caching, image optimisation and render-blocking work, measured before and after.',
    tags: ['Core Web Vitals', 'PageSpeed', 'GTmetrix', 'Caching'],
  },
  {
    n: '15',
    icon: 'IcoSeo',
    title: 'Technical SEO',
    body: 'Indexing, schema, redirects and sitemaps with Rank Math or Yoast, wired to GA4 and Search Console so results are visible.',
    tags: ['Schema', 'Rank Math', 'Yoast', 'GA4'],
  },
  {
    n: '16',
    icon: 'IcoShield',
    title: 'Security, Migration & Care',
    body: 'Malware removal and hardening, hosting and domain migrations without downtime, backups, updates and post-launch support.',
    tags: ['Malware Removal', 'Migration', 'Backups', 'Maintenance'],
  },
]

/** Kept in descending order — a bar that steps back up reads as a mistake. */
export const skills = [
  { label: 'WordPress Development', level: 100 },
  { label: 'WordPress Bug Fixing & Troubleshooting', level: 100 },
  { label: 'Elementor & Elementor Pro', level: 96 },
  { label: 'PHP / MySQL / jQuery', level: 95 },
  { label: 'WooCommerce', level: 94 },
  { label: 'Speed & Technical SEO', level: 92 },
]

/**
 * Left column = what I am hired for, framed as engagements.
 * Right column = the stack, grouped the way the profile groups it.
 */
export const timeline = [
  {
    side: 'experience',
    title: 'New WordPress Builds',
    org: 'Custom themes · Elementor · Landing pages',
    period: '10+ years',
    body: 'Business sites and landing pages built from a design file or from scratch, handed over editable by the client’s own team.',
  },
  {
    side: 'experience',
    title: 'WooCommerce Stores',
    org: 'Checkout · Payments · Shipping · Taxes',
    period: 'Ongoing',
    body: 'Store setup and custom checkout work, plus the product, shipping and tax logic that never quite fits out of the box.',
  },
  {
    side: 'experience',
    title: 'Rescue & Bug Fixing',
    org: 'Critical errors · Conflicts · Malware',
    period: 'Ongoing',
    body: 'White screens, 500 errors, plugin conflicts and hacked sites — found, fixed and hardened so it does not come back.',
  },
  {
    side: 'experience',
    title: 'Speed & Technical SEO',
    org: 'Core Web Vitals · Schema · Indexing',
    period: 'Ongoing',
    body: 'Measured optimisation against PageSpeed and GTmetrix, with schema, redirects and Search Console set up properly.',
  },
  {
    side: 'experience',
    title: 'Migrations & Maintenance',
    org: 'Hosting moves · Staging · Post-launch care',
    period: 'Ongoing',
    body: 'Moving sites between hosts and domains without downtime, then keeping them updated and backed up after launch.',
  },
  {
    side: 'stack',
    title: 'WordPress Core',
    org: 'Custom themes, plugins, Gutenberg, block themes, REST API',
    period: 'Core',
    body: 'Theme and plugin development, customisation and maintenance.',
  },
  {
    side: 'stack',
    title: 'Builders & Commerce',
    org: 'Elementor, Elementor Pro, WooCommerce',
    period: 'Core',
    body: 'Custom widgets, editor fixes, store setup, checkout and payment gateways.',
  },
  {
    side: 'stack',
    title: 'Languages & Tooling',
    org: 'PHP, MySQL, JavaScript, jQuery, HTML5, CSS3, SCSS, Git, cPanel',
    period: 'Core',
    body: 'The everyday stack behind custom work and debugging.',
  },
  {
    side: 'stack',
    title: 'Performance, SEO & Motion',
    org: 'Core Web Vitals, Rank Math, Yoast, Cloudflare, GSAP, Three.js',
    period: 'Core',
    body: 'Speed and search work, with an animation layer when the design asks for one.',
  },
]

/** "Why work with me", from the profile. */
export const promises = [
  '10+ years of WordPress experience',
  '50+ websites delivered',
  'Clean and maintainable code',
  'Fast troubleshooting and practical solutions',
  'Clear communication and regular updates',
  'Performance-focused development',
  'Post-launch support',
]

/** "How I work", from the profile. */
export const howIWork = [
  { n: '01', title: 'You share the details', body: 'Your requirements, or the problem the site is having.' },
  { n: '02', title: 'I find the real issue', body: 'I check the site and identify what is actually wrong.' },
  { n: '03', title: 'Clear scope and price', body: 'A written scope, a realistic timeline and a fixed price.' },
  { n: '04', title: 'Built on staging', body: 'Work happens on staging wherever it possibly can.' },
  { n: '05', title: 'You review, then launch', body: 'You see the result before anything goes live.' },
]
