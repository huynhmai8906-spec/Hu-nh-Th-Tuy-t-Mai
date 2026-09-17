/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, Nurse, Review, Patient, VitalSignRecord, BookingRequest } from './types';
import { INITIAL_NURSES, INITIAL_PATIENTS, INITIAL_VITALS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PitchDeckModal } from './components/PitchDeckModal';
import { HomePage } from './pages/HomePage';
import { NursesPage } from './pages/NursesPage';
import { PricingPage } from './pages/PricingPage';
import { NursePortalPage } from './pages/NursePortalPage';
import { CheckCircle2, HeartHandshake } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Persistent Nurse List (with reviews)
  const [nurses, setNurses] = useState<Nurse[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_nurses');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NURSES;
  });

  // Persistent Patients
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_patients');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PATIENTS;
  });

  // Persistent Vitals Logs
  const [vitalsList, setVitalsList] = useState<VitalSignRecord[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_vitals');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_VITALS;
  });

  // Persistent Bookings
  const [bookings, setBookings] = useState<BookingRequest[]>(() => {
    try {
      const saved = localStorage.getItem('medicare_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Gmail Login Session for Nurse Portal
  const [loggedNurseEmail, setLoggedNurseEmail] = useState<string | null>(() => {
    try {
      const saved = localStorage.getItem('medicare_nurse_gmail');
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'huynhmai8906@gmail.com'; // Default pre-authenticated with user's verified gmail for easy testing
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('medicare_nurses', JSON.stringify(nurses));
    } catch (e) {
      console.error(e);
    }
  }, [nurses]);

  useEffect(() => {
    try {
      localStorage.setItem('medicare_vitals', JSON.stringify(vitalsList));
    } catch (e) {
      console.error(e);
    }
  }, [vitalsList]);

  useEffect(() => {
    try {
      localStorage.setItem('medicare_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      if (loggedNurseEmail) {
        localStorage.setItem('medicare_nurse_gmail', loggedNurseEmail);
      } else {
        localStorage.removeItem('medicare_nurse_gmail');
      }
    } catch (e) {
      console.error(e);
    }
  }, [loggedNurseEmail]);

  // Handle Review Submission (Star Rating & Feedback)
  const handleSubmitReview = (nurseId: string, review: Review) => {
    setNurses((prev) =>
      prev.map((nurse) => {
        if (nurse.id === nurseId) {
          const updatedReviews = [review, ...nurse.reviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvg = Number((totalRating / updatedReviews.length).toFixed(2));
          return {
            ...nurse,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: newAvg,
            shiftsCompleted: nurse.shiftsCompleted + 1,
          };
        }
        return nurse;
      })
    );
    showToast(`Đã ghi nhận đánh giá ${review.rating} sao và bình luận của bạn cho ca trực!`);
  };

  // Handle Shift Booking
  const handleBookNurse = (booking: BookingRequest) => {
    setBookings((prev) => [booking, ...prev]);
    showToast(`Đặt lịch thành công cho bệnh nhân ${booking.patientName}! Điều phối viên sẽ gọi lại.`);
  };

  // Handle Adding Vital Record by Nurse
  const handleAddVitalRecord = (record: VitalSignRecord) => {
    setVitalsList((prev) => [record, ...prev]);
    showToast(`Đã lưu chỉ số sinh tồn cho bệnh nhân ${record.patientName}!`);
  };

  // Handle Gmail Authentication
  const handleLoginWithGmail = (email: string) => {
    setLoggedNurseEmail(email);
    showToast(`Đăng nhập thành công với tài khoản ${email}!`);
  };

  const handleLogoutNurse = () => {
    setLoggedNurseEmail(null);
    showToast('Đã đăng xuất khỏi cổng điều dưỡng.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-teal-500/40 flex items-center gap-2.5 text-xs animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        loggedNurseEmail={loggedNurseEmail}
        onLogoutNurse={handleLogoutNurse}
      />

      {/* Main Pages Switcher */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onSelectPage={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          />
        )}

        {currentPage === 'nurses' && (
          <NursesPage
            nurses={nurses}
            onBookNurse={handleBookNurse}
            onSubmitReview={handleSubmitReview}
          />
        )}

        {currentPage === 'pricing' && (
          <PricingPage
            onSelectPage={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentPage === 'nurse-portal' && (
          <NursePortalPage
            loggedNurseEmail={loggedNurseEmail}
            onLoginWithGmail={handleLoginWithGmail}
            onLogout={handleLogoutNurse}
            patients={patients}
            vitalsList={vitalsList}
            onAddVitalRecord={handleAddVitalRecord}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectPage={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Startup Pitch Deck Presentation Modal */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />
    </div>
  );
}
