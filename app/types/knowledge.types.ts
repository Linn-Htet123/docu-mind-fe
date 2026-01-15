export interface UploadResponse {
    statusCode: number;
    message: string;
    data: {
        processed: number;
        details: any[];
    };
}
