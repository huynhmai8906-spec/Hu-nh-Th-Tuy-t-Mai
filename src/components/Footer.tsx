import React from 'react';
import { HeartPulse, ShieldCheck, Award, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onSelectPage: (page: PageId) => void;
  onOpenPitchDeck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectPage, onOpenPitchDeck }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                MediCare<span className="text-teal-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dự án khởi nghiệp công nghệ y tế (HealthTech) kết nối người bệnh với 100% điều dưỡng có chứng chỉ hành nghề được Bộ Y tế và Sở Y tế cấp phép.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-teal-950/60 border border-teal-800 text-teal-300 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bảo hiểm trách nhiệm nghề nghiệp 1 Tỷ VNĐ
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Điều Hướng 4 Trang Chính
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectPage('home')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Trang 1: Giới thiệu nhóm & Mô hình khởi nghiệp
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage('nurses')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Trang 2: Danh sách điều dưỡng có CCHN
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage('pricing')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Trang 3: Bảng giá & Khảo sát giá thị trường
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage('nurse-portal')}
                  className="hover:text-teal-400 transition-colors cursor-pointer text-left"
                >
                  Trang 4: Cổng điều dưỡng (Đăng nhập Gmail)
                </button>
              </li>
            </ul>
          </div>

          {/* Startup Pitch & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Dự Án Khởi Nghiệp 2026
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sản phẩm dự thi chương trình Khởi Nghiệp Đổi Mới Sáng Tạo Y Tế & Chuyển Đổi Số Quốc Gia.
            </p>
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
            >
              <span>Xem tài liệu Pitch Deck & Unit Economics</span>
              <ExternalLink className="w-3 h-3" />
            </button>
            <div className="text-[11px] text-slate-400 pt-1">
              Quy trình kiểm soát vô khuẩn nghiêm ngặt theo Hướng dẫn kiểm soát nhiễm khuẩn của Bộ Y Tế.
            </div>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ Trực 24/7
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="text-white font-semibold">1900 8989</span>
                <span className="text-[10px] text-slate-400">(Miễn cước trực cấp cứu)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>hotro@medicareconnect.vn</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Tòa nhà Đổi Mới Sáng Tạo Y Dược, 217 Hồng Bàng, Quận 5, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimers */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© 2026 MediCare Connect. Bảo lưu mọi bản quyền. Nền tảng kết nối y tế bên thứ ba.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Tuân thủ Luật Khám bệnh, chữa bệnh 2023</span>
            <span>•</span>
            <span>Bảo mật dữ liệu bệnh án theo chuẩn HIPAA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
