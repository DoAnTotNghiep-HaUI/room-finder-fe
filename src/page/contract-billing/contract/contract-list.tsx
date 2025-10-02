"use client";

import { useEffect, useState } from "react";
import type { IRentalContract } from "@/types/contract";
import { ContractDetailModal } from "./contract-detail-modal";

import { FiEye, FiCalendar, FiHome, FiUser } from "react-icons/fi";
import { StatusBadge } from "../ui/status-badge";
import { formatCurrency, formatDate } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/redux";
import { getListContractsByTenant } from "@/redux/contracts/action";

export function ContractList() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { contractsList } = useSelector((state: AppState) => state.contracts);
  const [selectedContract, setSelectedContract] =
    useState<IRentalContract | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getListContractsByTenant(userInfo?.id));
  }, [userInfo]);
  const handleViewContract = (contract: IRentalContract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">
          Danh sách hợp đồng thuê phòng
        </h2>
        <div className="text-muted-foreground text-sm">
          Tổng: {contractsList?.length} hợp đồng
        </div>
      </div>

      <div className="space-y-4">
        {contractsList?.map((contract) => (
          <div
            key={contract.id}
            className="border-border rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-foreground text-lg font-medium">
                    Hợp đồng {contract.contract_number}
                  </h3>
                  <StatusBadge
                    status={contract.status}
                    type="contract"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div className="text-muted-foreground">Người thuê</div>
                      <div className="text-foreground font-medium">
                        {contract?.tenant?.first_name}{" "}
                        {contract?.tenant?.last_name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiHome className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div className="text-muted-foreground">Phòng</div>
                      <div className="text-foreground font-medium">
                        {contract?.room?.building?.name} -{" "}
                        {contract?.room?.number_room}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div className="text-muted-foreground">Thời hạn</div>
                      <div className="text-foreground font-medium">
                        {formatDate(contract.contract_start_date)} -{" "}
                        {formatDate(contract.contract_end_date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-muted-foreground">
                        Tiền thuê/tháng
                      </div>
                      <div className="text-foreground font-medium">
                        {formatCurrency(contract.monthly_rental)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleViewContract(contract)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <FiEye className="h-4 w-4" />
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedContract && (
        <ContractDetailModal
          contract={selectedContract}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContract(null);
          }}
        />
      )}
    </div>
  );
}
