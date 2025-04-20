import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

import { useChat } from '@ai-sdk/react';
import { Input } from '~/components/ui/input';

export function AIAgentCoach() {
  const { messages, input, handleInputChange, handleSubmit, status, error } =
    useChat({ api: '/api/coach' });

  return (
    <Card className="w-full bg-transparent border-border text-foreground">
      <CardHeader>
        <CardTitle className="text-foreground">AI Coach (Caelum)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 bg-transparent">
        {error && <div className="text-destructive">{error.message}</div>}
        <div className="space-y-2 max-h-[400px] overflow-y-auto p-3 dark:bg-black/20 bg-white/20 rounded-md border border-border">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-md ${
                  message.role === 'user'
                    ? 'dark:bg-white/10 bg-blue-100/50'
                    : 'dark:bg-white/5 bg-gray-100/50'
                } text-foreground`}
              >
                <span className="font-semibold">
                  {message.role === 'user' ? 'You' : 'AI'}:
                </span>{' '}
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask Caelum..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 dark:bg-black/20 bg-white/20 text-foreground placeholder-muted-foreground border-input focus:ring-ring"
          />
          <Button
            type="submit"
            disabled={status !== 'ready'}
            className="bg-primary text-primary-foreground hover:bg-primary/80"
          >
            {status === 'streaming' ? '...' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
