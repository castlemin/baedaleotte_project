export const formatPhoneNumber = (phoneNum: number) =>
  String(phoneNum).replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
