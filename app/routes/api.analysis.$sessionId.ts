import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { promises as fs } from 'fs';
import path from 'path';

if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required');

const llm = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: 'o4-mini',
});

export const action: ActionFunction = async ({ request, params }) => {
  const sessionId = params.sessionId;
  if (!sessionId) {
    return json({ error: 'Session ID is required' }, { status: 400 });
  }
  try {
    const { promptName, notes, addedContext } = await request.json();

    const templatePath = path.join(
      process.cwd(),
      'ai-prompts/analysis',
      `${promptName}.md`,
    );
    const promptTemplate = await fs.readFile(templatePath, 'utf8');

    const analysisTemplate = new PromptTemplate({
      inputVariables: ['notes', 'addedContext'],
      template: promptTemplate,
    });

    const formattedPrompt = await analysisTemplate.format({
      notes,
      addedContext,
    });

    const response = await llm.invoke(formattedPrompt);
    return json({ content: response.content });
  } catch (error) {
    console.error(error);
    return json({ error: 'Analysis failed' }, { status: 500 });
  }
};

export const loader = () => {
  return new Response('Not Found', { status: 404 });
};
