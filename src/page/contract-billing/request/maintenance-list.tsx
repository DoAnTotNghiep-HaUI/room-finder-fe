"use client";

import { useEffect, useState } from "react";
import {
  FiPlus,
  FiTool,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { CreateMaintenanceModal } from "./create-maintenance-modal";
import { IMaintenance } from "@/types/maintenance";
import { AppDispatch, AppState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { getListContractsByTenant } from "@/redux/contracts/action";
import { addMaintenance, getMaintenanceByUser } from "@/redux/request/action";

export function MaintenanceList() {
  const dispatch = useDispatch<AppDispatch>();
  const { requestList } = useSelector((state: AppState) => state.request);
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { contractsList } = useSelector((state: AppState) => state.contracts);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getMaintenanceByUser(userInfo?.id));
  }, [userInfo]);

  const handleCreateRequest = async (request: any) => {
    const newRequest = {
      ...request,
      status: "pending",
    };
    await dispatch(addMaintenance(newRequest));
    await dispatch(getMaintenanceByUser(userInfo?.id));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "pending":
        return <FiClock className="h-3 w-3" />;
      case "in_progress":
        return <FiTool className="h-3 w-3" />;
      case "completed":
        return <FiCheckCircle className="h-3 w-3" />;
      case "rejected":
        return <FiXCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "in_progress":
        return "Đang xử lý";
      case "completed":
        return "Hoàn thành";
      case "rejected":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "maintenance":
        return "Bảo trì";
      case "repair":
        return "Sửa chữa";
      case "complaint":
        return "Khiếu nại";
      case "other":
        return "Khác";
      default:
        return type;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-xl font-semibold">
            Yêu cầu sửa chữa
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Quản lý các yêu cầu bảo trì và sửa chữa
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
        >
          <FiPlus className="h-4 w-4" />
          Tạo yêu cầu
        </button>
      </div>

      {requestList?.length === 0 ? (
        <div className="py-12 text-center">
          <FiTool className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <p className="text-muted-foreground">Chưa có yêu cầu sửa chữa nào</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 text-primary hover:underline"
          >
            Tạo yêu cầu đầu tiên
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-border border-b">
                <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                  Ngày tạo
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                  Loại yêu cầu
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                  Nội dung
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                  Trạng thái
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                  Cập nhật
                </th>
              </tr>
            </thead>
            <tbody>
              {requestList?.map((request) => (
                <tr
                  key={request.id}
                  className="border-border hover:bg-muted/50 border-b transition-colors"
                >
                  <td className="text-foreground px-4 py-4 text-sm">
                    {new Date(request.date_created).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                      <FiTool className="h-3 w-3" />
                      {getTypeText(request.type)}
                    </span>
                  </td>
                  <td className="text-foreground max-w-md px-4 py-4 text-sm">
                    <p className="line-clamp-2">{request.message}</p>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-4 py-4 text-sm">
                    {request.date_updated
                      ? new Date(request.date_updated).toLocaleDateString(
                          "vi-VN"
                        )
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateMaintenanceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRequest}
        contracts={contractsList}
      />
    </div>
  );
}
