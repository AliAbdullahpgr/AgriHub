'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { departments } from '@/data/departments';
import { parseEquipmentDetails } from '@/ai/flows/parse-equipment-details';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Equipment } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  Mail, 
  User, 
  Building, 
  Users, 
  FlaskConical, 
  ChevronLeft,
  MapPin,
  Boxes,
  LayoutGrid,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
  Wrench,
  TreeDeciduous,
  LandPlot
} from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

type Facility = {
  name: string;
  capacity?: number;
  type?: string;
};

type HumanResource = {
  name: string;
  bps: string;
  sanctioned: string;
  inPosition: string;
  vacant: string;
  total: string;
};

type LandResource = {
  label: string;
  value: string;
};

// MNSUAM theme colors for charts
const CHART_COLORS = [
  'hsl(142, 45%, 35%)',  // Primary green
  'hsl(45, 85%, 55%)',   // Gold/wheat
  'hsl(25, 80%, 50%)',   // Orange
  'hsl(180, 40%, 40%)',  // Teal
  'hsl(90, 40%, 45%)',   // Light green
  'hsl(0, 70%, 50%)',    // Red for vacant
];

// Function to parse facilities from text
const parseFacilities = (text: string): Facility[] => {
  const facilities: Facility[] = [];
  const lines = text.split('\n').filter((line) => line.trim() !== '' && !line.toLowerCase().includes('human resources'));

  lines.forEach((line) => {
    const match = line.match(
      /(?:\d+-\s*)?(.*?)\s*\(Capacity\s*(\d+)\s*persons?\)/i
    );
    if (match) {
      facilities.push({
        name: match[1].trim(),
        capacity: parseInt(match[2], 10),
        type: 'Meeting/Training'
      });
    } else if (!line.toLowerCase().includes('following facilities')) {
        const labMatch = line.match(/^\d+-\s*(.*?)\s*$/);
        if(labMatch) {
            facilities.push({ name: labMatch[1].trim(), type: 'Lab' });
        } else if (!line.match(/^\s*$/) && !line.match(/block/i) && !line.match(/S\.T\.I\./i) && !line.match(/Genome/i) && !line.includes('Total area') && !line.includes('Cultivated area') && !line.includes('Non-cultivated area') && !line.includes('Building details') && !line.includes('Administrative office')) {
            const name = line.replace(/^\d+[\.\-]?\s*/, '').trim();
            if (name) facilities.push({ name, type: 'General' });
        }
    }
  });

  return facilities;
};

const parseHumanResources = (text: string): HumanResource[] => {
  const resources: HumanResource[] = [];
  const lines = text.split('\n');
  let startParsing = false;
  
  for (const line of lines) {
    if (line.includes('Human Resources')) {
      startParsing = true;
      continue;
    }
    if (!startParsing || !line.trim() || line.includes('Sr. #')) continue;
    if (line.includes('Total Staff')) break;

    // Better parsing for human resources
    const hrMatch = line.match(/-\s*(.*?)\s*\(BPS\s*(\d+)\)\s*:\s*(\d+)/i);
    if (hrMatch) {
      resources.push({
        name: hrMatch[1].trim(),
        bps: hrMatch[2],
        sanctioned: hrMatch[3],
        inPosition: hrMatch[3],
        vacant: '0',
        total: hrMatch[3],
      });
      continue;
    }

    const parts = line.split(/\s{2,}|(?<=\d)\s+(?=[A-Z])|(?<=[A-Za-z])\s+(?=\d)|(?<=\S)\s+(?=\-)/).filter(p => p.trim() && p.trim() !== '-');
    const cleanedParts = parts.map(p => p.replace(/^\d+[\s\t]*/, '').trim()).filter(Boolean);

    if(cleanedParts.length >= 5) {
      resources.push({
        name: cleanedParts[0],
        bps: cleanedParts[1],
        sanctioned: cleanedParts[2],
        inPosition: cleanedParts[3],
        vacant: cleanedParts.length > 4 ? cleanedParts[4] : '-',
        total: cleanedParts[cleanedParts.length - 1],
      });
    }
  }

  return resources;
};

const parseLandResources = (text: string): LandResource[] => {
  const resources: LandResource[] = [];
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.includes('Total area:')) {
      resources.push({ label: 'Total Area', value: line.split(':')[1]?.trim() || '' });
    } else if (line.includes('Cultivated area:')) {
      resources.push({ label: 'Cultivated Area', value: line.split(':')[1]?.trim() || '' });
    } else if (line.includes('Non-cultivated area')) {
      resources.push({ label: 'Non-cultivated Area', value: line.split(':')[1]?.trim() || '' });
    } else if (line.includes('Administrative office:')) {
      resources.push({ label: 'Administrative Office', value: line.split(':')[1]?.trim() || '' });
    }
  }
  
  return resources;
};


export default function DepartmentPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const department = useMemo(() => departments.find((d) => d.slug === slug), [slug]);

  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (department?.equipment) {
      setIsLoading(true);
      parseEquipmentDetails({ text: department.equipment })
        .then(parsedEquipment => {
          setEquipment(parsedEquipment);
        })
        .catch(error => {
          console.error('Failed to parse equipment details:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    } else {
        setIsLoading(false);
    }
  }, [department]);

  if (!isLoading && !department) {
    notFound();
  }
  
  const facilities = department?.facilities ? parseFacilities(department.facilities) : [];
  const humanResources = department?.facilities ? parseHumanResources(department.facilities) : [];
  const landResources = department?.facilities ? parseLandResources(department.facilities) : [];

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  
  const departmentImage = department ? getImage(department.imageId) : null;

  // Equipment status distribution for pie chart
  const equipmentStatusData = equipment.reduce((acc, item) => {
    const status = item.status || 'Unknown';
    const existing = acc.find(d => d.name === status);
    if (existing) {
      existing.value += item.quantity;
    } else {
      acc.push({ name: status, value: item.quantity });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Equipment by lab/category for bar chart
  const equipmentByCategory = equipment.reduce((acc, item) => {
    const category = item.location || 'General';
    const existing = acc.find(d => d.name === category);
    if (existing) {
      existing.count += item.quantity;
    } else {
      acc.push({ name: category, count: item.quantity });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  const humanResourcesChartData = humanResources.map(resource => ({
    name: resource.name.length > 15 ? resource.name.substring(0, 15) + '...' : resource.name,
    fullName: resource.name,
    'In Position': parseInt(resource.inPosition, 10) || 0,
    Vacant: parseInt(resource.vacant, 10) || 0,
  })).filter(d => d['In Position'] > 0 || d.Vacant > 0);

  // Calculate totals
  const totalEquipment = equipment.reduce((sum, item) => sum + item.quantity, 0);
  const totalStaff = humanResources.reduce((sum, item) => sum + (parseInt(item.total, 10) || 0), 0);
  const functionalEquipment = equipment.filter(e => e.status?.toLowerCase() === 'functional').reduce((sum, item) => sum + item.quantity, 0);
  const functionalPercentage = totalEquipment > 0 ? Math.round((functionalEquipment / totalEquipment) * 100) : 0;


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!department) {
    return null;
  }

  const hasData = department.equipment || department.facilities;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative gradient-agriculture text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 -ml-4">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Departments
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Department Info */}
            <div className="md:col-span-2 space-y-4">
              <Badge className="bg-secondary text-secondary-foreground">
                <Building className="h-3 w-3 mr-1" />
                Department
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline">
                {department.name}
              </h1>
              <div className="flex items-center gap-2 text-primary-foreground/90">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{department.university}</span>
              </div>
              <p className="text-primary-foreground/80 text-lg max-w-2xl">
                {department.description}
              </p>
              
              {/* Contact Card */}
              {department.contact && (
                <Card className="bg-white/10 border-white/20 text-primary-foreground max-w-md">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-secondary/20 rounded-full p-3">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">{department.contact.focalPerson}</p>
                        <a
                          href={`mailto:${department.contact.email}`}
                          className="text-secondary hover:underline flex items-center gap-1"
                        >
                          <Mail className="h-4 w-4" />
                          {department.contact.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Department Image */}
            {departmentImage && (
              <div className="hidden md:block">
                <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-2xl">
                  <Image
                    src={departmentImage.imageUrl}
                    alt={department.name}
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

      {/* Quick Stats */}
      {hasData && (
        <div className="container mx-auto px-4 -mt-4 relative z-10 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="stat-card">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FlaskConical className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{totalEquipment}</p>
                    <p className="text-xs text-muted-foreground">Total Equipment</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{functionalPercentage}%</p>
                    <p className="text-xs text-muted-foreground">Functional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-secondary">{totalStaff}</p>
                    <p className="text-xs text-muted-foreground">Staff Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="stat-card">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Building className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{facilities.length}</p>
                    <p className="text-xs text-muted-foreground">Facilities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {hasData ? (
          <Tabs defaultValue="equipment" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="equipment" className="text-sm">
                <FlaskConical className="mr-2 h-4 w-4 hidden sm:inline" />
                Equipment
              </TabsTrigger>
              <TabsTrigger value="facilities" className="text-sm">
                <Building className="mr-2 h-4 w-4 hidden sm:inline" />
                Facilities
              </TabsTrigger>
              <TabsTrigger value="staff" className="text-sm">
                <Users className="mr-2 h-4 w-4 hidden sm:inline" />
                Staff
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm">
                <LayoutGrid className="mr-2 h-4 w-4 hidden sm:inline" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Equipment Table */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-primary" />
                      Equipment Inventory
                    </CardTitle>
                    <CardDescription>
                      Complete list of laboratory and field equipment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {equipment.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50%]">Equipment Name</TableHead>
                              <TableHead className="text-center">Qty</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {equipment.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <Wrench className="h-4 w-4 text-muted-foreground" />
                                    {item.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">{item.quantity}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge 
                                    variant={item.status?.toLowerCase() === 'functional' ? 'default' : 'secondary'}
                                    className={item.status?.toLowerCase() === 'functional' ? 'bg-green-600' : ''}
                                  >
                                    {item.status?.toLowerCase() === 'functional' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                    {item.status?.toLowerCase() !== 'functional' && <AlertCircle className="h-3 w-3 mr-1" />}
                                    {item.status || 'Unknown'}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No equipment data available.</p>
                    )}
                  </CardContent>
                </Card>

                {/* Equipment Status Pie Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Boxes className="h-5 w-5 text-primary" />
                      Status Distribution
                    </CardTitle>
                    <CardDescription>
                      Equipment by operational status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {equipmentStatusData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={equipmentStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {equipmentStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No data available.</p>
                    )}
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 justify-center mt-4">
                      {equipmentStatusData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                          />
                          <span className="text-sm text-muted-foreground">{entry.name}: {entry.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Facilities Tab */}
            <TabsContent value="facilities" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Land Resources */}
                {landResources.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LandPlot className="h-5 w-5 text-primary" />
                        Land Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {landResources.map((resource, index) => (
                          <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                            <span className="text-muted-foreground">{resource.label}</span>
                            <Badge variant="secondary" className="font-semibold">{resource.value}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Facilities List */}
                <Card className={landResources.length === 0 ? 'md:col-span-2' : ''}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Available Facilities
                    </CardTitle>
                    <CardDescription>
                      Meeting rooms, training halls, and laboratories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {facilities.length > 0 ? (
                      <div className="grid gap-3">
                        {facilities.map((facility, index) => (
                          <div 
                            key={index} 
                            className="flex justify-between items-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Building className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{facility.name}</span>
                            </div>
                            {facility.capacity && (
                              <Badge className="bg-secondary text-secondary-foreground">
                                <Users className="h-3 w-3 mr-1" />
                                {facility.capacity} persons
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">No facilities data available.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Staff Tab */}
            <TabsContent value="staff" className="space-y-6">
              {humanResources.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Staff Table */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Human Resources
                      </CardTitle>
                      <CardDescription>
                        Staff positions and allocation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Position</TableHead>
                              <TableHead className="text-center">BPS</TableHead>
                              <TableHead className="text-center">Count</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {humanResources.map((resource, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{resource.name}</TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">BPS-{resource.bps}</Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge className="bg-primary">{resource.total}</Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Total Staff */}
                      <div className="mt-4 p-4 rounded-lg bg-primary/10 flex justify-between items-center">
                        <span className="font-semibold text-primary">Total Staff</span>
                        <Badge className="bg-primary text-lg px-4 py-1">{totalStaff}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Staff Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Staff Distribution</CardTitle>
                      <CardDescription>
                        Visual breakdown of positions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart 
                          data={humanResourcesChartData} 
                          layout="vertical"
                          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" allowDecimals={false} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={100}
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                            formatter={(value, name, props) => [value, name]}
                            labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                          />
                          <Legend />
                          <Bar dataKey="In Position" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                          {humanResourcesChartData.some(d => d.Vacant > 0) && (
                            <Bar dataKey="Vacant" fill={CHART_COLORS[5]} radius={[0, 4, 4, 0]} />
                          )}
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12">
                    <p className="text-muted-foreground text-center">No human resources data available.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Equipment Status Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Overview</CardTitle>
                    <CardDescription>Summary statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Functional Equipment</span>
                        <span className="font-semibold">{functionalPercentage}%</span>
                      </div>
                      <Progress value={functionalPercentage} className="h-3" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 text-center">
                        <p className="text-3xl font-bold text-green-600">{functionalEquipment}</p>
                        <p className="text-sm text-green-600/80">Functional</p>
                      </div>
                      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 text-center">
                        <p className="text-3xl font-bold text-amber-600">{totalEquipment - functionalEquipment}</p>
                        <p className="text-sm text-amber-600/80">Other Status</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Department Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Department Summary</CardTitle>
                    <CardDescription>Key metrics at a glance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <FlaskConical className="h-5 w-5 text-primary" />
                          <span>Total Equipment Items</span>
                        </div>
                        <Badge variant="secondary" className="text-lg">{totalEquipment}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Users className="h-5 w-5 text-secondary" />
                          <span>Total Staff</span>
                        </div>
                        <Badge variant="secondary" className="text-lg">{totalStaff}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Building className="h-5 w-5 text-accent" />
                          <span>Available Facilities</span>
                        </div>
                        <Badge variant="secondary" className="text-lg">{facilities.length}</Badge>
                      </div>
                      
                      {landResources.length > 0 && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <TreeDeciduous className="h-5 w-5 text-green-600" />
                            <span>Land Area</span>
                          </div>
                          <Badge variant="secondary" className="text-lg">
                            {landResources.find(l => l.label === 'Total Area')?.value || 'N/A'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Equipment by Category Chart */}
                {equipmentByCategory.length > 0 && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Equipment by Category</CardTitle>
                      <CardDescription>Distribution across different labs/sections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={equipmentByCategory}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12 }}
                            angle={-20}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis allowDecimals={false} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} name="Equipment Count" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-16 text-center">
              <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Detailed Data Available</h3>
              <p className="text-muted-foreground mb-6">
                Detailed equipment and facility information for this department has not been added yet.
              </p>
              <Button asChild>
                <Link href="/data-parser">
                  Use Data Parser to Add Information
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
