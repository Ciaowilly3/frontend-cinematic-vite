import { z } from 'zod';
import { IFormFields } from '../../interfaces/IFormFields';

export const schema = z.object({
  coverImg: z.string().url({ message: 'Insert a valid url' }),
  title: z.string().min(1, { message: 'film title is mandatory' }),
  nationOfProduction: z
    .string()
    .min(1, { message: 'nation of production is mandatory' }),
  plot: z.string().min(1, { message: 'plot is mandatory' }),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: 'rating must be between 0 and 5' }),
  funFacts: z.string(),
});

export type formFields = z.infer<typeof schema>;

export const filmFormFields: IFormFields<formFields> = [
  {
    name: 'coverImg',
    label: 'Cover Img',
    id: 'coverImg',
    type: 'text',
    placeholder: 'url',
    style: ['formControl'],
  },
  {
    name: 'title',
    label: 'Title',
    id: 'title',
    type: 'text',
    placeholder: 'title',
    style: ['formControl'],
  },
  {
    name: 'nationOfProduction',
    label: 'Nation of Production',
    id: 'nationOfProduction',
    type: 'text',
    placeholder: 'nation of production',
    style: ['formControl'],
  },
  {
    name: 'plot',
    label: 'Plot',
    id: 'plot',
    type: 'textarea',
    placeholder: 'plot',
    style: ['formControl'],
  },
  {
    name: 'rating',
    label: 'Rating',
    id: 'rating',
    type: 'number',
    step: 0.1,
    placeholder: 'rating (0-5)',
    style: ['formControl'],
  },
  {
    name: 'funFacts',
    label: 'Fun Facts',
    id: 'funFacts',
    type: 'textarea',
    placeholder: "film' fun facts ",
    style: ['formControl'],
  },
];
