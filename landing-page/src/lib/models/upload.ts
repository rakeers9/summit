// models/Upload.ts
export interface Upload {
    _id?: string;
    fileName: string;
    reviewsPerImage: number;
    targetedDemographic: string;
    classificationType: string;
    uploadDate: Date;
    userId: string;    // To associate uploads with users
    status: string;    // e.g., 'pending', 'processing', 'complete'
    metadata?: {
      totalImages?: number;
      processedImages?: number;
      errorCount?: number;
    }
  }