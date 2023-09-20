function isValidString(value: string | undefined): boolean {
  return !!value && value.trim() !== "";
}

export default isValidString;
