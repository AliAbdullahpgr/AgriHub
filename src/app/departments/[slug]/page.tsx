import { notFound } from 'next/navigation';
import { departments } from '@/data/departments';
import { parseEquipmentDetails } from '@/ai/flows/parse-equipment-details';
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Mail, User, Building, Users } from 'lucide-react';

type Facility = {
  name: string;
  capacity?: number;
};

// Generate static paths for all departments at build time
export function generateStaticParams() {
  return departments.map((dept) => ({
    slug: dept.slug,
  }));
}

// Function to parse facilities from text
const parseFacilities = (text: string): Facility[] => {
  const facilities: Facility[] = [];
  const lines = text.split('\n').filter((line) => line.trim() !== '');

  lines.forEach((line) => {
    const match = line.match(
      /(?:\d+-\s*)?(.*?)\s*\(Capacity\s*(\d+)\s*persons\)/i
    );
    if (match) {
      facilities.push({
        name: match[1].trim(),
        capacity: parseInt(match[2], 10),
      });
    } else if (!line.toLowerCase().includes('following facilities')) {
        // Simple case for labs without capacity
        const labMatch = line.match(/^\d+-\s*(.*?)\s*$/);
        if(labMatch) {
            facilities.push({ name: labMatch[1].trim()});
        } else if (!line.match(/^\s*$/) && !line.match(/block/i) && !line.match(/S\.T\.I\./i) && !line.match(/Genome/i)) {
            const name = line.replace(/^\d+[\.\-]?\s*/, '').trim();
            if (name) facilities.push({ name });
        }
    }
  });

  return facilities;
};


export default async function DepartmentPage({
  params,
}: {
  params: { slug: string };
}) {
  const department = departments.find((d) => d.slug === params.slug);

  if (!department) {
    notFound();
  }

  let equipment: Equipment[] = [];
  if (department.equipment) {
    try {
      equipment = await parseEquipmentDetails({ text: department.equipment });
    } catch (error) {
      console.error('Failed to parse equipment details:', error);
      // Handle error gracefully, maybe show a message to the user
    }
  }
  
  const facilities = department.facilities ? parseFacilities(department.facilities) : [];

  const equipmentStatusData = equipment.reduce((acc, item) => {
    const status = item.status || 'Unknown';
    const existing = acc.find(d => d.name === status);
    if (existing) {
      existing.count += item.quantity;
    } else {
      acc.push({ name: status, count: item.quantity });
    }
    return acc;
  }, [] as { name: string; count: number }[]);


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary font-headline">
          {department.name}
        </h1>
        <p className="text-xl text-muted-foreground">{department.university}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {department.contact && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="text-primary" /> Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <span>{department.contact.focalPerson}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a
                    href={`mailto:${department.contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {department.contact.email}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {equipment.length > 0 && (
            <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Lab Equipment Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Equipment Name</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {equipment.map((item, index) => (
                            <TableRow key={index}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )}
        
        {equipmentStatusData.length > 0 && (
            <Card className="md:col-span-2 lg:col-span-2">
                <CardHeader>
                    <CardTitle>Equipment Status Overview</CardTitle>
                    <CardDescription>Distribution of equipment by functional status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={equipmentStatusData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}/>
                        <Legend />
                        <Bar dataKey="count" fill="hsl(var(--primary))" name="Quantity" />
                    </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        )}
        
        {facilities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="text-primary" /> Available Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {facilities.map((facility, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {facility.name}
                    </span>
                    {facility.capacity && (
                      <span className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
                        <Users className="h-4 w-4" />
                        {facility.capacity}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {!department.contact && !department.equipment && !department.facilities && (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">No detailed information available for this department yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
