export type PageId = 'home' | 'nurses' | 'pricing' | 'nurse-portal';

export interface Review {
  id: string;
  patientName: string;
  patientAvatar?: string;
  relationship: string; // e.g., 'Con gái bệnh nhân', 'Người nhà bệnh nhân tai biến'
  rating: number; // 1 to 5
  comment: string;
  date: string;
  shiftType: string; // e.g., 'Ca trực đêm 12h', 'Ca 8h phục hồi chức năng'
  verifiedCare: boolean;
}

export interface Nurse {
  id: string;
  fullName: string;
  title: string; // e.g., 'Cử nhân Điều dưỡng Hồi sức Cấp cứu'
  avatar: string;
  licenseNumber: string; // CCHN do Bộ/Sở Y Tế cấp
  licenseIssuedBy: string; // e.g., 'Sở Y tế TP.HCM'
  licenseYear: number;
  experienceYears: number;
  hospitalAffiliation: string; // e.g., 'Nguyên ĐD BV Chợ Rẫy'
  education: string; // e.g., 'Đại học Y Dược TP.HCM'
  specialties: string[]; // e.g., ['Hậu phẫu ổ bụng', 'Phục hồi sau tai biến', 'Chăm sóc vết loét tỳ đè']
  skills: string[]; // e.g., ['Đặt Sonde dạ dày', 'Tiêm truyền tĩnh mạch', 'Hút đờm dãi', 'Vật lý trị liệu cơ bản']
  location: string; // e.g., 'Quận 1, 3, 5, 10 - TP.HCM'
  city: 'TP.HCM' | 'Hà Nội' | 'Đà Nẵng';
  rating: number;
  reviewCount: number;
  shiftsCompleted: number;
  hourlyRate: number; // VNĐ
  shift4hRate: number;
  shift8hRate: number;
  shift12hNightRate: number;
  shift24hRate: number;
  bio: string;
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  reviews: Review[];
  available: boolean;
  statusText: string;
}

export interface VitalSignRecord {
  id: string;
  patientId: string;
  patientName: string;
  nurseId: string;
  nurseName: string;
  nurseEmail: string;
  recordedAt: string; // ISO or formatted date
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  // Vital measurements
  bloodPressureSystolic: number; // mmHg (Tâm thu, 90-120)
  bloodPressureDiastolic: number; // mmHg (Tâm trương, 60-80)
  heartRate: number; // bpm (60-100)
  spO2: number; // % (95-100)
  temperature: number; // °C (36.5 - 37.5)
  glucose?: number; // mg/dL (70-110 khi đói)
  glucoseType?: 'fasting' | 'postprandial' | 'random';
  respiratoryRate: number; // nhịp/phút (16-20)
  fluidIntake?: number; // ml
  fluidOutput?: number; // ml
  woundStatus: 'Lành tốt, khô' | 'Rỉ ít dịch, đang lên da non' | 'Sưng đỏ, cần theo dõi' | 'Nhiễm trùng, báo bác sĩ' | 'Không có vết thương';
  medicationsAdministered: string; // Các thuốc đã dùng theo y lệnh
  dietNotes: string; // Tình trạng ăn uống
  nurseNotes: string; // Ghi chú lâm sàng của điều dưỡng
  alertLevel: 'normal' | 'warning' | 'critical';
  alertMessage?: string;
}

export interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: 'Nam' | 'Nữ';
  address: string;
  diagnosis: string; // Chẩn đoán bệnh
  treatingDoctor: string; // Bác sĩ điều trị
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  specialCareNeeds: string[];
  currentNurseId?: string;
  roomNumber?: string;
}

export interface BookingRequest {
  id: string;
  nurseId: string;
  nurseName: string;
  patientName: string;
  contactPhone: string;
  serviceType: 'shift-4h' | 'shift-8h' | 'shift-12h-night' | 'shift-24h' | 'procedure';
  startDate: string;
  durationDays: number;
  totalPrice: number;
  notes: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface MarketPriceItem {
  category: string;
  serviceName: string;
  duration: string;
  marketLow: number;
  marketHigh: number;
  marketAverage: number;
  platformPrice: number;
  unit: string;
  description: string;
  includedBenefits: string[];
}
