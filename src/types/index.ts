// User and Role Types
export type UserRole = 'COMPOSER' | 'PRODUCER' | 'PERFORMER' | 'LABEL_MANAGER' | 'ADMINISTRATOR';

export interface User {
  id: string;
  email: string;
  username: string;
  role: UserRole;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

// Release and Submission Types
export type ReleaseType = 'SINGLE' | 'EP' | 'ALBUM' | 'COMPILATION';
export type SubmissionStatus = 'DRAFT' | 'PENDING' | 'REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED';

export interface Submission {
  id: string;
  title: string;
  artist: string;
  albumName?: string;
  upc?: string;
  type: ReleaseType;
  coverImagePath?: string;
  releaseDate: Date;
  status: SubmissionStatus;
  mainCategory: string;
  subCategory: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tracks: Track[];
  comments: Comment[];
}

// Track Types
export interface Track {
  id: string;
  title: string;
  artist: string;
  filePath: string;
  duration: number; // in seconds
  isrc?: string;
  ipi?: string;
  iswc?: string;
  format: string;
  bitrate: number;
  sampleRate: number;
  lyrics?: string;
  trackNumber: number;
  submissionId: string;
  createdAt: Date;
}

// File Management Types
export interface AudioFile {
  id: string;
  name: string;
  path: string;
  size: number;
  mimeType: string;
  duration: number;
  format: string;
  bitrate: number;
  sampleRate: number;
  category: string;
  folderId?: string;
  userId: string;
  createdAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId?: string;
  userId: string;
  createdAt: Date;
  children: Folder[];
  files: AudioFile[];
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  submissionId: string;
  userId: string;
  user: User;
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalSubmissions: number;
  pendingApprovals: number;
  totalTracks: number;
  totalFiles: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'submission' | 'track' | 'file' | 'approval';
  title: string;
  description: string;
  timestamp: Date;
  user: User;
}

// Form Types
export interface SubmissionFormData {
  title: string;
  artist: string;
  albumName?: string;
  type: ReleaseType;
  releaseDate: Date;
  mainCategory: string;
  subCategory: string;
  coverImage?: File;
}

export interface TrackFormData {
  title: string;
  artist: string;
  file: File;
  lyrics?: string;
  isrc?: string;
  ipi?: string;
  iswc?: string;
}