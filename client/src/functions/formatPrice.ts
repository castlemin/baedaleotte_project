export const formatPrice = (price: number) =>
  String(price).replace(/^(\d{0,2})(\d{2,4})$/, `$1,$2`);
