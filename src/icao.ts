import { z } from 'zod';

export const ICAODesignationSchema = z.object({
	icaoCode: z.string(),
	iataCode: z.string().nullable(),
	model: z.string(),
	modelLink: z.string(),
});

export type ICAODesignation = z.infer<typeof ICAODesignationSchema>;
