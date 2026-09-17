import React, { useState } from 'react';
import { Nurse, BookingRequest } from '../types';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, MapPin, AlertCircle, Phone, User } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurse: Nurse | null;
  onConfirmBooking: (booking: BookingRequest) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  nurse,
  onConfirmBooking,
}) => {
  const [patientName, setPatientName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [serviceType, setServiceType] = useState<'shift-4h' | 'shift-8h' | 'shift-12h-night' | 'shift-24h' | 'procedure'>('shift-8h');
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [durationDays, setDurationDays] = useState(1);
  const [patientCondition, setPatientCondition] = useState('');
  const [address, setAddress] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !nurse) return null;

  const calculateUnitRate = () => {
    switch (serviceType) {
      case 'shift-4h':
        return nurse.shift4hRate;
      case 'shift-8h':
        return nurse.shift8hRate;
      case 'shift-12h-night':
        return nurse.shift12hNightRate;
      case 'shift-24h':
        return nurse.shift24hRate;
      case 'procedure':
        return 220000;
      default:
        return nurse.shift8hRate;
    }
  };

  const unitRate = calculateUnitRate();
  const totalPrice = unitRate * durationDays;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setErrorMsg('Vui lòng nhập tên người bệnh.');
      return;
    }
    if (!contactPhone.trim()) {
      setErrorMsg('Vui lòng cung cấp số điện thoại liên hệ khẩn cấp.');
      return;
    }

    const booking: BookingRequest = {
      id: `bk-${Date.now()}`,
      nurseId: nurse.id,
      nurseName: nurse.fullName,
      patientName: patientName.trim(),
      contactPhone: contactPhone.trim(),
      serviceType: serviceType,
      startDate: startDate,
      durationDays: durationDays,
      totalPrice: totalPrice,
      notes: `${address ? `Địa chỉ: ${address}. ` : ''}${patientCondition}`,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    onConfirmBooking(booking);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-teal-200 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              Đặt lịch điều dưỡng có chứng chỉ
            </div>
            <h3 className="text-xl font-bold mt-1 text-white">
              Điều dưỡng {nurse.fullName}
            </h3>
            <p className="text-xs text-teal-100 mt-0.5">
              CCHN: {nurse.licenseNumber} • {nurse.education}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-teal-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">
              Đặt lịch ca trực thành công!
            </h4>
            <p className="text-slate-600 text-sm">
              Hệ thống MediCare Connect đã xác nhận yêu cầu của quý vị. Điều dưỡng viên {nurse.fullName} và điều phối viên y tế sẽ gọi xác nhận trong vòng 10 phút.
            </p>
            <div className="p-3 bg-teal-50 rounded-xl text-xs text-teal-800 font-medium">
              Mã hồ sơ ca trực: #MED-{Date.now().toString().slice(-6)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="p-6 space-y-4">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Chọn gói ca trực phù hợp
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'shift-4h', label: 'Ca 4h (Sáng/Chiều)', price: nurse.shift4hRate },
                  { id: 'shift-8h', label: 'Ca 8h (Hành chính)', price: nurse.shift8hRate },
                  { id: 'shift-12h-night', label: 'Ca đêm 12h', price: nurse.shift12hNightRate },
                  { id: 'shift-24h', label: 'Ca 24/24 trọn ngày', price: nurse.shift24hRate },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setServiceType(tier.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      serviceType === tier.id
                        ? 'border-teal-600 bg-teal-50/80 text-teal-950 font-semibold ring-1 ring-teal-500'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 text-slate-700'
                    }`}
                  >
                    <div className="font-medium">{tier.label}</div>
                    <div className="text-teal-700 font-bold mt-0.5">
                      {tier.price.toLocaleString('vi-VN')} đ
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ tên người bệnh <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Ví dụ: Cụ Trần Văn Đức"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số điện thoại thân nhân <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="0908 xxx xxx"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>

            {/* Date & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ngày bắt đầu ca
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số ngày cần chăm sóc
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value={1}>1 ca (Dùng thử / khẩn cấp)</option>
                    <option value={3}>3 ngày liên tiếp</option>
                    <option value={7}>7 ngày (1 tuần theo dõi)</option>
                    <option value={14}>14 ngày (Hồi phục hậu phẫu)</option>
                    <option value={30}>30 ngày (Gói tháng tiết kiệm)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Địa chỉ chăm sóc (Nhà riêng hoặc Khoa phòng Bệnh viện)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ví dụ: 124 Nguyễn Đình Chiểu, P. Võ Thị Sáu, Q.3, TP.HCM"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tình trạng bệnh & Y lệnh cần lưu ý
              </label>
              <textarea
                value={patientCondition}
                onChange={(e) => setPatientCondition(e.target.value)}
                rows={2}
                placeholder="Ví dụ: Bệnh nhân tai biến có đặt sonde ăn, có loét vùng mông cần thay băng vô khuẩn..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Summary Price */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Tổng chi phí dự kiến</span>
                <span className="text-xs text-emerald-700 font-medium">
                  {unitRate.toLocaleString('vi-VN')} đ × {durationDays} ngày
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-extrabold text-teal-800">
                  {totalPrice.toLocaleString('vi-VN')} đ
                </span>
                <span className="block text-[11px] text-slate-400">Minh bạch 100%, không phí ẩn</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Xác nhận đặt lịch
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
