import styles from "./CountryItem.module.css";
import { countryFlag } from "../hooks/useCountryFlag";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <img
          src={countryFlag(country.emoji)}
          alt={country.country}
          width={24}
          height={18}
        />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
