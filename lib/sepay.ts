import { SEPAY_CONFIG } from './data';

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

export function generateOrderCode(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `${SEPAY_CONFIG.sampleOrderCodePrefix}${randomDigits}`;
}

export function getVietQRUrl(amount: number, orderCode: string): string {
  // Using official VietQR format supported by SePay
  const bank = SEPAY_CONFIG.bankCode;
  const acc = SEPAY_CONFIG.accountNumber;
  const memo = encodeURIComponent(orderCode);
  const accountHolder = encodeURIComponent(SEPAY_CONFIG.accountHolder);
  
  return `https://img.vietqr.io/image/${bank}-${acc}-compact2.png?amount=${amount}&addInfo=${memo}&accountName=${accountHolder}`;
}

export function getSepayQRUrl(amount: number, orderCode: string): string {
  const bank = SEPAY_CONFIG.bankCode;
  const acc = SEPAY_CONFIG.accountNumber;
  const memo = encodeURIComponent(orderCode);
  
  return `https://qr.sepay.vn/img?acc=${acc}&bank=${bank}&amount=${amount}&des=${memo}`;
}
