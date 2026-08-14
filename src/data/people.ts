/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * People of Bhārat — the icons who shaped a nation.
 * Curated by Pakka Patriot. Know Bhārat. Be Bhārat.
 */

import {
  Bird,
  Flame,
  Swords,
  Scale,
  BookOpen,
  Sun,
  Rocket,
  Infinity,
  Feather,
  Globe,
  Scroll,
  Trophy,
  Users,
} from "lucide-react";
import type { Collection, CollectionItem } from "./collections";
import { BHARATA_BHARATI_PEOPLE } from "./people-bharata";
import { BHARATA_EPIC_2 } from "./people-bharata-epic2";
import { BHARATA_EPIC_3 } from "./people-bharata-epic3";
import { BHARATA_EPIC_4 } from "./people-bharata-epic4";
import { BHARATA_EPIC_5 } from "./people-bharata-epic5";
import { BHARATA_EPIC_6 } from "./people-bharata-epic6";
import { BHARATA_FREEDOM_1 } from "./people-bharata-freedom1";
import { BHARATA_FREEDOM_2 } from "./people-bharata-freedom2";
import { BHARATA_FREEDOM_3 } from "./people-bharata-freedom3";
import { BHARATA_FREEDOM_4 } from "./people-bharata-freedom4";
import { BHARATA_FREEDOM_5 } from "./people-bharata-freedom5";
import { BHARATA_SAINTS_1 } from "./people-bharata-saints1";
import { BHARATA_SAINTS_2 } from "./people-bharata-saints2";
import { BHARATA_SAINTS_3 } from "./people-bharata-saints3";
import { BHARATA_SAINTS_4 } from "./people-bharata-saints4";
import { BHARATA_KINGS_1 } from "./people-bharata-kings1";
import { BHARATA_KINGS_2 } from "./people-bharata-kings2";
import { BHARATA_KINGS_3 } from "./people-bharata-kings3";
import { BHARATA_SCIENCE_1 } from "./people-bharata-science1";
import { BHARATA_SCIENCE_2 } from "./people-bharata-science2";
import { BHARATA_SCIENCE_3 } from "./people-bharata-science3";
import { BHARATA_POETS } from "./people-bharata-culture1";
import { BHARATA_POETS_2 } from "./people-bharata-culture2";
import { BHARATA_ARTISTS } from "./people-bharata-artists";
import { BHARATA_ARTISTS_2 } from "./people-bharata-artists2";
import { BHARATA_SOCIAL_1 } from "./people-bharata-social1";
import { BHARATA_SPORT_1 } from "./people-bharata-sport1";

const CATEGORIES: Collection["categories"] = [
  { id: "Artists & Performers", label: "Artists & Performers" },
  { id: "Epic & Mythological", label: "Epic & Mythological" },
  { id: "Freedom Fighters", label: "Freedom Fighters" },
  { id: "Kings & Strategists", label: "Kings & Strategists" },
  { id: "Poets & Writers", label: "Poets & Writers" },
  { id: "Saints & Sages", label: "Saints & Sages" },
  { id: "Scientists & Thinkers", label: "Scientists & Thinkers" },
  { id: "Social Reformers", label: "Social Reformers" },
  { id: "Sporting Legends", label: "Sporting Legends" },
];

const ITEMS: CollectionItem[] = [
  {
    slug: "mahatma-gandhi",
    name: "Mahatma Gandhi",
    nativeName: "महात्मा गांधी",
    tagline: "The Father of the Nation who freed Bhārat with non-violence",
    category: "Freedom Fighters",
    era: "1869 – 1948",
    attribution: "Mohandas Karamchand Gandhi",
    region: "Porbandar, Gujarat",
    icon: Bird,
    accent: "from-[#587760] to-[#6A8B72]",
    softAccent: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconColor: "text-emerald-600",
    quote: "Be the change you wish to see in the world.",
    quoteSource: "Mahatma Gandhi",
    summary:
      "Mohandas Karamchand Gandhi — the Mahatma, the 'Great Soul' — led Bhārat to freedom not with armies but with ahimsa, non-violent resistance. His Satyagraha ('truth-force') inspired civil rights movements from America to South Africa, and his spinning wheel became the symbol of a self-reliant nation.",
    overview: [
      "Born in Porbandar in 1869, Gandhi studied law in London and first practised Satyagraha in South Africa, where he fought for the rights of people of Bhārat against racist laws. He returned to Bhārat in 1915 and within a few years transformed the freedom struggle from elite petitioning into a mass movement of millions.",
      "His weapons were simple and devastating: the Salt March of 1930, where he walked 390 kilometres to the sea to make salt, defying the British salt tax; the Quit Bhārat call of 1942; and the spinning wheel, with which he urged every person of Bhārat to spin khadi and reject British cloth. He fasted to end riots and prayed for peace between communities.",
      "On 30 January 1948, Gandhi was assassinated by a man who opposed his message of unity. The nation wept, and the world's greatest apostle of non-violence passed into legend. In 2007, the United Nations declared 2 October — his birthday — the International Day of Non-Violence.",
    ],
    coreIdeas: [
      { title: "Satyagraha", text: "Truth-force — resisting injustice through disciplined, non-violent action." },
      { title: "Ahimsa", text: "Absolute non-violence in thought, word, and deed — even against enemies." },
      { title: "The Salt March", text: "A 390-kilometre walk that broke the British salt monopoly and electrified Bhārat." },
      { title: "Khadi & Self-Reliance", text: "Spinning one's own cloth as a protest and a path to dignity." },
      { title: "Sarvodaya", text: "The welfare of all — no one is free until the last person is free." },
    ],
    legacy:
      "Gandhi gave humanity a new weapon: non-violence. Martin Luther King Jr., Nelson Mandela, and countless movements drew from his example. He is not only Bhārat's Father of the Nation — he is the conscience of the modern world.",
  },
  {
    slug: "subhas-chandra-bose",
    name: "Subhas Chandra Bose",
    nativeName: "सुभाष चंद्र बोस",
    tagline: "Netaji — 'Give me blood, and I will give you freedom!'",
    category: "Freedom Fighters",
    era: "1897 – 1945",
    attribution: "Netaji — leader of the Indian National Army",
    region: "Cuttack, Odisha",
    icon: Flame,
    accent: "from-[#991B1B] to-[#DC2626]",
    softAccent: "bg-red-50 text-red-700 border-red-200",
    iconColor: "text-red-600",
    quote: "Give me blood, and I will give you freedom!",
    quoteSource: "Netaji Subhas Chandra Bose",
    summary:
      "Subhas Chandra Bose — Netaji — was the fire of Bhārat's freedom struggle. Where others petitioned, he raised an army: the Indian National Army, forged in Southeast Asia, whose battle cry 'Jai Hind' still rings across Bhārat. His story is one of the most daring escapes in history.",
    overview: [
      "Born into a prominent Bengali family in Cuttack, Bose was a brilliant student who passed the Indian Civil Service exam — then resigned, refusing to serve an empire he was determined to end. He rose to lead the Congress and became famous for his fierce nationalism, clashing with the moderate leadership of his time.",
      "In 1941, under house arrest by the British, Bose staged one of history's great escapes: disguised as a Pathan, he slipped out of his home in Calcutta, travelled overland to Afghanistan, and reached Germany — where he broadcast 'Free Bhārat Radio' to the world. From there he went to Southeast Asia by submarine.",
      "In Singapore, he took command of the Indian National Army, raised largely from prisoners of war of Bhārat, and declared a Provisional Government of Free Bhārat. 'Delhi Chalo!' — 'On to Delhi!' — he urged his soldiers as they marched with Japan toward Bhārat's borders. His rallying cry, 'Jai Hind', became the national salute of free Bhārat.",
    ],
    coreIdeas: [
      { title: "The INA", text: "An army of soldiers raised to fight for Bhārat's freedom with arms." },
      { title: "The Great Escape", text: "A daring escape from house arrest to Germany, then to Asia by submarine." },
      { title: "Delhi Chalo", text: "The march of the Indian National Army toward the gates of Bhārat." },
      { title: "Jai Hind", text: "His battle cry became Bhārat's most famous salute." },
      { title: "Give Me Blood", text: "His electrifying call for sacrifice that stirred a generation." },
    ],
    legacy:
      "Netaji's courage shook the British empire and inspired the navy mutiny of 1946, which helped end British rule. The mystery of his death remains one of Bhārat's great questions, and his statue — in the central plaza of Delhi — keeps his flame alive forever.",
  },
  {
    slug: "rani-lakshmibai",
    name: "Rani Lakshmibai",
    nativeName: "रानी लक्ष्मीबाई",
    tagline: "The Queen of Jhansi who rode into battle with her baby on her back",
    category: "Freedom Fighters",
    era: "1828 – 1858",
    attribution: "Manikarnika — the Queen of Jhansi",
    region: "Varanasi, Uttar Pradesh; ruled Jhansi",
    icon: Swords,
    accent: "from-[#7C2D12] to-[#EA580C]",
    softAccent: "bg-orange-50 text-orange-700 border-orange-200",
    iconColor: "text-orange-600",
    quote: "Main apni Jhansi nahi doongi! — 'I will not surrender my Jhansi!'",
    quoteSource: "Rani Lakshmibai",
    summary:
      "When the British tried to annex her kingdom, the Rani of Jhansi refused — and rode to war. In the great uprising of 1857, she became the symbol of resistance of Bhārat, fighting to her last breath with her adopted son strapped to her back.",
    overview: [
      "Born Manikarnika in Varanasi in 1828, she was raised like a boy among soldiers, trained in swordsmanship and horse-riding. Married to the Raja of Jhansi at fourteen, she became its queen — and when her husband died, she refused the British doctrine of 'lapse' that would have annexed her kingdom.",
      "When the 1857 uprising exploded, Jhansi rose with it. The Rani — 'Jhansi ki Rani' — led her troops personally, a sword in each hand and her adopted son Damodar Rao strapped to her back. For months she held the fort against overwhelming British forces, and when Jhansi fell, she escaped with her army on horseback.",
      "She joined the rebel leader Tatya Tope and fought on at Kalpi and Gwalior. On 17 June 1858, in the Battle of Kotah-ki-Serai, the Rani fell, dressed as a soldier. She was just 29. The British report recorded simply: 'The Rani, the most dangerous of all the rebel leaders, is no more.'",
    ],
    coreIdeas: [
      { title: "Refusing Annexation", text: "She defied the British doctrine of lapse to keep her kingdom." },
      { title: "A Queen in Combat", text: "She led her army in person, sword in hand and child on her back." },
      { title: "The 1857 Uprising", text: "Jhansi became a fortress of the great revolt against British rule." },
      { title: "The Last Ride", text: "She fell fighting at Kotah-ki-Serai, dressed as a soldier, aged 29." },
      { title: "The Ballad of Jhansi", text: "Subhadra Kumari Chauhan's poem made her immortal in every heart of Bhārat." },
    ],
    legacy:
      "Rani Lakshmibai is Bhārat's eternal symbol of courage — a queen who traded her throne for a sword. Every girl who dreams beyond limits walks in her stirrups.",
  },
  {
    slug: "br-ambedkar",
    name: "Dr. B.R. Ambedkar",
    nativeName: "डॉ. भीमराव आंबेडकर",
    tagline: "The architect of the Constitution and a crusader for equality",
    category: "Social Reformers",
    era: "1891 – 1956",
    attribution: "Bhimrao Ramji Ambedkar — 'Babasaheb'",
    region: "Mhow, Madhya Pradesh",
    icon: Scale,
    accent: "from-[#1E40AF] to-[#3B82F6]",
    softAccent: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
    quote: "Constitution is not a mere lawyers' document, it is a vehicle of life.",
    quoteSource: "Dr. B.R. Ambedkar",
    summary:
      "Born into a family considered 'untouchable', Bhimrao Ambedkar rose to become the chief architect of Bhārat's Constitution — and spent his life tearing down the walls of caste. His achievement is written in the fundamental rights every citizen enjoys today of Bhārat.",
    overview: [
      "Ambedkar was born in 1891 to a Mahar family, subjected to the cruelties of untouchability from childhood — denied water, school, and dignity. But he was also a genius of iron will: he won scholarships to Columbia University and the London School of Economics, earning doctorates in economics and law while studying at the bar.",
      "He returned to Bhārat to fight the caste system itself. He led the Mahad Satyagraha to drink from the public water tank, burned the Manusmriti in protest, and fought for separate electorates — winning the Poona Pact with Gandhi for reserved seats for the depressed classes.",
      "In 1947, independent Bhārat chose him to chair the committee that drafted the Constitution. He embedded in it the very rights he had been denied: abolition of untouchability, equality before law, freedom of speech, and affirmative action. Late in life, he converted to Buddhism with half a million followers, launching a revival that continues today.",
    ],
    coreIdeas: [
      { title: "Constitution Architect", text: "He drafted the fundamental rights that protect every person of Bhārat." },
      { title: "Against Caste", text: "A lifelong war against untouchability and social discrimination." },
      { title: "The Mahad Satyagraha", text: "He led the march to assert the right of all to public water." },
      { title: "Education as Weapon", text: "His own degrees proved that knowledge breaks every barrier." },
      { title: "The Buddhist Turn", text: "His mass conversion gave Dalits a path of dignity and equality." },
    ],
    legacy:
      "Babasaheb Ambedkar is the conscience of the republic of Bhārat. Every year, millions honour him on Ambedkar Jayanti, and his Constitution Day is now a national holiday. He turned the pain of exclusion into the charter of a nation.",
  },
  {
    slug: "raja-ram-mohan-roy",
    name: "Raja Ram Mohan Roy",
    nativeName: "राजा राममोहन राय",
    tagline: "The Father of the Renaissance who fought of Bhārat for reason",
    category: "Social Reformers",
    era: "1772 – 1833",
    attribution: "Ram Mohan Roy — 'The Father of Modern Bhārat'",
    region: "Radhanagar, Bengal",
    icon: BookOpen,
    accent: "from-[#0F766E] to-[#14B8A6]",
    softAccent: "bg-teal-50 text-teal-700 border-teal-200",
    iconColor: "text-teal-600",
    quote: "Sati, in all its forms, is a murderous superstition.",
    quoteSource: "Raja Ram Mohan Roy, campaign against sati",
    summary:
      "Two centuries ago, when superstition ruled, Raja Ram Mohan Roy lit the lamp of reason. He fought the practice of sati, championed education for girls, founded the Brahmo Samaj, and is rightly called the Father of the Renaissance of Bhārat.",
    overview: [
      "Born into a wealthy Brahmin family in Bengal in 1772, Ram Mohan Roy studied Sanskrit, Persian, Arabic, and English — and used every language to ask one question: what is true? He found truth not in blind custom but in reason and in the Upanishads, which he championed as the purest core of wisdom of Bhārat.",
      "His greatest battle was against sati — the burning of widows on their husbands' funeral pyres. Roy personally witnessed the horror, founded anti-sati societies, wrote tirelessly, and finally convinced the British governor William Bentinck to outlaw the practice in 1829. He was the first great person of Bhārat to defeat an entrenched custom through reform.",
      "He founded the Brahmo Samaj to purify Hindu worship, started Bhārat's first newspaper in languages of Bhārat, and fought for the rights of women and the abolition of caste. When the British mocked learning of Bhārat, he answered with scholarship; when they blocked progress of Bhārat, he answered with petitions.",
    ],
    coreIdeas: [
      { title: "Against Sati", text: "His campaign led to the legal abolition of widow-burning in 1829." },
      { title: "Reason over Custom", text: "Reform every tradition that reason and compassion reject." },
      { title: "Education for All", text: "A pioneer of modern education, including for girls." },
      { title: "The Brahmo Samaj", text: "A movement for purified, rational, and ethical worship." },
      { title: "The Press", text: "He launched newspapers in the languages of Bhārat to spread reform." },
    ],
    legacy:
      "Ram Mohan Roy is the hinge on which modern Bhārat swung open. Every reformer after him — from Ishwar Chandra Vidyasagar to Ambedkar — walked through the doorway he built.",
  },
  {
    slug: "cv-raman",
    name: "C.V. Raman",
    nativeName: "सी.वी. रमन",
    tagline: "The Nobel scientist who discovered why the sea is blue",
    category: "Scientists & Thinkers",
    era: "1888 – 1970",
    attribution: "Sir Chandrasekhara Venkata Raman",
    region: "Tiruchirappalli, Tamil Nadu",
    icon: Sun,
    accent: "from-[#0284C7] to-[#38BDF8]",
    softAccent: "bg-sky-50 text-sky-700 border-sky-200",
    iconColor: "text-sky-600",
    quote: "Ask the right questions, and nature will open the doors to her secrets.",
    quoteSource: "C.V. Raman",
    summary:
      "C.V. Raman was the first Asian and first person of Bhārat to win a Nobel Prize in science — for discovering why light changes colour when it passes through matter, the famous Raman Effect. He was curious about the blue sea; he ended up explaining the behaviour of light itself.",
    overview: [
      "On a sea voyage to England in 1921, Raman looked at the Mediterranean and asked a child's question: why is the sea blue? The great physicist Lord Rayleigh had said it merely reflected the sky — but Raman suspected the water itself was scattering the light. He tested it with a simple prism and a bucket of water, and he was right.",
      "On 28 February 1928, Raman announced his discovery: when light passes through a transparent material, a tiny fraction scatters with a changed wavelength, revealing the material's molecular secrets. The 'Raman Effect' became a tool used across physics, chemistry, and biology — even today's hand-held Raman spectrometers descend from it.",
      "The Nobel Prize came in 1930, making Raman the first Asian scientist honoured by Stockholm. He returned to Bhārat and founded the Indian Institute of Science's physics department and the Raman Research Institute in Bengaluru, where he worked until his death — nurturing a generation of physicists of Bhārat.",
    ],
    coreIdeas: [
      { title: "The Raman Effect", text: "Light scattering that reveals the inner structure of matter." },
      { title: "Why the Sea Is Blue", text: "A child's question about the ocean led to a Nobel discovery." },
      { title: "First Asian Nobel in Science", text: "Stockholm's 1930 honour for a physicist of Bhārat." },
      { title: "Instruments of Genius", text: "He often built his own apparatus — simple tools, brilliant results." },
      { title: "National Science Day", text: "28 February, the day of his discovery, is celebrated across Bhārat." },
    ],
    legacy:
      "Raman proved that world-class science can be done in Bhārat, with Bhārat's resources. His discovery powers modern medicine, chemistry, and space exploration — and his birthday experiment remains a lesson in curiosity for every child.",
  },
  {
    slug: "apj-abdul-kalam",
    name: "A.P.J. Abdul Kalam",
    nativeName: "ए.पी.जे. अब्दुल कलाम",
    tagline: "The Missile Man who became the People's President",
    category: "Scientists & Thinkers",
    era: "1931 – 2015",
    attribution: "Avul Pakir Jainulabdeen Abdul Kalam",
    region: "Rameswaram, Tamil Nadu",
    icon: Rocket,
    accent: "from-[#312E81] to-[#6366F1]",
    softAccent: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconColor: "text-indigo-600",
    quote: "Dream, dream, dream. Dreams transform into thoughts, and thoughts result in action.",
    quoteSource: "Dr. A.P.J. Abdul Kalam",
    summary:
      "From selling newspapers as a boy in Rameswaram to becoming the President of Bhārat, A.P.J. Abdul Kalam lived the dream of Bhārat. The scientist behind Bhārat's missiles and nuclear tests, he was loved more as a teacher — 'Dream Kalam' to the millions of students he inspired.",
    overview: [
      "Kalam was born in a humble boatman's family in Rameswaram, Tamil Nadu, in 1931. As a boy he sold newspapers to support his family, but his eyes were on the sky. He studied physics and aerospace engineering, and at the newly formed ISRO he began his life's work in rocketry.",
      "At DRDO and ISRO, Kalam led Bhārat's missile programme — Agni and Prithvi — earning the title 'Missile Man of Bhārat'. He was the driving force behind Pokhran-II, Bhārat's nuclear tests of 1998, and his work gave Bhārat its strategic independence. Yet his dream was never war — it was a developed Bhārat by 2020.",
      "In 2002, Kalam was elected President of Bhārat — the first scientist and the first bachelor to hold the office. He called himself 'a teacher at heart', spending his evenings with schoolchildren, urging them to dream big. On 27 July 2015, he collapsed while delivering a lecture to students in Shillong — dying, fittingly, in the act of teaching.",
    ],
    coreIdeas: [
      { title: "Missile Man of Bhārat", text: "Leader of the Agni and Prithvi missile programmes and Pokhran-II." },
      { title: "From Paper Boy to President", text: "The most improbable rise in public life of Bhārat." },
      { title: "Vision 2020", text: "His blueprint for transforming Bhārat into a developed nation." },
      { title: "The People's President", text: "Loved more than any president for his simplicity and warmth." },
      { title: "Teacher to the End", text: "He died delivering a lecture to students — the classroom was his home." },
    ],
    legacy:
      "Kalam inspired a generation to 'dream, dream, dream'. His birthday, 15 October, is celebrated as World Students' Day — a man who rose from a fishing town to light the sky of Bhārat, and whose pen name was 'Missile Man', and whose real name was hope.",
  },
  {
    slug: "srinivasa-ramanujan",
    name: "Srinivasa Ramanujan",
    nativeName: "श्रीनिवास रामानुजन",
    tagline: "The man who knew infinity — mathematics from a vision",
    category: "Scientists & Thinkers",
    era: "1887 – 1920",
    attribution: "Srinivasa Ramanujan",
    region: "Erode, Tamil Nadu",
    icon: Infinity,
    accent: "from-[#7E22CE] to-[#A855F7]",
    softAccent: "bg-purple-50 text-purple-700 border-purple-200",
    iconColor: "text-purple-600",
    quote: "An equation for me has no meaning unless it expresses a thought of God.",
    quoteSource: "Srinivasa Ramanujan",
    summary:
      "With no formal training, a clerk from Madras wrote down formulas that left Cambridge's greatest mathematicians speechless. Srinivasa Ramanujan, the man who knew infinity, produced mathematics so far ahead of his time that it still shapes modern physics and computing.",
    overview: [
      "Ramanujan was born in a poor Tamil Brahmin family in 1887 and grew up in Kumbakonam. He was a solitary genius: failing college because he ignored everything except mathematics, he filled notebooks with thousands of results — no derivations, just conclusions, as if they were handed to him in visions.",
      "In 1913 he sent a letter of his formulas to the great Cambridge mathematician G.H. Hardy. Hardy later said the formulas 'must be true, because if they were not true, no one would have had the imagination to invent them.' Hardy brought him to Cambridge, where the self-taught genius became a Fellow of the Royal Society at 30.",
      "Ramanujan's legacy includes the partition function, modular forms, and the mysterious 'Ramanujan-Hardy number' 1729 — the smallest number expressible as the sum of two cubes in two ways. He died of illness at just 32, leaving notebooks that mathematicians are still mining today — now powering everything from black-hole physics to modern computing.",
    ],
    coreIdeas: [
      { title: "Notebooks of Genius", text: "Thousands of unproved results written as if from another world." },
      { title: "The Number 1729", text: "The famous taxi-cab number — the smallest expressible as two cubes, two ways." },
      { title: "Partition & Modular Forms", text: "Work that now underpins physics and computer science." },
      { title: "Self-Taught", text: "Nearly no formal training — pure, blazing intuition." },
      { title: "Fellow of the Royal Society", text: "The highest honour, achieved at 30 by a clerk of Bhārat." },
    ],
    legacy:
      "Ramanujan's formulas are now used in string theory, black-hole research, and algorithms. His life is the ultimate proof that genius needs no university — only an untamed mind and a notebook.",
  },
  {
    slug: "rabindranath-tagore",
    name: "Rabindranath Tagore",
    nativeName: "रवींद्रनाथ टैगोर",
    tagline: "The bard who wrote two national anthems and won a Nobel",
    category: "Poets & Writers",
    era: "1861 – 1941",
    attribution: "Rabindranath Tagore — 'Gurudev'",
    region: "Calcutta, Bengal",
    icon: Feather,
    accent: "from-[#9D174D] to-[#EC4899]",
    softAccent: "bg-rose-50 text-rose-700 border-rose-200",
    iconColor: "text-rose-600",
    quote: "Where the mind is without fear and the head is held high... into that heaven of freedom, my Father, let my country awake.",
    quoteSource: "Rabindranath Tagore, Gitanjali",
    summary:
      "Rabindranath Tagore was a poet, painter, composer, and educator — the first non-European to win the Nobel Prize in Literature. He wrote the national anthems of two countries, Bhārat and Bangladesh, and built a university on a riverbank where the world met the East.",
    overview: [
      "Born in 1861 into the brilliant Tagore family of Calcutta, Rabindranath began writing poetry as a child and never stopped. He wrote thousands of poems, songs, plays, and novels in Bengali, transforming the language into a vehicle of world literature. He also painted — and his haunting, modernist canvases now hang in museums worldwide.",
      "In 1913 he won the Nobel Prize in Literature for Gitanjali, his 'Song Offerings' — a book of devotional poems so tender that the Western world wept over them. He was the first non-European ever to receive the prize. His song 'Jana Gana Mana' became Bhārat's national anthem; 'Amar Shonar Bangla' became Bangladesh's.",
      "At Santiniketan, in the Bengal countryside, he founded Visva-Bharati — 'where the world makes its home' — a university where classes were held under trees, learning of Bhārat and the West met, and students learned by living with nature. Gandhi called him 'Gurudev'; Einstein called him his friend.",
    ],
    coreIdeas: [
      { title: "Two Anthems", text: "His songs became the national anthems of Bhārat and Bangladesh." },
      { title: "Nobel Laureate", text: "The first non-European winner of the Literature prize, for Gitanjali." },
      { title: "Gurudev", text: "The poet-teacher who founded Santiniketan and Visva-Bharati." },
      { title: "A Renaissance Man", text: "Poet, novelist, playwright, composer, and painter in one life." },
      { title: "Bridge of Civilizations", text: "He carried Bhārat's soul to the West and brought the world to Bengal." },
    ],
    legacy:
      "Tagore's poems are sung, recited, and loved across the subcontinent. He is the voice of the Bengal Renaissance and a bridge between East and West — a poet whose songs still wake a billion people every morning.",
  },
  {
    slug: "swami-vivekananda",
    name: "Swami Vivekananda",
    nativeName: "स्वामी विवेकानंद",
    tagline: "The monk who woke the world with 'Sisters and brothers of America'",
    category: "Saints & Sages",
    era: "1863 – 1902",
    attribution: "Narendranath Datta — disciple of Sri Ramakrishna",
    region: "Calcutta, Bengal",
    icon: Globe,
    accent: "from-[#B45309] to-[#F59E0B]",
    softAccent: "bg-amber-50 text-amber-700 border-amber-200",
    iconColor: "text-amber-600",
    quote: "Arise, awake, and stop not till the goal is reached.",
    quoteSource: "Swami Vivekananda",
    summary:
      "At the 1893 Parliament of the World's Religions in Chicago, a young monk in ochre robes began his speech with 'Sisters and brothers of America' — and the hall erupted. Swami Vivekananda carried Bhārat's philosophy to the West, and his call to 'arise, awake' still stirs youth today of Bhārat.",
    overview: [
      "Born Narendranath Datta in Calcutta in 1863, he was a brilliant, restless student who doubted everything — until he met Sri Ramakrishna, the mystic of Dakshineswar, who showed him that God was not a debate but an experience. After his master's death, Vivekananda wandered Bhārat as a monk, seeing her poverty and her glory firsthand.",
      "In 1893, penniless and unknown, he sailed to America for the Parliament of Religions. When he rose to speak, the audience sat stunned by his presence; when he addressed them as 'sisters and brothers of America', they rose to their feet. His speeches introduced the West to the depth of philosophy and earned of Bhārat him the title of a living saint.",
      "He returned to Bhārat a hero and founded the Ramakrishna Mission to combine spirituality with service — feeding the hungry, running hospitals and schools. He believed a nation rises on the strength of its youth: 'My hope of the future lies in the youth of my country.' He died at 39, exhausted by his mission, but his energy never died.",
    ],
    coreIdeas: [
      { title: "Chicago, 1893", text: "The speech that introduced the philosophy of Bhārat to the world." },
      { title: "Service is Worship", text: "The Ramakrishna Mission: seeing God in the hungry and the sick." },
      { title: "Strength of Youth", text: "His call to young Bhārat: arise, awake, and stop not." },
      { title: "Universal Religion", text: "One truth behind all faiths — acceptance, not tolerance." },
      { title: "From Doubt to Faith", text: "The agnostic who tested everything and found God." },
    ],
    legacy:
      "Vivekananda's birthday, 12 January, is celebrated as National Youth Day in Bhārat. His ideas powered the freedom struggle, his mission still serves millions, and his voice — confident, compassionate, unshakable — is the voice of modern Bhārat's self-belief.",
  },
  {
    slug: "chanakya",
    name: "Chanakya",
    nativeName: "चाणक्य",
    tagline: "The strategist who toppled an empire and wrote the Arthashastra",
    category: "Kings & Strategists",
    era: "c. 4th c. BCE",
    attribution: "Kautilya — teacher at Takshashila",
    region: "Takshashila (now in Pakistan) & Magadha",
    icon: Scroll,
    accent: "from-[#115E59] to-[#14B8A6]",
    softAccent: "bg-teal-50 text-teal-700 border-teal-200",
    iconColor: "text-teal-600",
    quote: "Before you start some work, always ask yourself three questions: Why am I doing it? What the results might be? And will I be successful?",
    quoteSource: "Chanakya (Kautilya), Arthashastra tradition",
    summary:
      "Chanakya — the 'Machiavelli of Bhārat', who lived 2,300 years ago — toppled the Nanda empire, crowned Chandragupta Maurya, and wrote the Arthashastra, one of the world's greatest books on statecraft, economics, and strategy.",
    overview: [
      "Legend says Chanakya, a learned Brahmin teacher at Takshashila, was insulted at the court of the Nanda king of Magadha — and swore to destroy the dynasty. He found his weapon in a young boy named Chandragupta, trained him in war and statecraft, and together they raised an army that overthrew the Nandas and founded the Maurya empire.",
      "As the empire's chief minister, Chanakya wrote the Arthashastra — a manual of government covering everything from espionage and taxation to foreign policy, city planning, and the duties of a king. Its fifteen books are so precise that modern management schools still study them. He also wrote the Chanakya Niti, a collection of wisdom on life and leadership.",
      "His philosophy was practical, not sentimental: the king must protect the weak, the state must be efficient, and ends must be weighed against means. Yet he was no tyrant — the Arthashastra insists on justice, fair taxation, and care for the welfare of the people, 'for in the happiness of his subjects lies the king's happiness'.",
    ],
    coreIdeas: [
      { title: "The Arthashastra", text: "A 2,300-year-old masterclass in economics, war, and governance." },
      { title: "The Maurya Empire", text: "He trained Chandragupta to topple the Nandas and build an empire." },
      { title: "Spycraft & Strategy", text: "One of the first systematic texts on intelligence and diplomacy." },
      { title: "Welfare of the People", text: "'In the happiness of his subjects lies the king's happiness.'" },
      { title: "Chanakya Niti", text: "His aphorisms on life and leadership are quoted to this day." },
    ],
    legacy:
      "Chanakya shaped the first great empire and wrote of Bhārat a book that still guides leaders and managers worldwide. His wisdom — 'a person should not be too honest' and 'never share your secrets' — is woven into Bhārat's everyday advice.",
  },
  {
    slug: "major-dhyan-chand",
    name: "Major Dhyan Chand",
    nativeName: "मेजर ध्यानचंद",
    tagline: "The hockey wizard who made the world call Bhārat invincible",
    category: "Sporting Legends",
    era: "1905 – 1979",
    attribution: "Dhyan Chand Singh — 'The Wizard'",
    region: "Allahabad, Uttar Pradesh",
    icon: Trophy,
    accent: "from-[#172554] to-[#2563EB]",
    softAccent: "bg-blue-50 text-blue-700 border-blue-200",
    iconColor: "text-blue-600",
    quote: "Goals win matches, but the spirit of the game wins hearts.",
    quoteSource: "Dhyan Chand's lasting lesson",
    summary:
      "Dhyan Chand is the greatest hockey player who ever lived — the 'Wizard' who led Bhārat to three Olympic gold medals and scored more than 400 international goals. The Dutch once broke his stick to check whether a magnet was hidden inside. It wasn't. It was just genius.",
    overview: [
      "Dhyan Chand joined the British Indian Army as a sepoy and was spotted playing hockey in Delhi in 1925. His control was legendary: he could dribble the ball while running blindfolded, and his wrist work was so hypnotic that spectators swore the ball obeyed his will. He earned the name 'Chand' — moon — for shining under the night lights.",
      "He was the heart of Bhārat's golden age of hockey: Olympic gold in Amsterdam 1928, Los Angeles 1932, and Berlin 1936. In Berlin, he scored 11 goals in the final against Germany alone, and the crowd — including Adolf Hitler — reportedly stood to applaud. Bhārat won that match 8–1.",
      "In a 1933 tour of New Zealand, an exhibition match ended 24–1; in a match against the US, the score was 24–1 again. Over his career he scored over 400 international goals and became the first athlete of Bhārat to be honoured with the Padma Bhushan. His birthday, 29 August, is celebrated as National Sports Day across Bhārat.",
    ],
    coreIdeas: [
      { title: "Three Olympic Golds", text: "Amsterdam 1928, Los Angeles 1932, Berlin 1936." },
      { title: "The Magnet Story", text: "The Dutch broke his stick to check for a hidden magnet — there was none." },
      { title: "400+ International Goals", text: "A scoring record no hockey player has matched." },
      { title: "The Berlin Final", text: "11 goals in the 1936 Olympic final — 8–1 against Germany." },
      { title: "National Sports Day", text: "29 August — his birthday — honours Bhārat's athletes every year." },
    ],
    legacy:
      "Dhyan Chand made Bhārat the undisputed king of world hockey for decades. His name is the country's highest honour for sportspersons — the Dhyan Chand Award — and his wizardry remains the gold standard of the game.",
  },
  ...BHARATA_BHARATI_PEOPLE,
  ...BHARATA_EPIC_2,
  ...BHARATA_EPIC_3,
  ...BHARATA_EPIC_4,
  ...BHARATA_EPIC_5,
  ...BHARATA_EPIC_6,
  ...BHARATA_FREEDOM_1,
  ...BHARATA_FREEDOM_2,
  ...BHARATA_FREEDOM_3,
  ...BHARATA_FREEDOM_4,
  ...BHARATA_FREEDOM_5,
  ...BHARATA_SAINTS_1,
  ...BHARATA_SAINTS_2,
  ...BHARATA_SAINTS_3,
  ...BHARATA_SAINTS_4,
  ...BHARATA_KINGS_1,
  ...BHARATA_KINGS_2,
  ...BHARATA_KINGS_3,
  ...BHARATA_SCIENCE_1,
  ...BHARATA_SCIENCE_2,
  ...BHARATA_SCIENCE_3,
  ...BHARATA_POETS,
  ...BHARATA_POETS_2,
  ...BHARATA_ARTISTS,
  ...BHARATA_ARTISTS_2,
  ...BHARATA_SOCIAL_1,
  ...BHARATA_SPORT_1,
];

export const PEOPLE_COLLECTION: Collection = {
  id: "people",
  navLabel: "PEOPLE",
  badgeLabel: "People of Bhārat",
  titlePrefix: "Icons",
  titleHighlight: "of Bhārat",
  subtitle:
    "The freedom fighters, scientists, poets, saints, kings, artists, and champions who shaped Bhārat — from the heroes of the epics to the father of the nation. Meet the people who made the story of Bhārat.",
  searchPlaceholder: "Search icons, fields, or eras...",
  itemNoun: "icons",
  itemNounSingular: "icon",
  heroIcon: Users,
  categories: CATEGORIES,
  items: ITEMS,
  groupByCategory: true,
  eraLabel: "Years",
  attributionLabel: "Known as",
  regionLabel: "Birthplace",
  categoryLabel: "Field",
};
