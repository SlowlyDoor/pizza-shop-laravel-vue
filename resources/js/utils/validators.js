export const reName = /^[А-Яа-яЁё -]+$/u;
export const reAddress = /^[0-9А-Яа-яЁё\s.,;:()/-]+$/u;
export const rePhone = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export function isValidQty(v) {
	const n = Number(v);
	return Number.isInteger(n) && n >= 1 && n <= 99;
}

export function isValidName(v) {
	return v.length >= 3 && v.length <= 100 && reName.test(v);
}
export function isValidAddress(v) {
	return v.length >= 5 && v.length <= 200 && reAddress.test(v);
}
export function isValidPhone(v) {
	return rePhone.test(v);
}