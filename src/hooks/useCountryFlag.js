export const countryFlag = (flag) => {
  if (!flag) return null;

  const countryCode = Array.from(flag, (char) =>
    String.fromCodePoint(char.codePointAt(0) - 127397),
  )
    .join("")
    .toLowerCase();

  return `https://flagcdn.com/24x18/${countryCode}.png`;
};
// a function that takes a country code and returns the corresponding flag as an image see more about that at https://danq.me/2026/05/31/iso-country-codes-to-flags/
