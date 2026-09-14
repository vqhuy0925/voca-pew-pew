import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebaseConfig';
import { AgeRealm } from '../../data/chapters/types';
import { ALL_REALMS } from '../../data/learning-path-data';
import { VocabWord } from '../../data/types';

export interface VocabSnapshotMeta {
  versionId: string;
  publishedAt: any;
  publishedBy: string;
  totalWords: number;
  totalLevels: number;
  totalRealms: number;
  realms: AgeRealm[];
}

/**
 * Load draft realms from Firestore `vocab_drafts/current`.
 * Fallbacks to default `ALL_REALMS` from source code if no draft exists.
 */
export const loadVocabDraft = async (): Promise<{ realms: AgeRealm[]; isCloudDraft: boolean; updatedAt?: any }> => {
  if (!isFirebaseConfigured || !db) {
    return { realms: JSON.parse(JSON.stringify(ALL_REALMS)), isCloudDraft: false };
  }

  try {
    const draftDocRef = doc(db, 'vocab_drafts', 'current');
    const snap = await getDoc(draftDocRef);

    if (snap.exists()) {
      const data = snap.data();
      if (data && Array.isArray(data.realms) && data.realms.length > 0) {
        return {
          realms: data.realms,
          isCloudDraft: true,
          updatedAt: data.updatedAt
        };
      }
    }
  } catch (error) {
    console.warn('[VocabAdmin] Error fetching draft, falling back to static codebase realms:', error);
  }

  return { realms: JSON.parse(JSON.stringify(ALL_REALMS)), isCloudDraft: false };
};

/**
 * Save draft changes to Firestore `vocab_drafts/current`
 */
export const saveVocabDraft = async (realms: AgeRealm[], authorEmail: string = 'admin'): Promise<boolean> => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase chưa được cấu hình.');
  }

  const draftDocRef = doc(db, 'vocab_drafts', 'current');
  await setDoc(draftDocRef, {
    realms,
    updatedBy: authorEmail,
    updatedAt: serverTimestamp()
  });

  return true;
};

/**
 * Publish snapshot to Firestore `vocab_snapshots/latest`
 */
export const publishVocabSnapshot = async (realms: AgeRealm[], authorEmail: string = 'admin'): Promise<string> => {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase chưa được cấu hình.');
  }

  let totalWords = 0;
  let totalLevels = 0;
  realms.forEach(realm => {
    (realm.units || []).forEach(unit => {
      (unit.levels || []).forEach(level => {
        totalLevels++;
        totalWords += (level.words || []).length;
      });
    });
  });

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const versionId = `v${dateStr}_${timeStr}`;

  const payload: VocabSnapshotMeta = {
    versionId,
    publishedAt: serverTimestamp(),
    publishedBy: authorEmail,
    totalWords,
    totalLevels,
    totalRealms: realms.length,
    realms
  };

  const snapshotDocRef = doc(db, 'vocab_snapshots', 'latest');
  await setDoc(snapshotDocRef, payload);

  // Also save a copy with version ID for historical rollback
  try {
    const historyDocRef = doc(db, 'vocab_snapshots', versionId);
    await setDoc(historyDocRef, payload);
  } catch (e) {
    // Non-critical
  }

  // Update local cache directly for seamless admin experience
  try {
    localStorage.setItem('vocab_pew_pew_snapshot_version', versionId);
    localStorage.setItem('vocab_pew_pew_snapshot_realms', JSON.stringify(realms));
  } catch (e) {
    // Ignore storage quota
  }

  return versionId;
};

/**
 * Export vocabulary as JSON file download
 */
export const exportVocabToJson = (realms: AgeRealm[], filename = 'vocab_pew_pew_export.json') => {
  const jsonStr = JSON.stringify(realms, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export vocabulary words across realms as CSV
 */
export const exportVocabToCsv = (realms: AgeRealm[], filename = 'vocab_words_export.csv') => {
  const headers = [
    'Realm ID',
    'Realm Name',
    'CEFR Level',
    'Rank Code',
    'Age Range',
    'Unit ID',
    'Unit Title',
    'Sector Name',
    'Is Checkpoint',
    'Level ID',
    'Level Title',
    'Level Type',
    'Word ID',
    'Word',
    'Meaning Vi',
    'Category',
    'Emoji',
    'Pronunciation'
  ];
  const rows: string[] = [headers.join(',')];

  realms.forEach(realm => {
    (realm.units || []).forEach(unit => {
      (unit.levels || []).forEach(level => {
        (level.words || []).forEach(w => {
          const row = [
            `"${realm.id}"`,
            `"${realm.nameVi || realm.name}"`,
            `"${realm.cefrLevel || ''}"`,
            `"${realm.rankCode || ''}"`,
            `"${realm.ageRange || ''}"`,
            `"${unit.id}"`,
            `"${unit.titleVi || unit.title}"`,
            `"${unit.sectorName || ''}"`,
            `"${unit.isCheckpoint ? 'Yes' : 'No'}"`,
            `"${level.id}"`,
            `"${level.titleVi || level.title}"`,
            `"${level.type || 'STANDARD'}"`,
            `"${w.id}"`,
            `"${w.word}"`,
            `"${(w.meaningVi || '').replace(/"/g, '""')}"`,
            `"${w.category || ''}"`,
            `"${w.emoji || ''}"`,
            `"${w.pronunciation || ''}"`
          ];
          rows.push(row.join(','));
        });
      });
    });
  });

  const csvContent = '\uFEFF' + rows.join('\n'); // BOM for Excel UTF-8
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Parse and validate JSON import file
 */
export const parseVocabJson = (jsonString: string): { success: boolean; data?: AgeRealm[]; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      return { success: false, error: 'Dữ liệu JSON phải là một mảng danh sách AgeRealm.' };
    }
    if (parsed.length === 0 || !parsed[0].id || !parsed[0].units) {
      return { success: false, error: 'Cấu trúc Realm trong file JSON không đúng định dạng.' };
    }
    return { success: true, data: parsed };
  } catch (e: any) {
    return { success: false, error: `Lỗi đọc JSON: ${e.message}` };
  }
};
