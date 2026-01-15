import { useState, useRef } from 'react';
import { knowledgeApi } from '../services/knowledgeApi';

interface UploadStatus {
    type: 'success' | 'error' | null;
    message: string;
}

interface UseFileUploadReturn {
    files: File[];
    isDragging: boolean;
    isUploading: boolean;
    status: UploadStatus;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeFile: (index: number) => void;
    handleUpload: () => Promise<void>;
}

const MAX_FILES = 5;

export function useFileUpload(): UseFileUploadReturn {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [status, setStatus] = useState<UploadStatus>({ type: null, message: '' });

    // Use type assertion to match the ref type expected by the input element
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
        }
    };

    const handleFiles = (newFiles: File[]) => {
        if (files.length + newFiles.length > MAX_FILES) {
            setStatus({
                type: 'error',
                message: `You can strictly upload a maximum of ${MAX_FILES} files.`,
            });
            return;
        }

        setFiles((prev) => [...prev, ...newFiles]);
        setStatus({ type: null, message: '' });
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setStatus({ type: null, message: '' });
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setIsUploading(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await knowledgeApi.uploadDocuments(files);
            setStatus({
                type: 'success',
                message: `Successfully uploaded ${response.data.processed} documents.`,
            });
            setFiles([]);
        } catch (error: any) {
            setStatus({
                type: 'error',
                message: error.message || 'Failed to upload documents.',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return {
        files,
        isDragging,
        isUploading,
        status,
        fileInputRef: fileInputRef as React.RefObject<HTMLInputElement>,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleFileSelect,
        removeFile,
        handleUpload,
    };
}
