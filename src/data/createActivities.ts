/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * CREATE — the twelve maker activities of the Pakka Patriot create space.
 * Each activity has its own page (/create/activity/:slug) celebrating what
 * that craft is best known for across Bhārat's heritage and innovation.
 */

export interface CreateActivityKnownFor {
  emoji: string;
  title: string;
  text: string;
}

export interface CreateActivityRelated {
  label: string;
  path: string;
}

export interface CreateActivity {
  slug: string;
  badge: string; // short all-caps label on the card, e.g. "DRAW"
  title: string; // display title on the page, e.g. "Draw"
  emoji: string;
  tagline: string;
  whatIs: string;
  knownFor: CreateActivityKnownFor[];
  tryThis: { title: string; text: string };
  related: CreateActivityRelated[];
  heroAccent: string; // gradient stops for the hero banner
  tile: string; // soft gradient for the emoji tile
  button: string; // CTA colour classes
}

export const CREATE_ACTIVITIES: CreateActivity[] = [
  {
    slug: "draw",
    badge: "DRAW",
    title: "Draw",
    emoji: "🎨",
    tagline: "Bhārat has been drawing for 30,000 years — pick up a pencil and join the line.",
    whatIs:
      "Step-by-step drawing lessons, colouring sheets and art challenges inspired by Bhārat's painting traditions — from the murals of Ajanta to the folk art of today's villages.",
    knownFor: [
      {
        emoji: "🐘",
        title: "Madhubani",
        text: "Bihar's intricate line art, painted by Mithila women on walls and paper with natural colours — every peacock, fish and lotus carries a story.",
      },
      {
        emoji: "⚪",
        title: "Warli",
        text: "Maharashtra's tribal art, where circles and triangles dance into villages, trees and festivals — made with just white paint and a stick.",
      },
      {
        emoji: "🖌️",
        title: "Pattachitra",
        text: "Odisha's scroll paintings, where artists still grind their own colours and paint gods and epics with one fine brush.",
      },
      {
        emoji: "🏞️",
        title: "Ajanta murals",
        text: "1,600-year-old cave paintings so lifelike that artists still study them to learn how to draw a smile.",
      },
      {
        emoji: "🖼️",
        title: "Miniature paintings",
        text: "The tiny, jewel-bright court paintings of Rajasthan and the Himalayas — whole worlds of detail on a palm-sized page.",
      },
    ],
    tryThis: {
      title: "Draw a Warli village",
      text: "Use only circles, triangles and squares. Draw a tree, a dancing family and a festival — all in white on brown paper, just like the Warli artists of Maharashtra.",
    },
    related: [
      { label: "Madhubani painting", path: "/culture/madhubani-painting" },
      { label: "Warli art", path: "/culture/warli-art" },
      { label: "Pattachitra", path: "/culture/pattachitra" },
      { label: "Ajanta & Ellora", path: "/places/ajanta-ellora" },
    ],
    heroAccent: "from-[#7C3AED] to-[#A855F7]",
    tile: "from-[#F3E8FF] to-[#E9D5FF]",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
  },
  {
    slug: "make",
    badge: "MAKE",
    title: "Make",
    emoji: "✂️",
    tagline: "Fold, stick, tie and paint — crafts have kept Bhārat's festivals alive for centuries.",
    whatIs:
      "Hands-on craft projects inspired by Bhārat's festivals, toys and traditions — using paper, cloth, clay and things you can find in your kitchen.",
    knownFor: [
      {
        emoji: "🪆",
        title: "Channapatna toys",
        text: "Karnataka's wooden toys, coloured with natural lac — made for 200 years with no nails, no screws and no sharp edges.",
      },
      {
        emoji: "🪁",
        title: "Kite-making",
        text: "Paper kites rule the skies of Uttarayan and Makar Sankranti — a craft that turns a sheet of paper into a flying festival.",
      },
      {
        emoji: "🌸",
        title: "Rangoli",
        text: "Floor art of coloured powders, rice and petals, drawn at every doorstep to welcome guests and gods.",
      },
      {
        emoji: "🪔",
        title: "Lanterns & torans",
        text: "Paper lanterns, flower garlands and door hangings that turn every home into a celebration of Bhārat.",
      },
      {
        emoji: "🪡",
        title: "Patchwork & kantha",
        text: "Bengal's quilted storytelling — old saris stitched into warm, beautiful blankets of memory.",
      },
    ],
    tryThis: {
      title: "Fold a paper boat",
      text: "The paper boat is Bhārat's favourite toy — it floats on every puddle after the rains. Fold one, write your name on it, and set it sailing. Then try a paper lantern for Diwali!",
    },
    related: [
      { label: "Rangoli", path: "/culture/rangoli" },
      { label: "Mehndi", path: "/culture/mehndi" },
      { label: "Handloom sarees", path: "/culture/handloom-saree" },
      { label: "Diwali", path: "/culture/diwali" },
    ],
    heroAccent: "from-[#F97316] to-[#FB923C]",
    tile: "from-[#FFEDD5] to-[#FED7AA]",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
  },
  {
    slug: "experiment",
    badge: "EXPERIMENT",
    title: "Experiment",
    emoji: "🧪",
    tagline: "Bhārat's scientists reached Mars and found water on the Moon — curiosity is our superpower.",
    whatIs:
      "Simple, safe experiments you can try at home, inspired by the discoveries that began on soil of Bhārat — from the number zero to the Mars mission.",
    knownFor: [
      {
        emoji: "0️⃣",
        title: "The zero",
        text: "Bhārat invented the number for 'nothing' — and every computer, rocket and equation on Earth stands on it.",
      },
      {
        emoji: "🔭",
        title: "Aryabhata's spin",
        text: "A 5th-century astronomer proved the Earth rotates — a thousand years before Europe agreed.",
      },
      {
        emoji: "🏛️",
        title: "The rust-free pillar",
        text: "The Iron Pillar of Delhi has stood for 1,600 years without rusting — a chemistry mystery scientists still study.",
      },
      {
        emoji: "🩺",
        title: "Sushruta's surgery",
        text: "Plastic surgery was performed in Bhārat 2,600 years ago — with 120 instruments and a student's oath.",
      },
      {
        emoji: "🚀",
        title: "Mars on the first try",
        text: "ISRO reached Mars on its very first attempt — something no other space agency has managed.",
      },
    ],
    tryThis: {
      title: "The spinning Earth",
      text: "Draw a dot on a table-tennis ball. Spin it slowly — see how the dot faces you, then turns away. That's exactly why the Sun seems to rise and set: the Earth spins, just as Aryabhata said 1,500 years ago.",
    },
    related: [
      { label: "The concept of zero", path: "/create/zero-decimal-system" },
      { label: "Aryabhata's astronomy", path: "/create/aryabhata-astronomy" },
      { label: "Sushruta's surgery", path: "/create/sushruta-surgery" },
      { label: "ISRO & space", path: "/create/isro-space" },
    ],
    heroAccent: "from-[#16A34A] to-[#4ADE80]",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
  },
  {
    slug: "build",
    badge: "BUILD",
    title: "Build",
    emoji: "🏗️",
    tagline: "From 4,500-year-old cities to Moon landers — Bhārat builds big.",
    whatIs:
      "Build models, machines and structures and think like an engineer — in the footsteps of the builders of Dholavira, the stepwells and ISRO.",
    knownFor: [
      {
        emoji: "🏙️",
        title: "Dholavira",
        text: "A 4,500-year-old Harappan city with the world's first signboard — planned streets, water tanks and all.",
      },
      {
        emoji: "🪜",
        title: "The stepwells",
        text: "The baolis of Gujarat and Rajasthan are giant reverse towers — engineering that brings water up from deep underground.",
      },
      {
        emoji: "🕌",
        title: "The Taj Mahal",
        text: "Built 370 years ago with no computers — perfectly balanced, down to the last millimetre.",
      },
      {
        emoji: "🗼",
        title: "Jantar Mantar",
        text: "Jaipur's stone observatories are buildings that tell the time and track the stars.",
      },
      {
        emoji: "🚀",
        title: "ISRO rockets",
        text: "Bhārat's space rockets began as parts carried on bicycles — and now land on the Moon.",
      },
    ],
    tryThis: {
      title: "Build a paper bridge",
      text: "Roll five sheets of paper into tight tubes. Tape them side by side across two books — then test how many books your bridge can hold. That's real civil engineering!",
    },
    related: [
      { label: "The Taj Mahal", path: "/places/taj-mahal" },
      { label: "Hampi", path: "/places/hampi" },
      { label: "ISRO & space", path: "/create/isro-space" },
      { label: "Khajuraho", path: "/places/khajuraho" },
    ],
    heroAccent: "from-[#2563EB] to-[#60A5FA]",
    tile: "from-[#DBEAFE] to-[#BFDBFE]",
    button: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    slug: "write",
    badge: "WRITE",
    title: "Write",
    emoji: "✍️",
    tagline: "Bhārat told the world's most-loved stories — now it's your turn to add one.",
    whatIs:
      "Stories, poems, comics and letters — with prompts inspired by the tales that have travelled from Bhārat to every corner of the world.",
    knownFor: [
      {
        emoji: "📖",
        title: "Panchatantra",
        text: "Animal fables written 2,000 years ago to teach wisdom — now told in more than 50 languages across the planet.",
      },
      {
        emoji: "🐒",
        title: "Jataka tales",
        text: "The past-life stories of the Buddha — the source of folktales told from Persia to Europe.",
      },
      {
        emoji: "🏹",
        title: "The great epics",
        text: "The Ramayana and Mahabharata — among the longest and greatest poems ever written.",
      },
      {
        emoji: "🤴",
        title: "Akbar–Birbal riddles",
        text: "Riddle tales of the clever minister who out-thought everyone — Bhārat's favourite brain-teaser stories.",
      },
      {
        emoji: "🏆",
        title: "Tagore's Gitanjali",
        text: "Rabindranath Tagore's poems won the Nobel Prize — the first Asian writer to do so.",
      },
    ],
    tryThis: {
      title: "Write a Panchatantra fable",
      text: "Pick two animals (a clever fox and a slow tortoise?), give them one problem, and end with a lesson. Two hundred words is plenty — that's how the world's fables began.",
    },
    related: [
      { label: "Stories of Bhārat", path: "/stories" },
      { label: "Ideas of Bhārat", path: "/ideas" },
      { label: "Folk music", path: "/culture/folk-music" },
    ],
    heroAccent: "from-[#DB2777] to-[#F472B6]",
    tile: "from-[#FCE7F3] to-[#FBCFE8]",
    button: "bg-[#DB2777] hover:bg-[#BE185D]",
  },
  {
    slug: "newspaper",
    badge: "MAKE YOUR OWN NEWSPAPER",
    title: "Make Your Own Newspaper",
    emoji: "📰",
    tagline: "Newspapers helped win Bhārat's freedom — now print your own edition!",
    whatIs:
      "Design and publish your very own newspaper — headline, news, cartoons and ads — like the brave papers that spoke for Bhārat.",
    knownFor: [
      {
        emoji: "📜",
        title: "Bengal Gazette",
        text: "Bhārat's first newspaper, printed in 1780 in Kolkata — written by hand, printed by machine.",
      },
      {
        emoji: "✒️",
        title: "Kesari",
        text: "Bal Gangadhar Tilak's fiery paper that woke a nation — and taught people of Bhārat their own history.",
      },
      {
        emoji: "🗞️",
        title: "The Hindu",
        text: "Born in 1878 to fight an unfair tax, still published every single day from Chennai.",
      },
      {
        emoji: "🗣️",
        title: "The voice of freedom",
        text: "From Swadeshi to Satyagraha, newspapers carried the freedom movement into every home.",
      },
      {
        emoji: "📻",
        title: "Radio & beyond",
        text: "When villages had no papers, radio told the news in every language of Bhārat.",
      },
    ],
    tryThis: {
      title: "Publish a one-page paper",
      text: "Give it a name (like 'Pakka Patriot Junior'), write one headline about your week, two short news items, a cartoon, and one ad for your favourite mithai. Print it or copy it for your family!",
    },
    related: [
      { label: "People of Bhārat", path: "/people" },
      { label: "Ideas of Bhārat", path: "/ideas" },
    ],
    heroAccent: "from-[#16A34A] to-[#34D399]",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
  },
  {
    slug: "videos",
    badge: "CREATE VIDEOS",
    title: "Create Videos",
    emoji: "🎬",
    tagline: "Bhārat makes more films than any country on Earth — roll your own 60 seconds!",
    whatIs:
      "Make 60-second videos — stories, talents and ideas — in the land that built a cinema loved across the planet.",
    knownFor: [
      {
        emoji: "🎥",
        title: "Raja Harishchandra",
        text: "In 1913, Dadasaheb Phalke made Bhārat's first film — a silent epic shot entirely in Bhārat.",
      },
      {
        emoji: "🎭",
        title: "Mythological epics",
        text: "The Ramayana and Mahabharata serials brought whole families to their televisions — and made history.",
      },
      {
        emoji: "🌊",
        title: "RRR & Baahubali",
        text: "films now smash of Bhārat records from Japan to America — a billion fans and counting.",
      },
      {
        emoji: "🏆",
        title: "Oscars & Cannes",
        text: "From Satyajit Ray to 'Naatu Naatu', cinema of Bhārat keeps winning the world's top awards.",
      },
      {
        emoji: "🎨",
        title: "Animation for kids",
        text: "Chhota Bheem and friends — cartoons loved by children of Bhārat across the globe.",
      },
    ],
    tryThis: {
      title: "Make a silent film",
      text: "Shoot 60 seconds with no dialogue — only actions, music and expression. Bhārat's first film had no sound at all — and it conquered the country!",
    },
    related: [
      { label: "cinema of Bhārat", path: "/create/cinema-of-bharat" },
      { label: "film music of Bhārat", path: "/culture/film-music-of-bharat" },
    ],
    heroAccent: "from-[#F97316] to-[#FBBF24]",
    tile: "from-[#FFEDD5] to-[#FED7AA]",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
  },
  {
    slug: "my-bharat",
    badge: "MY INDIA",
    title: "My Bhārat",
    emoji: "📸",
    tagline: "Snow peaks, tiger forests, temple towns — your Bhārat is worth photographing.",
    whatIs:
      "Upload photos of your place and show the world the beauty around you — every lane, field and sky of Bhārat is a story.",
    knownFor: [
      {
        emoji: "🏔️",
        title: "Mountains to beaches",
        text: "From the snowy Himalayas to coconut-fringed shores — Bhārat holds every kind of beauty on Earth.",
      },
      {
        emoji: "🐅",
        title: "Wild wonders",
        text: "Bengal tigers, one-horned rhinos and dancing peacocks — Bhārat protects more wildlife than most nations.",
      },
      {
        emoji: "🕌",
        title: "Ancient marvels",
        text: "The Taj Mahal, Hampi, Khajuraho — wonder after wonder, built thousands of years apart.",
      },
      {
        emoji: "🌾",
        title: "Festivals in every field",
        text: "Every region celebrates its own harvests, music and colours — a different Bhārat around every corner.",
      },
      {
        emoji: "🏘️",
        title: "The everyday",
        text: "A chai stall, a rangoli doorstep, a kite on a roof — Bhārat's real beauty is in its everyday.",
      },
    ],
    tryThis: {
      title: "Photo-walk your street",
      text: "Take 5 photos of your neighbourhood — a shop, a tree, a building, a pet, a sky. Write one line under each. That's your My Bhārat exhibition!",
    },
    related: [
      { label: "Places of Bhārat", path: "/places" },
      { label: "Ladakh", path: "/places/ladakh" },
      { label: "Sundarbans", path: "/places/sundarbans" },
      { label: "Kerala backwaters", path: "/places/kerala-backwaters" },
    ],
    heroAccent: "from-[#7C3AED] to-[#A78BFA]",
    tile: "from-[#F3E8FF] to-[#E9D5FF]",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
  },
  {
    slug: "make-a-game",
    badge: "MAKE A GAME",
    title: "Make a Game",
    emoji: "🎲",
    tagline: "Chess, Snakes & Ladders and Pachisi all began in Bhārat — design the next one!",
    whatIs:
      "Design your own board game — theme, rules, dice and challenges — following the ancient game-makers of Bhārat.",
    knownFor: [
      {
        emoji: "🐍",
        title: "Moksha Patam",
        text: "The original Snakes & Ladders — a lesson of Bhārat in karma, where ladders lifted virtue and snakes dragged down vice.",
      },
      {
        emoji: "♟️",
        title: "Chaturanga",
        text: "The war game that became chess — born in Bhārat 1,500 years ago.",
      },
      {
        emoji: "🎲",
        title: "Pachisi",
        text: "The royal cross-board game of the Mahabharata, played by kings and queens.",
      },
      {
        emoji: "🐚",
        title: "Chaukabaara",
        text: "Cowrie-shell racing on a square board — 2,000 years old and still played in villages.",
      },
      {
        emoji: "🐐",
        title: "Aadu Puli Aatam",
        text: "Goats versus tigers on a temple triangle — a South Bhārat classic of pure strategy.",
      },
    ],
    tryThis: {
      title: "Design a 20-square board",
      text: "Pick a theme (samosas vs jalebis?), draw 20 squares, write 3 rules, add 2 shortcuts and 2 traps. Now play it with your family — and improve it!",
    },
    related: [
      { label: "Playroom", path: "/play" },
      { label: "Chaturanga — chess", path: "/create/chaturanga-chess" },
      { label: "Moksha Patam", path: "/create/moksha-patam" },
      { label: "Play Pachisi", path: "/play/pachisi" },
    ],
    heroAccent: "from-[#2563EB] to-[#38BDF8]",
    tile: "from-[#DBEAFE] to-[#BFDBFE]",
    button: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    slug: "puzzles",
    badge: "PUZZLES & PRINTABLES",
    title: "Puzzles & Printables",
    emoji: "🧩",
    tagline: "Bhārat built the first magic squares — and the best puzzles still come from here.",
    whatIs:
      "Crosswords, mazes, colouring sheets and maths puzzles — downloadable and printable, inspired by Bhārat's number-wizards.",
    knownFor: [
      {
        emoji: "🪄",
        title: "Magic squares",
        text: "A 1,000-year-old temple in Bhārat hides a 4×4 magic square — every row, column and diagonal adds up to 34.",
      },
      {
        emoji: "♾️",
        title: "Ramanujan's 1729",
        text: "The taxi number! 1729 is the smallest number you can write as two cubes in two different ways — Ramanujan knew it instantly.",
      },
      {
        emoji: "🔢",
        title: "Vedic maths",
        text: "Lightning-fast mental arithmetic tricks, written in the Vedas thousands of years ago.",
      },
      {
        emoji: "0️⃣",
        title: "The decimal system",
        text: "Bhārat's place-value system turned arithmetic into a game anyone can win.",
      },
      {
        emoji: "🗺️",
        title: "Maps & mazes",
        text: "Puzzle-makers have turned Bhārat's geography into mazes, jigsaws and dot-to-dots for kids everywhere.",
      },
    ],
    tryThis: {
      title: "Prove 1729",
      text: "Find two different pairs of cubes that add up to the same number. Hint: 1³ + 12³ = 9³ + 10³ — that's 1 + 1728 = 729 + 1000 = 1729!",
    },
    related: [{ label: "The concept of zero", path: "/create/zero-decimal-system" }],
    heroAccent: "from-[#7C3AED] to-[#8B5CF6]",
    tile: "from-[#EDE9FE] to-[#DDD6FE]",
    button: "bg-[#7C3AED] hover:bg-[#6D28D9]",
  },
  {
    slug: "grandparents",
    badge: "CREATE WITH GRANDPARENTS",
    title: "Create with Grandparents",
    emoji: "👵🏽",
    tagline: "Every grandparent carries a library of stories — record yours before it's too late.",
    whatIs:
      "Ask, record and preserve the stories, songs and wisdom of your grandparents — Bhārat's greatest unwritten treasure.",
    knownFor: [
      {
        emoji: "🪑",
        title: "Grandma's tales",
        text: "Every family has a thousand stories of Bhārat — of journeys, festivals, mischief and miracles.",
      },
      {
        emoji: "🎶",
        title: "Lullabies",
        text: "The first songs a child of Bhārat hears are grandmother songs — passed down for generations.",
      },
      {
        emoji: "🧺",
        title: "Proverbs & riddles",
        text: "A whole philosophy in one sentence — every language has its own wise sayings of Bhārat.",
      },
      {
        emoji: "🌿",
        title: "Nani's kitchen",
        text: "Home remedies for every cough and cut — a living pharmacy of grandma's recipes.",
      },
      {
        emoji: "🪔",
        title: "Festival customs",
        text: "Grandparents are the keepers of how we light lamps, tie rakhis and make sweets.",
      },
    ],
    tryThis: {
      title: "Interview a grandparent",
      text: "Record 5 questions: What was your childhood? Your first festival memory? Your school? One brave moment? One piece of advice? Keep the recording — it will be priceless.",
    },
    related: [
      { label: "Diwali", path: "/culture/diwali" },
      { label: "Holi", path: "/culture/holi" },
      { label: "Traditions of Bhārat", path: "/culture" },
    ],
    heroAccent: "from-[#F97316] to-[#FDBA74]",
    tile: "from-[#FFF7ED] to-[#FED7AA]",
    button: "bg-[#F97316] hover:bg-[#EA580C]",
  },
  {
    slug: "create-for-bharat",
    badge: "CREATE FOR INDIA",
    title: "Create for Bhārat",
    emoji: "💡",
    tagline: "The future of Bhārat will be built by kids like you — start today.",
    whatIs:
      "Take challenges and create ideas that make Bhārat better — cleaner, greener, kinder and smarter.",
    knownFor: [
      {
        emoji: "🚀",
        title: "Space for everyone",
        text: "Dr. Sarabhai believed rockets should serve farmers and schools — and today they do.",
      },
      {
        emoji: "🧹",
        title: "Swachh Bharat",
        text: "A nationwide mission that built millions of toilets and cleaned thousands of towns.",
      },
      {
        emoji: "💡",
        title: "Kid innovators",
        text: "School children have invented solar lamps, sanitary machines and low-cost tractors — some of the world's best ideas come from kids.",
      },
      {
        emoji: "🌳",
        title: "Chipko hugging",
        text: "Villagers hugged trees to save their forests — a hug that changed Bhārat's laws.",
      },
      {
        emoji: "🇮🇳",
        title: "Ideas that unite",
        text: "From the Constitution to the tricolour, Bhārat was built by big, bold ideas.",
      },
    ],
    tryThis: {
      title: "Spot a problem, sketch a fix",
      text: "Look around your neighbourhood. Pick one small problem (wasted water? plastic on the street?) and sketch 3 ideas to solve it. One of them could be the next big invention of Bhārat!",
    },
    related: [
      { label: "Ideas of Bhārat", path: "/ideas" },
      { label: "People of Bhārat", path: "/people" },
      { label: "ISRO & space", path: "/create/isro-space" },
    ],
    heroAccent: "from-[#16A34A] to-[#22C55E]",
    tile: "from-[#DCFCE7] to-[#BBF7D0]",
    button: "bg-[#16A34A] hover:bg-[#15803D]",
  },
];

export function getActivityBySlug(slug: string): CreateActivity | undefined {
  return CREATE_ACTIVITIES.find((activity) => activity.slug === slug);
}

/** Replace the maker activities with the data fetched from the Laravel API. */
export function hydrateActivities(activities: CreateActivity[]): void {
  CREATE_ACTIVITIES.length = 0;
  CREATE_ACTIVITIES.push(...activities);
}