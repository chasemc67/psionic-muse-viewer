import { useState } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export function EEGNotes() {
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving notes:', notes);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Session Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Record your experience</Label>
          <Textarea
            id="notes"
            placeholder="Write your thoughts about this session..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="min-h-[200px]"
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Notes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
