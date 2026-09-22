export interface TypingParagraph {
  id: string;
  realmId: string;         // 'realm-1' .. 'realm-8'
  text: string;
  isVietnamese: boolean;
  sourceWordIds: string[]; // truy vết từ vựng nguồn để regenerate
  createdBy: 'auto' | 'admin';
  updatedAt: number;
}

// typing_paragraph_drafts/{realmId}
export interface TypingParagraphDraftDoc {
  updatedAt: any;   // Firestore Timestamp (serverTimestamp())
  updatedBy: string;
  paragraphs: TypingParagraph[];
}

// typing_paragraph_snapshots/latest
export interface TypingParagraphSnapshotDoc {
  versionId: string;
  publishedAt: any; // Firestore Timestamp (serverTimestamp())
  publishedBy: string;
  paragraphsByRealm: Record<string, TypingParagraph[]>;
}
