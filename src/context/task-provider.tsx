'use client';

import type { Task } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useCollection, useFirebase } from '@/firebase';
import { addDoc, collection, orderBy, query } from 'firebase/firestore';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completedAt'>) => void;
  isLoaded: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { firestore } = useFirebase();
  const tasksQuery = firestore ? query(collection(firestore, 'tasks'), orderBy('completedAt', 'desc')) : null;
  const { data: tasks, loading } = useCollection<Task>(tasksQuery);
  const isLoaded = !loading;

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'completedAt'>) => {
    if (!firestore) return;
    const tasksCollection = collection(firestore, 'tasks');
    await addDoc(tasksCollection, {
      ...task,
      completedAt: new Date(),
    });
  }, [firestore]);

  const value = { tasks: tasks || [], addTask, isLoaded };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
