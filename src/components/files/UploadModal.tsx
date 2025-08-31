import React, { useState, useCallback } from 'react';
import { X, Upload, FileMusic, AlertCircle, CheckCircle } from 'lucide-react';
import { audioValidationRules } from '../../data/mockData';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

interface FileUploadItem {
  file: File;
  id: string;
  status: 'pending' | 'validating' | 'valid' | 'invalid';
  errors: string[];
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [uploadItems, setUploadItems] = useState<FileUploadItem[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateAudioFile = (file: File): string[] => {
    const errors: string[] = [];
    
    if (!audioValidationRules.allowedFormats.some(format => 
      file.name.toLowerCase().endsWith(`.${format.toLowerCase()}`)
    )) {
      errors.push(`Format không hỗ trợ. Chỉ chấp nhận: ${audioValidationRules.allowedFormats.join(', ')}`);
    }
    
    if (file.size > audioValidationRules.maxFileSize) {
      errors.push(`File quá lớn. Tối đa ${audioValidationRules.maxFileSize / (1024 * 1024)}MB`);
    }
    
    return errors;
  };

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newItems: FileUploadItem[] = fileArray.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'validating',
      errors: [],
    }));

    setUploadItems(prev => [...prev, ...newItems]);

    // Simulate validation
    setTimeout(() => {
      setUploadItems(prev => prev.map(item => {
        if (newItems.find(newItem => newItem.id === item.id)) {
          const errors = validateAudioFile(item.file);
          return {
            ...item,
            status: errors.length > 0 ? 'invalid' : 'valid',
            errors,
          };
        }
        return item;
      }));
    }, 1000);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpload = () => {
    const validFiles = uploadItems
      .filter(item => item.status === 'valid')
      .map(item => item.file);
    
    if (validFiles.length > 0) {
      onUpload(validFiles);
    }
  };

  const validFilesCount = uploadItems.filter(item => item.status === 'valid').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Audio Files</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6">
          <div
            className={`
              border-2 border-dashed rounded-xl p-8 text-center transition-colors
              ${isDragOver ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-300'}
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Kéo thả files hoặc click để chọn
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Hỗ trợ WAV, FLAC • Tối đa 100MB • Stereo 16-24 bit • 44.1kHz+
            </p>
            <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
              <input
                type="file"
                multiple
                accept=".wav,.flac,audio/wav,audio/flac"
                onChange={handleFileInput}
                className="hidden"
              />
              Chọn Files
            </label>
          </div>

          {/* File List */}
          {uploadItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Files được chọn ({uploadItems.length})
              </h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {uploadItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg"
                  >
                    <FileMusic className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      {item.errors.length > 0 && (
                        <div className="mt-1">
                          {item.errors.map((error, index) => (
                            <p key={index} className="text-xs text-red-600">{error}</p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'validating' && (
                        <div className="w-4 h-4 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
                      )}
                      {item.status === 'valid' && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      {item.status === 'invalid' && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      <button
                        onClick={() => removeFile(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {validFilesCount} files hợp lệ trong {uploadItems.length} files
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleUpload}
              disabled={validFilesCount === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Upload {validFilesCount} Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}