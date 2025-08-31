import React from "react";
import {
  Music,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  MoreVertical,
} from "lucide-react";
import { Submission } from "../../types";
import { formatDistanceToNow } from "../../utils/dateUtils";

interface AlbumGridProps {
  submissions: Submission[];
}

export default function AlbumGrid({ submissions }: AlbumGridProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "PENDING":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "PUBLISHED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "SINGLE":
        return "bg-purple-100 text-purple-800";
      case "EP":
        return "bg-blue-100 text-blue-800";
      case "ALBUM":
        return "bg-green-100 text-green-800";
      case "COMPILATION":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {submissions.map((submission) => (
        <div
          key={submission.id}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* Cover Image */}
          <div className="aspect-square relative">
            {submission.coverImagePath ? (
              <img
                src={submission.coverImagePath}
                alt={submission.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Music className="w-16 h-16 text-purple-600" />
              </div>
            )}

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                  <Edit className="w-5 h-5 text-purple-600" />
                </button>
                <button className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <div
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  submission.status
                )}`}
              >
                {getStatusIcon(submission.status)}
                <span>{submission.status}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {submission.title}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {submission.artist}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                  submission.type
                )}`}
              >
                {submission.type}
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">
                {submission.mainCategory}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Phát hành ngày:</span>
                <span>
                  {submission.releaseDate.toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bài hát:</span>
                <span>{submission.tracks.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Cập nhật:</span>
                <span>{formatDistanceToNow(submission.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
