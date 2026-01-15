import { Check, AlertCircle } from 'lucide-react';

interface UploadStatus {
  type: 'success' | 'error' | null;
  message: string;
}

interface StatusMessageProps {
  status: UploadStatus;
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (!status.message) return null;

  return (
    <div
      className={`
        mt-6 p-4 rounded-lg flex items-center gap-3 text-sm font-medium
        ${
          status.type === 'success'
            ? 'bg-green-50 text-green-700 border border-green-100'
            : 'bg-red-50 text-red-700 border border-red-100'
        }
      `}
    >
      {status.type === 'success' ? (
        <Check className="w-5 h-5 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      )}
      {status.message}
    </div>
  );
}
