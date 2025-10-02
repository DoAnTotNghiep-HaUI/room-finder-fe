"use client";

import type { IRentalContract } from "@/types/contract";

import {
  FiX,
  FiDownload,
  FiUser,
  FiHome,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
import { StatusBadge } from "../ui/status-badge";
import { formatCurrency, formatDate } from "@/utils/utils";

interface ContractDetailModalProps {
  contract: IRentalContract;
  isOpen: boolean;
  onClose: () => void;
}

export function ContractDetailModal({
  contract,
  isOpen,
  onClose,
}: ContractDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-foreground text-xl font-semibold">
              Chi tiết hợp đồng {contract.contract_number}
            </h2>
            <StatusBadge
              status={contract.status}
              type="contract"
            />
          </div>
          <button
            onClick={onClose}
            className="hover:bg-muted rounded-md p-2 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Tenant Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-4 flex items-center gap-2">
              <FiUser className="h-5 w-5 text-primary" />
              <h3 className="text-foreground text-lg font-medium">
                Thông tin người thuê
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <div className="text-muted-foreground">Họ và tên</div>
                <div className="text-foreground font-medium">
                  {contract.tenant.first_name} {contract.tenant.last_name}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Số điện thoại</div>
                <div className="text-foreground font-medium">
                  {contract.tenant_phone}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">CCCD/CMND</div>
                <div className="text-foreground font-medium">
                  {contract.id_card}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Ngày sinh</div>
                <div className="text-foreground font-medium">
                  {formatDate(contract.tenant_dateofbirth)}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-muted-foreground">Địa chỉ thường trú</div>
                <div className="text-foreground font-medium">
                  {contract.tenant_permanent_address}
                </div>
              </div>
            </div>
          </div>

          {/* Room Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-4 flex items-center gap-2">
              <FiHome className="h-5 w-5 text-primary" />
              <h3 className="text-foreground text-lg font-medium">
                Thông tin phòng
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <div className="text-muted-foreground">Mã tòa nhà</div>
                <div className="text-foreground font-medium">
                  {contract.room.building.id} - {contract.room.building.name}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Số phòng</div>
                <div className="text-foreground font-medium">
                  {contract.room.number_room}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Tầng</div>
                <div className="text-foreground font-medium">
                  {contract.room.floor}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Diện tích</div>
                <div className="text-foreground font-medium">
                  {contract.room.acreage} m²
                </div>
              </div>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-4 flex items-center gap-2">
              <FiCalendar className="h-5 w-5 text-primary" />
              <h3 className="text-foreground text-lg font-medium">
                Điều khoản hợp đồng
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <div className="text-muted-foreground">Ngày bắt đầu</div>
                <div className="text-foreground font-medium">
                  {formatDate(contract.contract_start_date)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Ngày kết thúc</div>
                <div className="text-foreground font-medium">
                  {formatDate(contract.contract_end_date)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Thời hạn hợp đồng</div>
                <div className="text-foreground font-medium">
                  {contract.contract_duration} tháng
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Tiền đặt cọc</div>
                <div className="text-foreground font-medium">
                  {formatCurrency(contract.deposit)}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-4 flex items-center gap-2">
              <FiDollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-foreground text-lg font-medium">
                Bảng giá dịch vụ
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="text-muted-foreground">
                  Tiền thuê phòng/tháng
                </div>
                <div className="text-foreground font-medium">
                  {formatCurrency(contract.monthly_rental)}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Điện (VNĐ/kWh)</div>
                <div className="text-foreground font-medium">
                  {Number.parseInt(contract.electric_price).toLocaleString(
                    "vi-VN"
                  )}{" "}
                  VNĐ
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Nước (VNĐ/người)</div>
                <div className="text-foreground font-medium">
                  {Number.parseInt(contract.water_price).toLocaleString(
                    "vi-VN"
                  )}{" "}
                  VNĐ
                </div>
              </div>
              {contract.wifi_price && (
                <div>
                  <div className="text-muted-foreground">Wifi/tháng</div>
                  <div className="text-foreground font-medium">
                    {Number.parseInt(contract.wifi_price).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              )}
              {contract.general_service_price && (
                <div>
                  <div className="text-muted-foreground">
                    Dịch vụ chung/người
                  </div>
                  <div className="text-foreground font-medium">
                    {Number.parseInt(
                      contract.general_service_price
                    ).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </div>
                </div>
              )}
              {contract.security_price && (
                <div>
                  <div className="text-muted-foreground">Bảo vệ/tháng</div>
                  <div className="text-foreground font-medium">
                    {Number.parseInt(contract.security_price).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              )}
              {contract.parking_price && (
                <div>
                  <div className="text-muted-foreground">Gửi xe/tháng</div>
                  <div className="text-foreground font-medium">
                    {Number.parseInt(contract.parking_price).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              )}
              {contract.washing_price && (
                <div>
                  <div className="text-muted-foreground">Giặt ủi/tháng</div>
                  <div className="text-foreground font-medium">
                    {Number.parseInt(contract.washing_price).toLocaleString(
                      "vi-VN"
                    )}{" "}
                    VNĐ
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-border flex items-center justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors"
          >
            Đóng
          </button>
          <button className="text-primary-foreground flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90">
            <FiDownload className="h-4 w-4" />
            Tải hợp đồng
          </button>
        </div>
      </div>
    </div>
  );
}
