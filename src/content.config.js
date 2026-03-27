import { z, defineCollection } from 'astro:content';
import { API_URL } from "astro:env/client";

const alcohols = defineCollection({
  loader: async () => {
    const response = await fetch(`${API_URL}/ingredient-categories/alcohol`);
    const data = await response.json();

    return data.ingredients.map((ingredient) => ({
      id: ingredient.slug,
      name: ingredient.name,
      slug: ingredient.slug,
    }));
  },
  schema: z.strictObject({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
  }),
});

const cocktails = defineCollection({
  loader: async () => {
    const response = await fetch(`${API_URL}/cocktails`);
    const data = await response.json();

    const cocktails = [];
    for (const element of data) {
        const response = await fetch(`${API_URL}/cocktails/${element.slug}`);
        const data = await response.json();

        cocktails.push(data);
    }

    return cocktails.map(({id, ...cocktail}) => {
        return ({
            id: cocktail.slug,
            ...cocktail,
        });
    });
  },
  schema: z.strictObject({
    id: z.string(),
    ingredients: z.array(z.strictObject({
        measure: z.string().nullable(),
        name: z.string(),
        quantity: z.number(),
    })),
    name: z.string(),
    recipeSteps: z.array(z.string()),
    slug: z.string(),
  }),
});

export const collections = { alcohols, cocktails };