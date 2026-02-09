/**
 * Azure Blob Storage helper for daily content
 * Stores sentences, stories, and news as JSON files
 * Automatically cleans up content older than 30 days
 */

import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

const CONTAINER_NAME = 'daily-content';
const MAX_DAYS = 30;

let containerClient: ContainerClient | null = null;

/**
 * Initialize the blob storage client
 */
function getContainerClient(): ContainerClient {
  if (containerClient) return containerClient;

  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (!connectionString) {
    throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is not set');
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
  containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
  
  return containerClient;
}

/**
 * Ensure the container exists
 */
export async function ensureContainer(): Promise<void> {
  const client = getContainerClient();
  await client.createIfNotExists({ access: 'blob' });
}

/**
 * Get content for a specific date
 * @param date - Date string in YYYY-MM-DD format
 */
export async function getContent(date: string): Promise<any | null> {
  try {
    const client = getContainerClient();
    const blobClient = client.getBlobClient(`${date}.json`);
    
    const exists = await blobClient.exists();
    if (!exists) return null;

    const downloadResponse = await blobClient.download();
    const content = await streamToString(downloadResponse.readableStreamBody);
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error getting content for ${date}:`, error);
    return null;
  }
}

/**
 * Save content for a specific date
 * @param date - Date string in YYYY-MM-DD format
 * @param content - The content object to save
 */
export async function saveContent(date: string, content: any): Promise<boolean> {
  try {
    await ensureContainer();
    const client = getContainerClient();
    const blockBlobClient = client.getBlockBlobClient(`${date}.json`);
    
    const data = JSON.stringify(content, null, 2);
    await blockBlobClient.upload(data, data.length, {
      blobHTTPHeaders: { blobContentType: 'application/json' }
    });
    
    return true;
  } catch (error) {
    console.error(`Error saving content for ${date}:`, error);
    return false;
  }
}

/**
 * Get all available dates (last 30 days)
 */
export async function getAvailableDates(): Promise<string[]> {
  try {
    const client = getContainerClient();
    const dates: string[] = [];
    
    for await (const blob of client.listBlobsFlat()) {
      if (blob.name.endsWith('.json')) {
        const date = blob.name.replace('.json', '');
        dates.push(date);
      }
    }
    
    return dates.sort().reverse();
  } catch (error) {
    console.error('Error listing dates:', error);
    return [];
  }
}

/**
 * Clean up content older than 30 days
 */
export async function cleanupOldContent(): Promise<number> {
  try {
    const client = getContainerClient();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_DAYS);
    const cutoffStr = cutoffDate.toISOString().split('T')[0];
    
    let deletedCount = 0;
    
    for await (const blob of client.listBlobsFlat()) {
      if (blob.name.endsWith('.json')) {
        const date = blob.name.replace('.json', '');
        if (date < cutoffStr) {
          await client.deleteBlob(blob.name);
          deletedCount++;
          console.log(`Deleted old content: ${blob.name}`);
        }
      }
    }
    
    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old content:', error);
    return 0;
  }
}

/**
 * Helper to convert stream to string
 */
async function streamToString(readableStream: NodeJS.ReadableStream | undefined): Promise<string> {
  if (!readableStream) return '';
  
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    readableStream.on('data', (data) => {
      chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });
    readableStream.on('error', reject);
  });
}
