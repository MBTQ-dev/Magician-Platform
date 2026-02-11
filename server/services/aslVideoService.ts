import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * ASL Video Service with Cloudflare R2 Storage
 * Handles video upload, processing, and retrieval for ASL content
 */

// Initialize R2 client (S3-compatible)
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

const ASSETS_BUCKET = process.env.R2_BUCKET_ASSETS || "magicians-assets";
const VIDEOS_BUCKET = process.env.R2_BUCKET_VIDEOS || "magicians-asl-videos";
const PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

export interface VideoUploadOptions {
  userId: number;
  videoType: "asl_tutorial" | "marketing" | "product_demo" | "announcement" | "profile";
  title: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface UploadResult {
  success: boolean;
  videoUrl?: string;
  r2Key?: string;
  thumbnailUrl?: string;
  error?: string;
}

/**
 * Upload ASL video to R2 storage
 */
export async function uploadAslVideo(
  videoBuffer: Buffer,
  fileName: string,
  options: VideoUploadOptions
): Promise<UploadResult> {
  try {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const r2Key = `asl-videos/${options.userId}/${options.videoType}/${timestamp}-${sanitizedFileName}`;

    // Upload to R2
    const putCommand = new PutObjectCommand({
      Bucket: VIDEOS_BUCKET,
      Key: r2Key,
      Body: videoBuffer,
      ContentType: "video/mp4",
      Metadata: {
        userId: options.userId.toString(),
        videoType: options.videoType,
        title: options.title,
        uploadedAt: new Date().toISOString(),
        ...options.metadata,
      },
    });

    await r2Client.send(putCommand);

    // Generate public URL
    const videoUrl = `${PUBLIC_URL}/${r2Key}`;

    // Generate thumbnail (placeholder for now - would integrate with video processing service)
    const thumbnailUrl = await generateVideoThumbnail(r2Key);

    return {
      success: true,
      videoUrl,
      r2Key,
      thumbnailUrl,
    };
  } catch (error) {
    console.error("Error uploading ASL video to R2:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get signed URL for private video access
 */
export async function getSignedVideoUrl(r2Key: string, expiresIn: number = 3600): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: VIDEOS_BUCKET,
      Key: r2Key,
    });

    const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
    return signedUrl;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
}

/**
 * Delete video from R2 storage
 */
export async function deleteAslVideo(r2Key: string): Promise<boolean> {
  try {
    const command = new DeleteObjectCommand({
      Bucket: VIDEOS_BUCKET,
      Key: r2Key,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting ASL video from R2:", error);
    return false;
  }
}

/**
 * Upload brand asset to R2
 */
export async function uploadBrandAsset(
  fileBuffer: Buffer,
  fileName: string,
  userId: number,
  assetType: string
): Promise<UploadResult> {
  try {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    const r2Key = `brand-assets/${userId}/${assetType}/${timestamp}-${sanitizedFileName}`;

    const putCommand = new PutObjectCommand({
      Bucket: ASSETS_BUCKET,
      Key: r2Key,
      Body: fileBuffer,
      Metadata: {
        userId: userId.toString(),
        assetType,
        uploadedAt: new Date().toISOString(),
      },
    });

    await r2Client.send(putCommand);

    const fileUrl = `${PUBLIC_URL}/${r2Key}`;

    return {
      success: true,
      videoUrl: fileUrl,
      r2Key,
    };
  } catch (error) {
    console.error("Error uploading brand asset to R2:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Generate video thumbnail (placeholder implementation)
 * In production, this would use a video processing service
 */
async function generateVideoThumbnail(r2Key: string): Promise<string> {
  // TODO: Integrate with video processing service (e.g., Cloudflare Stream, FFmpeg)
  // For now, return a placeholder
  return `${PUBLIC_URL}/thumbnails/placeholder.jpg`;
}

/**
 * Process ASL video for optimization
 * - Transcoding to multiple resolutions
 * - Generate subtitles/captions
 * - Create thumbnail
 */
export async function processAslVideo(r2Key: string): Promise<{
  success: boolean;
  processedUrls?: {
    sd: string;
    hd: string;
    thumbnail: string;
  };
  error?: string;
}> {
  try {
    // TODO: Implement video processing pipeline
    // This would integrate with Cloudflare Stream or similar service
    
    console.log(`Processing video: ${r2Key}`);
    
    // Placeholder response
    return {
      success: true,
      processedUrls: {
        sd: `${PUBLIC_URL}/${r2Key}`,
        hd: `${PUBLIC_URL}/${r2Key}`,
        thumbnail: await generateVideoThumbnail(r2Key),
      },
    };
  } catch (error) {
    console.error("Error processing ASL video:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Batch upload multiple ASL videos
 */
export async function batchUploadAslVideos(
  videos: Array<{
    buffer: Buffer;
    fileName: string;
    options: VideoUploadOptions;
  }>
): Promise<UploadResult[]> {
  const uploadPromises = videos.map((video) =>
    uploadAslVideo(video.buffer, video.fileName, video.options)
  );

  return Promise.all(uploadPromises);
}

export default {
  uploadAslVideo,
  getSignedVideoUrl,
  deleteAslVideo,
  uploadBrandAsset,
  processAslVideo,
  batchUploadAslVideos,
};
