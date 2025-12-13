'use client';

import type { Task } from '@/lib/types';
import { PEOPLE, ZONES } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function RecentTasks({ tasks }: { tasks: Task[] }) {
    const recentTasks = tasks.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Here are the last 10 tasks that were logged.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead className="hidden sm:table-cell">Zone</TableHead>
              <TableHead>Person</TableHead>
              <TableHead className="text-right">Completed On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTasks.map((task) => {
              const person = PEOPLE.find(p => p.id === task.personId);
              const zone = ZONES.find(z => z.id === task.zoneId);
              const avatar = person ? PlaceHolderImages.find(img => img.id === person.avatar) : null;
              const ZoneIcon = zone?.icon;

              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {zone && ZoneIcon && (
                        <Badge variant="outline" className="gap-1.5">
                            <ZoneIcon className="h-3.5 w-3.5" />
                            {zone.name}
                        </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            {avatar && <AvatarImage src={avatar.imageUrl} alt={person?.name} />}
                            <AvatarFallback>{person?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{person?.name || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {format(task.completedAt, 'MMM d, yyyy')}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
