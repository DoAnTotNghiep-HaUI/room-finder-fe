"use client";

import type { IInvoice } from "@/types/invoice";
import { FiX, FiDownload, FiCalendar, FiUser } from "react-icons/fi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./invoice-pdf";

interface InvoiceDetailModalProps {
  invoice: IInvoice;
  isOpen: boolean;
  onClose: () => void;
}

export function InvoiceDetailModal({
  invoice,
  isOpen,
  onClose,
}: InvoiceDetailModalProps) {
  if (!isOpen) return null;

  const getCurrentMonth = () => {
    const date = new Date(invoice.from_date);
    return `Tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "unpaid":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "unpaid":
        return "Chưa thanh toán";
      case "overdue":
        return "Quá hạn";
      default:
        return status;
    }
  };

  const calculateDays = () => {
    const from = new Date(invoice.from_date);
    const to = new Date(invoice.to_date);
    return (
      Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <h2 className="text-foreground text-xl font-semibold">
              Hóa đơn {invoice.invoice_number}
            </h2>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(invoice.status)}`}
            >
              {getStatusText(invoice.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-muted rounded-md p-2 transition-colors"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div
          className="bg-white p-8"
          id="invoice-content"
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              THÔNG BÁO HÓA ĐƠN
            </h1>
            <h2 className="text-lg font-semibold text-gray-700">
              {getCurrentMonth()}
            </h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div>
                <span>Từ ngày </span>
                <span className="font-semibold">
                  {formatDate(invoice.from_date)}
                </span>
                <span> Đến ngày </span>
                <span className="font-semibold">
                  {formatDate(invoice.to_date)}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="mb-2">
                  <span>Họ và tên khách hàng </span>
                  <span className="text-lg font-bold">
                    {invoice.contract.tenant.id}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span>Nhà </span>
                    <span className="border border-gray-400 px-2 py-1 font-semibold">
                      {invoice.contract.room.building.name}
                    </span>
                  </div>
                  <div>
                    <span>Số phòng </span>
                    <span className="border border-gray-400 px-2 py-1 font-semibold">
                      {invoice.contract.room.number_room}
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <span>Mã hợp đồng </span>
                  <span className="font-semibold">
                    {invoice.contract.contract_number}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-block bg-yellow-200 px-4 py-2">
                  <div className="text-lg font-bold">
                    {invoice.invoice_number}
                  </div>
                  <div className="text-sm">
                    {formatDate(invoice.date_created)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="mb-6 border-2 border-gray-800">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="border-r border-gray-800 p-2 text-center font-bold">
                    STT
                  </th>
                  <th className="border-r border-gray-800 p-2 text-center font-bold">
                    Khoản
                  </th>
                  <th className="border-r border-gray-800 p-2 text-center font-bold">
                    Chi tiết
                  </th>
                  <th className="p-2 text-center font-bold">Thành Tiền</th>
                </tr>
              </thead>
              <tbody>
                {/* Room Rent */}
                <tr className="border-b border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-center">
                    1
                  </td>
                  <td className="border-r border-gray-800 p-2">Tiền phòng</td>
                  <td className="border-r border-gray-800 p-2">
                    <em>Từ ngày</em> {formatDate(invoice.from_date)}{" "}
                    <em>Đến ngày</em> {formatDate(invoice.to_date)}{" "}
                    <em>Số ngày</em>{" "}
                    {/* <span className="font-bold">
                              {invoice.days_count}
                            </span> */}
                  </td>
                  <td className="p-2 text-right font-semibold">
                    {formatCurrency(invoice.contract.room.room_price)}
                  </td>
                </tr>

                {/* Electricity */}
                <tr className="border-b border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-center">
                    2
                  </td>
                  <td className="border-r border-gray-800 p-2">DV Điện</td>
                  <td className="border-r border-gray-800 p-2">
                    <em>CS cũ</em>{" "}
                    <span className="font-bold">
                      {invoice.electricity_old_index}
                    </span>{" "}
                    <em>CS Mới</em>{" "}
                    <span className="font-bold">
                      {invoice.electricity_new_index}
                    </span>{" "}
                    <em>Số sử dụng</em>{" "}
                    <span className="font-bold">
                      {invoice.electricity_usage}
                    </span>
                  </td>
                  <td className="p-2 text-right font-semibold">
                    {formatCurrency(invoice.electricity_total)}
                  </td>
                </tr>

                {/* Water */}
                <tr className="border-b border-gray-800">
                  <td className="border-r border-gray-800 p-2 text-center">
                    3
                  </td>
                  <td className="border-r border-gray-800 p-2">DV Nước</td>
                  <td className="border-r border-gray-800 p-2">
                    {invoice.water_calculation_type === "meter" ? (
                      <>
                        <em>CS cũ</em>{" "}
                        <span className="font-bold">
                          {invoice.water_old_index}
                        </span>{" "}
                        <em>CS Mới</em>{" "}
                        <span className="font-bold">
                          {invoice.water_new_index}
                        </span>{" "}
                        <em>Số sử dụng</em>{" "}
                        <span className="font-bold">
                          {invoice?.water_usage}
                        </span>
                      </>
                    ) : (
                      <>
                        <em>Số người</em>{" "}
                        <span className="font-bold">
                          {invoice.water_people_count}
                        </span>{" "}
                        <em>Đơn giá</em>{" "}
                        <span className="font-bold">
                          {formatCurrency(invoice?.water_price)}
                        </span>
                      </>
                    )}
                  </td>
                  <td className="p-2 text-right font-semibold">
                    {formatCurrency(invoice.water_total)}
                  </td>
                </tr>

                {/* Services */}
                {invoice?.services?.map((service, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800"
                  >
                    <td className="border-r border-gray-800 p-2 text-center">
                      {4 + index}
                    </td>
                    <td className="border-r border-gray-800 p-2">
                      {service.name}
                    </td>
                    <td className="border-r border-gray-800 p-2">
                      <em>Số lượng</em>{" "}
                      <span className="font-bold">{service.quantity}</span>{" "}
                      <em>Đơn giá</em>{" "}
                      <span className="font-bold">
                        {formatCurrency(service.unit_price)}
                      </span>
                    </td>
                    <td className="p-2 text-right font-semibold">
                      {formatCurrency(service.quantity * service.unit_price)}
                    </td>
                  </tr>
                ))}

                {/* Empty rows to match the template */}
                {Array.from({
                  length: Math.max(0, 11 - (3 + invoice.services.length)),
                }).map((_, index) => (
                  <tr
                    key={`empty-${index}`}
                    className="border-b border-gray-800"
                  >
                    <td className="border-r border-gray-800 p-2 text-center">
                      {4 + invoice.services.length + index}
                    </td>
                    <td className="border-r border-gray-800 p-2"></td>
                    <td className="border-r border-gray-800 p-2"></td>
                    <td className="p-2 text-right">-</td>
                  </tr>
                ))}

                {/* Total */}
                <tr className="border-b-2 border-gray-800 bg-gray-50">
                  <td
                    className="border-r border-gray-800 p-2 text-center font-bold"
                    colSpan={3}
                  >
                    Cộng:
                  </td>
                  <td className="p-2 text-right text-lg font-bold">
                    {formatCurrency(invoice.total_amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Footer */}
          {invoice.payment_info && (
            <div className="space-y-4 text-sm">
              {/* <MDEditor
                      value={invoice.description}
                      preview="preview"
                      
                    /> */}
              <p className="text-center">
                <span>Quy khách vui lòng chuyển khoản </span>
                <span className="font-bold">ĐÚNG</span>
                <span> số tiền </span>
                <span className="font-bold">ĐÚNG</span>
                <span> nội dung và </span>
                <span className="font-bold">
                  ĐÚNG SỐ TÀI KHOẢN BAN QUẢN LÝ ĐÃ CUNG CẤP
                </span>
                <span>. BAN QUẢN LÝ SẼ </span>
                <span className="font-bold">
                  KHÔNG CHỊU TRÁCH NHIỆM NẾU QUY KHÁCH CHUYỂN TIỀN VÀO SỐ TÀI
                  KHOẢN KHÁC!
                </span>
              </p>

              <div className="text-center">
                <span>Nội dung chuyển khoản: </span>
                <span className="font-bold text-red-600">
                  {invoice.payment_info.payment_content}
                </span>
                <span className="ml-4">Ngân hàng thụ hưởng </span>
                <span className="font-bold text-red-600">
                  {invoice.payment_info.bank_account}
                </span>
                <span className="ml-4 font-bold text-red-600">
                  {invoice.payment_info.bank_owner}
                </span>
                <span className="ml-4 font-bold text-red-600">
                  {invoice.payment_info.bank_name}
                </span>
              </div>

              <div className="text-center">
                <span>Trong đó: </span>
                <span className="font-bold">
                  {invoice.contract.room.building.name}
                </span>
                <span> là tòa nhà </span>
                <span className="font-bold">
                  {invoice.contract.room.number_room}
                </span>
                <span> là số phòng </span>
                <span className="font-bold">{getCurrentMonth()}</span>
                <span> là tháng thanh toán</span>
              </div>

              {/* <div className="text-center font-bold">
                      BAN QUẢN LÝ XIN TRAO TẶNG 10.000.000 CHO MỖI TRƯỜNG HỢP
                      PHÁT HIỆN SAI PHẠM TRONG THU TIỀN KHÁCH HÀNG CỦA QUẢN LÝ
                      TÒA NHÀ.
                    </div> */}

              <div className="text-center">
                <span>Phản ánh và thắc mắc xin liên hệ: Hotline: </span>
                <span className="font-bold">
                  {invoice.payment_info.hotline}
                </span>
              </div>

              <div className="mt-8 flex justify-between">
                <div className="text-center">
                  <div className="mb-2 text-lg font-bold">
                    BAN QUẢN LÝ{" "}
                    {invoice.contract.room.building.name.toUpperCase()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-lg font-bold">KHÁCH HÀNG</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-border flex items-center justify-end gap-3 border-t p-6">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors"
          >
            Đóng
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
  );
}
