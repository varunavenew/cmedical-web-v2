const digitSum = (val: number, i: number) => {
  const product = val * (i % 2 === 0 ? 2 : 1);
  return product < 10 ? product : Math.trunc(product / 10) + (product % 10);
};

export function isValidPersonnummer(input: string): boolean {
  const cleanedInput = input.replace(/\D/g, "");

  if (cleanedInput.length !== 12) return false;

  const year = parseInt(cleanedInput.substring(0, 4), 10);
  const month = parseInt(cleanedInput.substring(4, 6), 10);
  const day = parseInt(cleanedInput.substring(6, 8), 10);

  const date = new Date(year, month + 1, day);
  if (
    !(
      date.getFullYear() === year &&
      date.getMonth() === month + 1 &&
      date.getDate() === day
    )
  )
    return false;

  const slicedInput = cleanedInput.substring(2);
  const checksum = slicedInput
    .split("")
    .reduce((sum, val, i) => sum + digitSum(parseInt(val, 10), i), 0);
  return checksum % 10 === 0;
}
