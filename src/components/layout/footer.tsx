import { Building, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2 font-headline">
              Agriculture Complex, South Punjab Multan
            </h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Building size={16} /> Old Shujabad Road, Multan, Pakistan
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} /> +92 61 920 1601
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 font-headline">
              Connect With Us
            </h3>
            <p className="text-primary-foreground/80">
              Follow us on social media for updates and news.
            </p>
            {/* Social Icons would go here */}
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Agriculture Complex, South Punjab Multan. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
