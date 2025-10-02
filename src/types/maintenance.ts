export interface IMaintenance {
  id: string;
  user_created?: string;
  date_created: string;
  user_updated?: string;
  date_updated?: string;
  type: "maintenance" | "repair" | "complaint" | "other";
  message: string;
  landlord: string;
  status?: "pending" | "in_progress" | "completed" | "rejected";
}
