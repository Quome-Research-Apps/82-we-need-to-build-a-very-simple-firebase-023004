'use server';

/**
 * @fileOverview A flashcard template generator AI agent.
 *
 * - generateCardTemplates - A function that generates flashcard templates based on a topic.
 * - GenerateCardTemplatesInput - The input type for the generateCardTemplates function.
 * - GenerateCardTemplatesOutput - The return type for the generateCardTemplates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCardTemplatesInputSchema = z.object({
  topic: z.string().describe('The topic or keyword for the flashcard template.'),
});
export type GenerateCardTemplatesInput = z.infer<
  typeof GenerateCardTemplatesInputSchema
>;

const GenerateCardTemplatesOutputSchema = z.object({
  templates: z.array(
    z.object({
      colorScheme: z
        .object({
          primaryColor: z.string().describe('The primary color of the card.'),
          backgroundColor: z
            .string()
            .describe('The background color of the card.'),
          accentColor: z.string().describe('The accent color of the card.'),
        })
        .describe('The color scheme for the flashcard.'),
      question: z.string().describe('A sample question for the flashcard.'),
      answer: z.string().describe('The answer to the sample question.'),
    })
  ).describe('An array of flashcard templates.'),
});
export type GenerateCardTemplatesOutput = z.infer<
  typeof GenerateCardTemplatesOutputSchema
>;

export async function generateCardTemplates(
  input: GenerateCardTemplatesInput
): Promise<GenerateCardTemplatesOutput> {
  return generateCardTemplatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCardTemplatesPrompt',
  input: {schema: GenerateCardTemplatesInputSchema},
  output: {schema: GenerateCardTemplatesOutputSchema},
  prompt: `You are a creative flashcard template generator. Given a topic, you will generate three different flashcard templates, each with a unique color scheme and a sample question and answer. Make sure the color schemes are visually appealing and the questions are relevant to the topic.

Topic: {{{topic}}}

Each flashcard template should include:
- colorScheme: A set of primaryColor, backgroundColor, and accentColor.
- question: A sample question related to the topic.
- answer: The answer to the sample question.

Output the templates in JSON format. Do not include any explanation text. Only output the valid JSON.`,
});

const generateCardTemplatesFlow = ai.defineFlow(
  {
    name: 'generateCardTemplatesFlow',
    inputSchema: GenerateCardTemplatesInputSchema,
    outputSchema: GenerateCardTemplatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
