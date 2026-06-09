function useFlagEmojiToPNG(flag) {
  if (!/^[a-zA-Z]+$/.test(flag)) {
    flag = Array.from(flag, (codeUnit) =>
      String.fromCharCode(codeUnit.codePointAt() - 127397).toLowerCase(),
    ).join("");
  } else {
    flag = flag.toLowerCase();
  }
  return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt="flag" />;
}

export default useFlagEmojiToPNG;
