'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { parseTextAction } from './actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  text: z.string().min(10, {
    message: 'Please enter some text to parse.',
  }),
});

export function ParserClient() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const parsedData = await parseTextAction(values.text);
      setResult(JSON.stringify(parsedData, null, 2));
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to parse the data. Please try again.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unstructured Text</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste your equipment list here... e.g., '2 Microscopes, functional. 1 Centrifuge, out of order.'"
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Parse Data
          </Button>
        </form>
      </Form>

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 font-headline">Parsed Output</h3>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>{result}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
