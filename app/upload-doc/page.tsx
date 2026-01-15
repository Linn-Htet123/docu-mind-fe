'use client';

import { Upload } from 'lucide-react';
import { useFileUpload } from '../hooks/useFileUpload';
import UploadHeader from '../components/upload/UploadHeader';
import UploadDropZone from '../components/upload/UploadDropZone';
import StatusMessage from '../components/upload/StatusMessage';
import FileList from '../components/upload/FileList';

export default function UploadDoc() {
  const {
    files,
    isDragging,
    isUploading,
    status,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    removeFile,
    handleUpload,
  } = useFileUpload();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <UploadHeader />

        <div className="p-8">
          <UploadDropZone
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            fileInputRef={fileInputRef}
            onFileSelect={handleFileSelect}
          />

          <StatusMessage status={status} />

          <FileList files={files} onRemove={removeFile} />

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            className={`
              w-full mt-8 py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all
              ${
                files.length === 0 || isUploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl active:scale-[0.98]'
              }
            `}
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload Documents
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
