import { Nurse, Patient, VitalSignRecord, MarketPriceItem } from '../types';

export const INITIAL_NURSES: Nurse[] = [
  {
    id: 'nurse-01',
    fullName: 'Trần Thị Mỹ Dung',
    title: 'Cử nhân Điều Dưỡng Hồi Sức Tích Cực (ICU)',
    avatar: 'https://images.unsplash.com/photo-1594824813580-4824208a55e1?w=400&auto=format&fit=crop&q=80',
    licenseNumber: '028914/BYT-CCHN',
    licenseIssuedBy: 'Bộ Y Tế cấp',
    licenseYear: 2016,
    experienceYears: 9,
    hospitalAffiliation: 'Từng công tác BV Chợ Rẫy (Khoa Hồi Sức Cấp Cứu)',
    education: 'Đại học Y Dược TP.HCM - Tốt nghiệp Giỏi',
    specialties: [
      'Chăm sóc bệnh nhân hồi sức sau phẫu thuật lớn',
      'Phục hồi sau tai biến đột quỵ liệt nửa người',
      'Xử lý và liền sẹo loét tỳ đè độ II - III',
      'Chăm sóc bệnh nhân thở máy & mở khí quản'
    ],
    skills: [
      'Đặt và chăm sóc ống thông dạ dày (Sonde)',
      'Hút đờm dãi sâu qua canun mở khí quản',
      'Đặt sonde tiểu vô khuẩn',
      'Tiêm truyền tĩnh mạch & theo dõi monitoring',
      'Tập thụ động phục hồi chức năng cơ bản'
    ],
    location: 'Quận 1, 3, 5, 10, Bình Thạnh (TP.HCM)',
    city: 'TP.HCM',
    rating: 4.95,
    reviewCount: 38,
    shiftsCompleted: 142,
    hourlyRate: 90000,
    shift4hRate: 420000,
    shift8hRate: 750000,
    shift12hNightRate: 950000,
    shift24hRate: 1550000,
    bio: 'Tôi có hơn 9 năm kinh nghiệm chăm sóc người bệnh nặng tại khoa ICU. Luôn tâm niệm chăm sóc bệnh nhân như người thân trong gia đình, tôn trọng nghiêm ngặt các quy trình vô khuẩn và y lệnh của bác sĩ điều trị.',
    certifications: [
      { name: 'Chứng chỉ hành nghề khám bệnh, chữa bệnh chuyên khoa Điều Dưỡng', issuer: 'Bộ Y Tế', year: '2016' },
      { name: 'Chứng chỉ Hồi sức cấp cứu & Chăm sóc vết thương khó liền', issuer: 'Bệnh viện Chợ Rẫy', year: '2018' },
      { name: 'Chứng nhận Kỹ năng sơ cấp cứu quốc tế BLS / ACLS', issuer: 'Hiệp hội Tim mạch Hoa Kỳ AHA', year: '2021' }
    ],
    reviews: [
      {
        id: 'rev-01',
        patientName: 'Bác Trần Văn Đức (Con gái Thảo nhận xét)',
        relationship: 'Con gái bệnh nhân tai biến',
        rating: 5,
        comment: 'Điều dưỡng Dung chăm sóc bố tôi rất tận tụy và chuyên nghiệp. Vết loét vùng cùng cụt của cụ sau 10 ngày được cô Dung thay băng rửa nước muối sinh lý vô khuẩn đã lên da non rõ rệt. Cực kỳ an tâm!',
        date: '14/09/2026',
        shiftType: 'Ca trực 12h đêm',
        verifiedCare: true
      },
      {
        id: 'rev-02',
        patientName: 'Gia đình Chú Hoàng Nam',
        relationship: 'Thân nhân bệnh nhân hậu phẫu tim',
        rating: 5,
        comment: 'Kỹ năng đo huyết áp, SpO2 và theo dõi nhịp tim của cô Dung rất chuẩn xác. Có cảnh báo huyết áp tăng là báo ngay gia đình điều chỉnh thuốc theo y lệnh bác sĩ.',
        date: '08/09/2026',
        shiftType: 'Ca trực 8h ban ngày',
        verifiedCare: true
      }
    ],
    available: true,
    statusText: 'Đang sẵn sàng nhận ca mới'
  },
  {
    id: 'nurse-02',
    fullName: 'Nguyễn Văn Hùng',
    title: 'Cử nhân Điều Dưỡng Ngoại Khoa & Phục Hồi Chức Năng',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    licenseNumber: '018320/HN-CCHN',
    licenseIssuedBy: 'Sở Y Tế Hà Nội',
    licenseYear: 2017,
    experienceYears: 8,
    hospitalAffiliation: 'Từng công tác Bệnh viện Bạch Mai & BV Việt Đức',
    education: 'Đại học Y Hà Nội - Khoa Điều Dưỡng',
    specialties: [
      'Chăm sóc sau mổ xương khớp, thay khớp gối/khớp háng',
      'Vật lý trị liệu vận động tại nhà cho người cao tuổi',
      'Chăm sóc bệnh nhân Parkinson, Alzheimer sa sút trí tuệ',
      'Hỗ trợ tập thở và vỗ rung lồng ngực'
    ],
    skills: [
      'Tập vận động phục hồi tầm khớp',
      'Thay băng rửa vết mổ phẫu thuật',
      'Cắt chỉ tại nhà theo chỉ định',
      'Xoa bóp giảm đau, chống teo cơ',
      'Đo điện tim tại nhà, test đường huyết'
    ],
    location: 'Đống Đa, Ba Đình, Cầu Giấy, Tây Hồ (Hà Nội)',
    city: 'Hà Nội',
    rating: 4.9,
    reviewCount: 29,
    shiftsCompleted: 118,
    hourlyRate: 85000,
    shift4hRate: 400000,
    shift8hRate: 720000,
    shift12hNightRate: 900000,
    shift24hRate: 1450000,
    bio: 'Thể lực tốt, kiên nhẫn và luôn giữ thái độ tích cực động viên tinh thần người bệnh. Chuyên sâu về trợ giúp người lớn tuổi di chuyển an toàn và phục hồi chức năng vận động.',
    certifications: [
      { name: 'Chứng chỉ hành nghề Điều dưỡng đa khoa', issuer: 'Sở Y tế Hà Nội', year: '2017' },
      { name: 'Kỹ thuật Phục hồi chức năng cơ bản tại nhà', issuer: 'Viện Phục hồi chức năng Trung Ương', year: '2019' }
    ],
    reviews: [
      {
        id: 'rev-03',
        patientName: 'Cô Lê Thị Mai',
        relationship: 'Bệnh nhân sau mổ khớp gối',
        rating: 5,
        comment: 'Anh Hùng rất có tâm, nâng đỡ nhẹ nhàng, tập gập duỗi khớp rất đúng bài bản nên tôi không bị đau nhiều. Chỉ sau 2 tuần tôi đã tự vịn khung tập đi được.',
        date: '10/09/2026',
        shiftType: 'Ca 4h mỗi sáng',
        verifiedCare: true
      }
    ],
    available: true,
    statusText: 'Còn nhận ca trực sáng và chiều'
  },
  {
    id: 'nurse-03',
    fullName: 'Lê Thị Thu Thảo',
    title: 'Cử nhân Điều Dưỡng Sản - Nhi & Nội Khoa',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    licenseNumber: '034192/HCM-CCHN',
    licenseIssuedBy: 'Sở Y Tế TP.HCM',
    licenseYear: 2018,
    experienceYears: 7,
    hospitalAffiliation: 'Từng công tác Bệnh viện Từ Dũ & Vinmec Central Park',
    education: 'Đại học Y Khoa Phạm Ngọc Thạch',
    specialties: [
      'Chăm sóc mẹ và bé sơ sinh sau sinh mổ/sinh thường',
      'Tắm bé chuẩn y khoa & vệ sinh rốn chống nhiễm trùng',
      'Chăm sóc bệnh nhân tiểu đường & tăng huyết áp tại gia',
      'Tư vấn dinh dưỡng y học'
    ],
    skills: [
      'Tắm bé & massage y khoa kích thích phát triển giác quan',
      'Chăm sóc vết mổ đẻ, tầng sinh môn',
      'Thông tắc tia sữa nhẹ nhàng không đau',
      'Theo dõi đường huyết mao mạch & insulin theo đơn',
      'Lập bảng theo dõi dinh dưỡng và dịch xuất nhập'
    ],
    location: 'Quận 7, Nhà Bè, Quận 4, Quận 2 (TP.HCM)',
    city: 'TP.HCM',
    rating: 4.98,
    reviewCount: 45,
    shiftsCompleted: 160,
    hourlyRate: 90000,
    shift4hRate: 450000,
    shift8hRate: 800000,
    shift12hNightRate: 1000000,
    shift24hRate: 1600000,
    bio: 'Bàn tay dịu dàng, chu đáo, rất tâm lý với các sản phụ và người lớn tuổi. Luôn cam kết bảo đảm vô khuẩn tuyệt đối và mang lại sự an tâm cao nhất cho mái ấm gia đình bạn.',
    certifications: [
      { name: 'Chứng chỉ hành nghề Điều dưỡng phụ sản & Nhi', issuer: 'Sở Y Tế TP.HCM', year: '2018' },
      { name: 'Chứng chỉ Quản lý & Chăm sóc vết thương ngoại khoa', issuer: 'Bệnh viện Từ Dũ', year: '2020' }
    ],
    reviews: [
      {
        id: 'rev-04',
        patientName: 'Gia đình chị Ngọc Bích',
        relationship: 'Sản phụ sinh mổ lần đầu',
        rating: 5,
        comment: 'Cô Thảo cực kỳ khéo léo, chăm sóc vết mổ rất êm, tắm em bé sơ sinh thuần thục. Nhờ cô mà hai mẹ con đều khỏe mạnh, tinh thần mẹ sau sinh rất thoải mái.',
        date: '12/09/2026',
        shiftType: 'Ca 8h ban ngày',
        verifiedCare: true
      }
    ],
    available: true,
    statusText: 'Đang sẵn sàng nhận lịch tuần tới'
  },
  {
    id: 'nurse-04',
    fullName: 'Hoàng Minh Tuấn',
    title: 'Điều Dưỡng Chuyên Khoa Nội - Tim Mạch & Lão Khoa',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    licenseNumber: '019842/ĐN-CCHN',
    licenseIssuedBy: 'Sở Y Tế Đà Nẵng',
    licenseYear: 2019,
    experienceYears: 6,
    hospitalAffiliation: 'Từng công tác Bệnh viện Đa khoa Đà Nẵng',
    education: 'Đại học Kỹ thuật Y - Dược Đà Nẵng',
    specialties: [
      'Chăm sóc bệnh nhân tim mạch, suy tim, tăng huyết áp độ 2-3',
      'Theo dõi bệnh phổi tắc nghẽn mãn tính (COPD)',
      'Hỗ trợ thở oxy dòng cao và máy tạo oxy tại nhà',
      'Theo dõi chế độ giảm muối và dịch cân bằng'
    ],
    skills: [
      'Vận hành máy đo SpO2, máy tạo oxy cá nhân',
      'Đặt sonde dạ dày & cho ăn qua sonde đúng kỹ thuật',
      'Đo huyết áp cơ & điện tử kiểm chuẩn',
      'Sơ cứu xử trí hạ đường huyết, khó thở kịch phát'
    ],
    location: 'Hải Châu, Thanh Khê, Sơn Trà (Đà Nẵng)',
    city: 'Đà Nẵng',
    rating: 4.88,
    reviewCount: 22,
    shiftsCompleted: 94,
    hourlyRate: 80000,
    shift4hRate: 380000,
    shift8hRate: 680000,
    shift12hNightRate: 880000,
    shift24hRate: 1400000,
    bio: 'Kỹ năng giao tiếp nhẹ nhàng, điềm đạm. Rất thấu hiểu tâm lý lo lắng của người già có bệnh lý tim mạch và hen phế quản mãn tính.',
    certifications: [
      { name: 'Chứng chỉ hành nghề khám chữa bệnh Điều dưỡng', issuer: 'Sở Y Tế Đà Nẵng', year: '2019' },
      { name: 'Đào tạo liên tục: Quản lý bệnh không lây nhiễm tại cộng đồng', issuer: 'Bộ Y Tế', year: '2022' }
    ],
    reviews: [
      {
        id: 'rev-05',
        patientName: 'Bác Phạm Quang Vinh',
        relationship: 'Bệnh nhân suy tim độ 2',
        rating: 5,
        comment: 'Tuấn trực đêm rất tỉnh táo và có trách nhiệm. Cụ trở mình ho hen là Tuấn có mặt đỡ dậy đo SpO2 ngay. Rất chu đáo.',
        date: '05/09/2026',
        shiftType: 'Ca trực 12h đêm',
        verifiedCare: true
      }
    ],
    available: true,
    statusText: 'Sẵn sàng nhận ca'
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-001',
    fullName: 'Trần Văn Đức',
    age: 76,
    gender: 'Nam',
    address: '142/8 Nguyễn Đình Chiểu, Phường Võ Thị Sáu, Quận 3, TP.HCM',
    diagnosis: 'Di chứng nhồi máu não diện rộng liệt nửa người phải (năm thứ 2), Loét tỳ đè độ II vùng cùng cụt, Tăng huyết áp độ 2',
    treatingDoctor: 'ThS.BS Nguyễn Minh Trí (BV Đại học Y Dược)',
    emergencyContact: {
      name: 'Trần Phương Thảo (Con gái)',
      relationship: 'Con gái ruột',
      phone: '0908 123 456'
    },
    specialCareNeeds: [
      'Cho ăn qua Sonde dạ dày 4 cữ/ngày (7h, 11h, 16h, 20h)',
      'Thay băng rửa vết loét vùng cùng cụt ngày 1 lần bằng dung dịch Prontosan vô khuẩn',
      'Lăn trở bệnh nhân 2 tiếng/lần chống loét điểm tỳ',
      'Đo huyết áp trước khi uống thuốc Coveram 5mg/5mg'
    ],
    currentNurseId: 'nurse-01',
    roomNumber: 'Phòng 201 - Tầng 2'
  },
  {
    id: 'pat-002',
    fullName: 'Nguyễn Thị Lan',
    age: 68,
    gender: 'Nữ',
    address: '68 Phố Huế, Phường Hàng Bài, Quận Hoàn Kiếm, Hà Nội',
    diagnosis: 'Hậu phẫu thay khớp gối nhân tạo toàn phần bên phải (ngày thứ 5), Đái tháo đường Type 2',
    treatingDoctor: 'TS.BS Lê Hữu Thắng (BV Hữu nghị Việt Đức)',
    emergencyContact: {
      name: 'Nguyễn Tuấn Anh (Con trai)',
      relationship: 'Con trai',
      phone: '0912 789 101'
    },
    specialCareNeeds: [
      'Tập co duỗi thụ động khớp gối theo góc chỉ định bác sĩ',
      'Kiểm tra và thay băng vết mổ vô khuẩn',
      'Test đường huyết mao mạch trước bữa ăn sáng và tối',
      'Theo dõi dấu hiệu sưng nóng đỏ đau hoặc huyết khối tĩnh mạch sâu'
    ],
    currentNurseId: 'nurse-02',
    roomNumber: 'Phòng 102'
  },
  {
    id: 'pat-003',
    fullName: 'Lê Hoàng Phúc',
    age: 45,
    gender: 'Nam',
    address: '25 Nguyễn Tri Phương, Quận 10, TP.HCM',
    diagnosis: 'Hậu phẫu tái tạo dây chằng chéo trước (ACL) + cắt lọc sụn chêm ngày thứ 7',
    treatingDoctor: 'BS.CKII Huỳnh Vũ (BV Chấn thương Chỉnh hình)',
    emergencyContact: {
      name: 'Võ Mai Anh (Vợ)',
      relationship: 'Vợ',
      phone: '0983 456 789'
    },
    specialCareNeeds: [
      'Chườm lạnh giảm sưng nề 20 phút/cữ',
      'Tập gồng cơ tứ đầu đùi',
      'Theo dõi dịch chân dẫn lưu'
    ],
    currentNurseId: 'nurse-01',
    roomNumber: 'Phòng 304'
  }
];

export const INITIAL_VITALS: VitalSignRecord[] = [
  {
    id: 'vit-101',
    patientId: 'pat-001',
    patientName: 'Trần Văn Đức',
    nurseId: 'nurse-01',
    nurseName: 'Trần Thị Mỹ Dung',
    nurseEmail: 'huynhmai8906@gmail.com',
    recordedAt: '2026-09-16T14:30:00Z',
    date: '2026-09-16',
    time: '14:30',
    bloodPressureSystolic: 125,
    bloodPressureDiastolic: 78,
    heartRate: 74,
    spO2: 98,
    temperature: 36.8,
    glucose: 112,
    glucoseType: 'postprandial',
    respiratoryRate: 18,
    fluidIntake: 1200,
    fluidOutput: 950,
    woundStatus: 'Rỉ ít dịch, đang lên da non',
    medicationsAdministered: 'Coveram 5/5mg (1v), Gliptin 50mg (1v), Natri Clorid 0.9% nhỏ mắt',
    dietNotes: 'Ăn súp xay qua sonde 300ml hấp thu tốt, không trào ngược, bụng mềm',
    nurseNotes: 'Bệnh nhân tỉnh táo, tiếp xúc mắt tốt. Đã lăn trở sang trái lúc 14h00. Vết loét cùng cụt sạch, kích thước thu hẹp còn 1.5 x 1.2 cm, viền biểu mô hóa tốt.',
    alertLevel: 'normal',
    alertMessage: 'Chỉ số sinh tồn hoàn toàn ổn định trong ca trực'
  },
  {
    id: 'vit-102',
    patientId: 'pat-001',
    patientName: 'Trần Văn Đức',
    nurseId: 'nurse-01',
    nurseName: 'Trần Thị Mỹ Dung',
    nurseEmail: 'huynhmai8906@gmail.com',
    recordedAt: '2026-09-16T08:15:00Z',
    date: '2026-09-16',
    time: '08:15',
    bloodPressureSystolic: 138,
    bloodPressureDiastolic: 84,
    heartRate: 80,
    spO2: 97,
    temperature: 37.0,
    glucose: 104,
    glucoseType: 'fasting',
    respiratoryRate: 19,
    fluidIntake: 450,
    fluidOutput: 300,
    woundStatus: 'Rỉ ít dịch, đang lên da non',
    medicationsAdministered: 'Thuốc hạ áp buổi sáng đã cho uống theo chỉ định',
    dietNotes: 'Cữ sữa dinh dưỡng 250ml buổi sáng',
    nurseNotes: 'Bắt đầu ca sáng. Bệnh nhân ngủ tròn giấc đêm qua. Vận động thụ động tay chân 20 phút.',
    alertLevel: 'normal'
  },
  {
    id: 'vit-103',
    patientId: 'pat-001',
    patientName: 'Trần Văn Đức',
    nurseId: 'nurse-01',
    nurseName: 'Trần Thị Mỹ Dung',
    nurseEmail: 'huynhmai8906@gmail.com',
    recordedAt: '2026-09-15T18:00:00Z',
    date: '2026-09-15',
    time: '18:00',
    bloodPressureSystolic: 130,
    bloodPressureDiastolic: 80,
    heartRate: 76,
    spO2: 98,
    temperature: 36.7,
    glucose: 128,
    glucoseType: 'postprandial',
    respiratoryRate: 18,
    fluidIntake: 1400,
    fluidOutput: 1100,
    woundStatus: 'Rỉ ít dịch, đang lên da non',
    medicationsAdministered: 'Uống thuốc tối đầy đủ',
    dietNotes: 'Súp rau củ thịt xay 300ml',
    nurseNotes: 'Bệnh nhân dễ chịu, không khó thở, đại tiện phân vàng mềm trong ngày.',
    alertLevel: 'normal'
  },
  {
    id: 'vit-104',
    patientId: 'pat-002',
    patientName: 'Nguyễn Thị Lan',
    nurseId: 'nurse-02',
    nurseName: 'Nguyễn Văn Hùng',
    nurseEmail: 'hung.nurse@gmail.com',
    recordedAt: '2026-09-16T11:00:00Z',
    date: '2026-09-16',
    time: '11:00',
    bloodPressureSystolic: 122,
    bloodPressureDiastolic: 75,
    heartRate: 72,
    spO2: 99,
    temperature: 36.6,
    glucose: 118,
    glucoseType: 'fasting',
    respiratoryRate: 17,
    woundStatus: 'Lành tốt, khô',
    medicationsAdministered: 'Kháng sinh Augmentin 1g, Giảm đau Paracetamol 500mg, Chống đông Lovenox',
    dietNotes: 'Ăn cơm mềm với cá hồi và rau luộc, ăn ngon miệng',
    nurseNotes: 'Vết mổ khớp gối khô ráo, không sưng đỏ bất thường. Đã tập gập gối đạt góc 75 độ. Tinh thần bệnh nhân rất phấn khởi.',
    alertLevel: 'normal'
  }
];

export const MARKET_PRICE_BENCHMARKS: MarketPriceItem[] = [
  {
    category: 'Ca trực bán thời gian (4 Giờ)',
    serviceName: 'Ca trực 4h (Sáng hoặc Chiều)',
    duration: '4 giờ liên tục',
    marketLow: 350000,
    marketHigh: 500000,
    marketAverage: 420000,
    platformPrice: 400000,
    unit: 'VNĐ / ca',
    description: 'Thích hợp cho nhu cầu hỗ trợ vệ sinh thân thể, tắm rửa, tập vật lý trị liệu cơ bản, cho ăn và giám sát uống thuốc buổi sáng/chiều.',
    includedBenefits: [
      'Điều dưỡng 100% có CCHN Bộ/Sở Y Tế',
      'Đo bộ 4 chỉ số sinh tồn (Huyết áp, Mạch, SpO2, Thân nhiệt)',
      'Cập nhật sổ theo dõi điện tử tức thì cho thân nhân',
      'Bảo hiểm trách nhiệm nghề nghiệp đến 1 tỷ VNĐ'
    ]
  },
  {
    category: 'Ca trực hành chính (8 Giờ)',
    serviceName: 'Ca trực 8h (Ban ngày từ 7h-15h hoặc 8h-16h)',
    duration: '8 giờ',
    marketLow: 650000,
    marketHigh: 900000,
    marketAverage: 780000,
    platformPrice: 720000,
    unit: 'VNĐ / ca',
    description: 'Giải pháp lý tưởng cho gia đình đi làm giờ hành chính. Điều dưỡng chăm sóc xuyên suốt bữa ăn, giấc ngủ trưa, tập phục hồi và xử lý y lệnh.',
    includedBenefits: [
      'Toàn bộ dịch vụ ca 4h + Phục vụ 2 bữa ăn chính/phụ',
      'Tập vận động chống teo cơ, chống loét',
      'Thực hiện thủ thuật điều dưỡng (thay băng, rửa vết thương)',
      'Báo cáo tổng kết ca trực có đồ thị theo dõi'
    ]
  },
  {
    category: 'Ca trực đêm chuyên sâu (12 Giờ)',
    serviceName: 'Ca trực đêm 12h (19h - 07h sáng hôm sau)',
    duration: '12 giờ ban đêm',
    marketLow: 850000,
    marketHigh: 1200000,
    marketAverage: 1000000,
    platformPrice: 920000,
    unit: 'VNĐ / ca',
    description: 'Giám sát sát sao ban đêm cho bệnh nhân thở máy, tai biến, người già lẫn lộn hay giật ống sonde, co giật hoặc cần hút đờm liên tục.',
    includedBenefits: [
      'Theo dõi monitoring sinh tồn ban đêm liên tục',
      'Hút đờm dãi, trở mình bệnh nhân 2 tiếng/lần chống nghẽn đường thở',
      'Xử trí cấp cứu và liên lạc khẩn cấp bác sĩ',
      'Cho người nhà giấc ngủ trọn vẹn tái tạo sức lao động'
    ]
  },
  {
    category: 'Ca trực toàn diện 24/24',
    serviceName: 'Ca trực 24/24 tại gia hoặc tại Bệnh viện',
    duration: '24 giờ liên tục',
    marketLow: 1300000,
    marketHigh: 1800000,
    marketAverage: 1550000,
    platformPrice: 1450000,
    unit: 'VNĐ / ngày',
    description: 'Dành cho bệnh nhân giai đoạn hồi sức nặng, bệnh nhân ung thư hoặc sau phẫu thuật phức tạp cần người chuyên môn túc trực 24/7.',
    includedBenefits: [
      'Điều dưỡng chính quy luân chuyển nghỉ ngơi đảm bảo tỉnh táo 100%',
      'Toàn diện y tế: Sonde, tiêm truyền, vệ sinh, vật lý trị liệu',
      'Bác sĩ chuyên khoa hội chẩn từ xa định kỳ',
      'Miễn phí bộ test đường huyết và kit vật tư vô khuẩn ban đầu'
    ]
  },
  {
    category: 'Dịch vụ thủ thuật đơn lẻ (Theo lượt)',
    serviceName: 'Thay băng vết mổ / Cắt chỉ / Đặt Sonde dạ dày',
    duration: '30 - 60 phút / lượt',
    marketLow: 180000,
    marketHigh: 350000,
    marketAverage: 260000,
    platformPrice: 220000,
    unit: 'VNĐ / lần',
    description: 'Thực hiện kỹ thuật y tế vô khuẩn tại nhà theo đúng y lệnh chỉ định của bệnh viện.',
    includedBenefits: [
      'Mang đầy đủ hộp dụng cụ vô khuẩn dùng 1 lần',
      'Dung dịch sát khuẩn tiêu chuẩn ngoại khoa',
      'Xử lý rác thải y tế an toàn theo quy chuẩn Bộ Y Tế'
    ]
  }
];

export const FOUNDING_TEAM = [
  {
    name: 'BS. ThS. Nguyễn Hoàng Long',
    role: 'Founder & CEO',
    subtitle: 'Thạc sĩ Quản lý Y tế & Bác sĩ Lâm sàng',
    experience: '10 năm kinh nghiệm quản trị bệnh viện tư nhân và chuyển đổi số y tế.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80',
    quote: 'Sứ mệnh của chúng tôi là chuẩn hóa chất lượng điều dưỡng gia đình, chấm dứt tình trạng cò mồi y tế mập mờ.'
  },
  {
    name: 'ĐD CKI. Trần Mai Chi',
    role: 'Co-Founder & Chief Nursing Officer (CNO)',
    subtitle: 'Nguyên Điều dưỡng Trưởng Hồi Sức Cấp Cứu BV Chợ Rẫy',
    experience: '14 năm kinh nghiệm lâm sàng, giám sát quy trình thẩm định 100% CCHN điều dưỡng.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    quote: 'Mỗi điều dưỡng trên nền tảng phải trải qua kỳ kiểm tra tay nghề gắt gao như trong bệnh viện hạng đặc biệt.'
  },
  {
    name: 'Kỹ sư Lê Quang Minh',
    role: 'Co-Founder & CTO',
    subtitle: 'Chuyên gia Công nghệ Y tế số (HealthTech)',
    experience: '8 năm phát triển các nền tảng phân tích dữ liệu lâm sàng và ứng dụng IoT theo dõi bệnh nhân.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    quote: 'Chúng tôi biến chiếc điện thoại của điều dưỡng thành một trạm giám sát sinh tồn thời gian thực cho cả gia đình.'
  },
  {
    name: 'PGS. TS. BS. Phạm Đức Dũng',
    role: 'Cố Vấn Trưởng Hội Đồng Y Khoa',
    subtitle: 'Chủ nhiệm Bộ môn Điều Dưỡng Đại học Y',
    experience: '35 năm đào tạo các thế hệ điều dưỡng trưởng và xây dựng chuẩn đạo đức nghề nghiệp.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    quote: 'Mô hình kết nối bên thứ 3 có kiểm định pháp lý là xu thế tất yếu để giải tỏa quá tải bệnh viện.'
  }
];

export const STARTUP_METRICS = [
  { label: 'Thị trường tiềm năng (TAM)', value: '2.4 Tỷ USD', detail: 'Chi tiêu y tế gia đình & chăm sóc người cao tuổi tại VN đến 2030' },
  { label: 'Điều dưỡng chứng chỉ tuyển chọn', value: '100%', detail: 'Thẩm định số hiệu CCHN qua Cổng thông tin Bộ Y Tế' },
  { label: 'Sự cố y khoa ghi nhận', value: '0.0%', detail: 'Quy trình kiểm soát vô khuẩn và sơ cấp cứu chuẩn AHA' },
  { label: 'Tỉ lệ khách hàng quay lại', value: '88.4%', detail: 'Thân nhân yên tâm công tác nhờ nhật ký số hóa' }
];
