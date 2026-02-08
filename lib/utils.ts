import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | string) {
  if (typeof value === 'number') {
    return `$${value}`;
  }
  return value;
}

export function normalizeValue(value: string) {
  return value.toLowerCase().trim().replace(/[\s_-]+/g, '-');
}
