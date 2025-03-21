import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string = "") {
  if (!fullName) return "U";
  return fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  // Remove the country code from the beginning
  const countryCode = cleaned.slice(0, 2);
  const number = cleaned.slice(2);

  // Format the number in groups of 3
  const formattedNumber = number.replace(/(\d{3})(?=\d)/g, "$1 ");

  return `+${countryCode} ${formattedNumber}`;
}
