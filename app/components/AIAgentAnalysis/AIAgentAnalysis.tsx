import { useEffect, useState } from 'react';

import { useFetcher } from '@remix-run/react';
import type { Database } from '~/types/database.types';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface AIAgentAnalysisProps {
  session: Database['public']['Tables']['eeg_sessions']['Row'];
}

export function AIAgentAnalysis({ session }: AIAgentAnalysisProps) {
  const [promptName, setPromptName] = useState<string>('default');
  const [promptNames, setPromptNames] = useState<string[]>([]);
  const [loadingPrompts, setLoadingPrompts] = useState<boolean>(true);

  // Load available prompt templates
  useEffect(() => {
    fetch('/api/prompts')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.prompts)) {
          setPromptNames(data.prompts);
          // Ensure selected promptName is valid
          if (!data.prompts.includes(promptName) && data.prompts.length > 0) {
            setPromptName(data.prompts[0]);
          }
        }
      })
      .catch((error) => console.error('Failed to load prompts', error))
      .finally(() => setLoadingPrompts(false));
  }, []);
  const [addedContext, setAddedContext] = useState<string>('');
  const [analysis, setAnalysis] = useState<string | null>(
    session.analysis || null,
  );
  // Track whether the current analysis is newly generated and unsaved
  const [hasUnsaved, setHasUnsaved] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState(false);
  const fetcher = useFetcher();
  const isSaving = fetcher.state === 'submitting';

  const runAnalysis = async () => {
    if (!session.notes) return;
    setIsRunning(true);
    try {
      const res = await fetch(`/api/analysis/${session.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptName,
          notes: session.notes,
          addedContext: addedContext ?? 'None',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.content === 'string') {
          setAnalysis(data.content);
          setHasUnsaved(true);
        }
      } else {
        console.error('Analysis request failed', res.statusText);
      }
    } catch (error) {
      console.error('Error running analysis', error);
    } finally {
      setIsRunning(false);
    }
  };
  // Reset to allow user to re-run the analysis
  const reRunAnalysis = () => {
    setAnalysis(null);
    setAddedContext('');
    setHasUnsaved(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && (
          <>
            <div className="space-y-2">
              <Label htmlFor="template">Prompt Template</Label>
              <Select
                value={promptName}
                onValueChange={setPromptName}
                disabled={loadingPrompts}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder={
                    loadingPrompts ? 'Loading...' : 'Select template'
                  } />
                </SelectTrigger>
                <SelectContent>
                  {loadingPrompts ? (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : (
                    promptNames.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="added-context">Additional Context</Label>
              <Textarea
                id="added-context"
                value={addedContext}
                onChange={e => setAddedContext(e.target.value)}
                placeholder="Enter additional context (optional)..."
                className="min-h-[150px]"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={runAnalysis}
                disabled={isRunning || !session.notes}
              >
                {isRunning ? 'Running...' : 'Run Analysis'}
              </Button>
            </div>
          </>
        )}
        {analysis && (
          <>
            <div>
              <h1>Analysis</h1>
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {analysis}
              </pre>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={reRunAnalysis} disabled={isRunning}>
                {hasUnsaved ? 'Re-run Analysis' : 'Re-run Analysis'}
              </Button>
              {hasUnsaved && (
                <fetcher.Form method="post">
                  <input type="hidden" name="analysis" value={analysis!} />
                  <Button
                    type="submit"
                    disabled={isSaving}
                    onClick={() => setHasUnsaved(false)}
                  >
                    {isSaving ? 'Saving...' : 'Save Analysis'}
                  </Button>
                </fetcher.Form>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
