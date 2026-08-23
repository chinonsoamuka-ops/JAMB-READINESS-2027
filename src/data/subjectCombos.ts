import { FacultyCombination } from '../types';

export const FACULTY_COMBINATIONS: FacultyCombination[] = [
  {
    faculty: 'Engineering & Technology',
    courses: ['Mechanical Eng.', 'Electrical/Electronics', 'Civil Eng.', 'Computer Eng.', 'Petroleum Eng.'],
    subjects: ['english', 'mathematics', 'physics', 'chemistry'],
    targetScore: 280
  },
  {
    faculty: 'Medicine & Health Sciences',
    courses: ['Medicine & Surgery (MBBS)', 'Pharmacy', 'Nursing Science', 'Dentistry', 'Medical Lab Science'],
    subjects: ['english', 'biology', 'chemistry', 'physics'],
    targetScore: 300
  },
  {
    faculty: 'Physical & Computing Sciences',
    courses: ['Computer Science', 'Software Engineering', 'Cybersecurity', 'Mathematics', 'Statistics'],
    subjects: ['english', 'mathematics', 'physics', 'chemistry'],
    targetScore: 260
  },
  {
    faculty: 'Law & Legal Studies',
    courses: ['Common Law', 'Civil Law', 'International Law & Jurisprudence'],
    subjects: ['english', 'literature', 'government', 'crk'],
    targetScore: 290
  },
  {
    faculty: 'Social & Management Sciences',
    courses: ['Economics', 'Accounting', 'Business Admin', 'Banking & Finance', 'Mass Communication'],
    subjects: ['english', 'economics', 'mathematics', 'accounting'],
    targetScore: 250
  },
  {
    faculty: 'Arts & Humanities',
    courses: ['English & Literary Studies', 'History & Strategic Studies', 'Theatre Arts', 'Philosophy'],
    subjects: ['english', 'literature', 'government', 'crk'],
    targetScore: 240
  },
  {
    faculty: 'Agriculture & Environmental Sciences',
    courses: ['Agricultural Economics', 'Agronomy', 'Animal Science', 'Estate Management', 'Architecture'],
    subjects: ['english', 'agric', 'biology', 'chemistry'],
    targetScore: 230
  }
];
