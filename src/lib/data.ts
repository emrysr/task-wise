import { Home, UtensilsCrossed, Sofa, Flower2, Car, Warehouse } from 'lucide-react';
import type { Person, Zone } from './types';

export const PEOPLE: Person[] = [
  { id: 'person-1', name: 'Alex', avatar: '1' },
  { id: 'person-2', name: 'Jordan', avatar: '2' },
  { id: 'person-3', name: 'Taylor', avatar: '3' },
  { id: 'person-4', name: 'Casey', avatar: '4' },
];

export const ZONES: Zone[] = [
  { id: 'zone-1', name: 'Kitchen', icon: UtensilsCrossed },
  { id: 'zone-2', name: 'Living Room', icon: Sofa },
  { id: 'zone-3', name: 'Garden', icon: Flower2 },
  { id: 'zone-4', name: 'Garage', icon: Car },
  { id: 'zone-5', name: 'Storage', icon: Warehouse },
  { id: 'zone-6', name: 'General', icon: Home },
];
