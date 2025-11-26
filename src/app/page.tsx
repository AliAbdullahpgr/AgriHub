import Link from 'next/link';
import Image from 'next/image';
import { departments } from '@/data/departments';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  
  const featureImage = getImage('agri-8');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-primary/10 py-12 text-center">
          <div className="container">
            <div className="flex justify-center items-center gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Image
                  key={i}
                  src={`https://picsum.photos/seed/${100+i}/50/50`}
                  alt={`South Punjab Government Logo ${i}`}
                  width={50}
                  height={50}
                  className="rounded-full"
                  data-ai-hint="government logo"
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-primary tracking-widest uppercase">
              Regional Agriculture Forum
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline mt-2">
              South Punjab
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Digital Asset Management System
            </p>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16">
          <div className="container grid md:grid-cols-2 gap-12 items-center">
            {featureImage && (
              <div className="relative h-80 w-full">
                <Image
                  src={featureImage.imageUrl}
                  alt="Agriculture Complex Multan"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                  data-ai-hint="agriculture complex"
                />
              </div>
            )}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-headline text-primary">
                Agriculture Complex <span className="text-foreground">Multan</span>
              </h2>
              <p className="text-muted-foreground">
                The Agriculture Complex in South Punjab, Multan serves as a
                central hub for advancing modern agricultural research and
                innovation. It fosters collaboration among scientists, farmers,
                and institutions to enhance sustainable farming practices across
                the region.
              </p>
            </div>
          </div>
        </section>

        {/* Research Institutes & Departments Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10 font-headline">
              Departments & Institutes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {departments.map((dept) => {
                const image = getImage(dept.imageId);
                return (
                  <Card
                    key={dept.id}
                    className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
                  >
                    <CardHeader>
                      {image && (
                        <div className="relative h-40 w-full mb-4">
                          <Image
                            src={image.imageUrl}
                            alt={dept.name}
                            fill
                            className="object-cover rounded-t-lg"
                            data-ai-hint="research facility"
                          />
                        </div>
                      )}
                      <CardTitle className="font-headline text-lg leading-tight h-12">
                        {dept.name}
                      </CardTitle>
                      <CardDescription>{dept.university}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                      <Button asChild className="w-full mt-auto">
                        <Link href={`/departments/${dept.slug}`}>Learn More</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

    