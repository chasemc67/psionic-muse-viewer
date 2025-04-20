import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/coach
 * Streams an AI coach chat response based on the provided messages.
 */
export const action: ActionFunction = async ({ request }) => {
  try {
    const { messages } = await request.json();

    // Load the system prompt from ai-prompts/coach/default.md
    const promptsDir = path.join(process.cwd(), 'ai-prompts', 'coach');
    const promptPath = path.join(promptsDir, 'default.md');
    const initialPrompt = await fs.readFile(promptPath, 'utf-8');
    const systemMessage = { role: 'system' as const, content: initialPrompt };

    // Stream the AI response
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [systemMessage, ...messages],
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in coach API:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

export const headers = {
  'Cache-Control': 'no-cache',
};