import axios from "axios";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getDistrict = async () => {
  const response = await axios.get(
    "https://provinces.open-api.vn/api/v1/p/1?depth=2"
  );
  return response.data;
};
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("vi-VN");
}

export function formatMonth(fromDate: string, toDate: string): string {
  const from = new Date(fromDate);
  return `Tháng ${from.getMonth() + 1}/${from.getFullYear()}`;
}

export function calculateDays(fromDate: string, toDate: string): number {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  return Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}
