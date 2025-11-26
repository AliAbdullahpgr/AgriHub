'use client';

import { notFound, useParams } from 'next/navigation';
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
  LandPlot,
  Phone,
  Tractor
} from 'lucide-react';
import { useMemo } from 'react';

// MNSUAM theme colors for charts
const CHART_COLORS = [
  'hsl(142, 45%, 35%)',  // Primary green
  'hsl(45, 85%, 55%)',   // Gold/wheat
  'hsl(25, 80%, 50%)',   // Orange
  'hsl(180, 40%, 40%)',  // Teal
  'hsl(90, 40%, 45%)',   // Light green
  'hsl(0, 70%, 50%)',    // Red for vacant/needs repair
];

const getStatusColor = (status?: string) => {
  const s = status?.toLowerCase();
  if (s === 'functional') return 'bg-green-600';
  if (s === 'needs repair') return 'bg-amber-500';
  if (s === 'required') return 'bg-blue-500';
  if (s === 'not repairable') return 'bg-red-500';
  return 'bg-gray-500';
};

const getStatusIcon = (status?: string) => {
  const s = status?.toLowerCase();
  if (s === 'functional') return <CheckCircle2 className="h-3 w-3 mr-1" />;
  if (s === 'needs repair') return <Wrench className="h-3 w-3 mr-1" />;
  return <AlertCircle className="h-3 w-3 mr-1" />;
};

export default function DepartmentPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const department = useMemo(() => departments.find((d) => d.slug === slug), [slug]);

  if (!department) {
    notFound();
  }

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find((img) => img.id === imageId);
  };
  
  const departmentImage = getImage(department.imageId);

  // Get structured data
  const equipmentList = department.equipmentList || [];
  const facilitiesList = department.facilitiesList || [];
  const humanResources = department.humanResources || [];
  const landResources = department.landResources || [];
  const farmMachinery = department.farmMachinery || [];

  // Check if department has data
  const hasData = equipmentList.length > 0 || facilitiesList.length > 0 || humanResources.length > 0 || landResources.length > 0 || farmMachinery.length > 0;

  // Equipment status distribution for pie chart
  const equipmentStatusData = equipmentList.reduce((acc, item) => {
    const status = item.status || 'Unknown';
    const existing = acc.find(d => d.name === status);
    if (existing) {
      existing.value += item.quantity;
    } else {
      acc.push({ name: status, value: item.quantity });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Equipment by location for bar chart
  const equipmentByLocation = equipmentList.reduce((acc, item) => {
    const location = item.location || 'General';
    const existing = acc.find(d => d.name === location);
    if (existing) {
      existing.count += item.quantity;
    } else {
      acc.push({ name: location, count: item.quantity });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  // Human resources chart data
  const humanResourcesChartData = humanResources.map(resource => ({
    name: resource.position.length > 20 ? resource.position.substring(0, 20) + '...' : resource.position,
    fullName: resource.position,
    'Filled': resource.filled,
    'Vacant': resource.vacant,
  })).filter(d => d['Filled'] > 0 || d.Vacant > 0);

  // Calculate totals
  const totalEquipment = equipmentList.reduce((sum, item) => sum + item.quantity, 0);
  const totalMachinery = farmMachinery.reduce((sum, item) => sum + item.quantity, 0);
  const totalSanctioned = humanResources.reduce((sum, item) => sum + item.sanctioned, 0);
  const totalStaff = humanResources.reduce((sum, item) => sum + item.filled, 0);
  const totalVacant = humanResources.reduce((sum, item) => sum + item.vacant, 0);
  const functionalEquipment = equipmentList.filter(e => e.status?.toLowerCase() === 'functional').reduce((sum, item) => sum + item.quantity, 0);
  const functionalPercentage = totalEquipment > 0 ? Math.round((functionalEquipment / totalEquipment) * 100) : 0;
  const functionalMachinery = farmMachinery.filter(e => e.status?.toLowerCase() === 'functional').reduce((sum, item) => sum + item.quantity, 0);

  // Determine active tabs
  const showEquipmentTab = equipmentList.length > 0 || farmMachinery.length > 0;
  const showFacilitiesTab = facilitiesList.length > 0 || landResources.length > 0;
  const showStaffTab = humanResources.length > 0;
  const showAnalyticsTab = hasData;

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
              {department.address && (
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <MapPin className="h-4 w-4" />
                  <span>{department.address}</span>
                </div>
              )}
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
                      <div className="space-y-1">
                        <p className="font-semibold">{department.contact.focalPerson}</p>
                        <a
                          href={`mailto:${department.contact.email}`}
                          className="text-secondary hover:underline flex items-center gap-1 text-sm"
                        >
                          <Mail className="h-4 w-4" />
                          {department.contact.email}
                        </a>
                        {department.contact.phone && (
                          <p className="flex items-center gap-1 text-sm text-primary-foreground/80">
                            <Phone className="h-4 w-4" />
                            {department.contact.phone}
                          </p>
                        )}
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
            {totalEquipment > 0 && (
              <Card className="stat-card">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FlaskConical className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">{totalEquipment}</p>
                      <p className="text-xs text-muted-foreground">Equipment Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {totalEquipment > 0 && (
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
            )}
            
            {totalStaff > 0 && (
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
            )}
            
            {facilitiesList.length > 0 && (
              <Card className="stat-card">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Building className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent">{facilitiesList.length}</p>
                      <p className="text-xs text-muted-foreground">Facilities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {landResources.length > 0 && (
              <Card className="stat-card">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-600/10">
                      <LandPlot className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {landResources.find(l => l.label === 'Total Area')?.value || `${landResources[0]?.acres || 0} acres`}
                      </p>
                      <p className="text-xs text-muted-foreground">Land Area</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {totalMachinery > 0 && (
              <Card className="stat-card">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Tractor className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">{totalMachinery}</p>
                      <p className="text-xs text-muted-foreground">Farm Machinery</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {hasData ? (
          <Tabs defaultValue={showEquipmentTab ? "equipment" : showFacilitiesTab ? "facilities" : "staff"} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              {showEquipmentTab && (
                <TabsTrigger value="equipment" className="text-sm">
                  <FlaskConical className="mr-2 h-4 w-4 hidden sm:inline" />
                  Equipment
                </TabsTrigger>
              )}
              {showFacilitiesTab && (
                <TabsTrigger value="facilities" className="text-sm">
                  <Building className="mr-2 h-4 w-4 hidden sm:inline" />
                  Facilities
                </TabsTrigger>
              )}
              {showStaffTab && (
                <TabsTrigger value="staff" className="text-sm">
                  <Users className="mr-2 h-4 w-4 hidden sm:inline" />
                  Staff
                </TabsTrigger>
              )}
              {showAnalyticsTab && (
                <TabsTrigger value="analytics" className="text-sm">
                  <LayoutGrid className="mr-2 h-4 w-4 hidden sm:inline" />
                  Analytics
                </TabsTrigger>
              )}
            </TabsList>
            
            {/* Equipment Tab */}
            {showEquipmentTab && (
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
                      {equipmentList.length > 0 ? (
                        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[40%]">Equipment Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-center">Qty</TableHead>
                                <TableHead>Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {equipmentList.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                      <Wrench className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                      {item.name}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-muted-foreground text-sm">
                                    {item.location || '-'}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline">{item.quantity}</Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge className={getStatusColor(item.status)}>
                                      {getStatusIcon(item.status)}
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

                {/* Farm Machinery Section */}
                {farmMachinery.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tractor className="h-5 w-5 text-amber-600" />
                        Farm Machinery
                      </CardTitle>
                      <CardDescription>
                        Agricultural machinery and implements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50%]">Machinery Name</TableHead>
                              <TableHead className="text-center">Quantity</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {farmMachinery.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <Tractor className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    {item.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">{item.quantity}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(item.status)}>
                                    {getStatusIcon(item.status)}
                                    {item.status || 'Unknown'}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Machinery Stats */}
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 text-center">
                          <p className="text-3xl font-bold text-green-600">{functionalMachinery}</p>
                          <p className="text-sm text-green-600/80">Functional</p>
                        </div>
                        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950 text-center">
                          <p className="text-3xl font-bold text-amber-600">{totalMachinery - functionalMachinery}</p>
                          <p className="text-sm text-amber-600/80">Needs Attention</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
            
            {/* Facilities Tab */}
            {showFacilitiesTab && (
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
                        
                        {/* Land visualization */}
                        {landResources.some(r => r.acres) && (
                          <div className="mt-6">
                            <ResponsiveContainer width="100%" height={200}>
                              <PieChart>
                                <Pie
                                  data={landResources.filter(r => r.acres).map(r => ({ name: r.label, value: r.acres }))}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={70}
                                  dataKey="value"
                                  label={({ name, value }) => `${name}: ${value} acres`}
                                >
                                  {landResources.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        )}
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
                        Buildings, meeting rooms, laboratories, and amenities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {facilitiesList.length > 0 ? (
                        <div className="grid gap-3 max-h-[400px] overflow-y-auto">
                          {facilitiesList.map((facility, index) => (
                            <div 
                              key={index} 
                              className="flex justify-between items-center p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                  <Building className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <span className="font-medium">{facility.name}</span>
                                  {facility.type && (
                                    <p className="text-xs text-muted-foreground">{facility.type}</p>
                                  )}
                                  {facility.details && (
                                    <p className="text-xs text-muted-foreground">{facility.details}</p>
                                  )}
                                </div>
                              </div>
                              {facility.capacity && (
                                <Badge className="bg-secondary text-secondary-foreground">
                                  <Users className="h-3 w-3 mr-1" />
                                  {facility.capacity} {typeof facility.capacity === 'number' && facility.capacity > 1 ? 'persons' : 'unit'}
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
            )}
            
            {/* Staff Tab */}
            {showStaffTab && (
              <TabsContent value="staff" className="space-y-6">
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
                      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Position</TableHead>
                              <TableHead className="text-center">BPS</TableHead>
                              <TableHead className="text-center">Sanctioned</TableHead>
                              <TableHead className="text-center">Filled</TableHead>
                              <TableHead className="text-center">Vacant</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {humanResources.map((resource, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{resource.position}</TableCell>
                                <TableCell className="text-center">
                                  <Badge variant="outline">BPS-{resource.bps}</Badge>
                                </TableCell>
                                <TableCell className="text-center">{resource.sanctioned}</TableCell>
                                <TableCell className="text-center">
                                  <Badge className="bg-green-600">{resource.filled}</Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  {resource.vacant > 0 ? (
                                    <Badge variant="destructive">{resource.vacant}</Badge>
                                  ) : (
                                    <span className="text-muted-foreground">0</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                      
                      {/* Totals */}
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 text-center">
                          <p className="text-2xl font-bold text-blue-600">{totalSanctioned}</p>
                          <p className="text-xs text-blue-600/80">Sanctioned</p>
                        </div>
                        <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 text-center">
                          <p className="text-2xl font-bold text-green-600">{totalStaff}</p>
                          <p className="text-xs text-green-600/80">Filled</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950 text-center">
                          <p className="text-2xl font-bold text-red-600">{totalVacant}</p>
                          <p className="text-xs text-red-600/80">Vacant</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Staff Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Staff Distribution</CardTitle>
                      <CardDescription>
                        Filled vs Vacant positions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {humanResourcesChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart 
                            data={humanResourcesChartData.slice(0, 10)} 
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" allowDecimals={false} />
                            <YAxis 
                              type="category" 
                              dataKey="name" 
                              width={120}
                              tick={{ fontSize: 11 }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--background))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                              formatter={(value, name) => [value, name]}
                              labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                            />
                            <Legend />
                            <Bar dataKey="Filled" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
                            <Bar dataKey="Vacant" fill={CHART_COLORS[5]} radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <p className="text-muted-foreground text-center py-8">No chart data available.</p>
                      )}
                      
                      {/* Position Fill Rate */}
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Position Fill Rate</span>
                          <span className="font-semibold">{totalSanctioned > 0 ? Math.round((totalStaff / totalSanctioned) * 100) : 0}%</span>
                        </div>
                        <Progress value={totalSanctioned > 0 ? (totalStaff / totalSanctioned) * 100 : 0} className="h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            )}
            
            {/* Analytics Tab */}
            {showAnalyticsTab && (
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Equipment Status Overview */}
                  {totalEquipment > 0 && (
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
                  )}

                  {/* Department Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Department Summary</CardTitle>
                      <CardDescription>Key metrics at a glance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {totalEquipment > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <FlaskConical className="h-5 w-5 text-primary" />
                              <span>Total Equipment Items</span>
                            </div>
                            <Badge variant="secondary" className="text-lg">{totalEquipment}</Badge>
                          </div>
                        )}
                        
                        {totalMachinery > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Tractor className="h-5 w-5 text-amber-600" />
                              <span>Farm Machinery</span>
                            </div>
                            <Badge variant="secondary" className="text-lg">{totalMachinery}</Badge>
                          </div>
                        )}
                        
                        {totalStaff > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Users className="h-5 w-5 text-secondary" />
                              <span>Staff (Filled / Sanctioned)</span>
                            </div>
                            <Badge variant="secondary" className="text-lg">{totalStaff} / {totalSanctioned}</Badge>
                          </div>
                        )}
                        
                        {facilitiesList.length > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <Building className="h-5 w-5 text-accent" />
                              <span>Available Facilities</span>
                            </div>
                            <Badge variant="secondary" className="text-lg">{facilitiesList.length}</Badge>
                          </div>
                        )}
                        
                        {landResources.length > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                              <TreeDeciduous className="h-5 w-5 text-green-600" />
                              <span>Land Area</span>
                            </div>
                            <Badge variant="secondary" className="text-lg">
                              {landResources.find(l => l.label === 'Total Area')?.value || `${landResources[0]?.acres || 0} acres`}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Equipment by Location Chart */}
                  {equipmentByLocation.length > 1 && (
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Equipment by Location</CardTitle>
                        <CardDescription>Distribution across different labs/sections</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={equipmentByLocation}>
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
            )}
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
                <Link href="/">
                  Browse Other Departments
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
