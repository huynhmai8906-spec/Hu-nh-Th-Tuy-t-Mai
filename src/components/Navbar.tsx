import React, { useState } from 'react';
import { PageId } from '../types';
import { HeartPulse, Users, DollarSign, Stethoscope, Award, Phone, LogIn, LogOut, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  onOpenPitchDeck: () => void;
  loggedNurseEmail: string | null;
  onLogoutNurse: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onSelectPage,
  onOpenPitchDeck,
  loggedNurseEmail,
  onLogoutNurse,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: '1. Giới Thiệu Nhóm & Dự Án', icon: HeartPulse },
    { id: 'nurses', label: '2. Chọn Điều Dưỡng Chứng Chỉ', icon: Users, badge: '100% CCHN' },
    { id: 'pricing', label: '3. Giá & Khảo Sát Thị Trường', icon: DollarSign, badge: 'Minh bạch' },
    { id: 'nurse-portal', label: '4. Cổng Điều Dưỡng (Gmail)', icon: Stethoscope, badge: loggedNurseEmail ? 'Đã đăng nhập' : 'Yêu cầu Gmail' },
  ];

  const handleNavClick = (page: PageId) => {
    onSelectPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for Startup Pitch announcement & emergency */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white text-[12px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wide">
              Khởi Nghiệp 2026
            </span>
            <span className="hidden sm:inline text-teal-100">
              Dự án Nền tảng bên thứ ba kết nối Điều Dưỡng Chứng Chỉ & Quản Lý Sinh Tồn Bệnh Nhân
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-bold underline transition-colors cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              Xem Bảng Thuyết Trình Pitch Deck
            </button>
            <span className="text-teal-400/60 hidden md:inline">|</span>
            <a
              href="tel:19008989"
              className="hidden md:flex items-center gap-1 text-teal-100 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              Hotline 24/7: 1900 8989
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  MediCare<span className="text-teal-600">Connect</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  <ShieldCheck className="w-3 h-3 text-teal-600" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Nền tảng Điều Dưỡng Chứng Chỉ Y Tế
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action / Nurse Gmail status */}
          <div className="hidden sm:flex items-center gap-3">
            {loggedNurseEmail ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 pl-3 pr-2 py-1.5 rounded-xl text-xs text-emerald-900">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="max-w-[130px] truncate font-medium">{loggedNurseEmail}</span>
                <button
                  onClick={onLogoutNurse}
                  title="Đăng xuất Gmail"
                  className="p-1 rounded-md text-emerald-700 hover:text-rose-600 hover:bg-emerald-100 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('nurse-portal')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all cursor-pointer shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-600" />
                Đăng Nhập Gmail Điều Dưỡng
              </button>
            )}

            <button
              onClick={() => handleNavClick('nurses')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm shadow-teal-600/20 transition-all cursor-pointer"
            >
              Đặt Điều Dưỡng Ngay
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPitchDeck();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 px-3 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-600" />
              Xem Thuyết Trình Khởi Nghiệp (Pitch Deck)
            </button>

            {loggedNurseEmail ? (
              <div className="flex items-center justify-between bg-emerald-50 p-2.5 rounded-lg text-xs text-emerald-900 border border-emerald-200">
                <span>Đang trực: {loggedNurseEmail}</span>
                <button
                  onClick={onLogoutNurse}
                  className="font-bold text-rose-600 hover:underline flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('nurse-portal')}
                className="w-full text-center py-2 px-3 text-xs font-bold text-teal-800 bg-teal-50 rounded-lg border border-teal-200 flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-teal-600" />
                Đăng Nhập Gmail Điều Dưỡng
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
