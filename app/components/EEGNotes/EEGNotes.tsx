import { useState } from 'react';
import { Form, useNavigation } from '@remix-run/react';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

interface EEGNotesProps {
  sessionId: string;
  initialNotes: string;
}

export function EEGNotes({ sessionId, initialNotes }: EEGNotesProps) {
  const [notes, setNotes] = useState(initialNotes);
  const navigation = useNavigation();
  const isSaving = navigation.state === 'submitting';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Session Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form method="post" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Record your experience</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Write your thoughts about this session..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Notes'}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
