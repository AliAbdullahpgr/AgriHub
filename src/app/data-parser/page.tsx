import { ParserClient } from './parser-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DataParserPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline">Data Parsing Tool</CardTitle>
          <CardDescription>
            Use our AI-powered tool to parse unstructured text about lab equipment and extract structured data like name, quantity, and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ParserClient />
        </CardContent>
      </Card>
    </div>
  );
}
