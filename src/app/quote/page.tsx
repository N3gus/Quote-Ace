"use client";

import { Suspense } from 'react';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function QuoteDisplay() {
  const searchParams = useSearchParams();

  const quote = {
    make: searchParams.get('make') || 'N/A',
    model: searchParams.get('model') || 'N/A',
    year: searchParams.get('year') || 'N/A',
    fullName: searchParams.get('fullName') || 'N/A',
    email: searchParams.get('email') || 'N/A',
    liability: searchParams.get('liability') === 'true',
    collision: searchParams.get('collision') === 'true',
    comprehensive: searchParams.get('comprehensive') === 'true',
    premium: searchParams.get('premium') || '0',
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
    }).format(Number(amount));
  };
  
  return (
    <div className="container mx-auto py-8 px-4 flex items-start justify-center">
      <Card className="w-full max-w-2xl shadow-lg animate-in fade-in-50 duration-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Your Insurance Quote</CardTitle>
          <CardDescription className="pt-1">
            Here is your personalized mock quote based on the information you provided.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="text-center bg-accent/20 p-6 rounded-lg border border-accent">
                <p className="text-muted-foreground">Your Estimated Annual Premium</p>
                <p className="text-5xl font-bold text-primary">{formatCurrency(quote.premium)}</p>
            </div>

            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">Vehicle Details</h3>
                    <p><span className="font-medium text-muted-foreground">Make:</span> {quote.make}</p>
                    <p><span className="font-medium text-muted-foreground">Model:</span> {quote.model}</p>
                    <p><span className="font-medium text-muted-foreground">Year:</span> {quote.year}</p>
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-lg border-b pb-2 mb-2">Your Information</h3>
                    <p><span className="font-medium text-muted-foreground">Name:</span> {quote.fullName}</p>
                    <p><span className="font-medium text-muted-foreground">Email:</span> {quote.email}</p>
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="font-semibold text-lg mb-3">Selected Coverages</h3>
                <ul className="space-y-2">
                    {quote.liability && <li className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> Liability Coverage</li>}
                    {quote.collision && <li className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> Collision Coverage</li>}
                    {quote.comprehensive && <li className="flex items-center gap-2"><CheckIcon className="h-5 w-5 text-green-500" /> Comprehensive Coverage</li>}
                </ul>
            </div>

        </CardContent>
        <CardFooter className="flex-col gap-4 text-center !pt-6">
            <p className="text-xs text-muted-foreground max-w-md">This is a mock quote for demonstration purposes only and is not a real offer of insurance.</p>
            <Button asChild className="mt-2">
                <Link href="/">Start a New Quote</Link>
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function QuoteLoadingSkeleton() {
    return (
        <div className="container mx-auto py-8 px-4 flex items-start justify-center">
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="text-center">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 rounded-lg">
                        <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
                        <Skeleton className="h-12 w-1/2 mx-auto" />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-1/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="space-y-2">
                             <Skeleton className="h-6 w-1/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                         <Skeleton className="h-6 w-1/3 mb-3" />
                         <Skeleton className="h-4 w-1/2" />
                         <Skeleton className="h-4 w-1/2" />
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-4 text-center">
                    <Skeleton className="h-8 w-48" />
                </CardFooter>
            </Card>
        </div>
    );
}

export default function QuotePage() {
    return (
        <Suspense fallback={<QuoteLoadingSkeleton />}>
            <QuoteDisplay />
        </Suspense>
    )
}
