import { RadioOption } from "@/components/Input/radio";

export const contractDurationOptions: RadioOption[] = [
  { label: "3 tháng", value: "3_months" },
  { label: "6 tháng", value: "6_months" },
  { label: "1 năm", value: "1_year" },
  { label: "2 năm", value: "2_years" },
];
export const limitPeople: RadioOption[] = [
  { label: "1 ", value: 1 },
  { label: "2 ", value: 2 },
  { label: "3 ", value: 3 },
  { label: "4 ", value: 4 },
];
export const sortData: RadioOption[] = [
  { label: "Mới nhất ", value: "-date_created" },
  { label: "Giá thấp tới cao ", value: "room_price" },
  { label: "Giá cao tới thấp ", value: "-room_price" },
];
