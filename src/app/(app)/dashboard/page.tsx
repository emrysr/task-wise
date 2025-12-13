import DashboardClientPage from '@/components/dashboard-client-page';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export const metadata = {
    title: 'Dashboard | TaskWise',
};

function DashboardLoading() {
    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Skeleton className="h-[350px]"/>
                <Skeleton className="h-[350px]"/>
            </div>
            <Skeleton className="h-[400px]"/>
        </div>
    )
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">An overview of all completed tasks.</p>
      </header>
      <Suspense fallback={<DashboardLoading />}>
        <DashboardClientPage />
      </Suspense>
    </div>
  );
}
