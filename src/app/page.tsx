import Link from 'next/link';
import Image from 'next/image';
import { departments } from '@/data/departments';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  FlaskConical, 
  Users, 
  Wheat, 
  MapPin, 
  ChevronRight,
  Search,
  BarChart3,
  Microscope,
  TreeDeciduous,
  Tractor
} from 'lucide-react';
import { Input } from '@/components/ui/input';

// Calculate statistics from departments
const stats = {
  totalDepartments: departments.length,
  totalInstitutes: institutes.length,
  departmentsWithData: departments.filter(d => d.equipmentList?.length || d.humanResources?.length || d.facilitiesList?.length).length,
  totalEquipment: departments.reduce((sum, d) => sum + (d.equipmentList?.reduce((s, e) => s + e.quantity, 0) || 0), 0),
  totalMachinery: departments.reduce((sum, d) => sum + (d.farmMachinery?.reduce((s, e) => s + e.quantity, 0) || 0), 0),
  totalStaff: departments.reduce((sum, d) => sum + (d.humanResources?.reduce((s, hr) => s + hr.filled, 0) || 0), 0),
};

export default function Home() {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  
  const featureImage = getImage('agri-8');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section - MNSUAM Style */}
        <section className="relative gradient-agriculture py-16 md:py-24 text-primary-foreground overflow-hidden">
          {/* Decorative wheat pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🌾</div>
            <div className="absolute bottom-10 right-10 text-8xl">🌾</div>
            <div className="absolute top-1/2 left-1/4 text-6xl">🌿</div>
            <div className="absolute top-1/3 right-1/4 text-6xl">🌿</div>
          </div>
          
          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center">
              {/* University Logos */}
              <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Wheat className="h-10 w-10" />
                </div>
                <div className="hidden md:block h-12 w-px bg-white/30" />
                <div className="text-center">
                  <p className="text-sm font-medium tracking-widest uppercase opacity-90">
                    Government of Punjab
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold">
                    Agriculture Department
                  </h2>
                </div>
                <div className="hidden md:block h-12 w-px bg-white/30" />
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <TreeDeciduous className="h-10 w-10" />
                </div>
              </div>
              
              {/* Main Title */}
              <Badge className="mb-4 bg-secondary text-secondary-foreground hover:bg-secondary">
                South Punjab Regional Agriculture Forum
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline mb-4">
                Agriculture Complex
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Multan
              </h2>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto opacity-90">
                A comprehensive digital platform showcasing research facilities, equipment inventory, 
                and resources across agricultural departments and institutes in South Punjab.
              </p>
              
              {/* Search Bar */}
              <div className="mt-8 w-full max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Search departments, equipment, facilities..."
                    className="pl-12 h-14 bg-white/95 text-foreground border-0 shadow-lg text-lg"
                  />
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4 mt-8 justify-center">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="#departments">
                    <Building2 className="mr-2 h-5 w-5" />
                    View Departments
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20">
                  <Link href="/institutes">
                    <Microscope className="mr-2 h-5 w-5" />
                    View Institutes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-background"/>
            </svg>
          </div>
        </section>

        {/* Statistics Section */}
        <section id="statistics" className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Overview
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Resource Statistics
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                A snapshot of the agricultural research ecosystem in South Punjab
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-primary">{stats.totalDepartments}</p>
                  <p className="text-xs text-muted-foreground mt-1">Departments</p>
                </CardContent>
              </Card>
              
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                    <Microscope className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-3xl font-bold text-secondary">{stats.totalInstitutes}</p>
                  <p className="text-xs text-muted-foreground mt-1">Institutes</p>
                </CardContent>
              </Card>
              
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <FlaskConical className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-3xl font-bold text-accent">{stats.totalEquipment}</p>
                  <p className="text-xs text-muted-foreground mt-1">Equipment Items</p>
                </CardContent>
              </Card>
              
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                    <Tractor className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-amber-600">{stats.totalMachinery}</p>
                  <p className="text-xs text-muted-foreground mt-1">Farm Machinery</p>
                </CardContent>
              </Card>
              
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600">{stats.totalStaff}</p>
                  <p className="text-xs text-muted-foreground mt-1">Staff Members</p>
                </CardContent>
              </Card>
              
              <Card className="stat-card card-hover text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{stats.departmentsWithData}</p>
                  <p className="text-xs text-muted-foreground mt-1">With Full Data</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {featureImage && (
                <div className="relative h-80 md:h-[450px] w-full group">
                  <Image
                    src={featureImage.imageUrl}
                    alt="Agriculture Complex Multan"
                    fill
                    className="object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    data-ai-hint="agriculture complex"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <Badge className="mb-2 bg-secondary text-secondary-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      Multan, Punjab
                    </Badge>
                    <h3 className="text-2xl font-bold">MNS University of Agriculture</h3>
                  </div>
                </div>
              )}
              <div className="space-y-6">
                <Badge variant="outline">About Us</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-headline">
                  <span className="text-primary">Agriculture Complex</span>
                  <br />
                  South Punjab
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The Agriculture Complex in South Punjab serves as a central hub for advancing 
                  modern agricultural research and innovation. Located on Old Shujabad Road, Multan, 
                  it fosters collaboration among scientists, farmers, and institutions to enhance 
                  sustainable farming practices across the region.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Modern Labs</p>
                      <p className="text-sm text-muted-foreground">State-of-the-art facilities</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Expert Staff</p>
                      <p className="text-sm text-muted-foreground">Qualified researchers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Wheat className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Field Research</p>
                      <p className="text-sm text-muted-foreground">Hands-on agriculture</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Data Driven</p>
                      <p className="text-sm text-muted-foreground">Analytics & insights</p>
                    </div>
                  </div>
                </div>
                <Button asChild size="lg" className="mt-4">
                  <Link href="#departments">
                    Browse All Departments
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Departments & Institutes Section */}
        <section id="departments" className="py-16 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                Browse Resources
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Departments & Institutes
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Explore the various agricultural departments and research institutes 
                contributing to South Punjab's agricultural advancement
              </p>
            </div>

            <Tabs defaultValue="departments" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="departments" className="text-base">
                  <Building2 className="mr-2 h-4 w-4" />
                  Departments ({departments.length})
                </TabsTrigger>
                <TabsTrigger value="institutes" className="text-base">
                  <Microscope className="mr-2 h-4 w-4" />
                  Institutes ({institutes.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="departments">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {departments.map((dept) => {
                    const image = getImage(dept.imageId);
                    const hasData = dept.equipmentList?.length || dept.humanResources?.length || dept.facilitiesList?.length;
                    return (
                      <Card
                        key={dept.id}
                        className="h-full overflow-hidden card-hover flex flex-col group"
                      >
                        <CardHeader className="p-0">
                          {image && (
                            <div className="relative h-44 w-full overflow-hidden">
                              <Image
                                src={image.imageUrl}
                                alt={dept.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint="research facility"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              {hasData && (
                                <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                                  <FlaskConical className="h-3 w-3 mr-1" />
                                  Data Available
                                </Badge>
                              )}
                              <div className="absolute bottom-3 left-3 right-3">
                                <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">
                                  {dept.name}
                                </h3>
                              </div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col pt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4" />
                            <span className="line-clamp-1">{dept.university}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
                            {dept.description}
                          </p>
                          <Button asChild className="w-full">
                            <Link href={`/departments/${dept.slug}`}>
                              View Details
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="institutes">
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
                            <div className="relative h-44 w-full overflow-hidden">
                              <Image
                                src={image.imageUrl}
                                alt={inst.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint="research institute"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                                <Microscope className="h-3 w-3 mr-1" />
                                Institute
                              </Badge>
                              <div className="absolute bottom-3 left-3 right-3">
                                <h3 className="font-bold text-white text-lg leading-tight line-clamp-2">
                                  {inst.name}
                                </h3>
                              </div>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col pt-4">
                          <Button asChild className="w-full mt-auto" variant="outline">
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
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 gradient-agriculture text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
              Explore Agricultural Resources
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Discover comprehensive data on equipment, facilities, and human resources 
              across agricultural departments and research institutes in South Punjab.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <Link href="#departments">
                  <Building2 className="mr-2 h-5 w-5" />
                  View All Departments
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 hover:bg-white/20">
                <Link href="/institutes">
                  <Microscope className="mr-2 h-5 w-5" />
                  View Institutes
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
