import { InsuranceForm } from "@/components/insurance-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-4 flex items-start justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Instant Motor Insurance Quote</CardTitle>
          <CardDescription className="text-lg pt-1">
            Get a personalized quote in just a few simple steps.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InsuranceForm />
        </CardContent>
      </Card>
    </div>
  );
}
