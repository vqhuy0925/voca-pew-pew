import { Unit } from './progress-types';
import { AgeRealm } from './chapters/types';
import { REALM1_REALM, REALM1_UNITS } from './chapters/realm1_primary_early';
import { REALM2_REALM, REALM2_UNITS } from './chapters/realm2_primary_mid';
import { REALM3_REALM, REALM3_UNITS } from './chapters/realm3_primary_grad';
import { REALM4_REALM, REALM4_UNITS } from './chapters/realm4_secondary_early';
import { REALM5_REALM, REALM5_UNITS } from './chapters/realm5_secondary_grad';
import { REALM6_REALM, REALM6_UNITS } from './chapters/realm6_highschool_academic';
import { REALM7_REALM, REALM7_UNITS } from './chapters/realm7_tech_po_communication';
import { REALM8_REALM, REALM8_UNITS } from './chapters/realm8_adult_everyday_conversations';

export const AGE_REALMS: AgeRealm[] = [
  REALM1_REALM,
  REALM2_REALM,
  REALM3_REALM,
  REALM4_REALM,
  REALM5_REALM,
  REALM6_REALM,
  REALM7_REALM,
  REALM8_REALM
];

export const LEARNING_UNITS: Unit[] = [
  ...REALM1_UNITS,
  ...REALM2_UNITS,
  ...REALM3_UNITS,
  ...REALM4_UNITS,
  ...REALM5_UNITS,
  ...REALM6_UNITS,
  ...REALM7_UNITS,
  ...REALM8_UNITS
];

export const ALL_LEVELS = LEARNING_UNITS.flatMap(u => u.levels);

export const getLevelById = (id: string) => ALL_LEVELS.find(l => l.id === id) || ALL_LEVELS[0];

export const getNextLevel = (currentId: string) => {
  const currentIndex = ALL_LEVELS.findIndex(l => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < ALL_LEVELS.length - 1) {
    return ALL_LEVELS[currentIndex + 1];
  }
  return null;
};

export const getRealmByChapterNumber = (chapterNum: number): AgeRealm => {
  return AGE_REALMS.find(r => chapterNum >= r.startChapter && chapterNum <= r.endChapter) || AGE_REALMS[0];
};

export const getRealmByAge = (age: number): AgeRealm => {
  if (age <= 8) return AGE_REALMS[0];
  if (age <= 10) return AGE_REALMS[1];
  if (age === 11) return AGE_REALMS[2];
  if (age <= 13) return AGE_REALMS[3];
  if (age <= 15) return AGE_REALMS[4];
  if (age <= 18) return AGE_REALMS[5];
  if (age === 19 || age === 99) return AGE_REALMS[6]; // Tech & PO
  if (age === 20 || age === 100) return AGE_REALMS[7]; // Adult Everyday
  return AGE_REALMS[6];
};

export const getRealmById = (realmId: string): AgeRealm => {
  return AGE_REALMS.find(r => r.id === realmId) || AGE_REALMS[0];
};
