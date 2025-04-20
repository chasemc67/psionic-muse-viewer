import { createClient } from '@supabase/supabase-js';
import type { UploadHandler } from '@remix-run/node';

if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL is required');
if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export const uploadHandler: UploadHandler = async ({
  name,
  contentType,
  data,
}) => {
  if (name !== 'csv') {
    return undefined;
  }

  // Convert stream to buffer
  const chunks = [];
  for await (const chunk of data) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.csv`;
  const { error } = await supabase.storage
    .from('csv-files')
    .upload(filename, buffer, {
      contentType: 'text/csv',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('csv-files').getPublicUrl(filename);

  // Return both the filename and public URL as a JSON string
  return JSON.stringify({ filename, publicUrl });
};
