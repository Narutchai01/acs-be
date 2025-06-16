import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabaseUrl: string;
  private readonly supabaseKey: string;
  private storage: SupabaseClient['storage'];
  private readonly bucketName: string;
  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL || '';
    this.supabaseKey = process.env.SUPABASE_KEY || '';
    this.bucketName = process.env.SUPABASE_BUCKET || '';
    this.storage = createClient(this.supabaseUrl, this.supabaseKey).storage;
  }

  getUrl(path: string): string {
    const { data } = this.storage.from(this.bucketName).getPublicUrl(path);
    return data.publicUrl;
  }

  async uploadFile(file: File, dirName: string): Promise<string> {
    const filePath = `${dirName}/${file.name}`;
    const { data, error } = await this.storage
      .from(this.bucketName)
      .upload(filePath, file);
    if (error) {
      throw error;
    }
    return this.getUrl(data.path);
  }
}
