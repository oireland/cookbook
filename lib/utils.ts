import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addLeadingZeros(value: string, digits: number) {
  if (value.length === digits) return value

  const numberOfZerosToAdd = digits - value.length;
  let zeros = ''
  for (let i = 0; i < numberOfZerosToAdd; i++) {
    zeros = zeros + '0'
  }
  return zeros + value;
}




