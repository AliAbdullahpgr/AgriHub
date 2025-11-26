'use server';
/**
 * @fileOverview Dashboard generator for each department.
 *
 * - generateDepartmentDashboards - A function that handles the dashboard generation for a department.
 * - GenerateDepartmentDashboardsInput - The input type for the generateDepartmentDashboards function.
 * - GenerateDepartmentDashboardsOutput - The return type for the generateDepartmentDashboards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDepartmentDashboardsInputSchema = z.object({
  departmentName: z.string().describe('The name of the department.'),
  data: z.string().describe('The data for the department, including lab equipment, facilities, and contact information.'),
});
export type GenerateDepartmentDashboardsInput = z.infer<typeof GenerateDepartmentDashboardsInputSchema>;

const GenerateDepartmentDashboardsOutputSchema = z.object({
  dashboardContent: z.string().describe('The generated dashboard content in markdown format, including tables, charts, and graphs.'),
});
export type GenerateDepartmentDashboardsOutput = z.infer<typeof GenerateDepartmentDashboardsOutputSchema>;

export async function generateDepartmentDashboards(input: GenerateDepartmentDashboardsInput): Promise<GenerateDepartmentDashboardsOutput> {
  return generateDepartmentDashboardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDepartmentDashboardsPrompt',
  input: {schema: GenerateDepartmentDashboardsInputSchema},
  output: {schema: GenerateDepartmentDashboardsOutputSchema},
  prompt: `You are an AI assistant tasked with generating a comprehensive dashboard for a given department within an agricultural university.

  Department Name: {{{departmentName}}}

  Department Data: {{{data}}}

  Instructions:
  1. Analyze the provided department data, which includes information about lab equipment, available facilities, and contact details.
  2. Create a dashboard in markdown format that visualizes this data using tables, charts, and graphs.
  3.  In your tables, show quantity, name, status, and related metadata extracted from the lab equipment.
  4.  Use simple, line-based icons to represent different data types and categories in markdown if possible.
  5.  In the dashboard, highlight key information and insights that would be valuable to an administrator.

  Output:
  Return the complete dashboard content in markdown format.
`,
});

const generateDepartmentDashboardsFlow = ai.defineFlow(
  {
    name: 'generateDepartmentDashboardsFlow',
    inputSchema: GenerateDepartmentDashboardsInputSchema,
    outputSchema: GenerateDepartmentDashboardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
