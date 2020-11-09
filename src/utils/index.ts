export const JWT_SECRET = process.env.JWT_SECRET || 'SECRET';

export function generateVerificationCode(n: number): string {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < n; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
