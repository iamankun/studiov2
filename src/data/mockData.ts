import { User, Submission, Track, AudioFile, Folder, DashboardStats, UserRole, ReleaseType, SubmissionStatus } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@musiclabel.com',
    username: 'admin',
    role: 'ADMINISTRATOR',
    displayName: 'Admin User',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date('2024-12-26'),
  },
  {
    id: '2',
    email: 'producer@musiclabel.com',
    username: 'producer1',
    role: 'PRODUCER',
    displayName: 'John Producer',
    avatar: 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-02-01'),
    lastLogin: new Date('2024-12-25'),
  },
  {
    id: '3',
    email: 'artist@musiclabel.com',
    username: 'artist1',
    role: 'PERFORMER',
    displayName: 'Sarah Artist',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    createdAt: new Date('2024-03-10'),
    lastLogin: new Date('2024-12-24'),
  },
];

// Mock Submissions
export const mockSubmissions: Submission[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Sarah Artist',
    albumName: 'Midnight Dreams',
    upc: '123456789012',
    type: 'SINGLE',
    coverImagePath: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    releaseDate: new Date('2024-12-30'),
    status: 'PENDING',
    mainCategory: 'Electronic',
    subCategory: 'Ambient',
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-26'),
    userId: '3',
    tracks: [],
    comments: [],
  },
  {
    id: '2',
    title: 'Urban Vibes',
    artist: 'Various Artists',
    albumName: 'Urban Collection Vol. 1',
    upc: '123456789013',
    type: 'COMPILATION',
    coverImagePath: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    releaseDate: new Date('2025-01-15'),
    status: 'APPROVED',
    mainCategory: 'Hip Hop',
    subCategory: 'Urban',
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-25'),
    userId: '2',
    tracks: [],
    comments: [],
  },
  {
    id: '3',
    title: 'Jazz Sessions',
    artist: 'John Producer',
    albumName: 'Jazz Sessions EP',
    type: 'EP',
    coverImagePath: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    releaseDate: new Date('2025-02-01'),
    status: 'DRAFT',
    mainCategory: 'Jazz',
    subCategory: 'Contemporary',
    createdAt: new Date('2024-12-18'),
    updatedAt: new Date('2024-12-26'),
    userId: '2',
    tracks: [],
    comments: [],
  },
];

// Mock Tracks
export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Sarah Artist',
    filePath: '/tracks/midnight-dreams.wav',
    duration: 245,
    isrc: 'USAT21234567',
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    trackNumber: 1,
    submissionId: '1',
    createdAt: new Date('2024-12-20'),
  },
  {
    id: '2',
    title: 'Urban Flow',
    artist: 'MC Urban',
    filePath: '/tracks/urban-flow.wav',
    duration: 198,
    isrc: 'USAT21234568',
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    trackNumber: 1,
    submissionId: '2',
    createdAt: new Date('2024-12-15'),
  },
  {
    id: '3',
    title: 'Smooth Jazz',
    artist: 'John Producer',
    filePath: '/tracks/smooth-jazz.wav',
    duration: 312,
    isrc: 'USAT21234569',
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    trackNumber: 1,
    submissionId: '3',
    createdAt: new Date('2024-12-18'),
  },
];

// Mock Audio Files
export const mockAudioFiles: AudioFile[] = [
  {
    id: '1',
    name: 'midnight-dreams.wav',
    path: '/uploads/2024/12/midnight-dreams.wav',
    size: 52428800, // 50MB
    mimeType: 'audio/wav',
    duration: 245,
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    category: 'Track',
    userId: '3',
    createdAt: new Date('2024-12-20'),
  },
  {
    id: '2',
    name: 'urban-flow.wav',
    path: '/uploads/2024/12/urban-flow.wav',
    size: 41943040, // 40MB
    mimeType: 'audio/wav',
    duration: 198,
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    category: 'Track',
    userId: '2',
    createdAt: new Date('2024-12-15'),
  },
  {
    id: '3',
    name: 'smooth-jazz.wav',
    path: '/uploads/2024/12/smooth-jazz.wav',
    size: 66060800, // 63MB
    mimeType: 'audio/wav',
    duration: 312,
    format: 'WAV',
    bitrate: 1411,
    sampleRate: 44100,
    category: 'Track',
    userId: '2',
    createdAt: new Date('2024-12-18'),
  },
];

// Mock Folders
export const mockFolders: Folder[] = [
  {
    id: '1',
    name: 'Electronic Music',
    userId: '3',
    createdAt: new Date('2024-12-01'),
    children: [
      {
        id: '2',
        name: 'Ambient',
        parentId: '1',
        userId: '3',
        createdAt: new Date('2024-12-01'),
        children: [],
        files: [mockAudioFiles[0]],
      },
    ],
    files: [],
  },
  {
    id: '3',
    name: 'Hip Hop',
    userId: '2',
    createdAt: new Date('2024-11-15'),
    children: [],
    files: [mockAudioFiles[1]],
  },
  {
    id: '4',
    name: 'Jazz',
    userId: '2',
    createdAt: new Date('2024-11-20'),
    children: [],
    files: [mockAudioFiles[2]],
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalSubmissions: 3,
  pendingApprovals: 1,
  totalTracks: 3,
  totalFiles: 3,
  recentActivity: [
    {
      id: '1',
      type: 'submission',
      title: 'New submission created',
      description: 'Sarah Artist created "Midnight Dreams"',
      timestamp: new Date('2024-12-26T10:30:00'),
      user: mockUsers[2],
    },
    {
      id: '2',
      type: 'approval',
      title: 'Submission approved',
      description: 'Urban Vibes compilation approved for release',
      timestamp: new Date('2024-12-25T15:45:00'),
      user: mockUsers[0],
    },
    {
      id: '3',
      type: 'file',
      title: 'Audio file uploaded',
      description: 'smooth-jazz.wav uploaded to Jazz folder',
      timestamp: new Date('2024-12-24T09:15:00'),
      user: mockUsers[1],
    },
  ],
};

// Categories and Subcategories
export const musicCategories = {
  'Electronic': ['Ambient', 'House', 'Techno', 'Trance', 'Drum & Bass'],
  'Rock': ['Alternative', 'Classic Rock', 'Indie', 'Metal', 'Punk'],
  'Pop': ['Mainstream', 'Indie Pop', 'Synthpop', 'K-Pop', 'Dance Pop'],
  'Hip Hop': ['Rap', 'Trap', 'Old School', 'Underground', 'Urban'],
  'Jazz': ['Contemporary', 'Smooth', 'Fusion', 'Traditional', 'Experimental'],
  'Classical': ['Symphony', 'Chamber', 'Opera', 'Contemporary Classical', 'Minimalist'],
  'R&B': ['Contemporary', 'Neo Soul', 'Classic R&B', 'Alternative R&B'],
  'Country': ['Contemporary', 'Traditional', 'Country Rock', 'Bluegrass'],
  'World': ['Latin', 'African', 'Asian', 'European Folk', 'Middle Eastern'],
};

// File validation rules
export const audioValidationRules = {
  allowedFormats: ['WAV', 'FLAC'],
  minDuration: 2, // seconds
  maxFileSize: 100 * 1024 * 1024, // 100MB
  requiredChannels: 2, // stereo
  minBitDepth: 16,
  maxBitDepth: 24,
  minSampleRate: 44100,
};

// Release type track count rules
export const releaseTypeRules = {
  SINGLE: { min: 1, max: 3 },
  EP: { min: 4, max: 6 },
  ALBUM: { min: 7, max: 100 },
  COMPILATION: { min: 4, max: 100 },
};