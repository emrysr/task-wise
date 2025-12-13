'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTaskContext } from '@/context/task-provider';
import { PEOPLE, ZONES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Task name must be at least 2 characters.' }).max(100),
  description: z.string().max(500).optional(),
  attachments: z.string().max(200).optional(),
  personId: z.string({ required_error: 'Please select a person.' }),
  zoneId: z.string({ required_error: 'Please select a zone.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function LogTaskForm() {
  const router = useRouter();
  const { addTask } = useTaskContext();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      attachments: '',
    },
  });

  function onSubmit(values: FormValues) {
    addTask({
        name: values.name,
        description: values.description || '',
        attachments: values.attachments || '',
        personId: values.personId,
        zoneId: values.zoneId,
    });
    toast({
        title: "Task Logged!",
        description: `"${values.name}" has been successfully added.`,
    });
    router.push('/dashboard');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Cleaned the kitchen countertops" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="personId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Completed By</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select who completed the task" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {PEOPLE.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                        {person.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="zoneId"
            render={({ field }) => (
                <FormItem>
                <FormLabel>House Zone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a zone for the task" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {ZONES.map((zone) => (
                        <SelectItem key={zone.id} value={zone.id}>
                        {zone.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any extra details about the task..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Link to before/after photos" {...field} />
              </FormControl>
               <FormDescription>
                Add any links to photos, documents, or other attachments.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">Log Task</Button>
        </div>
      </form>
    </Form>
  );
}
