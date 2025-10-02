"use client";

import { useState } from "react";

import { FiFileText, FiDollarSign, FiTool } from "react-icons/fi";
import { InvoiceList } from "./invoice/invoice-list";
import { ContractList } from "./contract/contract-list";
import { BookingList } from "../RoomDetail/booking";
import { useSelector } from "react-redux";
import { AppState } from "@/redux";
import { MaintenanceList } from "./request/maintenance-list";

export default function ContractInvoice() {
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const [activeTab, setActiveTab] = useState<
    "contracts" | "invoices" | "maintenance"
  >("contracts");

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            Quản lý hợp đồng và hóa đơn
          </h1>
          <p className="text-muted-foreground">
            Xem và quản lý các hợp đồng thuê phòng và hóa đơn hàng tháng
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 flex w-fit space-x-1 rounded-lg bg-[#e1edf5] p-1">
          <button
            onClick={() => setActiveTab("contracts")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "contracts"
                ? "text-foreground bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FiFileText className="h-4 w-4" />
            Hợp đồng
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "invoices"
                ? "text-foreground bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FiDollarSign className="h-4 w-4" />
            Hóa đơn
          </button>
          <button
            onClick={() => setActiveTab("maintenance")}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === "maintenance"
                ? "text-foreground bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <FiTool className="h-4 w-4" />
            Yêu cầu sửa chữa
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-lg border shadow-sm">
          {activeTab === "contracts" && <ContractList />}
          {activeTab === "invoices" && <InvoiceList />}
          {activeTab === "maintenance" && <MaintenanceList />}
        </div>
      </div>
    </div>
  );
}
