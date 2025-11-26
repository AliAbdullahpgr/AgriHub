import Link from 'next/link';
import { Building, Phone, Mail, MapPin, Wheat, ExternalLink, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-white/10">
                <Wheat className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-headline">Agriculture Complex</h3>
                <p className="text-xs text-primary-foreground/70">South Punjab</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              A comprehensive digital platform showcasing research facilities and resources 
              across agricultural departments in South Punjab.
            </p>
            {/* Social Links */}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-headline">Contact Us</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>Old Shujabad Road,<br />Multan, Punjab, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+92 61 920 1601</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@mnsuam.edu.pk" className="hover:text-secondary transition-colors">
                  info@mnsuam.edu.pk
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-headline">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors flex items-center gap-2">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#departments" className="hover:text-secondary transition-colors flex items-center gap-2">
                  Departments
                </Link>
              </li>
              <li>
                <Link href="/#statistics" className="hover:text-secondary transition-colors flex items-center gap-2">
                  Statistics
                </Link>
              </li>
              <li>
                <Link href="/data-parser" className="hover:text-secondary transition-colors flex items-center gap-2">
                  Data Parser
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 font-headline">External Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a 
                  href="https://mnsuam.edu.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  MNS-UAM Multan
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://agripunjab.gov.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  Agriculture Punjab
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://hec.gov.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  Higher Education Commission
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://punjab.gov.pk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  Government of Punjab
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} Agriculture Complex, South Punjab Multan. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Use
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
