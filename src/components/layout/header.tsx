import Link from 'next/link';
import { Wheat, Menu, Building2, Home, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="transition-colors hover:text-primary text-foreground/80 font-medium flex items-center gap-2"
  >
    {children}
  </Link>
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Wheat className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary font-headline leading-tight">
                Agriculture Complex
              </span>
              <span className="text-xs text-muted-foreground">
                South Punjab • Multan
              </span>
            </div>
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            <NavLink href="/">
              <Home className="h-4 w-4" />
              Home
            </NavLink>
            <NavLink href="/#departments">
              <Building2 className="h-4 w-4" />
              Departments
            </NavLink>
            <NavLink href="/institutes">
              <Microscope className="h-4 w-4" />
              Institutes
            </NavLink>
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
          <SheetContent side="left" className="w-[280px]">
            <div className="flex flex-col space-y-6">
              <Link href="/" className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Wheat className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-primary font-headline leading-tight">
                    Agriculture Complex
                  </span>
                  <span className="text-xs text-muted-foreground">
                    South Punjab • Multan
                  </span>
                </div>
              </Link>
              
              <div className="h-px bg-border" />
              
              <nav className="flex flex-col space-y-4 text-base font-medium">
                <Link href="/" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link href="/#departments" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                  <Building2 className="h-5 w-5" />
                  Departments
                </Link>
                <Link href="/institutes" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted">
                  <Microscope className="h-5 w-5" />
                  Institutes
                </Link>
              </nav>
              
              <div className="h-px bg-border" />
              
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground mb-2">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="https://mnsuam.edu.pk" target="_blank" className="text-xs text-primary hover:underline">
                    MNSUAM
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link href="https://punjab.gov.pk" target="_blank" className="text-xs text-primary hover:underline">
                    Punjab Gov
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Link href="/" className="flex md:hidden items-center space-x-2">
            <Wheat className="h-6 w-6 text-primary" />
            <span className="font-bold text-primary font-headline">AgriHub</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="https://mnsuam.edu.pk" target="_blank" rel="noopener noreferrer">
                <Microscope className="mr-2 h-4 w-4" />
                MNSUAM Portal
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
