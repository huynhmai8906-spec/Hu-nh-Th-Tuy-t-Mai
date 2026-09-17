import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Nurse, Review } from '../types';
import { X, CheckCircle2, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  nurse: Nurse | null;
  onSubmitReview: (nurseId: string, review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  nurse,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('Con gái bệnh nhân');
  const [shiftType, setShiftType] = useState<string>('Ca trực 8h ban ngày');
  const [comment, setComment] = useState<string>('');
  const [skillRating, setSkillRating] = useState<number>(5);
  const [attitudeRating, setAttitudeRating] = useState<number>(5);
  const [punctualityRating, setPunctualityRating] = useState<number>(5);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen || !nurse) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      setErrorMsg('Vui lòng nhập tên người đánh giá (hoặc thân nhân bệnh nhân).');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setErrorMsg('Vui lòng chia sẻ nhận xét chi tiết hơn (tối thiểu 10 ký tự) để giúp cộng đồng.');
      return;
    }

    const calculatedAvgRating = Number(((rating * 2 + skillRating + attitudeRating + punctualityRating) / 5).toFixed(1));

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      patientName: reviewerName.trim(),
      relationship: relationship,
      rating: calculatedAvgRating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      shiftType: shiftType,
      verifiedCare: true,
    };

    onSubmitReview(nurse.id, newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset
      setComment('');
      setReviewerName('');
      setErrorMsg('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-300" />
              Đánh giá dịch vụ sau ca trực
            </div>
            <h3 className="text-xl font-bold mt-1 text-white">
              Đánh giá Điều dưỡng {nurse.fullName}
            </h3>
            <p className="text-xs text-teal-100 mt-0.5">
              CCHN: {nurse.licenseNumber} • {nurse.hospitalAffiliation}
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
              Gửi đánh giá thành công!
            </h4>
            <p className="text-slate-600 text-sm">
              Cảm ơn quý thân nhân đã phản hồi. Ý kiến của quý vị đã được ghi nhận và cập nhật ngay vào hồ sơ năng lực của điều dưỡng.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Overall Star Rating */}
            <div className="bg-teal-50/70 p-4 rounded-xl border border-teal-100 text-center">
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                Mức độ hài lòng tổng quan về ca trực vừa qua
              </label>
              <div className="flex justify-center">
                <StarRating
                  rating={rating}
                  interactive={true}
                  onRatingChange={(r) => setRating(r)}
                  size="lg"
                  showNumber={true}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {rating === 5 && 'Tuyệt vời, vượt trên mong đợi'}
                {rating === 4 && 'Rất hài lòng, chu đáo'}
                {rating === 3 && 'Hài lòng, đáp ứng đúng yêu cầu'}
                {rating === 2 && 'Cần cải thiện thêm kỹ năng/thái độ'}
                {rating === 1 && 'Chưa đạt yêu cầu'}
              </p>
            </div>

            {/* Sub criteria */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs">
              <div className="text-center">
                <span className="text-slate-600 block mb-1">Chuyên môn</span>
                <StarRating
                  rating={skillRating}
                  interactive={true}
                  onRatingChange={(r) => setSkillRating(r)}
                  size="sm"
                />
              </div>
              <div className="text-center border-x border-slate-200">
                <span className="text-slate-600 block mb-1">Tận tâm</span>
                <StarRating
                  rating={attitudeRating}
                  interactive={true}
                  onRatingChange={(r) => setAttitudeRating(r)}
                  size="sm"
                />
              </div>
              <div className="text-center">
                <span className="text-slate-600 block mb-1">Đúng giờ</span>
                <StarRating
                  rating={punctualityRating}
                  interactive={true}
                  onRatingChange={(r) => setPunctualityRating(r)}
                  size="sm"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ tên người đánh giá <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Ví dụ: Trần Phương Thảo"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mối quan hệ với bệnh nhân
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Bệnh nhân">Chính bản thân bệnh nhân</option>
                  <option value="Con cái bệnh nhân">Con cái bệnh nhân</option>
                  <option value="Vợ / Chồng bệnh nhân">Vợ / Chồng bệnh nhân</option>
                  <option value="Bố / Mẹ bệnh nhân">Bố / Mẹ bệnh nhân</option>
                  <option value="Thân nhân chăm sóc chính">Thân nhân chăm sóc chính</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Loại ca trực vừa hoàn thành
              </label>
              <select
                value={shiftType}
                onChange={(e) => setShiftType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Ca trực 4h bán thời gian">Ca trực 4h bán thời gian (Sáng/Chiều)</option>
                <option value="Ca trực 8h ban ngày">Ca trực 8h ban ngày</option>
                <option value="Ca trực đêm 12h">Ca trực đêm 12h (19h - 07h)</option>
                <option value="Ca toàn diện 24/24">Ca trực toàn diện 24/24</option>
                <option value="Thủ thuật: Thay băng / Đặt sonde / Cắt chỉ">Thủ thuật y tế đơn lẻ (Thay băng, đặt sonde...)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bình luận chi tiết sau ca trực <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Chia sẻ về sự chu đáo, kỹ thuật vô khuẩn, việc đo chỉ số sinh tồn hoặc sự tiến triển của bệnh nhân sau ca trực..."
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
                Đánh giá minh bạch, được xác thực
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
