import React, { useState } from "react";
import { X, Music, Calendar, Upload } from "lucide-react";
import { SubmissionFormData, ReleaseType } from "../../types";
import { musicCategories, releaseTypeRules } from "../../data/mockData";

interface CreateAlbumModalProps {
  onClose: () => void;
  onCreate: (formData: SubmissionFormData) => void;
}

export default function CreateAlbumModal({
  onClose,
  onCreate,
}: CreateAlbumModalProps) {
  const [formData, setFormData] = useState<SubmissionFormData>({
    title: "",
    artist: "",
    albumName: "",
    type: "SINGLE",
    releaseDate: new Date(),
    mainCategory: "",
    subCategory: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );

  const handleInputChange = (field: keyof SubmissionFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ ...formData, coverImage: coverImage || undefined });
  };

  const releaseTypes: {
    value: ReleaseType;
    label: string;
    description: string;
  }[] = [
    { value: "SINGLE", label: "Single", description: "1-3 bài hát" },
    { value: "EP", label: "EP", description: "4-6 bài hát" },
    { value: "ALBUM", label: "Album", description: "7+ bài hát" },
    {
      value: "COMPILATION",
      label: "Compilation",
      description: "Tổng hợp nhiều nghệ sĩ",
    },
  ];

  const subCategories = formData.mainCategory
    ? musicCategories[formData.mainCategory] || []
    : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Tạo Album/Submission Mới
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Album/Track *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Nhập tên album hoặc track..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nghệ Sĩ *
                </label>
                <input
                  type="text"
                  value={formData.artist}
                  onChange={(e) => handleInputChange("artist", e.target.value)}
                  placeholder="Nhập tên nghệ sĩ..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Album (tùy chọn)
                </label>
                <input
                  type="text"
                  value={formData.albumName}
                  onChange={(e) =>
                    handleInputChange("albumName", e.target.value)
                  }
                  placeholder="Nhập tên album..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại Phát Hành *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {releaseTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`
                        flex flex-col p-3 border rounded-lg cursor-pointer transition-all duration-200
                        ${
                          formData.type === type.value
                            ? "border-purple-500 bg-purple-50 text-purple-700"
                            : "border-gray-300 hover:border-gray-400"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        checked={formData.type === type.value}
                        onChange={(e) =>
                          handleInputChange(
                            "type",
                            e.target.value as ReleaseType
                          )
                        }
                        className="sr-only"
                      />
                      <span className="font-medium text-sm">{type.label}</span>
                      <span className="text-xs text-gray-600">
                        {type.description}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="space-y-3">
                  {coverImagePreview ? (
                    <div className="relative">
                      <img
                        src={coverImagePreview}
                        alt="Cover preview"
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImage(null);
                          setCoverImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="block">
                      <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-purple-300 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-600">
                          Upload Cover
                        </span>
                        <span className="text-xs text-gray-500">
                          JPG, PNG • Max 10MB
                        </span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày Phát Hành *
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={formData.releaseDate.toISOString().split("T")[0]}
                    onChange={(e) =>
                      handleInputChange("releaseDate", new Date(e.target.value))
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thể Loại Chính *
                </label>
                <select
                  value={formData.mainCategory}
                  onChange={(e) => {
                    handleInputChange("mainCategory", e.target.value);
                    handleInputChange("subCategory", "");
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Chọn thể loại...</option>
                  {Object.keys(musicCategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thể Loại Phụ *
                </label>
                <select
                  value={formData.subCategory}
                  onChange={(e) =>
                    handleInputChange("subCategory", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                  disabled={!formData.mainCategory}
                >
                  <option value="">Chọn thể loại phụ...</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Requirements Info */}
          {formData.type && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-1">
                Yêu cầu cho {formData.type}:
              </p>
              <p className="text-sm text-blue-700">
                Cần từ {releaseTypeRules[formData.type].min} đến{" "}
                {releaseTypeRules[formData.type].max} các bài hát
              </p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-red-600">
            Tất cả các trường có dấu * là bắt buộc
          </p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={
                !formData.title ||
                !formData.artist ||
                !formData.mainCategory ||
                !formData.subCategory
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Tạo Album
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
