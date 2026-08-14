/**
 * Maps icon-name strings (stored in the database and returned by the Laravel
 * API) back to their lucide-react components.
 */
import {
  Anchor, Atom, Award, Bird, Bomb, BookOpen, Bot, Brain, Brush, Building2,
  Calculator, Candy, Castle, ChefHat, CircleDot, Clapperboard, ClipboardCheck,
  Compass, Cone, Crown, Diamond, Dices, Disc, Drama, Droplets, Drum, Eye,
  Factory, Feather, Flag, Flame, FlaskConical, Flower, Flower2, Footprints,
  Gem, Globe, GraduationCap, Guitar, Hammer, Hand, Heart, House, Infinity,
  Landmark, Layers, LayoutGrid, Leaf, Lightbulb, Magnet, Mic, Microscope,
  Monitor, Moon, Mountain, MountainSnow, MoveUpRight, Music, Music2, Music3,
  Orbit, Paintbrush, Palette, PawPrint, PenTool, PersonStanding, Quote, Rocket,
  Sailboat, Scale, Scroll, Shell, Shield, Ship, Shirt, Skull, Snowflake,
  Sparkles, Sprout, Star, Stethoscope, Sun, Sunrise, Sunset, Swords, Target,
  Theater, TreeDeciduous, TreePine, Trees, Trophy, Utensils, Users, Waves,
  Wifi, Zap,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Anchor, Atom, Award, Bird, Bomb, BookOpen, Bot, Brain, Brush, Building2,
  Calculator, Candy, Castle, ChefHat, CircleDot, Clapperboard, ClipboardCheck,
  Compass, Cone, Crown, Diamond, Dices, Disc, Drama, Droplets, Drum, Eye,
  Factory, Feather, Flag, Flame, FlaskConical, Flower, Flower2, Footprints,
  Gem, Globe, GraduationCap, Guitar, Hammer, Hand, Heart, House, Infinity,
  Landmark, Layers, LayoutGrid, Leaf, Lightbulb, Magnet, Mic, Microscope,
  Monitor, Moon, Mountain, MountainSnow, MoveUpRight, Music, Music2, Music3,
  Orbit, Paintbrush, Palette, PawPrint, PenTool, PersonStanding, Quote, Rocket,
  Sailboat, Scale, Scroll, Shell, Shield, Ship, Shirt, Skull, Snowflake,
  Sparkles, Sprout, Star, Stethoscope, Sun, Sunrise, Sunset, Swords, Target,
  Theater, TreeDeciduous, TreePine, Trees, Trophy, Utensils, Users, Waves,
  Wifi, Zap,
};

export function mapIcon(name?: string | null): LucideIcon {
  return (name && ICON_MAP[name]) || Sparkles;
}
