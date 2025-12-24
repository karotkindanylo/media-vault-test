export interface CreateMultipartResponse {
  uploadId: string;
  key: string;
}

export interface UploadedPart {
  PartNumber: number;
  ETag: string;
}
