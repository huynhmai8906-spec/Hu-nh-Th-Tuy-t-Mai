import React, { useState } from 'react';
import { MARKET_PRICE_BENCHMARKS } from '../data/mockData';
import { PageId } from '../types';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

interface PricingPageProps {
  onSelectPage: (page: PageId) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onSelectPage }) => {
  // Interactive Calculator State
  const [calcService, setCalcService] = useState<'4h' | '8h' | '12h' | '24h'>('8h');
  const [calcDays, setCalcDays] = useState<number>(7);
  const [includeWoundDressing, setIncludeWoundDressing] = useState<boolean>(true);
  const [includeSondeSupplies, setIncludeSondeSupplies] = useState<boolean>(false);

  const getBaseRate = () => {
    switch (calcService) {
      case '4h':
        return 400000;
      case '8h':
        return 720000;
      case '12h':
        return 920000;
      case '24h':
        return 1450000;
    }
  };

  const baseRate = getBaseRate();
  const subtotal = baseRate * calcDays;
  const suppliesCost = (includeWoundDressing ? 50000 * calcDays : 0) + (includeSondeSupplies ? 40000 * calcDays : 0);
  // Discount 5% for >= 7 days, 10% for >= 14 days, 15% for >= 30 days
  const discountRate = calcDays >= 30 ? 0.15 : calcDays >= 14 ? 0.1 : calcDays >= 7 ? 0.05 : 0;
  const discountAmount = subtotal * discountRate;
  const totalEstimated = subtotal - discountAmount + suppliesCost;

  // Comparison with black market estimate
  const marketEstimated = (baseRate * 1.2) * calcDays + suppliesCost;
  const savedAmount = Math.max(0, marketEstimated - totalEstimated);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header with Market Research Intro */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/30 text-xs font-bold uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-300" />
          Báo Cáo Nghiên Cứu Giá Thị Trường Y Tế Tại Gia 2026
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          Bảng Giá Chuẩn Hóa & Khảo Sát Giá Thị Trường
        </h1>
        <p className="text-sm sm:text-base text-teal-100 max-w-3xl leading-relaxed">
          Chúng tôi đã tiến hành khảo sát thực tế tại hơn <strong>120 hộ gia đình và 15 cơ sở y tế</strong> tại TP. Hồ Chí Minh và Hà Nội để xây dựng khung giá chuẩn mực, chấm dứt tình trạng loạn giá, tăng giá ban đêm và các chi phí phát sinh vô lý.
        </p>
      </div>

      {/* Market Research Findings Box */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Thực Trạng Khảo Sát Thị Trường Điều Dưỡng & Chăm Sóc Tại Gia Tại Việt Nam</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 pt-1">
          <div className="p-3 bg-white rounded-xl border border-amber-100">
            <strong className="text-slate-900 block mb-1">1. Biên độ dao động quá lớn (40% - 60%):</strong>
            Giá ca trực 8h ban ngày trôi nổi từ 600.000đ đến 1.000.000đ tùy thuộc vào khả năng thương lượng của gia đình, thường bị ép giá khi bệnh nhân rơi vào tình trạng cấp bách xuất viện.
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-100">
            <strong className="text-slate-900 block mb-1">2. Chi phí ẩn và tiền "bồi dưỡng":</strong>
            Trên 78% gia đình cho biết người chăm sóc tự do thường đòi hỏi thêm tiền ăn uống, tiền hỗ trợ đêm, hoặc tiền tip ngoài mức giá đã thỏa thuận ban đầu.
          </div>
          <div className="p-3 bg-white rounded-xl border border-amber-100">
            <strong className="text-slate-900 block mb-1">3. Không có bảo hiểm rủi ro:</strong>
            Nếu xảy ra sự cố nghẹn sonde, loét nhiễm trùng hay trộm cắp tài sản, các trung tâm môi giới truyền thống hoàn toàn phủi trách nhiệm vì không có hợp đồng pháp lý.
          </div>
        </div>
      </div>

      {/* Standard Market Comparison Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Bảng So Sánh Chi Tiết Các Mô Hình Chăm Sóc Trên Thị Trường
            </h2>
            <p className="text-xs text-slate-500">
              Đối chiếu trực tiếp giữa Cò mồi tự do, Giúp việc gia đình, Bệnh viện tư và MediCare Connect
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0">
            Cập nhật thị trường Quý III / 2026
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="p-4 min-w-[200px]">Tiêu Chí Đánh Giá</th>
                <th className="p-4 min-w-[170px] text-rose-700 bg-rose-50/40">
                  Người Nuôi Bệnh / Cò Mồi Tự Do
                </th>
                <th className="p-4 min-w-[170px] text-amber-800 bg-amber-50/40">
                  Trung Tâm Giúp Việc Gia Đình
                </th>
                <th className="p-4 min-w-[170px] text-blue-800 bg-blue-50/40">
                  Dịch Vụ Bệnh Viện Tư Nhân
                </th>
                <th className="p-4 min-w-[200px] text-teal-900 bg-teal-50 font-extrabold border-l-2 border-teal-500">
                  Nền Tảng MediCare Connect
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-600">
              <tr>
                <td className="p-4 font-semibold text-slate-900">Chứng chỉ hành nghề (CCHN)</td>
                <td className="p-4 text-rose-600 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 shrink-0" /> Không có, tự học việc
                </td>
                <td className="p-4 text-rose-600">
                  <span className="flex items-center gap-1.5"><XCircle className="w-4 h-4 shrink-0" /> Không có kỹ năng y tế</span>
                </td>
                <td className="p-4 text-emerald-600">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 shrink-0" /> Có chứng chỉ BV</span>
                </td>
                <td className="p-4 bg-teal-50/50 font-bold text-teal-900 border-l-2 border-teal-500">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    100% CCHN Bộ/Sở Y Tế đối soát
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900">Giá ca trực 8h ban ngày</td>
                <td className="p-4 text-slate-800">
                  650.000 - 900.000 đ
                  <span className="block text-[10px] text-rose-500">+ đòi tiền bồi dưỡng</span>
                </td>
                <td className="p-4 text-slate-800">
                  500.000 - 650.000 đ
                  <span className="block text-[10px] text-slate-400">(chỉ dọn dẹp, nấu ăn)</span>
                </td>
                <td className="p-4 text-slate-800">
                  1.800.000 - 2.500.000 đ
                  <span className="block text-[10px] text-slate-400">Rất đắt đỏ</span>
                </td>
                <td className="p-4 bg-teal-50/50 font-black text-teal-800 text-sm border-l-2 border-teal-500">
                  720.000 đ / ca
                  <span className="block text-[10px] font-normal text-emerald-700">Giá trọn gói, không phí ẩn</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900">Ca trực đêm 12h</td>
                <td className="p-4 text-slate-800">
                  850.000 - 1.200.000 đ
                  <span className="block text-[10px] text-rose-500">Thường ngủ say, ít trở mình</span>
                </td>
                <td className="p-4 text-rose-600">
                  Không hỗ trợ y tế đêm
                </td>
                <td className="p-4 text-slate-800">
                  2.200.000 - 3.200.000 đ
                </td>
                <td className="p-4 bg-teal-50/50 font-black text-teal-800 border-l-2 border-teal-500">
                  920.000 đ / ca
                  <span className="block text-[10px] font-normal text-emerald-700">Túc trực, trở mình 2h/lần</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900">Thực hiện thủ thuật Sonde/Vết loét</td>
                <td className="p-4 text-rose-600">
                  Rất nguy hiểm (nguy cơ sặc phổi)
                </td>
                <td className="p-4 text-rose-600">
                  Không được phép làm
                </td>
                <td className="p-4 text-emerald-600">
                  Có (phụ phí cao)
                </td>
                <td className="p-4 bg-teal-50/50 font-bold text-teal-900 border-l-2 border-teal-500">
                  Chuẩn quy trình vô khuẩn Bộ Y Tế
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900">Số hóa chỉ số sinh tồn & Cảnh báo</td>
                <td className="p-4 text-rose-600">
                  Không có
                </td>
                <td className="p-4 text-rose-600">
                  Không có
                </td>
                <td className="p-4 text-slate-600">
                  Ghi sổ giấy tại viện
                </td>
                <td className="p-4 bg-teal-50/50 font-bold text-teal-900 border-l-2 border-teal-500">
                  <span className="text-emerald-700">Nhập portal hàng ngày, tự cảnh báo</span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900">Bảo hiểm trách nhiệm bồi thường</td>
                <td className="p-4 text-rose-600">0 VNĐ (tự chịu rủi ro)</td>
                <td className="p-4 text-rose-600">0 VNĐ</td>
                <td className="p-4 text-slate-600">Theo quy định bệnh viện</td>
                <td className="p-4 bg-teal-50/50 font-bold text-emerald-700 border-l-2 border-teal-500">
                  Bảo hiểm 1 Tỷ VNĐ / ca trực
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Benchmarks Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">
          Khung Giá Chi Tiết Theo Từng Loại Ca Trực
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKET_PRICE_BENCHMARKS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-teal-700">{item.category}</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {item.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.serviceName}
                </h3>

                {/* Price Display */}
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-500 block">Giá MediCare:</span>
                      <span className="text-2xl font-black text-teal-800">
                        {item.platformPrice.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-[11px] text-slate-500"> /{item.unit.split('/')[1] || 'ca'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-400 block">Trung bình thị trường:</span>
                      <span className="text-xs font-semibold text-slate-500 line-through">
                        {item.marketAverage.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="block text-[10px] font-bold text-emerald-600">
                        Tiết kiệm {(item.marketAverage - item.platformPrice).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Included Benefits */}
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                  <span className="text-[11px] font-bold text-slate-700 block">Quyền lợi cam kết:</span>
                  {item.includedBenefits.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectPage('nurses')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Xem điều dưỡng nhận ca này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cost Estimator (Công Cụ Tính Giá Tự Động) */}
      <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span>Công Cụ Dự Toán Chi Phí Tự Động</span>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Ước Tính Chi Phí Ca Trực Theo Nhu Cầu Của Bạn
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            Chọn loại ca trực và số ngày chăm sóc để nhận mức giá minh bạch, đã áp dụng chính sách giảm giá dài ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
            {/* Service Type */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase mb-2">
                1. Loại ca trực:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: '4h', label: 'Ca 4h', rate: 400000 },
                  { id: '8h', label: 'Ca 8h (Hành chính)', rate: 720000 },
                  { id: '12h', label: 'Ca đêm 12h', rate: 920000 },
                  { id: '24h', label: 'Ca 24/24', rate: 1450000 },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCalcService(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      calcService === s.id
                        ? 'border-teal-400 bg-teal-600/30 text-white ring-1 ring-teal-400 font-bold'
                        : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <div>{s.label}</div>
                    <div className="text-[11px] text-teal-300 mt-1">
                      {s.rate.toLocaleString('vi-VN')} đ
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Days Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-teal-200 uppercase">2. Số ngày chăm sóc liên tiếp:</span>
                <span className="font-black text-white text-base bg-teal-800 px-3 py-0.5 rounded-lg border border-teal-600">
                  {calcDays} ngày
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={calcDays}
                onChange={(e) => setCalcDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>1 ngày (thử nghiệm)</span>
                <span>7 ngày (giảm 5%)</span>
                <span>14 ngày (giảm 10%)</span>
                <span>30 ngày (giảm 15%)</span>
              </div>
            </div>

            {/* Supplies Addons */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase mb-2">
                3. Tùy chọn kit vật tư y tế vô khuẩn:
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeWoundDressing}
                    onChange={(e) => setIncludeWoundDressing(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-500 accent-teal-500"
                  />
                  <span>Kit gạc vô khuẩn, nước muối sinh lý & thuốc rửa vết thương (+50.000 đ/ngày)</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/60 border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSondeSupplies}
                    onChange={(e) => setIncludeSondeSupplies(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-500 accent-teal-500"
                  />
                  <span>Dây ăn sonde & bơm tiêm cho ăn vô trùng định kỳ (+40.000 đ/ngày)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-teal-900/90 to-cyan-950/90 p-6 rounded-2xl border border-teal-500/40 shadow-xl space-y-5">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
              Tổng Hợp Báo Giá Dự Kiến
            </div>

            <div className="space-y-2 text-xs text-slate-300 pb-3 border-b border-teal-800">
              <div className="flex justify-between">
                <span>Đơn giá ca trực ({calcDays} ngày):</span>
                <span className="font-semibold text-white">{subtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-300">
                  <span>Ưu đãi gói {calcDays} ngày (-{(discountRate * 100)}%):</span>
                  <span className="font-semibold">-{discountAmount.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              {suppliesCost > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Kit vật tư tiêu hao:</span>
                  <span className="font-semibold text-white">+{suppliesCost.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
            </div>

            <div>
              <div className="text-xs text-teal-200">Tổng chi phí thanh toán trọn gói:</div>
              <div className="text-3xl font-black text-white mt-1">
                {totalEstimated.toLocaleString('vi-VN')} <span className="text-base font-bold text-teal-300">VNĐ</span>
              </div>
              {savedAmount > 0 && (
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md mt-2 border border-emerald-700/50">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Tiết kiệm ước tính ~{savedAmount.toLocaleString('vi-VN')} đ so với thuê tự do
                </div>
              )}
            </div>

            <div className="text-[11px] text-teal-100/80 space-y-1">
              <div>✓ Bao gồm bảo hiểm trách nhiệm y tế 1 tỷ VNĐ</div>
              <div>✓ Bao gồm nhật ký đo chỉ số sinh tồn điện tử mỗi ngày</div>
              <div>✓ Không thu thêm bất kỳ phụ phí ăn uống hay tiền bo</div>
            </div>

            <button
              onClick={() => onSelectPage('nurses')}
              className="w-full py-3.5 rounded-xl font-extrabold text-sm bg-teal-400 text-slate-950 hover:bg-teal-300 shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chọn Điều Dưỡng Nhận Ca Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
