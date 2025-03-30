import { FileItem, FileType } from '@/types/files';
import Colors from '@/constants/colors';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileTypeIcon = (type: FileType): string => {
  switch (type) {
    case 'image':
      return 'Image';
    case 'video':
      return 'Video';
    case 'document':
      return 'FileText';
    case 'audio':
      return 'Music';
    case 'archive':
      return 'Archive';
    default:
      return 'File';
  }
};

export const getFileTypeColor = (type: FileType): string => {
  return Colors.fileTypes[type] || Colors.fileTypes.unknown;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const searchFiles = (files: FileItem[], query: string): FileItem[] => {
  if (!query.trim()) return files;
  
  const lowerQuery = query.toLowerCase();
  return files.filter(file => 
    file.name.toLowerCase().includes(lowerQuery) || 
    file.category?.toLowerCase().includes(lowerQuery) ||
    file.type.toLowerCase().includes(lowerQuery)
  );
};

export const filterFilesByCategory = (files: FileItem[], category: string): FileItem[] => {
  if (category === 'All') return files;
  if (category === 'Starred') return files.filter(file => file.starred);
  return files.filter(file => file.category === category);
};