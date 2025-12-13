import type { LucideIcon } from "lucide-react";

export type Person = {
  id: string;
  name: string;
  avatar: string;
};

export type Zone = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  attachments: string;
  completedAt: Date;
  zoneId: string;
  personId: string;
};
