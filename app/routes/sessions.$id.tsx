import {
  json,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import {
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
  useFetcher,
} from '@remix-run/react';
import { EEGNotes } from '~/components/EEGNotes';
import { EEGVisualization } from '~/components/EEGVisualization';
import { MomentsOfInterest } from '~/components/MomentsOfInterest';
import { CSVUpload } from '~/components/CSVUpload';
import { VideoUpload } from '~/components/VideoUpload';
import { VideoPlayer } from '~/components/VideoPlayer';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Skeleton } from '~/components/ui/skeleton';
import { db } from '~/utils/db.server';
import { uploadHandler } from '~/utils/upload.server';
import type { Database } from '~/types/database.types';
import { useEffect } from 'react';

type EEGSession = Database['public']['Tables']['eeg_sessions']['Row'];
type MomentOfInterest =
  Database['public']['Tables']['moments_of_interest']['Row'];
type EEGData = Record<string, [number, number][]>;

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const [sessionResult, momentsResult] = await Promise.all([
    db.from('eeg_sessions').select('*').eq('id', params.id).single(),
    db
      .from('moments_of_interest')
      .select('*')
      .eq('session_id', params.id)
      .order('timestamp', { ascending: true }),
  ]);

  if (sessionResult.error) {
    console.error('Error fetching session:', sessionResult.error);
    throw new Response('Error fetching session', { status: 500 });
  }

  if (!sessionResult.data) {
    throw new Response('Session not found', { status: 404 });
  }

  if (momentsResult.error) {
    console.error('Error fetching moments:', momentsResult.error);
    throw new Response('Error fetching moments', { status: 500 });
  }

  return json({
    session: sessionResult.data as EEGSession,
    moments: momentsResult.data as MomentOfInterest[],
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  if (!params.id) {
    throw new Response('Session ID is required', { status: 400 });
  }

  const formData = await (request.headers
    .get('Content-Type')
    ?.includes('multipart/form-data')
    ? unstable_parseMultipartFormData(request, uploadHandler)
    : request.formData());

  // Handle CSV upload
  const csvUploadResult = formData.get('csv');
  if (csvUploadResult) {
    try {
      const { publicUrl } = JSON.parse(csvUploadResult as string);

      const { error: updateError } = await db
        .from('eeg_sessions')
        .update({
          csv_file_path: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);

      if (updateError) {
        console.error('Error updating session:', updateError);
        throw new Response('Error updating session', { status: 500 });
      }

      return json({ success: true });
    } catch (error) {
      console.error('Error parsing upload result:', error);
      throw new Response('Error processing upload', { status: 500 });
    }
  }

  // Handle video upload
  const videoUploadResult = formData.get('video');
  if (videoUploadResult) {
    try {
      const { publicUrl } = JSON.parse(videoUploadResult as string);

      const { error: updateError } = await db
        .from('eeg_sessions')
        .update({
          video_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.id);

      if (updateError) {
        console.error('Error updating session:', updateError);
        throw new Response('Error updating session', { status: 500 });
      }

      return json({ success: true });
    } catch (error) {
      console.error('Error parsing upload result:', error);
      throw new Response('Error processing upload', { status: 500 });
    }
  }

  // Handle existing title/notes updates
  const notes = formData.get('notes');
  const title = formData.get('title');

  const updateData: { notes?: string; title?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  };

  if (typeof notes === 'string') {
    updateData.notes = notes;
  }

  if (typeof title === 'string') {
    updateData.title = title;
  }

  const { error } = await db
    .from('eeg_sessions')
    .update(updateData)
    .eq('id', params.id);

  if (error) {
    console.error('Error updating session:', error);
    throw new Response('Error updating session', { status: 500 });
  }

  return json({ success: true });
}

export default function SessionView() {
  const { session, moments } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const isSaving = navigation.state === 'submitting';
  const isUploadingCSV = navigation.formData?.has('csv');
  const isUploadingVideo = navigation.formData?.has('video');
  const csvFetcher = useFetcher<EEGData>();
  const isLoadingCSV = csvFetcher.state === 'loading';

  // Load CSV data when csv_file_path changes
  useEffect(() => {
    if (session.csv_file_path) {
      csvFetcher.load(`/api/eeg/${session.id}`);
    }
  }, [session.csv_file_path, session.id]);

  const handleCSVUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('csv', file);
    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  const handleVideoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);
    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <Button variant="ghost" asChild className="mb-2">
            <a href="/sessions">← Back to Sessions</a>
          </Button>
          <Form method="post" className="space-y-2">
            <Input
              type="text"
              name="title"
              defaultValue={session.title || ''}
              placeholder="Enter session title"
              className="text-3xl font-bold h-12 px-0 border-0 bg-transparent focus-visible:ring-0 rounded-none"
            />
            <div className="flex items-center gap-2">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Title'}
              </Button>
            </div>
          </Form>
          <p className="text-muted-foreground">
            Created {new Date(session.created_at!).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          {!session.csv_file_path ? (
            <CSVUpload
              onUpload={handleCSVUpload}
              isUploading={isUploadingCSV}
              hasExistingFile={false}
            />
          ) : isLoadingCSV ? (
            <div className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-[200px] w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            </div>
          ) : csvFetcher.data ? (
            <EEGVisualization data={csvFetcher.data} />
          ) : (
            <div className="p-4 border border-red-500 rounded-lg">
              <p className="text-red-500">
                Error loading CSV data. Please try uploading again.
              </p>
              <CSVUpload
                onUpload={handleCSVUpload}
                isUploading={isUploadingCSV}
                hasExistingFile={true}
              />
            </div>
          )}

          {!session.video_url ? (
            <VideoUpload
              onUpload={handleVideoUpload}
              isUploading={isUploadingVideo}
              hasExistingFile={false}
            />
          ) : isUploadingVideo ? (
            <div className="space-y-4 p-6 border rounded-lg">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-[300px] w-full" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-8" />
                <Skeleton className="h-8" />
              </div>
            </div>
          ) : session.video_url ? (
            <VideoPlayer videoUrl={session.video_url} />
          ) : (
            <div className="p-4 border border-red-500 rounded-lg">
              <p className="text-red-500">
                Error loading video. Please try uploading again.
              </p>
              <VideoUpload
                onUpload={handleVideoUpload}
                isUploading={isUploadingVideo}
                hasExistingFile={true}
              />
            </div>
          )}

          <MomentsOfInterest sessionId={session.id} initialMoments={moments} />
        </div>
        <div>
          <EEGNotes sessionId={session.id} initialNotes={session.notes || ''} />
        </div>
      </div>
    </div>
  );
}
