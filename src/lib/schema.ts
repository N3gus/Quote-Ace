import { z } from 'zod';

/**
 * Defines the Zod schema for vehicle details.
 * It includes validation rules for make, model, and year.
 */
export const vehicleSchema = z.object({
  make: z.string({ required_error: "Make is required." }).min(2, { message: "Make must be at least 2 characters." }),
  model: z.string({ required_error: "Model is required." }).min(1, { message: "Model must be at least 1 character." }),
  year: z.coerce.number({ required_error: "Year is required.", invalid_type_error: "Please enter a valid year." }).min(1980, { message: "Year must be 1980 or later." }).max(new Date().getFullYear() + 1, { message: `Year cannot be in the future.` }),
});

/**
 * Defines the Zod schema for user information.
 * It includes validation rules for the user's full name and email address.
 */
export const userInfoSchema = z.object({
  fullName: z.string({ required_error: "Full name is required." }).min(3, { message: "Full name must be at least 3 characters." }),
  email: z.string({ required_error: "Email is required." }).email({ message: "Invalid email address." }),
});

/**
 * Defines the Zod schema for insurance coverage options.
 * It specifies that liability, collision, and comprehensive are boolean flags.
 */
export const coverageSchema = z.object({
  liability: z.boolean().default(false),
  collision: z.boolean().default(false),
  comprehensive: z.boolean().default(false),
});

/**
 * Defines the complete Zod schema for the insurance quote form.
 * It merges the vehicle, user info, and coverage schemas, and adds a
 * refinement to ensure at least one coverage option is selected.
 */
export const quoteFormSchema = vehicleSchema.merge(userInfoSchema).merge(coverageSchema).refine(data => data.liability || data.collision || data.comprehensive, {
  message: "At least one coverage option must be selected.",
  path: ["liability"],
});

/**
 * TypeScript type inferred from the `quoteFormSchema`.
 * Represents the shape of the form data.
 */
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
