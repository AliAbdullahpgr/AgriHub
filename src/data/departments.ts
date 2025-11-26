import type { Department } from '@/lib/types';

export const departments: Department[] = [
  {
    id: '1',
    slug: 'food-science-and-technology',
    name: 'Food Science and Technology',
    university: 'MNS University of Agriculture, Multan',
    imageId: 'agri-1',
    description: 'Focuses on the science of food, from production to consumption, including value addition, food analysis, and processing technologies.',
    contact: {
      focalPerson: 'Dr. Shabbir Ahmad',
      email: 'Shabbir.ahmad@mnsuam.edu.pk',
    },
    equipment: `
      Value Addition and Food Analysis Lab (Room # 127, Academic Block)
      Quantity: 1 and Functional.
      1. Kjeldhal Apparatus (Digestion unit and Distillation unit)
      2. Water Activity meter
      3. Soxhlet Apparatus
      4. Analytical Weighing Balance
      5. Autoclave
      6. Texture Analyzer
      7. Freeze Dryer
      8. Pulse Electric Field
      9. Ozonation chamber
      10. Pasteurizer
      11. Fermenter

      Nutrient Analytical & Food Processing Lab (Room # 114-115, Postgraduate Block)
      1. Kjeldhal Apparatus (Digestion unit and Distillation unit)
      2. Moisture Analyzer
      3. Soxhlet Apparatus
      4. Analytical Weighing Balance
      5. Muffle Furnace
      6. Viscometer
      7. Farinograph
      8. Fume Hood
      9. Desiccator
      10. Gerber machine
      11. Rose head machine
      12. Abrasive peeler
      13. Refrigerator
      14. China Chakki
      15. Grinder
      16. Cheese press
      17. Cheese vat
      18. Cream separator
    `,
    facilities: `
      Following facilities available in MNSUAM can be utilized for South Punjab Regional Agriculture Forum.
      Admin block
      1- Syndicate Hall for meeting (Capacity 50 persons)
      2- Committee Room for meeting (Capacity 20 persons)
      Academic block
      3- Lecture Hall 110 (Capacity 150 persons)
      4- Lecture Hall 132 (Capacity 96 persons)
      5- Computer Lab (05 Labs)
      S.T.I. Library
      6- Training Hall (40 persons), extendable to 80 persons
      Genome Centre / UNESCO Chair
      7- meeting room (15 Capacity persons)
      Graduate Block / A block
      8- Sybrid Hall for training (Capacity 30 person)
      9- Executive Hall-I (Capacity 35 persons)
      10- Lecture Hall (Capacity 35 persons)
      11- ORIC Meeting Hall (Capacity 30 persons)
      12- QEC meeting Hall (Capacity 12 persons)
      All the halls and meeting rooms are fully air conditioned and connected with back-up power supply.
    `,
  },
  {
    id: '2',
    slug: 'agronomy',
    name: 'Agronomy',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-2',
    description: 'The science and technology of producing and using plants for food, fuel, fiber, and land reclamation.',
  },
  {
    id: '3',
    slug: 'horticulture',
    name: 'Horticulture',
    university: 'PMAS Arid Agriculture University, Rawalpindi',
    imageId: 'agri-3',
    description: 'The art and science of garden cultivation and management, including fruits, vegetables, nuts, seeds, herbs, and flowers.',
  },
  {
    id: '4',
    slug: 'plant-breeding-and-genetics',
    name: 'Plant Breeding and Genetics',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-4',
    description: 'The art and science of changing the traits of plants in order to produce desired characteristics.',
  },
  {
    id: '5',
    slug: 'soil-and-environmental-sciences',
    name: 'Soil and Environmental Sciences',
    university: 'MNS University of Agriculture, Multan',
    imageId: 'agri-5',
    description: 'Studies the properties of soil and its relationship with the environment and living organisms.',
  },
  {
    id: '6',
    slug: 'entomology',
    name: 'Entomology',
    university: 'PMAS Arid Agriculture University, Rawalpindi',
    imageId: 'agri-6',
    description: 'The scientific study of insects, a branch of zoology.',
  },
  {
    id: '7',
    slug: 'plant-pathology',
    name: 'Plant Pathology',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-7',
    description: 'The scientific study of diseases in plants caused by pathogens and environmental conditions.',
  },
  {
    id: '8',
    slug: 'forestry-and-range-management',
    name: 'Forestry and Range Management',
    university: 'MNS University of Agriculture, Multan',
    imageId: 'agri-8',
    description: 'Focuses on the management of forest and rangeland ecosystems for sustainability and resource utilization.',
  },
  {
    id: '9',
    slug: 'agricultural-and-resource-economics',
    name: 'Agricultural & Resource Economics',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-9',
    description: 'An applied field of economics concerned with the application of economic theory in optimizing the production and distribution of food.',
  },
  {
    id: '10',
    slug: 'animal-science',
    name: 'Animal Science',
    university: 'PMAS Arid Agriculture University, Rawalpindi',
    imageId: 'agri-10',
    description: 'Describes the science of managing, breeding, and raising livestock.',
  },
  {
    id: '11',
    slug: 'veterinary-medicine',
    name: 'Veterinary Medicine',
    university: 'University of Veterinary and Animal Sciences, Lahore',
    imageId: 'agri-11',
    description: 'The branch of medicine that deals with the prevention, diagnosis and treatment of disease in animals.',
  },
  {
    id: '12',
    slug: 'fisheries-and-aquaculture',
    name: 'Fisheries and Aquaculture',
    university: 'University of Veterinary and Animal Sciences, Lahore',
    imageId: 'agri-12',
    description: 'The science of breeding, rearing, and harvesting fish, shellfish, and aquatic plants.',
  },
  {
    id: '13',
    slug: 'agricultural-engineering',
    name: 'Agricultural Engineering',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-13',
    description: 'The engineering discipline that applies engineering science and technology to agricultural production and processing.',
  },
  {
    id: '14',
    slug: 'biotechnology',
    name: 'Biotechnology',
    university: 'MNS University of Agriculture, Multan',
    imageId: 'agri-14',
    description: 'The use of living systems and organisms to develop or make products for agricultural purposes.',
  },
  {
    id: '15',
    slug: 'dairy-technology',
    name: 'Dairy Technology',
    university: 'University of Veterinary and Animal Sciences, Lahore',
    imageId: 'agri-15',
    description: 'Deals with the processing of milk and milk products.',
  },
  {
    id: '16',
    slug: 'environmental-sciences',
    name: 'Environmental Sciences',
    university: 'PMAS Arid Agriculture University, Rawalpindi',
    imageId: 'agri-16',
    description: 'An interdisciplinary academic field that integrates physical, biological and information sciences.',
  },
  {
    id: '17',
    slug: 'rural-sociology',
    name: 'Rural Sociology',
    university: 'University of Agriculture, Faisalabad',
    imageId: 'agri-17',
    description: 'A field of sociology traditionally associated with the study of social structure and conflict in rural areas.',
  },
  {
    id: '18',
    slug: 'water-management',
    name: 'Water Management',
    university: 'MNS University of Agriculture, Multan',
    imageId: 'agri-18',
    description: 'The management of water resources for its efficient use, particularly in agriculture.',
  },
  {
    id: '19',
    slug: 'floriculture-research-sub-station',
    name: 'Floriculture Research Sub-station',
    university: 'Horticultural Research Sub-station, Multan',
    imageId: 'agri-19',
    description: 'A sub-station focused on floriculture and landscaping research.',
    contact: {
      focalPerson: 'Dr. Muhammad Muzamil Ijaz',
      email: 'muzamil.ijaz243@gmail.com',
    },
    equipment: `
      Farm Machinery/Equipment:
      1 Power sprayer (1 unit)
      1 Brush cutter (1 unit)
      1 Mini rotavator (1 unit)

      Lab Machinery/Equipment:
      1 Digital balance
      1 Hydro distillation unit
    `,
    facilities: `
      Land resource:
      Total area: 7.50 acre
      Cultivated area: 6.5 acre
      Non-cultivated area (Paths, buildings, water channels): 1.0 acre

      Building details:
      Administrative office: 3.5 marla

      Human Resources:
      - Assistant Horticulturist (BPS 18): 1
      - Assistant Research Officer (BPS 17): 1
      - Senior Clerk (BPS 14): 1
      - Budder (BPS 8): 2
      - Jeep Driver (BPS 6): 1
      - Tractor Driver (BPS 8): 1
      - Mali (BPS 5): 2
      - Beldars (BPS 1,4,5): 7
      - Chowkidar (BPS 2,1): 2
      - Naib Qasid (BPS 5): 1
      - Sweeper (BPS 2): 1
      Total Staff: 20
    `,
  },
];

    