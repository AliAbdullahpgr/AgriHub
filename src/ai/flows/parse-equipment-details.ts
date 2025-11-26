'use server';

/**
 * @fileOverview This flow parses equipment details from unstructured text using AI.
 *
 * - parseEquipmentDetails - A function that takes unstructured text as input and returns structured equipment details.
 * - ParseEquipmentDetailsInput - The input type for the parseEquipmentDetails function.
 * - ParseEquipmentDetailsOutput - The return type for the parseEquipmentDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseEquipmentDetailsInputSchema = z.object({
  text: z
    .string()
    .describe('The unstructured text containing equipment details.'),
});
export type ParseEquipmentDetailsInput = z.infer<typeof ParseEquipmentDetailsInputSchema>;

const ParseEquipmentDetailsOutputSchema = z.array(z.object({
  name: z.string().describe('The name of the equipment.'),
  quantity: z.number().describe('The quantity of the equipment.'),
  status: z.string().describe('The functional status of the equipment.'),
  metadata: z.record(z.any()).optional().describe('Optional metadata about the equipment.'),
}));
export type ParseEquipmentDetailsOutput = z.infer<typeof ParseEquipmentDetailsOutputSchema>;

export async function parseEquipmentDetails(input: ParseEquipmentDetailsInput): Promise<ParseEquipmentDetailsOutput> {
  return parseEquipmentDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseEquipmentDetailsPrompt',
  input: {schema: ParseEquipmentDetailsInputSchema},
  output: {schema: ParseEquipmentDetailsOutputSchema},
  prompt: `You are an expert data parser specializing in extracting equipment details from unstructured text.  You will receive a text input and extract the equipment name, quantity and functional status from the text. Return the data in JSON format.

Text: {{{text}}}`,
});

const parseEquipmentDetailsFlow = ai.defineFlow(
  {
    name: 'parseEquipmentDetailsFlow',
    inputSchema: ParseEquipmentDetailsInputSchema,
    outputSchema: ParseEquipmentDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
