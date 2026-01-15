import { File, X } from 'lucide-react';

interface FileListProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="mt-8 space-y-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Selected Files ({files.length})
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 group hover:border-black transition-colors"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-white rounded-md border border-gray-200">
                <File className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(idx);
              }}
              className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
