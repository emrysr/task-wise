"use client";

import type { Task } from '@/lib/types';
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completedAt'>) => void;
  isLoaded: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem('taskwise-tasks');
      if (item) {
        const parsedTasks = JSON.parse(item, (key, value) => {
          if (key === 'completedAt') {
            return new Date(value);
          }
          return value;
        });
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
      setTasks([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem('taskwise-tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage", error);
      }
    }
  }, [tasks, isLoaded]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completedAt'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}-${Math.random()}`,
      completedAt: new Date(),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }, []);

  const value = { tasks, addTask, isLoaded };

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
