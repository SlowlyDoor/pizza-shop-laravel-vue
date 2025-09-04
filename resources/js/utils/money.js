export function fmt(x) {
  return Number(x).toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  });
}