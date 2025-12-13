import { LogTaskForm } from '@/components/log-task-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
    title: 'Log Task | TaskWise',
};

export default function LogTaskPage() {
  return (
    <>
        <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline tracking-tight">Log Task</h1>
            <p className="text-muted-foreground">Record a task that has been completed.</p>
        </header>
        <div className="max-w-2xl">
        <Card>
            <CardHeader>
                <CardTitle>Task Details</CardTitle>
                <CardDescription>Fill out the form below to add a new completed task to the log.</CardDescription>
            </CardHeader>
            <CardContent>
            <LogTaskForm />
            </CardContent>
        </Card>
        </div>
    </>
  );
}
