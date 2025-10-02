"use client";

import { useEffect, useState } from "react";

import {
  FiEye,
  FiDownload,
  FiCalendar,
  FiHome,
  FiFilter,
} from "react-icons/fi";
import { IInvoice } from "@/types/invoice";
import { IRentalContract } from "@/types/contract";
import { StatusBadge } from "../ui/status-badge";
import { formatCurrency, formatMonth } from "@/utils/utils";
import { InvoiceDetailModal } from "./invoice-detail-modal";
import { AppDispatch, AppState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { getInvoicesByContractAndTenant } from "@/redux/invoice/action";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./invoice-pdf";

export function InvoiceList() {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: AppState) => state.auth);
  const { invoices } = useSelector((state: AppState) => state.invoices);
  const { contractsList } = useSelector((state: AppState) => state.contracts);
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<string>("all");

  useEffect(() => {
    dispatch(
      getInvoicesByContractAndTenant({
        contractId: selectedContract,
        tenantId: userInfo?.id,
      })
    );
  }, [userInfo, selectedContract]);
  const handleViewInvoice = (invoice: IInvoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };
  const filteredInvoices =
    selectedContract === "all"
      ? invoices
      : invoices?.filter((invoice) => invoice.contract.id === selectedContract);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-foreground text-xl font-semibold">
          Danh sách hóa đơn hàng tháng
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FiFilter className="text-muted-foreground h-4 w-4" />
            <select
              value={selectedContract}
              onChange={(e) => setSelectedContract(e.target.value)}
              className="border-border text-foreground focus:ring-ring rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2"
            >
              <option value="all">Tất cả hợp đồng</option>
              {contractsList?.map((contract) => (
                <option
                  key={contract.id}
                  value={contract.id}
                >
                  {contract?.contract_number} - {contract?.room?.building?.name}{" "}
                  {contract?.room?.number_room}
                </option>
              ))}
            </select>
          </div>
          <div className="text-muted-foreground text-sm">
            Tổng: {filteredInvoices.length} hóa đơn
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInvoices?.map((invoice) => (
          <div
            key={invoice.id}
            className="border-border rounded-lg border bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <h3 className="text-foreground text-lg font-medium">
                    Hóa đơn {invoice.invoice_number}
                  </h3>
                  <StatusBadge
                    status={invoice.status}
                    type="invoice"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <FiHome className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div className="text-muted-foreground">Phòng</div>
                      <div className="text-foreground font-medium">
                        {invoice?.contract?.room?.building?.name} -{" "}
                        {invoice?.contract?.room?.number_room}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-muted-foreground h-4 w-4" />
                    <div>
                      <div className="text-muted-foreground">Kỳ hóa đơn</div>
                      <div className="text-foreground font-medium">
                        {formatMonth(invoice.from_date, invoice.to_date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-muted-foreground">Người thuê</div>
                      <div className="text-foreground font-medium">
                        {invoice.contract.tenant.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div>
                      <div className="text-muted-foreground">Tổng tiền</div>
                      <div className="text-foreground text-lg font-medium">
                        {formatCurrency(invoice.total_amount)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick summary */}
                <div className="border-border mt-3 border-t pt-3">
                  <div className="text-muted-foreground flex flex-wrap gap-4 text-xs">
                    <span>
                      Tiền phòng:{" "}
                      {formatCurrency(invoice.contract.monthly_rental)}
                    </span>
                    <span>
                      Điện: {invoice.electricity_usage} kWh (
                      {formatCurrency(invoice.electricity_total)})
                    </span>
                    <span>Nước: {formatCurrency(invoice.water_total)}</span>
                    <span>Dịch vụ: {invoice.services.length} khoản</span>
                  </div>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => handleViewInvoice(invoice)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <FiEye className="h-4 w-4" />
                  Xem
                </button>
                <PDFDownloadLink
                  document={<InvoicePDF invoice={invoice} />}
                  fileName={`hoa-don-${invoice.invoice_number}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      "Đang tạo PDF..."
                    ) : (
                      <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                        <FiDownload className="text-sm" />
                        Tải PDF
                      </button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        ))}

        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-muted-foreground mb-2">
              Không có hóa đơn nào
            </div>
            <div className="text-muted-foreground text-sm">
              {selectedContract !== "all"
                ? "Hợp đồng này chưa có hóa đơn nào được tạo"
                : "Chưa có hóa đơn nào trong hệ thống"}
            </div>
          </div>
        )}
      </div>

      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedInvoice(null);
          }}
        />
      )}
    </div>
  );
}
