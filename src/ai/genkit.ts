/**
 * @fileoverview This file configures and initializes the Genkit AI instance.
 * It sets up the necessary plugins (like Google AI) and defines a default model
 * that can be used throughout the application for generative AI tasks.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

/**
 * The singleton Genkit AI instance for the application.
 *
 * This instance is configured with the Google AI plugin and specifies
 * 'gemini-2.0-flash' as the default model for all AI generation tasks.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
