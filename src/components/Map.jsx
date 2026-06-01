import styles from "./map.module.css";
import { useSearchParams } from "react-router-dom";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        {" "}
        position: {lat}, {lng}{" "}
      </h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 50 })}>
        Change position
      </button>
    </div>
  );
}

export default Map;
