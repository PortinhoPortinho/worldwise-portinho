export const countryFlag = (flag) => {
  if (!flag) return null;

  const countryCode = Array.from(flag, (char) =>
    String.fromCodePoint(char.codePointAt(0) - 127397),
  )
    .join("")
    .toLowerCase();

  return `https://flagcdn.com/24x18/${countryCode}.png`;
};
