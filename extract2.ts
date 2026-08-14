import { IDEAS_COLLECTION } from './src/data/philosophies';
import { PLACES_COLLECTION } from './src/data/places';
import { PEOPLE_COLLECTION } from './src/data/people';
import { CULTURE_COLLECTION } from './src/data/culture';
import { CREATE_COLLECTION } from './src/data/creations';
import { GAMES } from './src/data/games';
import { EBOOKS } from './src/data/ebooks';
import { CREATE_ACTIVITIES } from './src/data/createActivities';
import * as fs from 'fs';

const iconName = (i: any) => (i && (i.displayName || i.name)) || '';
const cleanItem = (it: any) => {
  const c: any = { ...it };
  if ('icon' in c) c.icon = iconName(c.icon);
  if (Array.isArray(c.tags)) c.tags = c.tags.map((t: any) => ({ ...t, icon: iconName(t.icon) }));
  return c;
};
const meta = (c: any) => {
  const { items, heroIcon, ...rest } = c;
  return { ...rest, heroIcon: iconName(heroIcon) };
};

const data = {
  collections: {
    ideas: { meta: meta(IDEAS_COLLECTION), items: IDEAS_COLLECTION.items.map(cleanItem) },
    places: { meta: meta(PLACES_COLLECTION), items: PLACES_COLLECTION.items.map(cleanItem) },
    people: { meta: meta(PEOPLE_COLLECTION), items: PEOPLE_COLLECTION.items.map(cleanItem) },
    culture: { meta: meta(CULTURE_COLLECTION), items: CULTURE_COLLECTION.items.map(cleanItem) },
    create: { meta: meta(CREATE_COLLECTION), items: CREATE_COLLECTION.items.map(cleanItem) },
  },
  games: GAMES.map(cleanItem),
  ebooks: EBOOKS,
  activities: CREATE_ACTIVITIES.map(cleanItem),
};
fs.writeFileSync('/Users/srichandskaushik/Documents/source/pakkapatriot/pakkapatriot-laravel/database/seeders/data/pp-data.json', JSON.stringify(data));

