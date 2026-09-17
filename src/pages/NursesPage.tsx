import React, { useState, useMemo } from 'react';
import { Nurse, Review, BookingRequest } from '../types';
import { StarRating } from '../components/StarRating';
import { BookingModal } from '../components/BookingModal';
import { ReviewModal } from '../components/ReviewModal';
import {
  ShieldCheck,
  Search,
  Filter,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  MessageSquarePlus,
  ChevronRight,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

interface NursesPageProps {
  nurses: Nurse[];
  onBookNurse: (booking: BookingRequest) => void;
  onSubmitReview: (nurseId: string, review: Review) => void;
}

export const NursesPage: React.FC<NursesPageProps> = ({
  nurses,
  onBookNurse,
  onSubmitReview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'price-asc'>('rating');

  // Modals state
  const [selectedNurseForBooking, setSelectedNurseForBooking] = useState<Nurse | null>(null);
  const [selectedNurseForReview, setSelectedNurseForReview] = useState<Nurse | null>(null);
  const [viewingDetailNurse, setViewingDetailNurse] = useState<Nurse | null>(null);

  const filteredNurses = useMemo(() => {
    return nurses
      .filter((nurse) => {
        // City filter
        if (selectedCity !== 'all' && nurse.city !== selectedCity) return false;

        // Specialty filter
        if (selectedSpecialty !== 'all') {
          const match = nurse.specialties.some((s) =>
            s.toLowerCase().includes(selectedSpecialty.toLowerCase())
          );
          if (!match) return false;
        }

        // Search
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = nurse.fullName.toLowerCase().includes(query);
          const matchSkill = nurse.skills.some((s) => s.toLowerCase().includes(query));
          const matchSpec = nurse.specialties.some((s) => s.toLowerCase().includes(query));
          const matchHospital = nurse.hospitalAffiliation.toLowerCase().includes(query);
          const matchLicense = nurse.licenseNumber.toLowerCase().includes(query);
          if (!matchName && !matchSkill && !matchSpec && !matchHospital && !matchLicense) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
        if (sortBy === 'price-asc') return a.shift8hRate - b.shift8hRate;
        return 0;
      });
  }, [nurses, searchQuery, selectedCity, selectedSpecialty, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-teal-800 to-cyan-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 border border-teal-400/40 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            100% Điều Dưỡng Đã Thẩm Định Chứng Chỉ Hành Nghề (CCHN)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Danh Sách Điều Dưỡng Chuyên Nghiệp Để Bệnh Nhân Chọn
          </h1>
          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            Tra cứu công khai số hiệu CCHN, bằng cấp y khoa, kinh nghiệm hồi sức tại các bệnh viện lớn (Chợ Rẫy, Bạch Mai, Việt Đức, Từ Dũ). Đặt lịch nhanh chóng và viết đánh giá sao sau mỗi ca trực.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên điều dưỡng, bệnh viện, kỹ thuật (đặt sonde, thay băng...)"
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          {/* City Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Lọc theo khu vực thành phố"
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
            >
              <option value="all">Khu vực: Tất cả</option>
              <option value="TP.HCM">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
            </select>
          </div>

          {/* Specialty Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              aria-label="Lọc theo chuyên khoa chăm sóc"
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
            >
              <option value="all">Chuyên khoa: Tất cả</option>
              <option value="Hậu phẫu">Hậu phẫu mổ xẻ</option>
              <option value="tai biến">Tai biến / Đột quỵ</option>
              <option value="loét">Chăm sóc loét tỳ đè</option>
              <option value="Sản">Mẹ & bé sau sinh</option>
              <option value="tim mạch">Tim mạch / Lão khoa</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sắp xếp kết quả tìm kiếm"
              className="w-full py-2.5 px-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-700"
            >
              <option value="rating">Đánh giá sao cao nhất</option>
              <option value="experience">Nhiều năm kinh nghiệm</option>
              <option value="price-asc">Giá tiết kiệm nhất</option>
            </select>
          </div>
        </div>

        {/* Results count & active tags */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div>
            Tìm thấy <strong className="text-teal-700 font-bold">{filteredNurses.length}</strong> điều dưỡng viên có chứng chỉ phù hợp
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tất cả hồ sơ đã kiểm tra số CCHN với Bộ Y Tế</span>
          </div>
        </div>
      </div>

      {/* Nurses List Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNurses.map((nurse) => (
          <div
            key={nurse.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            {/* Top Card Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={nurse.avatar}
                    alt={nurse.fullName}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-teal-100 shadow-xs"
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 p-1 rounded-full bg-emerald-500 text-white shadow-xs" title="Đã thẩm định CCHN">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900 truncate">
                      {nurse.fullName}
                    </h3>
                    <span className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {nurse.city}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {nurse.title}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <StarRating rating={nurse.rating} size="sm" showNumber={true} />
                    <span className="text-xs text-slate-400">
                      ({nurse.reviewCount} đánh giá • {nurse.shiftsCompleted} ca trực)
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{nurse.location}</span>
                  </div>
                </div>
              </div>

              {/* Verified License Box */}
              <div className="bg-teal-50/60 rounded-xl p-3 border border-teal-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-teal-900 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    Chứng Chỉ Hành Nghề: <span className="font-mono text-teal-800 font-bold">{nurse.licenseNumber}</span>
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                    {nurse.licenseIssuedBy}
                  </span>
                </div>
                <div className="text-slate-600">
                  <strong>Trình độ:</strong> {nurse.education} • {nurse.experienceYears} năm kinh nghiệm
                </div>
                <div className="text-slate-600 truncate">
                  <strong>Kinh nghiệm BV:</strong> {nurse.hospitalAffiliation}
                </div>
              </div>

              {/* Specialties & Skills tags */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                  Chuyên môn nổi bật:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nurse.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clinical Skills */}
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">
                  Kỹ thuật y tế thành thạo:
                </span>
                <div className="flex flex-wrap gap-1">
                  {nurse.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-cyan-50 text-cyan-800 border border-cyan-200 font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Latest Review Snippet */}
              {nurse.reviews.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">
                      Nhận xét gần nhất ({nurse.reviews[0].relationship}):
                    </span>
                    <span className="text-[10px]">{nurse.reviews[0].date}</span>
                  </div>
                  <p className="text-slate-600 italic line-clamp-2">
                    "{nurse.reviews[0].comment}"
                  </p>
                </div>
              )}
            </div>

            {/* Pricing Summary & Action Buttons */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-slate-500 block">Ca 8h tiêu chuẩn:</span>
                <div className="text-base font-extrabold text-teal-800">
                  {nurse.shift8hRate.toLocaleString('vi-VN')} đ
                  <span className="text-xs font-normal text-slate-500"> / ca</span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Ca 4h: {nurse.shift4hRate.toLocaleString('vi-VN')}đ • Đêm 12h: {nurse.shift12hNightRate.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Button Đánh Giá Sau Ca Trực */}
                <button
                  type="button"
                  onClick={() => setSelectedNurseForReview(nurse)}
                  title="Viết đánh giá sao và phản hồi sau ca trực"
                  className="px-3 py-2 text-xs font-semibold text-teal-700 bg-white hover:bg-teal-50 border border-teal-300 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-teal-600" />
                  <span className="hidden sm:inline">Đánh giá</span> sau ca
                </button>

                {/* Button Đặt Lịch Ca Trực */}
                <button
                  type="button"
                  onClick={() => setSelectedNurseForBooking(nurse)}
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Đặt Lịch Ca</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNurses.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-800">
            Không tìm thấy điều dưỡng viên phù hợp với bộ lọc
          </h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Vui lòng thử chọn lại thành phố, chuyên khoa khác hoặc xóa từ khóa tìm kiếm để xem toàn bộ danh sách điều dưỡng viên.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('all');
              setSelectedSpecialty('all');
            }}
            className="px-4 py-2 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
          >
            Đặt lại tất cả bộ lọc
          </button>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={!!selectedNurseForBooking}
        onClose={() => setSelectedNurseForBooking(null)}
        nurse={selectedNurseForBooking}
        onConfirmBooking={onBookNurse}
      />

      {/* Review Modal (For Rating Stars & Feedback After Shift) */}
      <ReviewModal
        isOpen={!!selectedNurseForReview}
        onClose={() => setSelectedNurseForReview(null)}
        nurse={selectedNurseForReview}
        onSubmitReview={onSubmitReview}
      />
    </div>
  );
};
