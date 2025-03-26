export interface IUpload {
    startDate: Date;
    endDate: Date;
    dateType: string;
    file?: File
}

export interface UploadPaylod {
    startDate: Date;
    endDate: Date;
    dateType: string;
    fileName: string;
    numOfRecords: number;
    processedFile: any[];
}

export interface UploadResponse {
    id: string;
    startDate: Date;
    endDate: Date;
    dateType: string;
    fileName: string;
    uploadDate: string;
    numOfRecords: number;
    processedFile: any[];
}