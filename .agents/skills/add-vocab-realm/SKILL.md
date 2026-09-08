---
name: add-vocab-realm
description: >-
  Use this skill when adding, expanding, or modifying vocabulary realms, chapters, levels, phonics words, or boss battle pools in Vocab Pew Pew.
---

# Add or Modify Vocabulary Realm / Chapter

Follow this workflow when modifying or introducing new curriculum levels into the game.

## Steps

1. **Define Word Types & Content**:
   - Ensure every word item satisfies the `LessonWord` interface in `src/data/chapters/types.ts`:
     - `word`: English text (lowercase).
     - `meaning`: Vietnamese translation.
     - `phonics`: Pronunciation guide (e.g., `/kæt/`).
     - `emoji`: Visual hint icon.
     - `category` & `difficulty`: 1 (easy) to 3 (hard).

2. **Create / Update Chapter File**:
   - Location: `src/data/chapters/`
   - File naming: `realm<N>_<domain_name>.ts`
   - Structure:
     - Group lessons into Units and Level Nodes (`StandardLesson`, `SpeedRush`, `TreasureChest`, `BossMonster`).

3. **Register in Learning Path Registry**:
   - Export and register the chapter in `src/data/chapters/index.ts` (or `src/data/learning-path-data.ts`).
   - Update `RealmSelectModal.tsx` and `types.ts` if a new realm is introduced.

4. **Verify Build**:
   - Run `npm run build` to verify type safety and data integrity across all level references.
