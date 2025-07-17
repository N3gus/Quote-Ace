import { z } from 'zod';

export const vehicleSchema = z.object({
  make: z.string({ required_error: "Make is required." }).min(2, { message: "Make must be at least 2 characters." }),
  model: z.string({ required_error: "Model is required." }).min(1, { message: "Model must be at least 1 character." }),
  year: z.coerce.number({ required_error: "Year is required.", invalid_type_error: "Please enter a valid year." }).min(1980, { message: "Year must be 1980 or later." }).max(new Date().getFullYear() + 1, { message: `Year cannot be in the future.` }),
});

export const userInfoSchema = z.object({
  fullName: z.string({ required_error: "Full name is required." }).min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string({ required_error: "Email is required." }).email({ message: "Invalid email address." }),
});

export const coverageSchema = z.object({
  liability: z.boolean().default(false),
  collision: z.boolean().default(false),
  comprehensive: z.boolean().default(false),
});

export const quoteFormSchema = vehicleSchema.merge(userInfoSchema).merge(coverageSchema).refine(data => data.liability || data.collision || data.comprehensive, {
  message: "At least one coverage option must be selected.",
  path: ["liability"],
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
