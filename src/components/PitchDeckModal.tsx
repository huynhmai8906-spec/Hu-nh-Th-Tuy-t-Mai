import React, { useState } from 'react';
import { X, Award, TrendingUp, Users, ShieldAlert, Cpu, Heart, CheckCircle2, DollarSign, Target } from 'lucide-react';
import { STARTUP_METRICS } from '../data/mockData';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'problem-solution' | 'market' | 'business-model' | 'tech-moat' | 'impact'>('problem-solution');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-3 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Pitch Deck Header */}
        <div className="bg-gradient-to-r from-teal-800 via-cyan-900 to-slate-900 text-white p-6 shrink-0 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Startup Pitch Deck • Cuộc Thi Khởi Nghiệp Quốc Gia 2026
            </div>
            <h2 className="text-2xl font-black text-white">
              MediCare Connect: Chuẩn Hóa Chăm Sóc Y Tế Gia Đình Bằng Nền Tảng Bên Thứ Ba
            </h2>
            <p className="text-sm text-teal-200 mt-1 max-w-2xl">
              Giải pháp đột phá kết nối trực tiếp bệnh nhân với 100% điều dưỡng có chứng chỉ hành nghề, số hóa nhật ký sinh tồn và minh bạch giá thị trường.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto text-sm shrink-0">
          {[
            { id: 'problem-solution', label: '1. Vấn Đề & Giải Pháp', icon: Target },
            { id: 'market', label: '2. Quy Mô Thị Trường (TAM)', icon: TrendingUp },
            { id: 'business-model', label: '3. Mô Hình Doanh Thu & Giá', icon: DollarSign },
            { id: 'tech-moat', label: '4. Lợi Thế Công Nghệ', icon: Cpu },
            { id: 'impact', label: '5. Tác Động Xã Hội & Đội Ngũ', icon: Heart },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-3 font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'border-teal-600 text-teal-700 bg-white'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {activeTab === 'problem-solution' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Problem */}
                <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-rose-700 font-bold mb-3">
                    <ShieldAlert className="w-5 h-5" />
                    <span>NỖI ĐAU THỊ TRƯỜNG (THE PAIN POINTS)</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                      <span><strong>Nạn "Cò mồi" y tế & giúp việc giả danh:</strong> Người nhà trả tiền cao nhưng nhận người chăm sóc không có chứng chỉ y khoa, gây biến chứng tụt huyết áp, sặc sonde dạ dày, loét mục xương.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                      <span><strong>Giá cả mập mờ, bị ép giá:</strong> Chi phí tự phát, tăng vọt 200-300% vào ban đêm hay ngày lễ tết mà không có hợp đồng cam kết.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                      <span><strong>Mất kết nối thông tin lâm sàng:</strong> Bác sĩ điều trị ở bệnh viện hoàn toàn "mù" thông tin chỉ số sinh tồn của bệnh nhân sau khi xuất viện về nhà.</span>
                    </li>
                  </ul>
                </div>

                {/* Solution */}
                <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 text-teal-800 font-bold mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>GIẢI PHÁP MEDICARE CONNECT</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                      <span><strong>100% Điều dưỡng có Chứng Chỉ Hành Nghề (CCHN):</strong> Tra cứu trực tiếp cơ sở dữ liệu Cục Quản lý Khám Chữa bệnh Bộ Y Tế trước khi duyệt hồ sơ.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                      <span><strong>Minh bạch giá dựa trên chuẩn thị trường:</strong> Niêm yết bảng giá công khai, không phụ phí phát sinh, hợp đồng pháp lý rõ ràng.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-2 shrink-0"></span>
                      <span><strong>Cổng cập nhật chỉ số sinh tồn điện tử:</strong> Điều dưỡng ghi nhận huyết áp, SpO2, mạch, đường huyết sau mỗi ca trực, tự động cảnh báo bất thường đến người nhà.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Startup Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {STARTUP_METRICS.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
                    <div className="text-2xl font-black text-teal-700">{m.value}</div>
                    <div className="text-xs font-semibold text-slate-800 mt-1">{m.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'market' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Quy Mô Thị Trường Chăm Sóc Sức Khỏe Tại Gia Tại Việt Nam (2026 - 2030)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-xl">
                  <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">TAM (Tổng thị trường)</span>
                  <div className="text-2xl font-black text-teal-900 mt-1">2.4 Tỷ USD</div>
                  <p className="text-xs text-slate-600 mt-2">
                    Toàn bộ chi tiêu y tế tư nhân, dịch vụ điều dưỡng tại nhà và chăm sóc người cao tuổi tại Việt Nam (Tốc độ già hóa dân số nhanh hàng đầu thế giới).
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl">
                  <span className="text-xs font-bold text-cyan-800 uppercase tracking-wide">SAM (Thị trường khả dụng)</span>
                  <div className="text-2xl font-black text-cyan-900 mt-1">450 Triệu USD</div>
                  <p className="text-xs text-slate-600 mt-2">
                    Các gia đình có thu nhập trung bình khá trở lên tại các đô thị lớn (TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ) cần dịch vụ điều dưỡng có bằng cấp.
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">SOM (Mục tiêu 3 năm đầu)</span>
                  <div className="text-2xl font-black text-amber-900 mt-1">18 Triệu USD</div>
                  <p className="text-xs text-slate-600 mt-2">
                    Chiếm 4% thị phần đô thị lớn, vận hành 250.000 ca trực chất lượng cao với mạng lưới 3.500 điều dưỡng viên có CCHN được chuẩn hóa.
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                <h5 className="font-semibold text-slate-800 mb-1">Động lực thị trường vĩ mô (Macro Drivers):</h5>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Việt Nam đã chính thức bước vào giai đoạn già hóa dân số từ năm 2011 với hơn 12 triệu người cao tuổi, trong đó 70% mắc từ 2-3 bệnh mãn tính không lây (tăng huyết áp, đái tháo đường, tai biến). Song song, các bệnh viện công lập luôn trong tình trạng quá tải giường bệnh 120-150%, chính sách khuyến khích xuất viện sớm và chăm sóc điều dưỡng tại nhà theo Thông tư của Bộ Y Tế.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'business-model' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Mô Hình Doanh Thu Minh Bạch (Two-Sided Healthcare Platform)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
                  <div className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">1</span>
                    Take-rate Phí Nền Tảng (12% - 15%)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Nền tảng khấu trừ 12-15% trên mỗi ca trực hoàn thành để chi trả chi phí bảo hiểm trách nhiệm nghề nghiệp y tế, vận hành hệ thống xác thực CCHN và hỗ trợ tổng đài 24/7. Điều dưỡng nhận 85-88% thù lao trực tiếp, cao hơn 30% so với làm việc qua trung tâm môi giới truyền thống.
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
                  <div className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">2</span>
                    Gói Chăm Sóc Định Kỳ & Vật Tư Y Tế
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cung cấp gói tháng toàn diện (Subscription Care Plan) cho người tai biến hoặc người già sa sút trí tuệ kết hợp cung ứng bộ kit vật tư y tế vô khuẩn tiêu chuẩn (ống sonde, gạc vô trùng, dây truyền).
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
                  <div className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">3</span>
                    Hợp Tác B2B Bệnh Viện & Bảo Hiểm Y Tế Tư
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Liên kết với các bệnh viện tư nhân và công lập để cung cấp dịch vụ điều dưỡng xuất viện (Post-discharge Care), tích hợp thanh toán bảo hiểm sức khỏe thương mại (Bảo Việt, PVI, Manulife, Dai-ichi).
                  </p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl bg-white shadow-xs">
                  <div className="font-bold text-teal-800 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-black">4</span>
                    Đào Tạo Chứng Chỉ Chăm Sóc 5 Sao
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Khóa đào tạo nâng cao kỹ năng giao tiếp y khoa, xử lý tâm lý người cao tuổi và cập nhật phác đồ chăm sóc vết thương hiện đại.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tech-moat' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Rào Cản Cạnh Tranh & Lợi Thế Công Nghệ (Tech Moat)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-800 text-sm mb-1">Xác Thực CCHN Tự Động</div>
                  <p className="text-xs text-slate-600">
                    Hệ thống eKYC Y tế đối soát số CCHN, số CCCD và cơ sở đào tạo y khoa qua dữ liệu quản lý công khai, ngăn chặn triệt để bằng giả mạo.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-800 text-sm mb-1">Cảnh Báo Lâm Sàng Thông Minh</div>
                  <p className="text-xs text-slate-600">
                    Thuật toán tự động phát hiện huyết áp vượt ngưỡng nguy hiểm (HA {`>`} 140/90 hoặc tụt {`<`} 90), tụt SpO2 {`<`} 95% để đẩy cảnh báo khẩn đến thân nhân và bác sĩ.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="font-bold text-slate-800 text-sm mb-1">Đánh Giá Sao Sau Ca Trực</div>
                  <p className="text-xs text-slate-600">
                    Cơ chế xếp hạng và bình luận chỉ mở sau khi ca trực hoàn tất, chống đánh giá ảo, nâng cao văn hóa trách nhiệm và tôn vinh điều dưỡng có tâm.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">
                Tác Động Xã Hội & Đội Ngũ Sáng Lập
              </h4>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2 leading-relaxed">
                <p>
                  <strong>Ý nghĩa nhân văn & ESG:</strong> MediCare Connect không chỉ là một ứng dụng kết nối, mà là một sáng kiến giải quyết bài toán an sinh xã hội: giảm tải cho các bệnh viện tuyến đầu, tạo việc làm thu nhập cao và công bằng cho hàng ngàn cử nhân điều dưỡng, đồng thời trao cho người cao tuổi quyền được hưởng sự chăm sóc y tế chuẩn mực ngay tại chính ngôi nhà thân yêu của mình.
                </p>
                <p>
                  <strong>Kế hoạch gọi vốn Seed:</strong> Chúng tôi đang tìm kiếm 150.000 USD cho 10% cổ phần để mở rộng quy mô mạng lưới tại TP.HCM và Hà Nội, nâng cấp hệ thống kết nối cảm biến sinh tồn IoT và hoàn tất tích hợp bảo hiểm y tế tư nhân.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Dự án: <strong>MediCare Connect</strong> • Hồ sơ đăng ký dự thi Khởi Nghiệp
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            Đóng bảng trình chiếu
          </button>
        </div>
      </div>
    </div>
  );
};
