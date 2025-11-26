import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center space-y-6 text-center">
      <AlertTriangle className="h-24 w-24 text-destructive" />
      <h1 className="text-4xl font-bold text-primary font-headline">404 - Page Not Found</h1>
      <p className="max-w-md text-muted-foreground">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
