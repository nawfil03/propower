import React from 'react';

// ── Official Vector Logos for Major UAE Authorities ──
export const APPROVAL_LOGOS = [
  {
    id: 'dewa',
    name: 'DEWA',
    fullName: 'Dubai Electricity & Water Authority',
    arabic: 'هيئة كهرباء ومياه دبي',
    color: '#00A859',
    badge: 'Utility Provider',
    renderIcon: () => (
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none">
        <circle cx="24" cy="24" r="20" stroke="url(#dewaGrad)" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="95 30" />
        <circle cx="24" cy="24" r="13" stroke="url(#dewaGrad2)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="60 22" />
        <circle cx="24" cy="24" r="6" fill="#00A859" />
        <defs>
          <linearGradient id="dewaGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00A859" />
            <stop offset="0.5" stopColor="#00C875" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="dewaGrad2" x1="11" y1="11" x2="37" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    id: 'etihad_we',
    name: 'EtihadWE',
    fullName: 'Etihad Water & Electricity',
    arabic: 'الاتحاد للماء والكهرباء',
    color: '#0284C7',
    badge: 'Federal Authority',
    renderIcon: () => (
      <svg viewBox="0 0 54 40" width="46" height="34" fill="none">
        {/* Stylized EW waves */}
        <path d="M4 20C10 12 18 12 24 20C30 28 38 28 44 20" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        <path d="M10 26C16 18 24 18 30 26C36 34 44 34 50 26" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
        <circle cx="24" cy="20" r="3" fill="#0284C7" />
        <circle cx="30" cy="26" r="3" fill="#F97316" />
      </svg>
    )
  },
  {
    id: 'sewa',
    name: 'SEWA',
    fullName: 'Sharjah Electricity, Water & Gas',
    arabic: 'هيئة كهرباء ومياه وغاز الشارقة',
    color: '#10B981',
    badge: 'Utility Provider',
    renderIcon: () => (
      <svg viewBox="0 0 44 44" width="38" height="38" fill="none">
        {/* Emblem Crest */}
        <polygon points="22,3 39,12 39,32 22,41 5,32 5,12" stroke="#10B981" strokeWidth="3" fill="rgba(16, 185, 129, 0.08)" />
        <path d="M22 10L22 34M13 22L31 22" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="22" cy="22" r="5" fill="#10B981" />
      </svg>
    )
  },
  {
    id: 'rta',
    name: 'RTA',
    fullName: 'Roads & Transport Authority Dubai',
    arabic: 'هيئة الطرق والمواصلات',
    color: '#EF4444',
    badge: 'Government Entity',
    renderIcon: () => (
      <svg viewBox="0 0 48 38" width="42" height="34" fill="none">
        {/* Iconic RTA Red Triangle Chevron */}
        <path d="M6 34L42 34L42 10L6 34Z" fill="#DC2626" />
        <path d="M14 30L38 30L38 18L14 30Z" fill="#FFFFFF" />
        <path d="M24 28L36 28L36 22L24 28Z" fill="#DC2626" />
      </svg>
    )
  },
  {
    id: 'dpworld',
    name: 'DP WORLD',
    fullName: 'Global Ports & Infrastructure',
    arabic: 'موانئ دبي العالمية',
    color: '#06B6D4',
    badge: 'Global Ports EPC',
    renderIcon: () => (
      <svg viewBox="0 0 48 40" width="42" height="35" fill="none">
        {/* Dual Swoosh Logo */}
        <path d="M8 26C8 16 16 8 26 8C33 8 38 12 40 17" stroke="#06B6D4" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M40 14C40 24 32 32 22 32C15 32 10 28 8 23" stroke="#EC4899" strokeWidth="4.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'khazna',
    name: 'KHAZNA',
    fullName: 'Khazna Data Centers',
    arabic: 'خزنة لمراكز البيانات',
    color: '#84CC16',
    badge: 'Mission-Critical DC',
    renderIcon: () => (
      <svg viewBox="0 0 44 44" width="38" height="38" fill="none">
        {/* Khazna Intersecting Ribbon / Infinity Symbol */}
        <path d="M8 32L22 10L36 32" stroke="#84CC16" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 18L22 34L36 18" stroke="#84CC16" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.75" />
      </svg>
    )
  },
  {
    id: 'empower',
    name: 'EMPOWER',
    fullName: 'Emirates Central Cooling Systems',
    arabic: 'مؤسسة الإمارات لأنظمة التبريد',
    color: '#0EA5E9',
    badge: 'District Energy',
    renderIcon: () => (
      <svg viewBox="0 0 44 44" width="38" height="38" fill="none">
        {/* Eco Leaf Cooling Swirl */}
        <path d="M22 6C32 6 38 14 38 22C38 32 30 38 22 38C12 38 6 30 6 22" stroke="#0EA5E9" strokeWidth="4" strokeLinecap="round" />
        <path d="M14 26C18 20 24 16 30 14" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
        <circle cx="22" cy="22" r="4.5" fill="#0EA5E9" />
      </svg>
    )
  },
  {
    id: 'dubai_airports',
    name: 'DUBAI AIRPORTS',
    fullName: 'DXB & DWC Infrastructure',
    arabic: 'مطارات دبي',
    color: '#6366F1',
    badge: 'Aviation Utility',
    renderIcon: () => (
      <svg viewBox="0 0 48 38" width="42" height="34" fill="none">
        {/* Supersonic Wing Vector */}
        <path d="M4 28L36 10L44 14L20 32L4 28Z" fill="#6366F1" />
        <path d="M12 28L40 18L44 20L22 32L12 28Z" fill="#38BDF8" opacity="0.8" />
      </svg>
    )
  },
  {
    id: 'sharjah_airport',
    name: 'SHARJAH AIRPORT',
    fullName: 'Sharjah International Airport',
    arabic: 'مطار الشارقة الدولي',
    color: '#E11D48',
    badge: 'Airport Authority',
    renderIcon: () => (
      <svg viewBox="0 0 44 40" width="40" height="36" fill="none">
        {/* Three Flying Birds in Formation */}
        <path d="M12 18C16 12 22 14 26 18C22 18 18 16 12 18Z" fill="#E11D48" />
        <path d="M20 10C24 4 30 6 34 10C30 10 26 8 20 10Z" fill="#E11D48" />
        <path d="M28 20C32 14 38 16 42 20C38 20 34 18 28 20Z" fill="#E11D48" />
      </svg>
    )
  },
  {
    id: 'dubai_municipality',
    name: 'DUBAI MUNICIPALITY',
    fullName: 'Government of Dubai',
    arabic: 'بلدية دبي',
    color: '#3B82F6',
    badge: 'Civic Infrastructure',
    renderIcon: () => (
      <svg viewBox="0 0 44 44" width="38" height="38" fill="none">
        {/* Official Geometric Diamond Crest */}
        <polygon points="22,4 40,22 22,40 4,22" stroke="#3B82F6" strokeWidth="3.5" fill="rgba(59, 130, 246, 0.08)" />
        <polygon points="22,12 32,22 22,32 12,22" fill="#3B82F6" />
      </svg>
    )
  }
];
