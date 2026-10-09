export const PLATFORMS = {
  tiktok: { name: 'Snapchat', how: 'Add the link to your bio and post the video' },
  instagram: { name: 'Instagram', how: 'Add the link to your bio and post the reel' },
  snapchat: { name: 'Snapchat', how: 'Add the link to your Spotlight or story' },
  x: { name: 'X', how: 'Add the link to your post or bio' },
  youtube: { name: 'YouTube', how: 'Add the link to your video description' },
}

// Campaign types, as on tatheer.marketing: General / Recommendations / Location
export const TYPES = {
  public: { label: 'General', hint: 'Talk about the product following the brief', tone: 'purple' },
  reco: { label: 'Recommend', hint: 'Recommend it to your followers', tone: 'green' },
  local: { label: 'Location', hint: 'Film from the store location', tone: 'orange' },
}

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'reco', label: 'Recommend' },
]

export const SORTS = [
  { id: 'pay', label: 'Highest paying' },
  { id: 'creators', label: 'Most creators' },
  { id: 'ending', label: 'Ending soon' },
]

const A = import.meta.env.BASE_URL + 'assets/'

export const CAMPAIGNS = [
  {
    id: 'rawasi', hero: true, brand: 'Rawasi', logo: A + 'logo-rawasi.webp', verified: false,
    title: 'Rawasi Black First Spray Reaction UGC', type: 'reco', category: 'Beauty',
    pay: 0.5, budget: 12000, spent: 0.42, creators: 32, days: 4, platforms: ['tiktok', 'instagram', 'youtube'],
    img: A + 'poster-shade.webp', tint: '#d8d2e6',
    pitch: 'Film your honest first reaction to the first spray.',
    dos: ['Film the first spray in one take', 'Say what you smell in your own words', 'Keep your link on screen for 2 seconds'],
    donts: ['Don’t read the brand name off a script', 'Don’t compare with other brands'],
    caption: 'أول بخة من رواسي بلاك وردة فعلي 😍 الرابط بالبايو',
  },
  {
    id: 'saqr', brand: 'Saqr Parfums', logo: A + 'logo-saqr.webp', verified: true,
    title: 'Saqr Noir your new signature scent', type: 'public', category: 'Beauty',
    pay: 0.5, budget: 20000, spent: 0.62, creators: 32, days: 6, platforms: ['tiktok', 'instagram', 'youtube'],
    img: A + 'cover-saqr.webp', tint: '#cfe0f5',
    pitch: 'Show how Saqr Noir becomes part of your look.',
    brief: ['Show how Saqr Noir becomes part of your look', 'Film the bottle, the first spray and one occasion you would wear it', 'Keep your link on screen for two seconds', 'Reposting is allowed'],
    dos: ['Show the bottle and the unboxing', 'Mention one occasion you’d wear it', 'Add your link to your bio'],
    donts: ['Don’t quote old prices', 'Don’t compare with other brands'],
    caption: 'صقر نوار عطري الجديد 🖤 الرابط بالبايو',
  },
  {
    id: 'layali', brand: 'Layali Oud', logo: A + 'logo-layali.webp', verified: true,
    title: 'Layali Oud: the scent of your evenings', type: 'reco', category: 'Beauty',
    pay: 0.2, budget: 9000, spent: 0.3, creators: 20, days: 6, platforms: ['tiktok', 'youtube', 'instagram'],
    img: A + 'cover-layali.webp', tint: '#e6d9c4',
    pitch: 'Tell your followers when you wear it and why.',
    dos: ['Film an evening routine with the scent', 'Describe the notes you notice', 'Add your link'],
    donts: ['Don’t mention expired offers'],
    caption: 'ليالي عود ريحة سهراتي ✨ الرابط تحت',
  },
  {
    id: 'maison', group: 'new', brand: 'Maison Noor', logo: A + 'logo-maison.webp', verified: true,
    title: 'The Knit Vest Edit — Fall ‘26', type: 'public', category: 'Fashion',
    pay: 0.9, budget: 15000, spent: 0.2, creators: 40, days: 6, platforms: ['tiktok', 'instagram', 'youtube'],
    img: A + 'cover-maison.webp', tint: '#f3d6e4',
    pitch: 'Style the knit vest your way and show how you wear it.',
    dos: ['Show at least two outfits', 'Mention the fabric and fit', 'Add your link to your bio'],
    donts: ['Don’t use copyrighted music'],
    caption: 'ستايل الفيست الجديد من ميزون نور، الرابط بالبايو',
  },
  {
    id: 'sahra', group: 'new', brand: 'Sahra Club', logo: A + 'logo-sahra.webp', verified: false,
    title: 'Show us your desert fit', type: 'public', category: 'Fashion',
    pay: 0.8, budget: 8000, spent: 0.15, creators: 12, days: 6, platforms: ['tiktok', 'youtube', 'instagram'],
    img: A + 'cover-sahra.webp', tint: '#d9d2c4',
    pitch: 'Film your desert look and tag the place.',
    dos: ['Film outdoors in daylight', 'Show the full outfit', 'Add your link to your bio'],
    donts: ['Don’t film other people without permission'],
    caption: 'لبسة الصحراء مع صحرا كلوب، الرابط بالبايو',
  },
]

export const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 1 })
export const typeOf = (c) => TYPES[c.type]
