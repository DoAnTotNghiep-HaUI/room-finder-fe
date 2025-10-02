"use client";

interface StatusBadgeProps {
  status: string;
  type: "contract" | "invoice";
  className?: string;
}

export function StatusBadge({
  status,
  type,
  className = "",
}: StatusBadgeProps) {
  const getStatusConfig = () => {
    if (type === "contract") {
      switch (status) {
        case "active":
          return {
            color:
              "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
            text: "Đang hiệu lực",
          };
        case "expired":
          return {
            color:
              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
            text: "Hết hạn",
          };
        case "terminated":
          return {
            color:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
            text: "Đã chấm dứt",
          };
        default:
          return {
            color:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
            text: status,
          };
      }
    } else {
      switch (status) {
        case "paid":
          return {
            color:
              "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
            text: "Đã thanh toán",
          };
        case "unpaid":
          return {
            color:
              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
            text: "Chưa thanh toán",
          };
        case "overdue":
          return {
            color:
              "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
            text: "Quá hạn",
          };
        default:
          return {
            color:
              "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
            text: status,
          };
      }
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-medium ${config.color} ${className}`}
    >
      {config.text}
    </span>
  );
}
