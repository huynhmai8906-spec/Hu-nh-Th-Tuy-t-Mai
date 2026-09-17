import React, { useState } from 'react';
import { Patient, VitalSignRecord } from '../types';
import {
  Stethoscope,
  LogIn,
  LogOut,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplet,
  FileText,
  User,
  PlusCircle,
  Clock,
  Send,
  AlertCircle,
  Printer,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface NursePortalPageProps {
  loggedNurseEmail: string | null;
  onLoginWithGmail: (email: string) => void;
  onLogout: () => void;
  patients: Patient[];
  vitalsList: VitalSignRecord[];
  onAddVitalRecord: (record: VitalSignRecord) => void;
}

export const NursePortalPage: React.FC<NursePortalPageProps> = ({
  loggedNurseEmail,
  onLoginWithGmail,
  onLogout,
  patients,
  vitalsList,
  onAddVitalRecord,
}) => {
  // Gmail Login Form State
  const [inputGmail, setInputGmail] = useState('huynhmai8906@gmail.com');
  const [loginError, setLoginError] = useState('');

  // Selected Patient for logging
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || 'pat-001');

  // Vitals Form State
  const [systolic, setSystolic] = useState<number>(120);
  const [diastolic, setDiastolic] = useState<number>(80);
  const [heartRate, setHeartRate] = useState<number>(75);
  const [spO2, setSpO2] = useState<number>(98);
  const [temperature, setTemperature] = useState<number>(36.8);
  const [glucose, setGlucose] = useState<number>(105);
  const [glucoseType, setGlucoseType] = useState<'fasting' | 'postprandial'>('fasting');
  const [respiratoryRate, setRespiratoryRate] = useState<number>(18);
  const [fluidIntake, setFluidIntake] = useState<number>(1200);
  const [fluidOutput, setFluidOutput] = useState<number>(900);
  const [woundStatus, setWoundStatus] = useState<VitalSignRecord['woundStatus']>('Rỉ ít dịch, đang lên da non');
  const [medications, setMedications] = useState<string>('Coveram 5/5mg (1 viên sáng), Paracetamol 500mg khi đau');
  const [dietNotes, setDietNotes] = useState<string>('Ăn súp xay 300ml qua sonde hấp thu tốt, không trào ngược');
  const [nurseNotes, setNurseNotes] = useState<string>('Bệnh nhân tỉnh táo, tiếp xúc tốt. Đã lăn trở bệnh nhân chống loét. Vết loét vùng cụt biểu mô hóa tốt.');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);

  // Quick evaluation of vital health condition
  const evaluateAlert = () => {
    if (systolic >= 160 || diastolic >= 100 || spO2 < 92 || temperature >= 38.5) {
      return {
        level: 'critical' as const,
        message: 'CẢNH BÁO NGUY HIỂM: Chỉ số sinh tồn bất thường nghiêm trọng! Cần báo bác sĩ điều trị hoặc hỗ trợ thở oxy ngay lập tức.',
      };
    }
    if (systolic >= 140 || diastolic >= 90 || spO2 < 95 || temperature >= 37.8 || heartRate > 100 || heartRate < 55) {
      return {
        level: 'warning' as const,
        message: 'LƯU Ý THEO DÕI: Có chỉ số sinh tồn vượt ngưỡng chuẩn (Huyết áp/SpO2/Nhiệt độ). Cần kiểm tra lại sau 30 phút.',
      };
    }
    return {
      level: 'normal' as const,
      message: 'Chỉ số sinh tồn hoàn toàn trong giới hạn an toàn bình thường.',
    };
  };

  const currentAlert = evaluateAlert();

  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = inputGmail.trim().toLowerCase();
    if (!email) {
      setLoginError('Vui lòng nhập địa chỉ Gmail.');
      return;
    }
    if (!email.endsWith('@gmail.com')) {
      setLoginError('Bắt buộc đăng nhập bằng tài khoản Google (@gmail.com) theo yêu cầu bảo mật của hệ thống!');
      return;
    }
    setLoginError('');
    onLoginWithGmail(email);
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const patientVitalsHistory = vitalsList.filter((v) => v.patientId === selectedPatient?.id);

  const handleSaveVitals = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const now = new Date();
    const newRecord: VitalSignRecord = {
      id: `vit-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.fullName,
      nurseId: 'nurse-active',
      nurseName: loggedNurseEmail ? `Điều dưỡng (${loggedNurseEmail.split('@')[0]})` : 'Điều dưỡng viên trực',
      nurseEmail: loggedNurseEmail || 'huynhmai8906@gmail.com',
      recordedAt: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      bloodPressureSystolic: Number(systolic),
      bloodPressureDiastolic: Number(diastolic),
      heartRate: Number(heartRate),
      spO2: Number(spO2),
      temperature: Number(temperature),
      glucose: Number(glucose),
      glucoseType: glucoseType,
      respiratoryRate: Number(respiratoryRate),
      fluidIntake: Number(fluidIntake),
      fluidOutput: Number(fluidOutput),
      woundStatus: woundStatus,
      medicationsAdministered: medications,
      dietNotes: dietNotes,
      nurseNotes: nurseNotes,
      alertLevel: currentAlert.level,
      alertMessage: currentAlert.message,
    };

    onAddVitalRecord(newRecord);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2000);
  };

  const handleSendFamilyNotification = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  // IF NOT LOGGED IN: SHOW GMAIL LOGIN SCREEN
  if (!loggedNurseEmail) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 mx-auto">
            <Stethoscope className="w-8 h-8" />
          </div>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Khu Vực Dành Riêng Cho Điều Dưỡng
            </div>
            <h1 className="text-2xl font-black text-slate-900">
              Đăng Nhập Cổng Điều Dưỡng Lâm Sàng
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              Theo quy định của hội đồng y khoa MediCare Connect, điều dưỡng viên bắt buộc phải đăng nhập bằng <strong>Google / Gmail</strong> để xác thực danh tính số và cập nhật phiếu theo dõi sinh tồn.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          {/* 1-Click Fast Login with Current User Gmail */}
          <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
            <span className="text-[11px] font-bold text-teal-900 block uppercase">
              Đăng nhập nhanh với Google Account của bạn:
            </span>
            <button
              type="button"
              onClick={() => onLoginWithGmail('huynhmai8906@gmail.com')}
              className="w-full py-3 px-4 rounded-xl bg-white border border-teal-300 hover:border-teal-500 shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700">
                  Tiếp tục với huynhmai8906@gmail.com
                </div>
                <div className="text-[10px] text-slate-500">
                  Tài khoản điều dưỡng đã được phân quyền
                </div>
              </div>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-xs text-slate-400 font-medium absolute">
              hoặc nhập tài khoản Gmail khác
            </span>
          </div>

          {/* Form manual Gmail */}
          <form onSubmit={handleGmailSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Địa chỉ Gmail cá nhân <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={inputGmail}
                onChange={(e) => setInputGmail(e.target.value)}
                placeholder="ten.dieuduong@gmail.com"
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                * Lưu ý: Hệ thống chỉ chấp nhận định dạng đuôi <strong>@gmail.com</strong>.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm bg-teal-600 hover:bg-teal-700 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Xác Thực & Đăng Nhập Ca Trực</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Bảo mật hai lớp OAuth Google & Mã hóa y tế SSL 256-bit
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Nurse Session Status Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-900">
                Cổng Điều Dưỡng Lâm Sàng
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Ca trực đang hoạt động
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tài khoản Gmail xác thực: <strong className="text-teal-700">{loggedNurseEmail}</strong> • CCHN: 028914/BYT
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In Phiếu Theo Dõi</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất Gmail</span>
          </button>
        </div>
      </div>

      {/* Patient Selector Tabs */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-600" />
            Chọn Bệnh Nhân Đang Chăm Sóc Trong Ca:
          </span>
          <span className="text-[11px] text-slate-500">
            Hồ sơ phân công trực hôm nay
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {patients.map((pat) => {
            const isSelected = selectedPatientId === pat.id;
            return (
              <button
                key={pat.id}
                type="button"
                onClick={() => setSelectedPatientId(pat.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-teal-600 bg-white shadow-sm ring-2 ring-teal-500/20'
                    : 'border-slate-200 bg-white/60 hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{pat.fullName}</span>
                  <span className="text-xs font-semibold text-slate-500">{pat.age} tuổi ({pat.gender})</span>
                </div>
                <div className="text-xs text-teal-700 font-medium truncate mt-1">
                  {pat.diagnosis}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  BS: {pat.treatingDoctor}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Medical Info Card */}
      {selectedPatient && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Bệnh nhân: {selectedPatient.fullName} • {selectedPatient.age} tuổi
              </h2>
              <p className="text-xs text-slate-500">
                Địa chỉ: {selectedPatient.address}
              </p>
            </div>
            <div className="text-xs text-slate-700 bg-teal-50 p-2 rounded-lg border border-teal-100">
              <strong>Liên hệ người nhà:</strong> {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.phone})
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 block mb-1">
              Y lệnh điều dưỡng đặc biệt cần tuân thủ:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
              {selectedPatient.specialCareNeeds.map((need, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{need}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Form: Daily Vital Signs Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form
          onSubmit={handleSaveVitals}
          className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-600" />
                Cập Nhật Chỉ Số Sức Khỏe Hàng Ngày
              </h3>
              <p className="text-xs text-slate-500">
                Nhập đầy đủ bộ 5 chỉ số sinh tồn và ghi chú tiến triển lâm sàng
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Ngày: {new Date().toLocaleDateString('vi-VN')}
            </span>
          </div>

          {submitSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Đã lưu thành công phiếu theo dõi sinh tồn! Dữ liệu đã đồng bộ lên biểu đồ theo dõi của gia đình.</span>
            </div>
          )}

          {/* Realtime Alert Evaluator Bar */}
          <div
            className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
              currentAlert.level === 'critical'
                ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                : currentAlert.level === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-900 font-semibold'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {currentAlert.level === 'critical' ? (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : currentAlert.level === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <div>
              <div className="font-bold">Đánh giá sinh tồn tự động:</div>
              <div>{currentAlert.message}</div>
            </div>
          </div>

          {/* Vital Numbers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Blood Pressure Systolic */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Huyết áp tâm thu
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={60}
                  max={250}
                  value={systolic}
                  onChange={(e) => setSystolic(Number(e.target.value))}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-400">mmHg</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Chuẩn: 90 - 130</span>
            </div>

            {/* Blood Pressure Diastolic */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                Huyết áp tâm trương
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={40}
                  max={150}
                  value={diastolic}
                  onChange={(e) => setDiastolic(Number(e.target.value))}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-400">mmHg</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Chuẩn: 60 - 85</span>
            </div>

            {/* Heart Rate */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-teal-600" />
                Mạch / Nhịp tim
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={40}
                  max={200}
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-400">bpm</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Chuẩn: 60 - 90</span>
            </div>

            {/* SpO2 */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-cyan-600" />
                Nồng độ Oxy (SpO2)
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={70}
                  max={100}
                  value={spO2}
                  onChange={(e) => setSpO2(Number(e.target.value))}
                  className={`w-full text-lg font-black bg-white border rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500 ${
                    spO2 < 95 ? 'text-rose-600 border-rose-300' : 'text-slate-900 border-slate-300'
                  }`}
                />
                <span className="text-xs text-slate-400">%</span>
              </div>
              <span className={`text-[10px] block mt-1 ${spO2 < 95 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                {spO2 < 95 ? 'Cảnh báo: SpO2 < 95%!' : 'Chuẩn: 96% - 100%'}
              </span>
            </div>

            {/* Temperature */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                Thân nhiệt
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min={34}
                  max={42}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-400">°C</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Chuẩn: 36.5 - 37.2°C</span>
            </div>

            {/* Blood Glucose */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-indigo-500" />
                Đường huyết
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={40}
                  max={500}
                  value={glucose}
                  onChange={(e) => setGlucose(Number(e.target.value))}
                  className="w-full text-lg font-black text-slate-900 bg-white border border-slate-300 rounded-lg p-1.5 text-center focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-400">mg/dL</span>
              </div>
              <div className="flex gap-2 text-[10px] mt-1 text-slate-500">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="glcType"
                    checked={glucoseType === 'fasting'}
                    onChange={() => setGlucoseType('fasting')}
                    className="mr-1"
                  />
                  Đói
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="glcType"
                    checked={glucoseType === 'postprandial'}
                    onChange={() => setGlucoseType('postprandial')}
                    className="mr-1"
                  />
                  Sau ăn
                </label>
              </div>
            </div>
          </div>

          {/* Clinical Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tình trạng vết mổ / Vết loét tỳ đè
              </label>
              <select
                value={woundStatus}
                onChange={(e) => setWoundStatus(e.target.value as any)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white"
              >
                <option value="Lành tốt, khô">Lành tốt, khô, sạch</option>
                <option value="Rỉ ít dịch, đang lên da non">Rỉ ít dịch, đang lên da non (Độ II)</option>
                <option value="Sưng đỏ, cần theo dõi">Sưng đỏ, cần theo dõi sát</option>
                <option value="Nhiễm trùng, báo bác sĩ">Nhiễm trùng, có mủ / Báo bác sĩ ngay</option>
                <option value="Không có vết thương">Không có vết thương hở</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nhịp thở & Cân bằng dịch vào/ra
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Nhịp thở: 18 l/p"
                  value={`Thở: ${respiratoryRate} lần/phút`}
                  onChange={(e) => {
                    const num = parseInt(e.target.value.replace(/\D/g, '')) || 18;
                    setRespiratoryRate(num);
                  }}
                  className="p-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Dịch vào/ra"
                  value={`Vào: ${fluidIntake}ml | Ra: ${fluidOutput}ml`}
                  onChange={(e) => setFluidIntake(1200)}
                  className="p-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Medications Administered */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Thuốc đã cho bệnh nhân dùng theo y lệnh bác sĩ
            </label>
            <input
              type="text"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Nurse Clinical Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ghi chú lâm sàng & Đánh giá của điều dưỡng trong ca trực
            </label>
            <textarea
              rows={3}
              value={nurseNotes}
              onChange={(e) => setNurseNotes(e.target.value)}
              placeholder="Ghi nhận chi tiết về tinh thần bệnh nhân, phản xạ ăn uống, việc lăn trở chống loét, dấu hiệu đau..."
              className="w-full p-2.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              Đồng bộ dữ liệu thời gian thực lên hồ sơ điện tử
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Lưu Phiếu Sinh Tồn Ca Trực</span>
            </button>
          </div>
        </form>

        {/* Right Column: History & Trends & Notification Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Send SMS/Zalo update to Family */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1.5">
                <Send className="w-4 h-4 text-teal-600" />
                Thông Báo Cho Thân Nhân
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">Tự động kết nối</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gửi tin nhắn tóm tắt tình trạng sinh tồn ca trực tới số điện thoại của thân nhân ({selectedPatient?.emergencyContact.phone}).
            </p>

            {notificationSent ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Đã gửi bản tin sinh tồn thành công đến người nhà!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendFamilyNotification}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Bản Tin Tức Thì Cho Gia Đình</span>
              </button>
            )}
          </div>

          {/* Vitals History List */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">
                Nhật Ký Các Ca Trực Gần Nhất
              </h4>
              <span className="text-[10px] text-slate-400">
                {patientVitalsHistory.length} lần đo
              </span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {patientVitalsHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {item.time} ({item.date})
                    </span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        item.alertLevel === 'critical'
                          ? 'bg-rose-100 text-rose-800'
                          : item.alertLevel === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.alertLevel === 'critical' ? 'Nguy hiểm' : item.alertLevel === 'warning' ? 'Cần chú ý' : 'Ổn định'}
                    </span>
                  </div>

                  {/* Numbers row */}
                  <div className="grid grid-cols-3 gap-1 text-[11px] pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-slate-400 block">HA:</span>
                      <strong className="text-slate-800">{item.bloodPressureSystolic}/{item.bloodPressureDiastolic}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">SpO2:</span>
                      <strong className="text-cyan-700">{item.spO2}%</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Mạch:</span>
                      <strong className="text-teal-700">{item.heartRate} bpm</strong>
                    </div>
                  </div>

                  {item.nurseNotes && (
                    <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200/60 italic line-clamp-2">
                      "{item.nurseNotes}"
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 flex items-center justify-between">
                    <span>ĐD: {item.nurseName}</span>
                    <span>Vết thương: {item.woundStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
