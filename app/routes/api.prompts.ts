import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Returns a list of available prompt templates from the ai-prompts directory.
 */
export const loader: LoaderFunction = async () => {
  try {
    const promptsDir = path.join(process.cwd(), 'ai-prompts/analysis');
    const files = await fs.readdir(promptsDir);
    const prompts = files
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
    return json({ prompts });
  } catch (error) {
    console.error('Error reading ai-prompts directory:', error);
    return json({ prompts: [] });
  }
};
export const headers = {
  'Cache-Control': 'no-cache',
};
