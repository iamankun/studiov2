import React from 'react';
import { Folder as FolderIcon, ChevronRight, ChevronDown } from 'lucide-react';
import { Folder } from '../../types';

interface FolderTreeProps {
  folders: Folder[];
  selectedFolder: string | null;
  onFolderSelect: (folderId: string | null) => void;
}

interface FolderItemProps {
  folder: Folder;
  level: number;
  isSelected: boolean;
  onSelect: (folderId: string) => void;
}

function FolderItem({ folder, level, isSelected, onSelect }: FolderItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = folder.children.length > 0;

  return (
    <div>
      <div
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
          ${isSelected ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'}
        `}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => onSelect(folder.id)}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-gray-200 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
        {!hasChildren && <div className="w-5" />}
        
        <FolderIcon className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium truncate">{folder.name}</span>
        <span className="text-xs text-gray-500 ml-auto">
          {folder.files.length}
        </span>
      </div>
      
      {hasChildren && isExpanded && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              level={level + 1}
              isSelected={isSelected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ folders, selectedFolder, onFolderSelect }: FolderTreeProps) {
  return (
    <div className="space-y-1">
      <div
        className={`
          flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
          ${selectedFolder === null ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'}
        `}
        onClick={() => onFolderSelect(null)}
      >
        <FolderIcon className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium">Tất cả Files</span>
      </div>
      
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          level={0}
          isSelected={selectedFolder === folder.id}
          onSelect={onFolderSelect}
        />
      ))}
    </div>
  );
}