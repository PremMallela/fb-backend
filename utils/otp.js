import ExpiryMap from "expiry-map";

export const otpMap = new ExpiryMap(120000, []);

export function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}