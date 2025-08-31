import React, { useState } from 'react';
import { Upload, FolderPlus, Grid, List, Search, Filter, Download } from 'lucide-react';
import FileGrid from './FileGrid';
import FileList from './FileList';
import FolderTree from './FolderTree';
import UploadModal from './UploadModal';
import CreateFolderModal from './CreateFolderModal';
import { mockAudioFiles, mockFolders } from '../../data/mockData';
import { AudioFile, Folder } from '../../types';

export default function FileManager() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [files, setFiles] = useState<AudioFile[]>(mockAudioFiles);
  const [folders, setFolders] = useState<Folder[]>(mockFolders);

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = (uploadedFiles: File[]) => {
    // Mock file upload logic
    console.log('Uploading files:', uploadedFiles);
    setShowUploadModal(false);
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name: folderName,
      userId: '1',
      createdAt: new Date(),
      children: [],
      files: [],
    };
    setFolders([...folders, newFolder]);
    setShowCreateFolderModal(false);
  };

  return (
    <div className="h-full flex">
      {/* Folder Tree Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Thư Mục</h3>
            <button
              onClick={() => setShowCreateFolderModal(true)}
              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
            >
              <FolderPlus className="w-5 h-5" />
            </button>
          </div>
          <FolderTree
            folders={folders}
            selectedFolder={selectedFolder}
            onFolderSelect={setSelectedFolder}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-80"
                />
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Bộ lọc</span>
              </button>
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
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Files</span>
              </button>
            </div>
          </div>
        </div>

        {/* File Display */}
        <div className="flex-1 p-6">
          {viewMode === 'grid' ? (
            <FileGrid files={filteredFiles} />
          ) : (
            <FileList files={filteredFiles} />
          )}
        </div>
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
        />
      )}
      
      {showCreateFolderModal && (
        <CreateFolderModal
          onClose={() => setShowCreateFolderModal(false)}
          onCreate={handleCreateFolder}
        />
      )}
    </div>
  );
}