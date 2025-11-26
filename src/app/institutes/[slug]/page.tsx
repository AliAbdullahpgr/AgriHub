import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { institutes } from '@/data/institutes';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  ChevronLeft,
  MapPin,
  FlaskConical,
  Building,
  Users,
  Calendar
} from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function InstitutePage({ params }: Props) {
  const { slug } = await params;
  const institute = institutes.find((i) => i.slug === slug);

  if (!institute) {
    notFound();
  }

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  const instituteImage = getImage(institute.imageId);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative gradient-agriculture text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 -ml-4">
              <Link href="/institutes">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Institutes
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Institute Info */}
            <div className="md:col-span-2 space-y-4">
              <Badge className="bg-secondary text-secondary-foreground">
                <Microscope className="h-3 w-3 mr-1" />
                Research Institute
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">
                {institute.name}
              </h1>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">South Punjab, Multan</span>
              </div>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">
                A leading research institute dedicated to advancing agricultural science and 
                supporting farmers across the South Punjab region.
              </p>
            </div>
            
            {/* Institute Image */}
            {instituteImage && (
              <div className="hidden md:block">
                <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={instituteImage.imageUrl}
                    alt={institute.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" className="fill-background"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              Institute Information
            </CardTitle>
            <CardDescription>
              Details about this research institute
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-muted/50 text-center">
              <Microscope className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Data Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                Detailed equipment and facility information for this institute 
                has not been added yet. You can help by using our data parser 
                to add information.
              </p>
              <Button asChild>
                <Link href="/data-parser">
                  Use Data Parser
                </Link>
              </Button>
            </div>

            {/* Quick Info Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card text-center">
                <Building className="h-8 w-8 mx-auto text-primary mb-2" />
                <p className="font-semibold">Location</p>
                <p className="text-sm text-muted-foreground">Multan, Punjab</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <Users className="h-8 w-8 mx-auto text-secondary mb-2" />
                <p className="font-semibold">Status</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-center">
                <Calendar className="h-8 w-8 mx-auto text-accent mb-2" />
                <p className="font-semibold">Affiliated</p>
                <p className="text-sm text-muted-foreground">Agri. Complex</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Generate static params for all institutes
export async function generateStaticParams() {
  return institutes.map((institute) => ({
    slug: institute.slug,
  }));
}
