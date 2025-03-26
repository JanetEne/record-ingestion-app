export interface UploadPayload {
    startDate: Date;
    endDate: Date;
    dateType: string;
    file?: File
}

export interface UploadResponse {
    startDate: string;
    endDate: Date;
    dateType: string;
    fileName: string;
    uploadDate: string;
    numberOfRecords: number
}