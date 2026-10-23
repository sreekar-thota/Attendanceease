// Mock data for student identity and attendance permission requests
// SRKR Engineering College (CSD & CSIT)

export const DEFAULT_STUDENT = {
  name: "Thota Devi Sri Sai Sreekar",
  roll: "25B91A6260",
  dept: "CSD",
  sem: 3,
  college: "SRKR Engineering College",
  departmentFull: "Computer Science and Design",
  avatarUrl: "/student-avatar.png", // Profile photo of the student
};

export const INITIAL_REQUESTS = [
  {
    id: 1,
    date: "09 Oct",
    day: "Fri",
    subject: "Internship",
    details: "Bluconn interview",
    periods: 2,
    status: "Approved",
    ago: "14 days ago",
    type: "Academic",
  },
  {
    id: 2,
    date: "08 Oct",
    day: "Thu",
    subject: "Project development",
    details: "Project development",
    periods: 3,
    status: "Pending",
    ago: "15 days ago",
    type: "Academic",
  },
  {
    id: 3,
    date: "08 Oct",
    day: "Thu",
    subject: "Project development",
    details: "Project development",
    periods: 4,
    status: "Pending",
    ago: "15 days ago",
    type: "Academic",
  },
];

export const COLLEGE_INFO = {
  name: "SRKR Engineering College",
  departments: "CSD & CSIT",
  portalTitle: "AttendEase",
  subtitle: "Permission Portal",
  helplinePhone: "+91 8816 223332",
  helplineEmail: "permissions@srkrec.edu.in",
  hodName: "Dr. K. Suresh Babu",
  hodDesignation: "HOD, Dept of CSD & CSIT",
};

export const FACULTY_LIST = [
  { id: "fac-1", name: "Dr. K. Suresh Babu", role: "HOD, Dept of CSD & CSIT" },
  { id: "fac-2", name: "Prof. P. Ramaswamy", role: "Class Mentor (3rd Sem CSD)" },
  { id: "fac-3", name: "Dr. M. S. V. S. Bhadri Raju", role: "Academic Counselor" },
  { id: "fac-4", name: "Prof. G. N. V. Ratna Kumar", role: "Subject Teacher (DBMS)" },
  { id: "fac-5", name: "Prof. K. Satyanarayana", role: "Lab In-charge & Mentor" },
];

export const PRESET_REASONS = [
  "Campus Interview / Placement Drive",
  "Hackathon / Technical Competition",
  "Project Development / Lab Session",
  "Medical Emergency / Doctor Consultation",
  "Technical Seminar / Workshop",
  "Family Emergency / Personal Leave",
  "Sports / Inter-College Event",
  "Other",
];
