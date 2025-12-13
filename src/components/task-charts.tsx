'use client';

import type { Task } from '@/lib/types';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PEOPLE } from '@/lib/data';
import { useMemo } from 'react';

const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export function TaskCharts({ tasks }: { tasks: Task[] }) {
  const tasksByPerson = useMemo(() => {
    const counts = tasks.reduce((acc, task) => {
      const personName = PEOPLE.find(p => p.id === task.personId)?.name || 'Unknown';
      acc[personName] = (acc[personName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, taskCount]) => ({ name, tasks: taskCount }))
      .sort((a, b) => b.tasks - a.tasks);
  }, [tasks]);

  const mostFrequentTasks = useMemo(() => {
    const counts = tasks.reduce((acc, task) => {
      acc[task.name] = (acc[task.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [tasks]);

  const tasksByPersonConfig = {
    tasks: { label: 'Tasks' },
    ...Object.fromEntries(tasksByPerson.map((person, i) => [person.name, { label: person.name, color: CHART_COLORS[i % CHART_COLORS.length] }]))
  };
  
  const frequentTasksConfig = {
    count: { label: 'Count' },
    ...Object.fromEntries(mostFrequentTasks.map((task, i) => [task.name, { label: task.name, color: CHART_COLORS[i % CHART_COLORS.length] }]))
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Person</CardTitle>
          <CardDescription>Who is getting the most done?</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={tasksByPersonConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={tasksByPerson} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={80}
              />
              <XAxis dataKey="tasks" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="tasks" layout="vertical" radius={5}>
                {tasksByPerson.map((person, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Most Frequent Tasks</CardTitle>
          <CardDescription>Top 5 tasks performed most often.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={frequentTasksConfig} className="h-[250px] w-full">
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="name" hideLabel />}
              />
              <Pie data={mostFrequentTasks} dataKey="count" nameKey="name" innerRadius={60}>
                 {mostFrequentTasks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
