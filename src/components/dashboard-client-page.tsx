'use client';

import { useTaskContext } from '@/context/task-provider';
import { TaskCharts } from '@/components/task-charts';
import { RecentTasks } from '@/components/recent-tasks';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileQuestion } from 'lucide-react';

export default function DashboardClientPage() {
  const { tasks, isLoaded } = useTaskContext();

  if (!isLoaded) {
    return (
        <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="h-[350px] animate-pulse"/>
                <Card className="h-[350px] animate-pulse"/>
            </div>
            <Card className="h-[400px] animate-pulse"/>
        </div>
    )
  }

  if (tasks.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>No tasks yet!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
                <FileQuestion className="w-16 h-16 text-muted-foreground"/>
                <h2 className="text-xl font-semibold">It's quiet in here...</h2>
                <p className="text-muted-foreground">Log your first completed task to see your productivity dashboard.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="space-y-8">
      <TaskCharts tasks={tasks} />
      <RecentTasks tasks={tasks} />
    </div>
  );
}
