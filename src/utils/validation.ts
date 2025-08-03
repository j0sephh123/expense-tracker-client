export function isValidNumber(value: string): boolean {
  if (!value || value.trim() === "") {
    return false;
  }

  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num) && num > 0;
}
