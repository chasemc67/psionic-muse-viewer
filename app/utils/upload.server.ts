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
  data,
  filename,
}) => {
  if (!filename) {
    return '';
  }

  const chunks = [];
  for await (const chunk of data) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  // Determine bucket based on upload type
  let bucket = 'csv-files';
  let contentType = 'text/csv';
  let metadata = {};

  if (name === 'video') {
    bucket = 'eeg_session_videos';
    contentType = 'video/mp4';
    metadata = {
      creationTime: new Date().toISOString(),
    };
  }

  const { data: uploadData, error } = await supabase.storage
    .from(bucket)
    .upload(`${Date.now()}-${filename}`, buffer, {
      contentType,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading file:', error);
    throw new Error('Error uploading file');
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);

  return JSON.stringify({
    publicUrl,
    metadata,
  });
};
