import CryptoJS from 'crypto-js';
//to decrypt mfa code
export const decryptCode = (mfa: string): string => {
  const bytes = CryptoJS.AES.decrypt(mfa, 'asjdhkasjdh');
  const decoded = bytes.toString(CryptoJS.enc.Utf8);
  return decoded;
};
//to test input password string
export const testPass = (password: string): boolean => {
  // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,1000}$/

  return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password);
};
//correct password msg
export const passMsg =
  'Password must be between 8 and 20 characters long,contain at least one letter and one digit, and can include special characters';

//to test input OTP
export const testOTP = (otp: string): boolean => {
  //OTP should be 6 digits long and all the digits should not be 0
  return !/^(?!.*000000)\d{6}$/.test(otp);
};

export function convertToApproxTime(time: string): string {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2].split('.')[0]);

  if (hours > 0) {
    return hours === 1 ? `${hours} hour` : `${hours} hours`;
  } else if (minutes > 0) {
    return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  } else {
    return seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
  }
}
