export type Department = {
  id: string;
  slug: string;
  name: string;
  university: string;
  imageId: string;
  contact?: {
    focalPerson: string;
    email: string;
  };
  description: string;
  equipment?: string;
  facilities?: string;
};

export type Equipment = {
  name: string;
  quantity: number;
  status: string;
  metadata?: Record<string, any>;
};
