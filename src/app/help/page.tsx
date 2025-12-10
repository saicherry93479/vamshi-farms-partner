import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <AppShell>
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Help Center</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          Contact Vamshi Farms support, onboarding playbooks, and SOPs will be
          available soon.
        </CardContent>
      </Card>
    </AppShell>
  );
}

