import { z } from 'zod';
import { IFormFields } from '../../interfaces/IFormFields';
import { FilmGenre } from '../../interfaces/IFilm';

export const schema = z.object({
  coverImg: z
    .string()
    .url({ message: "Inserisci un URL valido per l'immagine di copertina" }),
  title: z.string().min(1, { message: 'Il titolo del film è obbligatorio' }),
  nationOfProduction: z
    .string()
    .min(1, { message: 'nation of production is mandatory' }),
  plot: z.string().min(1, { message: 'plot is mandatory' }),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: 'Il rating deve essere compreso tra 0 e 5' }),
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
    placeholder: 'Titolo del film',
    style: ['formControl'],
  },
  {
    name: 'nationOfProduction',
    label: 'Nation of Production',
    id: 'nationOfProduction',
    type: 'text',
    placeholder: 'Nazione di produzione',
    style: ['formControl'],
  },
  {
    name: 'plot',
    label: 'Plot',
    id: 'plot',
    type: 'textarea',
    placeholder: 'Trama del film',
    style: ['formControl'],
  },
  {
    name: 'rating',
    label: 'Rating',
    id: 'rating',
    type: 'number',
    step: 0.1,
    placeholder: 'Valutazione del film (0-5)',
    style: ['formControl'],
  },
  {
    name: 'funFacts',
    label: 'Fun Facts',
    id: 'funFacts',
    type: 'textarea',
    placeholder: 'Curiosità divertenti sul film',
    style: ['formControl'],
  },
];
