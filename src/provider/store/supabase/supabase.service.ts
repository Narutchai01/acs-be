import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SupabaseService {
  private readonly supabaseUrl: string;
  private readonly supabaseKey: string;
  private storage: SupabaseClient['storage'];
  private readonly bucketName: string;
  constructor() {
    if (!process.env.SUPABASE_URL) {
      throw new Error(
        'Environment variable SUPABASE_URL is required but not set.',
      );
    }
    if (!process.env.SUPABASE_KEY) {
      throw new Error(
        'Environment variable SUPABASE_KEY is required but not set.',
      );
    }
    if (!process.env.SUPABASE_BUCKET) {
      throw new Error(
        'Environment variable SUPABASE_BUCKET is required but not set.',
      );
    }
    this.supabaseUrl = process.env.SUPABASE_URL;
    this.supabaseKey = process.env.SUPABASE_KEY;
    this.bucketName = process.env.SUPABASE_BUCKET;
    this.storage = createClient(this.supabaseUrl, this.supabaseKey).storage;
  }

  getUrl(path: string): string {
    const { data } = this.storage.from(this.bucketName).getPublicUrl(path);
    return data.publicUrl;
  }

  async uploadFile(
    fileBuffer: Express.Multer.File,
    dirName: string,
  ): Promise<string> {
    if (!fileBuffer.buffer) {
      throw new Error('File buffer is required');
    }
    const fileName = `${uuidv4()}`;
    const filePath = `${dirName}/${fileName}.jpg`; // Assuming the file is a JPEG image, adjust as necessary
    const { error } = await this.storage
      .from(this.bucketName)
      .upload(filePath, fileBuffer.buffer, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
      });
    if (error) {
      throw error;
    }
    return this.getUrl(filePath);
  }
}
