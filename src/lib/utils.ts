import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInSeconds } from 'date-fns';
export type PomoData = {
  title: string
  starttime: Date
  endtime: Date
  pomo_id: string
}
export function formatMinSec(time1: Date, time2: Date, options = { alwaysShowMinutes: true }) {
  const diffSeconds = Math.abs(differenceInSeconds(time2, time1));

  const minutes = Math.floor(diffSeconds / 60);
  const seconds = diffSeconds % 60;

  // Format with leading zero for seconds
  const formattedSeconds = seconds.toString().padStart(2, '0');

  if (minutes === 0 && !options.alwaysShowMinutes) {
    return `${seconds}s`;
  }

  return `${minutes}:${formattedSeconds}`;
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformKeysToLowercase(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeysToLowercase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const lowerKey = key.toLowerCase();
      acc[lowerKey] = transformKeysToLowercase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
}
