
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { quoteFormSchema, type QuoteFormData } from "@/lib/schema";

/**
 * Configuration for the multi-step form.
 * Each object represents a step with its ID, title, and associated form fields.
 */
const steps = [
  { id: 1, title: "Vehicle Details", fields: ["make", "model", "year"] },
  { id: 2, title: "Your Information", fields: ["fullName", "email"] },
  { id: 3, title: "Coverage Options", fields: ["liability", "collision", "comprehensive"] },
];

/**
 * A multi-step form component for collecting insurance quote information.
 * It handles form state, validation, navigation between steps, and submission.
 * @returns {React.ReactElement} The rendered insurance form component.
 */
export function InsuranceForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: "onTouched",
    defaultValues: {
      make: "",
      model: "",
      year: "",
      fullName: "",
      email: "",
      liability: true,
      collision: false,
      comprehensive: false,
    },
  });

  type FieldName = keyof QuoteFormData;

  /**
   * Proceeds to the next step in the form after validating the current step's fields.
   */
  const nextStep = async () => {
    const fields = steps[currentStep].fields as FieldName[];
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((step) => step + 1);
    }
  };

  /**
   * Navigates to the previous step in the form.
   */
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  /**
   * Handles the final form submission.
   * It calculates a mock premium, shows a success toast, and navigates to the quote page.
   * @param {QuoteFormData} data - The validated form data.
   */
  const processQuote = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple mock premium calculation
    let premium = 5000; // Base premium in ZMW
    if (data.liability) premium += 2000;
    if (data.collision) premium += 3000;
    if (data.comprehensive) premium += 1500;
    if (data.year && new Date().getFullYear() - Number(data.year) > 10) premium += 1000;
    
    const quoteData = { ...data, premium };

    setIsSubmitting(false);

    toast({
        title: "Quote Generated!",
        description: "We've calculated your personalized quote.",
        variant: 'default',
    });

    const query = new URLSearchParams(quoteData as any).toString();
    router.push(`/quote?${query}`);
  };
  
  const progressValue = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-8">
      <Progress value={progressValue} className="w-full transition-all duration-500" />
      <Form {...form}>
        <form>
          {currentStep === 0 && (
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Make</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Toyota" {...field} aria-label="Vehicle Make" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Camry" {...field} aria-label="Vehicle Model" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2022" {...field} aria-label="Vehicle Year" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in-50 duration-500">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Musonda Sakala" {...field} aria-label="Full Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="e.g., musakala@example.com" {...field} aria-label="Email Address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {currentStep === 2 && (
             <div className="space-y-4 animate-in fade-in-50 duration-500">
               <FormField
                  control={form.control}
                  name="liability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel id="liability-label" className="text-base">Liability Coverage</FormLabel>
                        <FormDescription>Covers damages to others if you're at fault.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} aria-labelledby="liability-label" />
                      </FormControl>
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="collision"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel id="collision-label" className="text-base">Collision Coverage</FormLabel>
                        <FormDescription>Covers damage to your vehicle from an accident.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} aria-labelledby="collision-label" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comprehensive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel id="comprehensive-label" className="text-base">Comprehensive Coverage</FormLabel>
                        <FormDescription>Covers non-collision damage, like theft or weather.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} aria-labelledby="comprehensive-label" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormMessage>{form.formState.errors.liability?.message}</FormMessage>
             </div>
          )}
          
          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 0 || isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={nextStep}>
                Next Step
              </Button>
            ) : (
              <Button type="button" onClick={form.handleSubmit(processQuote)} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get My Quote
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
