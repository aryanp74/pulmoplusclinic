const DAILY_CONSULTATION_SLOT = "6:45 PM to 7:45 PM";
export const clinic = {
  name: "PulmoPlus",
  legalName: "PulmoPlus",
  tagline: "Advanced respiratory care, made calm.",
  description:
    "PulmoPlus is a respiratory, sleep, critical care and general medicine clinic in Noida led by Dr. Priyadarshi J. Kumar.",
  phone: "8826300531",
  whatsapp: "8826300531",
  email: "info.pulmoplus@gmail.com",
  address:
    "Shop No. 3, Nangli T-Point Market, Sector 134, Noida, Nagla Nagli, Uttar Pradesh 201304, India",
  mapsUrl: "https://maps.app.goo.gl/CeYrtikx9uRpi7F77",
  exteriorImage: "/images/clinic/clinic-exterior.jpg",
  waitingAreaImage: "/images/clinic/clinic-waiting-area.webp",
  consultationRoomImage: "/images/clinic/clinic-consultation-room.webp",
  consultationHours: [`${DAILY_CONSULTATION_SLOT} every day`],
  dailyConsultationSlot: DAILY_CONSULTATION_SLOT,
  openingNote:
    `Consultations run daily from ${DAILY_CONSULTATION_SLOT}. Please call or WhatsApp for direct coordination if needed.`,
  languages: ["English", "Hindi"],
  googleRating: "4.6",
  googleReviewCount: "31"
};

export const doctor = {
  name: "Dr. Priyadarshi J. Kumar",
  fullName: "Dr. Priyadarshi Jitendra Kumar",
  portrait: "/images/doctor/doctor-portrait.webp",
  interviewImage: "/images/doctor/doctor-interview.webp",
  procedureImage: "/images/doctor/doctor-procedure-bronchoscopy.webp",
  consultationImage: "/images/doctor/doctor-consultation-stethoscope.webp",
  featureImage: "/images/doctor/doctor-feature.webp",
  title:
    "Respiratory Medicine, Critical Care, Sleep Medicine, Interventional Pulmonology and General Practice",
  shortBio:
    "Dr. Priyadarshi J. Kumar has over 20 years of clinical experience across respiratory medicine, critical care, sleep medicine, interventional pulmonology and general practice.",
  longBio:
    "Dr. Priyadarshi Jitendra Kumar is a senior clinician with deep experience in respiratory and chest diseases, sleep-related breathing disorders, critical care and general medical concerns. His work includes extensive experience with flexible bronchoscopy, EBUS, medical thoracoscopy, pulmonary diagnostics and sleep study interpretation. At PulmoPlus, his approach is built around careful listening, detailed report review and clear explanation for patients and families.",
  positioning:
    "PulmoPlus is especially useful for patients with persistent cough, breathlessness, wheezing, sleep issues, complex chest reports, recurring respiratory infections or symptoms that have not been clearly explained.",
  philosophy:
    "Every patient deserves time, attention and a careful explanation. At PulmoPlus, we listen closely, study the details and guide patients with honesty and compassion.",
  education: [
    "MBBS, University of Patna",
    "DNB in Respiratory Diseases, Indraprastha Apollo Hospitals",
    "FSM, Indian Sleep Disorders Association, Apollo Hospital",
    "IDCCM Trainee, Asian Institute of Medical Sciences"
  ],
  stats: [
    { value: "20+", label: "Years of clinical experience" },
    { value: "2700+", label: "Flexible bronchoscopies" },
    { value: "350+", label: "EBUS procedures" },
    { value: "200+", label: "Medical thoracoscopies" },
    { value: "300+", label: "Sleep studies scored" }
  ],
  experience: [
    "Faculty at Apollo Hospital",
    "Consultant at Asian Institute of Medical Sciences",
    "Junior Resident, Stroke ICU, Apollo Hospital, New Delhi",
    "Senior Resident, Registrar and Faculty in Respiratory, Critical Care and Sleep Medicine at Indraprastha Apollo Hospitals, New Delhi"
  ],
  credentials: [
    "Fellow, American College of Chest Physicians",
    "Fellowship in Sleep Medicine",
    "DNB academic and postgraduate teaching experience at Apollo Hospital",
    "Research work presented at American Thoracic Society and European Respiratory Society platforms",
    "Published work in pulmonology, sleep medicine, bronchoscopy, pulmonary interventions and stroke medicine"
  ],
  expertise: [
    "Respiratory medicine and pulmonary disorders",
    "Asthma, COPD, cough, breathlessness and recurrent chest infections",
    "Sleep apnea, snoring, UARS and sleep-related breathing disorders",
    "Respiratory emergency and ICU-informed care",
    "Interventional pulmonology",
    "Bronchoscopy, EBUS-TBNA and medical thoracoscopy",
    "Pulmonary function test reporting",
    "Polysomnography scoring and sleep study review",
    "General medical care for diabetes, thyroid disorders, hypertension and infectious diseases"
  ]
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Patient Guide", href: "/patient-guide/" },
  { label: "Resources", href: "/resources/" },
  { label: "Contact", href: "/contact/" }
];

export const actions = {
  call: `tel:${clinic.phone}`,
  whatsapp: `https://wa.me/91${clinic.whatsapp}?text=${encodeURIComponent(
    "Hello PulmoPlus, I would like to request the next available appointment with Dr. Priyadarshi J. Kumar."
  )}`,
  directions: clinic.mapsUrl,
  book: "/book-appointment/"
};

export const seoDefaults = {
  title: "PulmoPlus | Respiratory, Sleep and Chest Care in Noida",
  description:
    "PulmoPlus is a respiratory, sleep, critical care and general medicine clinic in Noida led by Dr. Priyadarshi J. Kumar.",
  image: "/images/clinic/clinic-exterior.jpg"
};
