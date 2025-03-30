export type FileType = 'image' | 'video' | 'document' | 'audio' | 'archive' | 'unknown' | string;

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: number;
  lastModified: number | string; // Hem timestamp hem ISO string destekliyor
  path: string;
  starred?: boolean;
  category?: string;
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number | string; // Tutarlılık için timestamp desteği eklendi
  relatedFiles?: FileItem[];
  isLoading?: boolean;
}
