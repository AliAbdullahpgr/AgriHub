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

export default function Home() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline">
          Welcome to AgriData Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the facilities, equipment, and resources of agricultural
          university departments. A centralized platform for transparent data
          representation.
        </p>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">
          University Departments
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const image = getImage(dept.imageId);
            return (
              <Link href={`/departments/${dept.slug}`} key={dept.id}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    {image && (
                      <div className="relative h-48 w-full mb-4">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover rounded-t-lg"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                    <CardTitle className="font-headline">{dept.name}</CardTitle>
                    <CardDescription>{dept.university}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {dept.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
