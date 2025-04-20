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
  const [addedContext, setAddedContext] = useState<string>('');
  const [analysis, setAnalysis] = useState<string | null>(
    session.analysis || null,
  );
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Agent Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysis && (
          <>
            <div className="space-y-2">
              <Label htmlFor="template">Prompt Template</Label>
              <Select value={promptName} onValueChange={setPromptName}>
                <SelectTrigger id="template">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
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
            <div className="flex justify-end">
              <fetcher.Form method="post">
                <input type="hidden" name="analysis" value={analysis!} />
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Analysis'}
                </Button>
              </fetcher.Form>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
