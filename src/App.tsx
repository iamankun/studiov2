import React, { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import DashboardOverview from './components/dashboard/DashboardOverview';
import FileManager from './components/files/FileManager';
import AlbumManager from './components/albums/AlbumManager';
import UserManager from './components/users/UserManager';
import UploadModal from './components/files/UploadModal';
import CreateAlbumModal from './components/albums/CreateAlbumModal';
import AudioPlayer from './components/common/AudioPlayer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateAlbumModal, setShowCreateAlbumModal] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === 'upload-file') {
      setShowUploadModal(true);
    } else if (tab === 'create-album') {
      setShowCreateAlbumModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'files':
        return <FileManager />;
      case 'albums':
        return <AlbumManager />;
      case 'users':
        return <UserManager />;
      default:
        return <DashboardOverview />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Tổng Quan Dashboard';
      case 'files':
        return 'Quản Lý Files Âm Thanh';
      case 'albums':
        return 'Quản Lý Albums & Submissions';
      case 'users':
        return 'Quản Lý Người Dùng';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Theo dõi hoạt động và thống kê tổng quan';
      case 'files':
        return 'Upload, organize và quản lý files âm thanh';
      case 'albums':
        return 'Tạo và quản lý các submission phát hành';
      case 'users':
        return 'Quản lý quyền truy cập và vai trò người dùng';
      default:
        return '';
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} subtitle={getPageSubtitle()} />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Audio Player - Always visible at bottom right when playing */}
      <AudioPlayer isMinimized={true} />

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={(files) => {
            console.log('Uploading files:', files);
            setShowUploadModal(false);
          }}
        />
      )}

      {showCreateAlbumModal && (
        <CreateAlbumModal
          onClose={() => setShowCreateAlbumModal(false)}
          onCreate={(formData) => {
            console.log('Creating album:', formData);
            setShowCreateAlbumModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;