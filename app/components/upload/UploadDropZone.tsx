import { Upload } from 'lucide-react';

interface UploadDropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadDropZone({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  fileInputRef,
  onFileSelect,
}: UploadDropZoneProps) {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
        ${
          isDragging
            ? 'border-black bg-gray-50'
            : 'border-gray-200 hover:border-black hover:bg-gray-50'
        }
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelect}
        multiple
        className="hidden"
        accept=".pdf,.docx,.txt"
      />
      <div className="flex flex-col items-center gap-3">
        <div className="p-4 bg-gray-100 rounded-full">
          <Upload className="w-8 h-8 text-gray-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">
            Click or drag files to upload
          </p>
          <p className="text-sm text-gray-500 mt-1">Maximum 5 files</p>
        </div>
      </div>
    </div>
  );
}
