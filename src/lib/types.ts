export type Equipment = {
  name: string;
  quantity: number;
  status: string;
  location?: string;
  metadata?: Record<string, unknown>;
};

export type Facility = {
  name: string;
  capacity?: number;
  type?: string;
  details?: string;
};

export type HumanResource = {
  position: string;
  bps: number;
  sanctioned: number;
  filled: number;
  vacant: number;
};

export type LandResource = {
  label: string;
  value: string;
  acres?: number;
};

export type Department = {
  id: string;
  slug: string;
  name: string;
  university: string;
  imageId: string;
  contact?: {
    focalPerson: string;
    email: string;
    phone?: string;
  };
  description: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  equipmentList?: Equipment[];
  facilitiesList?: Facility[];
  humanResources?: HumanResource[];
  landResources?: LandResource[];
  farmMachinery?: Equipment[];
  // Legacy fields for backward compatibility
  equipment?: string;
  facilities?: string;
};
