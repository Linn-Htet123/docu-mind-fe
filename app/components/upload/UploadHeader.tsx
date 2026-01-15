import { Upload } from 'lucide-react';

export default function UploadHeader() {
  return (
    <div className="bg-black p-6 text-white">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Upload className="w-6 h-6" />
        Upload Knowledge
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        Upload documents to train your AI assistant. Supported formats: PDF, DOCX.
      </p>
    </div>
  );
}
