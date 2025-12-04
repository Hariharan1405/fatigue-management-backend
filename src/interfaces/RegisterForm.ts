export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
  password: string;
  country: string;
}