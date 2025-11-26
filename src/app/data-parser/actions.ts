'use server';

import { parseEquipmentDetails } from '@/ai/flows/parse-equipment-details';

export async function parseTextAction(text: string) {
  try {
    const result = await parseEquipmentDetails({ text });
    return result;
  } catch (error) {
    console.error('Error in parseTextAction:', error);
    throw new Error('Failed to parse equipment details.');
  }
}
