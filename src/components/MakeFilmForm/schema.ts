import { z } from "zod";

export const schema = z.object({
  coverImg: z
    .string()
    .url({ message: "Inserisci un URL valido per l'immagine di copertina" }),
  title: z.string().min(1, { message: "Il titolo del film è obbligatorio" }),
  nationOfProduction: z
    .string()
    .min(1, { message: "nation of production is mandatory" }),
  plot: z.string().min(1, { message: "plot is mandatory" }),
  rating: z.coerce
    .number()
    .min(0)
    .max(5, { message: "Il rating deve essere compreso tra 0 e 5" }),
  funFacts: z.string(),
});

export type formFields = z.infer<typeof schema>;
