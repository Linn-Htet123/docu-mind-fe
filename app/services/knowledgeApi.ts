import { axiosInstance } from '../utils/axios';
import { UploadResponse } from '../types/knowledge.types';

export const knowledgeApi = {
    /**
     * Upload documents to the knowledge base
     * @param files - Array of files to upload
     * @returns Promise with upload response
     */
    async uploadDocuments(files: File[]): Promise<UploadResponse> {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await axiosInstance.post<UploadResponse>(
                '/knowledge/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(
                error.response?.data?.message || 'Failed to upload documents'
            );
        }
    },
};
