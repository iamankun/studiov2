import React from "react";
import {
  Music,
  FileMusic,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import StatCard from "../common/StatCard";
import { mockDashboardStats, mockSubmissions } from "../../data/mockData";
import { formatDistanceToNow } from "../../utils/dateUtils";

export default function DashboardOverview() {
  const stats = mockDashboardStats;
  const recentSubmissions = mockSubmissions.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng phát hành"
          value={stats.totalSubmissions}
          icon={Music}
          change={{ value: 12, trend: "up" }}
          color="purple"
        />
        <StatCard
          title="Chờ duyệt"
          value={stats.pendingApprovals}
          icon={Clock}
          change={{ value: 5, trend: "down" }}
          color="orange"
        />
        <StatCard
          title="Tổng Tracks"
          value={stats.totalTracks}
          icon={FileMusic}
          change={{ value: 8, trend: "up" }}
          color="blue"
        />
        <StatCard
          title="Files Âm Thanh"
          value={stats.totalFiles}
          icon={Users}
          change={{ value: 3, trend: "up" }}
          color="green"
        />
      </div>

      {/* Recent Activity & Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    {activity.type === "submission" && (
                      <Music className="w-4 h-4 text-purple-600" />
                    )}
                    {activity.type === "approval" && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                    {activity.type === "file" && (
                      <FileMusic className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(activity.timestamp)} •{" "}
                    {activity.user.displayName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Phát hành gần đây
          </h3>
          <div className="space-y-4">
            {recentSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {submission.coverImagePath ? (
                    <img
                      src={submission.coverImagePath}
                      alt={submission.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {submission.title}
                  </p>
                  <p className="text-sm text-gray-600">{submission.artist}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        submission.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : submission.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : submission.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {submission.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {submission.type}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {submission.status === "PENDING" && (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                  {submission.status === "APPROVED" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
