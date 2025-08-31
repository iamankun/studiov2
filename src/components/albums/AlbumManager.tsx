import React, { useState } from 'react';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import AlbumGrid from './AlbumGrid';
import AlbumList from './AlbumList';
import CreateAlbumModal from './CreateAlbumModal';
import { mockSubmissions } from '../../data/mockData';
import { Submission, SubmissionFormData } from '../../types';

export default function AlbumManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         submission.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAlbum = (formData: SubmissionFormData) => {
    const newSubmission: Submission = {
      id: Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      albumName: formData.albumName,
      type: formData.type,
      releaseDate: formData.releaseDate,
      status: 'DRAFT',
      mainCategory: formData.mainCategory,
      subCategory: formData.subCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: '1',
      tracks: [],
      comments: [],
    };

    setSubmissions([newSubmission, ...submissions]);
    setShowCreateModal(false);
  };

  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'DRAFT', label: 'Bản nháp' },
    { value: 'PENDING', label: 'Chờ duyệt' },
    { value: 'REVIEW', label: 'Đang xem xét' },
    { value: 'APPROVED', label: 'Đã duyệt' },
    { value: 'REJECTED', label: 'Bị từ chối' },
    { value: 'PUBLISHED', label: 'Đã phát hành' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm albums, artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-80"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Album</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {viewMode === 'grid' ? (
          <AlbumGrid submissions={filteredSubmissions} />
        ) : (
          <AlbumList submissions={filteredSubmissions} />
        )}
      </div>

      {/* Create Album Modal */}
      {showCreateModal && (
        <CreateAlbumModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAlbum}
        />
      )}
    </div>
  );
}