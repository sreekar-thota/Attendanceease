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
