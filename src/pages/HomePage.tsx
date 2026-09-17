import React from 'react';
import { PageId } from '../types';
import { FOUNDING_TEAM, STARTUP_METRICS } from '../data/mockData';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Stethoscope,
  HeartPulse,
  Activity,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Lock,
  Star,
  Clock,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  onSelectPage: (page: PageId) => void;
  onOpenPitchDeck: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectPage, onOpenPitchDeck }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-slate-900 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Subtle Grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Dự Án Khởi Nghiệp Y Tế Số • National HealthTech Startup 2026</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Nền Tảng Bên Thứ 3 Kết Nối{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-emerald-300">
                  Điều Dưỡng Có Chứng Chỉ
                </span>{' '}
                Với Người Bệnh Tại Gia
              </h1>

              <p className="text-base sm:text-lg text-teal-100 max-w-2xl leading-relaxed">
                Giải quyết triệt để nỗi lo "cò mồi" y tế và người chăm sóc không bằng cấp. 
                <strong className="text-white font-semibold"> MediCare Connect</strong> thẩm định 100% Chứng Chỉ Hành Nghề (CCHN) do Bộ Y Tế & Sở Y Tế cấp, minh bạch giá theo chuẩn thị trường và số hóa chỉ số sinh tồn theo dõi bệnh nhân mỗi ngày.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectPage('nurses')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-teal-400 text-slate-950 hover:bg-teal-300 shadow-lg shadow-teal-500/25 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Users className="w-4 h-4" />
                  <span>Chọn Điều Dưỡng Đã Thẩm Định</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectPage('pricing')}
                  className="px-5 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/20 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <TrendingUp className="w-4 h-4 text-cyan-300" />
                  <span>Xem Khảo Sát Giá Thị Trường</span>
                </button>

                <button
                  onClick={onOpenPitchDeck}
                  className="px-4 py-3.5 rounded-xl font-bold text-xs bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Hồ Sơ Pitch Dự Thi</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-teal-700/60 text-xs text-teal-200">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% CCHN Bộ/Sở Y Tế</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Bảo hiểm trách nhiệm 1 Tỷ</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Báo cáo sinh tồn hàng ngày</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-teal-500/30 shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                      Ca Trực Đang Diễn Ra
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">TP. Hồ Chí Minh</span>
                </div>

                {/* Patient Case Snippet */}
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Bệnh nhân: Cụ Trần Văn Đức (76 tuổi)</div>
                      <div className="text-xs text-slate-400">Chẩn đoán: Hậu phẫu tai biến • Liệt nửa người</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-900 text-teal-300 border border-teal-700">
                      Ca 12h Đêm
                    </span>
                  </div>

                  {/* Real-time Vitals snippet */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <div className="text-[10px] text-slate-400">Huyết áp (BP)</div>
                      <div className="text-sm font-black text-emerald-400">125/78</div>
                      <div className="text-[9px] text-emerald-300">mmHg (Chuẩn)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <div className="text-[10px] text-slate-400">SpO2</div>
                      <div className="text-sm font-black text-cyan-400">98%</div>
                      <div className="text-[9px] text-cyan-300">Bình thường</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <div className="text-[10px] text-slate-400">Mạch đập</div>
                      <div className="text-sm font-black text-teal-400">74 bpm</div>
                      <div className="text-[9px] text-teal-300">Đều, rõ</div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/60">
                    <span className="font-semibold text-teal-300">Ghi chú ĐD Dung:</span> Đã thay băng vết loét vùng cụt bằng gạc Prontosan vô khuẩn lúc 14h30. Cho ăn sonde 300ml súp xay, tiêu hóa tốt.
                  </div>
                </div>

                {/* Nurse Mini Info */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1594824813580-4824208a55e1?w=100&auto=format&fit=crop&q=80"
                      alt="Nurse"
                      className="w-10 h-10 rounded-full object-cover border-2 border-teal-400"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        ĐD. Trần Thị Mỹ Dung
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-slate-400">9 năm Hồi sức BV Chợ Rẫy</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.95 (38 đánh giá)</span>
                    </div>
                    <span className="text-[10px] text-slate-400">142 ca trực an toàn</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Highlights Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STARTUP_METRICS.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-teal-700">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                {item.label}
              </div>
              <div className="text-[11px] text-slate-500 max-w-xs mx-auto">
                {item.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why MediCare Connect: The Problem & Solution for Startup Competition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5" />
            Mô Hình Nền Tảng Bên Thứ Ba Khách Quan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tại Sao Cần Một Bên Thứ Ba Thẩm Định Điều Dưỡng?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hàng ngàn gia đình tại Việt Nam mỗi ngày đang phải đánh cược tính mạng người thân khi thuê người chăm sóc không bằng cấp qua mạng xã hội hoặc dịch vụ môi giới mập mờ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              1. Thẩm Định 100% Bằng Cấp & CCHN
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mỗi điều dưỡng trên nền tảng đều phải có Bằng Cử nhân/Cao đẳng Điều dưỡng chính quy và Chứng chỉ hành nghề do Bộ Y Tế hoặc Sở Y Tế cấp. Quy trình eKYC đối soát trực tiếp với cơ sở dữ liệu y tế quốc gia.
            </p>
            <div className="text-xs text-teal-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              Nói KHÔNG với người giúp việc mạo danh
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              2. Minh Bạch Giá Thị Trường
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nghiên cứu và chuẩn hóa đơn giá theo từng ca (4h, 8h, 12h đêm, 24/24) và thủ thuật y tế. Không tăng giá đột biến vào ban đêm, không đòi tiền bồi dưỡng ngoài hợp đồng.
            </p>
            <div className="text-xs text-cyan-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              Tiết kiệm 25% so với thuê lẻ tự do
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              3. Số Hóa Chỉ Số Sinh Tồn Hàng Ngày
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Điều dưỡng bắt buộc đăng nhập bằng Gmail vào Cổng thông tin lâm sàng để nhập Huyết áp, SpO2, Mạch, Đường huyết, Nhiệt độ và hình ảnh vết thương. Gia đình xem báo cáo trực tiếp mọi lúc, mọi nơi.
            </p>
            <div className="text-xs text-amber-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-amber-600" />
              Tự động cảnh báo huyết áp, tụt SpO2
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Verification Workflow */}
      <section className="bg-slate-100 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              Tiêu chuẩn nghiêm ngặt
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Quy Trình 4 Bước Thẩm Định Điều Dưỡng Viên
            </h2>
            <p className="text-slate-600 text-sm">
              Chỉ 18% ứng viên đạt tiêu chuẩn sau khi trải qua kỳ thẩm định năng lực lâm sàng của hội đồng y khoa MediCare Connect.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Thẩm định hồ sơ & CCHN',
                desc: 'Xác thực bản gốc Bằng cử nhân y khoa và số hiệu Chứng chỉ hành nghề trên Cổng thông tin Bộ Y Tế.',
              },
              {
                step: '02',
                title: 'Kiểm tra kỹ năng lâm sàng',
                desc: 'Thi thực hành trực tiếp: đặt sonde dạ dày, sonde tiểu, hút đờm sâu và xử lý vô khuẩn vết loét hoại tử.',
              },
              {
                step: '03',
                title: 'Xác minh lý lịch tư pháp',
                desc: 'Tra cứu phiếu lý lịch tư pháp số 2, cam kết bảo mật thông tin gia đình và đạo đức nghề y.',
              },
              {
                step: '04',
                title: 'Tập huấn chuẩn chăm sóc 5 sao',
                desc: 'Đào tạo kỹ năng giao tiếp y khoa, sơ cứu khẩn cấp BLS/ACLS và vận hành ứng dụng ghi nhận chỉ số sinh tồn.',
              },
            ].map((stepItem, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 relative">
                <div className="text-3xl font-black text-teal-600/30 mb-2">
                  {stepItem.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {stepItem.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {stepItem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Team Section (Đội Ngũ Sáng Lập Cho Cuộc Thi Khởi Nghiệp) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
            <Users className="w-3.5 h-3.5" />
            Đội Ngũ Sáng Lập & Hội Đồng Cố Vấn
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Những Bác Sĩ & Chuyên Gia Tạo Nên MediCare Connect
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Sự kết hợp giữa chuyên gia y tế lâm sàng tuyến đầu, điều dưỡng trưởng giàu kinh nghiệm và kỹ sư công nghệ y tế số.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUNDING_TEAM.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="px-2 py-1 rounded-md bg-slate-900/80 text-white text-[11px] font-semibold backdrop-blur-xs">
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    {member.name}
                  </h4>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {member.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {member.experience}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] italic text-slate-500">
                  "{member.quote}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review & Feedback Feature Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white text-left relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              Minh Bạch & Khách Quan
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Tính Năng Đánh Giá Sao & Bình Luận Sau Mỗi Ca Trực
            </h3>
            <p className="text-sm text-teal-100 leading-relaxed">
              Mỗi thân nhân và bệnh nhân sau ca trực đều được chấm điểm sao theo 3 tiêu chí: Chuyên môn vô khuẩn, Thái độ tận tâm, Đúng giờ tác phong. Hệ thống chống đánh giá ảo, đảm bảo điều dưỡng có y đức luôn được tôn vinh.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectPage('nurses')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-teal-50 transition-colors cursor-pointer"
              >
                Xem 128+ Đánh Giá Thực Tế Của Điều Dưỡng
              </button>
              <button
                onClick={() => onSelectPage('nurse-portal')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-700/80 hover:bg-teal-600 text-white border border-teal-500/50 transition-colors cursor-pointer"
              >
                Trang Cập Nhật Sinh Tồn Điều Dưỡng
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Sẵn Sàng Trải Nghiệm Chăm Sóc Y Tế Chuẩn Mực?
        </h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Để lại nỗi lo lắng về người chăm sóc không chứng chỉ. Kết nối ngay với điều dưỡng viên chính quy chỉ trong vài phút.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onSelectPage('nurses')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all cursor-pointer"
          >
            Tìm Điều Dưỡng Ngay
          </button>
          <button
            onClick={() => onSelectPage('pricing')}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer"
          >
            Tra Cứu Bảng Giá
          </button>
        </div>
      </section>
    </div>
  );
};
