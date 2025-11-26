import Link from 'next/link';
import { Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="transition-colors hover:text-foreground text-muted-foreground"
  >
    {children}
  </Link>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              AgriData Hub
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLink href="/">Departments</NavLink>
            <NavLink href="/data-parser">Data Parser</NavLink>
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col space-y-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">AgriData Hub</span>
                </Link>
                <nav className="flex flex-col space-y-2 text-lg font-medium">
                    <NavLink href="/">Departments</NavLink>
                    <NavLink href="/data-parser">Data Parser</NavLink>
                </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search bar here if needed */}
          </div>
          <nav className="hidden md:flex items-center">
            {/* Additional nav items for desktop if needed */}
          </nav>
        </div>
      </div>
    </header>
  );
}
