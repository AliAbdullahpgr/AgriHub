import Link from 'next/link';
import Image from 'next/image';
import { institutes } from '@/data/institutes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  ChevronRight,
  Building2,
  MapPin,
  FlaskConical
} from 'lucide-react';

export default function InstitutesPage() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative gradient-agriculture text-primary-foreground py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-8xl">🔬</div>
          <div className="absolute bottom-10 left-10 text-8xl">🌱</div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 -ml-4 mb-4">
              <Link href="/">
                <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Link>
            </Button>
            
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              <Microscope className="h-3 w-3 mr-1" />
              Research Institutes
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-4">
              Research Institutes
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Explore the various research institutes in South Punjab dedicated to 
              agricultural innovation and development.
            </p>
            
            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-white/20">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{institutes.length}</p>
                  <p className="text-sm opacity-80">Institutes</p>
                </div>
              </div>
              <div className="h-12 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-white/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Multan</p>
                  <p className="text-sm opacity-80">South Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-background"/>
          </svg>
        </div>
      </section>

      {/* Institutes Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {institutes.map((inst) => {
              const image = getImage(inst.imageId);
              return (
                <Card
                  key={inst.id}
                  className="h-full overflow-hidden card-hover flex flex-col group"
                >
                  <CardHeader className="p-0">
                    {image && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={image.imageUrl}
                          alt={inst.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint="research institute"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                          <Microscope className="h-3 w-3 mr-1" />
                          Institute
                        </Badge>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="font-bold text-white text-lg leading-tight">
                            {inst.name}
                          </h3>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>South Punjab, Multan</span>
                    </div>
                    <Button asChild className="w-full mt-auto">
                      <Link href={`/institutes/${inst.slug}`}>
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center">
          <FlaskConical className="h-12 w-12 mx-auto text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">
            Have Data to Share?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Use our AI-powered data parser to convert your equipment lists and 
            facility documents into structured, searchable data.
          </p>
          <Button asChild size="lg">
            <Link href="/data-parser">
              Open Data Parser
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
