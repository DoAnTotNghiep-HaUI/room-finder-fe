"use client";

import { useForm } from "react-hook-form";
import { FiX, FiTool } from "react-icons/fi";
import type { IRentalContract } from "@/types/contract";
import { IMaintenance } from "@/types/maintenance";
import { useState } from "react";

interface CreateMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    request: Omit<IMaintenance, "id" | "date_created" | "status">
  ) => void;
  contracts: IRentalContract[];
}

interface FormData {
  type: "maintenance" | "repair" | "complaint" | "other";
  message: string;
  contract_id: string;
  landlord: string;
}

export function CreateMaintenanceModal({
  isOpen,
  onClose,
  onSubmit,
  contracts,
}: CreateMaintenanceModalProps) {
  const activeContracts = contracts.filter(
    (contract) => contract.status === "active"
  );
  console.log("activeContracts: ", activeContracts);
  const [landlord, setLandlord] = useState();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: "maintenance",
      contract_id: activeContracts[0]?.id || "",
    },
  });

  const selectedContractId = watch("contract_id");

  const selectedContract = activeContracts.find(
    (c) => String(c.id) === String(selectedContractId)
  );

  const handleFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      landlord: selectedContract?.landlord?.id || "",
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <FiTool className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-foreground text-xl font-semibold">
                Tạo yêu cầu sửa chữa
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                Gửi yêu cầu bảo trì hoặc sửa chữa đến chủ nhà
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="hover:bg-muted rounded-lg p-2 transition-colors"
          >
            <FiX className="text-muted-foreground h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6 p-6"
        >
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Tòa nhà - Phòng <span className="text-red-500">*</span>
            </label>
            <select
              {...register("contract_id", {
                required: "Vui lòng chọn tòa nhà - phòng",
              })}
              className="border-border text-foreground w-full rounded-md border bg-background px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {activeContracts.length === 0 ? (
                <option value="">Không có hợp đồng đang hoạt động</option>
              ) : (
                activeContracts.map((contract) => (
                  <option
                    key={contract.id}
                    value={contract.id}
                  >
                    {contract?.room?.building?.name} - Phòng{" "}
                    {contract?.room?.number_room}
                  </option>
                ))
              )}
            </select>
            {errors.contract_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.contract_id.message}
              </p>
            )}
            {/* {selectedContract && (
              <p className="text-muted-foreground mt-1 text-xs">
                Chủ nhà: {selectedContract?.landlord?.first_name}{" "}
                {selectedContract?.landlord?.last_name} • Hợp đồng:{" "}
                {selectedContract?.contract_number}
              </p>
            )} */}
          </div>

          {/* Type Selection */}
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Loại yêu cầu <span className="text-red-500">*</span>
            </label>
            <select
              {...register("type", { required: "Vui lòng chọn loại yêu cầu" })}
              className="border-border text-foreground w-full rounded-md border bg-background px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="maintenance">Bảo trì</option>
              <option value="repair">Sửa chữa</option>
              <option value="complaint">Khiếu nại</option>
              <option value="other">Khác</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-500">{errors.type.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              Nội dung yêu cầu <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", {
                required: "Vui lòng nhập nội dung yêu cầu",
                minLength: {
                  value: 10,
                  message: "Nội dung phải có ít nhất 10 ký tự",
                },
              })}
              rows={6}
              placeholder="Mô tả chi tiết vấn đề cần sửa chữa hoặc bảo trì..."
              className="border-border text-foreground w-full resize-none rounded-md border bg-background px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
            <p className="text-muted-foreground mt-1 text-xs">
              Vui lòng mô tả rõ ràng vấn đề để chủ nhà có thể xử lý nhanh chóng
            </p>
          </div>

          {/* Actions */}
          <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="text-foreground bg-muted hover:bg-muted/80 rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={activeContracts.length === 0}
              className="text-primary-foreground rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
