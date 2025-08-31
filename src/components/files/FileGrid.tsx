import React from 'react';
import { FileMusic, Download, MoreVertical, Play } from 'lucide-react';
import { AudioFile } from '../../types';
import { formatFileSize, formatDuration } from '../../utils/formatUtils';

interface FileGridProps {
  files: AudioFile[];
}

export default function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* File Preview */}
          <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center relative">
            <FileMusic className="w-12 h-12 text-purple-600" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-100">
                <Play className="w-6 h-6 text-purple-600 ml-1" />
              </button>
            </div>
          </div>

          {/* File Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 truncate flex-1">{file.name}</h4>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors ml-2">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{formatDuration(file.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="font-medium">{file.format}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span className="font-medium">{formatFileSize(file.size)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sample Rate:</span>
                <span className="font-medium">{file.sampleRate / 1000}kHz</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {file.category}
              </span>
              <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}